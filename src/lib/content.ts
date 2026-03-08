import { getCollection, type CollectionKey } from 'astro:content';

export async function getSortedCollection(collection: CollectionKey) {
  const items = await getCollection(collection);
  return items.sort((a, b) => {
    const dateA = ('date' in a.data ? a.data.date : 'startDate' in a.data ? a.data.startDate : 0) as number;
    const dateB = ('date' in b.data ? b.data.date : 'startDate' in b.data ? b.data.startDate : 0) as number;
    return dateB - dateA;
  });
}