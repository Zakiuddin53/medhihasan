/*
  Warnings:

  - You are about to drop the column `waistToheel` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "waistToheel",
ADD COLUMN     "waistToHeel" DOUBLE PRECISION;
