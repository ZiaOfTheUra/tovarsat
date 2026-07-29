import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import * as serviceAuth from '@/services/auth'
import * as XLSX from 'xlsx'
import * as FileSystem from 'expo-file-system/legacy'
import { getColeccion, getDocumento } from '@/services/firestore'

const { StorageAccessFramework } = FileSystem

// Necesitamos los tipos para que typescript no se ponga a gritar cada que hacemos un elemento.funcion.
export type ColumnaExportacion = {
  header: string
  key: string
}

/*
Exportar a Excel:
    Entrada: Un array de datos, un nombre de archivo, y una lista de columnas.
    Proceso: Convierte los datos a hoja de Excel, genera el xlsx en base64, lo escribe a disco
             en el directorio que elija el usuario (Downloads, Drive, etc.) usando StorageAccessFramework.
    Salida: Un archivo .xlsx guardado localmente en la ubicacion seleccionada por el usuario.
            El usuario comparte el archivo manualmente desde su gestor de archivos.
*/
export async function exportarAExcel(
  datos: any[],
  nombreArchivo: string,
  columnas: ColumnaExportacion[]
): Promise<void> {
  // Verificar que haya datos
  if (!datos || datos.length === 0) {
    throw Error("No hay datos para exportar")
  }

  console.log('[exportaraexcel] nombre de archivo:', nombreArchivo)
  console.log('[exportaraexcel] cantidad de filas:', datos.length)
  console.log('[exportaraexcel] columnas:', JSON.stringify(columnas))
  console.log('[exportaraexcel] primeros 5 registros:', JSON.stringify(datos.slice(0, 5), null, 2))

  // Mapear los datos solo a las columnas que queremos mostrar
  const datosFiltrados = datos.map(item => {
    const fila: any = {}
    columnas.forEach(col => {
      fila[col.header] = item[col.key] !== undefined ? item[col.key] : ''
    })
    return fila
  })

  console.log('[exportaraexcel] datos filtrados (primeros 5):', JSON.stringify(datosFiltrados.slice(0, 5), null, 2))

  // Crear hoja de calculo desde el array de objetos
  const ws = XLSX.utils.json_to_sheet(datosFiltrados)

  // Crear libro y agregar la hoja
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Datos')

  // Convertir el libro a base64 (para poder escribirlo como archivo)
  const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' })

  console.log('[exportaraexcel] exportando:', nombreArchivo)

  // --- Guardar archivo localmente usando StorageAccessFramework ---
  // 1. Pedir permiso al usuario para acceder a un directorio (Downloads, Drive, etc.)
  const perms = await StorageAccessFramework.requestDirectoryPermissionsAsync()
  if (!perms.granted) {
    throw Error("Permiso denegado para guardar el archivo. Selecciona un directorio.")
  }

  // 2. Crear el archivo en el directorio seleccionado
  const mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  const fileUri = await StorageAccessFramework.createFileAsync(
    perms.directoryUri,
    nombreArchivo,
    mimeType
  )

  // 3. Escribir el contenido base64 al archivo
  await StorageAccessFramework.writeAsStringAsync(fileUri, wbout, {
    encoding: FileSystem.EncodingType.Base64,
  })

  console.log('[exportaraexcel] archivo guardado en:', fileUri)
}

