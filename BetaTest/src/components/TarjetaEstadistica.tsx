import { View, Text } from 'react-native'
import { useTheme } from '@/theme/useTheme'
import { sombraTarjeta } from '@/theme/screenStyles'

interface TarjetaEstadisticaProps {
  title: string
  value: string | number
  trend?: string
  icon: string
  fullWidth?: boolean
  color?: 'primary' | 'secondary' | 'error'
}

export function TarjetaEstadistica({ title, value, trend, icon, fullWidth = false, color = 'primary' }: Readonly<TarjetaEstadisticaProps>) {
  const theme = useTheme()

  const getIconColor = () => {
    switch (color) {
      case 'secondary': return theme.secondary
      case 'error': return theme.error
      default: return theme.primary
    }
  }

  return (
    <View
      style={[
        { backgroundColor: theme.surface, borderRadius: 12, padding: 16, ...sombraTarjeta },
        fullWidth && { width: '100%' },
      ]}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={{ fontSize: 12, fontWeight: '500', lineHeight: 16, color: theme.onSurfaceVariant }}>
            {title}
          </Text>
          <Text style={{ fontSize: 30, fontWeight: '700', lineHeight: 38, letterSpacing: -0.02, color: theme.onSurface }}>
            {value}
          </Text>
          {trend && (
            <Text style={{ fontSize: 12, lineHeight: 16, marginTop: 4, color: '#16a34a' }}>
              {'↗ '}{trend}
            </Text>
          )}
        </View>
        <View
          style={{
            width: 48, height: 48, borderRadius: 24,
            alignItems: 'center', justifyContent: 'center',
            backgroundColor: color === 'error' ? theme.errorContainer : theme.primaryContainer,
          }}
        >
          <Text style={{ fontSize: 24, color: color === 'error' ? theme.onErrorContainer : theme.onPrimaryContainer }}>
            {icon}
          </Text>
        </View>
      </View>
    </View>
  )
}