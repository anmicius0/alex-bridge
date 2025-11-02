import { getCollection, type CollectionEntry } from 'astro:content';

export async function getAllQuizzes(): Promise<CollectionEntry<'quiz'>[]> {
  return await getCollection('quiz');
}

export async function getSortedQuizzes(): Promise<CollectionEntry<'quiz'>[]> {
  const quizzes = await getAllQuizzes();
  return quizzes.sort((a, b) => {
    const numA = parseInt(a.data.title.match(/\d+/)?.[0] ?? '0');
    const numB = parseInt(b.data.title.match(/\d+/)?.[0] ?? '0');
    return numB - numA;
  });
}
