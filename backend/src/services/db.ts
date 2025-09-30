import { Prisma, PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();


export async function getFestivals() {
  return prisma.festival.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export async function addFestival(data: Prisma.FestivalCreateInput) {
  return prisma.festival.create({
    data
  });
}

export async function getQuestsByFestivalId(festivalId: number, userId: number) {
	return prisma.quest.findMany({
		where: { festivalId },
		include: {
			steps: {
				orderBy: { order: "asc" },
				include: {
					progress: {
						where: { userId },
					},
				},
			},
			progress: {
				where: { userId },
			},
		},
	});
}


export default prisma;
