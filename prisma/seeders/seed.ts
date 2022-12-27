import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { runCategorySeeder } from './category.seed';
import { runPermissionSeeder } from './permission.seed';

const prisma = new PrismaClient();

async function main() {
  dotenv.config();
  console.log('Seeding...');
  await runCategorySeeder(1, prisma);
  await runPermissionSeeder(1, prisma);
  console.log('Seeding Complete');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
