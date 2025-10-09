-- CreateEnum
CREATE TYPE "public"."RewardCategory" AS ENUM ('Merchandise', 'FoodAndDrinks', 'Electronics', 'Experiences');

-- CreateEnum
CREATE TYPE "public"."RewardTag" AS ENUM ('Limited', 'Common', 'Rare', 'Premium');

-- CreateTable
CREATE TABLE "public"."Reward" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "category" "public"."RewardCategory" NOT NULL,
    "tag" "public"."RewardTag" NOT NULL,
    "festivalId" INTEGER NOT NULL,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Reward" ADD CONSTRAINT "Reward_festivalId_fkey" FOREIGN KEY ("festivalId") REFERENCES "public"."Festival"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
