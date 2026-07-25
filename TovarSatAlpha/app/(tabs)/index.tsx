import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardScreen() {
  const { user, logout } = useAuth();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">TovarSAT</ThemedText>
        <ThemedText style={styles.subtitle}>Panel Principal</ThemedText>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">Bienvenido</ThemedText>
        <ThemedText style={styles.name}>{user?.nombre || 'Usuario'}</ThemedText>
        <ThemedText style={styles.email}>{user?.email}</ThemedText>
        <ThemedView style={styles.roleBadge}>
          <ThemedText style={styles.roleText}>{user?.rol}</ThemedText>
        </ThemedView>
        <ThemedText style={styles.sede}>Sede: {user?.sedeNombre || user?.sede || 'No asignada'}</ThemedText>
      </ThemedView>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <ThemedText style={styles.logoutText}>Cerrar Sesión</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: '12%',
    gap: 24,
  },
  header: {
    alignItems: 'center',
    gap: 4,
    marginTop: 20,
  },
  subtitle: {
    opacity: 0.6,
    fontSize: 16,
  },
  card: {
    padding: 24,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    opacity: 0.7,
  },
  roleBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  roleText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  sede: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});