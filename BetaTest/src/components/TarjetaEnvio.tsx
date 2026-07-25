import { View, Text, Pressable } from 'react-native'
import { useTheme } from '@/theme/useTheme'
import { sombraTarjeta, texto14Negrita, texto16Negrita } from '@/theme/screenStyles'

interface TimelineEvent {
  event: string
  time: string
  location: string
}

interface TarjetaEnvioProps {
  trackingNumber: string
  status: 'In Transit' | 'Delivered'
  product: string
  origin?: string
  destination?: string
  deliveredTime?: string
  history?: TimelineEvent[]
  isActive?: boolean
  onPress?: () => void
}

export function TarjetaEnvio({
  trackingNumber, status, product, origin, destination,
  deliveredTime, history = [], isActive = false, onPress,
}: Readonly<TarjetaEnvioProps>) {
  const theme = useTheme()
  const statusColor = status === 'In Transit' ? theme.secondaryContainer : theme.primary
  const statusTextColor = status === 'In Transit' ? theme.onSecondaryFixed : theme.onPrimaryFixed

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        borderRadius: 12, padding: 16, marginBottom: 16,
        borderLeftWidth: 4, borderLeftColor: statusColor,
        backgroundColor: theme.surfaceContainerLowest,
        ...sombraTarjeta,
        opacity: pressed ? 0.8 : 1,
      })}
      hitSlop={8}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${product}, ${status}, ${trackingNumber}`}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <Text style={{ fontSize: 13, fontWeight: '500', lineHeight: 18, color: theme.onSurfaceVariant, fontVariant: ['tabular-nums'] as any }}>
            {trackingNumber}
          </Text>
          <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, backgroundColor: statusColor }}>
            <Text style={{ fontSize: 12, fontWeight: '500', lineHeight: 16, color: statusTextColor }}>
              {status === 'In Transit' && '● '}{status}
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 24, fontWeight: '300', color: theme.onSurfaceVariant }}>›</Text>
      </View>

      <Text style={[texto16Negrita, { color: theme.onSurface, marginBottom: 12 }]}>{product}</Text>

      {isActive && origin && destination && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, flex: 1 }}>
            <Text style={{ fontSize: 18, color: theme.onSurfaceVariant }}>📍</Text>
            <Text style={{ fontSize: 14, lineHeight: 20, color: theme.onSurfaceVariant, flex: 1 }}>{origin}</Text>
          </View>
          <View style={{ width: 16, borderTopWidth: 1, borderStyle: 'dashed', borderColor: theme.outlineVariant }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, flex: 1 }}>
            <Text style={{ fontSize: 18, color: theme.onSurfaceVariant }}>🚩</Text>
            <Text style={{ fontSize: 14, lineHeight: 20, color: theme.onSurfaceVariant, flex: 1 }}>{destination}</Text>
          </View>
        </View>
      )}

      {!isActive && deliveredTime && (
        <Text style={{ fontSize: 14, lineHeight: 20, color: theme.onSurfaceVariant, marginBottom: 4 }}>
          Entregado {deliveredTime}
        </Text>
      )}

      {isActive && history.length > 0 && (
        <View style={{ marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderColor: theme.surfaceContainerHigh }}>
          <Text style={[texto14Negrita, { color: theme.onSurface, marginBottom: 12 }]}>Historial</Text>
          {history.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
              <View style={{ alignItems: 'center', width: 16 }}>
                <View style={{
                  width: 10, height: 10, borderRadius: 5, borderWidth: 2,
                  backgroundColor: index === 0 ? theme.secondaryContainer : theme.surfaceContainerHigh,
                  borderColor: index === 0 ? theme.secondaryContainer : theme.surfaceContainerHigh,
                }} />
                {index < history.length - 1 && (
                  <View style={{ width: 2, flex: 1, backgroundColor: theme.surfaceContainerHigh }} />
                )}
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={[texto14Negrita, { color: theme.onSurface }]}>{item.event}</Text>
                <Text style={{ fontSize: 12, lineHeight: 16, color: theme.onSurfaceVariant, opacity: 0.75 }}>
                  {item.time} • {item.location}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </Pressable>
  )
}