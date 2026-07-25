import { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'tovarsattest',
  location: 'us-east4'
};
export const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
export const crearUsuarioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CrearUsuario', inputVars);
}
crearUsuarioRef.operationName = 'CrearUsuario';

export function crearUsuario(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(crearUsuarioRef(dcInstance, inputVars));
}

export const actualizarMiPerfilRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ActualizarMiPerfil', inputVars);
}
actualizarMiPerfilRef.operationName = 'ActualizarMiPerfil';

export function actualizarMiPerfil(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(actualizarMiPerfilRef(dcInstance, inputVars));
}

export const eliminarUsuarioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarUsuario', inputVars);
}
eliminarUsuarioRef.operationName = 'EliminarUsuario';

export function eliminarUsuario(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarUsuarioRef(dcInstance, inputVars));
}

export const crearSedeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CrearSede', inputVars);
}
crearSedeRef.operationName = 'CrearSede';

export function crearSede(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(crearSedeRef(dcInstance, inputVars));
}

export const actualizarSedeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ActualizarSede', inputVars);
}
actualizarSedeRef.operationName = 'ActualizarSede';

export function actualizarSede(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(actualizarSedeRef(dcInstance, inputVars));
}

export const eliminarSedeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarSede', inputVars);
}
eliminarSedeRef.operationName = 'EliminarSede';

export function eliminarSede(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarSedeRef(dcInstance, inputVars));
}

export const crearTipoEquipoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CrearTipoEquipo', inputVars);
}
crearTipoEquipoRef.operationName = 'CrearTipoEquipo';

export function crearTipoEquipo(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(crearTipoEquipoRef(dcInstance, inputVars));
}

export const actualizarTipoEquipoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ActualizarTipoEquipo', inputVars);
}
actualizarTipoEquipoRef.operationName = 'ActualizarTipoEquipo';

export function actualizarTipoEquipo(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(actualizarTipoEquipoRef(dcInstance, inputVars));
}

export const eliminarTipoEquipoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarTipoEquipo', inputVars);
}
eliminarTipoEquipoRef.operationName = 'EliminarTipoEquipo';

export function eliminarTipoEquipo(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarTipoEquipoRef(dcInstance, inputVars));
}

export const crearEquipoInventarioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CrearEquipoInventario', inputVars);
}
crearEquipoInventarioRef.operationName = 'CrearEquipoInventario';

export function crearEquipoInventario(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(crearEquipoInventarioRef(dcInstance, inputVars));
}

export const actualizarEquipoInventarioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ActualizarEquipoInventario', inputVars);
}
actualizarEquipoInventarioRef.operationName = 'ActualizarEquipoInventario';

export function actualizarEquipoInventario(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(actualizarEquipoInventarioRef(dcInstance, inputVars));
}

export const eliminarEquipoInventarioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarEquipoInventario', inputVars);
}
eliminarEquipoInventarioRef.operationName = 'EliminarEquipoInventario';

export function eliminarEquipoInventario(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarEquipoInventarioRef(dcInstance, inputVars));
}

export const crearEnvioEquipoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CrearEnvioEquipo', inputVars);
}
crearEnvioEquipoRef.operationName = 'CrearEnvioEquipo';

export function crearEnvioEquipo(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(crearEnvioEquipoRef(dcInstance, inputVars));
}

export const recepcionarEnvioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecepcionarEnvio', inputVars);
}
recepcionarEnvioRef.operationName = 'RecepcionarEnvio';

export function recepcionarEnvio(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(recepcionarEnvioRef(dcInstance, inputVars));
}

export const eliminarEnvioEquipoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarEnvioEquipo', inputVars);
}
eliminarEnvioEquipoRef.operationName = 'EliminarEnvioEquipo';

export function eliminarEnvioEquipo(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarEnvioEquipoRef(dcInstance, inputVars));
}

export const registrarAsistenciaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RegistrarAsistencia', inputVars);
}
registrarAsistenciaRef.operationName = 'RegistrarAsistencia';

export function registrarAsistencia(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(registrarAsistenciaRef(dcInstance, inputVars));
}

export const registrarEntradaMananaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RegistrarEntradaManana', inputVars);
}
registrarEntradaMananaRef.operationName = 'RegistrarEntradaManana';

export function registrarEntradaManana(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(registrarEntradaMananaRef(dcInstance, inputVars));
}

export const actualizarAsistenciaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ActualizarAsistencia', inputVars);
}
actualizarAsistenciaRef.operationName = 'ActualizarAsistencia';

