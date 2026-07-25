import { Tabs } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/theme/useTheme'

export default function TabsLayout() {
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.outlineVariant,
          borderTopWidth: 1,
          paddingTop: 8,
          height: 80,
          paddingBottom: 16
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