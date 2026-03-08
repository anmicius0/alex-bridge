import { getCollection, type CollectionEntry } from 'astro:content';
import { ErrorHandler } from '@lib/error-handler';

/**
 * Retrieves all quizzes, filtering out future quizzes when in production.
 */
export async function getAllQuizzes(): Promise<CollectionEntry<'quiz'>[]> {
  const result = await ErrorHandler.safeExecute(
    function () {
      return getCollection('quiz');
    },
    { context: 'quiz/getAll' }
  );

  if (!result.success || !result.data) {
    return [];
  }

  const quizzes = result.data;
  if (import.meta.env.DEV) {
    return quizzes;
  }

  const now = new Date();
  return quizzes.filter(function (quiz) {
    return !quiz.data.date || quiz.data.date <= now;
  });
}

/**
 * Retrieves all available quizzes sorted in descending chronological order.
 */
export async function getSortedQuizzes(): Promise<CollectionEntry<'quiz'>[]> {
  const quizzes = await getAllQuizzes();

  return quizzes.sort(function (a, b) {
    const dateA = a.data.date?.valueOf() ?? 0;
    const dateB = b.data.date?.valueOf() ?? 0;
    return dateB - dateA;
  });
}
