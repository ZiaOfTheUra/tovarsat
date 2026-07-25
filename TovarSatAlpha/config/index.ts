// ────────────────────────── Nombres de colecciones de Firestore ──────────────────────────
export const COLLECTIONS = {
  USUARIOS: 'usuarios',
  ASISTENCIAS: 'asistencias',
  INVENTARIO: 'inventario',
  OPERATIVOS: 'operativos',
  MOVIMIENTOS_TESORERIA: 'movimientosTesoreria',
  FONDOS: 'fondos',
  SEDES: 'sedes',
  TIPOS_EQUIPO: 'tiposEquipo',
  EQUIPOS: 'equipos',
  ENVIOS: 'envios',
  COMPANIAS: 'companias',
  CUADRILLAS: 'cuadrillas',
  EQUIPAMENTO: 'equipamento',
  EQUIPAMENTO_PRESTADO: 'equipamentoPrestado',
} as const;

// ────────────────────────── Matriz de permisos por rol ──────────────────────────
export const ROLES = {
  TESORERIA_GENERAL: 'tesoreriaGeneral',
  GERENCIA_LOCAL: 'gerenciaLocal',
  ALMACENISTA: 'almacenista',
  OFICINISTA: 'oficinista',
} as const;

// ────────────────────────── Estados de movimiento ──────────────────────────
export const MOVIMIENTO_ESTADOS = {
  PENDIENTE: 'pendiente',
  APROBADO: 'aprobado',
  ANULADO: 'anulado',
} as const;

export const MOVIMIENTO_TIPOS = {
  AVIO: 'avio',
  RETIRO: 'retiro',
} as const;

// ────────────────────────── Monedas ──────────────────────────
export const MONEDAS = ['USD', 'VES', 'EUR'] as const;