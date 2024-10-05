/*
  Warnings:

  - Added the required column `price` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inventory` ADD COLUMN `price` INTEGER NOT NULL,
    ADD COLUMN `unit` VARCHAR(191) NOT NULL;
