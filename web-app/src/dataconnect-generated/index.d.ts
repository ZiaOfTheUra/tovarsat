import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface ActualizarAsistenciaData {
  asistencia_update?: Asistencia_Key | null;
}

export interface ActualizarAsistenciaVariables {
  id: UUIDString;
  horaSalidaManana: TimestampString;
  horaEntradaTarde?: TimestampString | null;
  horaSalidaTarde?: TimestampString | null;
}

export interface ActualizarCompaniaContratistaData {
  companiaContratista_update?: CompaniaContratista_Key | null;
}

export interface ActualizarCompaniaContratistaVariables {
  id: UUIDString;
  nombre: string;
  telefonoContacto?: string | null;
}

export interface ActualizarCuadrillaData {
  cuadrilla_update?: Cuadrilla_Key | null;
}

export interface ActualizarCuadrillaVariables {
  id: UUIDString;
  nombreIdentificador: string;
  tamanoAproximado?: number | null;
}

export interface ActualizarEquipamentoData {
  equipamento_update?: Equipamento_Key | null;
}

export interface ActualizarEquipamentoVariables {
  id: UUIDString;
  nombre: string;
  descripcion?: string | null;
}

export interface ActualizarEquipoInventarioData {
  equipoInventario_update?: EquipoInventario_Key | null;
}

export interface ActualizarEquipoInventarioVariables {
  id: UUIDString;
  nombreDescriptivo: string;
  valor: number;
  cantidadDisponible: number;
  estado: string;
  ubicacionActualId: UUIDString;
}

export interface ActualizarFondoData {
  fondo_update?: Fondo_Key | null;
}

export interface ActualizarFondoVariables {
  id: UUIDString;
  saldo: number;
  moneda: string;
}

export interface ActualizarMiPerfilData {
  usuario_update?: Usuario_Key | null;
}

export interface ActualizarMiPerfilVariables {
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
}

export interface ActualizarSedeData {
  sede_update?: Sede_Key | null;
}

export interface ActualizarSedeVariables {
  id: UUIDString;
  nombre: string;
  direccion: string;
  telefono?: string | null;
  contacto?: string | null;
}

export interface ActualizarTipoEquipoData {
  tipoEquipo_update?: TipoEquipo_Key | null;
}

export interface ActualizarTipoEquipoVariables {
  id: UUIDString;
  nombreTipo: string;
  descripcion?: string | null;
  anchoBanda?: string | null;
  canales?: number | null;
}

export interface AnularMovimientoTesoreriaData {
  movimientoTesoreria_update?: MovimientoTesoreria_Key | null;
}

export interface AnularMovimientoTesoreriaVariables {
  id: UUIDString;
  anulaAId: UUIDString;
}

export interface AprobarMovimientoTesoreriaData {
  movimientoTesoreria_update?: MovimientoTesoreria_Key | null;
}

export interface AprobarMovimientoTesoreriaVariables {
  id: UUIDString;
  aprobadoPorId: UUIDString;
}

export interface Asistencia_Key {
  id: UUIDString;
  __typename?: 'Asistencia_Key';
}

export interface CompaniaContratista_Key {
  id: UUIDString;
  __typename?: 'CompaniaContratista_Key';
}

export interface CrearCompaniaContratistaData {
  companiaContratista_insert: CompaniaContratista_Key;
}

export interface CrearCompaniaContratistaVariables {
  nombre: string;
  rif?: string | null;
  telefonoContacto?: string | null;
}

export interface CrearCuadrillaData {
  cuadrilla_insert: Cuadrilla_Key;
}

export interface CrearCuadrillaVariables {
  nombreIdentificador: string;
  tamanoAproximado?: number | null;
  companiaContratistaId: UUIDString;
}

export interface CrearEnvioEquipoData {
  envioEquipo_insert: EnvioEquipo_Key;
}

export interface CrearEnvioEquipoVariables {
  gerenciaEncargadaId: UUIDString;
  gerenciaReceptoraId: UUIDString;
  sedeDestinoId: UUIDString;
  sedeOrigenId: UUIDString;
  tipoEnvio: string;
  fechaEnvio: DateString;
  descripcionGeneral?: string | null;
}

export interface CrearEquipamentoData {
  equipamento_insert: Equipamento_Key;
}

export interface CrearEquipamentoVariables {
  nombre: string;
  descripcion?: string | null;
  datosVarios?: string | null;
  modelo?: string | null;
}

export interface CrearEquipoInventarioData {
  equipoInventario_insert: EquipoInventario_Key;
}

export interface CrearEquipoInventarioVariables {
  tipoEquipoModelo: TipoEquipo_Key;
  modelo: string;
  nombreDescriptivo: string;
  valor: number;
  cantidadDisponible: number;
  serial: string;
  estado: string;
  ubicacionActualId: UUIDString;
}

export interface CrearFondoData {
  fondo_insert: Fondo_Key;
}

export interface CrearFondoVariables {
  sedeId: UUIDString;
  saldo: number;
  moneda: string;
}

export interface CrearMovimientoTesoreriaData {
  movimientoTesoreria_insert: MovimientoTesoreria_Key;
}

export interface CrearMovimientoTesoreriaVariables {
  tipo: string;
  monto: number;
  moneda: string;
  tasaBCV: number;
  fechaTasa: DateString;
  concepto: string;
  sedeId: UUIDString;
  creadoPorId: UUIDString;
  avioRefId?: UUIDString | null;
}

export interface CrearSedeData {
  sede_insert: Sede_Key;
}

export interface CrearSedeVariables {
  nombre: string;
  direccion: string;
  telefono?: string | null;
  contacto?: string | null;
}

export interface CrearTipoEquipoData {
  tipoEquipo_insert: TipoEquipo_Key;
}

export interface CrearTipoEquipoVariables {
  nombreTipo: string;
  modelo: string;
  descripcion?: string | null;
  anchoBanda?: string | null;
  canales?: number | null;
  tecnologiaRelevante?: string | null;
  datosVarios?: string | null;
}

export interface CrearUsuarioData {
  usuario_insert: Usuario_Key;
}

export interface CrearUsuarioVariables {
  nombre: string;
  apellido: string;
  cedula: string;
  fechaNacimiento: DateString;
  cargo: string;
  nivelAdministrativo: string;
  hashBiometrico: string;
  permisosDB?: string | null;
  email: string;
  rol: string;
  sedeId: UUIDString;
  activo: boolean;
}

export interface Cuadrilla_Key {
  id: UUIDString;
  __typename?: 'Cuadrilla_Key';
}

export interface DevolverEquipamentoData {
  equipamentoPrestado_update?: EquipamentoPrestado_Key | null;
}

export interface DevolverEquipamentoVariables {
  id: UUIDString;
  fechaDevolucion: DateString;
}

export interface EliminarAsistenciaData {
  asistencia_delete?: Asistencia_Key | null;
}

export interface EliminarAsistenciaVariables {
  id: UUIDString;
}

export interface EliminarCompaniaContratistaData {
  companiaContratista_delete?: CompaniaContratista_Key | null;
}

