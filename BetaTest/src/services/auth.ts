/**
 * Servicio de autenticación.
 * Usa @react-native-firebase/auth para acceso nativo.
 */
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


export type AuthCallback = (user: any | null) => void

/**
 * Inicia sesión con email y contraseña.
 * @param email - Correo electrónico del usuario
 * @param password - Contraseña del usuario
 * @returns El usuario autenticado
 */
export async function iniciarSesion(email: string, password: string): Promise<any> {
  try {
    const resultado = await auth().signInWithEmailAndPassword(email, password)
    console.log('✅ Sesión iniciada para:', resultado.user.email)
    return resultado.user
  } catch (error: any) {
    console.error('❌ Error al iniciar sesión:', error.code)
    
    // Traducir errores comunes de Firebase
    switch (error.code) {
      case 'auth/user-not-found':
        throw new Error('No existe una cuenta con este correo electrónico')
      case 'auth/wrong-password':
        throw new Error('Contraseña incorrecta')
      case 'auth/invalid-email':
        throw new Error('El formato del correo electrónico no es válido')
      case 'auth/too-many-requests':
        throw new Error('Demasiados intentos. Intenta de nuevo más tarde')
      default:
        throw new Error('Error al iniciar sesión. Verifica tus credenciales')
    }
  }
}

/**
 * Cierra la sesión del usuario actual.
 * No lanza error si no hay usuario autenticado.
 */
export async function cerrarSesion(): Promise<void> {
  try {
    const usuario = auth().currentUser
    if (!usuario) {
      console.log('ℹ️ No hay usuario autenticado para cerrar sesión')
      return
    }
    await auth().signOut()
    console.log('✅ Sesión cerrada correctamente')
  } catch (error) {
    console.error('❌ Error al cerrar sesión:', error)
    throw new Error('Error al cerrar sesión')
  }
}

export async function verificarRolUsuario(rolRequerido: string): Promise<boolean> {
  const usuarioActual = auth().currentUser
  if (!usuarioActual) return false

  const doc = await firestore().collection('usuarios').doc(usuarioActual.uid).get()
  const data = doc.data()
  if (!data) return false
  if (data.activo === false) return false

  return data.rol === rolRequerido
}

/**
 * Escucha los cambios en el estado de autenticación.

 */
export function escucharEstadoAuth(callback: AuthCallback): () => void {
  return auth().onAuthStateChanged((usuario) => {
    callback(usuario)
  })
}


/**
 * Obtiene el usuario actual si existe.
 */
export function obtenerUsuarioActual(): any | null {
  return auth().currentUser
}