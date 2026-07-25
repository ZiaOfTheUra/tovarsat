import { useState, useMemo } from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useEquipos } from '@/features/inventario/hooks/useEquipos';
import type { EquipoInventario, Sede, TipoEquipo } from '@/types';

// ───────────────────────────── Tipos auxiliares ─────────────────────────────

const ESTADOS_EQUIPO = ['disponible', 'asignado', 'en_reparacion', 'dado_de_baja'] as const;

type FormularioEquipo = {
  nombreDescriptivo: string;
  tipoEquipoId: string;
  modelo: string;
  valor: string;
  cantidadDisponible: string;
  serial: string;
  estado: string;
  ubicacionActualId: string;
};

function obtenerNombreSede(sedes: Sede[], id: string | undefined): string {
  const s = sedes.find((s) => s.id === id);
  return s?.nombre || id || '-';
}

function obtenerNombreTipo(tipos: TipoEquipo[], id: string | undefined): string {
  const t = tipos.find((t) => t.id === id);
  return t?.nombreTipo || id || '-';
}

// ───────────────────────────── Componente: Fila de equipo ─────────────────────────────

function EquipoItemRow({
  item,
  sedes,
  tipos,
  onEdit,
  onDelete,
}: {
  item: EquipoInventario;
  sedes: Sede[];
  tipos: TipoEquipo[];
  onEdit: (item: EquipoInventario) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <ThemedView style={estilos.filaItem}>
      <ThemedView style={estilos.infoItem}>
        <ThemedText type="defaultSemiBold">{item.nombreDescriptivo}</ThemedText>
        <ThemedText>
          Modelo: {item.modelo} · Serial: {item.serial}
        </ThemedText>
        <ThemedText>
          Cantidad: {item.cantidadDisponible} · Valor: ${item.valor.toFixed(2)}
        </ThemedText>
        <ThemedText>
          Estado: {item.estado} · Sede: {obtenerNombreSede(sedes, item.ubicacionActual)}
        </ThemedText>
        <ThemedText style={estilos.textoTipo}>
          Tipo: {obtenerNombreTipo(tipos, item.tipoEquipoModelo)}
        </ThemedText>
      </ThemedView>

      <ThemedView style={estilos.botonesAccion}>
        <TouchableOpacity
          style={estilos.botonEditar}
          onPress={() => {
            console.log('[InventarioScreen] Editar equipo:', item.id);
            onEdit(item);
          }}
        >
          <ThemedText style={estilos.textoEditar}>✏️</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.botonEliminar}
          onPress={() => {
            console.log('[InventarioScreen] Eliminar presionado:', item.id);
            Alert.alert(
              'Confirmar eliminación',
              `¿Eliminar "${item.nombreDescriptivo}"?`,
              [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'Eliminar',
                  style: 'destructive',
                  onPress: () => onDelete(item.id!),
                },
              ]
            );
          }}
        >
          <ThemedText style={estilos.textoEliminar}>🗑️</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

// ───────────────────────────── Pantalla principal ─────────────────────────────

