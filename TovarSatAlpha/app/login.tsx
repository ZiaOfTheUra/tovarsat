import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/hooks/useAuth';

export default function LoginScreen() {
  const { login, isLoading, error, isAuthenticated } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log('[LoginScreen] Montando pantalla. isAuthenticated=', isAuthenticated, 'isLoading=', isLoading);

  const handleLogin = async () => {
    console.log('[LoginScreen] handleLogin: intento con email=', email.trim());
    if (!email.trim() || !password.trim()) {
      console.log('[LoginScreen] handleLogin: campos vacíos, abortando');
      return;
    }
    try {
      await login(email.trim(), password);
      console.log('[LoginScreen] handleLogin: login() resolvió sin error');
    } catch (err) {
      console.log('[LoginScreen] handleLogin: error capturado', err);
    }
  };

  useEffect(() => {
    console.log('[LoginScreen] useEffect disparado. isAuthenticated=', isAuthenticated);
    if (isAuthenticated) {
      console.log('[LoginScreen] Navegando a /(tabs)');
      router.replace('/(tabs)' as any);
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    console.log('[LoginScreen] Ya autenticado, retornando null');
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ThemedView style={styles.inner}>
        <ThemedText type="title" style={styles.title}>
          TovarSAT
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Iniciar Sesión
        </ThemedText>

        {error && (
          <ThemedView style={styles.errorBox}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          </ThemedView>
        )}

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          editable={!isLoading}
        />

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={styles.buttonText}>Ingresar</ThemedText>
          )}
        </TouchableOpacity>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: '10%',
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
    opacity: 0.7,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorBox: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    width: '100%',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    textAlign: 'center',
  },
});