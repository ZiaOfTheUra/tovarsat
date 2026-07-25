/**
 * Configuración de Firebase para React Native.
 * Usa @react-native-firebase para acceso nativo.
 */
import app from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

/**
 * Configuración REAL del proyecto tovartest2.
 * Extraída de google-services.json existente en el proyecto.
 */
const firebaseConfig = {
  apiKey: 'AIzaSyBLlHWYoDw5Di6_NUKikpcqBUP-xa--44Q',
  authDomain: 'tovartest2.firebaseapp.com',
  projectId: 'tovartest2',
  storageBucket: 'tovartest2.firebasestorage.app',
  messagingSenderId: '10497829788',
  appId: '1:10497829788:android:486506efde2195d212b659',
}

let firebaseApp: any = null

/**
 * Inicializa Firebase para React Native.
 * Los módulos nativos se inicializan automáticamente por el plugin.
 */
export function inicializarFirebase() {
  if (!firebaseApp) {
    // Inicializar app (usa la configuración nativa de google-services.json)
    firebaseApp = app.loadApp(firebaseConfig)
  }

  return {
    app: firebaseApp,
    auth: auth(),
    db: firestore()
  }
}