-- CreateTable
CREATE TABLE "public"."Festival" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Festival_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Token" (
    "id" SERIAL NOT NULL,
    "festivalId" INTEGER NOT NULL,
    "mintAddress" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "decimals" INTEGER NOT NULL DEFAULT 9,
    "supply" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Mission" (
    "id" SERIAL NOT NULL,
    "festivalId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "rewardAmount" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FestivalPhoto" (
    "id" SERIAL NOT NULL,
    "festivalId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FestivalPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_festivalId_key" ON "public"."Token"("festivalId");

-- CreateIndex
CREATE UNIQUE INDEX "Token_mintAddress_key" ON "public"."Token"("mintAddress");

-- AddForeignKey
ALTER TABLE "public"."Token" ADD CONSTRAINT "Token_festivalId_fkey" FOREIGN KEY ("festivalId") REFERENCES "public"."Festival"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Mission" ADD CONSTRAINT "Mission_festivalId_fkey" FOREIGN KEY ("festivalId") REFERENCES "public"."Festival"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FestivalPhoto" ADD CONSTRAINT "FestivalPhoto_festivalId_fkey" FOREIGN KEY ("festivalId") REFERENCES "public"."Festival"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
