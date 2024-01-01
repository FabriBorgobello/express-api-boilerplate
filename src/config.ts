import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.string().default('3001'),
  POSTGRES_DB: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_PORT: z.string().default('5432'),
  POSTGRES_HOST: z.string().default('localhost'),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
