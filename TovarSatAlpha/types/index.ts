import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type Timestamp = FirebaseFirestoreTypes.Timestamp;

// ────────────────────────── Enums y literales ──────────────────────────
export type Rol =
  | 'tesoreriaGeneral'
  | 'gerenciaLocal'
  | 'almacenista'
  | 'oficinista';

export type EstadoMovimiento =
  | 'pendiente'
  | 'aprobado'
  | 'anulado';

export type TipoMovimiento =
  | 'avio'
  | 'retiro';

export type MetodoMarcaje =
  | 'manual'
  | 'kiosco'
  | 'biometrico_excel';

export type Moneda =
  | 'USD'
  | 'VES'
  | 'EUR';

// ────────────────────────── Documentos de Firestore ──────────────────────────
export interface Usuario {
  id?: string;
  uid: string;
  nombre: string;
  email: string;
  rol: Rol;
  sede: string;
  sedeNombre?: string;
  activo: boolean;
}

export interface Asistencia {
  id?: string;
  uid: string;
  fechaEntrada: Timestamp | Date;
  fechaSalida?: Timestamp | Date | null;
  horas?: number;
  metodoMarcaje: MetodoMarcaje;
  registradoPorKiosco: boolean;
}

export interface Inventario {
  id?: string;
  item: string;
  cantidad: number;
  sede: string;
  estado: string;
  creadoPor: string;
  creadoEn: Timestamp | Date;
}

export interface Operativo {
  id?: string;
  tipo: string;
  sedeOrigen: string;
  sedeDestino: string;
  descripcion: string;
  activoRef?: string;
  responsable: string;
  creadoPor: string;
  creadoEn: Timestamp | Date;
}

export interface MovimientoTesoreria {
  id?: string;
  tipo: TipoMovimiento;
  monto: number;
  moneda: Moneda;
  tasaBCV: number;
  fechaTasa: Timestamp | Date;
  concepto: string;
  sede: string;
  estado: EstadoMovimiento;
  avioRef?: string;
  creadoPor: string;
  creadoEn: Timestamp | Date;
  aprobadoPor?: string;
  aprobadoEn?: Timestamp | Date;
  anulaA?: string;
}

export interface Fondo {
  id?: string;
  sede: string;
  saldo: number;
  moneda: Moneda;
  ultimaActualizacion: Timestamp | Date;
}

// ────────────────────────── Modelo extendido (desde schema.gql) ──────────────────────────
export interface Sede {
  id?: string;
  nombre: string;
  direccion: string;
  telefono?: string;
  contacto?: string;
}

export interface TipoEquipo {
  id?: string;
  nombreTipo: string;
  descripcion?: string;
  anchoBanda?: string;
  canales?: number;
  tecnologiaRelevante?: string;
  datosVarios?: string;
  modelo: string;
}

export interface EquipoInventario {
  id?: string;
  tipoEquipoModelo?: string;
  modelo: string;
  nombreDescriptivo: string;
  valor: number;
  cantidadDisponible: number;
  serial: string;
  estado: string;
  ubicacionActual?: string;
}

export interface EnvioEquipo {
  id?: string;
  gerenciaEncargada?: string;
  gerenciaReceptora?: string;
  sedeDestino?: string;
  sedeOrigen?: string;
  tipoEnvio: string;
  fechaEnvio: Timestamp | Date;
  descripcionGeneral?: string;
  fechaRecepcion?: Timestamp | Date;
}

export interface CompaniaContratista {
  id?: string;
  nombre: string;
  rif?: string;
  telefonoContacto?: string;
}

export interface Cuadrilla {
  id?: string;
  nombreIdentificador: string;
  tamanoAproximado?: number;
  companiaContratista?: string;
}

export interface Equipamento {
  id?: string;
  nombre: string;
  descripcion?: string;
  datosVarios?: string;
  modelo?: string;
}

export interface EquipamentoPrestado {
  id?: string;
  companiaPrestada?: string;
  equipamento?: string;
  fechaInicio: Timestamp | Date;
  fechaDevolucion?: Timestamp | Date;
}

// ────────────────────────── Estado de autenticación ──────────────────────────
export interface AuthState {
  user: Usuario | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: string | null;
}