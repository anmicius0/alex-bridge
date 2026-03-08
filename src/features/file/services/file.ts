import type { CollectionEntry } from 'astro:content';
import { getSortedCollection } from '@lib/content';
import { ErrorHandler } from '@lib/error-handler';

/**
 * Retrieves all files from the collection.
 */
export async function getAllFiles(): Promise<CollectionEntry<'file'>[]> {
  const result = await ErrorHandler.safeExecute(
    function () {
      return getSortedCollection('file');
    },
    { context: 'file/getAll' }
  );

  return result.success && result.data ? result.data : [];
}

/**
 * Retrieves sorted files.
 */
export async function getSortedFiles(): Promise<CollectionEntry<'file'>[]> {
  const result = await ErrorHandler.safeExecute(
    function () {
      return getSortedCollection('file');
    },
    { context: 'file/getSorted' }
  );

  return result.success && result.data ? result.data : [];
}
