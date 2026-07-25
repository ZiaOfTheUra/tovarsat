import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { fetchAll, addDocument, updateDocument } from '@/services/firestore';
import { COLLECTIONS } from '@/config';
import type { Asistencia, Timestamp } from '@/types';

// Tiempo máximo de espera para la lectura de Firestore (5 segundos)
const TIMEOUT_MS = 5000;

export function useAttendance(uid?: string, verTodos: boolean = false) {
  const [records, setRecords] = useState<Asistencia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const inicioCarga = useRef<number>(Date.now());

  const toDate = useCallback((v: Date | Timestamp | undefined): Date => {
    if (!v) return new Date(0);
    return v instanceof Date ? v : v.toDate();
  }, []);

  const fetchHistory = useCallback(async () => {
    console.log('[useAttendance] fetchHistory llamado, uid =', uid);
    inicioCarga.current = Date.now();

    if (!uid) {
      console.log('[useAttendance] uid vacío, reseteando isLoading');
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    console.log('[useAttendance] isLoading = true, timeout de', TIMEOUT_MS, 'ms activado');

    const timeoutId = setTimeout(() => {
      const transcurrido = Date.now() - inicioCarga.current;
      console.log('[useAttendance] TIMEOUT! Duró', transcurrido, 'ms antes de activarse');
      setIsLoading(false);
      setError(`Tiempo de espera agotado (${TIMEOUT_MS / 1000}s). Verifica tu conexión.`);
    }, TIMEOUT_MS);

    try {
      console.log('[useAttendance] Antes de fetchAll...');
      const all = await fetchAll<Asistencia>(COLLECTIONS.ASISTENCIAS);
      clearTimeout(timeoutId);
      const transcurrido = Date.now() - inicioCarga.current;
      console.log('[useAttendance] fetchAll completado en', transcurrido, 'ms, docs =', all.length);

      const filtrados = verTodos
        ? all
        : all.filter((r) => r.uid === uid);
      
      const ordenados = filtrados
        .sort((a, b) => toDate(b.fechaEntrada).getTime() - toDate(a.fechaEntrada).getTime())
        .slice(0, verTodos ? 50 : 7); // más registros para gerencia
      
      console.log('[useAttendance] Filtrados (verTodos=' + verTodos + '):', ordenados.length, 'registros');
      setRecords(ordenados);
    } catch (err) {
      clearTimeout(timeoutId);
      const transcurrido = Date.now() - inicioCarga.current;
      console.log('[useAttendance] Error en fetchAll después de', transcurrido, 'ms:', err);
      console.log('[useAttendance] Tipo de error:', err instanceof Error ? err.constructor.name : typeof err);
      if (err instanceof Error) {
        console.log('[useAttendance] Mensaje completo:', err.message);
        console.log('[useAttendance] Stack:', err.stack);
      }

      const mensaje =
        err instanceof Error && err.message.includes('permission')
          ? 'Permiso denegado para leer asistencia.'
          : err instanceof Error && err.message.includes('network')
            ? 'Sin conexión a internet.'
            : `Error al cargar historial (${err instanceof Error ? err.message : 'desconocido'})`;
      setError(mensaje);
    } finally {
      const transcurrido = Date.now() - inicioCarga.current;
      console.log('[useAttendance] Finally ejecutado después de', transcurrido, 'ms, isLoading = false');
      setIsLoading(false);
    }
  }, [uid, toDate, verTodos]);

  useEffect(() => {
    console.log('[useAttendance] useEffect disparado, uid =', uid);
    fetchHistory();
  }, [fetchHistory]);

  const isClockedIn = useMemo(
    () => records.length > 0 && records[0].fechaSalida === undefined,
    [records]
  );

  const currentSession = useMemo(
    () => (isClockedIn ? records[0] : null),
    [isClockedIn, records]
  );

  const history = useMemo(
    () => records.filter((r) => r.fechaSalida !== undefined),
    [records]
  );

  const marcarEntradaSalida = useCallback(async () => {
    if (!uid || verTodos) return;
    const now = new Date();

    if (isClockedIn && currentSession) {
      const entrada = toDate(currentSession.fechaEntrada).getTime();
      const salida = now.getTime();
      const horas = Math.round((salida - entrada) / (1000 * 60 * 60) * 100) / 100;

      await updateDocument<Asistencia>(
        COLLECTIONS.ASISTENCIAS,
        currentSession.id!,
        { fechaSalida: now, horas }
      );
    } else {
      await addDocument<Asistencia>(COLLECTIONS.ASISTENCIAS, {
        uid,
        fechaEntrada: now,
        metodoMarcaje: 'manual',
        registradoPorKiosco: false,
      });
    }
    await fetchHistory();
  }, [uid, isClockedIn, currentSession, fetchHistory, toDate]);

  return {
    records,
    isClockedIn,
    currentSession,
    history,
    isLoading,
    error,
    marcarEntradaSalida: verTodos ? undefined : marcarEntradaSalida,
    retry: fetchHistory,
  };
}