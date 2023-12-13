/*
  Warnings:

  - Added the required column `aws_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pending_users` ADD COLUMN `owner` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `aws_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `owner` BOOLEAN NOT NULL DEFAULT false;
