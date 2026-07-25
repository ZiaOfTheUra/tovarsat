import firebase from '@react-native-firebase/app';

/**
 * Returns the default Firebase app instance.
 * On Android, google-services.json is auto-detected by the native module.
 * `firebase.app()` is synchronous — no async init needed.
 */
export function getFirebaseApp() {
  return firebase.app();
}