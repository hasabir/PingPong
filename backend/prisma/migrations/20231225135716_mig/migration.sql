/*
  Warnings:

  - You are about to drop the column `points` on the `profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nickname]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `xp` to the `profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstLogin` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profile" DROP COLUMN "points",
ADD COLUMN     "xp" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "avatar" TEXT NOT NULL,
ADD COLUMN     "firstLogin" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_nickname_key" ON "user"("nickname");