export interface EliminarCompaniaContratistaVariables {
  id: UUIDString;
}

export interface EliminarCuadrillaData {
  cuadrilla_delete?: Cuadrilla_Key | null;
}

export interface EliminarCuadrillaVariables {
  id: UUIDString;
}

export interface EliminarEnvioEquipoData {
  envioEquipo_delete?: EnvioEquipo_Key | null;
}

export interface EliminarEnvioEquipoVariables {
  id: UUIDString;
}

export interface EliminarEquipamentoData {
  equipamento_delete?: Equipamento_Key | null;
}

export interface EliminarEquipamentoPrestadoData {
  equipamentoPrestado_delete?: EquipamentoPrestado_Key | null;
}

export interface EliminarEquipamentoPrestadoVariables {
  id: UUIDString;
}

export interface EliminarEquipamentoVariables {
  id: UUIDString;
}

export interface EliminarEquipoInventarioData {
  equipoInventario_delete?: EquipoInventario_Key | null;
}

export interface EliminarEquipoInventarioVariables {
  id: UUIDString;
}

export interface EliminarFondoData {
  fondo_delete?: Fondo_Key | null;
}

export interface EliminarFondoVariables {
  id: UUIDString;
}

export interface EliminarMovimientoTesoreriaData {
  movimientoTesoreria_delete?: MovimientoTesoreria_Key | null;
}

export interface EliminarMovimientoTesoreriaVariables {
  id: UUIDString;
}

export interface EliminarSedeData {
  sede_delete?: Sede_Key | null;
}

export interface EliminarSedeVariables {
  id: UUIDString;
}

export interface EliminarTipoEquipoData {
  tipoEquipo_delete?: TipoEquipo_Key | null;
}

export interface EliminarTipoEquipoVariables {
  id: UUIDString;
}

export interface EliminarUsuarioData {
  usuario_delete?: Usuario_Key | null;
}

export interface EliminarUsuarioVariables {
  id: UUIDString;
}

export interface EnvioEquipo_Key {
  id: UUIDString;
  __typename?: 'EnvioEquipo_Key';
}

export interface EquipamentoPrestado_Key {
  id: UUIDString;
  __typename?: 'EquipamentoPrestado_Key';
}

export interface Equipamento_Key {
  id: UUIDString;
  __typename?: 'Equipamento_Key';
}

export interface EquipoInventario_Key {
  id: UUIDString;
  __typename?: 'EquipoInventario_Key';
}

export interface Fondo_Key {
  id: UUIDString;
  __typename?: 'Fondo_Key';
}

export interface ListarCompaniasContratistasData {
  companiaContratistas: ({
    id: UUIDString;
    nombre: string;
    rif?: string | null;
    telefonoContacto?: string | null;
  } & CompaniaContratista_Key)[];
}

export interface ListarCuadrillasPorContratistaData {
  companiaContratista?: {
    id: UUIDString;
    nombre: string;
    cuadrillas: ({
      id: UUIDString;
      nombreIdentificador: string;
      tamanoAproximado?: number | null;
    } & Cuadrilla_Key)[];
  } & CompaniaContratista_Key;
}

export interface ListarCuadrillasPorContratistaVariables {
  companiaId: UUIDString;
}

export interface ListarEnviosEquipoData {
  envioEquipos: ({
    id: UUIDString;
    tipoEnvio: string;
    fechaEnvio: DateString;
    descripcionGeneral?: string | null;
    fechaRecepcion?: DateString | null;
    encargado?: {
      nombre: string;
      apellido: string;
      cargo: string;
    };
    receptor?: {
      nombre: string;
      apellido: string;
      cargo: string;
    };
    origen?: {
      nombre: string;
      direccion: string;
    };
    destino?: {
      nombre: string;
      direccion: string;
    };
  } & EnvioEquipo_Key)[];
}

export interface ListarEquipamentosPrestadosData {
  equipamentoPrestados: ({
    id: UUIDString;
    fechaInicio: DateString;
    fechaDevolucion?: DateString | null;
    compania?: {
      nombre: string;
      rif?: string | null;
      telefonoContacto?: string | null;
    };
    equipamento?: {
      nombre: string;
      descripcion?: string | null;
      modelo?: string | null;
    };
  } & EquipamentoPrestado_Key)[];
}

export interface ListarEquiposInventarioData {
  equipoInventarios: ({
    id: UUIDString;
    modelo: string;
    nombreDescriptivo: string;
    valor: number;
    cantidadDisponible: number;
    serial: string;
    estado: string;
    tipoEquipo?: {
      nombreTipo: string;
      modelo: string;
      tecnologiaRelevante?: string | null;
    };
    ubicacion?: {
      nombre: string;
      direccion: string;
    };
  } & EquipoInventario_Key)[];
}

export interface ListarFondosData {
  fondos: ({
    sede: {
      id: UUIDString;
      nombre: string;
    } & Sede_Key;
    saldo: number;
    moneda: string;
    ultimaActualizacion: TimestampString;
  })[];
}

export interface ListarMisAsistenciasData {
  usuario?: {
    id: UUIDString;
    nombre: string;
    apellido: string;
    cedula: string;
    cargo: string;
    asistencias: ({
      fecha: DateString;
      horaEntradaManana: TimestampString;
      horaSalidaManana: TimestampString;
      horaEntradaTarde?: TimestampString | null;
      horaSalidaTarde?: TimestampString | null;
    })[];
  } & Usuario_Key;
}

export interface ListarMovimientosTesoreriaData {
  movimientoTesorerias: ({
    id: UUIDString;
    tipo: string;
    monto: number;
    moneda: string;
    tasaBCV: number;
    fechaTasa: DateString;
    concepto: string;
    estado: string;
    creadoEn: TimestampString;
    aprobadoEn?: TimestampString | null;
    sede?: {
      id: UUIDString;
      nombre: string;
    } & Sede_Key;
    creador?: {
      id: UUIDString;
      nombre: string;
      apellido: string;
      email: string;
      rol: string;
    } & Usuario_Key;
    aprobador?: {
      id: UUIDString;
      nombre: string;
      apellido: string;
      email: string;
      rol: string;
    } & Usuario_Key;
    avioRefId?: UUIDString | null;
    anulaAId?: UUIDString | null;
  } & MovimientoTesoreria_Key)[];
}

export interface ListarSedesData {
  sedes: ({
    id: UUIDString;
    nombre: string;
    direccion: string;
    telefono?: string | null;
    contacto?: string | null;
  } & Sede_Key)[];
}

export interface ListarTiposEquipoData {
  tipoEquipos: ({
    id: UUIDString;
    nombreTipo: string;
    descripcion?: string | null;
    modelo: string;
    anchoBanda?: string | null;
    canales?: number | null;
    tecnologiaRelevante?: string | null;
  } & TipoEquipo_Key)[];
}

export interface ListarUsuariosData {
  usuarios: ({
    id: UUIDString;
    nombre: string;
    apellido: string;
    cedula: string;
    fechaNacimiento: DateString;
    cargo: string;
    nivelAdministrativo: string;
    hashBiometrico: string;
    permisosDB?: string | null;
    email: string;
    rol: string;
    activo: boolean;
    sede?: {
      id: UUIDString;
      nombre: string;
    } & Sede_Key;
  } & Usuario_Key)[];
}

