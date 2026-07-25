import { useAuth } from '@/hooks/useAuth';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function TesoreriaGestionScreen() {
  const { user } = useAuth();

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 }}>
      <ThemedText type="title">Tesorería (Gestión)</ThemedText>
      <ThemedText style={{ opacity: 0.6 }}>
        {user?.nombre} · {user?.sedeNombre || user?.sede} · Administrador
      </ThemedText>
    </ThemedView>
  );
}