import { useState, useMemo, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/hooks/useRole';
import { useAttendance } from '@/features/asistencia/hooks/useAttendance';
import { fetchAll } from '@/services/firestore';
import { COLLECTIONS } from '@/config';
import type { Asistencia } from '@/types';

// ───────────────────────────── Helpers de fecha ─────────────────────────────

function aFecha(valor: Date | any): Date {
  if (!valor) return new Date(0);
  return valor instanceof Date ? valor : valor.toDate?.() || new Date(valor);
}

function formatearHora(valor: Date | any): string {
  return aFecha(valor).toLocaleTimeString('es-VE');
}

function formatearFecha(valor: Date | any): string {
  return aFecha(valor).toLocaleDateString('es-VE');
}

// ───────────────────────────── Helpers de datos ─────────────────────────────

type FilaHistorial = {
  id: string;
  uid: string;
  nombre: string;
  fecha: string;
  entrada: string;
  salida: string;
  horas: string;
};

function mapearHistorial(registros: Asistencia[], usuariosMap: Map<string, string>): FilaHistorial[] {
  return registros.map((r) => ({
    id: r.id || '',
    uid: r.uid,
    nombre: usuariosMap.get(r.uid) || r.uid.slice(0, 8),
    fecha: formatearFecha(r.fechaEntrada),
    entrada: formatearHora(r.fechaEntrada),
    salida: r.fechaSalida ? formatearHora(r.fechaSalida) : '',
    horas: r.horas != null ? r.horas.toFixed(2) : '',
  }));
}

// ───────────────────────────── Componentes auxiliares ─────────────────────────────

function FilaHistorialItem({ item }: { item: FilaHistorial }) {
  return (
    <ThemedView style={estilos.filaHistorial}>
      <ThemedView style={estilos.filaEncabezado}>
        <ThemedText type="defaultSemiBold">{item.nombre}</ThemedText>
        <ThemedText style={estilos.fecha}>{item.fecha}</ThemedText>
      </ThemedView>
      <ThemedView style={estilos.filaHoras}>
        <ThemedText>
          {item.entrada} → {item.salida || '...'}
        </ThemedText>
        {item.horas ? (
          <ThemedText style={estilos.textoHoras}>Horas: {item.horas}</ThemedText>
        ) : null}
      </ThemedView>
    </ThemedView>
  );
}

function TarjetaEstado({ sesionActual, nombreUsuario }: { sesionActual: Asistencia | null; nombreUsuario: string }) {
  const textoEstado = sesionActual
    ? `Entrada: ${formatearHora(sesionActual.fechaEntrada)}`
    : 'Sin marcación hoy';

  return (
    <ThemedView style={estilos.tarjetaEstado}>
      <ThemedText type="defaultSemiBold">Estado de {nombreUsuario}</ThemedText>
      <ThemedText style={estilos.textoEstado}>{textoEstado}</ThemedText>
      {sesionActual && !sesionActual.fechaSalida && (
        <ThemedText style={estilos.subtextoEstado}>Sin salida registrada</ThemedText>
      )}
    </ThemedView>
  );
}

// ───────────────────────────── Vista: Usuario normal ─────────────────────────────

function VistaUsuarioNormal({ usuario }: { usuario: any }) {
  const { history, isLoading, error, currentSession, retry } = useAttendance(usuario?.uid, false);

  if (isLoading) {
    return <ThemedText style={estilos.centrado}>Cargando historial...</ThemedText>;
  }

  if (error) {
    return (
      <ThemedView>
        <ThemedText style={estilos.textoError}>{error}</ThemedText>
        <TouchableOpacity onPress={retry}>
          <ThemedText style={estilos.reintentar}>Reintentar</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={estilos.contenedor}>
      <TarjetaEstado sesionActual={currentSession} nombreUsuario={usuario?.nombre || 'Usuario'} />

      <ThemedText type="defaultSemiBold" style={estilos.tituloHistorial}>
        Mi historial (últimos 7 días)
      </ThemedText>

      {history.length === 0 ? (
        <ThemedText style={estilos.textoVacio}>Sin registros</ThemedText>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id || ''}
          renderItem={({ item }) => (
            <ThemedView style={estilos.filaHistorial}>
              <ThemedView style={estilos.filaEncabezado}>
                <ThemedText type="defaultSemiBold">{formatearFecha(item.fechaEntrada)}</ThemedText>
              </ThemedView>
              <ThemedText>
                {formatearHora(item.fechaEntrada)} → {item.fechaSalida ? formatearHora(item.fechaSalida) : '...'}
              </ThemedText>
              {item.horas != null && (
                <ThemedText style={estilos.textoHoras}>Horas: {item.horas.toFixed(2)}</ThemedText>
              )}
            </ThemedView>
          )}
          contentContainerStyle={estilos.contenidoLista}
          removeClippedSubviews={false}
        />
      )}
    </ThemedView>
  );
}

// ───────────────────────────── Vista: Gerencia Local ─────────────────────────────

function VistaGerencia({ usuario }: { usuario: any }) {
  const { records, isLoading, error, retry } = useAttendance(usuario?.uid, true);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [mostrarImportar, setMostrarImportar] = useState(false);

  const usuariosMap = useMemo(() => {
    const map = new Map<string, string>();
    usuarios.forEach((u) => map.set(u.uid || u.id, u.nombre));
    return map;
  }, [usuarios]);

  // Cargar lista de usuarios desde Firestore para resolver uid → nombre
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const data = await fetchAll<any>(COLLECTIONS.USUARIOS);
        setUsuarios(data);
        console.log('[VistaGerencia] Usuarios cargados para mapa de nombres:', data.length);
      } catch (err) {
        console.log('[VistaGerencia] Error cargando usuarios:', err);
      }
    };
    cargarUsuarios();
  }, []);

  if (isLoading) {
    return <ThemedText style={estilos.centrado}>Cargando registros...</ThemedText>;
  }

  if (error) {
    return (
      <ThemedView>
        <ThemedText style={estilos.textoError}>{error}</ThemedText>
        <TouchableOpacity onPress={retry}>
          <ThemedText style={estilos.reintentar}>Reintentar</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={estilos.contenedor}>
      <ThemedView style={estilos.filaEncabezado}>
        <ThemedText type="title">Asistencia (Gerencia)</ThemedText>
      </ThemedView>

      <ThemedText style={estilos.subtitulo}>
        Todos los registros (últimos 50)
      </ThemedText>

      {records.length === 0 ? (
        <ThemedText style={estilos.textoVacio}>Sin registros</ThemedText>
      ) : (
        <FlatList
          data={mapearHistorial(records, usuariosMap)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FilaHistorialItem item={item} />}
          contentContainerStyle={estilos.contenidoLista}
          removeClippedSubviews={false}
        />
      )}

      {mostrarImportar && (
        <ThemedView style={estilos.modalOverlay}>
          <ThemedView style={estilos.modalContenido}>
            <ThemedText type="defaultSemiBold">Importar Asistencia desde Excel</ThemedText>
            <ThemedText style={estilos.subtituloModal}>
              Funcionalidad próximamente. Use el botón de importación cuando esté disponible.
            </ThemedText>
            <TouchableOpacity
              style={estilos.botonCerrarModal}
              onPress={() => setMostrarImportar(false)}
            >
              <ThemedText>Cerrar</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      )}
    </ThemedView>
  );
}

