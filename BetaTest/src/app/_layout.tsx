import { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useTheme } from '@/theme/useTheme'
import { escucharEstadoAuth } from '@/services/auth'

export default function RootLayout() {
  const theme = useTheme()
  const [cargando, setCargando] = useState(true)
  const [autenticado, setAutenticado] = useState(false)

  useEffect(() => {
    // Escucha cambios en el estado de autenticación
    const unsubscribe = escucharEstadoAuth((usuario) => {
      setAutenticado(!!usuario)
      setCargando(false)
    })

    // Cleanup del listener al desmontar
    return () => unsubscribe()
  }, [])

  // Muestra indicador de carga mientras se verifica el estado
  // el SafeAreaProvider le dice a toda la app cuanto espacio ocupan la barra de estado y la de navegacion
  if (cargando) {
    return (
      <SafeAreaProvider>
        <Stack screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: theme.background }
        }}>
          <Stack.Screen name="index" />
        </Stack>
      </SafeAreaProvider>
    )
  }

  // Configura el Stack Navigator según estado de auth
  return (
    // mismo SafeAreaProvider aqui, para que las pantallas sepan donde no dibujar
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {autenticado ? (
          // Usuario autenticado: navegación principal hacia tabs
          <Stack.Screen name="(tabs)" />
        ) : (
          // Usuario no autenticado: solo pantalla de login
          <Stack.Screen name="login" />
        )}
      </Stack>
    </SafeAreaProvider>
  )
}