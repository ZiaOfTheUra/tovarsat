import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useInventario } from '@/features/inventario/hooks/useInventario';
import { exportarCSV } from '@/utils/exportCSV';
import type { Inventario } from '@/types';

export default function InventarioExportScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { items: inventario, isLoading, error, retry } = useInventario();

  const [exportando, setExportando] = useState(false);

  const formatearFecha = (ts: Date | any): string => {
    if (!ts) return '-';
    const d = ts instanceof Date ? ts : ts.toDate?.() || new Date(ts);
    return d.toLocaleDateString('es-VE');
  };

  const handleExport = async () => {
    if (inventario.length === 0) {
      Alert.alert('Sin datos', 'No hay equipos en inventario para exportar');
      return;
    }

    setExportando(true);
    try {
      const encabezados = ['Item', 'Cantidad', 'Sede', 'Estado', 'Creado Por', 'Creado En'];
      const filas = inventario.map((e: Inventario) => [
        e.item,
        e.cantidad,
        e.sede,
        e.estado,
        e.creadoPor,
        formatearFecha(e.creadoEn),
      ]);

      await exportarCSV(`inventario_${new Date().toISOString().split('T')[0]}.csv`, encabezados, filas);
      Alert.alert('Éxito', `Se exportaron ${inventario.length} equipos`);
      router.back();
    } catch (err: any) {
      Alert.alert('Error', err.message || 'No se pudo exportar');
    } finally {
      setExportando(false);
    }
  };

  if (isLoading) {
    return (
      <ThemedView style={estilos.centro}>
        <ActivityIndicator size="large" />
        <ThemedText>Cargando inventario...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={estilos.centro}>
        <ThemedText style={estilos.error}>{error}</ThemedText>
        <TouchableOpacity onPress={retry}>
          <ThemedText style={estilos.reintentar}>Reintentar</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={estilos.contenedor}>
      <ThemedText type="title" style={estilos.titulo}>Exportar Inventario</ThemedText>
      <ThemedText style={estilos.subtitulo}>
        {inventario.length} equipos registrados
      </ThemedText>

      <TouchableOpacity
        style={[estilos.botonExportar, exportando && estilos.botonDesactivado]}
        onPress={handleExport}
        disabled={exportando}
      >
        <ThemedText style={estilos.textoBoton}>
          {exportando ? 'Exportando...' : '📤 Exportar a CSV'}
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={estilos.botonCancelar} onPress={() => router.back()}>
        <ThemedText>Cancelar</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    paddingTop: '8%',
    gap: 14,
  },
  titulo: {
    marginBottom: 2,
  },
  subtitulo: {
    opacity: 0.7,
    marginBottom: 10,
  },
  error: {
    color: '#D32F2F',
    textAlign: 'center',
  },
  reintentar: {
    color: '#007AFF',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
  botonExportar: {
    backgroundColor: '#1565C0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonDesactivado: {
    opacity: 0.4,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  botonCancelar: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
});