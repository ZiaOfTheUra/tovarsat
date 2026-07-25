const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'tovarsattest',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;
const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
exports.dataConnectSettings = dataConnectSettings;

const crearUsuarioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CrearUsuario', inputVars);
}
crearUsuarioRef.operationName = 'CrearUsuario';
exports.crearUsuarioRef = crearUsuarioRef;

exports.crearUsuario = function crearUsuario(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(crearUsuarioRef(dcInstance, inputVars));
}
;

const actualizarMiPerfilRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ActualizarMiPerfil', inputVars);
}
actualizarMiPerfilRef.operationName = 'ActualizarMiPerfil';
exports.actualizarMiPerfilRef = actualizarMiPerfilRef;

exports.actualizarMiPerfil = function actualizarMiPerfil(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(actualizarMiPerfilRef(dcInstance, inputVars));
}
;

const eliminarUsuarioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarUsuario', inputVars);
}
eliminarUsuarioRef.operationName = 'EliminarUsuario';
exports.eliminarUsuarioRef = eliminarUsuarioRef;

exports.eliminarUsuario = function eliminarUsuario(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarUsuarioRef(dcInstance, inputVars));
}
;

const crearSedeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CrearSede', inputVars);
}
crearSedeRef.operationName = 'CrearSede';
exports.crearSedeRef = crearSedeRef;

exports.crearSede = function crearSede(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(crearSedeRef(dcInstance, inputVars));
}
;

const actualizarSedeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ActualizarSede', inputVars);
}
actualizarSedeRef.operationName = 'ActualizarSede';
exports.actualizarSedeRef = actualizarSedeRef;

exports.actualizarSede = function actualizarSede(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(actualizarSedeRef(dcInstance, inputVars));
}
;

const eliminarSedeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarSede', inputVars);
}
eliminarSedeRef.operationName = 'EliminarSede';
exports.eliminarSedeRef = eliminarSedeRef;

exports.eliminarSede = function eliminarSede(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarSedeRef(dcInstance, inputVars));
}
;

const crearTipoEquipoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CrearTipoEquipo', inputVars);
}
crearTipoEquipoRef.operationName = 'CrearTipoEquipo';
exports.crearTipoEquipoRef = crearTipoEquipoRef;

exports.crearTipoEquipo = function crearTipoEquipo(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(crearTipoEquipoRef(dcInstance, inputVars));
}
;

const actualizarTipoEquipoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ActualizarTipoEquipo', inputVars);
}
actualizarTipoEquipoRef.operationName = 'ActualizarTipoEquipo';
exports.actualizarTipoEquipoRef = actualizarTipoEquipoRef;

exports.actualizarTipoEquipo = function actualizarTipoEquipo(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(actualizarTipoEquipoRef(dcInstance, inputVars));
}
;

const eliminarTipoEquipoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarTipoEquipo', inputVars);
}
eliminarTipoEquipoRef.operationName = 'EliminarTipoEquipo';
exports.eliminarTipoEquipoRef = eliminarTipoEquipoRef;

exports.eliminarTipoEquipo = function eliminarTipoEquipo(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarTipoEquipoRef(dcInstance, inputVars));
}
;

const crearEquipoInventarioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CrearEquipoInventario', inputVars);
}
crearEquipoInventarioRef.operationName = 'CrearEquipoInventario';
exports.crearEquipoInventarioRef = crearEquipoInventarioRef;

exports.crearEquipoInventario = function crearEquipoInventario(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(crearEquipoInventarioRef(dcInstance, inputVars));
}
;

const actualizarEquipoInventarioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ActualizarEquipoInventario', inputVars);
}
actualizarEquipoInventarioRef.operationName = 'ActualizarEquipoInventario';
exports.actualizarEquipoInventarioRef = actualizarEquipoInventarioRef;

exports.actualizarEquipoInventario = function actualizarEquipoInventario(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(actualizarEquipoInventarioRef(dcInstance, inputVars));
}
;

const eliminarEquipoInventarioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarEquipoInventario', inputVars);
}
eliminarEquipoInventarioRef.operationName = 'EliminarEquipoInventario';
exports.eliminarEquipoInventarioRef = eliminarEquipoInventarioRef;

exports.eliminarEquipoInventario = function eliminarEquipoInventario(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarEquipoInventarioRef(dcInstance, inputVars));
}
;

const crearEnvioEquipoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CrearEnvioEquipo', inputVars);
}
crearEnvioEquipoRef.operationName = 'CrearEnvioEquipo';
exports.crearEnvioEquipoRef = crearEnvioEquipoRef;

exports.crearEnvioEquipo = function crearEnvioEquipo(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(crearEnvioEquipoRef(dcInstance, inputVars));
}
;

const recepcionarEnvioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecepcionarEnvio', inputVars);
}
recepcionarEnvioRef.operationName = 'RecepcionarEnvio';
exports.recepcionarEnvioRef = recepcionarEnvioRef;

exports.recepcionarEnvio = function recepcionarEnvio(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(recepcionarEnvioRef(dcInstance, inputVars));
}
;

const eliminarEnvioEquipoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarEnvioEquipo', inputVars);
}
eliminarEnvioEquipoRef.operationName = 'EliminarEnvioEquipo';
exports.eliminarEnvioEquipoRef = eliminarEnvioEquipoRef;

exports.eliminarEnvioEquipo = function eliminarEnvioEquipo(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarEnvioEquipoRef(dcInstance, inputVars));
}
;

const registrarAsistenciaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RegistrarAsistencia', inputVars);
}
registrarAsistenciaRef.operationName = 'RegistrarAsistencia';
exports.registrarAsistenciaRef = registrarAsistenciaRef;

exports.registrarAsistencia = function registrarAsistencia(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(registrarAsistenciaRef(dcInstance, inputVars));
}
;

const registrarEntradaMananaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RegistrarEntradaManana', inputVars);
}
registrarEntradaMananaRef.operationName = 'RegistrarEntradaManana';
exports.registrarEntradaMananaRef = registrarEntradaMananaRef;

exports.registrarEntradaManana = function registrarEntradaManana(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(registrarEntradaMananaRef(dcInstance, inputVars));
}
;

const actualizarAsistenciaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ActualizarAsistencia', inputVars);
}
actualizarAsistenciaRef.operationName = 'ActualizarAsistencia';
exports.actualizarAsistenciaRef = actualizarAsistenciaRef;

exports.actualizarAsistencia = function actualizarAsistencia(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(actualizarAsistenciaRef(dcInstance, inputVars));
}
;

const eliminarAsistenciaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarAsistencia', inputVars);
}
eliminarAsistenciaRef.operationName = 'EliminarAsistencia';
exports.eliminarAsistenciaRef = eliminarAsistenciaRef;

exports.eliminarAsistencia = function eliminarAsistencia(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarAsistenciaRef(dcInstance, inputVars));
}
;

const crearCompaniaContratistaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CrearCompaniaContratista', inputVars);
}
crearCompaniaContratistaRef.operationName = 'CrearCompaniaContratista';
exports.crearCompaniaContratistaRef = crearCompaniaContratistaRef;

exports.crearCompaniaContratista = function crearCompaniaContratista(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(crearCompaniaContratistaRef(dcInstance, inputVars));
}
;

const actualizarCompaniaContratistaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ActualizarCompaniaContratista', inputVars);
}
actualizarCompaniaContratistaRef.operationName = 'ActualizarCompaniaContratista';
exports.actualizarCompaniaContratistaRef = actualizarCompaniaContratistaRef;

exports.actualizarCompaniaContratista = function actualizarCompaniaContratista(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(actualizarCompaniaContratistaRef(dcInstance, inputVars));
}
;

const eliminarCompaniaContratistaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarCompaniaContratista', inputVars);
}
eliminarCompaniaContratistaRef.operationName = 'EliminarCompaniaContratista';
exports.eliminarCompaniaContratistaRef = eliminarCompaniaContratistaRef;

exports.eliminarCompaniaContratista = function eliminarCompaniaContratista(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarCompaniaContratistaRef(dcInstance, inputVars));
}
;

const crearCuadrillaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CrearCuadrilla', inputVars);
}
crearCuadrillaRef.operationName = 'CrearCuadrilla';
exports.crearCuadrillaRef = crearCuadrillaRef;

exports.crearCuadrilla = function crearCuadrilla(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(crearCuadrillaRef(dcInstance, inputVars));
}
;

const actualizarCuadrillaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ActualizarCuadrilla', inputVars);
}
actualizarCuadrillaRef.operationName = 'ActualizarCuadrilla';
exports.actualizarCuadrillaRef = actualizarCuadrillaRef;

exports.actualizarCuadrilla = function actualizarCuadrilla(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(actualizarCuadrillaRef(dcInstance, inputVars));
}
;

const eliminarCuadrillaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarCuadrilla', inputVars);
}
eliminarCuadrillaRef.operationName = 'EliminarCuadrilla';
exports.eliminarCuadrillaRef = eliminarCuadrillaRef;

exports.eliminarCuadrilla = function eliminarCuadrilla(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarCuadrillaRef(dcInstance, inputVars));
}
;

const crearEquipamentoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CrearEquipamento', inputVars);
}
crearEquipamentoRef.operationName = 'CrearEquipamento';
exports.crearEquipamentoRef = crearEquipamentoRef;

exports.crearEquipamento = function crearEquipamento(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(crearEquipamentoRef(dcInstance, inputVars));
}
;

const actualizarEquipamentoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ActualizarEquipamento', inputVars);
}
actualizarEquipamentoRef.operationName = 'ActualizarEquipamento';
exports.actualizarEquipamentoRef = actualizarEquipamentoRef;

exports.actualizarEquipamento = function actualizarEquipamento(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(actualizarEquipamentoRef(dcInstance, inputVars));
}
;

const eliminarEquipamentoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarEquipamento', inputVars);
}
eliminarEquipamentoRef.operationName = 'EliminarEquipamento';
exports.eliminarEquipamentoRef = eliminarEquipamentoRef;

exports.eliminarEquipamento = function eliminarEquipamento(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarEquipamentoRef(dcInstance, inputVars));
}
;

const prestarEquipamentoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'PrestarEquipamento', inputVars);
}
prestarEquipamentoRef.operationName = 'PrestarEquipamento';
exports.prestarEquipamentoRef = prestarEquipamentoRef;

exports.prestarEquipamento = function prestarEquipamento(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(prestarEquipamentoRef(dcInstance, inputVars));
}
;

const devolverEquipamentoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DevolverEquipamento', inputVars);
}
devolverEquipamentoRef.operationName = 'DevolverEquipamento';
exports.devolverEquipamentoRef = devolverEquipamentoRef;

exports.devolverEquipamento = function devolverEquipamento(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(devolverEquipamentoRef(dcInstance, inputVars));
}
;

const eliminarEquipamentoPrestadoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarEquipamentoPrestado', inputVars);
}
eliminarEquipamentoPrestadoRef.operationName = 'EliminarEquipamentoPrestado';
exports.eliminarEquipamentoPrestadoRef = eliminarEquipamentoPrestadoRef;

exports.eliminarEquipamentoPrestado = function eliminarEquipamentoPrestado(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarEquipamentoPrestadoRef(dcInstance, inputVars));
}
;

const crearMovimientoTesoreriaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CrearMovimientoTesoreria', inputVars);
}
crearMovimientoTesoreriaRef.operationName = 'CrearMovimientoTesoreria';
exports.crearMovimientoTesoreriaRef = crearMovimientoTesoreriaRef;

