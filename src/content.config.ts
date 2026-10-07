import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const page = defineCollection({
  loader: glob({
    base: './content',
    pattern: '{home,about,cv}/index.md',
    generateId: ({ entry }) => entry.split('/')[0]!,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    role: z.string().optional(),
    email: z.email().optional(),
    selected: z.array(z.string()).optional(),
    download: z.string().optional(),
  }),
});

const research = defineCollection({
  loader: glob({
    base: './content/research',
    pattern: '*/index.md',
    generateId: ({ entry }) => entry.split('/')[0]!,
  }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().default(''),
    type: z.string().default('Research'),
    year: z.union([z.string(), z.number()]).optional(),
    order: z.number().default(100),
    cover: image().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
    example: z.boolean().default(false),
  }),
});

export const collections = { page, research };
