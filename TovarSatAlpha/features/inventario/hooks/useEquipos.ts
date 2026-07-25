import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchAll, addDocument, updateDocument, deleteDocument } from '@/services/firestore';
import { COLLECTIONS } from '@/config';
import type { EquipoInventario, Sede, TipoEquipo } from '@/types';
import { exportarCSV } from '@/utils/exportCSV';

const TIMEOUT_MS = 5000;

// Hook para gestión de inventario de equipos
export function useEquipos(uid?: string) {
  const [items, setItems] = useState<EquipoInventario[]>([]);
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [tipos, setTipos] = useState<TipoEquipo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const inicioCarga = useRef<number>(Date.now());

  // Obtener equipos, sedes y tipos desde Firestore en paralelo
  const fetchAllData = useCallback(async () => {
    console.log('[useEquipos] fetchAllData llamado');
    inicioCarga.current = Date.now();

    setIsLoading(true);
    setError(null);

    const timeoutId = setTimeout(() => {
      console.log('[useEquipos] TIMEOUT!');
      setIsLoading(false);
      setError('Tiempo de espera agotado. Verifica tu conexión.');
    }, TIMEOUT_MS);

    try {
      console.log('[useEquipos] Llamando fetchAll para equipos, sedes y tiposEquipo...');
      const [equipos, sedesData, tiposData] = await Promise.all([
        fetchAll<EquipoInventario>(COLLECTIONS.EQUIPOS),
        fetchAll<Sede>(COLLECTIONS.SEDES),
        fetchAll<TipoEquipo>(COLLECTIONS.TIPOS_EQUIPO),
      ]);
      clearTimeout(timeoutId);

      console.log('[useEquipos] Cargados:', equipos.length, 'equipos,', sedesData.length, 'sedes,', tiposData.length, 'tipos');
      setItems(equipos);
      setSedes(sedesData);
      setTipos(tiposData);
    } catch (err) {
      clearTimeout(timeoutId);
      console.log('[useEquipos] Error:', err);

      const mensaje =
        err instanceof Error && err.message.includes('permission')
          ? 'Permiso denegado para leer datos.'
          : err instanceof Error && err.message.includes('network')
            ? 'Sin conexión a internet.'
            : 'Error al cargar datos.';
      setError(mensaje);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Exportar inventario a CSV
  const exportarInventarioCSV = useCallback(async () => {
    console.log('[useEquipos] exportarCSV llamado');
    console.log('[useEquipos] Exportando equipos:', items.length);

    const encabezados = ['ID', 'Nombre', 'Modelo', 'Serial', 'Tipo Equipo', 'Sede', 'Estado', 'Valor', 'Cantidad'];
    const filas = items.map((e) => {
      const tipo = tipos.find((t) => t.modelo === e.modelo);
      const sede = sedes.find((s) => s.id === e.ubicacionActual);
      return [
        e.id || '',
        e.nombreDescriptivo,
        e.modelo,
        e.serial,
        tipo?.nombreTipo ?? e.modelo,
        sede?.nombre ?? e.ubicacionActual ?? '',
        e.estado,
        e.valor,
        e.cantidadDisponible,
      ];
    });

    try {
      await exportarCSV('inventario.csv', encabezados, filas);
      console.log(`[useEquipos] CSV exportado: ${filas.length} filas`);
    } catch (err) {
      console.log('[useEquipos] Error exportando CSV:', err);
      throw err;
    }
  }, [items, tipos, sedes]);

  // Crear equipo en Firestore
  const createEquipo = useCallback(async (data: Omit<EquipoInventario, 'id'>) => {
    if (!uid) return;
    console.log('[useEquipos] Creando equipo:', data);

    try {
      const id = await addDocument<EquipoInventario>(COLLECTIONS.EQUIPOS, {
        ...data,
      });
      console.log('[useEquipos] Equipo creado, id:', id);
      await fetchAllData();
      return id;
    } catch (err) {
      console.log('[useEquipos] Error creando equipo:', err);
      throw err;
    }
  }, [uid, fetchAllData]);

  // Actualizar equipo existente
  const updateEquipo = useCallback(async (id: string, data: Partial<EquipoInventario>) => {
    console.log('[useEquipos] Actualizando equipo', id, ':', data);

    try {
      await updateDocument<EquipoInventario>(COLLECTIONS.EQUIPOS, id, data);
      console.log('[useEquipos] Equipo actualizado OK');
      await fetchAllData();
    } catch (err) {
      console.log('[useEquipos] Error actualizando equipo:', err);
      throw err;
    }
  }, [fetchAllData]);

  // Eliminar equipo por ID
  const deleteEquipo = useCallback(async (id: string) => {
    console.log('[useEquipos] Eliminando equipo', id);

    try {
      await deleteDocument(COLLECTIONS.EQUIPOS, id);
      console.log('[useEquipos] Equipo eliminado OK');
      await fetchAllData();
    } catch (err) {
      console.log('[useEquipos] Error eliminando equipo:', err);
      throw err;
    }
  }, [fetchAllData]);

  const retry = useCallback(async () => {
    console.log('[useEquipos] Retry solicitado');
    await fetchAllData();
  }, [fetchAllData]);

  return {
    items,
    sedes,
    tipos,
    isLoading,
    error,
    createEquipo,
    updateEquipo,
    deleteEquipo,
    exportarInventarioCSV,
    retry,
  };
}