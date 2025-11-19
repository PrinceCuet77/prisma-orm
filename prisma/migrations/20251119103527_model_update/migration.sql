-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "age" TEXT,
ADD COLUMN     "district" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "photoUrl" TEXT;
