import { View, Text, Pressable } from 'react-native'
import { useTheme } from '@/theme/useTheme'
import { screenStyles, texto16Negrita } from '@/theme/screenStyles'

interface TarjetaAsistenciaProps {
  title: string
  type: string
  date: string
  status: string
  onPress: () => void
}

export default function TarjetaAsistencia({ title, type, date, status, onPress }: TarjetaAsistenciaProps) {
  const theme = useTheme()

  return (
    <Pressable
      style={({ pressed }) => [
        screenStyles.tarjetaAsistencia,
        { backgroundColor: theme.surface, borderColor: theme.outline },
        pressed && { opacity: 0.8 },
      ]}
      onPress={onPress}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={[texto16Negrita, { color: theme.onSurface }]}>{title}</Text>
        <Text style={{ fontSize: 13, lineHeight: 18, color: theme.onSurfaceVariant }}>
          {type} • {date}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, marginLeft: 12,
          backgroundColor: theme.primaryContainer, borderColor: theme.primary,
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: '600', lineHeight: 16, color: theme.onPrimaryContainer }}>
          {status}
        </Text>
      </View>
    </Pressable>
  )
}