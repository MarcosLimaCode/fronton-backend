/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `news` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "news_link_key" ON "news"("link");
