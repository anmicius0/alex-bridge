// src/routes/files/+page.server.ts
import { adminDB } from '$lib/server/firebase.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { FileDocument } from '$lib/types';

export const load: PageServerLoad = async () => {
  try {
    const querySnapshot = await adminDB.collection('files').orderBy('filename').get();

    const fileDocuments: FileDocument[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        filename: data.filename,
        files: data.files,
      };
    });

    return { fileDocuments };
  } catch (err) {
    console.error('Server-side data loading error (files):', err);
    throw error(
      500,
      'Die Dateien konnten nicht geladen werden. Bitte versuchen Sie es später erneut.',
    );
  }
};
