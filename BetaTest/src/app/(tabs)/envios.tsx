import { useState, useEffect } from 'react'
import { ScrollView, View, Text, Pressable, Alert, Keyboard } from 'react-native'
import { useTheme } from '@/theme/useTheme'
import { screenStyles } from '@/theme/screenStyles'
import { BarraSuperior } from '@/components/BarraSuperior'
import { TarjetaInventario } from '@/components/TarjetaInventario'
import { MaterialIcons } from '@expo/vector-icons'
import { ModalFormulario, type CampoFormulario } from '@/components/ModalFormulario'
import { crearMovimientoInventario, editarMovimientoDatos, editarMovimientoAprobacion, obtenerMovimientos } from '@/funciones/funcionesEnvios'
import { verificarBiometrica } from '@/funciones/funcionesAsistencia'
import { obtenerSedes, obtenerInventarioCompleto } from '@/funciones/funcionesInventario'
import * as serviceAuth from '@/services/auth'

export default function EnviosScreen() {
  const theme = useTheme()
  const [modalCrearVisible, setModalCrearVisible] = useState(false)
  const [modalAprobacionVisible, setModalAprobacionVisible] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [movimientos, setMovimientos] = useState<any[]>([])

  // Estado para roles
  const [esGerenciaLocal, setEsGerenciaLocal] = useState(false)
  const [esAlmacenista, setEsAlmacenista] = useState(false)

  // Estado para el item que se esta editando/aprobando
  const [editandoMovimiento, setEditandoMovimiento] = useState<any | null>(null)
  const [aprobandoMovimiento, setAprobandoMovimiento] = useState<any | null>(null)

  // Opciones para selectores
  const [sedesOptions, setSedesOptions] = useState<{ label: string; value: string }[]>([])
  const [inventarioOptions, setInventarioOptions] = useState<{ label: string; value: string }[]>([])

  // Campos del formulario de movimiento
  const [inventarioMovimiento, setInventarioMovimiento] = useState('')
  const [sedeDestinoMovimiento, setSedeDestinoMovimiento] = useState('')
  const [cantidadMovimiento, setCantidadMovimiento] = useState('')

  const limpiarFormularioMovimiento = () => {
    setInventarioMovimiento('')
    setSedeDestinoMovimiento('')
    setCantidadMovimiento('')
  }

  // ─── Abrir modal para crear movimiento ────────────────────
  const abrirCrearMovimiento = () => {
    setEditandoMovimiento(null)
    limpiarFormularioMovimiento()
    setModalCrearVisible(true)
  }

  // ─── Abrir modal para editar movimiento (Almacenista) ─────
  const abrirEditarMovimiento = (item: any) => {
    setEditandoMovimiento(item)
    setInventarioMovimiento(item.inventarioId || '')
    setSedeDestinoMovimiento(item.sedeDestinoId || '')
    setCantidadMovimiento(String(item.cantidad || 0))
    setModalCrearVisible(true)
  }

  // ─── Abrir modal para aprobar/rechazar (Gerencia Local) ───
  const abrirAprobacionMovimiento = (item: any) => {
    setAprobandoMovimiento(item)
    setModalAprobacionVisible(true)
  }

  // ─── Manejar click en tarjeta segun rol ───────────────────
  const manejarPresionTarjeta = (item: any) => {
    if (esGerenciaLocal) {
      abrirAprobacionMovimiento(item)
    } else if (esAlmacenista) {
      abrirEditarMovimiento(item)
    }
  }

  // ─── Guardar o editar movimiento ──────────────────────────
  const handleGuardarMovimiento = async () => {
    const cantidadNum = parseInt(cantidadMovimiento, 10)
    if (!inventarioMovimiento || !sedeDestinoMovimiento || isNaN(cantidadNum)) {
      Alert.alert('Error', 'Inventario, Sede destino y Cantidad son requeridos')
      return
    }

    setCargando(true)
    try {
      // Cerrar el modal y ocultar el teclado antes de pedir la huella, para que
      // el prompt biometrico no compita por el foco con el modal ni el teclado
      setModalCrearVisible(false)
      Keyboard.dismiss()

      // Verificar biometría primero (como en asistencia)
      await verificarBiometrica()

      if (editandoMovimiento) {
        // Modo edición
        await editarMovimientoDatos(editandoMovimiento.id, {
          inventarioId: inventarioMovimiento,
          cantidad: cantidadNum,
          sedeOrigenId: editandoMovimiento.sedeOrigenId,
          sedeDestinoId: sedeDestinoMovimiento,
          aprobado: editandoMovimiento.aprobado || false,
        })
        Alert.alert('Éxito', 'Movimiento editado correctamente')
      } else {
        // En creación, la sedeOrigen se deduce del inventario seleccionado
        // Buscamos en la lista de inventario enriquecido
        const inventarioData = await obtenerInventarioCompleto()
        const itemInventario = inventarioData.find((i: any) => i.id === inventarioMovimiento)
        if (!itemInventario) {
          throw Error("Inventario no encontrado")
        }

        await crearMovimientoInventario({
          inventarioId: inventarioMovimiento,
          cantidad: cantidadNum,
          sedeOrigenId: itemInventario.sedeId,
          sedeDestinoId: sedeDestinoMovimiento,
          aprobado: false,
        })
        Alert.alert('Éxito', 'Movimiento creado correctamente')
      }
      setModalCrearVisible(false)
      setEditandoMovimiento(null)
      limpiarFormularioMovimiento()
      cargarMovimientos()
    } catch (e: any) {
      Alert.alert('Error', e.message)
    } finally {
      setCargando(false)
    }
  }

  // ─── Aprobar o rechazar movimiento ────────────────────────
  const handleAprobarMovimiento = async (aprobado: boolean) => {
    if (!aprobandoMovimiento) return

    // guardamos el id antes de cerrar el modal porque ya no usaremos el estado
    const movimientoId = aprobandoMovimiento.id

    setCargando(true)
    try {
      // Cerrar el modal y ocultar el teclado antes de pedir la huella, para que
      // el prompt biometrico no compita por el foco con el modal ni el teclado
      setModalAprobacionVisible(false)
      setAprobandoMovimiento(null)
      Keyboard.dismiss()

      // Verificar biometría primero (como en asistencia)
      await verificarBiometrica()

      await editarMovimientoAprobacion(movimientoId, aprobado)
      Alert.alert('Éxito', aprobado ? 'Movimiento aprobado' : 'Movimiento rechazado')
      cargarMovimientos()
    } catch (e: any) {
      Alert.alert('Error', e.message)
    } finally {
      setCargando(false)
    }
  }

  const cargarMovimientos = async () => {
    try {
      const datos = await obtenerMovimientos()
      setMovimientos(datos)
    } catch (e) {
      console.error('Error al cargar movimientos:', e)
    }
  }

  const cargarOpciones = async () => {
    try {
      const [sedes, inventario] = await Promise.all([
        obtenerSedes(),
        obtenerInventarioCompleto(),
      ])
      setSedesOptions(sedes)
      // Inventario enriquecido para mostrar modelo + sede en el selector
      const invOptions = inventario.map((item: any) => ({
        label: `${item.modelo || 'Sin modelo'} - ${item.sede || 'Sin sede'} (${item.cantidad || 0} und.)`,
        value: item.id,
      }))
      setInventarioOptions(invOptions)
    } catch (e) {
      console.error('Error al cargar opciones:', e)
    }
  }

  // Verificar roles al montar la pantalla
  useEffect(() => {
    const verificarRoles = async () => {
      const [gerenciaLocal, almacenista] = await Promise.all([
        serviceAuth.verificarRolUsuario('gerenciaLocal'),
        serviceAuth.verificarRolUsuario('Almacenista'),
      ])
      setEsGerenciaLocal(gerenciaLocal)
      setEsAlmacenista(almacenista)
    }
    verificarRoles()
  }, [])

  // Cargar movimientos al montar
  useEffect(() => {
    cargarMovimientos()
  }, [])

  // Cargar opciones cuando se abre el modal de crear
  useEffect(() => {
    if (modalCrearVisible) {
      cargarOpciones()
    }
  }, [modalCrearVisible])

  // Configuracion de campos para el modal de movimiento
  const camposMovimiento: CampoFormulario[] = [
    { label: 'Inventario *', value: inventarioMovimiento, onChangeText: setInventarioMovimiento, placeholder: 'Seleccionar inventario...', opciones: inventarioOptions },
    { label: 'Sede Destino *', value: sedeDestinoMovimiento, onChangeText: setSedeDestinoMovimiento, placeholder: 'Seleccionar sede destino...', opciones: sedesOptions },
    { label: 'Cantidad *', value: cantidadMovimiento, onChangeText: setCantidadMovimiento, placeholder: '0', autoCapitalize: 'none' },
  ]

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <BarraSuperior title="TovarSAT" />

      <ScrollView
        contentContainerStyle={screenStyles.contenidoDesplazamiento}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[screenStyles.tituloSeccion, { color: theme.onSurface }]}>Envíos</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {esAlmacenista && (
              <Pressable
                style={[screenStyles.botonAccion, { backgroundColor: theme.primary }]}
                onPress={abrirCrearMovimiento}
              >
                <MaterialIcons name="add-circle-outline" size={20} color={theme.onPrimary} />
                <Text style={[screenStyles.etiquetaAccion, { color: theme.onPrimary }]}>
                  Nuevo Envío
                </Text>
              </Pressable>
            )}
          </View>
        </View>

          {movimientos.map((item) => (
            <TarjetaInventario
              key={item.id}
              name={item.modelo || 'Sin modelo'}
              sku={item.estadoAprobacion || 'Sin Procesar'}
              quantity={item.cantidad || 0}
              location={`${item.sedeOrigen || '?'} → ${item.sedeDestino || '?'}`}
              stockPercentage={item.aprobado ? 100 : 50}
              isLowStock={!item.aprobado}
              onPress={() => manejarPresionTarjeta(item)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Modal para crear/editar movimiento (Almacenista) */}
      <ModalFormulario
        visible={modalCrearVisible}
        titulo={editandoMovimiento ? 'Editar Envío' : 'Nuevo Envío'}
        campos={camposMovimiento}
        cargando={cargando}
        textoBotonConfirmar={editandoMovimiento ? 'Guardar Cambios' : 'Crear Envío'}
        onConfirm={handleGuardarMovimiento}
        onCancel={() => {
          setModalCrearVisible(false)
          setEditandoMovimiento(null)
          limpiarFormularioMovimiento()
        }}
      />

      {/* Modal para aprobar/rechazar movimiento (Gerencia Local) */}
      <ModalFormulario
        visible={modalAprobacionVisible}
        titulo="Aprobar Envío"
        campos={[
          { label: 'Producto', value: aprobandoMovimiento?.modelo || '', onChangeText: () => {}, placeholder: '', autoCapitalize: 'none', soloLectura: true },
          { label: 'Cantidad', value: String(aprobandoMovimiento?.cantidad || 0), onChangeText: () => {}, placeholder: '', autoCapitalize: 'none', soloLectura: true },
          { label: 'De', value: aprobandoMovimiento?.sedeOrigen || '', onChangeText: () => {}, placeholder: '', autoCapitalize: 'none', soloLectura: true },
          { label: 'A', value: aprobandoMovimiento?.sedeDestino || '', onChangeText: () => {}, placeholder: '', autoCapitalize: 'none', soloLectura: true },
          { label: 'Estado', value: aprobandoMovimiento?.estadoAprobacion || 'Sin Procesar', onChangeText: () => {}, placeholder: '', autoCapitalize: 'none', soloLectura: true },
        ]}
        cargando={cargando}
        textoBotonConfirmar="Aprobar"
        textoBotonCancelar="Cerrar"
        onConfirm={() => handleAprobarMovimiento(true)}
        onCancel={() => {
          // cerrar el modal sin denegar: el boton atras/cerrar no debe disparar la huella
          setModalAprobacionVisible(false)
          setAprobandoMovimiento(null)
        }}
        mostrarEliminar
        textoBotonEliminar="Denegar"
        onEliminar={() => handleAprobarMovimiento(false)}
      />
    </View>
  )
}