import { ScrollView, View, Text } from 'react-native'
import { useTheme } from '@/theme/useTheme'
import { screenStyles } from '@/theme/screenStyles'
import { BarraSuperior } from '@/components/BarraSuperior'
import { TarjetaEnvio } from '@/components/TarjetaEnvio'
import { shipments } from '@/data/mockData'
import { handleTrackShipment, handleShipmentPress } from '@/funciones/funcionesEnvios'

export default function ShipmentsScreen() {
  const theme = useTheme()

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <BarraSuperior title="TovarSAT" />

      <ScrollView
        contentContainerStyle={screenStyles.contenidoDesplazamiento}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 12 }}>
          <Text style={[screenStyles.tituloSeccion, { color: theme.onSurface }]}>Envíos</Text>

          {shipments.map((shipment) => (
            <TarjetaEnvio
              key={shipment.id}
              trackingNumber={shipment.trackingNumber}
              status={shipment.status as 'In Transit' | 'Delivered'}
              product={shipment.product}
              origin={shipment.origin}
              destination={shipment.destination}
              deliveredTime={shipment.deliveredTime}
              history={shipment.history}
              isActive={shipment.isActive}
              onPress={() => {}}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
