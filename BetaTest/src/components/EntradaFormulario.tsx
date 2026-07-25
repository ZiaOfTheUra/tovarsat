import { View, Text, TextInput } from 'react-native'
import { useTheme } from '@/theme/useTheme'

interface EntradaFormularioProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'email-address' | 'numeric'
  error?: string
}

export function EntradaFormulario({
  label, value, onChangeText, placeholder,
  secureTextEntry = false, keyboardType = 'default', error,
}: Readonly<EntradaFormularioProps>) {
  const theme = useTheme()

  return (
    <View style={{ flexDirection: 'column', gap: 8, marginBottom: 16 }}>
      <Text style={{ fontSize: 14, fontWeight: '500', lineHeight: 20, color: theme.onSurface }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.onSurfaceVariant}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={{
          width: '100%', minHeight: 44,
          paddingHorizontal: 12, paddingVertical: 10,
          borderWidth: 1, borderRadius: 12,
          fontSize: 16, lineHeight: 24,
          color: theme.onSurface,
          backgroundColor: theme.surfaceContainerLowest,
          borderColor: error ? theme.error : theme.outline,
        }}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {error && (
        <Text style={{ fontSize: 12, lineHeight: 16, marginTop: 4, color: theme.error }}>{error}</Text>
      )}
    </View>
  )
}