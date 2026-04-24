/*
  Warnings:

  - You are about to drop the column `economy` on the `preferences` table. All the data in the column will be lost.
  - You are about to drop the column `football` on the `preferences` table. All the data in the column will be lost.
  - You are about to drop the column `politics` on the `preferences` table. All the data in the column will be lost.
  - You are about to drop the column `popCulture` on the `preferences` table. All the data in the column will be lost.
  - You are about to drop the column `sensitiveContent` on the `preferences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "news" ADD COLUMN     "category" TEXT;

-- AlterTable
ALTER TABLE "preferences" DROP COLUMN "economy",
DROP COLUMN "football",
DROP COLUMN "politics",
DROP COLUMN "popCulture",
DROP COLUMN "sensitiveContent",
ADD COLUMN     "cinema" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "conteudoSensivel" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "economia" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "futebol" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "musica" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "politica" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "pop" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "tecnologia" BOOLEAN NOT NULL DEFAULT true;