/*
Exportar Inventario Completo:
    Entrada: Ninguna, toma todo el inventario de Firestore.
    Seguridad: Se verifica que el usuario sea user.rol==Almacenista o user.rol==gerenciaLocal.
    Proceso: Obtiene inventario, modelos y sedes, junta todo, y exporta a Excel.
    Salida: Un archivo .xlsx con todo el inventario.
*/
export async function exportarInventarioCompleto(): Promise<void> {
  const usuario = auth().currentUser
  if (!usuario) throw Error("Usuario No Autenticado")

  console.log('[exportarinventariocompleto] usuario uid:', usuario.uid)

  // Seguridad: verificar rol Almacenista o GerenciaLocal
  const esAlmacenista = await serviceAuth.verificarRolUsuario('almacenista')
  const esGerencia = await serviceAuth.verificarRolUsuario('gerenciaLocal')
  console.log('[exportarinventariocompleto] rol almacenista:', esAlmacenista)
  console.log('[exportarinventariocompleto] rol gerencia:', esGerencia)
  if (!esAlmacenista && !esGerencia) throw Error("Permisos insuficientes")

  // Obtener datos de Firestore
  const inventario = await getColeccion('inventario')
  const modelos = await getColeccion('modelos')
  const sedes = await getColeccion('sedes')

  console.log('[exportarinventariocompleto] inventario crudo:', JSON.stringify(inventario, null, 2))
  console.log('[exportarinventariocompleto] modelos crudo:', JSON.stringify(modelos, null, 2))
  console.log('[exportarinventariocompleto] sedes crudo:', JSON.stringify(sedes, null, 2))

  // Juntar todo: por cada item del inventario, buscar su modelo y sede
  const datos = inventario.map((item: any) => {
    const modelo = modelos.find((m: any) => m.id === item.modeloId)
    const sede = sedes.find((s: any) => s.id === item.sedeId)
    return {
      modelo: modelo ? modelo.nombreIdentificador : 'Sin modelo',
      codigoModelo: modelo ? modelo.codigoModelo : 'Sin codigo',
      marca: modelo ? modelo.marca : 'Sin marca',
      cantidad: item.cantidad || 0,
      sede: sede ? sede.nombre : 'Sin sede',
      disponible: item.disponible ? 'Si' : 'No',
    }
  })

  console.log('[exportarinventariocompleto] datos procesados:', JSON.stringify(datos, null, 2))

  // Definir las columnas del Excel
  const columnas: ColumnaExportacion[] = [
    { header: 'Modelo', key: 'modelo' },
    { header: 'Codigo', key: 'codigoModelo' },
    { header: 'Marca', key: 'marca' },
    { header: 'Cantidad', key: 'cantidad' },
    { header: 'Sede', key: 'sede' },
    { header: 'Disponible', key: 'disponible' },
  ]

  console.log('[exportarinventariocompleto] columnas:', JSON.stringify(columnas))

  await exportarAExcel(datos, 'inventario_completo.xlsx', columnas)
}

/*
Exportar Inventario por Sede:
    Entrada: Ninguna, toma todo el inventario de Firestore.
    Seguridad: Se verifica que el usuario sea user.rol==Almacenista o user.rol==gerenciaLocal.
    Proceso: Obtiene inventario, lo agrupa por sede, ordena, y exporta a Excel.
    Salida: Un archivo .xlsx con el inventario ordenado por sede.
*/
export async function exportarInventarioPorSede(): Promise<void> {
  const usuario = auth().currentUser
  if (!usuario) throw Error("Usuario No Autenticado")

  console.log('[exportarinventarioporsede] usuario uid:', usuario.uid)

  // Seguridad: verificar rol
  const esAlmacenista = await serviceAuth.verificarRolUsuario('almacenista')
  const esGerencia = await serviceAuth.verificarRolUsuario('gerenciaLocal')
  console.log('[exportarinventarioporsede] rol almacenista:', esAlmacenista)
  console.log('[exportarinventarioporsede] rol gerencia:', esGerencia)
  if (!esAlmacenista && !esGerencia) throw Error("Permisos insuficientes")

  // Obtener datos de Firestore
  const inventario = await getColeccion('inventario')
  const modelos = await getColeccion('modelos')
  const sedes = await getColeccion('sedes')

  console.log('[exportarinventarioporsede] inventario crudo:', JSON.stringify(inventario, null, 2))
  console.log('[exportarinventarioporsede] modelos crudo:', JSON.stringify(modelos, null, 2))
  console.log('[exportarinventarioporsede] sedes crudo:', JSON.stringify(sedes, null, 2))

  // Juntar todo
  const datos = inventario.map((item: any) => {
    const modelo = modelos.find((m: any) => m.id === item.modeloId)
    const sede = sedes.find((s: any) => s.id === item.sedeId)
    return {
      sede: sede ? sede.nombre : 'Sin sede',
      modelo: modelo ? modelo.nombreIdentificador : 'Sin modelo',
      codigoModelo: modelo ? modelo.codigoModelo : 'Sin codigo',
      marca: modelo ? modelo.marca : 'Sin marca',
      cantidad: item.cantidad || 0,
      disponible: item.disponible ? 'Si' : 'No',
    }
  })

  // Ordenar por sede
  datos.sort((a: any, b: any) => a.sede.localeCompare(b.sede))

  console.log('[exportarinventarioporsede] datos procesados:', JSON.stringify(datos, null, 2))

  const columnas: ColumnaExportacion[] = [
    { header: 'Sede', key: 'sede' },
    { header: 'Modelo', key: 'modelo' },
    { header: 'Codigo', key: 'codigoModelo' },
    { header: 'Marca', key: 'marca' },
    { header: 'Cantidad', key: 'cantidad' },
    { header: 'Disponible', key: 'disponible' },
  ]

  console.log('[exportarinventarioporsede] columnas:', JSON.stringify(columnas))

  await exportarAExcel(datos, 'inventario_por_sede.xlsx', columnas)
}