export default function InventarioScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const theme = {
    modalBg: colorScheme === 'dark' ? '#1c1c1e' : '#ffffff',
    inputBg: colorScheme === 'dark' ? '#2c2c2e' : '#ffffff',
    inputBorder: colorScheme === 'dark' ? '#3a3a3c' : '#ccc',
    selectBg: colorScheme === 'dark' ? '#2c2c2e' : '#ffffff',
    overlay: colorScheme === 'dark' ? '#000000cc' : '#000000aa',
    optionBg: colorScheme === 'dark' ? '#2c2c2e' : '#f5f5f5',
  };
  const { items, sedes, tipos, isLoading, error, createEquipo, updateEquipo, deleteEquipo, retry } =
    useEquipos(user?.uid);

  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mostrarSelect, setMostrarSelect] = useState<null | 'estado' | 'sede' | 'tipoEquipo'>(null);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formulario, setFormulario] = useState<FormularioEquipo>({
    nombreDescriptivo: '',
    tipoEquipoId: '',
    modelo: '',
    valor: '',
    cantidadDisponible: '',
    serial: '',
    estado: 'disponible',
    ubicacionActualId: '',
  });

  // Auto-completar modelo cuando cambia el tipo
  const cambiarTipo = (tipoId: string) => {
    const tipo = tipos.find((t) => t.id === tipoId);
    setFormulario((f) => ({
      ...f,
      tipoEquipoId: tipoId,
      modelo: tipo?.modelo || '',
    }));
  };

  // Filtrar equipos por nombre
  const itemsFiltrados = useMemo(() => {
    console.log('[InventarioScreen] Filtrando', items.length, 'equipos, búsqueda:', busqueda);
    const filtrados = items.filter((item) =>
      item.nombreDescriptivo.toLowerCase().includes(busqueda.toLowerCase())
    );
    console.log('[InventarioScreen] Equipos filtrados:', filtrados.length);
    return filtrados;
  }, [items, busqueda]);

  // ── Acciones del formulario ──────────────────────────────

  const abrirNuevo = () => {
    console.log('[InventarioScreen] Abrir formulario: nuevo equipo');
    setEditandoId(null);
    setFormulario({
      nombreDescriptivo: '',
      tipoEquipoId: '',
      modelo: '',
      valor: '',
      cantidadDisponible: '',
      serial: '',
      estado: 'disponible',
      ubicacionActualId: '',
    });
    setModalAbierto(true);
  };

  const abrirEditar = (item: EquipoInventario) => {
    console.log('[InventarioScreen] Abrir formulario: editar', item.id);
    setEditandoId(item.id || null);
    setFormulario({
      nombreDescriptivo: item.nombreDescriptivo,
      tipoEquipoId: item.tipoEquipoModelo || '',
      modelo: item.modelo,
      valor: String(item.valor),
      cantidadDisponible: String(item.cantidadDisponible),
      serial: item.serial,
      estado: item.estado,
      ubicacionActualId: item.ubicacionActual || '',
    });
    setModalAbierto(true);
  };

  const guardar = async () => {
    console.log('[InventarioScreen] Guardar presionado, editandoId:', editandoId);

    if (!formulario.nombreDescriptivo.trim()) {
      Alert.alert('Validación', 'El nombre descriptivo es obligatorio');
      return;
    }

    const cantidad = Number(formulario.cantidadDisponible);
    if (formulario.cantidadDisponible === '' || isNaN(cantidad) || cantidad < 0) {
      Alert.alert('Validación', 'La cantidad debe ser un número entero positivo');
      return;
    }

    const valor = Number(formulario.valor);
    if (formulario.valor === '' || isNaN(valor) || valor < 0) {
      Alert.alert('Validación', 'El valor debe ser un número válido');
      return;
    }

    if (!formulario.serial.trim()) {
      Alert.alert('Validación', 'El serial es obligatorio');
      return;
    }

    const datosBase: Omit<EquipoInventario, 'id'> = {
      nombreDescriptivo: formulario.nombreDescriptivo.trim(),
      modelo: formulario.modelo.trim(),
      valor,
      cantidadDisponible: cantidad,
      serial: formulario.serial.trim(),
      estado: formulario.estado,
      tipoEquipoModelo: formulario.tipoEquipoId || undefined,
      ubicacionActual: formulario.ubicacionActualId || undefined,
    };

    try {
      if (editandoId) {
        console.log('[InventarioScreen] Actualizando equipo', editandoId);
        await updateEquipo(editandoId, datosBase);
        Alert.alert('Éxito', 'Equipo actualizado correctamente');
      } else {
        console.log('[InventarioScreen] Creando nuevo equipo');
        await createEquipo(datosBase);
        Alert.alert('Éxito', 'Equipo creado correctamente');
      }
      setModalAbierto(false);
    } catch (err) {
      console.log('[InventarioScreen] Error al guardar:', err);
      Alert.alert('Error', 'No se pudo guardar el equipo');
    }
  };

  const eliminar = async (id: string) => {
    console.log('[InventarioScreen] Eliminando equipo', id);
    try {
      await deleteEquipo(id);
      Alert.alert('Éxito', 'Equipo eliminado correctamente');
    } catch (err) {
      console.log('[InventarioScreen] Error al eliminar:', err);
      Alert.alert('Error', 'No se pudo eliminar el equipo');
    }
  };

  // ── Renderizado ──────────────────────────────────────────

  const renderItem = ({ item }: { item: EquipoInventario }) => (
    <EquipoItemRow
      item={item}
      sedes={sedes}
      tipos={tipos}
      onEdit={abrirEditar}
      onDelete={eliminar}
    />
  );

  return (
    <ThemedView style={estilos.contenedor}>
      {/* Encabezado */}
      <ThemedView style={estilos.filaEncabezado}>
        <ThemedText type="title">Inventario</ThemedText>
        <TouchableOpacity style={estilos.botonNuevo} onPress={abrirNuevo}>
          <ThemedText style={estilos.textoNuevo}>＋ Nuevo</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedText style={estilos.subtitulo}>
        Usuario: {user?.nombre} · Sede: {user?.sedeNombre || user?.sede || '-'}
      </ThemedText>

      {/* Barra de búsqueda */}
      <TextInput
        style={[
          estilos.busqueda,
          {
            backgroundColor: theme.inputBg,
            borderColor: theme.inputBorder,
          },
        ]}
        placeholder="Buscar equipo por nombre..."
        value={busqueda}
        onChangeText={(texto) => {
          console.log('[InventarioScreen] Busqueda cambiada:', texto);
          setBusqueda(texto);
        }}
        placeholderTextColor="#999"
      />

      {/* Error */}
      {error ? (
        <>
          <ThemedText style={estilos.textoError}>{error}</ThemedText>
          <TouchableOpacity onPress={retry}>
            <ThemedText style={estilos.reintentar}>Reintentar</ThemedText>
          </TouchableOpacity>
        </>
      ) : null}

      {/* Lista */}
      {isLoading ? (
        <ThemedText>Cargando equipos...</ThemedText>
      ) : itemsFiltrados.length === 0 ? (
        <ThemedText style={estilos.textoVacio}>
          {busqueda ? 'Sin resultados para la búsqueda' : 'No hay equipos registrados'}
        </ThemedText>
      ) : (
        <FlatList
          data={itemsFiltrados}
          keyExtractor={(item) => item.id || ''}
          renderItem={renderItem}
          contentContainerStyle={estilos.listaContenido}
          removeClippedSubviews={false}
        />
      )}


      {/* Modal de creación/edición */}
      <Modal
        visible={modalAbierto}
        animationType="slide"
        transparent
        onRequestClose={() => setModalAbierto(false)}
      >
        <ThemedView style={[estilos.fondoModal, { backgroundColor: theme.overlay }]}>
          <ScrollView
            style={[
              estilos.modalContenido,
              { backgroundColor: theme.modalBg },
            ]}
          >
            <ThemedText type="defaultSemiBold">
              {editandoId ? 'Editar equipo' : 'Nuevo equipo'}
            </ThemedText>

            {/* Nombre descriptivo */}
            <TextInput
              style={[estilos.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]}
              placeholder="Nombre descriptivo"
              value={formulario.nombreDescriptivo}
              onChangeText={(texto) =>
                setFormulario((f) => ({ ...f, nombreDescriptivo: texto }))
              }
              placeholderTextColor="#999"
            />

            {/* Tipo de equipo dropdown */}
            <TouchableOpacity
              style={[estilos.selectTrigger, { backgroundColor: theme.selectBg, borderColor: theme.inputBorder }]}
              onPress={() => {
                console.log('[InventarioScreen] Abrir selector de tipo equipo');
                setMostrarSelect('tipoEquipo');
              }}
            >
              <ThemedText>
                Tipo: {obtenerNombreTipo(tipos, formulario.tipoEquipoId)}
              </ThemedText>
              <ThemedText style={estilos.selectFlecha}>▼</ThemedText>
            </TouchableOpacity>

            {/* Modelo (auto-fill) */}
            <TextInput
              style={[estilos.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]}
              placeholder="Modelo"
              value={formulario.modelo}
              onChangeText={(texto) =>
                setFormulario((f) => ({ ...f, modelo: texto }))
              }
              placeholderTextColor="#999"
            />

            {/* Serial */}
            <TextInput
              style={[estilos.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]}
              placeholder="Serial"
              value={formulario.serial}
              onChangeText={(texto) =>
                setFormulario((f) => ({ ...f, serial: texto }))
              }
              placeholderTextColor="#999"
            />

            {/* Sede dropdown */}
            <TouchableOpacity
              style={[estilos.selectTrigger, { backgroundColor: theme.selectBg, borderColor: theme.inputBorder }]}
              onPress={() => {
                console.log('[InventarioScreen] Abrir selector de sede');
                setMostrarSelect('sede');
              }}
            >
              <ThemedText>
                Ubicación: {obtenerNombreSede(sedes, formulario.ubicacionActualId)}
              </ThemedText>
              <ThemedText style={estilos.selectFlecha}>▼</ThemedText>
            </TouchableOpacity>

            {/* Cantidad */}
            <TextInput
              style={[estilos.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]}
              placeholder="Cantidad disponible"
              value={formulario.cantidadDisponible}
              onChangeText={(texto) => {
                const soloDigitos = texto.replace(/[^0-9]/g, '');
                setFormulario((f) => ({ ...f, cantidadDisponible: soloDigitos }));
              }}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />

            {/* Valor */}
            <TextInput
              style={[estilos.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]}
              placeholder="Valor ($)"
              value={formulario.valor}
              onChangeText={(texto) => {
                const sanitized = texto.replace(/[^0-9.]/g, '');
                setFormulario((f) => ({ ...f, valor: sanitized }));
              }}
              keyboardType="decimal-pad"
              placeholderTextColor="#999"
            />

            {/* Estado dropdown */}
            <TouchableOpacity
              style={[estilos.selectTrigger, { backgroundColor: theme.selectBg, borderColor: theme.inputBorder }]}
              onPress={() => {
                console.log('[InventarioScreen] Abrir selector de estado');
                setMostrarSelect('estado');
              }}
            >
              <ThemedText>Estado: {formulario.estado}</ThemedText>
              <ThemedText style={estilos.selectFlecha}>▼</ThemedText>
            </TouchableOpacity>

      {/* Botones */}
            <ThemedView style={estilos.filaBotonesModal}>
              <TouchableOpacity
                style={estilos.botonCancelar}
                onPress={() => setModalAbierto(false)}
              >
                <ThemedText>Cancelar</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity style={estilos.botonGuardar} onPress={guardar}>
                <ThemedText style={estilos.textoGuardar}>Guardar</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ScrollView>
        </ThemedView>
      </Modal>

      {/* Modal selector genérico */}
      <Modal visible={mostrarSelect !== null} transparent animationType="fade">
        <ThemedView style={[estilos.fondoSelect, { backgroundColor: theme.overlay }]}>
          <ThemedView
            style={[
              estilos.contenidoSelect,
              { backgroundColor: theme.modalBg },
            ]}
          >
            <ThemedText type="defaultSemiBold">
              {mostrarSelect === 'estado'
                ? 'Seleccionar estado'
                : mostrarSelect === 'sede'
                  ? 'Seleccionar sede'
                  : 'Seleccionar tipo de equipo'}
            </ThemedText>

            {mostrarSelect === 'estado' &&
              ESTADOS_EQUIPO.map((opcion) => (
                <TouchableOpacity
                  key={opcion}
                  style={[
                    estilos.opcionSelect,
                    { backgroundColor: theme.optionBg },
                    formulario.estado === opcion && estilos.opcionSelectActiva,
                  ]}
                  onPress={() => {
                    console.log('[InventarioScreen] Estado:', opcion);
                    setFormulario((f) => ({ ...f, estado: opcion }));
                    setMostrarSelect(null);
                  }}
                >
                  <ThemedText
                    style={
                      formulario.estado === opcion ? estilos.textoOpcionActiva : undefined
                    }
                  >
                    {opcion}
                  </ThemedText>
                </TouchableOpacity>
              ))}

    {mostrarSelect === 'sede' &&
              sedes.map((s) => (
                <TouchableOpacity
                  key={s.id}
                  style={[
                    estilos.opcionSelect,
                    { backgroundColor: theme.optionBg },
                    formulario.ubicacionActualId === s.id && estilos.opcionSelectActiva,
                  ]}
                  onPress={() => {
                    console.log('[InventarioScreen] Sede:', s.nombre);
                    setFormulario((f) => ({ ...f, ubicacionActualId: s.id ?? '' }));
                    setMostrarSelect(null);
                  }}
                >
                  <ThemedText
                    style={
                      formulario.ubicacionActualId === s.id
                        ? estilos.textoOpcionActiva
                        : undefined
                    }
                  >
                    {s.nombre}
                  </ThemedText>
                </TouchableOpacity>
              ))}

    {mostrarSelect === 'tipoEquipo' &&
              tipos.map((t) => (
                <TouchableOpacity
                  key={t.id}
                  style={[
                    estilos.opcionSelect,
                    { backgroundColor: theme.optionBg },
                    formulario.tipoEquipoId === t.id && estilos.opcionSelectActiva,
                  ]}
                  onPress={() => {
                    console.log('[InventarioScreen] Tipo:', t.nombreTipo);
                    cambiarTipo(t.id ?? '');
                    setMostrarSelect(null);
                  }}
                >
                  <ThemedView style={estilos.opcionTipo}>
                    <ThemedText
                      style={
                        formulario.tipoEquipoId === t.id
                          ? estilos.textoOpcionActiva
                          : undefined
                      }
                    >
                      {t.nombreTipo}
                    </ThemedText>
                    <ThemedText
                      style={
                        formulario.tipoEquipoId === t.id
                          ? estilos.textoTipoMiniActivo
                          : estilos.textoTipoMini
                      }
                    >
                      {t.modelo}
                    </ThemedText>
                  </ThemedView>
                </TouchableOpacity>
              ))}

            <TouchableOpacity
              style={estilos.botonCerrarSelect}
              onPress={() => setMostrarSelect(null)}
            >
              <ThemedText>Cerrar</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
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
  subtitulo: {
    opacity: 0.7,
  },
  botonNuevo: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  textoNuevo: {
    color: '#fff',
    fontWeight: '700',
  },
  busqueda: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
  textoError: {
    color: '#D32F2F',
    textAlign: 'center',
  },
  reintentar: {
    color: '#007AFF',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 6,
  },
  listaContenido: {
    gap: 10,
  },
  filaItem: {
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    gap: 6,
  },
  infoItem: {
    gap: 3,
  },
  textoTipo: {
    opacity: 0.6,
    fontSize: 12,
  },
  botonesAccion: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 4,
  },
  botonEditar: {
    padding: 6,
  },
  botonEliminar: {
    padding: 6,
  },
  textoEditar: {
    fontSize: 18,
  },
  textoEliminar: {
    fontSize: 18,
  },
  textoVacio: {
    opacity: 0.5,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  fondoModal: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalContenido: {
    borderRadius: 10,
    padding: 20,
    gap: 12,
    maxHeight: '80%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
  filaBotonesModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  botonCancelar: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'transparent',
  },
  botonGuardar: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  textoGuardar: {
    color: '#fff',
    fontWeight: '700',
  },
  selectTrigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
  selectFlecha: {
    fontSize: 12,
    opacity: 0.5,
  },
  fondoSelect: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  contenidoSelect: {
    borderRadius: 10,
    padding: 20,
    gap: 8,
    maxHeight: '70%',
  },
  opcionSelect: {
    padding: 12,
    borderRadius: 6,
  },
  opcionSelectActiva: {
    backgroundColor: '#007AFF',
  },
  textoOpcionActiva: {
    color: '#fff',
    fontWeight: '600',
  },
  opcionTipo: {
    gap: 2,
  },
  textoTipoMini: {
    fontSize: 12,
    opacity: 0.6,
  },
  textoTipoMiniActivo: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  botonCerrarSelect: {
    marginTop: 8,
    padding: 10,
    alignItems: 'center',
  },
});