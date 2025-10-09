-- CreateTable
CREATE TABLE "public"."FestivalEditor" (
    "id" SERIAL NOT NULL,
    "festivalId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FestivalEditor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FestivalEditor_festivalId_userId_key" ON "public"."FestivalEditor"("festivalId", "userId");

-- AddForeignKey
ALTER TABLE "public"."FestivalEditor" ADD CONSTRAINT "FestivalEditor_festivalId_fkey" FOREIGN KEY ("festivalId") REFERENCES "public"."Festival"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FestivalEditor" ADD CONSTRAINT "FestivalEditor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