/*
Exportar Inventario por Marca:
    Entrada: Ninguna, toma todo el inventario de Firestore.
    Seguridad: Se verifica que el usuario sea user.rol==Almacenista o user.rol==gerenciaLocal.
    Proceso: Obtiene inventario, lo agrupa por marca, ordena, y exporta a Excel.
    Salida: Un archivo .xlsx con el inventario ordenado por marca.
*/
export async function exportarInventarioPorMarca(): Promise<void> {
  const usuario = auth().currentUser
  if (!usuario) throw Error("Usuario No Autenticado")

  console.log('[exportarinventariopormarca] usuario uid:', usuario.uid)

  // Seguridad: verificar rol
  const esAlmacenista = await serviceAuth.verificarRolUsuario('almacenista')
  const esGerencia = await serviceAuth.verificarRolUsuario('gerenciaLocal')
  console.log('[exportarinventariopormarca] rol almacenista:', esAlmacenista)
  console.log('[exportarinventariopormarca] rol gerencia:', esGerencia)
  if (!esAlmacenista && !esGerencia) throw Error("Permisos insuficientes")

  const inventario = await getColeccion('inventario')
  const modelos = await getColeccion('modelos')
  const sedes = await getColeccion('sedes')

  console.log('[exportarinventariopormarca] inventario crudo:', JSON.stringify(inventario, null, 2))
  console.log('[exportarinventariopormarca] modelos crudo:', JSON.stringify(modelos, null, 2))
  console.log('[exportarinventariopormarca] sedes crudo:', JSON.stringify(sedes, null, 2))

  const datos = inventario.map((item: any) => {
    const modelo = modelos.find((m: any) => m.id === item.modeloId)
    const sede = sedes.find((s: any) => s.id === item.sedeId)
    return {
      marca: modelo ? modelo.marca : 'Sin marca',
      modelo: modelo ? modelo.nombreIdentificador : 'Sin modelo',
      codigoModelo: modelo ? modelo.codigoModelo : 'Sin codigo',
      cantidad: item.cantidad || 0,
      sede: sede ? sede.nombre : 'Sin sede',
      disponible: item.disponible ? 'Si' : 'No',
    }
  })

  // Ordenar por marca
  datos.sort((a: any, b: any) => a.marca.localeCompare(b.marca))

  console.log('[exportarinventariopormarca] datos procesados:', JSON.stringify(datos, null, 2))

  const columnas: ColumnaExportacion[] = [
    { header: 'Marca', key: 'marca' },
    { header: 'Modelo', key: 'modelo' },
    { header: 'Codigo', key: 'codigoModelo' },
    { header: 'Cantidad', key: 'cantidad' },
    { header: 'Sede', key: 'sede' },
    { header: 'Disponible', key: 'disponible' },
  ]

  console.log('[exportarinventariopormarca] columnas:', JSON.stringify(columnas))

  await exportarAExcel(datos, 'inventario_por_marca.xlsx', columnas)
}

