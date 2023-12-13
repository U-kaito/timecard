/*
  Warnings:

  - You are about to drop the column `aws_name` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `users_aws_name_key` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `aws_name`;
