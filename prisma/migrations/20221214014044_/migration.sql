/*
  Warnings:

  - You are about to drop the column `email` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Bookmark` table. All the data in the column will be lost.
  - Added the required column `link` to the `Bookmark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Bookmark_email_key";

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "hash",
DROP COLUMN "lastName",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
