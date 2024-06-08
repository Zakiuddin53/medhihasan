/*
  Warnings:

  - You are about to drop the column `aroundAnkle` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `aroundCalf` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `aroundChest` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `aroundHeadCap` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `aroundHip` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `aroundKnee` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `aroundNeck` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `aroundWaist` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `shoulderToKnee` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `shoulderWidth` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sleeveLength` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `waistToHeel` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "aroundAnkle",
DROP COLUMN "aroundCalf",
DROP COLUMN "aroundChest",
DROP COLUMN "aroundHeadCap",
DROP COLUMN "aroundHip",
DROP COLUMN "aroundKnee",
DROP COLUMN "aroundNeck",
DROP COLUMN "aroundWaist",
DROP COLUMN "country",
DROP COLUMN "height",
DROP COLUMN "shoulderToKnee",
DROP COLUMN "shoulderWidth",
DROP COLUMN "sleeveLength",
DROP COLUMN "waistToHeel",
DROP COLUMN "weight",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "coatBlowChest" DOUBLE PRECISION,
ADD COLUMN     "coatCap" DOUBLE PRECISION,
ADD COLUMN     "coatChest" DOUBLE PRECISION,
ADD COLUMN     "coatFullHeight" DOUBLE PRECISION,
ADD COLUMN     "coatHip" DOUBLE PRECISION,
ADD COLUMN     "coatLength" DOUBLE PRECISION,
ADD COLUMN     "coatNeck" DOUBLE PRECISION,
ADD COLUMN     "coatShoulder" DOUBLE PRECISION,
ADD COLUMN     "coatSleeve" DOUBLE PRECISION,
ADD COLUMN     "coatWaist" DOUBLE PRECISION,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "pantBottom" DOUBLE PRECISION,
ADD COLUMN     "pantLength" DOUBLE PRECISION,
ADD COLUMN     "pantThigh" DOUBLE PRECISION,
ADD COLUMN     "pantWaist" DOUBLE PRECISION,
ADD COLUMN     "sherwaniBlowChest" DOUBLE PRECISION,
ADD COLUMN     "sherwaniCap" DOUBLE PRECISION,
ADD COLUMN     "sherwaniChest" DOUBLE PRECISION,
ADD COLUMN     "sherwaniFullHeight" DOUBLE PRECISION,
ADD COLUMN     "sherwaniHip" DOUBLE PRECISION,
ADD COLUMN     "sherwaniLength" DOUBLE PRECISION,
ADD COLUMN     "sherwaniNeck" DOUBLE PRECISION,
ADD COLUMN     "sherwaniShoulder" DOUBLE PRECISION,
ADD COLUMN     "sherwaniSleeve" DOUBLE PRECISION,
ADD COLUMN     "sherwaniWaist" DOUBLE PRECISION,
ADD COLUMN     "trozenLength" DOUBLE PRECISION,
ADD COLUMN     "trozenMohri" DOUBLE PRECISION;
