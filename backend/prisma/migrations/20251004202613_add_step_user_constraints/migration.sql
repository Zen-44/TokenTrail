/*
  Warnings:

  - A unique constraint covering the columns `[userId,questId]` on the table `QuestProgress` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,stepId]` on the table `StepProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QuestProgress_userId_questId_key" ON "public"."QuestProgress"("userId", "questId");

-- CreateIndex
CREATE UNIQUE INDEX "StepProgress_userId_stepId_key" ON "public"."StepProgress"("userId", "stepId");
