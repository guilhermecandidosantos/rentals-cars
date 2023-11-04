-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_userIdUpdated_fkey";

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "userIdUpdated" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_userIdUpdated_fkey" FOREIGN KEY ("userIdUpdated") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
