import { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { useTheme } from '@/theme/useTheme'

export default function IndexScreen() {
  const theme = useTheme()
  const router = useRouter()

  useEffect(() => {
    // Redirige al login como entrada inicial
    router.replace('/login')
  }, [router])

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: theme.background 
    }}>
      <ActivityIndicator size="large" color={theme.primary} />
    </View>
  )
}