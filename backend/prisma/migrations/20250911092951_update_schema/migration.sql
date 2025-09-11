/*
  Warnings:

  - You are about to drop the column `url` on the `FestivalPhoto` table. All the data in the column will be lost.
  - Added the required column `photo` to the `FestivalPhoto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."FestivalPhoto" DROP COLUMN "url",
ADD COLUMN     "photo" BYTEA NOT NULL;

-- AlterTable
ALTER TABLE "public"."Token" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."MissionPhoto" (
    "id" SERIAL NOT NULL,
    "missionId" INTEGER NOT NULL,
    "photo" BYTEA NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MissionPhoto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."MissionPhoto" ADD CONSTRAINT "MissionPhoto_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "public"."Mission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
