// src/routes/holidays/+page.server.ts
import { adminDB } from '$lib/server/firebase.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Holiday } from '$lib/types';
import { COLLECTIONS } from '$lib/constants'; // Import constants

export const load: PageServerLoad = async () => {
  try {
    const now = new Date();
    // Query for holidays where the startDate is in the future
    const querySnapshot = await adminDB
      .collection(COLLECTIONS.HOLIDAYS)
      .where('startDate', '>=', now)
      .get();

    const holidays: Holiday[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      // Firestore Timestamps need to be converted to a serializable format
      const startDateTimestamp = data.startDate;

      return {
        id: doc.id,
        name: data.name,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        image: data.image,
        price: data.price,
        startDate: startDateTimestamp.toDate().toISOString(), // Convert to ISO string
      };
    });
    return { holidays };
  } catch (err) {
    console.error('Server-side data loading error (holidays):', err);
    throw error(
      500,
      'Die Reisen konnten nicht geladen werden. Bitte versuchen Sie es später erneut.',
    );
  }
};