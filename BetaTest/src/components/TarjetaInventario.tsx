import { View, Text, Pressable, Image } from 'react-native'
import { useTheme } from '@/theme/useTheme'
import { sombraTarjeta, texto16Negrita } from '@/theme/screenStyles'

interface TarjetaInventarioProps {
  name: string
  sku: string
  quantity: number
  location: string
  stockPercentage: number
  imageUrl?: string
  isLowStock?: boolean
  onPress?: () => void
}

export function TarjetaInventario({
  name, sku, quantity, location, stockPercentage,
  imageUrl, isLowStock = false, onPress,
}: Readonly<TarjetaInventarioProps>) {
  const theme = useTheme()
  const stockColor = isLowStock ? theme.secondaryContainer : theme.primary

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row', alignItems: 'center', gap: 16,
        padding: 16, borderRadius: 12, marginBottom: 12,
        borderLeftWidth: 4, borderLeftColor: stockColor,
        backgroundColor: theme.surfaceContainerLowest,
        ...sombraTarjeta,
        opacity: pressed ? 0.8 : 1,
      })}
      hitSlop={8}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${quantity} unidades en ${location}`}
    >
      <View style={{ width: 64, height: 64, borderRadius: 8, overflow: 'hidden', backgroundColor: '#1a202a' }}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={{ width: '100%', height: '100%', opacity: 0.8 }} resizeMode="cover" />
        ) : (
          <View style={{ width: '100%', height: '100%', backgroundColor: theme.surfaceContainer }} />
        )}
      </View>

      <View style={{ flex: 1, gap: 4 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
          <Text style={[texto16Negrita, { color: theme.onSurface, flex: 1, marginRight: 8 }]} numberOfLines={1}>
            {name}
          </Text>
          <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, backgroundColor: theme.surfaceContainerLow }}>
            <Text style={{ fontSize: 12, fontWeight: '500', lineHeight: 16, color: theme.primary }}>{location}</Text>
          </View>
        </View>

        <Text style={{ fontSize: 13, fontWeight: '500', lineHeight: 18, color: theme.outline, marginBottom: 8, fontVariant: ['tabular-nums'] as any }}>
          SKU: {sku}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ flex: 1, height: 8, borderRadius: 4, overflow: 'hidden', backgroundColor: theme.surfaceVariant }}>
            <View style={{ height: '100%', borderRadius: 4, backgroundColor: stockColor, width: `${Math.min(stockPercentage, 100)}%` }} />
          </View>
          <Text style={{
            fontSize: 14, fontWeight: isLowStock ? '700' : '500', lineHeight: 20,
            minWidth: 60, textAlign: 'right',
            color: isLowStock ? theme.secondary : theme.onSurface,
          }}>
            {quantity} Und.
          </Text>
        </View>
      </View>

      <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: '300', color: theme.outline }}>›</Text>
      </View>
    </Pressable>
  )
}