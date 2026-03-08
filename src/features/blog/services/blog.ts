import { getCollection } from 'astro:content';
import { getSortedCollection } from '@lib/content';

export async function getAllBlogPosts() {
  return await getCollection('blog');
}

export async function getSortedBlogPosts() {
  return getSortedCollection('blog');
}