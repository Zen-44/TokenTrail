import { Prisma, PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();


export async function getFestivals() {
  return prisma.festival.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" }
  });
}

export async function getAllFestivals() {
  return prisma.festival.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export async function updateFestivalApproval(festivalId: number, approved: boolean) {
  return prisma.festival.update({
    where: { id: festivalId },
    data: { approved }
  });
}

export async function getUserByWallet(wallet: string) {
  return prisma.user.findUnique({
    where: { wallet }
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
