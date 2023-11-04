/*
  Warnings:

  - You are about to drop the column `specificationId` on the `cars` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cars" DROP CONSTRAINT "cars_specificationId_fkey";

-- AlterTable
ALTER TABLE "cars" DROP COLUMN "specificationId";

-- CreateTable
CREATE TABLE "specifcations_cars" (
    "id" TEXT NOT NULL,
    "specificationId" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "userIdCreated" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "specifcations_cars_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "specifcations_cars" ADD CONSTRAINT "specifcations_cars_userIdCreated_fkey" FOREIGN KEY ("userIdCreated") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specifcations_cars" ADD CONSTRAINT "specifcations_cars_specificationId_fkey" FOREIGN KEY ("specificationId") REFERENCES "specifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specifcations_cars" ADD CONSTRAINT "specifcations_cars_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