export interface MovimientoTesoreria_Key {
  id: UUIDString;
  __typename?: 'MovimientoTesoreria_Key';
}

export interface ObtenerEnvioPorIdData {
  envioEquipo?: {
    id: UUIDString;
    tipoEnvio: string;
    fechaEnvio: DateString;
    descripcionGeneral?: string | null;
    fechaRecepcion?: DateString | null;
    encargado?: {
      id: UUIDString;
      nombre: string;
      apellido: string;
      cedula: string;
      cargo: string;
    } & Usuario_Key;
    receptor?: {
      id: UUIDString;
      nombre: string;
      apellido: string;
      cedula: string;
      cargo: string;
    } & Usuario_Key;
    origen?: {
      id: UUIDString;
      nombre: string;
      direccion: string;
      telefono?: string | null;
    } & Sede_Key;
    destino?: {
      id: UUIDString;
      nombre: string;
      direccion: string;
      telefono?: string | null;
    } & Sede_Key;
  } & EnvioEquipo_Key;
}

export interface ObtenerEnvioPorIdVariables {
  id: UUIDString;
}

export interface ObtenerEquipoPorIdData {
  equipoInventario?: {
    id: UUIDString;
    modelo: string;
    nombreDescriptivo: string;
    valor: number;
    cantidadDisponible: number;
    serial: string;
    estado: string;
    tipoEquipo?: {
      nombreTipo: string;
      descripcion?: string | null;
      modelo: string;
      anchoBanda?: string | null;
      canales?: number | null;
      tecnologiaRelevante?: string | null;
    };
    ubicacion?: {
      nombre: string;
      direccion: string;
      telefono?: string | null;
    };
  } & EquipoInventario_Key;
}

export interface ObtenerEquipoPorIdVariables {
  id: UUIDString;
}

export interface ObtenerFondoPorSedeData {
  sede?: {
    id: UUIDString;
    nombre: string;
    fondo: ({
      id: UUIDString;
      saldo: number;
      moneda: string;
      ultimaActualizacion: TimestampString;
    } & Fondo_Key)[];
  } & Sede_Key;
}

export interface ObtenerFondoPorSedeVariables {
  sedeId: UUIDString;
}

export interface ObtenerMovimientoPorIdData {
  movimientoTesoreria?: {
    id: UUIDString;
    tipo: string;
    monto: number;
    moneda: string;
    tasaBCV: number;
    fechaTasa: DateString;
    concepto: string;
    estado: string;
    creadoEn: TimestampString;
    aprobadoEn?: TimestampString | null;
    sede?: {
      id: UUIDString;
      nombre: string;
      direccion: string;
    } & Sede_Key;
    creador?: {
      id: UUIDString;
      nombre: string;
      apellido: string;
      email: string;
      rol: string;
    } & Usuario_Key;
    aprobador?: {
      id: UUIDString;
      nombre: string;
      apellido: string;
      email: string;
      rol: string;
    } & Usuario_Key;
    avioRefId?: UUIDString | null;
    anulaAId?: UUIDString | null;
  } & MovimientoTesoreria_Key;
}

export interface ObtenerMovimientoPorIdVariables {
  id: UUIDString;
}

export interface ObtenerUsuarioPorIdData {
  usuario?: {
    id: UUIDString;
    nombre: string;
    apellido: string;
    cedula: string;
    fechaNacimiento: DateString;
    cargo: string;
    nivelAdministrativo: string;
    hashBiometrico: string;
    permisosDB?: string | null;
    email: string;
    rol: string;
    activo: boolean;
    sede?: {
      id: UUIDString;
      nombre: string;
      direccion: string;
    } & Sede_Key;
    asistencias: ({
      fecha: DateString;
      horaEntradaManana: TimestampString;
      horaSalidaManana: TimestampString;
      horaEntradaTarde?: TimestampString | null;
      horaSalidaTarde?: TimestampString | null;
    })[];
  } & Usuario_Key;
}

export interface ObtenerUsuarioPorIdVariables {
  id: UUIDString;
}

export interface PrestarEquipamentoData {
  equipamentoPrestado_insert: EquipamentoPrestado_Key;
}

export interface PrestarEquipamentoVariables {
  companiaPrestadaId: UUIDString;
  equipamentoId: UUIDString;
  fechaInicio: DateString;
}

export interface RecepcionarEnvioData {
  envioEquipo_update?: EnvioEquipo_Key | null;
}

export interface RecepcionarEnvioVariables {
  id: UUIDString;
  fechaRecepcion: DateString;
}

export interface RegistrarAsistenciaData {
  asistencia_insert: Asistencia_Key;
}

export interface RegistrarAsistenciaVariables {
  usuarioId: UUIDString;
  fecha: DateString;
  horaEntradaManana: TimestampString;
  horaSalidaManana: TimestampString;
  horaEntradaTarde?: TimestampString | null;
  horaSalidaTarde?: TimestampString | null;
}

export interface RegistrarEntradaMananaData {
  asistencia_insert: Asistencia_Key;
}

export interface RegistrarEntradaMananaVariables {
  horaEntrada: TimestampString;
  horaSalidaManana: TimestampString;
}

export interface Sede_Key {
  id: UUIDString;
  __typename?: 'Sede_Key';
}

export interface TipoEquipo_Key {
  id: UUIDString;
  __typename?: 'TipoEquipo_Key';
}

export interface Usuario_Key {
  id: UUIDString;
  __typename?: 'Usuario_Key';
}

interface CrearUsuarioRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CrearUsuarioVariables): MutationRef<CrearUsuarioData, CrearUsuarioVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CrearUsuarioVariables): MutationRef<CrearUsuarioData, CrearUsuarioVariables>;
  operationName: string;
}
export const crearUsuarioRef: CrearUsuarioRef;

export function crearUsuario(vars: CrearUsuarioVariables): MutationPromise<CrearUsuarioData, CrearUsuarioVariables>;
export function crearUsuario(dc: DataConnect, vars: CrearUsuarioVariables): MutationPromise<CrearUsuarioData, CrearUsuarioVariables>;

interface ActualizarMiPerfilRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ActualizarMiPerfilVariables): MutationRef<ActualizarMiPerfilData, ActualizarMiPerfilVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ActualizarMiPerfilVariables): MutationRef<ActualizarMiPerfilData, ActualizarMiPerfilVariables>;
  operationName: string;
}
export const actualizarMiPerfilRef: ActualizarMiPerfilRef;

export function actualizarMiPerfil(vars: ActualizarMiPerfilVariables): MutationPromise<ActualizarMiPerfilData, ActualizarMiPerfilVariables>;
export function actualizarMiPerfil(dc: DataConnect, vars: ActualizarMiPerfilVariables): MutationPromise<ActualizarMiPerfilData, ActualizarMiPerfilVariables>;

