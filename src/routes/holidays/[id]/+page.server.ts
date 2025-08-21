// src/routes/holidays/[id]/+page.server.ts
import { adminDB } from '$lib/server/firebase.server';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Holiday } from '$lib/types';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const docSnap = await adminDB.collection('holiday').doc(params.id).get();

    if (docSnap.exists) {
      const holiday: Holiday = {
        id: docSnap.id,
        ...(docSnap.data() as Omit<Holiday, 'id'>),
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
