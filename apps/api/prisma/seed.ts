/**
 * Demo data for local development: `pnpm db:seed` (after `pnpm db:migrate`).
 * Illustrative products/prices only (spec: all examples are illustrative). Safe to re-run.
 */
import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../src/generated/prisma/client.js';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  const home = await prisma.category.upsert({
    where: { slug: 'home' },
    update: {},
    create: { slug: 'home', name: { en: 'Home', ar: 'المنزل' } },
  });

  await prisma.product.upsert({
    where: { slug: 'everyday-canvas-tote' },
    update: {},
    create: {
      slug: 'everyday-canvas-tote',
      status: 'ACTIVE',
      categoryId: home.id,
      name: { en: 'Everyday canvas tote', ar: 'حقيبة قماش يومية' },
      description: {
        en: 'Sturdy canvas tote for everyday carry.',
        ar: 'حقيبة قماش متينة للاستخدام اليومي.',
      },
      variants: {
        create: [
          {
            sku: 'TOTE-SAND',
            options: { color: 'Sand' },
            priceMinor: 18000,
            stock: 20,
          },
          {
            sku: 'TOTE-OLIVE',
            options: { color: 'Olive' },
            priceMinor: 18000,
            stock: 12,
          },
        ],
      },
    },
  });
}

main()
  .then(() => console.log('Seed complete'))
  .finally(() => prisma.$disconnect());
