-- CreateEnum
CREATE TYPE "public"."RewardClaimStatus" AS ENUM ('PENDING', 'PROCESSED', 'DECLINED');

-- CreateTable
CREATE TABLE "public"."RewardClaim" (
    "id" SERIAL NOT NULL,
    "nonce" TEXT NOT NULL,
    "transaction" TEXT,
    "status" "public"."RewardClaimStatus" NOT NULL DEFAULT 'PENDING',
    "claimCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rewardId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "RewardClaim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RewardClaim_nonce_key" ON "public"."RewardClaim"("nonce");

-- CreateIndex
CREATE UNIQUE INDEX "RewardClaim_claimCode_key" ON "public"."RewardClaim"("claimCode");

-- AddForeignKey
ALTER TABLE "public"."RewardClaim" ADD CONSTRAINT "RewardClaim_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "public"."Reward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RewardClaim" ADD CONSTRAINT "RewardClaim_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
