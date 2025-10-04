import { PrismaClient } from "../../generated/prisma/client.js";
const prisma = new PrismaClient();

export async function createQuest(data: any) {
    const { steps, ...questData } = data;
    return prisma.quest.create({
        data: {
            ...questData,
            steps: {
                create: steps,
            },
        },
        include: {
            steps: true,
        },
    });
}

export async function updateQuest(id: number, data: any) {
    const { steps, ...questData } = data;

    return prisma.$transaction(async (tx) => {
        const updatedQuest = await tx.quest.update({
            where: { id },
            data: questData,
            include: {
                steps: true,
            }
        });

        if (steps) {
            const existingStepIds = updatedQuest.steps.map(s => s.id);
            const incomingStepIds = steps.map((s: any) => s.id).filter((id: any) => id);

            const stepsToDelete = existingStepIds.filter(id => !incomingStepIds.includes(id));
            if (stepsToDelete.length > 0) {
                await tx.step.deleteMany({
                    where: { id: { in: stepsToDelete } },
                });
            }

            for (const step of steps) {
                if (step.id) { // Update existing step
                    await tx.step.update({
                        where: { id: step.id },
                        data: { title: step.title, order: step.order },
                    });
                } else { // Create new step
                    await tx.step.create({
                        data: {
                            title: step.title,
                            order: step.order,
                            questId: id,
                        },
                    });
                }
            }
        }

        return tx.quest.findUnique({
            where: { id },
            include: { steps: true },
        });
    });
}

export async function deleteQuest(id: number) {
    return prisma.$transaction(async (tx) => {
        await tx.step.deleteMany({
            where: { questId: id },
        });

        return tx.quest.delete({
            where: { id },
        });
    });
}
