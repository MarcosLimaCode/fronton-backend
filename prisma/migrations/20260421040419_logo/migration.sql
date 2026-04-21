/*
  Warnings:

  - Added the required column `logo` to the `news` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "news" ADD COLUMN     "logo" TEXT NOT NULL;
