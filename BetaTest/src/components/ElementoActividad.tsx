import { View, Text, Pressable } from 'react-native'
import { useTheme } from '@/theme/useTheme'
import { screenStyles, sombraTarjeta, texto14Negrita } from '@/theme/screenStyles'

interface ElementoActividadProps {
  title: string
  description: string
  time: string
  icon: string
  onPress?: () => void
}

export function ElementoActividad({ title, description, time, icon, onPress }: Readonly<ElementoActividadProps>) {
  const theme = useTheme()

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: 'row', alignItems: 'center', gap: 12,
          padding: 12, borderRadius: 12, marginBottom: 12,
          backgroundColor: theme.surface,
          ...sombraTarjeta,
        },
        pressed && { opacity: 0.8 },
      ]}
      hitSlop={8}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${title}: ${description}`}
    >
      <View style={{
        width: 40, height: 40, borderRadius: 20,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: theme.surfaceVariant,
      }}>
        <Text style={{ fontSize: 20, color: theme.primary }}>{icon}</Text>
      </View>

      <View style={{ flex: 1, gap: 2, minWidth: 0 }}>
        <Text style={[texto14Negrita, { color: theme.onSurface }]} numberOfLines={1}>
          {title}
        </Text>
        <Text style={{ fontSize: 12, lineHeight: 16, color: theme.onSurfaceVariant }} numberOfLines={1}>
          {description}
        </Text>
      </View>

      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <Text style={{ fontSize: 12, lineHeight: 16, color: theme.onSurfaceVariant }}>{time}</Text>
        <Text style={{ fontSize: 20, fontWeight: '300', color: theme.outline }}>›</Text>
      </View>
    </Pressable>
  )
}