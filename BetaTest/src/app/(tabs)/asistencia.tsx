import { View, Text, Pressable, ActivityIndicator, FlatList, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import { useTheme } from '@/theme/useTheme'
import { screenStyles } from '@/theme/screenStyles'
import { BarraSuperior } from '@/components/BarraSuperior'
import { MaterialIcons } from '@expo/vector-icons'
import { crearAsistencia, verAsistencias, verificarBiometrica } from '@/funciones/funcionesAsistencia'

interface AsistenciaLista {
  id: string
  nombre: string
  usuarioID: string
  fechaEntrada: string
  fechaSalida: string
  horasTrabajadas: number
}

export default function AsistenciaScreen() {
  const theme = useTheme()
  const [asistencias, setAsistencias] = useState<AsistenciaLista[]>([])
  const [cargando, setCargando] = useState(true)
  const [marcando, setMarcando] = useState(false)

  useEffect(() => {
    verAsistencias().then(setAsistencias).finally(() => setCargando(false))
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

  const renderItem = ({ item }: { item: AsistenciaLista }) => (
    <View style={[screenStyles.tarjetaAsistencia, { backgroundColor: theme.surface }]}>
      <View style={{ flex: 1 }}>
        <Text style={[screenStyles.nombreColaborador, { color: theme.onSurface }]}>{item.nombre}</Text>
        <Text style={[screenStyles.detalleAsistencia, { color: theme.onSurfaceVariant }]}>
          {item.fechaEntrada} - {item.fechaSalida}
        </Text>
        <Text style={[screenStyles.horasTrabajadas, { color: theme.onSurfaceVariant }]}>
          {item.horasTrabajadas} hrs
        </Text>
      </View>
      <View style={[screenStyles.estadoAsistencia, { backgroundColor: theme.primaryContainer }]}>
        <Text style={[screenStyles.textoEstado, { color: theme.onPrimaryContainer }]}>OK</Text>
      </View>
    </View>
  )

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <BarraSuperior title="TovarSAT" />

      <View style={screenStyles.contenidoDesplazamiento}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[screenStyles.tituloSeccion, { color: theme.onSurface }]}>
            Asistencias
          </Text>
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
      </View>
    </View>
  )
}