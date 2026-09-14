import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import * as serviceAuth from '@/services/auth'
import * as LocalAuthentication from 'expo-local-authentication'

// Tipos para que typescript sepa que esperar

export type ArchivoJustificativo = {
  nombre: string
  mimeType: string
  tamanio: number
  uri: string
}

export type DatosDiaExonerado = {
  uidUsuario: string
  fecha: string
  motivo: string
  justificativo?: ArchivoJustificativo
}

export type DiaExonerado = {
  id: string
  uidUsuario: string
  nombre: string
  fecha: string
  motivo: string
  justificativoNombre: string
}

/* 
Crear Día Exonerado: 
    Entrada: El UID del usuario exonerado, una fecha, un motivo, y opcionalmente un archivo
             de justificativo seleccionado con expo-document-picker.
    Seguridad: Se verifica que el usuario sea user.rol==gerenciaLocal. Se pide autenticación biométrica.
    Proceso: Se registra el día exonerado del usuario objetivo (Gerencia Local exonera a terceros).
             El adjunto se guarda como metadatos del archivo seleccionado (nombre, tipo, tamaño, uri).
             La subida real del archivo a un bucket (Firebase Storage) queda como mejora pendiente.
    Salida: Una entrada en la colección de asistencias (con diasExonerado: true) en el Firestore.
*/
export async function crearDiaExonerado(datos: DatosDiaExonerado): Promise<{ id: string; message: string }> {
  const usuario = auth().currentUser
  if (!usuario) throw Error("Usuario No Autenticado")

  // Seguridad: verificar rol GerenciaLocal
  const esGerenciaLocal = await serviceAuth.verificarRolUsuario('gerenciaLocal')
  if (!esGerenciaLocal) throw Error("Permisos insuficientes")

  // Autenticación biométrica
  const biometricAuth = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Autenticación biométrica requerida',
  })
  if (!biometricAuth.success) {
    throw Error("Autenticación biométrica fallida")
  }

  // Registrar el día exonerado directamente en la colección de asistencias
  // (con diasExonerado: true) para que aparezca en verAsistencias y en la exportación
  const [anio, mes, dia] = datos.fecha.split('-').map(Number)
  const fechaExonerada = new Date(anio, mes - 1, dia, 8, 0, 0)

  const ref = await firestore().collection('asistencias').add({
    uid: datos.uidUsuario,
    turno: 'manana',
    fechaEntrada: firestore.Timestamp.fromDate(fechaExonerada),
    fechaSalida: firestore.Timestamp.fromDate(fechaExonerada),
    fechaSalidaReal: null,
    tipoSalida: 'automatica',
    horas: 0,
    tiempoIncompleto: false,
    diasExonerado: true,
    metodoMarcaje: 'exoneracion',
    motivo: datos.motivo,
    justificativoNombre: datos.justificativo?.nombre || '',
    justificativoMimeType: datos.justificativo?.mimeType || '',
    justificativoTamanio: datos.justificativo?.tamanio || 0,
    justificativoUri: datos.justificativo?.uri || '',
    creadoPor: usuario.uid,
    creadoEn: firestore.Timestamp.now(),
  })

  console.log("Día exonerado creado correctamente")
  return { id: ref.id, message: 'Día exonerado creado correctamente' }
}
/* 
Listar Días Exonerados:
    Seguridad: No requiere rol especial, pero el alcance depende de quién pregunta:
               - GerenciaLocal: ve los de toda su sede.
               - Otro rol: ve solo los suyos.
    Proceso: Obtiene los días exonerados y une el nombre del usuario de cada uno.
    Salida: Una lista de días exonerados.
*/
export async function listarDiasExonerados(): Promise<DiaExonerado[]> {
  const usuario = auth().currentUser
  if (!usuario) throw Error("Usuario No Autenticado")

  // tomamos los datos del usuario para saber su rol y sede
  const usuarioDoc = await firestore()
    .collection('usuarios')
    .doc(usuario.uid)
    .get()

  const datosUsuario = usuarioDoc.data()
  const rol = datosUsuario?.rol
  const sedeRequest = datosUsuario?.sede

  let listaExonerados: any[] = []
  // mapa de uid -> nombre para poner el nombre real del usuario de cada fila
  let mapaNombres: Record<string, string> = {}

  if (rol == "gerenciaLocal") {
    // buscando todos los usuarios de la sede del gerente
    const snapshot1 = await firestore()
      .collection('usuarios')
      .where('sede', '==', sedeRequest)
      .get()
    const listaFiltrada = snapshot1.docs.map(doc => doc.id)
    snapshot1.docs.forEach(doc => {
      mapaNombres[doc.id] = doc.data().nombre || ''
    })
    // firestore solo admite un max de 10 uids por query 'in', asi que partimos
    // la lista en grupos de 10 y juntamos todos los resultados
    const docsAcumulados: any[] = []
    for (let i = 0; i < listaFiltrada.length; i += 10) {
      const grupo = listaFiltrada.slice(i, i + 10)
      const snap = await firestore()
        .collection('asistencias')
        .where('uid', 'in', grupo)
        .where('diasExonerado', '==', true)
        .get()
      docsAcumulados.push(...snap.docs)
    }
    listaExonerados = docsAcumulados
  } else {
    // de otra forma solamente los del propio usuario
    mapaNombres[usuario.uid] = datosUsuario?.nombre || ''
    const snap = await firestore()
      .collection('asistencias')
      .where('uid', '==', usuario.uid)
      .where('diasExonerado', '==', true)
      .get()
    listaExonerados = snap.docs
  }

  return listaExonerados.map(doc => {
    const d = doc.data()
    const fechaEntrada = d.fechaEntrada?.toDate?.()
    return {
      id: doc.id,
      uidUsuario: d.uid || '',
      nombre: mapaNombres[d.uid] || '',
      fecha: fechaEntrada ? fechaEntrada.toISOString().split('T')[0] : '',
      motivo: d.motivo || '',
      justificativoNombre: d.justificativoNombre || '',
    }
  })
}