interface EliminarUsuarioRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarUsuarioVariables): MutationRef<EliminarUsuarioData, EliminarUsuarioVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EliminarUsuarioVariables): MutationRef<EliminarUsuarioData, EliminarUsuarioVariables>;
  operationName: string;
}
export const eliminarUsuarioRef: EliminarUsuarioRef;

export function eliminarUsuario(vars: EliminarUsuarioVariables): MutationPromise<EliminarUsuarioData, EliminarUsuarioVariables>;
export function eliminarUsuario(dc: DataConnect, vars: EliminarUsuarioVariables): MutationPromise<EliminarUsuarioData, EliminarUsuarioVariables>;

interface CrearSedeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CrearSedeVariables): MutationRef<CrearSedeData, CrearSedeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CrearSedeVariables): MutationRef<CrearSedeData, CrearSedeVariables>;
  operationName: string;
}
export const crearSedeRef: CrearSedeRef;

export function crearSede(vars: CrearSedeVariables): MutationPromise<CrearSedeData, CrearSedeVariables>;
export function crearSede(dc: DataConnect, vars: CrearSedeVariables): MutationPromise<CrearSedeData, CrearSedeVariables>;

interface ActualizarSedeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ActualizarSedeVariables): MutationRef<ActualizarSedeData, ActualizarSedeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ActualizarSedeVariables): MutationRef<ActualizarSedeData, ActualizarSedeVariables>;
  operationName: string;
}
export const actualizarSedeRef: ActualizarSedeRef;

export function actualizarSede(vars: ActualizarSedeVariables): MutationPromise<ActualizarSedeData, ActualizarSedeVariables>;
export function actualizarSede(dc: DataConnect, vars: ActualizarSedeVariables): MutationPromise<ActualizarSedeData, ActualizarSedeVariables>;

interface EliminarSedeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarSedeVariables): MutationRef<EliminarSedeData, EliminarSedeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EliminarSedeVariables): MutationRef<EliminarSedeData, EliminarSedeVariables>;
  operationName: string;
}
export const eliminarSedeRef: EliminarSedeRef;

export function eliminarSede(vars: EliminarSedeVariables): MutationPromise<EliminarSedeData, EliminarSedeVariables>;
export function eliminarSede(dc: DataConnect, vars: EliminarSedeVariables): MutationPromise<EliminarSedeData, EliminarSedeVariables>;

interface CrearTipoEquipoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CrearTipoEquipoVariables): MutationRef<CrearTipoEquipoData, CrearTipoEquipoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CrearTipoEquipoVariables): MutationRef<CrearTipoEquipoData, CrearTipoEquipoVariables>;
  operationName: string;
}
export const crearTipoEquipoRef: CrearTipoEquipoRef;

export function crearTipoEquipo(vars: CrearTipoEquipoVariables): MutationPromise<CrearTipoEquipoData, CrearTipoEquipoVariables>;
export function crearTipoEquipo(dc: DataConnect, vars: CrearTipoEquipoVariables): MutationPromise<CrearTipoEquipoData, CrearTipoEquipoVariables>;

interface ActualizarTipoEquipoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ActualizarTipoEquipoVariables): MutationRef<ActualizarTipoEquipoData, ActualizarTipoEquipoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ActualizarTipoEquipoVariables): MutationRef<ActualizarTipoEquipoData, ActualizarTipoEquipoVariables>;
  operationName: string;
}
export const actualizarTipoEquipoRef: ActualizarTipoEquipoRef;

export function actualizarTipoEquipo(vars: ActualizarTipoEquipoVariables): MutationPromise<ActualizarTipoEquipoData, ActualizarTipoEquipoVariables>;
export function actualizarTipoEquipo(dc: DataConnect, vars: ActualizarTipoEquipoVariables): MutationPromise<ActualizarTipoEquipoData, ActualizarTipoEquipoVariables>;

interface EliminarTipoEquipoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarTipoEquipoVariables): MutationRef<EliminarTipoEquipoData, EliminarTipoEquipoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EliminarTipoEquipoVariables): MutationRef<EliminarTipoEquipoData, EliminarTipoEquipoVariables>;
  operationName: string;
}
export const eliminarTipoEquipoRef: EliminarTipoEquipoRef;

export function eliminarTipoEquipo(vars: EliminarTipoEquipoVariables): MutationPromise<EliminarTipoEquipoData, EliminarTipoEquipoVariables>;
export function eliminarTipoEquipo(dc: DataConnect, vars: EliminarTipoEquipoVariables): MutationPromise<EliminarTipoEquipoData, EliminarTipoEquipoVariables>;

interface CrearEquipoInventarioRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CrearEquipoInventarioVariables): MutationRef<CrearEquipoInventarioData, CrearEquipoInventarioVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CrearEquipoInventarioVariables): MutationRef<CrearEquipoInventarioData, CrearEquipoInventarioVariables>;
  operationName: string;
}
export const crearEquipoInventarioRef: CrearEquipoInventarioRef;

export function crearEquipoInventario(vars: CrearEquipoInventarioVariables): MutationPromise<CrearEquipoInventarioData, CrearEquipoInventarioVariables>;
export function crearEquipoInventario(dc: DataConnect, vars: CrearEquipoInventarioVariables): MutationPromise<CrearEquipoInventarioData, CrearEquipoInventarioVariables>;

interface ActualizarEquipoInventarioRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ActualizarEquipoInventarioVariables): MutationRef<ActualizarEquipoInventarioData, ActualizarEquipoInventarioVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ActualizarEquipoInventarioVariables): MutationRef<ActualizarEquipoInventarioData, ActualizarEquipoInventarioVariables>;
  operationName: string;
}
export const actualizarEquipoInventarioRef: ActualizarEquipoInventarioRef;

export function actualizarEquipoInventario(vars: ActualizarEquipoInventarioVariables): MutationPromise<ActualizarEquipoInventarioData, ActualizarEquipoInventarioVariables>;
export function actualizarEquipoInventario(dc: DataConnect, vars: ActualizarEquipoInventarioVariables): MutationPromise<ActualizarEquipoInventarioData, ActualizarEquipoInventarioVariables>;

interface EliminarEquipoInventarioRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarEquipoInventarioVariables): MutationRef<EliminarEquipoInventarioData, EliminarEquipoInventarioVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EliminarEquipoInventarioVariables): MutationRef<EliminarEquipoInventarioData, EliminarEquipoInventarioVariables>;
  operationName: string;
}
export const eliminarEquipoInventarioRef: EliminarEquipoInventarioRef;

export function eliminarEquipoInventario(vars: EliminarEquipoInventarioVariables): MutationPromise<EliminarEquipoInventarioData, EliminarEquipoInventarioVariables>;
export function eliminarEquipoInventario(dc: DataConnect, vars: EliminarEquipoInventarioVariables): MutationPromise<EliminarEquipoInventarioData, EliminarEquipoInventarioVariables>;

interface CrearEnvioEquipoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CrearEnvioEquipoVariables): MutationRef<CrearEnvioEquipoData, CrearEnvioEquipoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CrearEnvioEquipoVariables): MutationRef<CrearEnvioEquipoData, CrearEnvioEquipoVariables>;
  operationName: string;
}
export const crearEnvioEquipoRef: CrearEnvioEquipoRef;

