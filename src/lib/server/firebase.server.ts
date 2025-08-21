// src/lib/server/firebase.server.ts
import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { FIREBASE_SERVICE_ACCOUNT } from '$env/static/private';

// Parse the service account JSON from the environment variable.
const serviceAccount = JSON.parse(FIREBASE_SERVICE_ACCOUNT);

let app: App;

// This check prevents re-initializing the app in a hot-reload environment.
if (!getApps().length) {
  app = initializeApp({
    credential: cert(serviceAccount),
  });
} else {
  app = getApps()[0];
}

// Export admin-specific instances. Naming them with an 'admin' prefix
// is a good practice to avoid confusion with client-side instances.
export const adminDB = getFirestore(app);
export const adminAuth = getAuth(app);
