// src/lib/stores/user.ts
import { type Writable, writable } from 'svelte/store';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { auth, db } from '$lib/client/firebase.client';
import { doc, type DocumentSnapshot, getDoc } from 'firebase/firestore';

// Define interfaces for type safety
export interface UserMeta {
  email: string;
  name: string;
  phone: string;
  address: string;
}

export interface AuthStore {
  firebaseUser: FirebaseUser | null;
  user: UserMeta | null; // Additional metadata from Firestore
  loading: boolean;
  error: string | null;
}

const initialState: AuthStore = {
  firebaseUser: null,
  user: null,
  loading: true,
  error: null,
};

export const authStore: Writable<AuthStore> = writable<AuthStore>(initialState);

// Listen for auth changes
onAuthStateChanged(auth, async (firebaseUser) => {
  authStore.update((state) => ({ ...state, loading: true, error: null }));

  if (firebaseUser) {
    try {
      // Fetch user metadata from Firestore
      const userRef = doc(db, 'userMeta', firebaseUser.uid);
      const userSnap: DocumentSnapshot = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data() as UserMeta;
        authStore.set({
          firebaseUser,
          user: userData,
          loading: false,
          error: null,
        });
      } else {
        // Handle missing metadata (e.g., create it or set defaults)
        authStore.set({
          firebaseUser,
          user: null, // Or initialize with defaults
          loading: false,
          error: 'User metadata not found',
        });
      }
    } catch (err) {
      console.error('Error fetching user meta:', err);
      authStore.set({
        firebaseUser,
        user: null,
        loading: false,
        error: 'Failed to load user data',
      });
    }
  } else {
    // User is logged out
    authStore.set({
      firebaseUser: null,
      user: null,
      loading: false,
      error: null,
    });
  }
});
