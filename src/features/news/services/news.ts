import { getCollection, type CollectionEntry } from 'astro:content';

export async function getAllNewsPosts(): Promise<CollectionEntry<'news'>[]> {
  return await getCollection('news');
}

export async function getSortedNewsPosts(): Promise<CollectionEntry<'news'>[]> {
  const posts = await getAllNewsPosts();
  return posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
}

export async function getLatestNewsPost(): Promise<
  CollectionEntry<'news'> | undefined
> {
  const sorted = await getSortedNewsPosts();
  return sorted[0];
}

export async function getRecentNewsPosts(
  count: number = 2
): Promise<CollectionEntry<'news'>[]> {
  const sorted = await getSortedNewsPosts();
  return sorted.slice(0, count);
}