export function crearEnvioEquipo(vars: CrearEnvioEquipoVariables): MutationPromise<CrearEnvioEquipoData, CrearEnvioEquipoVariables>;
export function crearEnvioEquipo(dc: DataConnect, vars: CrearEnvioEquipoVariables): MutationPromise<CrearEnvioEquipoData, CrearEnvioEquipoVariables>;

interface RecepcionarEnvioRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecepcionarEnvioVariables): MutationRef<RecepcionarEnvioData, RecepcionarEnvioVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecepcionarEnvioVariables): MutationRef<RecepcionarEnvioData, RecepcionarEnvioVariables>;
  operationName: string;
}
export const recepcionarEnvioRef: RecepcionarEnvioRef;

export function recepcionarEnvio(vars: RecepcionarEnvioVariables): MutationPromise<RecepcionarEnvioData, RecepcionarEnvioVariables>;
export function recepcionarEnvio(dc: DataConnect, vars: RecepcionarEnvioVariables): MutationPromise<RecepcionarEnvioData, RecepcionarEnvioVariables>;

interface EliminarEnvioEquipoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarEnvioEquipoVariables): MutationRef<EliminarEnvioEquipoData, EliminarEnvioEquipoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EliminarEnvioEquipoVariables): MutationRef<EliminarEnvioEquipoData, EliminarEnvioEquipoVariables>;
  operationName: string;
}
export const eliminarEnvioEquipoRef: EliminarEnvioEquipoRef;

export function eliminarEnvioEquipo(vars: EliminarEnvioEquipoVariables): MutationPromise<EliminarEnvioEquipoData, EliminarEnvioEquipoVariables>;
export function eliminarEnvioEquipo(dc: DataConnect, vars: EliminarEnvioEquipoVariables): MutationPromise<EliminarEnvioEquipoData, EliminarEnvioEquipoVariables>;

interface RegistrarAsistenciaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegistrarAsistenciaVariables): MutationRef<RegistrarAsistenciaData, RegistrarAsistenciaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RegistrarAsistenciaVariables): MutationRef<RegistrarAsistenciaData, RegistrarAsistenciaVariables>;
  operationName: string;
}
export const registrarAsistenciaRef: RegistrarAsistenciaRef;

export function registrarAsistencia(vars: RegistrarAsistenciaVariables): MutationPromise<RegistrarAsistenciaData, RegistrarAsistenciaVariables>;
export function registrarAsistencia(dc: DataConnect, vars: RegistrarAsistenciaVariables): MutationPromise<RegistrarAsistenciaData, RegistrarAsistenciaVariables>;

interface RegistrarEntradaMananaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegistrarEntradaMananaVariables): MutationRef<RegistrarEntradaMananaData, RegistrarEntradaMananaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RegistrarEntradaMananaVariables): MutationRef<RegistrarEntradaMananaData, RegistrarEntradaMananaVariables>;
  operationName: string;
}
export const registrarEntradaMananaRef: RegistrarEntradaMananaRef;

export function registrarEntradaManana(vars: RegistrarEntradaMananaVariables): MutationPromise<RegistrarEntradaMananaData, RegistrarEntradaMananaVariables>;
export function registrarEntradaManana(dc: DataConnect, vars: RegistrarEntradaMananaVariables): MutationPromise<RegistrarEntradaMananaData, RegistrarEntradaMananaVariables>;

interface ActualizarAsistenciaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ActualizarAsistenciaVariables): MutationRef<ActualizarAsistenciaData, ActualizarAsistenciaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ActualizarAsistenciaVariables): MutationRef<ActualizarAsistenciaData, ActualizarAsistenciaVariables>;
  operationName: string;
}
export const actualizarAsistenciaRef: ActualizarAsistenciaRef;

export function actualizarAsistencia(vars: ActualizarAsistenciaVariables): MutationPromise<ActualizarAsistenciaData, ActualizarAsistenciaVariables>;
export function actualizarAsistencia(dc: DataConnect, vars: ActualizarAsistenciaVariables): MutationPromise<ActualizarAsistenciaData, ActualizarAsistenciaVariables>;

interface EliminarAsistenciaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarAsistenciaVariables): MutationRef<EliminarAsistenciaData, EliminarAsistenciaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EliminarAsistenciaVariables): MutationRef<EliminarAsistenciaData, EliminarAsistenciaVariables>;
  operationName: string;
}
export const eliminarAsistenciaRef: EliminarAsistenciaRef;

export function eliminarAsistencia(vars: EliminarAsistenciaVariables): MutationPromise<EliminarAsistenciaData, EliminarAsistenciaVariables>;
export function eliminarAsistencia(dc: DataConnect, vars: EliminarAsistenciaVariables): MutationPromise<EliminarAsistenciaData, EliminarAsistenciaVariables>;

interface CrearCompaniaContratistaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CrearCompaniaContratistaVariables): MutationRef<CrearCompaniaContratistaData, CrearCompaniaContratistaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CrearCompaniaContratistaVariables): MutationRef<CrearCompaniaContratistaData, CrearCompaniaContratistaVariables>;
  operationName: string;
}
export const crearCompaniaContratistaRef: CrearCompaniaContratistaRef;

export function crearCompaniaContratista(vars: CrearCompaniaContratistaVariables): MutationPromise<CrearCompaniaContratistaData, CrearCompaniaContratistaVariables>;
export function crearCompaniaContratista(dc: DataConnect, vars: CrearCompaniaContratistaVariables): MutationPromise<CrearCompaniaContratistaData, CrearCompaniaContratistaVariables>;

interface ActualizarCompaniaContratistaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ActualizarCompaniaContratistaVariables): MutationRef<ActualizarCompaniaContratistaData, ActualizarCompaniaContratistaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ActualizarCompaniaContratistaVariables): MutationRef<ActualizarCompaniaContratistaData, ActualizarCompaniaContratistaVariables>;
  operationName: string;
}
export const actualizarCompaniaContratistaRef: ActualizarCompaniaContratistaRef;

export function actualizarCompaniaContratista(vars: ActualizarCompaniaContratistaVariables): MutationPromise<ActualizarCompaniaContratistaData, ActualizarCompaniaContratistaVariables>;
export function actualizarCompaniaContratista(dc: DataConnect, vars: ActualizarCompaniaContratistaVariables): MutationPromise<ActualizarCompaniaContratistaData, ActualizarCompaniaContratistaVariables>;

interface EliminarCompaniaContratistaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarCompaniaContratistaVariables): MutationRef<EliminarCompaniaContratistaData, EliminarCompaniaContratistaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EliminarCompaniaContratistaVariables): MutationRef<EliminarCompaniaContratistaData, EliminarCompaniaContratistaVariables>;
  operationName: string;
}
export const eliminarCompaniaContratistaRef: EliminarCompaniaContratistaRef;

export function eliminarCompaniaContratista(vars: EliminarCompaniaContratistaVariables): MutationPromise<EliminarCompaniaContratistaData, EliminarCompaniaContratistaVariables>;
export function eliminarCompaniaContratista(dc: DataConnect, vars: EliminarCompaniaContratistaVariables): MutationPromise<EliminarCompaniaContratistaData, EliminarCompaniaContratistaVariables>;

