/*
  Warnings:

  - You are about to drop the column `name` on the `Festival` table. All the data in the column will be lost.
  - You are about to drop the `FestivalPhoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MissionPhoto` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dates` to the `Festival` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Festival` table without a default value. This is not possible if the table is not empty.
  - Added the required column `festivalName` to the `Festival` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Festival` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizerName` to the `Festival` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."FestivalPhoto" DROP CONSTRAINT "FestivalPhoto_festivalId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MissionPhoto" DROP CONSTRAINT "MissionPhoto_missionId_fkey";

-- AlterTable
ALTER TABLE "public"."Festival" DROP COLUMN "name",
ADD COLUMN     "dates" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "expectedAttendees" TEXT,
ADD COLUMN     "festivalName" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "organizerName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "sponsorBudget" TEXT,
ADD COLUMN     "website" TEXT;

-- DropTable
DROP TABLE "public"."FestivalPhoto";

-- DropTable
DROP TABLE "public"."MissionPhoto";
