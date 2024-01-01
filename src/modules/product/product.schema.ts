import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(255),
  price: z.number().int().positive(),
  description: z.string().min(1).max(255),
  status: z.enum(['available', 'out_of_stock']),
  created_at: z.date(),
});

export const ProductCreateSchema = ProductSchema.omit({
  id: true,
  created_at: true,
});

export const ProductUpdateSchema = ProductCreateSchema.partial();
