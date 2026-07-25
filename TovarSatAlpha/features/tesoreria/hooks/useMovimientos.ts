import { useState, useEffect, useCallback, useRef } from 'react';
import { useFocusEffect } from 'expo-router';
import { Alert } from 'react-native';
import {
  fetchAll,
  addDocument,
  updateDocument,
  deleteDocument,
  fetchById,
} from '@/services/firestore';
import { COLLECTIONS } from '@/config';
import type { MovimientoTesoreria, Fondo, Sede } from '@/types';
import { exportarCSV } from '@/utils/exportCSV';

const TIMEOUT_MS = 5000;

// Loguear cada campo de un objeto, marcando valores undefined.
function logCampos(prefix: string, data: Record<string, unknown>) {
  console.log(`[useMovimientos] ${prefix}`);
  Object.entries(data).forEach(([key, val]) => {
    if (val === undefined) {
      console.log(`[useMovimientos]   CAMPO UNDEFINED: ${key}`);
    } else if (val instanceof Date) {
      console.log(`[useMovimientos]   ${key}: ${val.toISOString()}`);
    } else {
      console.log(`[useMovimientos]   ${key}:`, val);
    }
  });
}

export function useMovimientos(uid?: string, sedeUsuario?: string, esTesoreriaGeneral?: boolean, _refreshKey?: number, sedeUsuarioNombre?: string) {
  const [movimientos, setMovimientos] = useState<MovimientoTesoreria[]>([]);
  const [fondos, setFondos] = useState<Fondo[]>([]);
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const inicioCarga = useRef<number>(Date.now());
  const mounted = useRef(true);

  const fetchAllData = useCallback(async (esCargaInicial: boolean = false) => {
    console.log('[useMovimientos] fetchAllData llamado (inicial:', esCargaInicial, ')');
    inicioCarga.current = Date.now();

    // Solo mostrar el spinner en la carga inicial
    if (esCargaInicial) {
      setIsLoading(true);
    }
    setError(null);

    const timeoutId = setTimeout(() => {
      console.log('[useMovimientos] TIMEOUT!');
      if (mounted.current) {
        setIsLoading(false);
        setError('Tiempo de espera agotado. Verifica tu conexión.');
      }
    }, TIMEOUT_MS);

    try {
      console.log('[useMovimientos] Cargando movimientos, fondos, sedes...');
      const [movs, fondosData, sedesData] = await Promise.all([
        fetchAll<MovimientoTesoreria>(COLLECTIONS.MOVIMIENTOS_TESORERIA),
        fetchAll<Fondo>(COLLECTIONS.FONDOS),
        fetchAll<Sede>(COLLECTIONS.SEDES),
      ]);
      clearTimeout(timeoutId);

      // Resolver la sede: puede ser un ID de Firestore o un nombre
      const sedeNombre = sedeUsuarioNombre || sedesData.find((s) => s.id === sedeUsuario)?.nombre || sedeUsuario;

      // Filtrar por sede si no es tesoreriaGeneral
      const filtrados = esTesoreriaGeneral
        ? movs
        : movs.filter((m) => m.sede === sedeNombre);

      // Mostrar solo fondos de la sede del usuario
      const fondosFiltrados = esTesoreriaGeneral
        ? fondosData
        : fondosData.filter((f) => f.sede === sedeNombre);

      console.log(
        '[useMovimientos] Cargados:',
        filtrados.length, 'movs,',
        fondosFiltrados.length, 'fondos,',
        sedesData.length, 'sedes'
      );

      if (mounted.current) {
        setMovimientos(filtrados);
        setFondos(fondosFiltrados);
        setSedes(sedesData);
      }
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      const msg =
        err instanceof Error && err.message.includes('permission')
          ? '[useMovimientos] PERMISSION_DENIED: sin permisos para leer'
          : err instanceof Error && err.message.includes('network')
            ? '[useMovimientos] NETWORK_ERROR: sin conexión'
            : '[useMovimientos] ERROR_INESPERADO: ' + (err instanceof Error ? err.message : String(err));
      console.log(msg);
      if (mounted.current) setError(msg.replace(/^\[.*?\]\s*/, ''));
    } finally {
      if (mounted.current) setIsLoading(false);
    }
  }, [esTesoreriaGeneral, sedeUsuario]);

  // Carga inicial con spinner
  useEffect(() => {
    mounted.current = true;
    fetchAllData(true);
    return () => { mounted.current = false; };
  }, [fetchAllData]);

  // Refresco en segundo plano al enfocar la pantalla (sin spinner)
  useFocusEffect(
    useCallback(() => {
      // Pequeño retraso para evitar el spam de re-montajes
      const timer = setTimeout(() => {
        if (mounted.current) {
          fetchAllData(false);
        }
      }, 300);
      return () => clearTimeout(timer);
    }, [fetchAllData])
  );

  // ── Actualizar o crear fondo ──────────────────────────────

  const actualizarFondo = useCallback(async (sede: string, moneda: string, delta: number) => {
    const fondoExistente = fondos.find((f) => f.sede === sede && f.moneda === moneda);

    if (fondoExistente && fondoExistente.id) {
      const nuevoSaldo = (fondoExistente.saldo || 0) + delta;
      console.log(`[useMovimientos] Actualizando fondo ${sede}/${moneda}: ${fondoExistente.saldo} → ${nuevoSaldo}`);
      await updateDocument<Fondo>(COLLECTIONS.FONDOS, fondoExistente.id, {
        saldo: nuevoSaldo,
        ultimaActualizacion: new Date(),
      });
    } else {
      console.log(`[useMovimientos] Creando fondo ${sede}/${moneda}: saldo inicial = ${delta}`);
      await addDocument<Fondo>(COLLECTIONS.FONDOS, {
        sede,
        moneda: moneda as 'USD' | 'VES' | 'EUR',
        saldo: delta,
        ultimaActualizacion: new Date(),
      });
    }
  }, [fondos]);

  // ── Crear Avío ────────────────────────────────────────────

  const createAvio = useCallback(async (datos: {
    monto: number;
    moneda: string;
    tasaBCV: number;
    fechaTasa: Date;
    concepto: string;
    sede: string;
  }) => {
    logCampos('Creando avío:', datos as unknown as Record<string, unknown>);

    if (!uid) {
      console.log('[useMovimientos] AUTH_ERROR: uid vacío');
      throw new Error('Usuario no autenticado');
    }

    if (datos.monto <= 0) {
      console.log(`[useMovimientos] VALIDATION: monto inválido: ${datos.monto}`);
      throw new Error('El monto debe ser mayor a 0');
    }

    if (!datos.sede) {
      console.log('[useMovimientos] VALIDATION: sede vacía');
      throw new Error('Debe seleccionar una sede');
    }

    if (!datos.concepto.trim()) {
      console.log('[useMovimientos] VALIDATION: concepto vacío');
      throw new Error('El concepto es obligatorio');
    }

    const movimiento: Omit<MovimientoTesoreria, 'id'> = {
      tipo: 'avio',
      monto: datos.monto,
      moneda: datos.moneda as 'USD' | 'VES' | 'EUR',
      tasaBCV: datos.tasaBCV,
      fechaTasa: datos.fechaTasa,
      concepto: datos.concepto.trim(),
      sede: datos.sede,
      estado: 'aprobado',
      creadoPor: uid,
      creadoEn: new Date(),
    };

    logCampos('Avío a Firestore:', movimiento as unknown as Record<string, unknown>);

    try {
      await addDocument<MovimientoTesoreria>(COLLECTIONS.MOVIMIENTOS_TESORERIA, movimiento);
      console.log('[useMovimientos] Avío creado OK');
      await actualizarFondo(datos.sede, datos.moneda, datos.monto);
      console.log(`[useMovimientos] Fondo actualizado: +${datos.monto} ${datos.moneda}`);
      await fetchAllData();
    } catch (err: unknown) {
      const msg =
        err instanceof Error && err.message.includes('permission')
          ? '[useMovimientos] PERMISSION_DENIED: no se pudo crear avío'
          : '[useMovimientos] ERROR_CREAR_AVIO: ' + (err instanceof Error ? err.message : String(err));
      console.log(msg);
      throw err;
    }
  }, [uid, actualizarFondo, fetchAllData]);

  // ── Crear Retiro ──────────────────────────────────────────

  const createRetiro = useCallback(async (datos: {
    monto: number;
    moneda: string;
    tasaBCV: number;
    fechaTasa: Date;
    concepto: string;
    sede: string;
    avioRef?: string;
  }) => {
    logCampos('Creando retiro:', datos as unknown as Record<string, unknown>);

    if (!uid) {
      console.log('[useMovimientos] AUTH_ERROR: uid vacío');
      throw new Error('Usuario no autenticado');
    }

    if (datos.monto <= 0) {
      console.log(`[useMovimientos] VALIDATION: monto inválido: ${datos.monto}`);
      throw new Error('El monto debe ser mayor a 0');
    }

    if (!datos.sede) {
      console.log('[useMovimientos] VALIDATION: sede vacía');
      throw new Error('Debe seleccionar una sede');
    }

    if (!datos.concepto.trim()) {
      console.log('[useMovimientos] VALIDATION: concepto vacío');
      throw new Error('El concepto es obligatorio');
    }

    // Validate saldo
    const fondo = fondos.find((f) => f.sede === datos.sede && f.moneda === datos.moneda);
    const saldoDisponible = fondo?.saldo || 0;
    if (saldoDisponible < datos.monto) {
      console.log(`[useMovimientos] SALDO_INSUFICIENTE: disponible=${saldoDisponible}, requerido=${datos.monto}`);
      Alert.alert(
        'Saldo insuficiente',
        `Fondo ${datos.moneda} en ${datos.sede}: $${saldoDisponible.toFixed(2)} disponible, $${datos.monto.toFixed(2)} requerido.`
      );
      throw new Error(`Saldo insuficiente: $${saldoDisponible.toFixed(2)} disponible`);
    }

    // Validate avioRef if provided
    if (datos.avioRef) {
      const avioRefDoc = await fetchById<MovimientoTesoreria>(COLLECTIONS.MOVIMIENTOS_TESORERIA, datos.avioRef);
      if (!avioRefDoc) {
        console.log(`[useMovimientos] REFERENCIA_INVALIDA: avioRef ${datos.avioRef} no existe`);
        throw new Error('La referencia al avío no existe');
      }
      if (avioRefDoc.estado !== 'aprobado') {
        console.log(`[useMovimientos] REFERENCIA_INVALIDA: avioRef ${datos.avioRef} tiene estado "${avioRefDoc.estado}"`);
        throw new Error('El avío de referencia debe estar aprobado');
      }
    }

    const movimiento: Omit<MovimientoTesoreria, 'id'> = {
      tipo: 'retiro',
      monto: datos.monto,
      moneda: datos.moneda as 'USD' | 'VES' | 'EUR',
      tasaBCV: datos.tasaBCV,
      fechaTasa: datos.fechaTasa,
      concepto: datos.concepto.trim(),
      sede: datos.sede,
      estado: 'pendiente',
      avioRef: datos.avioRef,
      creadoPor: uid,
      creadoEn: new Date(),
    };

    logCampos('Retiro a Firestore:', movimiento as unknown as Record<string, unknown>);

    try {
      await addDocument<MovimientoTesoreria>(COLLECTIONS.MOVIMIENTOS_TESORERIA, movimiento);
      console.log('[useMovimientos] Retiro creado OK (pendiente)');
      await fetchAllData();
    } catch (err: unknown) {
      const msg =
        err instanceof Error && err.message.includes('permission')
          ? '[useMovimientos] PERMISSION_DENIED: no se pudo crear retiro'
          : '[useMovimientos] ERROR_CREAR_RETIRO: ' + (err instanceof Error ? err.message : String(err));
      console.log(msg);
      throw err;
    }
  }, [uid, fondos, fetchAllData]);

  // ── Aprobar Retiro ────────────────────────────────────────

  const approveRetiro = useCallback(async (movimientoId: string) => {
    console.log(`[useMovimientos] Aprobando retiro ${movimientoId}...`);

    const mov = await fetchById<MovimientoTesoreria>(COLLECTIONS.MOVIMIENTOS_TESORERIA, movimientoId);
    if (!mov) {
      console.log(`[useMovimientos] NO_ENCONTRADO: movimiento ${movimientoId} no existe`);
      throw new Error('Movimiento no encontrado');
    }
    if (mov.estado !== 'pendiente') {
      console.log(`[useMovimientos] ESTADO_INCORRECTO: movimiento ${movimientoId} tiene estado "${mov.estado}"`);
      throw new Error(`El movimiento ya fue ${mov.estado === 'aprobado' ? 'aprobado' : 'anulado'}`);
    }

    const fondo = fondos.find((f) => f.sede === mov.sede && f.moneda === mov.moneda);
    const saldoDisponible = fondo?.saldo || 0;
    if (saldoDisponible < mov.monto) {
      console.log(`[useMovimientos] SALDO_INSUFICIENTE: disponible=${saldoDisponible}, requerido=${mov.monto}`);
      Alert.alert('Saldo insuficiente', `Fondo ${mov.moneda}: $${saldoDisponible.toFixed(2)} disponible`);
      throw new Error('Saldo insuficiente');
    }

    try {
      await updateDocument<MovimientoTesoreria>(COLLECTIONS.MOVIMIENTOS_TESORERIA, movimientoId, {
        estado: 'aprobado',
        aprobadoPor: uid!,
        aprobadoEn: new Date(),
      });
      console.log('[useMovimientos] Retiro aprobado OK');
      await actualizarFondo(mov.sede, mov.moneda, -mov.monto);
      console.log(`[useMovimientos] Fondo actualizado: -${mov.monto} ${mov.moneda}`);
      await fetchAllData();
    } catch (err: unknown) {
      console.log('[useMovimientos] ERROR_APROBAR: ' + (err instanceof Error ? err.message : String(err)));
      throw err;
    }
  }, [uid, fondos, actualizarFondo, fetchAllData]);

  // ── Anular Movimiento ─────────────────────────────────────

  const anularMovimiento = useCallback(async (movimientoId: string) => {
    console.log(`[useMovimientos] Anulando movimiento ${movimientoId}...`);

    const mov = await fetchById<MovimientoTesoreria>(COLLECTIONS.MOVIMIENTOS_TESORERIA, movimientoId);
    if (!mov) {
      console.log(`[useMovimientos] NO_ENCONTRADO: movimiento ${movimientoId} no existe`);
      throw new Error('Movimiento no encontrado');
    }
    if (mov.estado === 'anulado') {
      console.log(`[useMovimientos] YA_ANULADO: movimiento ${movimientoId} ya está anulado`);
      throw new Error('El movimiento ya fue anulado');
    }

    try {
      await updateDocument<MovimientoTesoreria>(COLLECTIONS.MOVIMIENTOS_TESORERIA, movimientoId, {
        estado: 'anulado',
        anulaA: movimientoId,
      });
      console.log('[useMovimientos] Movimiento anulado OK');

      // Revertir efecto en el fondo
      const delta =
        mov.tipo === 'avio'
          ? -mov.monto // revertir avío
          : mov.estado === 'aprobado'
            ? mov.monto // revertir retiro aprobado (sumar de vuelta)
            : 0; // retiro pendiente nunca afectó el fondo

      if (delta !== 0) {
        await actualizarFondo(mov.sede, mov.moneda, delta);
        console.log(`[useMovimientos] Fondo revertido: ${delta > 0 ? '+' : ''}${delta} ${mov.moneda}`);
      }

      await fetchAllData();
    } catch (err: unknown) {
      console.log('[useMovimientos] ERROR_ANULAR: ' + (err instanceof Error ? err.message : String(err)));
      throw err;
    }
  }, [actualizarFondo, fetchAllData]);

  // ── Eliminar pendiente ────────────────────────────────────

  const eliminarPendiente = useCallback(async (movimientoId: string) => {
    console.log(`[useMovimientos] Eliminando movimiento pendiente ${movimientoId}...`);

    const mov = await fetchById<MovimientoTesoreria>(COLLECTIONS.MOVIMIENTOS_TESORERIA, movimientoId);
    if (!mov) throw new Error('Movimiento no encontrado');
    if (mov.estado !== 'pendiente') {
      console.log(`[useMovimientos] NO_ELIMINABLE: movimiento ${movimientoId} tiene estado "${mov.estado}"`);
      throw new Error('Solo se pueden eliminar movimientos pendientes');
    }

    try {
      await deleteDocument(COLLECTIONS.MOVIMIENTOS_TESORERIA, movimientoId);
      console.log('[useMovimientos] Movimiento pendiente eliminado OK');
      await fetchAllData();
    } catch (err: unknown) {
      console.log('[useMovimientos] ERROR_ELIMINAR: ' + (err instanceof Error ? err.message : String(err)));
      throw err;
    }
  }, [fetchAllData]);

  const retry = useCallback(async () => {
    console.log('[useMovimientos] Retry solicitado');
    await fetchAllData();
  }, [fetchAllData]);

  const getSaldoSede = useCallback((sede: string, moneda: string): number => {
    const fondo = fondos.find((f) => f.sede === sede && f.moneda === moneda);
    return fondo?.saldo || 0;
  }, [fondos]);

  /**
   * exportarMovimientosCSV — Exporta todos los movimientos de tesorería a un archivo CSV.
   * Columnas: ID, Tipo, Monto, Moneda, Tasa BCV, Concepto, Sede, Estado, Creado Por, Fecha
   */
  const exportarMovimientosCSV = useCallback(async () => {
    console.log('[useMovimientos] exportarCSV llamado');
    console.log('[useMovimientos] Exportando movimientos:', movimientos.length);

    const encabezados = ['ID', 'Tipo', 'Monto', 'Moneda', 'Tasa BCV', 'Concepto', 'Sede', 'Estado', 'Creado Por', 'Fecha'];
    const filas = movimientos.map((m) => [
      m.id || '',
      m.tipo,
      m.monto,
      m.moneda,
      m.tasaBCV,
      m.concepto,
      m.sede,
      m.estado,
      m.creadoPor,
      m.creadoEn instanceof Date ? m.creadoEn.toISOString() : String(m.creadoEn),
    ]);

    try {
      await exportarCSV('tesoreria.csv', encabezados, filas);
      console.log(`[useMovimientos] CSV exportado: ${filas.length} filas`);
    } catch (err) {
      console.log('[useMovimientos] Error exportando CSV:', err);
      throw err;
    }
  }, [movimientos]);

  return {
    movimientos,
    fondos,
    sedes,
    isLoading,
    error,
    createAvio,
    createRetiro,
    approveRetiro,
    anularMovimiento,
    eliminarPendiente,
    getSaldoSede,
    retry,
    exportarMovimientosCSV,
  };
}
