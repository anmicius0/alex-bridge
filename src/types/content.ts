import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

export const newsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  date: z.date(),
});

export const fileSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.date(),
  attachments: z.array(z.string()).optional(),
});

export const holidaySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  startDate: z.date(),
  endDate: z.date(),
});

export const quizSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  choices: z.array(
    z.object({
      choiceText: z.string(),
      isCorrect: z.boolean(),
    })
  ),
  explanation: z.string(),
});

export const collections = {
  news: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
    schema: newsSchema,
  }),
  file: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/file' }),
    schema: fileSchema,
  }),
  holiday: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/holiday' }),
    schema: holidaySchema,
  }),
  quiz: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/quiz' }),
    schema: quizSchema,
  }),
};
