import express from "express";
import { addEditor, removeEditor, getEditors } from "../services/festivals.js";
import { authMiddleware, adminMiddleware, organizerMiddleware } from "../middlewares.js";

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

export default router;
