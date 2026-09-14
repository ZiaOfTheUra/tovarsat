import { View, Text, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@/theme/useTheme'
import { MaterialIcons } from '@expo/vector-icons'

interface BarraSuperiorProps {
  title: string
  onSearchPress?: () => void
  showAvatar?: boolean
}

export function BarraSuperior({ title, onSearchPress, showAvatar = true }: Readonly<BarraSuperiorProps>) {
  const theme = useTheme()
  // insets.top es el alto de la barra de estado (donde sale la hora y la bateria)
  // sin esto, en la APK el titulo queda tapado por esa barra
  const insets = useSafeAreaInsets()

  return (
    // sumamos insets.top al alto para que la barra empiece DEBAJO de la barra de estado
    // y le ponemos paddingTop para que el contenido quede alineado dentro del espacio que sobra
    <View style={{
      height: 56 + insets.top, width: '100%', zIndex: 40,
      paddingTop: insets.top,
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