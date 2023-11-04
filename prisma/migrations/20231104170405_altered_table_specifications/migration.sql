/*
  Warnings:

  - Added the required column `windows` to the `specifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "specifications" DROP COLUMN "windows",
ADD COLUMN     "windows" "EnumWindows" NOT NULL;
