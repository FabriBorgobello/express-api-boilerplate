import { db } from '@/database';

async function seed() {
  console.log('\x1b[33m%s\x1b[0m', '⌛ Seeding, please wait...');

  console.log('Inserting products...');
  await db.deleteFrom('product').execute();
  await db
    .insertInto('product')
    .values([
      {
        name: 'Product 1',
        price: 100,
        description: 'Product 1 description',
        status: 'available',
      },
      {
        name: 'Product 2',
        price: 200,
        description: 'Product 2 description',
        status: 'available',
      },
      {
        name: 'Product 3',
        price: 300,
        description: 'Product 3 description',
        status: 'out_of_stock',
      },
      {
        name: 'Product 4',
        price: 400,
        description: 'Product 4 description',
        status: 'available',
      },
      {
        name: 'Product 5',
        price: 500,
        description: 'Product 5 description',
        status: 'available',
      },
      {
        name: 'Product 6',
        price: 600,
        description: 'Product 6 description',
        status: 'available',
      },
      {
        name: 'Product 7',
        price: 700,
        description: 'Product 7 description',
        status: 'available',
      },
      {
        name: 'Product 8',
        price: 800,
        description: 'Product 8 description',
        status: 'available',
      },
      {
        name: 'Product 9',
        price: 900,
        description: 'Product 9 description',
        status: 'available',
      },
      {
        name: 'Product 10',
        price: 1000,
        description: 'Product 10 description',
        status: 'available',
      },
      {
        name: 'Product 11',
        price: 1100,
        description: 'Product 11 description',
        status: 'available',
      },
      {
        name: 'Product 12',
        price: 1200,
        description: 'Product 12 description',
        status: 'available',
      },
      {
        name: 'Product 13',
        price: 1300,
        description: 'Product 13 description',
        status: 'available',
      },
      {
        name: 'Product 14',
        price: 1400,
        description: 'Product 14 description',
        status: 'available',
      },
      {
        name: 'Product 15',
        price: 1500,
        description: 'Product 15 description',
        status: 'available',
      },
      {
        name: 'Product 16',
        price: 1600,
        description: 'Product 16 description',
        status: 'available',
      },
      {
        name: 'Product 17',
        price: 1700,
        description: 'Product 17 description',
        status: 'available',
      },
    ])
    .execute();

  console.log('\x1b[32m%s\x1b[0m', '🚀 Seeding completed!');
  await db.destroy();
}

void seed();
