/*
  Warnings:

  - You are about to drop the `specifcations_cars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `specifications` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `airBag` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `airConditioning` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `electricWindow` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fourForFour` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `steering` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `windows` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "specifcations_cars" DROP CONSTRAINT "specifcations_cars_carId_fkey";

-- DropForeignKey
ALTER TABLE "specifcations_cars" DROP CONSTRAINT "specifcations_cars_specificationId_fkey";

-- DropForeignKey
ALTER TABLE "specifcations_cars" DROP CONSTRAINT "specifcations_cars_userIdCreated_fkey";

-- DropForeignKey
ALTER TABLE "specifications" DROP CONSTRAINT "specifications_userIdCreated_fkey";

-- DropForeignKey
ALTER TABLE "specifications" DROP CONSTRAINT "specifications_userIdUpdated_fkey";

-- AlterTable
ALTER TABLE "cars" ADD COLUMN     "airBag" "EnumS_N" NOT NULL,
ADD COLUMN     "airConditioning" "EnumS_N" NOT NULL,
ADD COLUMN     "electricWindow" "EnumS_N" NOT NULL,
ADD COLUMN     "fourForFour" "EnumS_N" NOT NULL,
ADD COLUMN     "steering" "EnumSteering" NOT NULL,
ADD COLUMN     "windows" "EnumWindows" NOT NULL;

-- DropTable
DROP TABLE "specifcations_cars";

-- DropTable
DROP TABLE "specifications";
