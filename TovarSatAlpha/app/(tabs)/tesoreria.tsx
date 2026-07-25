import { useState, useMemo } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  FlatList,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/hooks/useAuth';
import { useMovimientos } from '@/features/tesoreria/hooks/useMovimientos';
import type { MovimientoTesoreria } from '@/types';

type FormularioMov = {
  tipo: 'avio' | 'retiro';
  sede: string;
  concepto: string;
  monto: string;
  moneda: string;
  tasaBCV: string;
  fechaTasa: string;
  avioRef: string;
};

function formatearFecha(ts: Date | any): string {
  if (!ts) return '-';
  const d = ts instanceof Date ? ts : ts.toDate?.() || new Date(ts);
  return d.toLocaleDateString('es-VE');
}

function formatearMonto(valor: number): string {
  return valor.toFixed(2);
}

function colorEstado(estado: string): string {
  switch (estado) {
    case 'aprobado': return '#2E7D32';
    case 'pendiente': return '#E65100';
    case 'anulado': return '#B71C1C';
    default: return '#666';
  }
}

function nombreEstado(estado: string): string {
  switch (estado) {
    case 'aprobado': return 'Aprobado';
    case 'pendiente': return 'Pendiente';
    case 'anulado': return 'Anulado';
    default: return estado;
  }
}

