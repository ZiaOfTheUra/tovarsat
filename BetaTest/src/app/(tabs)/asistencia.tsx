import { View, Text, Pressable, ActivityIndicator, FlatList, Alert, Keyboard } from 'react-native'
import { useState, useEffect } from 'react'
import { useTheme } from '@/theme/useTheme'
import { screenStyles } from '@/theme/screenStyles'
import { BarraSuperior } from '@/components/BarraSuperior'
import { MaterialIcons } from '@expo/vector-icons'
import { crearAsistencia, marcarSalida, verAsistencias, verificarBiometrica } from '@/funciones/funcionesAsistencia'
import { crearDiaExonerado, obtenerUsuariosSede, type ArchivoJustificativo } from '@/funciones/funcionesExonerados'
import { ModalFormulario, type CampoFormulario } from '@/components/ModalFormulario'
import * as serviceAuth from '@/services/auth'

interface AsistenciaLista {
  id: string
  nombre: string
  usuarioID: string
  turno: string
  fechaEntrada: string
  fechaSalida: string
  tipoSalida: string
  horasTrabajadas: number
}

export default function AsistenciaScreen() {
  const theme = useTheme()
  const [asistencias, setAsistencias] = useState<AsistenciaLista[]>([])
  const [cargando, setCargando] = useState(true)
  const [marcando, setMarcando] = useState(false)
  const [marcandoSalida, setMarcandoSalida] = useState(false)

  // Estado para el modal de exonerar (solo gerenciaLocal)
  const [modalExonerarVisible, setModalExonerarVisible] = useState(false)
  const [exonerando, setExonerando] = useState(false)
  const [uidExonerado, setUidExonerado] = useState('')
  const [fechaExonerado, setFechaExonerado] = useState('')
  const [motivoExonerado, setMotivoExonerado] = useState('')
  const [justificativo, setJustificativo] = useState<ArchivoJustificativo | null>(null)
  const [opcionesUsuarios, setOpcionesUsuarios] = useState<{ label: string; value: string }[]>([])
  const [esGerencia, setEsGerencia] = useState(false)

  useEffect(() => {
    verAsistencias().then(setAsistencias).finally(() => setCargando(false))
    serviceAuth.verificarRolUsuario('gerenciaLocal').then(setEsGerencia)
  }, [])

  const marcarEntrada = async () => {
    setMarcando(true)
    try {
      // Verificar biometría primero
      await verificarBiometrica()
      
      // Si la verificación es exitosa, crear la asistencia
      await crearAsistencia(new Date())
      const nuevas = await verAsistencias()
      setAsistencias(nuevas)
      
      // Mostrar mensaje de éxito
      Alert.alert(
        'Asistencia registrada',
        'Tu asistencia se ha guardado correctamente',
        [{ text: 'Aceptar', style: 'default' }]
      )
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      Alert.alert(
        'Error al marcar asistencia',
        errorMessage,
        [{ text: 'Aceptar', style: 'default' }]
      )
      console.error('[ASISTENCIA] Error:', error)
    } finally {
      setMarcando(false)
    }
  }

  const marcarSalidaManual = async () => {
    setMarcandoSalida(true)
    try {
      // Verificar biometría primero
      await verificarBiometrica()
      
      // Si la verificación es exitosa, marcar la salida del turno abierto
      await marcarSalida()
      const nuevas = await verAsistencias()
      setAsistencias(nuevas)
      
      // Mostrar mensaje de éxito
      Alert.alert(
        'Salida registrada',
        'Tu salida se ha marcado correctamente',
        [{ text: 'Aceptar', style: 'default' }]
      )
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      Alert.alert(
        'Error al marcar salida',
        errorMessage,
        [{ text: 'Aceptar', style: 'default' }]
      )
      console.error('[ASISTENCIA] Error:', error)
    } finally {
      setMarcandoSalida(false)
    }
  }

  // ─── Exonerar día (solo gerenciaLocal) ────────────────────
  const abrirModalExonerar = async () => {
    setUidExonerado('')
    setFechaExonerado('')
    setMotivoExonerado('')
    setJustificativo(null)
    setModalExonerarVisible(true)
    const usuarios = await obtenerUsuariosSede()
    setOpcionesUsuarios(usuarios)
  }

  // Selecciona el archivo de justificativo con expo-document-picker
  const adjuntarJustificativo = async () => {
    let DocumentPicker: any
    try {
      DocumentPicker = require('expo-document-picker')
    } catch (err) {
      Alert.alert('Error', 'No se pudo cargar el selector de archivos. Reinstala la app.')
      return
    }
    try {
      const resultado = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      })
      if (resultado.canceled) return
      const archivo = resultado.assets[0]
      setJustificativo({
        nombre: archivo.name || '',
        mimeType: archivo.mimeType || '',
        tamanio: archivo.size || 0,
        uri: archivo.uri || '',
      })
    } catch (err) {
      Alert.alert('Error', 'No se pudo seleccionar el archivo')
    }
  }

  const exonerarDia = async () => {
    if (!uidExonerado || !fechaExonerado || !motivoExonerado) {
      Alert.alert('Error', 'Empleado, Fecha y Motivo son requeridos')
      return
    }
    setExonerando(true)
    try {
      // Cerrar el modal y ocultar el teclado antes de pedir la huella, para que
      // el prompt biometrico no compita por el foco con el modal ni el teclado
      setModalExonerarVisible(false)
      Keyboard.dismiss()

      await crearDiaExonerado({
        uidUsuario: uidExonerado,
        fecha: fechaExonerado,
        motivo: motivoExonerado,
        justificativo: justificativo || undefined,
      })
      Alert.alert('Éxito', 'Día exonerado correctamente')
      setUidExonerado('')
      setFechaExonerado('')
      setMotivoExonerado('')
      setJustificativo(null)
      const nuevas = await verAsistencias()
      setAsistencias(nuevas)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      Alert.alert('Error', errorMessage)
      console.error('[ASISTENCIA] Error:', error)
    } finally {
      setExonerando(false)
    }
  }

  const renderItem = ({ item }: { item: AsistenciaLista }) => (
    <View style={[screenStyles.tarjetaAsistencia, { backgroundColor: theme.surface }]}>
      <View style={{ flex: 1 }}>
        <Text style={[screenStyles.nombreColaborador, { color: theme.onSurface }]}>{item.nombre}</Text>
        <Text style={[screenStyles.detalleAsistencia, { color: theme.onSurfaceVariant }]}>
          {item.turno === 'manana' ? 'Mañana' : 'Tarde'} · {item.fechaEntrada} - {item.fechaSalida}
        </Text>
        <Text style={[screenStyles.horasTrabajadas, { color: theme.onSurfaceVariant }]}>
          {item.horasTrabajadas} hrs
        </Text>
      </View>
      <View style={[screenStyles.estadoAsistencia, { backgroundColor: theme.primaryContainer }]}>
        <Text style={[screenStyles.textoEstado, { color: theme.onPrimaryContainer }]}>
          {item.tipoSalida === 'manual' ? 'SALIDA' : 'ABIERTO'}
        </Text>
      </View>
    </View>
  )

  const camposExonerar: CampoFormulario[] = [
    { label: 'Empleado *', value: uidExonerado, onChangeText: setUidExonerado, placeholder: 'Seleccionar...', opciones: opcionesUsuarios },
    { label: 'Fecha (YYYY-MM-DD) *', value: fechaExonerado, onChangeText: setFechaExonerado, placeholder: '2026-09-07', autoCapitalize: 'none' },
    { label: 'Motivo *', value: motivoExonerado, onChangeText: setMotivoExonerado, placeholder: 'Reposo médico' },
  ]

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <BarraSuperior title="TovarSAT" />

      <View style={screenStyles.contenidoDesplazamiento}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[screenStyles.tituloSeccion, { color: theme.onSurface }]}>
            Asistencias
          </Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Pressable
              onPress={marcarSalidaManual}
              disabled={marcandoSalida}
              style={[
                screenStyles.botonAccion,
                { backgroundColor: theme.surfaceContainerHigh, opacity: marcandoSalida ? 0.6 : 1 }
              ]}
            >
              {marcandoSalida ? (
                <ActivityIndicator size="small" color={theme.onSurface} />
              ) : (
                <MaterialIcons name="logout" size={20} color={theme.onSurface} />
              )}
              <Text style={[screenStyles.etiquetaAccion, { color: theme.onSurface }]}>
                {marcandoSalida ? 'Verificando...' : 'Marcar Salida'}
              </Text>
            </Pressable>
            <Pressable
              onPress={marcarEntrada}
              disabled={marcando}
              style={[
                screenStyles.botonAccion,
                { backgroundColor: theme.primary, opacity: marcando ? 0.6 : 1 }
              ]}
            >
              {marcando ? (
                <ActivityIndicator size="small" color={theme.onPrimary} />
              ) : (
                <MaterialIcons name="fingerprint" size={20} color={theme.onPrimary} />
              )}
              <Text style={[screenStyles.etiquetaAccion, { color: theme.onPrimary }]}>
                {marcando ? 'Verificando...' : 'Marcar Entrada'}
              </Text>
            </Pressable>
          </View>
        </View>

        {cargando ? (
          <ActivityIndicator size="large" color={theme.primary} />
        ) : (
          <FlatList
            data={asistencias}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={{ marginTop: 16 }}
          />
        )}

        {esGerencia && (
          <Pressable
            onPress={abrirModalExonerar}
            disabled={exonerando}
            style={[screenStyles.botonAccion, { backgroundColor: theme.primary, marginTop: 16, opacity: exonerando ? 0.6 : 1 }]}
          >
            <MaterialIcons name="person-add" size={20} color={theme.onPrimary} />
            <Text style={[screenStyles.etiquetaAccion, { color: theme.onPrimary }]}>
              {exonerando ? 'Verificando...' : 'Exonerar'}
            </Text>
          </Pressable>
        )}
      </View>

      <ModalFormulario
        visible={modalExonerarVisible}
        titulo="Exonerar Día"
        campos={camposExonerar}
        cargando={exonerando}
        textoBotonConfirmar="Exonerar"
        textoBotonCancelar="Cancelar"
        onConfirm={exonerarDia}
        onCancel={() => setModalExonerarVisible(false)}
      >
        <Pressable
          onPress={adjuntarJustificativo}
          style={[screenStyles.botonAccion, { backgroundColor: theme.surfaceContainerHigh, alignItems: 'center', marginTop: 8 }]}
        >
          <MaterialIcons name="attach-file" size={20} color={theme.onSurface} />
          <Text style={[screenStyles.etiquetaAccion, { color: theme.onSurface }]}>
            {justificativo ? justificativo.nombre : 'Adjuntar justificativo (opcional)'}
          </Text>
        </Pressable>
      </ModalFormulario>
    </View>
  )
}