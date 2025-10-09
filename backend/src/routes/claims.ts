import { Router } from 'express';
import { initiateClaim, verifyClaim, getClaimsByUserId, markClaimCodeAsUsed, getClaimByClaimCode } from '../services/claims.js';
import { authMiddleware, canEditFestival } from '../middlewares.js';
import prisma from '../services/db.js';

const router = Router();

router.post('/initiate', authMiddleware, async (req, res) => {
    const { rewardId } = req.body;
    const userId = req.user.userId;

    if (!rewardId) {
        return res.status(400).json({ error: 'Missing rewardId' });
    }

    try {
        const nonce = await initiateClaim(userId, rewardId);
        res.json({ nonce });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to initiate claim' });
    }
});

router.post('/verify', authMiddleware, async (req, res) => {
    const { transaction, nonce } = req.body;
    const userId = req.user.userId;

    if (!transaction || !nonce) {
        return res.status(400).json({ error: 'Missing transaction or nonce' });
    }

    try {
        const claim = await verifyClaim(userId, transaction, nonce);
        res.json(claim);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to verify claim' });
    }
});

router.get('/my-claims', authMiddleware, async (req, res) => {
    const userId = req.user.id;

    try {
        const claims = await getClaimsByUserId(userId);
        res.json(claims);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get claims' });
    }
});

// Middleware to extract festival ID from claim code and add it to req.body for canEditFestival
async function extractFestivalFromClaimCode(req: any, res: any, next: any) {
    const { claimCode } = req.params;
    
    if (!claimCode) {
        return res.status(400).json({ error: 'Claim code is required' });
    }

    try {
        const claim = await prisma.rewardClaim.findUnique({
            where: { claimCode },
            include: { reward: true },
        });

        if (!claim) {
            return res.status(404).json({ error: 'Claim code not found' });
        }

        // Ensure req.body exists and add festivalId so canEditFestival middleware can use it
        if (!req.body) {
            req.body = {};
        }
        req.body.festivalId = claim.reward.festivalId;
        next();
    } catch (error) {
        console.error('Error extracting festival from claim code:', error);
        res.status(500).json({ error: 'Failed to process claim code' });
    }
}

router.get('/:claimCode', authMiddleware, extractFestivalFromClaimCode, canEditFestival, async (req, res) => {
    const { claimCode } = req.params;

    try {
        const claim = await getClaimByClaimCode(claimCode);
        res.json(claim);
    } catch (error) {
        console.error('Error getting claim by claim code:', error);
        
        if (error instanceof Error && error.message === 'Claim code not found') {
            return res.status(404).json({ error: error.message });
        }
        
        res.status(500).json({ error: 'Failed to get claim' });
    }
});

router.put('/:claimCode/mark-used', authMiddleware, extractFestivalFromClaimCode, canEditFestival, async (req, res) => {
    const { claimCode } = req.params;

    try {
        const updatedClaim = await markClaimCodeAsUsed(claimCode);
        res.json({
            message: 'Claim code marked as used successfully',
            claim: updatedClaim,
        });
    } catch (error) {
        console.error('Error marking claim code as used:', error);
        
        // Handle specific error types
        if (error instanceof Error) {
            if (error.message === 'Claim code not found') {
                return res.status(404).json({ error: error.message });
            }
            if (error.message === 'Claim code is not in processed state' || 
                error.message === 'Claim code has already been marked as used') {
                return res.status(400).json({ error: error.message });
            }
        }
        
        res.status(500).json({ error: 'Failed to mark claim code as used' });
    }
});

export default router;
