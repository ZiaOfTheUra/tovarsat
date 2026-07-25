import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/hooks/useRole';
import { fetchAll, addDocument } from '@/services/firestore';
import { COLLECTIONS } from '@/config';
import type { Asistencia } from '@/types';

// ── Types ────────────────────────────────────────────────

type FilaExcel = {
  nombre: string;  // e.g. "Carlos García"
  dia: string;     // dd/mm/yyyy, e.g. "07/03/2025"
  hora: string;    // HH:MM 24h, e.g. "09:42" or "17:05"
};

type FilaPreview = {
  index: number;
  nombre: string;
  dia: string;
  hora: string;
  uid?: string;          // matched user ID
  fechaEntrada?: Date;   // parsed date+time
  fechaSalida?: Date;    // auto-computed exit time
  horas?: number;        // hours worked
  error?: string;        // description of any issue
};

// ── Helpers ──────────────────────────────────────────────

/**
 * Normalize a name for fuzzy matching:
 * - lowercase
 * - trim leading/trailing whitespace
 * - collapse multiple spaces into one
 */
function normalizeName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, ' ').trim();
}

/**
 * Parse a date string in dd/mm/yyyy format and a time string in HH:MM format
 * into a single Date object. Returns null on failure.
 */
function parseDateTime(dia: string, hora: string): Date | null {
  // Parse dd/mm/yyyy
  const partsFecha = dia.split('/');
  if (partsFecha.length !== 3) return null;

  const diaNum = parseInt(partsFecha[0], 10);
  const mesNum = parseInt(partsFecha[1], 10) - 1; // JS months are 0-based
  const añoNum = parseInt(partsFecha[2], 10);

  if (isNaN(diaNum) || isNaN(mesNum) || isNaN(añoNum)) return null;

  // Parse HH:MM
  const partsHora = hora.split(':');
  if (partsHora.length !== 2) return null;

  const horaNum = parseInt(partsHora[0], 10);
  const minNum = parseInt(partsHora[1], 10);

  if (isNaN(horaNum) || isNaN(minNum)) return null;

  return new Date(añoNum, mesNum, diaNum, horaNum, minNum);
}

/**
 * Compute the automatic exit time and hours worked.
 * - If entry is before 12:00 → exit at 11:50
 * - If entry is 12:00 or later → exit at 17:50
 */
function computeExitInfo(entry: Date): { fechaSalida: Date; horas: number } {
  const exit = new Date(entry);
  const entryHour = entry.getHours();

  if (entryHour < 12) {
    // Morning shift
    exit.setHours(11, 50, 0, 0);
  } else {
    // Afternoon shift
    exit.setHours(17, 50, 0, 0);
  }

  // Calculate hours worked (rounded to 2 decimal places)
  const diffMs = exit.getTime() - entry.getTime();
  const horas = Math.round((diffMs / 3600000) * 100) / 100;

  return { fechaSalida: exit, horas };
}

// ── Screen ───────────────────────────────────────────────

