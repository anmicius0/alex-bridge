// src/content.config.ts
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

export const collections = {
  news: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      photos: z.array(z.string()).optional(),
      image: z.string().optional(),
      date: z.date(),
    }),
  }),
  file: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/file' }),
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.date(),
      attachments: z.array(z.string()).optional(),
    }),
  }),
  holiday: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/holiday' }),
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      image: z.string().optional(),
      startDate: z.date(),
      endDate: z.date(),
    }),
  }),
  quiz: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/quiz' }),
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      image: z.string().optional(),
      choices: z.array(
        z.object({
          choiceText: z.string(),
          isCorrect: z.boolean(),
        })
      ),
      explanation: z.string(),
    }),
  }),
};
