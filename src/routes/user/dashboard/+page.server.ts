// src/routes/user/dashboard/+page.server.ts
import { adminDB, adminAuth } from '$lib/server/firebase.server';
import { COLLECTIONS } from '$lib/constants';
import type { Actions } from './$types';
import { error } from '@sveltejs/kit';

export const actions: Actions = {
  cancelRegistration: async ({ request }) => {
    const formData = await request.formData();
    const idToken = formData.get('idToken') as string;
    const registrationId = formData.get('registrationId') as string;

    if (!idToken || !registrationId) {
      return error(400, 'Authentifizierungstoken oder Anmelde-ID fehlt.');
    }

    try {
      // 1. Verify user's identity
      const decodedToken = await adminAuth.verifyIdToken(idToken);
      const uid = decodedToken.uid;

      // 2. Get the registration document
      const registrationRef = adminDB.collection(COLLECTIONS.HOLIDAY_REGISTRATIONS).doc(registrationId);
      const registrationSnap = await registrationRef.get();

      if (!registrationSnap.exists) {
        return { success: false, error: 'Anmeldung nicht gefunden.' };
      }

      const registrationData = registrationSnap.data();

      // 3. Verify that the user owns this registration
      if (registrationData?.uid !== uid) {
        return error(403, 'Sie sind nicht berechtigt, diese Anmeldung zu stornieren.');
      }

      // 4. Delete the registration
      await registrationRef.delete();

      return { success: true, message: 'Anmeldung erfolgreich storniert.' };
    } catch (err) {
      console.error('Cancellation error:', err);
      return { success: false, error: 'Bei der Stornierung ist ein Fehler aufgetreten.' };
    }
  },
};