export default function ImportarAsistenciaScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { hasRole: esGerencia } = useRole(['gerenciaLocal']);
  const [cargando, setCargando] = useState(false);
  const [paso, setPaso] = useState<'inicio' | 'preview' | 'guardando' | 'listo'>('inicio');
  const [filas, setFilas] = useState<FilaExcel[]>([]);
  const [preview, setPreview] = useState<FilaPreview[]>([]);

  // ── Role gating ────────────────────────────────────

  if (!esGerencia) {
    return (
      <ThemedView style={estilos.contenedor}>
        <ThemedText>No tienes permisos para acceder a esta pantalla</ThemedText>
        <TouchableOpacity onPress={() => router.back()}>
          <ThemedText style={estilos.link}>Volver</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  // ── User map: name → uid ───────────────────────────

  const [usuariosMap, setUsuariosMap] = useState<Map<string, string>>(new Map());

  const cargarUsuarios = useCallback(async () => {
    try {
      const usuarios = await fetchAll<any>(COLLECTIONS.USUARIOS);
      const map = new Map<string, string>();
      usuarios.forEach((u: any) => {
        const key = normalizeName(u.nombre);
        // Avoid overwriting if duplicate names exist — keep the first match
        if (!map.has(key)) {
          map.set(key, u.uid || u.id);
        }
      });
      setUsuariosMap(map);
      console.log('[ImportarAsistencia] Users loaded:', map.size);
    } catch (err) {
      console.log('[ImportarAsistencia] Error loading users:', err);
    }
  }, []);

  // ── Excel file selection ────────────────────────────

  const seleccionarExcel = async () => {
    console.log('[ImportarAsistencia] seleccionarExcel: iniciando');
    let DocumentPicker: any;
    let XLSX: any;
    try {
      DocumentPicker = require('expo-document-picker');
      XLSX = require('xlsx');
      console.log('[ImportarAsistencia] Módulos cargados: DocumentPicker y XLSX');
    } catch (err) {
      console.log('[ImportarAsistencia] Error cargando módulos nativos:', err);
      Alert.alert(
        'Function not available',
        'Excel import requires rebuilding the app. Please run "npx expo prebuild --clean && npx expo run:android" to enable this feature.',
        [{ text: 'Got it' }]
      );
      return;
    }

    try {
      console.log('[ImportarAsistencia] Abriendo selector de archivos...');
      const resultado = await DocumentPicker.getDocumentAsync({
        type: [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
        ],
        copyToCacheDirectory: true,
      });

      if (resultado.canceled) {
        console.log('[ImportarAsistencia] Usuario canceló la selección de archivo');
        return;
      }

      const archivo = resultado.assets[0];
      console.log('[ImportarAsistencia] Archivo seleccionado:', archivo.name, 'URI:', archivo.uri);

      // Read file via xlsx (get arrayBuffer directly — bypass blob() which is unsupported in RN)
      console.log('[ImportarAsistencia] Leyendo archivo con fetch...');
      const respuesta = await fetch(archivo.uri);
      console.log('[ImportarAsistencia] Fetch respuesta status:', respuesta.status, respuesta.statusText);

      if (!respuesta.ok) {
        throw new Error(`HTTP ${respuesta.status}: ${respuesta.statusText}`);
      }

      console.log('[ImportarAsistencia] Obteniendo ArrayBuffer directamente...');
      const arrayBuffer = await respuesta.arrayBuffer();
      console.log('[ImportarAsistencia] ArrayBuffer byteLength:', arrayBuffer.byteLength);
      
      console.log('[ImportarAsistencia] Leyendo workbook con XLSX...');
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      console.log('[ImportarAsistencia] Workbook leído. Sheets disponibles:', workbook.SheetNames);
      
      if (workbook.SheetNames.length === 0) {
        throw new Error('El archivo no contiene hojas (sheets) válidas');
      }
      
      // Process first sheet
      const primeraHoja = workbook.Sheets[workbook.SheetNames[0]];
      console.log('[ImportarAsistencia] Procesando primera hoja:', workbook.SheetNames[0]);
      
      const jsonData: any[][] = XLSX.utils.sheet_to_json(primeraHoja, { header: 1 });
      console.log('[ImportarAsistencia] Datos crudos convertidos a JSON. Filas totales (incluyendo header):', jsonData.length);

      // Parse rows (columns: 0=Nombre, 1=Día, 2=Hora) — skip header row at index 0
      const filasParseadas: FilaExcel[] = [];
      for (let i = 1; i < jsonData.length; i++) {
        const fila = jsonData[i];
        if (fila && fila.length >= 3) {
          const nombre = String(fila[0] || '').trim();
          const dia = String(fila[1] || '').trim();
          const hora = String(fila[2] || '').trim();

          // Skip empty rows
          if (!nombre || !dia || !hora) {
            console.log(`[ImportarAsistencia] Fila ${i} vacía, saltando`);
            continue;
          }

          console.log(`[ImportarAsistencia] Fila ${i} parseada:`, { nombre, dia, hora });
          filasParseadas.push({ nombre, dia, hora });
        } else {
          console.log(`[ImportarAsistencia] Fila ${i} con menos de 3 columnas, saltando`);
        }
      }

      console.log('[ImportarAsistencia] Total filas parseadas:', filasParseadas.length);
      setFilas(filasParseadas);

      // Load users for matching
      await cargarUsuarios();
      setPaso('preview');
    } catch (err) {
      console.log('[ImportarAsistencia] ERROR en seleccionarExcel:', err);
      Alert.alert('Error', `Could not read the Excel file: ${err}`);
    }
  };

  // ── Build preview (matches users, parses dates, computes exit) ──

  const generarPreview = useCallback(() => {
    const previewData: FilaPreview[] = filas.map((fila, idx) => {
      // 1. Match name against users collection
      const nombreNorm = normalizeName(fila.nombre);
      const uid = usuariosMap.get(nombreNorm);

      // 2. Parse date and time
      const fechaEntrada = parseDateTime(fila.dia, fila.hora);

      // 3. Compute exit time and hours (only if entry parsed successfully)
      let fechaSalida: Date | undefined;
      let horas: number | undefined;
      if (fechaEntrada) {
        const info = computeExitInfo(fechaEntrada);
        fechaSalida = info.fechaSalida;
        horas = info.horas;
      }

      // 4. Determine error messages
      let error: string | undefined;
      if (!uid) {
        error = `User "${fila.nombre}" not found in database`;
      } else if (!fechaEntrada) {
        error = `Invalid date (${fila.dia}) or time (${fila.hora}) format`;
      }

      return {
        index: idx,
        nombre: fila.nombre,
        dia: fila.dia,
        hora: fila.hora,
        uid,
        fechaEntrada: fechaEntrada || undefined,
        fechaSalida,
        horas,
        error,
      };
    });

    setPreview(previewData);
    setPaso('preview');
  }, [filas, usuariosMap]);

  // Auto-generate preview when entering the preview step
  useEffect(() => {
    if (paso === 'preview' && preview.length === 0 && filas.length > 0) {
      console.log('[ImportarAsistencia] useEffect: generando preview automáticamente');
      generarPreview();
    }
  }, [paso, preview.length, filas.length, generarPreview]);

  // ── Save to Firestore ───────────────────────────────

  const confirmarGuardado = async () => {
    const conError = preview.filter((f) => f.error || !f.uid || !f.fechaEntrada);
    if (conError.length > 0) {
      Alert.alert(
        'Errors found',
        `${conError.length} rows have errors, they will be skipped. Do you want to continue with the valid rows?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Continue',
            onPress: () => guardarRegistros(preview.filter((f) => !f.error && f.uid && f.fechaEntrada)),
          },
        ]
      );
    } else {
      await guardarRegistros(preview);
    }
  };

  const guardarRegistros = async (registros: FilaPreview[]) => {
    console.log('[ImportarAsistencia] guardarRegistros: iniciando con', registros.length, 'registros');
    setCargando(true);
    setPaso('guardando');

    try {
      let exitosos = 0;
      let fallidos = 0;

      for (const registro of registros) {
        console.log('[ImportarAsistencia] Guardando registro:', registro.nombre, 'uid:', registro.uid, 'fechaEntrada:', registro.fechaEntrada);
        try {
          await addDocument<Asistencia>(COLLECTIONS.ASISTENCIAS, {
            uid: registro.uid!,
            fechaEntrada: registro.fechaEntrada!,
            fechaSalida: registro.fechaSalida,
            horas: registro.horas,
            metodoMarcaje: 'biometrico_excel' as any,
            registradoPorKiosco: false,
          });
          console.log('[ImportarAsistencia] Registro guardado exitosamente:', registro.nombre);
          exitosos++;
        } catch (err) {
          console.log('[ImportarAsistencia] Error guardando registro:', registro.nombre, err);
          fallidos++;
        }
      }

      console.log(`[ImportarAsistencia] Guardado completo: ${exitosos} exitosos, ${fallidos} fallidos`);
      setPaso('listo');

      Alert.alert(
        'Import complete',
        `Successful records: ${exitosos}\nFailed records: ${fallidos}`,
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (err) {
      console.log('[ImportarAsistencia] ERROR general en guardarRegistros:', err);
      Alert.alert('Error', `Could not complete the import: ${err}`);
      setPaso('preview');
    } finally {
      setCargando(false);
    }
  };

  // ── Navigation helpers ──────────────────────────────

  const cancelar = () => {
    setFilas([]);
    setPreview([]);
    setPaso('inicio');
    router.back();
  };

  // ── Render: Start screen ────────────────────────────

  if (paso === 'inicio') {
    return (
      <ThemedView style={estilos.contenedor}>
        <ThemedText type="title">Import Attendance from Excel</ThemedText>
        <ThemedText style={estilos.subtitulo}>
          Select an Excel file with 3 columns: Nombre, Día (dd/mm/yyyy), Hora (HH:MM)
        </ThemedText>

        <TouchableOpacity style={estilos.botonSeleccionar} onPress={seleccionarExcel}>
          <ThemedText style={estilos.textoBoton}>📂 Select Excel File</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.botonCancelar} onPress={cancelar}>
          <ThemedText>Cancel</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  // ── Render: Preview screen ──────────────────────────

  if (paso === 'preview') {
    // Preview is auto-generated by useEffect above

    const conError = preview.filter((f) => f.error).length;

    // Find unique error names for a summary
    const erroresUnicos = [...new Set(preview.filter((f) => f.error).map((f) => f.nombre))];

    return (
      <ThemedView style={estilos.contenedor}>
        <ThemedText type="title">Import Preview</ThemedText>
        <ThemedText style={estilos.subtitulo}>
          {preview.length} rows · {conError > 0 ? `${conError} with errors` : 'No errors'}
        </ThemedText>

        {/* Error summary block */}
        {erroresUnicos.length > 0 && (
          <ThemedView style={estilos.bloqueError}>
            <ThemedText style={estilos.tituloError}>
              ⚠ Unrecognized names ({erroresUnicos.length})
            </ThemedText>
            {erroresUnicos.map((name) => (
              <ThemedText key={name} style={estilos.textoErrorLista}>
                • {name}
              </ThemedText>
            ))}
          </ThemedView>
        )}

        <ScrollView style={estilos.listaPreview} showsVerticalScrollIndicator={false}>
          {preview.map((fila) => (
            <ThemedView
              key={fila.index}
              style={[estilos.filaPreview, fila.error && estilos.filaPreviewError]}
            >
              <ThemedText style={estilos.nombrePreview}>{fila.nombre}</ThemedText>
              <ThemedText style={estilos.textoPreview}>
                {fila.dia} at {fila.hora}
              </ThemedText>
              {fila.fechaSalida && (
                <ThemedText style={estilos.textoPreviewSalida}>
                  → Exit: {fila.fechaSalida.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })}
                  {fila.horas ? ` (${fila.horas.toFixed(2)}h)` : ''}
                </ThemedText>
              )}
              {fila.error && (
                <ThemedText style={estilos.errorPreview}>⚠ {fila.error}</ThemedText>
              )}
            </ThemedView>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={[estilos.botonGuardar, conError > 0 && estilos.botonGuardarWarning]}
          onPress={confirmarGuardado}
        >
          <ThemedText style={estilos.textoBoton}>
            {conError > 0
              ? `Save valid rows anyway (${conError} errors will be skipped)`
              : 'Confirm Import'}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.botonCancelar} onPress={() => setPaso('inicio')}>
          <ThemedText>Back</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  // ── Render: Saving screen ───────────────────────────

  if (paso === 'guardando') {
    return (
      <ThemedView style={estilos.contenedor}>
        <ActivityIndicator size="large" />
        <ThemedText style={estilos.centrado}>Saving records to Firestore...</ThemedText>
      </ThemedView>
    );
  }

  // ── Render: Done screen ─────────────────────────────

  return (
    <ThemedView style={estilos.contenedor}>
      <ThemedText type="title">✓ Import Complete</ThemedText>
      <TouchableOpacity style={estilos.botonGuardar} onPress={cancelar}>
        <ThemedText style={estilos.textoBoton}>Done</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

// ── Styles ──────────────────────────────────────────────

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    paddingTop: '8%',
    gap: 14,
  },
  subtitulo: {
    opacity: 0.7,
    marginBottom: 10,
  },
  botonSeleccionar: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonGuardar: {
    backgroundColor: '#34C759',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonGuardarWarning: {
    backgroundColor: '#FF9500',
  },
  botonCancelar: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  link: {
    color: '#007AFF',
    marginTop: 10,
  },
  bloqueError: {
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFB74D',
    gap: 4,
  },
  tituloError: {
    fontWeight: '700',
    color: '#E65100',
    fontSize: 14,
  },
  textoErrorLista: {
    color: '#BF360C',
    fontSize: 13,
    marginLeft: 8,
  },
  listaPreview: {
    maxHeight: 400,
    gap: 8,
  },
  filaPreview: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    gap: 2,
  },
  filaPreviewError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFE5E5',
  },
  nombrePreview: {
    fontWeight: '600',
    fontSize: 15,
  },
  textoPreview: {
    fontSize: 13,
    opacity: 0.7,
  },
  textoPreviewSalida: {
    fontSize: 13,
    color: '#2E7D32',
    fontWeight: '500',
  },
  errorPreview: {
    color: '#FF3B30',
    fontSize: 12,
  },
  centrado: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});