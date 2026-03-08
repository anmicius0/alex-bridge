import { getCollection, type CollectionEntry } from 'astro:content';
import { ErrorHandler } from '@lib/error-handler';

/**
 * Retrieves all blog posts from the collection.
 */
export async function getAllBlogPosts(): Promise<CollectionEntry<'blog'>[]> {
  const result = await ErrorHandler.safeExecute(
    function () {
      return getCollection('blog');
    },
    { context: 'blog/getAll' }
  );

  return result.success && result.data ? result.data : [];
}

/**
 * Retrieves all blog posts sorted in descending chronological order.
 */
export async function getSortedBlogPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getAllBlogPosts();

  return posts.sort(function (a, b) {
    return b.data.date.valueOf() - a.data.date.valueOf();
  });
}
