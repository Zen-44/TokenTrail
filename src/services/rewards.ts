import { Request, Response } from 'express';
import db from './db.js';

export const getRewards = async (req: Request, res: Response) => {
    const { festivalId } = req.params;
    const rewards = await db.reward.findMany({
        where: { festivalId: parseInt(festivalId) },
    });
    res.json(rewards);
};


export const createReward = async (req: Request, res: Response) => {
    const { festivalId, title, description, price, location, stock, image, category, tag } = req.body;

    const reward = await db.reward.create({
        data: {
            title,
            description,
            price,
            location,
            stock,
            image,
            category,
            tag,
            festivalId: festivalId,
        },
    });

    res.status(201).json(reward);
};

export const updateReward = async (req: Request, res: Response) => {
    const { rewardId } = req.params;
    const { title, description, price, location, stock, image, category, tag } = req.body;

    const reward = await db.reward.update({
        where: { id: parseInt(rewardId) },
        data: {
            title,
            description,
            price,
            location,
            stock,
            image,
            category,
            tag,
        },
    });

    res.json(reward);
};

export const deleteReward = async (req: Request, res: Response) => {
    const { rewardId } = req.params;
    await db.reward.delete({
        where: { id: parseInt(rewardId) },
    });
    res.sendStatus(204);
};
