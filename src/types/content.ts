import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const commonSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.date().optional(),
  updatedDate: z.date().optional(),
  images: z.array(z.string()).optional(),
});

export const blogSchema = commonSchema.extend({
  date: z.date(), // Required for blog
});

export const fileSchema = commonSchema.extend({
  date: z.date(), // Required for file
  attachments: z.array(z.string()).optional(),
});

export const holidaySchema = commonSchema.extend({
  startDate: z.date(),
  endDate: z.date(),
});

export const quizSchema = commonSchema.extend({
  choices: z.array(
    z.object({
      choiceText: z.string(),
      isCorrect: z.boolean(),
    })
  ),
  explanation: z.string(),
});

export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: blogSchema,
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

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  extendedProps?: {
    description?: string;
    location?: string;
  };
}


