import firestore from '@react-native-firebase/firestore';
import { COLLECTIONS } from '@/config';

type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

/**
 * Get a Firestore collection reference by name.
 */
export function getCollection(name: CollectionName) {
  console.log('[firestore] getCollection:', name);
  return firestore().collection(name);
}

/**
 * Get a Firestore document reference by collection and document ID.
 */
export function getDocRef(collection: CollectionName, id: string) {
  console.log('[firestore] getDocRef:', collection, id);
  return firestore().collection(collection).doc(id);
}

/**
 * Fetch all documents from a collection as plain objects.
 */
export async function fetchAll<T extends Record<string, any>>(collection: CollectionName): Promise<(T & { id: string })[]> {
  console.log('[firestore] fetchAll:', collection);
  const snapshot = await firestore().collection(collection).get();
  const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T & { id: string });
  console.log('[firestore] fetchAll:', collection, '→', docs.length, 'docs');
  return docs;
}

/**
 * Fetch a single document by ID. Returns null if not found.
 */
export async function fetchById<T extends Record<string, any>>(collection: CollectionName, id: string): Promise<(T & { id: string }) | null> {
  console.log('[firestore] fetchById:', collection, id);
  const doc = await firestore().collection(collection).doc(id).get();
  if (!doc.exists) {
    console.log('[firestore] fetchById:', collection, id, '→ null');
    return null;
  }
  const result = { id: doc.id, ...doc.data() } as T & { id: string };
  console.log('[firestore] fetchById:', collection, id, '→ found');
  return result;
}

/**
 * Add a new document with auto-generated ID. Returns the new document ID.
 */
export async function addDocument<T extends Record<string, any>>(collection: CollectionName, data: T): Promise<string> {
  console.log('[firestore] addDocument:', collection, data);
  const ref = await firestore().collection(collection).add(data);
  console.log('[firestore] addDocument:', collection, '→ id:', ref.id);
  return ref.id;
}

/**
 * Set (create or overwrite) a document by ID.
 */
export async function setDocument<T extends Record<string, any>>(collection: CollectionName, id: string, data: T): Promise<void> {
  console.log('[firestore] setDocument:', collection, id, data);
  await firestore().collection(collection).doc(id).set(data);
  console.log('[firestore] setDocument:', collection, id, '→ OK');
}

/**
 * Update specific fields of an existing document.
 */
export async function updateDocument<T extends Record<string, any>>(collection: CollectionName, id: string, data: Partial<T>): Promise<void> {
  console.log('[firestore] updateDocument:', collection, id, data);
  await firestore().collection(collection).doc(id).update(data);
  console.log('[firestore] updateDocument:', collection, id, '→ OK');
}

/**
 * Delete a document by ID.
 */
export async function deleteDocument(collection: CollectionName, id: string): Promise<void> {
  console.log('[firestore] deleteDocument:', collection, id);
  await firestore().collection(collection).doc(id).delete();
  console.log('[firestore] deleteDocument:', collection, id, '→ OK');
}