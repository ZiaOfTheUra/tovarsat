import { useState, useEffect } from 'react'
import { ScrollView, View, Text, Pressable, Alert } from 'react-native'
import { useTheme } from '@/theme/useTheme'
import { screenStyles } from '@/theme/screenStyles'
import { BarraSuperior } from '@/components/BarraSuperior'
import { TarjetaInventario } from '@/components/TarjetaInventario'
import { MaterialIcons } from '@expo/vector-icons'
import { guardarModelo, editarModelo, eliminarModelo, crearInventario, editarInventario, eliminarInventario, obtenerModelos, obtenerSedes, obtenerInventarioCompleto, type DatosModelo, type DatosInventario } from '@/funciones/funcionesInventario'
import { getColeccion } from '@/services/firestore'
import { ModalFormulario, type CampoFormulario } from '@/components/ModalFormulario'
import * as serviceAuth from '@/services/auth'

export default function InventoryScreen() {
  const theme = useTheme()
  const [modalModeloVisible, setModalModeloVisible] = useState(false)
  const [modalInventarioVisible, setModalInventarioVisible] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [inventario, setInventario] = useState<any[]>([])
  const [modelos, setModelos] = useState<any[]>([])

  // Estado para saber si estamos editando (contiene el item a editar, null = crear nuevo)
  const [editandoModelo, setEditandoModelo] = useState<any | null>(null)
  const [editandoInventario, setEditandoInventario] = useState<any | null>(null)

  // Estado para controlar visibilidad de botones de edicion basado en el rol
  const [esAlmacenista, setEsAlmacenista] = useState(false)

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

  // ─── Abrir modal para editar modelo ───────────────────────
  const abrirEditarModelo = (item: any) => {
    setEditandoModelo(item)
    setCodigoModelo(item.codigoModelo || '')
    setNombreModelo(item.nombreIdentificador || '')
    setMarcaModelo(item.marca || '')
    setDescripcionModelo(item.descripcion || '')
    setTecnologiasModelo(item.tecnologias || '')
    setModalModeloVisible(true)
  }

  // ─── Abrir modal para editar inventario ───────────────────
  const abrirEditarInventario = (item: any) => {
    setEditandoInventario(item)
    setModeloInventario(item.modeloId || '')
    setSedeInventario(item.sedeId || '')
    setCantidadInventario(String(item.cantidad || 0))
    setModalInventarioVisible(true)
  }

  const handleGuardarModelo = async () => {
    setCargando(true)
    try {
      if (editandoModelo) {
        // Modo edición
        await editarModelo(editandoModelo.id, {
          codigoModelo: codigoModelo,
          nombreIdentificador: nombreModelo,
          marca: marcaModelo,
          descripcion: descripcionModelo,
          tecnologias: tecnologiasModelo,
        })
        Alert.alert('Éxito', 'Modelo editado correctamente')
      } else {
        // Modo creación
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
      }
      setModalModeloVisible(false)
      setEditandoModelo(null)
      limpiarFormularioModelo()
      cargarModelos()
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
      if (editandoInventario) {
        // Modo edición
        await editarInventario(editandoInventario.id, {
          modeloId: modeloInventario,
          cantidad: cantidadNum,
          sedeId: sedeInventario,
        })
        Alert.alert('Éxito', 'Inventario editado correctamente')
      } else {
        // Modo creación
        await crearInventario({
          modeloId: modeloInventario,
          cantidad: cantidadNum,
          sedeId: sedeInventario,
        })
        Alert.alert('Éxito', 'Inventario creado correctamente')
      }
      setModalInventarioVisible(false)
      setEditandoInventario(null)
      limpiarFormularioInventario()
      cargarInventario()
    } catch (e: any) {
      Alert.alert('Error', e.message)
    } finally {
      setCargando(false)
    }
  }

  const handleEliminarModelo = async () => {
    if (!editandoModelo) return
    setCargando(true)
    try {
      await eliminarModelo(editandoModelo.id)
      Alert.alert('Éxito', 'Modelo eliminado correctamente')
      setModalModeloVisible(false)
      setEditandoModelo(null)
      limpiarFormularioModelo()
      cargarModelos()
    } catch (e: any) {
      Alert.alert('Error', e.message)
    } finally {
      setCargando(false)
    }
  }

  const handleEliminarInventario = async () => {
    if (!editandoInventario) return
    setCargando(true)
    try {
      await eliminarInventario(editandoInventario.id)
      Alert.alert('Éxito', 'Inventario eliminado correctamente')
      setModalInventarioVisible(false)
      setEditandoInventario(null)
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

  const cargarModelos = async () => {
    try {
      const datos = await getColeccion('modelos')
      console.log('modelos cargados', JSON.stringify(datos, null, 2))
      setModelos(datos)
    } catch (e) {
      console.error('Error al cargar modelos:', e)
    }
  }

  // Verificar rol del usuario al montar la pantalla
  useEffect(() => {
    const verificarRol = async () => {
      const resultado = await serviceAuth.verificarRolUsuario('Almacenista')
      setEsAlmacenista(resultado)
    }
    verificarRol()
  }, [])

  // Cargar inventario y modelos al montar la pantalla
  useEffect(() => {
    cargarInventario()
    cargarModelos()
  }, [])

  // Cargar modelos y sedes cuando se abre el modal de inventario
  useEffect(() => {
    if (modalInventarioVisible) {
      cargarOpciones()
    }
  }, [modalInventarioVisible])

  const cargarOpciones = async () => {
    try {
      const [modelosOpts, sedes] = await Promise.all([
        obtenerModelos(),
        obtenerSedes(),
      ])
      setModelosOptions(modelosOpts)
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

          {esAlmacenista && (
          <View style={screenStyles.accionesRapidas}>
            <Pressable
              style={[screenStyles.botonAccion, { backgroundColor: theme.primary }]}
              onPress={() => {
                setEditandoModelo(null)
                limpiarFormularioModelo()
                setModalModeloVisible(true)
              }}
            >
              <MaterialIcons name="add-circle-outline" size={20} color={theme.onPrimary} />
              <Text style={[screenStyles.etiquetaAccion, { color: theme.onPrimary }]}>
                Nuevo Modelo
              </Text>
            </Pressable>
            <Pressable
              style={[screenStyles.botonAccion, { backgroundColor: theme.primary }]}
              onPress={() => {
                setEditandoInventario(null)
                limpiarFormularioInventario()
                setModalInventarioVisible(true)
              }}
            >
              <MaterialIcons name="inventory-2" size={20} color={theme.onPrimary} />
              <Text style={[screenStyles.etiquetaAccion, { color: theme.onPrimary }]}>
                Añadir Inventario
              </Text>
            </Pressable>
          </View>
          )}

          {inventario.map((item) => (
            <TarjetaInventario
              key={item.id}
              name={item.modelo || item.nombreIdentificador || 'Sin nombre'}
              sku={item.codigoModelo || 'Sin código'}
              quantity={item.cantidad || 0}
              location={item.sede || 'Sin sede'}
              stockPercentage={item.cantidad > 0 ? 100 : 0}
              isLowStock={item.cantidad === 0}
              onPress={() => {
                if (esAlmacenista) {
                  abrirEditarInventario(item)
                }
              }}
            />
          ))}

          {/* Sección de Modelos Registrados */}
          <View style={[screenStyles.encabezadoActividad, { marginTop: 16 }]}>
            <Text style={[screenStyles.tituloSeccion, { color: theme.onSurface }]}>Modelos Registrados</Text>
          </View>

          {modelos.map((modelo) => (
            <Pressable
              key={modelo.id}
              style={{
                backgroundColor: theme.surface,
                borderRadius: 12,
                padding: 16,
                gap: 4,
              }}
              onPress={() => {
                if (esAlmacenista) {
                  abrirEditarModelo(modelo)
                }
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: theme.onSurface }}>
                    {modelo.nombreIdentificador || 'Sin nombre'}
                  </Text>
                  <Text style={{ fontSize: 12, color: theme.onSurfaceVariant }}>
                    Código: {modelo.codigoModelo || 'Sin código'}
                  </Text>
                  <Text style={{ fontSize: 12, color: theme.onSurfaceVariant }}>
                    Marca: {modelo.marca || 'Sin marca'}
                  </Text>
                  {modelo.descripcion ? (
                    <Text style={{ fontSize: 12, color: theme.onSurfaceVariant }}>
                      {modelo.descripcion}
                    </Text>
                  ) : null}
                  {modelo.tecnologias ? (
                    <Text style={{ fontSize: 12, color: theme.onSurfaceVariant }}>
                      Tecnologías: {modelo.tecnologias}
                    </Text>
                  ) : null}
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Modal para crear/editar modelo */}
      <ModalFormulario
        visible={modalModeloVisible}
        titulo={editandoModelo ? 'Editar Modelo' : 'Nuevo Modelo'}
        campos={camposModelo}
        cargando={cargando}
        textoBotonConfirmar={editandoModelo ? 'Guardar Cambios' : 'Crear Modelo'}
        onConfirm={handleGuardarModelo}
        onCancel={() => {
          setModalModeloVisible(false)
          setEditandoModelo(null)
          limpiarFormularioModelo()
        }}
        mostrarEliminar={!!editandoModelo}
        onEliminar={handleEliminarModelo}
      />

      {/* Modal para crear/editar inventario */}
      <ModalFormulario
        visible={modalInventarioVisible}
        titulo={editandoInventario ? 'Editar Inventario' : 'Nuevo Inventario'}
        campos={camposInventario}
        cargando={cargando}
        textoBotonConfirmar={editandoInventario ? 'Guardar Cambios' : 'Crear Inventario'}
        onConfirm={handleGuardarInventario}
        onCancel={() => {
          setModalInventarioVisible(false)
          setEditandoInventario(null)
          limpiarFormularioInventario()
        }}
        mostrarEliminar={!!editandoInventario}
        onEliminar={handleEliminarInventario}
      />
    </View>
  )
}