/* 
Eliminar Día Exonerado: 
    Entrada: Un ID de día exonerado.
    Seguridad: Se verifica que el usuario sea user.rol==gerenciaLocal. Se pide autenticación biométrica.
    Proceso: Se elimina el documento del día exonerado en Firestore.
    Salida: El documento eliminado de la colección de asistencias en el Firestore.
*/
export async function eliminarDiaExonerado(exoneradoId: string): Promise<{ message: string }> {
  const usuario = auth().currentUser
  if (!usuario) throw Error("Usuario No Autenticado")

  // Seguridad: verificar rol GerenciaLocal
  const esGerenciaLocal = await serviceAuth.verificarRolUsuario('gerenciaLocal')
  if (!esGerenciaLocal) throw Error("Permisos insuficientes")

  // Autenticación biométrica
  const biometricAuth = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Autenticación biométrica requerida',
  })
  if (!biometricAuth.success) {
    throw Error("Autenticación biométrica fallida")
  }

  await firestore().collection('asistencias').doc(exoneradoId).delete()

  console.log("Día exonerado eliminado correctamente")
  return { message: 'Día exonerado eliminado correctamente' }
}

// Obtiene todos los usuarios (para el selector del gerente) con el formato que esperan los formularios
export async function obtenerUsuariosSede(): Promise<{ label: string; value: string }[]> {
  const usuario = auth().currentUser
  if (!usuario) throw Error("Usuario No Autenticado")

  const usuarioDoc = await firestore()
    .collection('usuarios')
    .doc(usuario.uid)
    .get()
  const rol = usuarioDoc.data()?.rol
  const sedeRequest = usuarioDoc.data()?.sede

  if (rol !== 'gerenciaLocal') {
    return []
  }

  const snapshot = await firestore()
    .collection('usuarios')
    .where('sede', '==', sedeRequest)
    .get()

  // excluir al propio gerente para que no se exonere a sí mismo
  return snapshot.docs
    .filter(doc => doc.id !== usuario.uid)
    .map(doc => ({
      label: doc.data().nombre || 'Sin nombre',
      value: doc.id,
    }))
}