// ───────────────────────────── Pantalla principal ─────────────────────────────

export default function AsistenciaScreen() {
  const { user } = useAuth();
  const { hasRole: esGerencia } = useRole(['gerenciaLocal']);

  // Gerencia ve la vista de gestión, otros ven solo su historial
  if (esGerencia) {
    return <VistaGerencia usuario={user} />;
  }

  return <VistaUsuarioNormal usuario={user} />;
}

// ───────────────────────────── Estilos ─────────────────────────────

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    paddingTop: '8%',
    gap: 14,
  },
  filaEncabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fecha: {
    opacity: 0.7,
    fontSize: 13,
  },
  filaHoras: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitulo: {
    opacity: 0.7,
  },
  botonImportar: {
    backgroundColor: '#34C759',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  textoBotonImportar: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  textoError: {
    color: '#D32F2F',
    textAlign: 'center',
  },
  tarjetaEstado: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    gap: 6,
  },
  textoEstado: {
    fontSize: 18,
    fontWeight: '600',
  },
  subtextoEstado: {
    opacity: 0.6,
  },
  tituloHistorial: {
    marginTop: 8,
  },
  contenidoLista: {
    gap: 8,
  },
  filaHistorial: {
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    gap: 4,
  },
  textoHoras: {
    opacity: 0.7,
    fontSize: 13,
  },
  textoVacio: {
    opacity: 0.5,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  reintentar: {
    color: '#007AFF',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  centrado: {
    textAlign: 'center',
    marginTop: 20,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContenido: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    gap: 12,
    width: '100%',
    maxWidth: 400,
  },
  subtituloModal: {
    opacity: 0.7,
    textAlign: 'center',
  },
  botonMarcar: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  textoBotonMarcar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  botonCerrarModal: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
});