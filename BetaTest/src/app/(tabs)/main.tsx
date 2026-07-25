import { ScrollView, View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useTheme } from '@/theme/useTheme'
import { screenStyles } from '@/theme/screenStyles'
import { BarraSuperior } from '@/components/BarraSuperior'
import { TarjetaEstadistica } from '@/components/TarjetaEstadistica'
import { ElementoActividad } from '@/components/ElementoActividad'
import { dashboardStats, recentActivities } from '@/data/mockData'
import { cerrarSesion } from '@/services/auth'

export default function DashboardScreen() {
  const theme = useTheme()
  const router = useRouter()

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <BarraSuperior title="TovarSAT" />

      <ScrollView
        contentContainerStyle={screenStyles.contenidoDesplazamiento}
        showsVerticalScrollIndicator={false}
      >
        <View style={screenStyles.seccionEncabezado}>
        <Text style={[screenStyles.subtitulo, { color: theme.onSurfaceVariant }]}>
            
            </Text>
          <Text style={[screenStyles.saludo, { color: theme.onSurface }]}>Inicio</Text>

        </View>
        <View style={screenStyles.seccionEstadisticas}>
          <View style={screenStyles.cuadriculaEstadisticas}>
            <TarjetaEstadistica
              title="Asistencias de hoy."
              value={dashboardStats.totalRegistrations.toLocaleString()}
              trend={dashboardStats.weeklyGrowth}
              icon="📝"
              fullWidth
              color="primary"
            />
            <TarjetaEstadistica
              title="EnviosActivos"
              value={dashboardStats.activeShipments.toLocaleString()}
              icon="🚚"
              fullWidth
              color="secondary"
            />
            <TarjetaEstadistica
              title="Items agotados."
              value={dashboardStats.lowStockItems}
              icon="⚠️"
              fullWidth
              color="error"
            />
          </View>
        </View>

        <View style={screenStyles.accionesRapidas}>
          <Pressable
            style={[screenStyles.botonAccion, { backgroundColor: theme.primaryContainer }]}
            onPress={() => {}}
          >
            <Text style={[screenStyles.iconoAccion, { color: theme.onPrimaryContainer }]}>+</Text>
            <Text style={[screenStyles.etiquetaAccion, { color: theme.onPrimaryContainer }]}>Nuevo Envío</Text>
          </Pressable>
          <Pressable
            style={[screenStyles.botonAccionSecundario, { backgroundColor: theme.surface, borderColor: theme.outline }]}
            onPress={() => {}}
          >
            <Text style={[screenStyles.etiquetaAccionSecundaria, { color: theme.onSurface }]}>
              Escanear Inventario
            </Text>
          </Pressable>
          <Pressable
            style={[screenStyles.botonAccionSecundario, { backgroundColor: theme.surface, borderColor: theme.outline }]}
            onPress={() => {}}
          >
            <Text style={[screenStyles.etiquetaAccionSecundaria, { color: theme.onSurface }]}>
              Reportes
            </Text>
          </Pressable>
          <Pressable
            style={[screenStyles.botonAccionSecundario, { backgroundColor: theme.errorContainer, borderColor: theme.error }]}
            onPress={async () => {
              await cerrarSesion()
              // Redirigir explícitamente a login después de cerrar sesión
              router.replace('/login')
            }}
          >
            <Text style={[screenStyles.etiquetaAccionSecundaria, { color: theme.onError }]}>
              Cerrar Sesión
            </Text>
          </Pressable>
        </View>

        <View style={screenStyles.seccionActividad}>
          <View style={screenStyles.encabezadoActividad}>
            <Text style={[screenStyles.tituloSeccion, { color: theme.onSurface }]}>Actividad Reciente</Text>
            <Pressable onPress={() => {}}>
              <Text style={[screenStyles.verTodo, { color: theme.primary }]}>Ver Todo</Text>
            </Pressable>
          </View>

          <View style={screenStyles.listaActividad}>
            {recentActivities.map((activity) => (
              <ElementoActividad
                key={activity.id}
                title={activity.title}
                description={activity.description}
                time={activity.time}
                icon={activity.icon}
                onPress={() => {}}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}