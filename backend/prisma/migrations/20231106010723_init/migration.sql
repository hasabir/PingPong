-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('winner', 'loser', 'equal');

-- CreateEnum
CREATE TYPE "memberRole" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "Restrict" AS ENUM ('active', 'banned', 'muted');

-- CreateTable
CREATE TABLE "profile" (
    "profileId" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "WinsCount" INTEGER NOT NULL,
    "LoseCount" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "profileCreator" TEXT NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGame" (
    "UserGameId" TEXT NOT NULL,
    "GameId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "status" "GameStatus" NOT NULL DEFAULT 'equal',

    CONSTRAINT "UserGame_pkey" PRIMARY KEY ("UserGameId")
);

-- CreateTable
CREATE TABLE "Game" (
    "GameId" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("GameId")
);

-- CreateTable
CREATE TABLE "Message" (
    "messageId" TEXT NOT NULL,
    "messageText" TEXT NOT NULL,
    "creationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" TEXT NOT NULL,
    "isGroup" BOOLEAN NOT NULL,
    "recipientId" TEXT,
    "chatRoom" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("messageId")
);

-- CreateTable
CREATE TABLE "channel" (
    "channelId" TEXT NOT NULL,
    "channelName" TEXT NOT NULL,
    "creationTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "channel_pkey" PRIMARY KEY ("channelId")
);

-- CreateTable
CREATE TABLE "channelMember" (
    "channelMemberId" TEXT NOT NULL,
    "member" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "status" "memberRole" NOT NULL,
    "restrict" "Restrict" NOT NULL DEFAULT 'active',
    "limitedTime" TIMESTAMP(3),

    CONSTRAINT "channelMember_pkey" PRIMARY KEY ("channelMemberId")
);

-- CreateTable
CREATE TABLE "test" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "test_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_profileCreator_key" ON "profile"("profileCreator");

-- CreateIndex
CREATE UNIQUE INDEX "test_name_key" ON "test"("name");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_profileCreator_fkey" FOREIGN KEY ("profileCreator") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGame" ADD CONSTRAINT "UserGame_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGame" ADD CONSTRAINT "UserGame_GameId_fkey" FOREIGN KEY ("GameId") REFERENCES "Game"("GameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatRoom_fkey" FOREIGN KEY ("chatRoom") REFERENCES "channel"("channelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channel" ADD CONSTRAINT "channel_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channelMember" ADD CONSTRAINT "channelMember_member_fkey" FOREIGN KEY ("member") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channelMember" ADD CONSTRAINT "channelMember_channel_fkey" FOREIGN KEY ("channel") REFERENCES "channel"("channelId") ON DELETE RESTRICT ON UPDATE CASCADE;