/*
Exportar Usuarios:
    Entrada: Ninguna, toma todos los usuarios de Firestore.
    Seguridad: Se verifica que el usuario sea user.rol==gerenciaLocal.
    Proceso: Obtiene usuarios, los ordena por nombre, y exporta a Excel.
    Salida: Un archivo .xlsx con todos los usuarios.
*/
export async function exportarUsuarios(): Promise<void> {
  const usuario = auth().currentUser
  if (!usuario) throw Error("Usuario No Autenticado")

  console.log('[exportarusuarios] usuario uid:', usuario.uid)

  // Seguridad: verificar rol GerenciaLocal
  const esGerencia = await serviceAuth.verificarRolUsuario('gerenciaLocal')
  console.log('[exportarusuarios] rol gerencia:', esGerencia)
  if (!esGerencia) throw Error("Permisos insuficientes")

  const usuarios = await getColeccion('usuarios')
  const sedes = await getColeccion('sedes')

  console.log('[exportarusuarios] usuarios crudo:', JSON.stringify(usuarios, null, 2))
  console.log('[exportarusuarios] sedes crudo:', JSON.stringify(sedes, null, 2))

  const datos = usuarios.map((u: any) => {
    const sede = sedes.find((s: any) => s.id === u.sede)
    return {
      nombre: u.nombre || '',
      email: u.email || '',
      rol: u.rol || '',
      sede: sede ? sede.nombre : 'Sin sede',
      activo: u.activo !== false ? 'Si' : 'No',
    }
  })

  // Ordenar por nombre
  datos.sort((a: any, b: any) => a.nombre.localeCompare(b.nombre))

  console.log('[exportarusuarios] datos procesados:', JSON.stringify(datos, null, 2))

  const columnas: ColumnaExportacion[] = [
    { header: 'Nombre', key: 'nombre' },
    { header: 'Email', key: 'email' },
    { header: 'Rol', key: 'rol' },
    { header: 'Sede', key: 'sede' },
    { header: 'Activo', key: 'activo' },
  ]

  console.log('[exportarusuarios] columnas:', JSON.stringify(columnas))

  await exportarAExcel(datos, 'usuarios.xlsx', columnas)
}

/*
Exportar Asistencias:
    Entrada: Ninguna, toma todas las asistencias de Firestore.
    Seguridad: Se verifica que el usuario sea user.rol==gerenciaLocal.
    Proceso: Obtiene asistencias, une nombres de usuario, ordena por fechaEntrada, y exporta a Excel.
    Salida: Un archivo .xlsx con todas las asistencias.
*/
export async function exportarAsistencias(): Promise<void> {
  const usuario = auth().currentUser
  if (!usuario) throw Error("Usuario No Autenticado")

  console.log('[exportarasistencias] usuario uid:', usuario.uid)

  // Seguridad: verificar rol GerenciaLocal
  const esGerencia = await serviceAuth.verificarRolUsuario('gerenciaLocal')
  console.log('[exportarasistencias] rol gerencia:', esGerencia)
  if (!esGerencia) throw Error("Permisos insuficientes")

  const asistencias = await getColeccion('asistencias')
  const usuarios = await getColeccion('usuarios')

  console.log('[exportarasistencias] asistencias crudo:', JSON.stringify(asistencias, null, 2))
  console.log('[exportarasistencias] usuarios crudo:', JSON.stringify(usuarios, null, 2))

  const datos = asistencias.map((a: any) => {
    const usuarioA = usuarios.find((u: any) => u.id === a.usuarioId)
    return {
      nombre: usuarioA ? usuarioA.nombre : 'Sin usuario',
      email: usuarioA ? usuarioA.email : 'Sin email',
      fechaEntrada: a.fechaEntrada || '',
      fechaSalida: a.fechaSalida || '',
      horas: a.horas || '',
      metodoMarcaje: a.metodoMarcaje || '',
    }
  })

  // Ordenar por fecha de entrada (usar String por si fechaEntrada es un Timestamp)
  datos.sort((a: any, b: any) => String(a.fechaEntrada).localeCompare(String(b.fechaEntrada)))

  console.log('[exportarasistencias] datos procesados:', JSON.stringify(datos, null, 2))

  const columnas: ColumnaExportacion[] = [
    { header: 'Nombre', key: 'nombre' },
    { header: 'Email', key: 'email' },
    { header: 'Fecha Entrada', key: 'fechaEntrada' },
    { header: 'Fecha Salida', key: 'fechaSalida' },
    { header: 'Horas', key: 'horas' },
    { header: 'Metodo Marcaje', key: 'metodoMarcaje' },
  ]

  console.log('[exportarasistencias] columnas:', JSON.stringify(columnas))

  await exportarAExcel(datos, 'asistencias.xlsx', columnas)
}

