/*
  Warnings:

  - You are about to alter the column `status` on the `contents` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `contents` MODIFY `status` ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'DRAFT';
