import { ScrollView, View, Text, Pressable } from 'react-native'
import { useState } from 'react'
import { useTheme } from '@/theme/useTheme'
import { screenStyles } from '@/theme/screenStyles'
import { BarraSuperior } from '@/components/BarraSuperior'
import { EntradaFormulario } from '@/components/EntradaFormulario'
import { handleSubmitRegistration, handleAssistanceTypeChange } from '@/funciones/funcionesRegistro'

export default function RegisterScreen() {
  const theme = useTheme()
  const [fullName, setFullName] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [assistanceType, setAssistanceType] = useState('')

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <BarraSuperior title="TovarSAT" />

      <ScrollView
        contentContainerStyle={screenStyles.contenidoDesplazamiento}
        showsVerticalScrollIndicator={false}
      >
        <View style={screenStyles.seccionEncabezado}>
          <Text style={[screenStyles.saludo, { color: theme.onSurface }]}>
            Registro de Asistencia
          </Text>
          <Text style={[screenStyles.subtitulo, { color: theme.onSurfaceVariant }]}>
            Proporciona los detalles para tu solicitud de asistencia. Asegúrate de que toda la información sea precisa.
          </Text>
        </View>

        <View style={screenStyles.contenedorProgreso}>
          <View style={[screenStyles.barraProgreso, { backgroundColor: theme.surfaceVariant }]}>
            <View style={[screenStyles.rellenoProgreso, { backgroundColor: theme.primary, width: '33%' }]} />
          </View>
        </View>

        <View style={[screenStyles.contenedorFormulario, { backgroundColor: theme.surfaceContainerLowest, shadowColor: theme.onSurface }]}>
          <EntradaFormulario
            label="Nombre Completo"
            value={fullName}
            onChangeText={setFullName}
            placeholder="Ej: Juan Pérez"
          />

          <EntradaFormulario
            label="Cédula/ID"
            value={idNumber}
            onChangeText={setIdNumber}
            placeholder="Ej: 123-456-789"
          />

          <View style={screenStyles.contenedorSeleccion}>
            <Text style={[screenStyles.etiquetaSeleccion, { color: theme.onSurface }]}>Tipo de Asistencia</Text>
            <Pressable
              style={({ pressed }) => [
                screenStyles.activadorSeleccion,
                {
                  backgroundColor: theme.surfaceContainerLowest,
                  borderColor: theme.outline,
                },
                pressed && { opacity: 0.8 },
              ]}
            >
              <Text style={[screenStyles.textoSeleccion, { color: assistanceType ? theme.onSurface : theme.onSurfaceVariant }]}>
                {assistanceType || 'Seleccionar categoría...'}
              </Text>
              <Text style={[screenStyles.iconoSeleccion, { color: theme.onSurfaceVariant }]}>▼</Text>
            </Pressable>
          </View>

          <EntradaFormulario
            label="Correo Electrónico"
            value={contactEmail}
            onChangeText={setContactEmail}
            placeholder="juan@ejemplo.com"
            keyboardType="email-address"
          />
        </View>

        <Pressable
          style={({ pressed }) => [
            screenStyles.botonEnviar,
            {
              backgroundColor: theme.primaryContainer,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <Text style={[screenStyles.textoBotonEnviar, { color: theme.onPrimaryContainer }]}>
            Registrar Solicitud
          </Text>
          <Text style={[screenStyles.iconoBotonEnviar, { color: theme.onPrimaryContainer }]}>→</Text>
        </Pressable>
      </ScrollView>
    </View>
  )
}
