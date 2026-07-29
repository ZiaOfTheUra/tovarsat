import { useState } from 'react'
import { View, Text, TextInput, Pressable, Modal, Alert, FlatList } from 'react-native'
import { useTheme } from '@/theme/useTheme'
import { screenStyles, estilosModal } from '@/theme/screenStyles'

export type CampoFormulario = {
  label: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  multiline?: boolean
  numberOfLines?: number
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  opciones?: { label: string; value: string }[]
  soloLectura?: boolean
}

type ModalFormularioProps = {
  visible: boolean
  titulo: string
  campos: CampoFormulario[]
  cargando: boolean
  textoBotonConfirmar?: string
  textoBotonCancelar?: string
  onConfirm: () => void | Promise<void>
  onCancel: () => void
  mostrarEliminar?: boolean
  onEliminar?: () => void | Promise<void>
  textoBotonEliminar?: string
}

export function ModalFormulario({
  visible,
  titulo,
  campos,
  cargando,
  textoBotonConfirmar = 'Guardar',
  textoBotonCancelar = 'Cancelar',
  onConfirm,
  onCancel,
  mostrarEliminar = false,
  onEliminar,
  textoBotonEliminar = 'Eliminar',
}: ModalFormularioProps) {
  const theme = useTheme()
  const [selectorAbierto, setSelectorAbierto] = useState<number | null>(null)

  const handleEliminar = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            if (onEliminar) {
              onEliminar()
            }
          },
        },
      ]
    )
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={estilosModal.superposicion}>
        <View style={[estilosModal.tarjeta, { backgroundColor: theme.surfaceContainerLow }]}>
          <Text style={[screenStyles.tituloSeccion, { color: theme.onSurface }]}>
            {titulo}
          </Text>

          {campos.map((campo, index) => (
            <View key={index} style={estilosModal.grupoCampo}>
              <Text style={[estilosModal.etiquetaCampoModal, { color: theme.onSurface }]}>
                {campo.label}
              </Text>
              {campo.opciones ? (
                <Pressable
                  style={{
                    minHeight: 44,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    borderWidth: 1,
                    borderRadius: 12,
                    backgroundColor: campo.soloLectura ? theme.surfaceContainerHigh : theme.surfaceContainerLowest,
                    borderColor: campo.soloLectura ? theme.surfaceContainerHigh : theme.outline,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={campo.soloLectura ? undefined : () => setSelectorAbierto(index)}
                >
                  <Text style={{ color: campo.soloLectura ? theme.onSurfaceVariant : theme.onSurface, flex: 1 }}>
                    {campo.opciones.find((o) => o.value === campo.value)?.label || campo.placeholder || 'Seleccionar...'}
                  </Text>
                  {!campo.soloLectura && <Text style={{ color: theme.onSurfaceVariant, fontSize: 20 }}>▼</Text>}
                </Pressable>
              ) : (
                <TextInput
                  style={
                    campo.multiline
                      ? {
                          ...screenStyles.inputModalMultiline,
                          backgroundColor: campo.soloLectura ? theme.surfaceContainerHigh : theme.surfaceContainerLowest,
                          borderColor: campo.soloLectura ? theme.surfaceContainerHigh : theme.outline,
                          color: campo.soloLectura ? theme.onSurfaceVariant : theme.onSurface,
                        }
                      : {
                          ...screenStyles.inputModal,
                          backgroundColor: campo.soloLectura ? theme.surfaceContainerHigh : theme.surfaceContainerLowest,
                          borderColor: campo.soloLectura ? theme.surfaceContainerHigh : theme.outline,
                          color: campo.soloLectura ? theme.onSurfaceVariant : theme.onSurface,
                        }
                  }
                  value={campo.value}
                  onChangeText={campo.onChangeText}
                  placeholder={campo.placeholder}
                  placeholderTextColor={theme.onSurfaceVariant}
                  multiline={campo.multiline}
                  numberOfLines={campo.numberOfLines}
                  autoCapitalize={campo.autoCapitalize || 'none'}
                  editable={!campo.soloLectura}
                />
              )}
            </View>
          ))}

          <View style={estilosModal.filaBotones}>
            <Pressable
              style={({ pressed }) => [
                screenStyles.botonCancelar,
                { opacity: pressed ? 0.8 : 1 },
              ]}
              onPress={onCancel}
            >
              <Text style={[screenStyles.textoBotonEnviar, { color: theme.onSurface }]}>
                {textoBotonCancelar}
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                screenStyles.botonConfirmar,
                {
                  backgroundColor: theme.primary,
                  opacity: cargando ? 0.9 : pressed ? 0.8 : 1,
                },
              ]}
              onPress={onConfirm}
              disabled={cargando}
            >
              <Text style={[screenStyles.textoBotonEnviar, { color: theme.onPrimary }]}>
                {cargando ? 'Guardando...' : textoBotonConfirmar}
              </Text>
            </Pressable>
          </View>

          {mostrarEliminar && onEliminar && (
            <Pressable
              style={({ pressed }) => [
                {
                  marginTop: 12,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  backgroundColor: theme.error,
                  opacity: cargando ? 0.9 : pressed ? 0.8 : 1,
                  alignItems: 'center',
                },
              ]}
              onPress={handleEliminar}
              disabled={cargando}
            >
              <Text style={[screenStyles.textoBotonEnviar, { color: theme.onError }]}>
                {textoBotonEliminar}
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      {selectorAbierto !== null && (
        <Modal
          visible={true}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectorAbierto(null)}
        >
          <View style={estilosModal.superposicion}>
            <View style={[estilosModal.tarjeta, { backgroundColor: theme.surfaceContainerLow, maxHeight: 400 }]}>
              <Text style={[screenStyles.tituloSeccion, { color: theme.onSurface, marginBottom: 12 }]}>
                Seleccionar
              </Text>
              <FlatList
                data={campos[selectorAbierto].opciones}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <Pressable
                    style={({ pressed }) => [
                      {
                        padding: 16,
                        borderRadius: 8,
                        backgroundColor: pressed ? theme.surfaceContainerHighest : 'transparent',
                      },
                    ]}
                    onPress={() => {
                      campos[selectorAbierto].onChangeText(item.value)
                      setSelectorAbierto(null)
                    }}
                  >
                    <Text style={{ color: theme.onSurface, fontSize: 16 }}>
                      {item.label}
                    </Text>
                  </Pressable>
                )}
              />
            </View>
          </View>
        </Modal>
      )}
    </Modal>
  )
}