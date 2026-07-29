import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import * as serviceAuth from '@/services/auth'
import * as LocalAuthentication from 'expo-local-authentication'
import { getColeccion } from '@/services/firestore'

// Tipos para que typescript sepa que esperar
export type DatosRegistroUsuario = {
  nombre: string
  email: string
  password: string
  rol: string
  sedeId: string
  activo: boolean
}

export type Rol = { id: string; nombre: string }
export type Sede = { id: string; nombre: string; direccion: string }
export type Usuario = {
  id: string
  nombre: string
  email: string
  rol: string
  sede: string
  activo: boolean
}

/* 
Crear Usuario: 
    Entrada: Un nombre, un email, una contraseña, un rol, una sede, un booleano de activo, y la contraseña del admin actual.
    Seguridad: Se verifica que el usuario sea user.rol==gerenciaLocal. Se pide autenticación biométrica.
    Proceso: Se crea el usuario en Firebase Auth, se guardan los datos en Firestore con el UID generado, y se restaura la sesión del admin.
    Salida: Una entrada en Firebase Auth y una en la colección de Usuarios en el Firestore.
*/
export async function crearUsuario(
  datos: DatosRegistroUsuario,
  adminPassword: string
): Promise<{ uid: string; message: string }> {
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

  const adminEmail = usuario.email
  if (!adminEmail) throw Error("El admin no tiene email registrado")

  // Crear usuario en Firebase Auth (la sesión cambia al nuevo usuario automáticamente)
  const credencial = await auth().createUserWithEmailAndPassword(datos.email, datos.password)
  const newUid = credencial.user.uid

  // Guardar datos en Firestore usando el UID del nuevo usuario como ID del documento
  await firestore().collection('usuarios').doc(newUid).set({
    nombre: datos.nombre,
    email: datos.email,
    rol: datos.rol,
    sede: datos.sedeId,
    activo: datos.activo,
  })

  // Restaurar sesión del admin que estaba logueado antes
  await auth().signInWithEmailAndPassword(adminEmail, adminPassword)

  console.log("Usuario creado correctamente")
  return { uid: newUid, message: 'Usuario creado correctamente' }
}

/* 
Editar Usuario: 
    Entrada: Un UID de usuario, un nombre, un email, un rol, una sede, un booleano de activo.
    Seguridad: Se verifica que el usuario sea user.rol==gerenciaLocal. Se pide autenticación biométrica.
    Proceso: Se actualizan los datos del usuario en Firestore.
    Salida: Una entrada actualizada en la colección de Usuarios en el Firestore.
*/
export async function editarUsuario(uid: string, datos: Partial<DatosRegistroUsuario>): Promise<{ message: string }> {
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

  // Mandamos los datos directo, Firestore solo actualiza los campos que vienen
  await firestore().collection('usuarios').doc(uid).update(datos as any)

  console.log("Usuario editado correctamente")
  return { message: 'Usuario actualizado correctamente' }
}

/* 
Eliminar Usuario: 
    Entrada: Un UID de usuario.
    Seguridad: Se verifica que el usuario sea user.rol==gerenciaLocal. Se pide autenticación biométrica.
    Proceso: Se elimina el documento del usuario en Firestore.
    Salida: El documento eliminado de la colección de Usuarios en el Firestore.
*/
export async function eliminarUsuario(uid: string): Promise<{ message: string }> {
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

  await firestore().collection('usuarios').doc(uid).delete()

  console.log("Usuario eliminado correctamente")
  return { message: 'Usuario eliminado correctamente' }
}

// Trae todos los usuarios de Firestore y los devuelve como lista
export async function obtenerUsuarios(): Promise<Usuario[]> {
  const snapshot = await firestore().collection('usuarios').get()
  return snapshot.docs.map((doc) => {
    const d = doc.data() as any
    return {
      id: doc.id,
      nombre: d.nombre || '',
      email: d.email || '',
      rol: d.rol || '',
      sede: d.sede || '',
      activo: d.activo !== false,
    }
  })
}

// Roles hardcodeados porque solo tenemos tres niveles
export async function obtenerRoles(): Promise<Rol[]> {
  return [
    { id: 'gerenciaLocal', nombre: 'Gerencia Local' },
    { id: 'almacenista', nombre: 'Almacenista' },
    { id: 'oficinista', nombre: 'Oficinista' },
  ]
}

// Trae todas las sedes de Firestore
export async function obtenerSedesRegistro(): Promise<Sede[]> {
  const sedesSnapshot = await getColeccion('sedes')
  return sedesSnapshot.map((doc: any) => ({
    id: doc.id,
    nombre: doc.nombre || '',
    direccion: doc.direccion || '',
  }))
}