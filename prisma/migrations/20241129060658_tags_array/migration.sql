/*
  Warnings:

  - You are about to drop the column `Status` on the `contents` table. All the data in the column will be lost.
  - You are about to alter the column `tags` on the `contents` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - Added the required column `status` to the `contents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contents` DROP COLUMN `Status`,
    ADD COLUMN `status` VARCHAR(191) NOT NULL,
    MODIFY `tags` JSON NULL;