interface CrearCuadrillaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CrearCuadrillaVariables): MutationRef<CrearCuadrillaData, CrearCuadrillaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CrearCuadrillaVariables): MutationRef<CrearCuadrillaData, CrearCuadrillaVariables>;
  operationName: string;
}
export const crearCuadrillaRef: CrearCuadrillaRef;

export function crearCuadrilla(vars: CrearCuadrillaVariables): MutationPromise<CrearCuadrillaData, CrearCuadrillaVariables>;
export function crearCuadrilla(dc: DataConnect, vars: CrearCuadrillaVariables): MutationPromise<CrearCuadrillaData, CrearCuadrillaVariables>;

interface ActualizarCuadrillaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ActualizarCuadrillaVariables): MutationRef<ActualizarCuadrillaData, ActualizarCuadrillaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ActualizarCuadrillaVariables): MutationRef<ActualizarCuadrillaData, ActualizarCuadrillaVariables>;
  operationName: string;
}
export const actualizarCuadrillaRef: ActualizarCuadrillaRef;

export function actualizarCuadrilla(vars: ActualizarCuadrillaVariables): MutationPromise<ActualizarCuadrillaData, ActualizarCuadrillaVariables>;
export function actualizarCuadrilla(dc: DataConnect, vars: ActualizarCuadrillaVariables): MutationPromise<ActualizarCuadrillaData, ActualizarCuadrillaVariables>;

interface EliminarCuadrillaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarCuadrillaVariables): MutationRef<EliminarCuadrillaData, EliminarCuadrillaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EliminarCuadrillaVariables): MutationRef<EliminarCuadrillaData, EliminarCuadrillaVariables>;
  operationName: string;
}
export const eliminarCuadrillaRef: EliminarCuadrillaRef;

export function eliminarCuadrilla(vars: EliminarCuadrillaVariables): MutationPromise<EliminarCuadrillaData, EliminarCuadrillaVariables>;
export function eliminarCuadrilla(dc: DataConnect, vars: EliminarCuadrillaVariables): MutationPromise<EliminarCuadrillaData, EliminarCuadrillaVariables>;

interface CrearEquipamentoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CrearEquipamentoVariables): MutationRef<CrearEquipamentoData, CrearEquipamentoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CrearEquipamentoVariables): MutationRef<CrearEquipamentoData, CrearEquipamentoVariables>;
  operationName: string;
}
export const crearEquipamentoRef: CrearEquipamentoRef;

export function crearEquipamento(vars: CrearEquipamentoVariables): MutationPromise<CrearEquipamentoData, CrearEquipamentoVariables>;
export function crearEquipamento(dc: DataConnect, vars: CrearEquipamentoVariables): MutationPromise<CrearEquipamentoData, CrearEquipamentoVariables>;

interface ActualizarEquipamentoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ActualizarEquipamentoVariables): MutationRef<ActualizarEquipamentoData, ActualizarEquipamentoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ActualizarEquipamentoVariables): MutationRef<ActualizarEquipamentoData, ActualizarEquipamentoVariables>;
  operationName: string;
}
export const actualizarEquipamentoRef: ActualizarEquipamentoRef;

export function actualizarEquipamento(vars: ActualizarEquipamentoVariables): MutationPromise<ActualizarEquipamentoData, ActualizarEquipamentoVariables>;
export function actualizarEquipamento(dc: DataConnect, vars: ActualizarEquipamentoVariables): MutationPromise<ActualizarEquipamentoData, ActualizarEquipamentoVariables>;

interface EliminarEquipamentoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarEquipamentoVariables): MutationRef<EliminarEquipamentoData, EliminarEquipamentoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EliminarEquipamentoVariables): MutationRef<EliminarEquipamentoData, EliminarEquipamentoVariables>;
  operationName: string;
}
export const eliminarEquipamentoRef: EliminarEquipamentoRef;

export function eliminarEquipamento(vars: EliminarEquipamentoVariables): MutationPromise<EliminarEquipamentoData, EliminarEquipamentoVariables>;
export function eliminarEquipamento(dc: DataConnect, vars: EliminarEquipamentoVariables): MutationPromise<EliminarEquipamentoData, EliminarEquipamentoVariables>;

interface PrestarEquipamentoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: PrestarEquipamentoVariables): MutationRef<PrestarEquipamentoData, PrestarEquipamentoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: PrestarEquipamentoVariables): MutationRef<PrestarEquipamentoData, PrestarEquipamentoVariables>;
  operationName: string;
}
export const prestarEquipamentoRef: PrestarEquipamentoRef;

export function prestarEquipamento(vars: PrestarEquipamentoVariables): MutationPromise<PrestarEquipamentoData, PrestarEquipamentoVariables>;
export function prestarEquipamento(dc: DataConnect, vars: PrestarEquipamentoVariables): MutationPromise<PrestarEquipamentoData, PrestarEquipamentoVariables>;

interface DevolverEquipamentoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DevolverEquipamentoVariables): MutationRef<DevolverEquipamentoData, DevolverEquipamentoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DevolverEquipamentoVariables): MutationRef<DevolverEquipamentoData, DevolverEquipamentoVariables>;
  operationName: string;
}
export const devolverEquipamentoRef: DevolverEquipamentoRef;

export function devolverEquipamento(vars: DevolverEquipamentoVariables): MutationPromise<DevolverEquipamentoData, DevolverEquipamentoVariables>;
export function devolverEquipamento(dc: DataConnect, vars: DevolverEquipamentoVariables): MutationPromise<DevolverEquipamentoData, DevolverEquipamentoVariables>;

interface EliminarEquipamentoPrestadoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarEquipamentoPrestadoVariables): MutationRef<EliminarEquipamentoPrestadoData, EliminarEquipamentoPrestadoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EliminarEquipamentoPrestadoVariables): MutationRef<EliminarEquipamentoPrestadoData, EliminarEquipamentoPrestadoVariables>;
  operationName: string;
}
export const eliminarEquipamentoPrestadoRef: EliminarEquipamentoPrestadoRef;

export function eliminarEquipamentoPrestado(vars: EliminarEquipamentoPrestadoVariables): MutationPromise<EliminarEquipamentoPrestadoData, EliminarEquipamentoPrestadoVariables>;
export function eliminarEquipamentoPrestado(dc: DataConnect, vars: EliminarEquipamentoPrestadoVariables): MutationPromise<EliminarEquipamentoPrestadoData, EliminarEquipamentoPrestadoVariables>;

interface CrearMovimientoTesoreriaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CrearMovimientoTesoreriaVariables): MutationRef<CrearMovimientoTesoreriaData, CrearMovimientoTesoreriaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CrearMovimientoTesoreriaVariables): MutationRef<CrearMovimientoTesoreriaData, CrearMovimientoTesoreriaVariables>;
  operationName: string;
}
export const crearMovimientoTesoreriaRef: CrearMovimientoTesoreriaRef;

