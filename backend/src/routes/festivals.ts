import express from "express";
import { addEditor, removeEditor, getEditors, updateOwnFestival } from "../services/festivals.js";
import { getQuestsByFestivalId, getUserByWallet } from "../services/db.js";
import { authMiddleware, adminMiddleware, organizerMiddleware, festivalOrganizerMiddleware, festivalEditorMiddleware } from "../middlewares.js";

const router = express.Router();

// Get all editors for a festival
router.get("/:id/editors", authMiddleware, async (req, res) => {
    try {
        const festivalId = parseInt(req.params.id);
        const editors = await getEditors(festivalId);
        res.json(editors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get editors" });
    }
});

// Add an editor to a festival
router.post("/:id/editors", authMiddleware, organizerMiddleware, async (req, res) => {
    try {
        const festivalId = parseInt(req.params.id);
        const { wallet } = req.body;
        const editor = await addEditor(festivalId, wallet);
        res.status(201).json(editor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add editor" });
    }
});

// Remove an editor from a festival
router.delete("/:id/editors", authMiddleware, organizerMiddleware, async (req, res) => {
    try {
        const festivalId = parseInt(req.params.id);
        const { wallet } = req.body;
        await removeEditor(festivalId, wallet);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to remove editor" });
    }
});

// Update a festival (organizer only)
router.put("/:id/organizer", authMiddleware, festivalOrganizerMiddleware, async (req, res) => {
    try {
        const festivalId = parseInt(req.params.id);
        const festival = await updateOwnFestival(festivalId, req.body);
        res.json({
            festival,
            message: `Festival updated successfully`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update festival" });
    }
});

// Get user progress for a festival
router.get("/:festivalId/progress/:userWallet", authMiddleware, festivalEditorMiddleware, async (req, res) => {
    try {
        const festivalId = parseInt(req.params.festivalId);
        const userWallet = req.params.userWallet;

        const user = await getUserByWallet(userWallet);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (isNaN(festivalId)) {
            return res.status(400).json({ error: "Invalid festival ID" });
        }

        const quests = await getQuestsByFestivalId(festivalId, user.id);
        res.json({ quests });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch user progress" });
    }
});

export default router;