/*
Exportar Envios:
    Entrada: Ninguna, toma todos los movimientos de inventario de Firestore.
    Seguridad: Se verifica que el usuario sea user.rol==gerenciaLocal.
    Proceso: Obtiene movimientos, une datos de sede origen/destino, modelo, creadoPor y aprobadoPor
             (resolviendo UIDs a nombres de usuario), formatea Timestamps, y exporta a Excel.
    Salida: Un archivo .xlsx con todos los envios.
*/
export async function exportarEnvios(): Promise<void> {
  const usuario = auth().currentUser
  if (!usuario) throw Error("Usuario No Autenticado")

  console.log('[exportarenvios] usuario uid:', usuario.uid)

  // Seguridad: verificar rol GerenciaLocal
  const esGerencia = await serviceAuth.verificarRolUsuario('gerenciaLocal')
  console.log('[exportarenvios] rol gerencia:', esGerencia)
  if (!esGerencia) throw Error("Permisos insuficientes")

  const movimientos = await getColeccion('movimientoInventario')
  const sedes = await getColeccion('sedes')
  const inventario = await getColeccion('inventario')
  const modelos = await getColeccion('modelos')
  const usuarios = await getColeccion('usuarios')

  console.log('[exportarenvios] movimientos crudo:', JSON.stringify(movimientos, null, 2))
  console.log('[exportarenvios] sedes crudo:', JSON.stringify(sedes, null, 2))
  console.log('[exportarenvios] inventario crudo:', JSON.stringify(inventario, null, 2))
  console.log('[exportarenvios] modelos crudo:', JSON.stringify(modelos, null, 2))
  console.log('[exportarenvios] usuarios crudo:', JSON.stringify(usuarios, null, 2))

  // Funcion auxiliar para formatear Timestamps de Firestore a string legible
  const formatearTimestamp = (ts: any): string => {
    if (!ts) return ''
    if (ts.toDate && typeof ts.toDate === 'function') {
      return ts.toDate().toLocaleString()
    }
    return String(ts)
  }

  const datos = movimientos.map((m: any) => {
    const sedeOrigen = sedes.find((s: any) => s.id === m.sedeOrigenId)
    const sedeDestino = sedes.find((s: any) => s.id === m.sedeDestinoId)
    const itemInventario = inventario.find((inv: any) => inv.id === m.inventarioId)
    const modelo = itemInventario ? modelos.find((mod: any) => mod.id === itemInventario.modeloId) : null
    const creadoPor = usuarios.find((u: any) => u.id === m.creadoPor)
    const aprobadoPor = usuarios.find((u: any) => u.id === m.aprobadoPor)

    return {
      sedeOrigen: sedeOrigen ? sedeOrigen.nombre : 'Sin sede',
      sedeDestino: sedeDestino ? sedeDestino.nombre : 'Sin sede',
      modelo: modelo ? modelo.nombreIdentificador : 'Sin modelo',
      cantidad: m.cantidad || 0,
      creadoPor: creadoPor ? creadoPor.nombre : 'Sin creador',
      aprobado: m.aprobado ? 'Si' : 'No',
      aprobadoPor: aprobadoPor ? aprobadoPor.nombre : 'Sin aprobador',
      creadoEn: formatearTimestamp(m.creadoEn),
    }
  })

  // Ordenar por fecha de creacion
  datos.sort((a: any, b: any) => String(a.creadoEn).localeCompare(String(b.creadoEn)))

  console.log('[exportarenvios] datos procesados:', JSON.stringify(datos, null, 2))

  const columnas: ColumnaExportacion[] = [
    { header: 'Sede Origen', key: 'sedeOrigen' },
    { header: 'Sede Destino', key: 'sedeDestino' },
    { header: 'Modelo', key: 'modelo' },
    { header: 'Cantidad', key: 'cantidad' },
    { header: 'Creado Por', key: 'creadoPor' },
    { header: 'Aprobado', key: 'aprobado' },
    { header: 'Aprobado Por', key: 'aprobadoPor' },
    { header: 'Creado En', key: 'creadoEn' },
  ]

  console.log('[exportarenvios] columnas:', JSON.stringify(columnas))

  await exportarAExcel(datos, 'envios.xlsx', columnas)
}
