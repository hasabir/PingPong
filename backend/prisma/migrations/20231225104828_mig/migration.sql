/*
  Warnings:

  - You are about to drop the column `login` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `test` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "memberRole" AS ENUM ('owner', 'admin', 'user');

-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('winner', 'loser');

-- CreateEnum
CREATE TYPE "Restrict" AS ENUM ('active', 'banned', 'muted');

-- CreateEnum
CREATE TYPE "channelType" AS ENUM ('private', 'protected', 'public');

-- CreateEnum
CREATE TYPE "friendshipStatus" AS ENUM ('accepted', 'pending', 'declined');

-- CreateEnum
CREATE TYPE "userStatus" AS ENUM ('online', 'offline', 'inGame');

-- DropIndex
DROP INDEX "user_login_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "login",
DROP COLUMN "photo";

-- DropTable
DROP TABLE "test";

-- CreateTable
CREATE TABLE "profile" (
    "profileId" SERIAL NOT NULL,
    "img" TEXT NOT NULL,
    "WinsCount" INTEGER NOT NULL,
    "LoseCount" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "status" "userStatus" NOT NULL DEFAULT 'offline',
    "profileCreator" INTEGER NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "userGame" (
    "UserGameId" SERIAL NOT NULL,
    "GameId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "status" "GameStatus" NOT NULL,

    CONSTRAINT "userGame_pkey" PRIMARY KEY ("UserGameId")
);

-- CreateTable
CREATE TABLE "Game" (
    "GameId" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("GameId")
);

-- CreateTable
CREATE TABLE "Message" (
    "messageId" SERIAL NOT NULL,
    "messageText" TEXT NOT NULL,
    "creationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" INTEGER NOT NULL,
    "chatRoom" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("messageId")
);

-- CreateTable
CREATE TABLE "channel" (
    "channelId" TEXT NOT NULL,
    "channelName" TEXT NOT NULL,
    "creationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "channelOwner" INTEGER NOT NULL,
    "password" TEXT,
    "lastMessageId" INTEGER,
    "channelType" "channelType" NOT NULL,

    CONSTRAINT "channel_pkey" PRIMARY KEY ("channelId")
);

-- CreateTable
CREATE TABLE "channelMember" (
    "channelMemberId" SERIAL NOT NULL,
    "member" INTEGER NOT NULL,
    "channel" TEXT NOT NULL,
    "status" "memberRole" NOT NULL DEFAULT 'user',
    "restrict" "Restrict" NOT NULL DEFAULT 'active',
    "limitedTime" TIMESTAMP(3),

    CONSTRAINT "channelMember_pkey" PRIMARY KEY ("channelMemberId")
);

-- CreateTable
CREATE TABLE "directMessage" (
    "directMessageId" SERIAL NOT NULL,
    "messageText" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "CreationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "directMessage_pkey" PRIMARY KEY ("directMessageId")
);

-- CreateTable
CREATE TABLE "friendship" (
    "friendshipId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "friendId" INTEGER NOT NULL,
    "status" "friendshipStatus" NOT NULL,
    "lastDmId" INTEGER,

    CONSTRAINT "friendship_pkey" PRIMARY KEY ("friendshipId")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_profileCreator_key" ON "profile"("profileCreator");

-- CreateIndex
CREATE UNIQUE INDEX "channel_lastMessageId_key" ON "channel"("lastMessageId");

-- CreateIndex
CREATE UNIQUE INDEX "channelMember_member_channel_key" ON "channelMember"("member", "channel");

-- CreateIndex
CREATE UNIQUE INDEX "friendship_lastDmId_key" ON "friendship"("lastDmId");

-- CreateIndex
CREATE UNIQUE INDEX "friendship_userId_friendId_status_key" ON "friendship"("userId", "friendId", "status");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_profileCreator_fkey" FOREIGN KEY ("profileCreator") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userGame" ADD CONSTRAINT "userGame_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userGame" ADD CONSTRAINT "userGame_GameId_fkey" FOREIGN KEY ("GameId") REFERENCES "Game"("GameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatRoom_fkey" FOREIGN KEY ("chatRoom") REFERENCES "channel"("channelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channel" ADD CONSTRAINT "channel_channelOwner_fkey" FOREIGN KEY ("channelOwner") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channel" ADD CONSTRAINT "channel_lastMessageId_fkey" FOREIGN KEY ("lastMessageId") REFERENCES "Message"("messageId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channelMember" ADD CONSTRAINT "channelMember_member_fkey" FOREIGN KEY ("member") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channelMember" ADD CONSTRAINT "channelMember_channel_fkey" FOREIGN KEY ("channel") REFERENCES "channel"("channelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "directMessage" ADD CONSTRAINT "directMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "directMessage" ADD CONSTRAINT "directMessage_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_lastDmId_fkey" FOREIGN KEY ("lastDmId") REFERENCES "directMessage"("directMessageId") ON DELETE SET NULL ON UPDATE CASCADE;
