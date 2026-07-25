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
}

type ModalFormularioProps = {
  visible: boolean
  titulo: string
  campos: CampoFormulario[]
  cargando: boolean
  textoBotonConfirmar?: string
  onConfirm: () => void | Promise<void>
  onCancel: () => void
}

export function ModalFormulario({
  visible,
  titulo,
  campos,
  cargando,
  textoBotonConfirmar = 'Guardar',
  onConfirm,
  onCancel,
}: ModalFormularioProps) {
  const theme = useTheme()
  const [selectorAbierto, setSelectorAbierto] = useState<number | null>(null)

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
                    backgroundColor: theme.surfaceContainerLowest,
                    borderColor: theme.outline,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => setSelectorAbierto(index)}
                >
                  <Text style={{ color: theme.onSurface, flex: 1 }}>
                    {campo.opciones.find((o) => o.value === campo.value)?.label || campo.placeholder || 'Seleccionar...'}
                  </Text>
                  <Text style={{ color: theme.onSurfaceVariant, fontSize: 20 }}>▼</Text>
                </Pressable>
              ) : (
                <TextInput
                  style={
                    campo.multiline
                      ? {
                          ...screenStyles.inputModalMultiline,
                          backgroundColor: theme.surfaceContainerLowest,
                          borderColor: theme.outline,
                          color: theme.onSurface,
                        }
                      : {
                          ...screenStyles.inputModal,
                          backgroundColor: theme.surfaceContainerLowest,
                          borderColor: theme.outline,
                          color: theme.onSurface,
                        }
                  }
                  value={campo.value}
                  onChangeText={campo.onChangeText}
                  placeholder={campo.placeholder}
                  placeholderTextColor={theme.onSurfaceVariant}
                  multiline={campo.multiline}
                  numberOfLines={campo.numberOfLines}
                  autoCapitalize={campo.autoCapitalize || 'none'}
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
                Cancelar
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