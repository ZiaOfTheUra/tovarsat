/**
 * Servicio genérico de Firestore.
 * Proporciona funciones CRUD reutilizables para toda la app.
 */

import firestore, { WhereFilterOp } from '@react-native-firebase/firestore'

// Obtiene todos los documentos de una colección.
export async function getColeccion(coleccion: string): Promise<any[]> {
  const snapshot = await firestore().collection(coleccion).get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

// Obtiene un documento por ID.
export async function getDocumento(coleccion: string, docId: string): Promise<any> {
  const doc = await firestore().collection(coleccion).doc(docId).get()
  if (!doc.exists) return null
  return { id: doc.id, ...doc.data() }
}

// Crea un documento con ID automático.
export async function crearDocumento(coleccion: string, datos: Record<string, any>): Promise<string> {
  const ref = await firestore().collection(coleccion).add(datos)
  return ref.id
}

// Actualiza un documento por ID.
export async function actualizarDocumento(coleccion: string, docId: string, datos: Record<string, any>): Promise<void> {
  await firestore().collection(coleccion).doc(docId).update(datos)
}

// Elimina un documento por ID.
export async function eliminarDocumento(coleccion: string, docId: string): Promise<void> {
  await firestore().collection(coleccion).doc(docId).delete()
}

// Obtiene documentos que cumplan un filtro.
export async function getDonde(coleccion: string, campo: string, operador: WhereFilterOp, valor: any): Promise<any[]> {
  const snapshot = await firestore().collection(coleccion).where(campo, operador, valor).get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}