export function crearMovimientoTesoreria(vars: CrearMovimientoTesoreriaVariables): MutationPromise<CrearMovimientoTesoreriaData, CrearMovimientoTesoreriaVariables>;
export function crearMovimientoTesoreria(dc: DataConnect, vars: CrearMovimientoTesoreriaVariables): MutationPromise<CrearMovimientoTesoreriaData, CrearMovimientoTesoreriaVariables>;

interface AprobarMovimientoTesoreriaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AprobarMovimientoTesoreriaVariables): MutationRef<AprobarMovimientoTesoreriaData, AprobarMovimientoTesoreriaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AprobarMovimientoTesoreriaVariables): MutationRef<AprobarMovimientoTesoreriaData, AprobarMovimientoTesoreriaVariables>;
  operationName: string;
}
export const aprobarMovimientoTesoreriaRef: AprobarMovimientoTesoreriaRef;

export function aprobarMovimientoTesoreria(vars: AprobarMovimientoTesoreriaVariables): MutationPromise<AprobarMovimientoTesoreriaData, AprobarMovimientoTesoreriaVariables>;
export function aprobarMovimientoTesoreria(dc: DataConnect, vars: AprobarMovimientoTesoreriaVariables): MutationPromise<AprobarMovimientoTesoreriaData, AprobarMovimientoTesoreriaVariables>;

interface AnularMovimientoTesoreriaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AnularMovimientoTesoreriaVariables): MutationRef<AnularMovimientoTesoreriaData, AnularMovimientoTesoreriaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AnularMovimientoTesoreriaVariables): MutationRef<AnularMovimientoTesoreriaData, AnularMovimientoTesoreriaVariables>;
  operationName: string;
}
export const anularMovimientoTesoreriaRef: AnularMovimientoTesoreriaRef;

export function anularMovimientoTesoreria(vars: AnularMovimientoTesoreriaVariables): MutationPromise<AnularMovimientoTesoreriaData, AnularMovimientoTesoreriaVariables>;
export function anularMovimientoTesoreria(dc: DataConnect, vars: AnularMovimientoTesoreriaVariables): MutationPromise<AnularMovimientoTesoreriaData, AnularMovimientoTesoreriaVariables>;

interface EliminarMovimientoTesoreriaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarMovimientoTesoreriaVariables): MutationRef<EliminarMovimientoTesoreriaData, EliminarMovimientoTesoreriaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EliminarMovimientoTesoreriaVariables): MutationRef<EliminarMovimientoTesoreriaData, EliminarMovimientoTesoreriaVariables>;
  operationName: string;
}
export const eliminarMovimientoTesoreriaRef: EliminarMovimientoTesoreriaRef;

export function eliminarMovimientoTesoreria(vars: EliminarMovimientoTesoreriaVariables): MutationPromise<EliminarMovimientoTesoreriaData, EliminarMovimientoTesoreriaVariables>;
export function eliminarMovimientoTesoreria(dc: DataConnect, vars: EliminarMovimientoTesoreriaVariables): MutationPromise<EliminarMovimientoTesoreriaData, EliminarMovimientoTesoreriaVariables>;

interface CrearFondoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CrearFondoVariables): MutationRef<CrearFondoData, CrearFondoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CrearFondoVariables): MutationRef<CrearFondoData, CrearFondoVariables>;
  operationName: string;
}
export const crearFondoRef: CrearFondoRef;

export function crearFondo(vars: CrearFondoVariables): MutationPromise<CrearFondoData, CrearFondoVariables>;
export function crearFondo(dc: DataConnect, vars: CrearFondoVariables): MutationPromise<CrearFondoData, CrearFondoVariables>;

interface ActualizarFondoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ActualizarFondoVariables): MutationRef<ActualizarFondoData, ActualizarFondoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ActualizarFondoVariables): MutationRef<ActualizarFondoData, ActualizarFondoVariables>;
  operationName: string;
}
export const actualizarFondoRef: ActualizarFondoRef;

export function actualizarFondo(vars: ActualizarFondoVariables): MutationPromise<ActualizarFondoData, ActualizarFondoVariables>;
export function actualizarFondo(dc: DataConnect, vars: ActualizarFondoVariables): MutationPromise<ActualizarFondoData, ActualizarFondoVariables>;

interface EliminarFondoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarFondoVariables): MutationRef<EliminarFondoData, EliminarFondoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EliminarFondoVariables): MutationRef<EliminarFondoData, EliminarFondoVariables>;
  operationName: string;
}
export const eliminarFondoRef: EliminarFondoRef;

export function eliminarFondo(vars: EliminarFondoVariables): MutationPromise<EliminarFondoData, EliminarFondoVariables>;
export function eliminarFondo(dc: DataConnect, vars: EliminarFondoVariables): MutationPromise<EliminarFondoData, EliminarFondoVariables>;

interface ListarSedesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarSedesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListarSedesData, undefined>;
  operationName: string;
}
export const listarSedesRef: ListarSedesRef;

export function listarSedes(options?: ExecuteQueryOptions): QueryPromise<ListarSedesData, undefined>;
export function listarSedes(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarSedesData, undefined>;

interface ListarUsuariosRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarUsuariosData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListarUsuariosData, undefined>;
  operationName: string;
}
export const listarUsuariosRef: ListarUsuariosRef;

export function listarUsuarios(options?: ExecuteQueryOptions): QueryPromise<ListarUsuariosData, undefined>;
export function listarUsuarios(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarUsuariosData, undefined>;

interface ListarMisAsistenciasRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarMisAsistenciasData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListarMisAsistenciasData, undefined>;
  operationName: string;
}
export const listarMisAsistenciasRef: ListarMisAsistenciasRef;

export function listarMisAsistencias(options?: ExecuteQueryOptions): QueryPromise<ListarMisAsistenciasData, undefined>;
export function listarMisAsistencias(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarMisAsistenciasData, undefined>;

interface ObtenerUsuarioPorIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ObtenerUsuarioPorIdVariables): QueryRef<ObtenerUsuarioPorIdData, ObtenerUsuarioPorIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ObtenerUsuarioPorIdVariables): QueryRef<ObtenerUsuarioPorIdData, ObtenerUsuarioPorIdVariables>;
  operationName: string;
}
export const obtenerUsuarioPorIdRef: ObtenerUsuarioPorIdRef;

export function obtenerUsuarioPorId(vars: ObtenerUsuarioPorIdVariables, options?: ExecuteQueryOptions): QueryPromise<ObtenerUsuarioPorIdData, ObtenerUsuarioPorIdVariables>;
export function obtenerUsuarioPorId(dc: DataConnect, vars: ObtenerUsuarioPorIdVariables, options?: ExecuteQueryOptions): QueryPromise<ObtenerUsuarioPorIdData, ObtenerUsuarioPorIdVariables>;

interface ListarTiposEquipoRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarTiposEquipoData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListarTiposEquipoData, undefined>;
  operationName: string;
}
export const listarTiposEquipoRef: ListarTiposEquipoRef;

export function listarTiposEquipo(options?: ExecuteQueryOptions): QueryPromise<ListarTiposEquipoData, undefined>;
export function listarTiposEquipo(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarTiposEquipoData, undefined>;

interface ListarEquiposInventarioRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarEquiposInventarioData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListarEquiposInventarioData, undefined>;
  operationName: string;
}
export const listarEquiposInventarioRef: ListarEquiposInventarioRef;

