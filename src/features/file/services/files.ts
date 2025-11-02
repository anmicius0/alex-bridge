import { getCollection, type CollectionEntry } from 'astro:content';

export async function getAllFiles(): Promise<CollectionEntry<'file'>[]> {
  return await getCollection('file');
}

export async function getSortedFiles(): Promise<CollectionEntry<'file'>[]> {
  const files = await getAllFiles();
  return files.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
}