exports.crearMovimientoTesoreria = function crearMovimientoTesoreria(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(crearMovimientoTesoreriaRef(dcInstance, inputVars));
}
;

const aprobarMovimientoTesoreriaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AprobarMovimientoTesoreria', inputVars);
}
aprobarMovimientoTesoreriaRef.operationName = 'AprobarMovimientoTesoreria';
exports.aprobarMovimientoTesoreriaRef = aprobarMovimientoTesoreriaRef;

exports.aprobarMovimientoTesoreria = function aprobarMovimientoTesoreria(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(aprobarMovimientoTesoreriaRef(dcInstance, inputVars));
}
;

const anularMovimientoTesoreriaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AnularMovimientoTesoreria', inputVars);
}
anularMovimientoTesoreriaRef.operationName = 'AnularMovimientoTesoreria';
exports.anularMovimientoTesoreriaRef = anularMovimientoTesoreriaRef;

exports.anularMovimientoTesoreria = function anularMovimientoTesoreria(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(anularMovimientoTesoreriaRef(dcInstance, inputVars));
}
;

const eliminarMovimientoTesoreriaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarMovimientoTesoreria', inputVars);
}
eliminarMovimientoTesoreriaRef.operationName = 'EliminarMovimientoTesoreria';
exports.eliminarMovimientoTesoreriaRef = eliminarMovimientoTesoreriaRef;

exports.eliminarMovimientoTesoreria = function eliminarMovimientoTesoreria(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarMovimientoTesoreriaRef(dcInstance, inputVars));
}
;

const crearFondoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CrearFondo', inputVars);
}
crearFondoRef.operationName = 'CrearFondo';
exports.crearFondoRef = crearFondoRef;

exports.crearFondo = function crearFondo(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(crearFondoRef(dcInstance, inputVars));
}
;

const actualizarFondoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ActualizarFondo', inputVars);
}
actualizarFondoRef.operationName = 'ActualizarFondo';
exports.actualizarFondoRef = actualizarFondoRef;

exports.actualizarFondo = function actualizarFondo(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(actualizarFondoRef(dcInstance, inputVars));
}
;

const eliminarFondoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EliminarFondo', inputVars);
}
eliminarFondoRef.operationName = 'EliminarFondo';
exports.eliminarFondoRef = eliminarFondoRef;

exports.eliminarFondo = function eliminarFondo(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(eliminarFondoRef(dcInstance, inputVars));
}
;

const listarSedesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarSedes');
}
listarSedesRef.operationName = 'ListarSedes';
exports.listarSedesRef = listarSedesRef;

exports.listarSedes = function listarSedes(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarSedesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listarUsuariosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarUsuarios');
}
listarUsuariosRef.operationName = 'ListarUsuarios';
exports.listarUsuariosRef = listarUsuariosRef;

exports.listarUsuarios = function listarUsuarios(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarUsuariosRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listarMisAsistenciasRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarMisAsistencias');
}
listarMisAsistenciasRef.operationName = 'ListarMisAsistencias';
exports.listarMisAsistenciasRef = listarMisAsistenciasRef;

exports.listarMisAsistencias = function listarMisAsistencias(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarMisAsistenciasRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const obtenerUsuarioPorIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ObtenerUsuarioPorId', inputVars);
}
obtenerUsuarioPorIdRef.operationName = 'ObtenerUsuarioPorId';
exports.obtenerUsuarioPorIdRef = obtenerUsuarioPorIdRef;

