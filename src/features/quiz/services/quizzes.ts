import { getCollection } from 'astro:content';

export async function getAllQuizzes() {
  const quizzes = await getCollection('quiz');
  const now = new Date();

  if (import.meta.env.DEV) {
    return quizzes;
  }

  return quizzes.filter((quiz) => {
    return !quiz.data.date || quiz.data.date <= now;
  });
}

export async function getSortedQuizzes() {
  const quizzes = await getAllQuizzes();
  return quizzes.sort((a, b) => {
    const dateA = a.data.date?.valueOf() ?? 0;
    const dateB = b.data.date?.valueOf() ?? 0;
    return dateB - dateA;
  });
}