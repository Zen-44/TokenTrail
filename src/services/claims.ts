import prisma from './db.js';
import { RewardClaimStatus } from '../../generated/prisma/client.js';
import { Connection, PublicKey } from '@solana/web3.js';
import { randomBytes } from 'crypto';

const SOLANA_NETWORK = 'devnet';
const connection = new Connection(`https://api.${SOLANA_NETWORK}.solana.com`);

export async function initiateClaim(userId: number, rewardId: number): Promise<string> {
    const nonce = randomBytes(16).toString('hex');

    await prisma.rewardClaim.create({
        data: {
            nonce,
            reward: { connect: { id: rewardId } },
            user: { connect: { id: userId } },
        },
    });

    return nonce;
}

export async function verifyClaim(userId: number, transaction: string, nonce: string) {
    const claim = await prisma.rewardClaim.findUnique({
        where: { nonce },
        include: { reward: { include: { festival: true } }, user: true },
    });

    if (!claim || claim.userId !== userId) {
        throw new Error('Invalid nonce');
    }

    if (claim.status !== RewardClaimStatus.PENDING) {
        throw new Error('Claim already processed');
    }

    // Immediately update the status to PROCESSING and save the transaction signature.
    // The actual verification will happen in the background.
    await prisma.rewardClaim.update({
        where: { id: claim.id },
        data: {
            transaction,
            status: 'PROCESSING',
        },
    });

    // Start background verification without waiting for it to complete
    verifyTransactionInBackground(claim, transaction);

    // Return the current state of the claim
    return prisma.rewardClaim.findUnique({ where: { id: claim.id } });
}

async function verifyTransactionInBackground(claim: any, transaction: string) {
    console.log(`[Claim ${claim.id}] Starting verification for tx: ${transaction}`);
    const maxRetries = 10;
    const retryDelay = 2500; // 2.5 seconds

    for (let i = 0; i < maxRetries; i++) {
        try {
            const tx = await connection.getParsedTransaction(transaction, {
                maxSupportedTransactionVersion: 0,
            });

            if (tx && tx.meta) {
                let isVerified = false;

                // 1. Verify the memo
                const memoInstruction = tx.transaction.message.instructions.find(
                    (ix: any) => ix.program === 'spl-memo'
                );

                if (memoInstruction && 'parsed' in memoInstruction) {
                    const memoContent = memoInstruction.parsed;
                    const isMemoVerified = memoContent === claim.nonce;
                    console.log(`[Claim ${claim.id}] Memo verification: ${isMemoVerified} (Expected: ${claim.nonce}, Got: ${memoContent})`);

                    if (isMemoVerified) {
                        const burnInstruction = tx.transaction.message.instructions.find(
                            (ix: any) =>
                                ix.program === 'spl-token' && ix.parsed?.type === 'burn'
                        );

                        if (burnInstruction && 'parsed' in burnInstruction) {
                            const { info } = burnInstruction.parsed;
                            const tokenAddress = claim.reward.festival.tokenAddress;
                            const requiredBurnAmount = claim.reward.price;

                            const isMintCorrect = info.mint === tokenAddress;
                            const burnAmount = BigInt(info.amount);
                            const requiredBurnAmountWithDecimals = BigInt(requiredBurnAmount) * 1000000000n;

                            console.log(`[Claim ${claim.id}] Burn instruction found. Mint: ${info.mint}, Amount: ${info.amount}`);
                            console.log(`[Claim ${claim.id}] Verification details: isMintCorrect=${isMintCorrect}`);

                            if (isMintCorrect && burnAmount >= requiredBurnAmountWithDecimals) {
                                isVerified = true;
                                console.log(`[Claim ${claim.id}] Burn verification successful (Required: >=${requiredBurnAmountWithDecimals}, Burned: ${burnAmount})`);

                                const reward = await prisma.reward.findUnique({ where: { id: claim.reward.id } });
                                if (reward && reward.stock > 0) {
                                    await prisma.reward.update({
                                        where: { id: claim.reward.id },
                                        data: { stock: { decrement: 1 } },
                                    });
                                    // console.log(`[Claim ${claim.id}] Reward stock decremented. New stock: ${reward.stock - 1}`);
                                }
                            } else {
                                console.log(`[Claim ${claim.id}] Burn verification failed. Conditions not met.`);
                            }
                        } else {
                            console.log(`[Claim ${claim.id}] Burn verification failed: No 'burn' instruction found in the transaction.`);
                        }
                    }
                } else {
                    console.log(`[Claim ${claim.id}] Memo verification failed: Memo instruction not found or not parsed.`);
                }

                if (isVerified) {
                    console.log(`[Claim ${claim.id}] Verification successful. Updating status to PROCESSED.`);
                    const claimCode = randomBytes(8).toString('hex').toUpperCase();
                    await prisma.rewardClaim.update({
                        where: { id: claim.id },
                        data: { status: 'PROCESSED', claimCode },
                    });
                } else {
                    console.log(`[Claim ${claim.id}] Verification failed. Updating status to DECLINED.`);
                    await prisma.rewardClaim.update({
                        where: { id: claim.id },
                        data: { status: 'DECLINED' },
                    });
                }
                return; // Exit the loop and function
            }
        } catch (error) {
            console.error(`[Claim ${claim.id}] Attempt ${i + 1} failed for tx ${transaction}:`, error);
        }

        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, retryDelay));
    }

    // If the loop finishes without finding the transaction, mark as declined
    console.log(`[Claim ${claim.id}] Transaction not found after ${maxRetries} retries. Updating status to DECLINED.`);
    await prisma.rewardClaim.update({
        where: { id: claim.id },
        data: { status: 'DECLINED' },
    });
}

export async function getClaimsByUserId(userId: number) {
    return prisma.rewardClaim.findMany({
        where: { userId },
        include: {
            reward: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
}
