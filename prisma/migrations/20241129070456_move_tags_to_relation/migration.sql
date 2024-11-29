/*
  Warnings:

  - You are about to drop the column `tags` on the `contents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `contents` DROP COLUMN `tags`;

-- CreateTable
CREATE TABLE `ContentTags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ContentTags_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ContentTags` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ContentTags_AB_unique`(`A`, `B`),
    INDEX `_ContentTags_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ContentTags` ADD CONSTRAINT `_ContentTags_A_fkey` FOREIGN KEY (`A`) REFERENCES `contents`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContentTags` ADD CONSTRAINT `_ContentTags_B_fkey` FOREIGN KEY (`B`) REFERENCES `ContentTags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
