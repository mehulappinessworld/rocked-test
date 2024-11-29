/*
  Warnings:

  - A unique constraint covering the columns `[userId,contentId]` on the table `content_watched` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `content_watched_userId_contentId_key` ON `content_watched`(`userId`, `contentId`);
