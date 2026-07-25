import { useState, useEffect } from 'react'
import { ScrollView, View, Text, Pressable, Alert } from 'react-native'
import { useTheme } from '@/theme/useTheme'
import { screenStyles } from '@/theme/screenStyles'
import { BarraSuperior } from '@/components/BarraSuperior'
import { TarjetaInventario } from '@/components/TarjetaInventario'
import { MaterialIcons } from '@expo/vector-icons'
import { guardarModelo, crearInventario, obtenerModelos, obtenerSedes, obtenerInventarioCompleto, type DatosModelo, type DatosInventario } from '@/funciones/funcionesInventario'
import { ModalFormulario, type CampoFormulario } from '@/components/ModalFormulario'

export default function InventoryScreen() {
  const theme = useTheme()
  const [modalModeloVisible, setModalModeloVisible] = useState(false)
  const [modalInventarioVisible, setModalInventarioVisible] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [inventario, setInventario] = useState<any[]>([])

  // Opciones para selectores
  const [modelosOptions, setModelosOptions] = useState<{ label: string; value: string }[]>([])
  const [sedesOptions, setSedesOptions] = useState<{ label: string; value: string }[]>([])

  // Campos del formulario de modelo
  const [codigoModelo, setCodigoModelo] = useState('')
  const [nombreModelo, setNombreModelo] = useState('')
  const [marcaModelo, setMarcaModelo] = useState('')
  const [descripcionModelo, setDescripcionModelo] = useState('')
  const [tecnologiasModelo, setTecnologiasModelo] = useState('')

  // Campos del formulario de inventario
  const [cantidadInventario, setCantidadInventario] = useState('')
  const [sedeInventario, setSedeInventario] = useState('')
  const [modeloInventario, setModeloInventario] = useState('')

  const limpiarFormularioModelo = () => {
    setCodigoModelo('')
    setNombreModelo('')
    setMarcaModelo('')
    setDescripcionModelo('')
    setTecnologiasModelo('')
  }

  const limpiarFormularioInventario = () => {
    setCantidadInventario('')
    setSedeInventario('')
    setModeloInventario('')
  }

  const handleGuardarModelo = async () => {
    setCargando(true)
    try {
      await guardarModelo(
        {
          codigoModelo: codigoModelo,
          nombreIdentificador: nombreModelo,
          marca: marcaModelo,
          descripcion: descripcionModelo,
          tecnologias: tecnologiasModelo,
        },
        limpiarFormularioModelo
      )
      Alert.alert('Éxito', 'Modelo creado correctamente')
      setModalModeloVisible(false)
    } catch (e: any) {
      Alert.alert('Error', e.message)
    } finally {
      setCargando(false)
    }
  }

  const handleGuardarInventario = async () => {
    const cantidadNum = parseInt(cantidadInventario, 10)
    if (!modeloInventario || !sedeInventario || isNaN(cantidadNum)) {
      Alert.alert('Error', 'Modelo, Sede y Cantidad son requeridos')
      return
    }

    setCargando(true)
    try {
      await crearInventario({
        modeloId: modeloInventario,
        cantidad: cantidadNum,
        sedeId: sedeInventario,
      })
      Alert.alert('Éxito', 'Inventario creado correctamente')
      setModalInventarioVisible(false)
      limpiarFormularioInventario()
      cargarInventario()
    } catch (e: any) {
      Alert.alert('Error', e.message)
    } finally {
      setCargando(false)
    }
  }

  const cargarInventario = async () => {
    try {
      const datos = await obtenerInventarioCompleto()
      console.log('inventario cargado', JSON.stringify(datos, null, 2))
      setInventario(datos)
    } catch (e) {
      console.error('Error al cargar inventario:', e)
    }
  }

  // Cargar inventario al montar la pantalla
  useEffect(() => {
    cargarInventario()
  }, [])

  // Cargar modelos y sedes cuando se abre el modal de inventario
  useEffect(() => {
    if (modalInventarioVisible) {
      cargarOpciones()
    }
  }, [modalInventarioVisible])

  const cargarOpciones = async () => {
    try {
      const [modelos, sedes] = await Promise.all([
        obtenerModelos(),
        obtenerSedes(),
      ])
      setModelosOptions(modelos)
      setSedesOptions(sedes)
    } catch (e) {
      console.error('Error al cargar opciones:', e)
    }
  }

  // Configuracion de campos para el modal de modelo
  const camposModelo: CampoFormulario[] = [
    { label: 'Código de Modelo *', value: codigoModelo, onChangeText: setCodigoModelo, placeholder: 'Ej: M-001', autoCapitalize: 'characters' },
    { label: 'Nombre Identificador *', value: nombreModelo, onChangeText: setNombreModelo, placeholder: 'Ej: Router WiFi 6' },
    { label: 'Marca *', value: marcaModelo, onChangeText: setMarcaModelo, placeholder: 'Ej: Cisco, HP, Dell' },
    { label: 'Descripción', value: descripcionModelo, onChangeText: setDescripcionModelo, placeholder: 'Descripción breve del modelo...', multiline: true, numberOfLines: 3 },
    { label: 'Tecnologías', value: tecnologiasModelo, onChangeText: setTecnologiasModelo, placeholder: 'Ej: 5G, WiFi 6, PoE...', multiline: true, numberOfLines: 3 },
  ]

  // Configuracion de campos para el modal de inventario
  const camposInventario: CampoFormulario[] = [
    { label: 'Modelo *', value: modeloInventario, onChangeText: setModeloInventario, placeholder: 'Seleccionar modelo...', opciones: modelosOptions },
    { label: 'Sede *', value: sedeInventario, onChangeText: setSedeInventario, placeholder: 'Seleccionar sede...', opciones: sedesOptions },
    { label: 'Cantidad *', value: cantidadInventario, onChangeText: setCantidadInventario, placeholder: '0', autoCapitalize: 'none' },
  ]

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <BarraSuperior title="TovarSAT" />

      <ScrollView
        contentContainerStyle={screenStyles.contenidoDesplazamiento}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 12 }}>
          <View style={screenStyles.encabezadoActividad}>
            <Text style={[screenStyles.tituloSeccion, { color: theme.onSurface }]}>Inventario Activo</Text>
          </View>

          <View style={screenStyles.accionesRapidas}>
            <Pressable
              style={[screenStyles.botonAccion, { backgroundColor: theme.primary }]}
              onPress={() => setModalModeloVisible(true)}
            >
              <MaterialIcons name="add-circle-outline" size={20} color={theme.onPrimary} />
              <Text style={[screenStyles.etiquetaAccion, { color: theme.onPrimary }]}>
                Nuevo Modelo
              </Text>
            </Pressable>
            <Pressable
              style={[screenStyles.botonAccion, { backgroundColor: theme.primary }]}
              onPress={() => setModalInventarioVisible(true)}
            >
              <MaterialIcons name="inventory-2" size={20} color={theme.onPrimary} />
              <Text style={[screenStyles.etiquetaAccion, { color: theme.onPrimary }]}>
                Añadir Inventario
              </Text>
            </Pressable>
          </View>

          {inventario.map((item) => (
            <TarjetaInventario
              key={item.id}
              name={item.modelo || item.nombreIdentificador || 'Sin nombre'}
              sku={item.codigoModelo || 'Sin código'}
              quantity={item.cantidad || 0}
              location={item.sede || 'Sin sede'}
              stockPercentage={item.cantidad > 0 ? 100 : 0}
              isLowStock={item.cantidad === 0}
              onPress={() => {}}
            />
          ))}
        </View>
      </ScrollView>

      {/* Modal para crear nuevo modelo */}
      <ModalFormulario
        visible={modalModeloVisible}
        titulo="Nuevo Modelo"
        campos={camposModelo}
        cargando={cargando}
        textoBotonConfirmar="Crear Modelo"
        onConfirm={handleGuardarModelo}
        onCancel={() => setModalModeloVisible(false)}
      />

      {/* Modal para crear nuevo inventario */}
      <ModalFormulario
        visible={modalInventarioVisible}
        titulo="Nuevo Inventario"
        campos={camposInventario}
        cargando={cargando}
        textoBotonConfirmar="Crear Inventario"
        onConfirm={handleGuardarInventario}
        onCancel={() => {
          setModalInventarioVisible(false)
          limpiarFormularioInventario()
        }}
      />
    </View>
  )
}