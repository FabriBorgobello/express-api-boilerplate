import { promises as fs } from 'fs';
import * as path from 'path';

import { Migrator, FileMigrationProvider } from 'kysely';

import { db } from '@/database';

// ANSI escape codes for colors
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

async function migrateToLatest() {
  const migrationFolderPath =
    process.env.MIGRATION_FOLDER_PATH || path.join(__dirname, 'migrations');

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: migrationFolderPath,
    }),
  });

  try {
    const { error, results } = await migrator.migrateToLatest();

    results?.forEach((it, index) => {
      console.log(
        `${colors.blue}Processing migration ${index + 1} of ${
          results.length
        }: "${it.migrationName}"${colors.reset}`,
      );
      if (it.status === 'Success') {
        console.log(`${colors.green}✅ Success${colors.reset}`);
      } else if (it.status === 'Error') {
        console.error(`${colors.red}❌ Error${colors.reset}`);
      }
    });

    if (error) {
      throw error;
    }

    console.log(
      `${colors.green}🎉 All migrations executed successfully.${colors.reset}`,
    );
  } catch (err) {
    console.error(
      `${colors.red}🚨 Migration process failed:${colors.reset}`,
      err,
    );
    process.exit(1);
  } finally {
    console.log(
      `${colors.blue}🔄 Closing database connection...${colors.reset}`,
    );
    await db.destroy();
  }
}

migrateToLatest();
