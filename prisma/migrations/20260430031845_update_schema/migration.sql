/*
  Warnings:

  - You are about to drop the column `cinema` on the `preferences` table. All the data in the column will be lost.
  - You are about to drop the column `economia` on the `preferences` table. All the data in the column will be lost.
  - You are about to drop the column `futebol` on the `preferences` table. All the data in the column will be lost.
  - You are about to drop the column `musica` on the `preferences` table. All the data in the column will be lost.
  - You are about to drop the column `politica` on the `preferences` table. All the data in the column will be lost.
  - You are about to drop the column `pop` on the `preferences` table. All the data in the column will be lost.
  - You are about to drop the column `tecnologia` on the `preferences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "preferences" DROP COLUMN "cinema",
DROP COLUMN "economia",
DROP COLUMN "futebol",
DROP COLUMN "musica",
DROP COLUMN "politica",
DROP COLUMN "pop",
DROP COLUMN "tecnologia",
ADD COLUMN     "categories" TEXT[];
