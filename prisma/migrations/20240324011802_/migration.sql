/*
  Warnings:

  - You are about to drop the column `ankleAround` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `calfAround` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `capAround` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `chestAround` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hipAround` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `kneeAround` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `neckAround` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `waistAround` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "ankleAround",
DROP COLUMN "calfAround",
DROP COLUMN "capAround",
DROP COLUMN "chestAround",
DROP COLUMN "hipAround",
DROP COLUMN "kneeAround",
DROP COLUMN "neckAround",
DROP COLUMN "waistAround",
ADD COLUMN     "aroundAnkle" DOUBLE PRECISION,
ADD COLUMN     "aroundCalf" DOUBLE PRECISION,
ADD COLUMN     "aroundChest" DOUBLE PRECISION,
ADD COLUMN     "aroundHeadCap" DOUBLE PRECISION,
ADD COLUMN     "aroundHip" DOUBLE PRECISION,
ADD COLUMN     "aroundKnee" DOUBLE PRECISION,
ADD COLUMN     "aroundNeck" DOUBLE PRECISION,
ADD COLUMN     "aroundWaist" DOUBLE PRECISION,
ADD COLUMN     "image" TEXT;
