import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();


export async function addFestival(data: {
	name: string;
	description?: string;
}): Promise<any> {
	return prisma.festival.create({ data });
}


export async function getFestivals(): Promise<any[]> {
	return prisma.festival.findMany();
}


export default prisma;
