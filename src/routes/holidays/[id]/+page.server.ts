// src/routes/holidays/[id]/+page.server.ts
import { adminDB, adminAuth } from '$lib/server/firebase.server';
import type { PageServerLoad, Actions } from './$types';
import { error } from '@sveltejs/kit';
import type { Holiday } from '$lib/types';
import { COLLECTIONS } from '$lib/constants'; // Import constants

export const load: PageServerLoad = async ({ params }) => {
  try {
    const docSnap = await adminDB.collection(COLLECTIONS.HOLIDAYS).doc(params.id).get();

    if (docSnap.exists) {
      const data = docSnap.data();

      // Add a check to ensure data is not undefined to satisfy TypeScript
      if (!data) {
        throw error(404, 'Holiday data could not be retrieved.');
      }

      const startDateTimestamp = data.startDate; // This is a Firestore Timestamp

      const holiday: Holiday = {
        id: docSnap.id,
        name: data.name,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        price: data.price,
        image: data.image,
        files: data.files,
        // Convert the Timestamp to a serializable ISO string
        startDate: startDateTimestamp.toDate().toISOString(),
      };
      return {
        status: 200,
        id: params.id,
        holiday,
      };
    } else {
      throw error(404, 'Holiday not found');
    }
  } catch (err) {
    console.error('Server-side data loading error:', err);
    throw error(500, 'Failed to load holiday data');
  }
};

export const actions: Actions = {
  register: async ({ request, params }) => {
    const formData = await request.formData();
    const idToken = formData.get('idToken') as string;
    const holidayId = params.id;
    const holidayName = formData.get('holidayName') as string;

    if (!idToken) {
      return { success: false, error: 'Authentifizierungstoken fehlt.' };
    }

    try {
      // 1. Verify user token
      const decodedToken = await adminAuth.verifyIdToken(idToken);
      const uid = decodedToken.uid;

      // 2. Fetch user metadata
      const userMetaRef = adminDB.collection(COLLECTIONS.USER_META).doc(uid);
      const userMetaSnap = await userMetaRef.get();
      if (!userMetaSnap.exists) {
        return { success: false, error: 'Benutzerdetails nicht gefunden.' };
      }
      const userMetaData = userMetaSnap.data();

      // 3. Check for existing registration to prevent duplicates
      const registrationQuery = adminDB
        .collection(COLLECTIONS.HOLIDAY_REGISTRATIONS)
        .where('uid', '==', uid)
        .where('holidayId', '==', holidayId);

      const existingRegistration = await registrationQuery.get();

      if (!existingRegistration.empty) {
        return { success: false, error: 'Sie sind bereits für diese Reise angemeldet.' };
      }

      // 4. Create registration document
      const registrationData = {
        holidayId,
        uid,
        holidayName,
        email: userMetaData?.email,
        userName: userMetaData?.name,
        userPhone: userMetaData?.phone,
        userAddress: userMetaData?.address,
        createdAt: new Date().toISOString(),
      };

      await adminDB.collection(COLLECTIONS.HOLIDAY_REGISTRATIONS).add(registrationData);

      return { success: true, message: 'Erfolgreich für die Reise angemeldet!' };
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false, error: 'Bei der Anmeldung ist ein Fehler aufgetreten.' };
    }
  },
  cancel: async ({ request, params }) => {
    const formData = await request.formData();
    const idToken = formData.get('idToken') as string;
    const holidayId = params.id;

    if (!idToken) {
      return { success: false, error: 'Authentifizierungstoken fehlt.' };
    }

    try {
      const decodedToken = await adminAuth.verifyIdToken(idToken);
      const uid = decodedToken.uid;

      const registrationQuery = adminDB
        .collection(COLLECTIONS.HOLIDAY_REGISTRATIONS)
        .where('uid', '==', uid)
        .where('holidayId', '==', holidayId)
        .limit(1);

      const querySnapshot = await registrationQuery.get();

      if (querySnapshot.empty) {
        return { success: false, error: 'Keine passende Anmeldung zum Stornieren gefunden.' };
      }

      const docToDelete = querySnapshot.docs[0];
      await docToDelete.ref.delete();

      return { success: true, message: 'Anmeldung erfolgreich storniert.' };
    } catch (err) {
      console.error('Cancellation error:', err);
      return { success: false, error: 'Bei der Stornierung ist ein Fehler aufgetreten.' };
    }
  },
};