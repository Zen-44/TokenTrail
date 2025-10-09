import { Router } from 'express';
import { authMiddleware, canEditFestival } from '../middlewares.js';
import * as RewardsService from '../services/rewards.js';

const router = Router();

router.get('/:festivalId', authMiddleware, RewardsService.getRewards);
router.post('/', authMiddleware, canEditFestival, RewardsService.createReward);
router.put('/:rewardId', authMiddleware, canEditFestival, RewardsService.updateReward);
router.delete('/:rewardId', authMiddleware, canEditFestival, RewardsService.deleteReward);

export default router;
