import { useState } from 'react'
import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { useTheme } from '@/theme/useTheme'
import { screenStyles } from '@/theme/screenStyles'
import { iniciarSesion } from '@/services/auth'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export default function LoginScreen() {
  const theme = useTheme()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  /**
   * Maneja el inicio de sesión.
   * Valida campos, llama a Firebase Auth y redirige en éxito.
   */
  async function handleIniciarSesion() {
    // Validar campos
    if (!email.trim()) {
      setError('Por favor ingresa tu correo electrónico')
      return
    }
    if (!password.trim()) {
      setError('Por favor ingresa tu contraseña')
      return
    }

    setCargando(true)
    setError('')

    try {
      await iniciarSesion(email.trim(), password)

      // Verificar que el usuario esté activo en Firestore
      const uid = auth().currentUser?.uid
      if (uid) {
        const doc = await firestore().collection('usuarios').doc(uid).get()
        const data = doc.data()

        // Si no existe en Firestore o está desactivado, rechazamos el login
        if (!data || data.activo === false) {
          await auth().signOut()
          setError('Usuario desactivado o no registrado. Contacta a Gerencia Local.')
          return
        }
      }

      // Redirigir explícitamente al dashboard después del login exitoso
      router.replace('/(tabs)/main')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={[
        screenStyles.contenedorLogin,
        { backgroundColor: theme.background },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={screenStyles.contenedorFormularioLogin}>
        {/* Encabezado con logo */}
        <View style={screenStyles.encabezadoLogin}>
          <View
            style={[
              screenStyles.contenedorLogoLogin,
              { backgroundColor: theme.primaryContainer },
              { shadowColor: theme.primaryContainer },
            ]}
          >
            <Text style={[screenStyles.iconoLogoLogin, { color: theme.onPrimaryContainer }]}>
              🚚
            </Text>
          </View>
          <Text style={[screenStyles.tituloLogin, { color: theme.primary }]}>
            Bienvenido
          </Text>
          <Text style={[screenStyles.subtituloLogin, { color: theme.onSurfaceVariant }]}>
            Inicia sesión para continuar
          </Text>
        </View>

        {/* Panel de formulario (efecto glass) */}
        <View
          style={[
            screenStyles.panelCristal,
            {
              backgroundColor: theme.surfaceContainerLow + 'B3', // ~70% opacidad
              borderColor: theme.outlineVariant,
              shadowColor: theme.onSurface,
            },
          ]}
        >
          {/* Campo: Correo electrónico */}
          <View style={screenStyles.grupoCampo}>
            <Text style={[screenStyles.etiquetaCampo, { color: theme.outlineVariant }]}>
              Correo Electrónico
            </Text>
            <View
              style={[
                screenStyles.contenedorCampo,
                {
                  backgroundColor: theme.surfaceVariant,
                  borderColor: theme.outlineVariant,
                },
              ]}
            >
              <Text style={[screenStyles.iconoCampo, { color: theme.outlineVariant }]}>✉</Text>
              <TextInput
                style={[
                  screenStyles.campoTexto,
                  {
                    color: theme.onSurface,
                    backgroundColor: theme.surfaceVariant,
                  },
                ]}
                placeholder="nombre@logística.pro"
                placeholderTextColor={theme.outline}
                value={email}
                onChangeText={(text) => {
                  setEmail(text)
                  setError('')
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!cargando}
              />
            </View>
          </View>

          {/* Campo: Contraseña */}
          <View style={screenStyles.grupoCampo}>
            <View style={screenStyles.encabezadoContrasena}>
              <Text style={[screenStyles.etiquetaCampo, { color: theme.outlineVariant }]}>
                Contraseña
              </Text>
              <Pressable onPress={() => {}}>
                <Text style={[screenStyles.olvidarContrasena, { color: theme.primary }]}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </Pressable>
            </View>
            <View
              style={[
                screenStyles.contenedorCampo,
                {
                  backgroundColor: theme.surfaceVariant,
                  borderColor: theme.outlineVariant,
                },
              ]}
            >
              <Text style={[screenStyles.iconoCampo, { color: theme.outlineVariant }]}>🔒</Text>
              <TextInput
                style={[
                  screenStyles.campoTexto,
                  {
                    color: theme.onSurface,
                    backgroundColor: theme.surfaceVariant,
                  },
                ]}
                placeholder="••••••••"
                placeholderTextColor={theme.outline}
                value={password}
                onChangeText={(text) => {
                  setPassword(text)
                  setError('')
                }}
                secureTextEntry={!mostrarPassword}
                autoCapitalize="none"
                editable={!cargando}
              />
              <Pressable
                onPress={() => setMostrarPassword(!mostrarPassword)}
                style={screenStyles.alternarContrasena}
                hitSlop={8}
              >
                <Text style={{ color: theme.outlineVariant, fontSize: 20 }}>
                  {mostrarPassword ? '🙈' : '👁'}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Mensaje de error */}
          {error ? (
            <Text style={{ color: theme.error, fontSize: 14, textAlign: 'center' }}>
              {error}
            </Text>
          ) : null}

          {/* Botón: Iniciar Sesión */}
          <Pressable
            onPress={handleIniciarSesion}
            disabled={cargando}
            style={({ pressed }) => [
              screenStyles.botonBrillo,
              {
                backgroundColor: theme.primaryContainer,
                shadowColor: theme.primaryContainer,
                opacity: cargando ? 0.7 : pressed ? 0.95 : 1,
              },
            ]}
          >
            {cargando ? (
              <ActivityIndicator color={theme.onPrimaryContainer} size="small" />
            ) : (
              <>
                <Text style={[screenStyles.textoBotonBrillo, { color: theme.onPrimaryContainer }]}>
                  Iniciar Sesión
                </Text>
                <Text style={{ color: theme.onPrimaryContainer, fontSize: 20 }}>→</Text>
              </>
            )}
          </Pressable>

          {/* Divisor */}


          {/* Botones secundarios */}

        </View>

        {/* Pie de página */}
        <View style={screenStyles.pieLogin}>
          <Pressable onPress={() => {}}>
            <Text style={[screenStyles.enlacePie, { color: theme.outlineVariant }]}>
              Política de Privacidad
            </Text>
          </Pressable>
          <Pressable onPress={() => {}}>
            <Text style={[screenStyles.enlacePie, { color: theme.outlineVariant }]}>
              Términos del Servicio
            </Text>
          </Pressable>
          <Pressable onPress={() => {}}>
            <Text style={[screenStyles.enlacePie, { color: theme.outlineVariant }]}>
              Contacto
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}