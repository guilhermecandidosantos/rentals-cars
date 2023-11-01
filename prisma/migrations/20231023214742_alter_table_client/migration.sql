/*
  Warnings:

  - You are about to drop the column `driverLincense` on the `clients` table. All the data in the column will be lost.
  - Added the required column `driverLicense` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "driverLincense",
ADD COLUMN     "driverLicense" VARCHAR(255) NOT NULL;
