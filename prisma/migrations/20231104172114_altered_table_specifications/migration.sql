-- DropForeignKey
ALTER TABLE "specifications" DROP CONSTRAINT "specifications_userIdUpdated_fkey";

-- AlterTable
ALTER TABLE "specifications" ALTER COLUMN "userIdUpdated" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "specifications" ADD CONSTRAINT "specifications_userIdUpdated_fkey" FOREIGN KEY ("userIdUpdated") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
