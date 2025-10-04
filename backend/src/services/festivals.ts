import { PrismaClient } from "../../generated/prisma/client.js";
const prisma = new PrismaClient();

export async function getEditors(festivalId: number) {
    const editors = await prisma.festivalEditor.findMany({
        where: { festivalId },
        include: { user: { select: { wallet: true } } },
    });
    return editors.map(editor => editor.user.wallet);
}

export async function addEditor(festivalId: number, userWallet: string) {
    const user = await prisma.user.findUnique({ where: { wallet: userWallet } });
    if (!user) {
        throw new Error("User not found");
    }

    return prisma.festivalEditor.create({
        data: {
            festivalId,
            userId: user.id,
        },
    });
}

export async function removeEditor(festivalId: number, userWallet: string) {
    const user = await prisma.user.findUnique({ where: { wallet: userWallet } });
    if (!user) {
        // don't throw error
        return;
    }

    return prisma.festivalEditor.delete({
        where: {
            festivalId_userId: {
                festivalId,
                userId: user.id,
            },
        },
    });
}

export async function updateOwnFestival(festivalId: number, data: any) {
    // Destructure to remove fields that should not be updated by the organizer
    const { approved, wallet, tokenAddress, ...restOfData } = data;

    return prisma.festival.update({
        where: { id: festivalId },
        data: restOfData,
    });
}
