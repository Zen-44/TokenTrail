import { PrismaClient } from "../../generated/prisma/client.js";
import { sendTokens } from './solana.js';
const prisma = new PrismaClient();

export async function createQuest(data: any) {
    const { steps, startDate, endDate, ...questData } = data;
    return prisma.quest.create({
        data: {
            ...questData,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
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
    const { steps, startDate, endDate, ...questData } = data;

    const updateData: any = { ...questData };
    if (startDate) {
        updateData.startDate = new Date(startDate);
    }
    if (endDate) {
        updateData.endDate = new Date(endDate);
    }

    return prisma.$transaction(async (tx) => {
        const updatedQuest = await tx.quest.update({
            where: { id },
            data: updateData,
            include: {
                steps: true,
            }
        });

        if (steps) {
            const existingStepIds = updatedQuest.steps.map(s => s.id);
            const incomingStepIds = steps.map((s: any) => s.id).filter((id: any) => id);

            const stepsToDelete = existingStepIds.filter(id => !incomingStepIds.includes(id));
            if (stepsToDelete.length > 0) {
                await tx.stepProgress.deleteMany({
                    where: { stepId: { in: stepsToDelete } },
                });
                await tx.step.deleteMany({
                    where: { id: { in: stepsToDelete } },
                });
            }

            for (const [index, step] of steps.entries()) {
                if (step.id) { // Update existing step
                    await tx.step.update({
                        where: { id: step.id },
                        data: { title: step.title, order: index },
                    });
                } else { // Create new step
                    await tx.step.create({
                        data: {
                            title: step.title,
                            order: index,
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
        const steps = await tx.step.findMany({
            where: { questId: id },
            select: { id: true },
        });
        const stepIds = steps.map(step => step.id);

        if (stepIds.length > 0) {
            await tx.stepProgress.deleteMany({
                where: { stepId: { in: stepIds } },
            });
        }

        await tx.questProgress.deleteMany({
            where: { questId: id },
        });

        await tx.step.deleteMany({
            where: { questId: id },
        });

        return tx.quest.delete({
            where: { id },
        });
    });
}

export async function getStepsForQuest(questId: number) {
    return prisma.step.findMany({
        where: { questId },
        orderBy: { order: 'asc' }
    });
}

export async function updateStepProgress(stepId: number, wallet: string, completed: boolean) {
    const user = await prisma.user.findUnique({ where: { wallet } });
    if (!user) {
        throw new Error("User not found");
    }

    // Get the step information to find the associated quest
    const step = await prisma.step.findUnique({
        where: { id: stepId },
        include: {
            quest: {
                include: {
                    steps: true,
                    festival: true
                }
            }
        }
    });

    if (!step) {
        throw new Error("Step not found");
    }

    return prisma.$transaction(async (tx) => {
        // Update the step progress
        await tx.stepProgress.upsert({
            where: {
                userId_stepId: {
                    userId: user.id,
                    stepId: stepId
                }
            },
            update: {
                completed: completed
            },
            create: {
                userId: user.id,
                stepId: stepId,
                completed: completed
            }
        });

        if (completed) {
            // Check if all steps are completed for this quest
            const stepProgresses = await tx.stepProgress.findMany({
                where: {
                    userId: user.id,
                    step: {
                        questId: step.quest.id
                    }
                }
            });

            const allStepsCompleted = step.quest.steps.every(questStep =>
                stepProgresses.some(progress =>
                    progress.stepId === questStep.id && progress.completed
                )
            );

            if (allStepsCompleted) {
                // Check if user has already completed this quest
                const existingProgress = await tx.questProgress.findUnique({
                    where: {
                        userId_questId: {
                            userId: user.id,
                            questId: step.quest.id
                        }
                    }
                });

                if (existingProgress?.completed) {
                    console.log(`User ${user.wallet} has already completed quest ${step.quest.id}`);
                    return true;
                }

                // Update quest progress to completed
                await tx.questProgress.upsert({
                    where: {
                        userId_questId: {
                            userId: user.id,
                            questId: step.quest.id
                        }
                    },
                    update: {
                        completed: true
                    },
                    create: {
                        userId: user.id,
                        questId: step.quest.id,
                        completed: true
                    }
                });

                // Send the reward tokens to the user's wallet
                if (step.quest.festival.tokenAddress) {
                    try {
                        await sendTokens(
                            step.quest.festival.tokenAddress,
                            user.wallet,
                            step.quest.reward
                        );
                        console.log(`Sent ${step.quest.reward} tokens to ${user.wallet} for completing quest ${step.quest.id}`);
                    } catch (error) {
                        console.error('Failed to send tokens:', error);
                        throw new Error('Failed to send reward tokens');
                    }
                }
            }
        }

        return true;
    });
}


