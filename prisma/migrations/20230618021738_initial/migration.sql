-- CreateEnum
CREATE TYPE "Mood" AS ENUM ('ANGRY', 'ANXIOUS', 'CALM', 'CONFUSED', 'DEPRESSED', 'EXCITED', 'HAPPY', 'HOPEFUL', 'SAD', 'STRESSED');

-- CreateEnum
CREATE TYPE "ThoughtType" AS ENUM ('IDEA', 'MEMORY', 'PLAN', 'WORRY');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('VIDEO', 'AUDIO', 'TEXT');

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "MediaType" NOT NULL,
    "url" TEXT NOT NULL,
    "thoughtId" INTEGER NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thought" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" CHAR(255) NOT NULL,
    "type" "ThoughtType" NOT NULL,
    "mood" "Mood" NOT NULL,
    "sphereId" INTEGER NOT NULL,

    CONSTRAINT "Thought_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sphere" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Sphere_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Media_thoughtId_key" ON "Media"("thoughtId");

-- CreateIndex
CREATE UNIQUE INDEX "Thought_sphereId_key" ON "Thought"("sphereId");

-- CreateIndex
CREATE UNIQUE INDEX "Sphere_title_key" ON "Sphere"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Sphere_userId_key" ON "Sphere"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_thoughtId_fkey" FOREIGN KEY ("thoughtId") REFERENCES "Thought"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thought" ADD CONSTRAINT "Thought_sphereId_fkey" FOREIGN KEY ("sphereId") REFERENCES "Sphere"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sphere" ADD CONSTRAINT "Sphere_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
