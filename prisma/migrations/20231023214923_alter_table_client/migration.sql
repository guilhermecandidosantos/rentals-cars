/*
  Warnings:

  - You are about to drop the column `validityDriverLincense` on the `clients` table. All the data in the column will be lost.
  - Added the required column `validityDriverLicense` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "validityDriverLincense",
ADD COLUMN     "validityDriverLicense" TIMESTAMPTZ(3) NOT NULL;
