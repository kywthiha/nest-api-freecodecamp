import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { CreateCategoryDto } from "../../src/category/dto/create-category.dto";

const fakerCategory = (): CreateCategoryDto => ({
  name: faker.commerce.product(),
  description: faker.commerce.productDescription()
});

export async function runCategorySeeder(userId: number, prisma: PrismaClient) {
  await Promise.all([...Array(50).keys()].map(() => prisma.category.create({
    data: {
      ...fakerCategory(),
      createdUser: {
        connect: { id: userId }
      }
    }
  })));
}