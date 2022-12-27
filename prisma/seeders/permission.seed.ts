import { PrismaClient } from '@prisma/client';

export enum PermissionCategory {
  Manage = 'manage-category',
  Create = 'create-category',
  Read = 'read-category',
  Update = 'update-category',
  Delete = 'delete-category',
}

export async function runPermissionSeeder(
  userId: number,
  prisma: PrismaClient,
) {
  await prisma.role.create({
    data: {
      name: 'Admin',
      createdUser: {
        connect: { id: userId },
      },
      permissions: {
        create: Object.values(PermissionCategory).map((permission) => ({
          permission: {
            create: {
              name: permission,
            },
          },
        })),
      },
      users: {
        create: [
          {
            createdUser: {
              connect: {
                id: 1,
              },
            },
            user: {
              connect: {
                id: 1,
              },
            },
          },
        ],
      },
    },
  });
}
