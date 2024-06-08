-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "country" TEXT,
    "shoulderToKnee" DOUBLE PRECISION,
    "chestAround" DOUBLE PRECISION,
    "waistAround" DOUBLE PRECISION,
    "hipAround" DOUBLE PRECISION,
    "shoulderWidth" DOUBLE PRECISION,
    "sleeveLength" DOUBLE PRECISION,
    "neckAround" DOUBLE PRECISION,
    "capAround" DOUBLE PRECISION,
    "waistToheel" DOUBLE PRECISION,
    "kneeAround" DOUBLE PRECISION,
    "calfAround" DOUBLE PRECISION,
    "ankleAround" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "imageURL" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