exports.obtenerUsuarioPorId = function obtenerUsuarioPorId(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(obtenerUsuarioPorIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listarTiposEquipoRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarTiposEquipo');
}
listarTiposEquipoRef.operationName = 'ListarTiposEquipo';
exports.listarTiposEquipoRef = listarTiposEquipoRef;

exports.listarTiposEquipo = function listarTiposEquipo(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarTiposEquipoRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listarEquiposInventarioRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarEquiposInventario');
}
listarEquiposInventarioRef.operationName = 'ListarEquiposInventario';
exports.listarEquiposInventarioRef = listarEquiposInventarioRef;

exports.listarEquiposInventario = function listarEquiposInventario(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarEquiposInventarioRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const obtenerEquipoPorIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ObtenerEquipoPorId', inputVars);
}
obtenerEquipoPorIdRef.operationName = 'ObtenerEquipoPorId';
exports.obtenerEquipoPorIdRef = obtenerEquipoPorIdRef;

exports.obtenerEquipoPorId = function obtenerEquipoPorId(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(obtenerEquipoPorIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listarEnviosEquipoRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarEnviosEquipo');
}
listarEnviosEquipoRef.operationName = 'ListarEnviosEquipo';
exports.listarEnviosEquipoRef = listarEnviosEquipoRef;

exports.listarEnviosEquipo = function listarEnviosEquipo(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarEnviosEquipoRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const obtenerEnvioPorIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ObtenerEnvioPorId', inputVars);
}
obtenerEnvioPorIdRef.operationName = 'ObtenerEnvioPorId';
exports.obtenerEnvioPorIdRef = obtenerEnvioPorIdRef;

exports.obtenerEnvioPorId = function obtenerEnvioPorId(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(obtenerEnvioPorIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listarCompaniasContratistasRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarCompaniasContratistas');
}
listarCompaniasContratistasRef.operationName = 'ListarCompaniasContratistas';
exports.listarCompaniasContratistasRef = listarCompaniasContratistasRef;

exports.listarCompaniasContratistas = function listarCompaniasContratistas(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarCompaniasContratistasRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listarCuadrillasPorContratistaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarCuadrillasPorContratista', inputVars);
}
listarCuadrillasPorContratistaRef.operationName = 'ListarCuadrillasPorContratista';
exports.listarCuadrillasPorContratistaRef = listarCuadrillasPorContratistaRef;

exports.listarCuadrillasPorContratista = function listarCuadrillasPorContratista(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listarCuadrillasPorContratistaRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listarEquipamentosPrestadosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarEquipamentosPrestados');
}
listarEquipamentosPrestadosRef.operationName = 'ListarEquipamentosPrestados';
exports.listarEquipamentosPrestadosRef = listarEquipamentosPrestadosRef;

exports.listarEquipamentosPrestados = function listarEquipamentosPrestados(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarEquipamentosPrestadosRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listarMovimientosTesoreriaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarMovimientosTesoreria');
}
listarMovimientosTesoreriaRef.operationName = 'ListarMovimientosTesoreria';
exports.listarMovimientosTesoreriaRef = listarMovimientosTesoreriaRef;

exports.listarMovimientosTesoreria = function listarMovimientosTesoreria(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarMovimientosTesoreriaRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const obtenerMovimientoPorIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ObtenerMovimientoPorId', inputVars);
}
obtenerMovimientoPorIdRef.operationName = 'ObtenerMovimientoPorId';
exports.obtenerMovimientoPorIdRef = obtenerMovimientoPorIdRef;

exports.obtenerMovimientoPorId = function obtenerMovimientoPorId(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(obtenerMovimientoPorIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listarFondosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListarFondos');
}
listarFondosRef.operationName = 'ListarFondos';
exports.listarFondosRef = listarFondosRef;

exports.listarFondos = function listarFondos(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listarFondosRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const obtenerFondoPorSedeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ObtenerFondoPorSede', inputVars);
}
obtenerFondoPorSedeRef.operationName = 'ObtenerFondoPorSede';
exports.obtenerFondoPorSedeRef = obtenerFondoPorSedeRef;

exports.obtenerFondoPorSede = function obtenerFondoPorSede(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(obtenerFondoPorSedeRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;