export function actualizarAsistencia(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(actualizarAsistenciaRef(dcInstance, inputVars));
}

export const eliminarAsistenciaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarAsistencia', inputVars);
}
eliminarAsistenciaRef.operationName = 'EliminarAsistencia';

export function eliminarAsistencia(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarAsistenciaRef(dcInstance, inputVars));
}

export const crearCompaniaContratistaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CrearCompaniaContratista', inputVars);
}
crearCompaniaContratistaRef.operationName = 'CrearCompaniaContratista';

export function crearCompaniaContratista(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(crearCompaniaContratistaRef(dcInstance, inputVars));
}

export const actualizarCompaniaContratistaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ActualizarCompaniaContratista', inputVars);
}
actualizarCompaniaContratistaRef.operationName = 'ActualizarCompaniaContratista';

export function actualizarCompaniaContratista(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(actualizarCompaniaContratistaRef(dcInstance, inputVars));
}

export const eliminarCompaniaContratistaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarCompaniaContratista', inputVars);
}
eliminarCompaniaContratistaRef.operationName = 'EliminarCompaniaContratista';

export function eliminarCompaniaContratista(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarCompaniaContratistaRef(dcInstance, inputVars));
}

export const crearCuadrillaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CrearCuadrilla', inputVars);
}
crearCuadrillaRef.operationName = 'CrearCuadrilla';

export function crearCuadrilla(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(crearCuadrillaRef(dcInstance, inputVars));
}

export const actualizarCuadrillaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ActualizarCuadrilla', inputVars);
}
actualizarCuadrillaRef.operationName = 'ActualizarCuadrilla';

export function actualizarCuadrilla(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(actualizarCuadrillaRef(dcInstance, inputVars));
}

export const eliminarCuadrillaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarCuadrilla', inputVars);
}
eliminarCuadrillaRef.operationName = 'EliminarCuadrilla';

export function eliminarCuadrilla(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarCuadrillaRef(dcInstance, inputVars));
}

export const crearEquipamentoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CrearEquipamento', inputVars);
}
crearEquipamentoRef.operationName = 'CrearEquipamento';

export function crearEquipamento(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(crearEquipamentoRef(dcInstance, inputVars));
}

export const actualizarEquipamentoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ActualizarEquipamento', inputVars);
}
actualizarEquipamentoRef.operationName = 'ActualizarEquipamento';

export function actualizarEquipamento(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(actualizarEquipamentoRef(dcInstance, inputVars));
}

export const eliminarEquipamentoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarEquipamento', inputVars);
}
eliminarEquipamentoRef.operationName = 'EliminarEquipamento';

export function eliminarEquipamento(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarEquipamentoRef(dcInstance, inputVars));
}

export const prestarEquipamentoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'PrestarEquipamento', inputVars);
}
prestarEquipamentoRef.operationName = 'PrestarEquipamento';

export function prestarEquipamento(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(prestarEquipamentoRef(dcInstance, inputVars));
}

export const devolverEquipamentoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DevolverEquipamento', inputVars);
}
devolverEquipamentoRef.operationName = 'DevolverEquipamento';

export function devolverEquipamento(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(devolverEquipamentoRef(dcInstance, inputVars));
}

export const eliminarEquipamentoPrestadoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarEquipamentoPrestado', inputVars);
}
eliminarEquipamentoPrestadoRef.operationName = 'EliminarEquipamentoPrestado';

export function eliminarEquipamentoPrestado(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarEquipamentoPrestadoRef(dcInstance, inputVars));
}

export const crearMovimientoTesoreriaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CrearMovimientoTesoreria', inputVars);
}
crearMovimientoTesoreriaRef.operationName = 'CrearMovimientoTesoreria';

export function crearMovimientoTesoreria(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(crearMovimientoTesoreriaRef(dcInstance, inputVars));
}

export const aprobarMovimientoTesoreriaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AprobarMovimientoTesoreria', inputVars);
}
aprobarMovimientoTesoreriaRef.operationName = 'AprobarMovimientoTesoreria';

export function aprobarMovimientoTesoreria(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(aprobarMovimientoTesoreriaRef(dcInstance, inputVars));
}

export const anularMovimientoTesoreriaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AnularMovimientoTesoreria', inputVars);
}
anularMovimientoTesoreriaRef.operationName = 'AnularMovimientoTesoreria';

export function anularMovimientoTesoreria(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(anularMovimientoTesoreriaRef(dcInstance, inputVars));
}

export const eliminarMovimientoTesoreriaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarMovimientoTesoreria', inputVars);
}
eliminarMovimientoTesoreriaRef.operationName = 'EliminarMovimientoTesoreria';

export function eliminarMovimientoTesoreria(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarMovimientoTesoreriaRef(dcInstance, inputVars));
}

export const crearFondoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CrearFondo', inputVars);
}
crearFondoRef.operationName = 'CrearFondo';

export function crearFondo(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(crearFondoRef(dcInstance, inputVars));
}

export const actualizarFondoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ActualizarFondo', inputVars);
}
actualizarFondoRef.operationName = 'ActualizarFondo';

export function actualizarFondo(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(actualizarFondoRef(dcInstance, inputVars));
}

export const eliminarFondoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarFondo', inputVars);
}
eliminarFondoRef.operationName = 'EliminarFondo';

export function eliminarFondo(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarFondoRef(dcInstance, inputVars));
}

export const listarSedesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarSedes');
}
listarSedesRef.operationName = 'ListarSedes';

export function listarSedes(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarSedesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listarUsuariosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarUsuarios');
}
listarUsuariosRef.operationName = 'ListarUsuarios';

export function listarUsuarios(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarUsuariosRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listarMisAsistenciasRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarMisAsistencias');
}
listarMisAsistenciasRef.operationName = 'ListarMisAsistencias';

export function listarMisAsistencias(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarMisAsistenciasRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const obtenerUsuarioPorIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ObtenerUsuarioPorId', inputVars);
}
obtenerUsuarioPorIdRef.operationName = 'ObtenerUsuarioPorId';

export function obtenerUsuarioPorId(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(obtenerUsuarioPorIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listarTiposEquipoRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarTiposEquipo');
}
listarTiposEquipoRef.operationName = 'ListarTiposEquipo';

export function listarTiposEquipo(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarTiposEquipoRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listarEquiposInventarioRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarEquiposInventario');
}
listarEquiposInventarioRef.operationName = 'ListarEquiposInventario';

export function listarEquiposInventario(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarEquiposInventarioRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const obtenerEquipoPorIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ObtenerEquipoPorId', inputVars);
}
obtenerEquipoPorIdRef.operationName = 'ObtenerEquipoPorId';

export function obtenerEquipoPorId(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(obtenerEquipoPorIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listarEnviosEquipoRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarEnviosEquipo');
}
listarEnviosEquipoRef.operationName = 'ListarEnviosEquipo';

export function listarEnviosEquipo(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarEnviosEquipoRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const obtenerEnvioPorIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ObtenerEnvioPorId', inputVars);
}
obtenerEnvioPorIdRef.operationName = 'ObtenerEnvioPorId';

export function obtenerEnvioPorId(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(obtenerEnvioPorIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listarCompaniasContratistasRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarCompaniasContratistas');
}
listarCompaniasContratistasRef.operationName = 'ListarCompaniasContratistas';

export function listarCompaniasContratistas(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarCompaniasContratistasRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listarCuadrillasPorContratistaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarCuadrillasPorContratista', inputVars);
}
listarCuadrillasPorContratistaRef.operationName = 'ListarCuadrillasPorContratista';

export function listarCuadrillasPorContratista(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listarCuadrillasPorContratistaRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listarEquipamentosPrestadosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarEquipamentosPrestados');
}
listarEquipamentosPrestadosRef.operationName = 'ListarEquipamentosPrestados';

export function listarEquipamentosPrestados(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarEquipamentosPrestadosRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listarMovimientosTesoreriaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarMovimientosTesoreria');
}
listarMovimientosTesoreriaRef.operationName = 'ListarMovimientosTesoreria';

export function listarMovimientosTesoreria(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarMovimientosTesoreriaRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const obtenerMovimientoPorIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ObtenerMovimientoPorId', inputVars);
}
obtenerMovimientoPorIdRef.operationName = 'ObtenerMovimientoPorId';

export function obtenerMovimientoPorId(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(obtenerMovimientoPorIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const listarFondosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarFondos');
}
listarFondosRef.operationName = 'ListarFondos';

export function listarFondos(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarFondosRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const obtenerFondoPorSedeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ObtenerFondoPorSede', inputVars);
}
obtenerFondoPorSedeRef.operationName = 'ObtenerFondoPorSede';

export function obtenerFondoPorSede(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(obtenerFondoPorSedeRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

