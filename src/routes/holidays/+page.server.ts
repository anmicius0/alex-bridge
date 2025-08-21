// src/routes/holidays/+page.server.ts
import { adminDB } from '$lib/server/firebase.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Holiday } from '$lib/types';

export const load: PageServerLoad = async () => {
  try {
    const querySnapshot = await adminDB.collection('holiday').get();

    const holidays: Holiday[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        image: data.image,
        price: data.price,
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
