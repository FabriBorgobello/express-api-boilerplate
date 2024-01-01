import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

import { Database } from './types'; // this is the Database interface we defined earlier

import { env } from '@/config';

const dialect = new PostgresDialect({
  pool: new Pool({
    database: env.POSTGRES_DB,
    host: env.POSTGRES_HOST,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    port: Number(env.POSTGRES_PORT),
    max: 10,
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
});