export function listarEquiposInventario(options?: ExecuteQueryOptions): QueryPromise<ListarEquiposInventarioData, undefined>;
export function listarEquiposInventario(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarEquiposInventarioData, undefined>;

interface ObtenerEquipoPorIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ObtenerEquipoPorIdVariables): QueryRef<ObtenerEquipoPorIdData, ObtenerEquipoPorIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ObtenerEquipoPorIdVariables): QueryRef<ObtenerEquipoPorIdData, ObtenerEquipoPorIdVariables>;
  operationName: string;
}
export const obtenerEquipoPorIdRef: ObtenerEquipoPorIdRef;

export function obtenerEquipoPorId(vars: ObtenerEquipoPorIdVariables, options?: ExecuteQueryOptions): QueryPromise<ObtenerEquipoPorIdData, ObtenerEquipoPorIdVariables>;
export function obtenerEquipoPorId(dc: DataConnect, vars: ObtenerEquipoPorIdVariables, options?: ExecuteQueryOptions): QueryPromise<ObtenerEquipoPorIdData, ObtenerEquipoPorIdVariables>;

interface ListarEnviosEquipoRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarEnviosEquipoData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListarEnviosEquipoData, undefined>;
  operationName: string;
}
export const listarEnviosEquipoRef: ListarEnviosEquipoRef;

export function listarEnviosEquipo(options?: ExecuteQueryOptions): QueryPromise<ListarEnviosEquipoData, undefined>;
export function listarEnviosEquipo(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarEnviosEquipoData, undefined>;

interface ObtenerEnvioPorIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ObtenerEnvioPorIdVariables): QueryRef<ObtenerEnvioPorIdData, ObtenerEnvioPorIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ObtenerEnvioPorIdVariables): QueryRef<ObtenerEnvioPorIdData, ObtenerEnvioPorIdVariables>;
  operationName: string;
}
export const obtenerEnvioPorIdRef: ObtenerEnvioPorIdRef;

export function obtenerEnvioPorId(vars: ObtenerEnvioPorIdVariables, options?: ExecuteQueryOptions): QueryPromise<ObtenerEnvioPorIdData, ObtenerEnvioPorIdVariables>;
export function obtenerEnvioPorId(dc: DataConnect, vars: ObtenerEnvioPorIdVariables, options?: ExecuteQueryOptions): QueryPromise<ObtenerEnvioPorIdData, ObtenerEnvioPorIdVariables>;

interface ListarCompaniasContratistasRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarCompaniasContratistasData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListarCompaniasContratistasData, undefined>;
  operationName: string;
}
export const listarCompaniasContratistasRef: ListarCompaniasContratistasRef;

export function listarCompaniasContratistas(options?: ExecuteQueryOptions): QueryPromise<ListarCompaniasContratistasData, undefined>;
export function listarCompaniasContratistas(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarCompaniasContratistasData, undefined>;

interface ListarCuadrillasPorContratistaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListarCuadrillasPorContratistaVariables): QueryRef<ListarCuadrillasPorContratistaData, ListarCuadrillasPorContratistaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListarCuadrillasPorContratistaVariables): QueryRef<ListarCuadrillasPorContratistaData, ListarCuadrillasPorContratistaVariables>;
  operationName: string;
}
export const listarCuadrillasPorContratistaRef: ListarCuadrillasPorContratistaRef;

export function listarCuadrillasPorContratista(vars: ListarCuadrillasPorContratistaVariables, options?: ExecuteQueryOptions): QueryPromise<ListarCuadrillasPorContratistaData, ListarCuadrillasPorContratistaVariables>;
export function listarCuadrillasPorContratista(dc: DataConnect, vars: ListarCuadrillasPorContratistaVariables, options?: ExecuteQueryOptions): QueryPromise<ListarCuadrillasPorContratistaData, ListarCuadrillasPorContratistaVariables>;

interface ListarEquipamentosPrestadosRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarEquipamentosPrestadosData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListarEquipamentosPrestadosData, undefined>;
  operationName: string;
}
export const listarEquipamentosPrestadosRef: ListarEquipamentosPrestadosRef;

export function listarEquipamentosPrestados(options?: ExecuteQueryOptions): QueryPromise<ListarEquipamentosPrestadosData, undefined>;
export function listarEquipamentosPrestados(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarEquipamentosPrestadosData, undefined>;

interface ListarMovimientosTesoreriaRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarMovimientosTesoreriaData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListarMovimientosTesoreriaData, undefined>;
  operationName: string;
}
export const listarMovimientosTesoreriaRef: ListarMovimientosTesoreriaRef;

export function listarMovimientosTesoreria(options?: ExecuteQueryOptions): QueryPromise<ListarMovimientosTesoreriaData, undefined>;
export function listarMovimientosTesoreria(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarMovimientosTesoreriaData, undefined>;

interface ObtenerMovimientoPorIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ObtenerMovimientoPorIdVariables): QueryRef<ObtenerMovimientoPorIdData, ObtenerMovimientoPorIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ObtenerMovimientoPorIdVariables): QueryRef<ObtenerMovimientoPorIdData, ObtenerMovimientoPorIdVariables>;
  operationName: string;
}
export const obtenerMovimientoPorIdRef: ObtenerMovimientoPorIdRef;

export function obtenerMovimientoPorId(vars: ObtenerMovimientoPorIdVariables, options?: ExecuteQueryOptions): QueryPromise<ObtenerMovimientoPorIdData, ObtenerMovimientoPorIdVariables>;
export function obtenerMovimientoPorId(dc: DataConnect, vars: ObtenerMovimientoPorIdVariables, options?: ExecuteQueryOptions): QueryPromise<ObtenerMovimientoPorIdData, ObtenerMovimientoPorIdVariables>;

interface ListarFondosRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarFondosData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListarFondosData, undefined>;
  operationName: string;
}
export const listarFondosRef: ListarFondosRef;

export function listarFondos(options?: ExecuteQueryOptions): QueryPromise<ListarFondosData, undefined>;
export function listarFondos(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarFondosData, undefined>;

interface ObtenerFondoPorSedeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ObtenerFondoPorSedeVariables): QueryRef<ObtenerFondoPorSedeData, ObtenerFondoPorSedeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ObtenerFondoPorSedeVariables): QueryRef<ObtenerFondoPorSedeData, ObtenerFondoPorSedeVariables>;
  operationName: string;
}
export const obtenerFondoPorSedeRef: ObtenerFondoPorSedeRef;

export function obtenerFondoPorSede(vars: ObtenerFondoPorSedeVariables, options?: ExecuteQueryOptions): QueryPromise<ObtenerFondoPorSedeData, ObtenerFondoPorSedeVariables>;
export function obtenerFondoPorSede(dc: DataConnect, vars: ObtenerFondoPorSedeVariables, options?: ExecuteQueryOptions): QueryPromise<ObtenerFondoPorSedeData, ObtenerFondoPorSedeVariables>;

