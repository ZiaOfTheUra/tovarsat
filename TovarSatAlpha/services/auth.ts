import auth from '@react-native-firebase/auth';
import type { Usuario } from '@/types';

// Iniciar sesión con correo y contraseña
export async function loginWithEmail(email: string, password: string) {
  const credential = await auth().signInWithEmailAndPassword(email, password);
  return credential.user;
}

// Cerrar sesión del usuario actual
export async function logout() {
  await auth().signOut();
}

// Escuchar cambios en el estado de autenticación
export function onAuthChanged(callback: (user: Usuario | null) => void) {
  return auth().onAuthStateChanged(async (firebaseUser) => {
    if (!firebaseUser) {
      callback(null);
      return;
    }

    // Construir un Usuario parcial desde el usuario de Firebase Auth
    const user: Usuario = {
      uid: firebaseUser.uid,
      nombre: firebaseUser.displayName || '',
      email: firebaseUser.email || '',
      rol: 'oficinista', // placeholder — el rol real viene de Firestore
      sede: '',
      activo: true,
    };
    callback(user);
  });
}

// Obtener el usuario actual de Firebase Auth (síncrono)
export function getCurrentUser() {
  return auth().currentUser;
}

// Crear un nuevo usuario en Firebase Auth con correo y contraseña
export async function createAuthUser(email: string, password: string): Promise<string> {
  const credential = await auth().createUserWithEmailAndPassword(email, password);
  return credential.user.uid;
}
