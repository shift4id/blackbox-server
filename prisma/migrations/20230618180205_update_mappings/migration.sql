/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Thought` table. All the data in the column will be lost.
  - You are about to drop the column `mood` on the `Thought` table. All the data in the column will be lost.
  - You are about to drop the column `sphereId` on the `Thought` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Thought` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Thought` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Thought" DROP CONSTRAINT "Thought_sphereId_fkey";

-- DropIndex
DROP INDEX "Thought_sphereId_key";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Sphere" ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Thought" DROP COLUMN "createdAt",
DROP COLUMN "mood",
DROP COLUMN "sphereId",
DROP COLUMN "type",
DROP COLUMN "updatedAt",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "content" SET DATA TYPE CHAR(281);

-- DropEnum
DROP TYPE "Mood";

-- DropEnum
DROP TYPE "ThoughtType";

-- CreateTable
CREATE TABLE "ThoughtToSphere" (
    "thoughtId" INTEGER NOT NULL,
    "sphereId" INTEGER NOT NULL,

    CONSTRAINT "ThoughtToSphere_pkey" PRIMARY KEY ("thoughtId","sphereId")
);

-- CreateTable
CREATE TABLE "Emotion" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emotion" TEXT NOT NULL,
    "thoughtId" INTEGER NOT NULL,

    CONSTRAINT "Emotion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ThoughtToSphere" ADD CONSTRAINT "ThoughtToSphere_thoughtId_fkey" FOREIGN KEY ("thoughtId") REFERENCES "Thought"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThoughtToSphere" ADD CONSTRAINT "ThoughtToSphere_sphereId_fkey" FOREIGN KEY ("sphereId") REFERENCES "Sphere"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emotion" ADD CONSTRAINT "Emotion_thoughtId_fkey" FOREIGN KEY ("thoughtId") REFERENCES "Thought"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
