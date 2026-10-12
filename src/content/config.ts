import { defineCollection, z } from 'astro:content';

const guidesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['white_jobs', 'black_jobs', 'vehicles', 'crafting', 'survival', 'food', 'general']),
    categoryName: z.string(),
    order: z.number().default(99),
    icon: z.string().default('file-text'),
    iconImage: z.string().optional(),
    image: z.string().optional(),
    badge: z.string().optional(),
    cooldown: z.number().optional(),
    updatedAt: z.string().optional(),
    status: z.enum(['ready', 'draft', 'collecting']).default('collecting').optional(),
    tool: z.string().optional(),
    risk: z.string().optional(),
    vehicleTier: z.string().optional(),
    itemWeight: z.string().optional(),
  }),
});

export const collections = {
  guides: guidesCollection,
};
