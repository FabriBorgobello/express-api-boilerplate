/* eslint-disable no-restricted-syntax */
import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.string().default('3001'),
  POSTGRES_DB: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_PORT: z.string().default('5432'),
  POSTGRES_HOST: z.string().default('localhost'),
  MIGRATION_FOLDER_PATH: z.string().optional(),
});

/**
 * Environment variables
 * This is the only place where we use process.env, the rest of the application
 * should use the env variable instead. This is to ensure that we have all
 * environment variables defined and that they are of the correct type.
 * @example
 * import { env } from '@/config';
 * const port = env.PORT;
 */

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
