/*
  Warnings:

  - A unique constraint covering the columns `[driverLicense]` on the table `clients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "clients_driverLicense_key" ON "clients"("driverLicense");
