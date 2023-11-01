-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_userIdUpdated_fkey";

-- AlterTable
ALTER TABLE "clients" ALTER COLUMN "userIdUpdated" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_userIdUpdated_fkey" FOREIGN KEY ("userIdUpdated") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
