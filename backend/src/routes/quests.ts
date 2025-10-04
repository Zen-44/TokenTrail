import express from "express";
import { createQuest, updateQuest, deleteQuest } from "../services/quests.js";
import { authMiddleware, festivalEditorMiddleware } from "../middlewares.js";

const router = express.Router();

// Create a new quest
router.post("/", authMiddleware, festivalEditorMiddleware, async (req, res) => {
    try {
        const quest = await createQuest(req.body);
        res.status(201).json(quest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create quest" });
    }
});

// Update a quest
router.put("/:id", authMiddleware, festivalEditorMiddleware, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const quest = await updateQuest(id, req.body);
        res.json(quest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update quest" });
    }
});

// Delete a quest
router.delete("/:id", authMiddleware, festivalEditorMiddleware, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await deleteQuest(id);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete quest" });
    }
});

export default router;
