/*
  Warnings:

  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[tokenAddress]` on the table `Festival` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Token" DROP CONSTRAINT "Token_festivalId_fkey";

-- AlterTable
ALTER TABLE "public"."Festival" ADD COLUMN     "tokenAddress" TEXT,
ADD COLUMN     "tokenName" TEXT,
ADD COLUMN     "tokenSupply" BIGINT,
ADD COLUMN     "tokenSymbol" TEXT;

-- DropTable
DROP TABLE "public"."Token";

-- CreateIndex
CREATE UNIQUE INDEX "Festival_tokenAddress_key" ON "public"."Festival"("tokenAddress");
