import { Alert } from 'react-native'
import { cerrarSesion } from '@/services/auth'

export async function handleLogout() {
  Alert.alert(
    'Cerrar Sesión',
    '¿Estás seguro de que deseas cerrar sesión?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar Sesión',
        style: 'destructive',
        onPress: async () => {
          try {
            await cerrarSesion()
            // El root _layout detecta el cierre de sesión y muestra login automáticamente
          } catch (error) {
            Alert.alert('Error', 'No se pudo cerrar sesión. Intenta de nuevo.')
          }
        },
      },
    ]
  )
}
