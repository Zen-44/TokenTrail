import express from "express";
import { addEditor, removeEditor, getEditors, updateOwnFestival } from "../services/festivals.js";
import { authMiddleware, adminMiddleware, organizerMiddleware, festivalOrganizerMiddleware } from "../middlewares.js";

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

export default router;