function MovimientoRow({ item }: { item: MovimientoTesoreria }) {
  const esAvio = item.tipo === 'avio';
  const colorTipo = esAvio ? '#2E7D32' : '#C62828';
  const icono = esAvio ? '▲' : '▼';

  return (
    <ThemedView style={estilos.filaMov}>
      <ThemedView style={estilos.filaTop}>
        <ThemedView style={{ flex: 1 }}>
          <ThemedText type="defaultSemiBold">{item.concepto}</ThemedText>
          <ThemedText style={estilos.filaMonto}>
            {icono} ${formatearMonto(item.monto)} {item.moneda}
          </ThemedText>
          <ThemedText style={estilos.filaMeta}>
            Sede: {item.sede} · Tasa: {item.tasaBCV.toFixed(2)} · {formatearFecha(item.fechaTasa)}
          </ThemedText>
          {item.avioRef && (
            <ThemedText style={estilos.filaAvioRef}>Avío ref: {item.avioRef}</ThemedText>
          )}
        </ThemedView>
        <ThemedView style={[estilos.badge, { backgroundColor: colorEstado(item.estado) + '22', borderColor: colorEstado(item.estado) }]}>
          <ThemedText style={{ color: colorEstado(item.estado), fontSize: 12, fontWeight: '600' }}>
            {nombreEstado(item.estado)}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

export default function TesoreriaScreen() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const theme = {
    modalBg: colorScheme === 'dark' ? '#1c1c1e' : '#ffffff',
    inputBg: colorScheme === 'dark' ? '#2c2c2e' : '#ffffff',
    inputBorder: colorScheme === 'dark' ? '#3a3a3c' : '#ccc',
    selectBg: colorScheme === 'dark' ? '#2c2c2e' : '#ffffff',
    overlay: colorScheme === 'dark' ? '#000000cc' : '#000000aa',
    optionBg: colorScheme === 'dark' ? '#2c2c2e' : '#f5f5f5',
    sectionBg: colorScheme === 'dark' ? '#2c2c2e' : '#f0f8f0',
    rowBg: colorScheme === 'dark' ? '#1c1c1e' : '#ffffff',
    rowBorder: colorScheme === 'dark' ? '#3a3a3c' : '#ddd',
    cardBg: colorScheme === 'dark' ? '#1c1c1e' : '#ffffff',
    chipBg: colorScheme === 'dark' ? '#3a3a3c' : '#eee',
    chipActiveBg: colorScheme === 'dark' ? '#0a84ff' : '#007AFF',
  };

  const esGerencia = user?.rol === 'gerenciaLocal';

  const {
    movimientos,
    fondos,
    sedes,
    isLoading,
    error,
    createAvio,
    createRetiro,
    retry,
  } = useMovimientos(user?.uid, user?.sede, false, undefined, user?.sedeNombre);

  const [filtroEstado, setFiltroEstado] = useState<string>('Todos');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalRetiro, setModalRetiro] = useState(false);
  const [mostrarSelectSede, setMostrarSelectSede] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormularioMov>({
    tipo: 'avio',
    sede: '',
    concepto: '',
    monto: '',
    moneda: 'USD',
    tasaBCV: '',
    fechaTasa: '',
    avioRef: '',
  });

  const movimientosFiltrados = useMemo(() => {
    return filtroEstado === 'Todos'
      ? movimientos
      : movimientos.filter((m) => m.estado === filtroEstado);
  }, [movimientos, filtroEstado]);

  const fondosUnicos = useMemo(() => {
    const vistos = new Set<string>();
    return fondos.filter((f) => {
      const key = `${f.sede}-${f.moneda}`;
      if (vistos.has(key)) return false;
      vistos.add(key);
      return true;
    });
  }, [fondos]);

  const handleCreateAvio = async () => {
    if (!esGerencia) {
      Alert.alert('No autorizado', 'No tiene permisos para esta acción');
      return;
    }
    setSaving(true);
    const monto = Number(form.monto);
    const tasa = Number(form.tasaBCV);

    if (!form.sede) {
      Alert.alert('Validación', 'Seleccione una sede');
      setSaving(false);
      return;
    }
    if (monto <= 0 || isNaN(monto)) {
      Alert.alert('Validación', 'Ingrese un monto válido');
      setSaving(false);
      return;
    }
    if (tasa <= 0 || isNaN(tasa)) {
      Alert.alert('Validación', 'Ingrese una tasa BCV válida');
      setSaving(false);
      return;
    }

    try {
      await createAvio({
        monto,
        moneda: form.moneda,
        tasaBCV: tasa,
        fechaTasa: new Date(form.fechaTasa || Date.now()),
        concepto: form.concepto,
        sede: form.sede,
      });
      Alert.alert('Éxito', 'Avío solicitado correctamente');
      setModalAbierto(false);
      resetForm();
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateRetiro = async () => {
    if (!esGerencia) {
      Alert.alert('No autorizado', 'No tiene permisos para esta acción');
      return;
    }
    setSaving(true);
    const monto = Number(form.monto);
    const tasa = Number(form.tasaBCV);

    if (!form.sede) {
      Alert.alert('Validación', 'Seleccione una sede');
      setSaving(false);
      return;
    }
    if (monto <= 0 || isNaN(monto)) {
      Alert.alert('Validación', 'Ingrese un monto válido');
      setSaving(false);
      return;
    }
    if (tasa <= 0 || isNaN(tasa)) {
      Alert.alert('Validación', 'Ingrese una tasa BCV válida');
      setSaving(false);
      return;
    }

    try {
      await createRetiro({
        monto,
        moneda: form.moneda,
        tasaBCV: tasa,
        fechaTasa: new Date(form.fechaTasa || Date.now()),
        concepto: form.concepto,
        sede: form.sede,
        avioRef: form.avioRef || undefined,
      });
      Alert.alert('Éxito', 'Retiro solicitado (pendiente de aprobación)');
      setModalRetiro(false);
      resetForm();
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setForm({ tipo: 'avio', sede: '', concepto: '', monto: '', moneda: 'USD', tasaBCV: '', fechaTasa: '', avioRef: '' });
  };

  const abrirAvio = () => {
    if (!esGerencia) return;
    setForm({ ...form, tipo: 'avio', sede: '' });
    setModalAbierto(true);
  };

  const abrirRetiro = () => {
    if (!esGerencia) return;
    setForm({ ...form, tipo: 'retiro', sede: '' });
    setModalRetiro(true);
  };

  return (
    <ThemedView style={estilos.contenedor}>
      <ThemedText type="title" style={estilos.titulo}>Tesorería</ThemedText>
      <ThemedText style={estilos.subtitulo}>
        {user?.nombre} · {user?.sedeNombre || user?.sede}
      </ThemedText>

      {error && (
        <>
          <ThemedText style={estilos.textoError}>{error}</ThemedText>
          <TouchableOpacity onPress={retry}>
            <ThemedText style={estilos.reintentar}>Reintentar</ThemedText>
          </TouchableOpacity>
        </>
      )}

      {fondosUnicos.length === 0 ? (
        <ThemedView style={[estilos.fondoCardVacio, { backgroundColor: theme.sectionBg, borderColor: theme.rowBorder }]}>
          <ThemedText style={estilos.fondoSinDatos}>Sin fondos registrados</ThemedText>
        </ThemedView>
      ) : (
        fondosUnicos.map((f) => {
          const nombreSede = sedes.find((s) => s.id === f.sede || s.nombre === f.sede)?.nombre || f.sede;
          return (
            <ThemedView key={`${f.sede}-${f.moneda}`} style={[estilos.fondoCardAncho, { backgroundColor: theme.sectionBg, borderColor: theme.rowBorder }]}>
              <ThemedView style={estilos.fondoCardHeader}>
                <ThemedText style={estilos.fondoSede}>{nombreSede}</ThemedText>
                <ThemedText style={estilos.fondoMoneda}>{f.moneda}</ThemedText>
              </ThemedView>
              <ThemedText style={estilos.fondoSaldo}>${formatearMonto(f.saldo)}</ThemedText>
            </ThemedView>
          );
        })
      )}

      {esGerencia && (
        <ThemedView style={estilos.filaBotonesAccion}>
          <TouchableOpacity style={estilos.botonAvio} onPress={abrirAvio}>
            <ThemedText style={estilos.textoBoton}>▲ Solicitud de Avío</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.botonRetiro} onPress={abrirRetiro}>
            <ThemedText style={estilos.textoBoton}>▼ Solicitud de Retiro</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={estilos.filtrosScroll}>
        {['Todos', 'pendiente', 'aprobado', 'anulado'].map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              estilos.chip,
              { backgroundColor: filtroEstado === f ? theme.chipActiveBg : theme.chipBg },
              filtroEstado === f && estilos.chipActivo,
            ]}
            onPress={() => setFiltroEstado(f)}
          >
            <ThemedText style={[estilos.chipTexto, filtroEstado === f && estilos.chipTextoActivo]}>
              {f === 'Todos' ? 'Todos' : nombreEstado(f)}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {isLoading ? (
        <ThemedView style={estilos.centro}>
          <ActivityIndicator size="large" />
          <ThemedText>Cargando movimientos...</ThemedText>
        </ThemedView>
      ) : movimientosFiltrados.length === 0 ? (
        <ThemedView style={estilos.centro}>
          <ThemedText style={estilos.textoVacio}>
            No hay movimientos {filtroEstado !== 'Todos' ? nombreEstado(filtroEstado) : ''}
          </ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={movimientosFiltrados}
          keyExtractor={(item) => item.id || ''}
          renderItem={({ item }) => <MovimientoRow item={item} />}
          contentContainerStyle={estilos.listaContenido}
          removeClippedSubviews={false}
        />
      )}

      <Modal visible={modalAbierto} transparent animationType="slide">
        <ThemedView style={[estilos.fondoModal, { backgroundColor: theme.overlay }]}>
          <ScrollView style={[estilos.modalContenido, { backgroundColor: theme.modalBg }]}>
            <ThemedText type="defaultSemiBold">Nueva Solicitud de Avío</ThemedText>
            <TouchableOpacity
              style={[estilos.selectTrigger, { backgroundColor: theme.selectBg, borderColor: theme.inputBorder }]}
              onPress={() => setMostrarSelectSede(true)}
            >
              <ThemedText>{sedes.find((s) => s.id === form.sede)?.nombre || form.sede || 'Seleccionar sede *'}</ThemedText>
              <ThemedText style={estilos.selectFlecha}>▼</ThemedText>
            </TouchableOpacity>
            <TextInput style={[estilos.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]} placeholder="Concepto *" value={form.concepto} onChangeText={(t) => setForm((f) => ({ ...f, concepto: t }))} placeholderTextColor="#999" />
            <TextInput style={[estilos.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]} placeholder="Monto *" value={form.monto} onChangeText={(t) => { const s = t.replace(/[^0-9.]/g, ''); setForm((f) => ({ ...f, monto: s })); }} keyboardType="decimal-pad" placeholderTextColor="#999" />
            <TextInput style={[estilos.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]} placeholder="Moneda (USD/VES/EUR)" value={form.moneda} onChangeText={(t) => setForm((f) => ({ ...f, moneda: t.toUpperCase() }))} placeholderTextColor="#999" autoCapitalize="characters" />
            <TextInput style={[estilos.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]} placeholder="Tasa BCV *" value={form.tasaBCV} onChangeText={(t) => { const s = t.replace(/[^0-9.]/g, ''); setForm((f) => ({ ...f, tasaBCV: s })); }} keyboardType="decimal-pad" placeholderTextColor="#999" />
            <TextInput style={[estilos.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]} placeholder="Fecha tasa (YYYY-MM-DD)" value={form.fechaTasa} onChangeText={(t) => setForm((f) => ({ ...f, fechaTasa: t }))} placeholderTextColor="#999" autoCapitalize="none" />
            <ThemedView style={estilos.filaBotonesModal}>
              <TouchableOpacity style={estilos.botonCancelar} onPress={() => setModalAbierto(false)}><ThemedText>Cancelar</ThemedText></TouchableOpacity>
              <TouchableOpacity style={saving ? estilos.botonDesactivado : estilos.botonGuardar} onPress={handleCreateAvio} disabled={saving}>
                <ThemedText style={estilos.textoGuardar}>{saving ? 'Enviando...' : 'Enviar Solicitud'}</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ScrollView>
        </ThemedView>
      </Modal>

      <Modal visible={modalRetiro} transparent animationType="slide">
        <ThemedView style={[estilos.fondoModal, { backgroundColor: theme.overlay }]}>
          <ScrollView style={[estilos.modalContenido, { backgroundColor: theme.modalBg }]}>
            <ThemedText type="defaultSemiBold">Nueva Solicitud de Retiro</ThemedText>
            <TouchableOpacity
              style={[estilos.selectTrigger, { backgroundColor: theme.selectBg, borderColor: theme.inputBorder }]}
              onPress={() => setMostrarSelectSede(true)}
            >
              <ThemedText>{sedes.find((s) => s.id === form.sede)?.nombre || form.sede || 'Seleccionar sede *'}</ThemedText>
              <ThemedText style={estilos.selectFlecha}>▼</ThemedText>
            </TouchableOpacity>
            <TextInput style={[estilos.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]} placeholder="Concepto *" value={form.concepto} onChangeText={(t) => setForm((f) => ({ ...f, concepto: t }))} placeholderTextColor="#999" />
            <TextInput style={[estilos.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]} placeholder="Monto *" value={form.monto} onChangeText={(t) => { const s = t.replace(/[^0-9.]/g, ''); setForm((f) => ({ ...f, monto: s })); }} keyboardType="decimal-pad" placeholderTextColor="#999" />
            <TextInput style={[estilos.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]} placeholder="Moneda (USD/VES/EUR)" value={form.moneda} onChangeText={(t) => setForm((f) => ({ ...f, moneda: t.toUpperCase() }))} placeholderTextColor="#999" autoCapitalize="characters" />
            <TextInput style={[estilos.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]} placeholder="Tasa BCV *" value={form.tasaBCV} onChangeText={(t) => { const s = t.replace(/[^0-9.]/g, ''); setForm((f) => ({ ...f, tasaBCV: s })); }} keyboardType="decimal-pad" placeholderTextColor="#999" />
            <TextInput style={[estilos.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]} placeholder="Fecha tasa (YYYY-MM-DD)" value={form.fechaTasa} onChangeText={(t) => setForm((f) => ({ ...f, fechaTasa: t }))} placeholderTextColor="#999" autoCapitalize="none" />
            <TextInput style={[estilos.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]} placeholder="Avío ref (opcional)" value={form.avioRef} onChangeText={(t) => setForm((f) => ({ ...f, avioRef: t }))} placeholderTextColor="#999" autoCapitalize="none" />
            <ThemedView style={estilos.filaBotonesModal}>
              <TouchableOpacity style={estilos.botonCancelar} onPress={() => setModalRetiro(false)}><ThemedText>Cancelar</ThemedText></TouchableOpacity>
              <TouchableOpacity style={saving ? estilos.botonDesactivado : estilos.botonGuardar} onPress={handleCreateRetiro} disabled={saving}>
                <ThemedText style={estilos.textoGuardar}>{saving ? 'Enviando...' : 'Enviar Solicitud'}</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ScrollView>
        </ThemedView>
      </Modal>

      <Modal visible={mostrarSelectSede} transparent animationType="fade">
        <ThemedView style={[estilos.fondoModal, { backgroundColor: theme.overlay }]}>
          <ThemedView style={[estilos.contenidoSelect, { backgroundColor: theme.modalBg }]}>
            <ThemedText type="defaultSemiBold">Seleccionar sede</ThemedText>
            {sedes.length === 0 ? (
              <ThemedText style={estilos.textoVacio}>No hay sedes. Créala en Más → Sedes.</ThemedText>
            ) : (
              sedes.map((s) => (
                <TouchableOpacity
                  key={s.id}
                  style={[
                    estilos.opcionSelect,
                    { backgroundColor: theme.optionBg },
                    form.sede === s.id && estilos.opcionSelectActiva,
                  ]}
                  onPress={() => {
                    setForm((f) => ({ ...f, sede: s.id! }));
                    setMostrarSelectSede(false);
                  }}
                >
                  <ThemedText style={form.sede === s.id ? estilos.textoOpcionActiva : undefined}>
                    {s.nombre}
                  </ThemedText>
                </TouchableOpacity>
              ))
            )}
            <TouchableOpacity style={estilos.botonCerrarSelect} onPress={() => setMostrarSelectSede(false)}>
              <ThemedText>Cerrar</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, padding: 16, paddingTop: '8%', gap: 12 },
  titulo: { marginBottom: 2 },
  subtitulo: { opacity: 0.7, marginBottom: 4 },
  textoError: { color: '#D32F2F', textAlign: 'center' },
  reintentar: { color: '#007AFF', fontWeight: '600', textAlign: 'center' },
  fondoCardVacio: { borderRadius: 10, padding: 18, alignItems: 'center', borderWidth: 1 },
  fondoCardAncho: { borderRadius: 10, padding: 16, marginBottom: 8, borderWidth: 1 },
  fondoCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  fondoSede: { fontSize: 12, opacity: 0.6 },
  fondoSaldo: { fontSize: 22, fontWeight: '700', color: '#2E7D32' },
  fondoMoneda: { fontSize: 13, fontWeight: '600' },
  fondoSinDatos: { opacity: 0.5, fontStyle: 'italic' },
  filaBotonesAccion: { flexDirection: 'row', gap: 10 },
  botonAvio: { flex: 1, backgroundColor: '#2E7D32', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  botonRetiro: { flex: 1, backgroundColor: '#C62828', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  textoBoton: { color: '#fff', fontWeight: '700' },
  filtrosScroll: { maxHeight: 36 },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, marginRight: 8 },
  chipActivo: { backgroundColor: '#007AFF' },
  chipTexto: { fontSize: 13 },
  chipTextoActivo: { color: '#fff' },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  textoVacio: { opacity: 0.5, fontStyle: 'italic' },
  listaContenido: { gap: 8, paddingBottom: 20 },
  filaMov: { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', gap: 8 },
  filaTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  filaMonto: { fontWeight: '700', fontSize: 15 },
  filaMeta: { fontSize: 12, opacity: 0.6 },
  filaAvioRef: { fontSize: 11, opacity: 0.5 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, borderWidth: 1 },
  fondoModal: { flex: 1, justifyContent: 'center', padding: 20 },
  modalContenido: { borderRadius: 10, padding: 20, gap: 12, maxHeight: '80%' },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, fontSize: 15 },
  selectTrigger: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderRadius: 8, padding: 10, fontSize: 15 },
  selectFlecha: { fontSize: 12, opacity: 0.5 },
  filaBotonesModal: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 10, backgroundColor: 'transparent' },
  botonGuardar: { backgroundColor: '#007AFF', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 6 },
  botonDesactivado: { opacity: 0.4 },
  textoGuardar: { color: '#fff', fontWeight: '700' },
  contenidoSelect: { borderRadius: 10, padding: 20, gap: 8, maxHeight: '70%' },
  opcionSelect: { padding: 12, borderRadius: 6 },
  opcionSelectActiva: { backgroundColor: '#007AFF' },
  textoOpcionActiva: { color: '#fff', fontWeight: '600' },
  botonCancelar: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: 6, borderWidth: 1, borderColor: 'gray', backgroundColor: 'transparent' },
  botonCerrarSelect: { marginTop: 8, padding: 10, alignItems: 'center' },
});