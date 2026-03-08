import { getCollection, type CollectionEntry } from 'astro:content';

function extractQuizNumber(title: string): number {
  const match = title.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

async function getAllQuizzes(): Promise<CollectionEntry<'quiz'>[]> {
  return await getCollection('quiz');
}

export async function getSortedQuizzes(): Promise<CollectionEntry<'quiz'>[]> {
  const quizzes = await getAllQuizzes();
  return quizzes.sort(
    (a, b) => extractQuizNumber(b.data.title) - extractQuizNumber(a.data.title)
  );
}
