/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image1" TEXT,
ADD COLUMN     "image2" TEXT,
ADD COLUMN     "image3" TEXT;

-- DropTable
DROP TABLE "Image";
