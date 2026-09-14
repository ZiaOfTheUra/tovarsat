import { Tabs } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
// insets nos dice cuanto espacio ocupan las barras del sistema (estado arriba, navegacion abajo)
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@/theme/useTheme'

export default function TabsLayout() {
  const theme = useTheme()
  // insets.bottom es el alto de la barra de navegacion de android (los botones atras/inicio/abrir)
  // en la APK esos botones tapan la tabBar, asi que la agrandamos para que no pase
  const insets = useSafeAreaInsets()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.outlineVariant,
          borderTopWidth: 1,
          paddingTop: 8,
          // le sumamos insets.bottom a la altura y al padding para que los botones del sistema queden DEBAJO
          height: 80 + insets.bottom,
          paddingBottom: 16 + insets.bottom
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.onSurfaceVariant,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4
        },
        tabBarItemStyle: {
          paddingTop: 8
        }
      }}
    >
      <Tabs.Screen
        name="main"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          href: null,
          tabBarIcon: () => null
        }}
      />

      
      <Tabs.Screen
        name="asistencia"
        options={{
          title: 'Asistencia',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name={focused ? 'check-circle' : 'check-circle-outline'} size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="registrar"
        options={{
          title: 'Registrar',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name={focused ? 'add-circle' : 'add-circle-outline'} size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="envios"
        options={{
          title: 'Envíos',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="local-shipping" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="inventario"
        options={{
          title: 'Inventario',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name={focused ? 'inventory' : 'inventory-2'} size={24} color={color} />
          )
        }}
      />
    </Tabs>
  )
}