import { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { useTheme } from '@/theme/useTheme'

export default function TabsIndexScreen() {
  const router = useRouter()
  const theme = useTheme()

  useEffect(() => {
    router.replace('/(tabs)/main')
  }, [router])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
      <ActivityIndicator size="large" color={theme.primary} />
    </View>
  )
}