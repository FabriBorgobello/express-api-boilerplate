import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.string().default('3001'),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
