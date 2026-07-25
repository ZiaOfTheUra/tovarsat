import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { fetchAll, addDocument, updateDocument, deleteDocument } from '@/services/firestore';
import { COLLECTIONS } from '@/config';
import type { Inventario } from '@/types';

const TIMEOUT_MS = 5000;

export function useInventario(uid?: string) {
  const [items, setItems] = useState<Inventario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const inicioCarga = useRef<number>(Date.now());

  const fetchInventory = useCallback(async () => {
    console.log('[useInventario] fetchInventory llamado');
    inicioCarga.current = Date.now();

    if (!uid) {
      console.log('[useInventario] uid vacío');
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const timeoutId = setTimeout(() => {
      console.log('[useInventario] TIMEOUT!');
      setIsLoading(false);
      setError('Tiempo de espera agotado. Verifica tu conexión.');
    }, TIMEOUT_MS);

    try {
      console.log('[useInventario] Llamando fetchAll...');
      const all = await fetchAll<Inventario>(COLLECTIONS.INVENTARIO);
      clearTimeout(timeoutId);

      // Filtrar por sede del usuario (se obtendrá en la pantalla)
      // Por ahora cargar todo y dejar que la pantalla filtre
      console.log('[useInventario] Cargados', all.length, 'items');
      setItems(all);
    } catch (err) {
      clearTimeout(timeoutId);
      console.log('[useInventario] Error:', err);

      const mensaje =
        err instanceof Error && err.message.includes('permission')
          ? 'Permiso denegado para leer inventario.'
          : err instanceof Error && err.message.includes('network')
            ? 'Sin conexión a internet.'
            : 'Error al cargar inventario.';
      setError(mensaje);
    } finally {
      setIsLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const createItem = useCallback(async (data: Omit<Inventario, 'id' | 'creadoPor' | 'creadoEn'>) => {
    if (!uid) return;
    console.log('[useInventario] Creando item:', data);

    try {
      const id = await addDocument<Inventario>(COLLECTIONS.INVENTARIO, {
        ...data,
        creadoPor: uid,
        creadoEn: new Date(),
      });
      console.log('[useInventario] Item creado, id:', id);
      await fetchInventory();
      return id;
    } catch (err) {
      console.log('[useInventario] Error creando item:', err);
      throw err;
    }
  }, [uid, fetchInventory]);

  const updateItem = useCallback(async (id: string, data: Partial<Inventario>) => {
    console.log('[useInventario] Actualizando item', id, ':', data);

    try {
      await updateDocument<Inventario>(COLLECTIONS.INVENTARIO, id, data);
      console.log('[useInventario] Item actualizado OK');
      await fetchInventory();
    } catch (err) {
      console.log('[useInventario] Error actualizando item:', err);
      throw err;
    }
  }, [fetchInventory]);

  const deleteItem = useCallback(async (id: string) => {
    console.log('[useInventario] Eliminando item', id);

    try {
      await deleteDocument(COLLECTIONS.INVENTARIO, id);
      console.log('[useInventario] Item eliminado OK');
      await fetchInventory();
    } catch (err) {
      console.log('[useInventario] Error eliminando item:', err);
      throw err;
    }
  }, [fetchInventory]);

  const retry = useCallback(async () => {
    console.log('[useInventario] Retry solicitado');
    await fetchInventory();
  }, [fetchInventory]);

  return {
    items,
    isLoading,
    error,
    createItem,
    updateItem,
    deleteItem,
    retry,
  };
}