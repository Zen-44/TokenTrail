import { Router } from 'express';
import { initiateClaim, verifyClaim, getClaimsByUserId } from '../services/claims.js';
import { authMiddleware } from '../middlewares.js';

const router = Router();

router.post('/initiate', authMiddleware, async (req, res) => {
    const { rewardId } = req.body;
    const userId = req.user.id;

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
    const userId = req.user.id;

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

export default router;
