import { View, Text, Pressable } from 'react-native'
import { useTheme } from '@/theme/useTheme'
import { MaterialIcons } from '@expo/vector-icons'

interface BarraSuperiorProps {
  title: string
  onSearchPress?: () => void
  showAvatar?: boolean
}

export function BarraSuperior({ title, onSearchPress, showAvatar = true }: Readonly<BarraSuperiorProps>) {
  const theme = useTheme()

  return (
    <View style={{
      height: 56, width: '100%', zIndex: 40,
      backgroundColor: theme.surface,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05, shadowRadius: 2, elevation: 2,
    }}>
      <View style={{
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 16, height: '100%',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
          {showAvatar && (
            <View style={{
              width: 32, height: 32, borderRadius: 16,
              alignItems: 'center', justifyContent: 'center',
              backgroundColor: theme.surfaceContainer,
            }}>
              <MaterialIcons name="person" size={20} color={theme.onSurfaceVariant} />
            </View>
          )}
          <Text style={{
            fontSize: 20, fontWeight: '600', lineHeight: 28, letterSpacing: -0.01,
            color: theme.primary, flexShrink: 1,
          }}>
            {title}
          </Text>
        </View>
        <Pressable
          onPress={onSearchPress}
          style={({ pressed }) => ({
            width: 40, height: 40, borderRadius: 20,
            alignItems: 'center', justifyContent: 'center',
            opacity: pressed ? 0.6 : 0.8,
          })}
          hitSlop={8}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Buscar"
        >
          <MaterialIcons name="search" size={24} color={theme.onSurfaceVariant} />
        </Pressable>
      </View>
    </View>
  )
}