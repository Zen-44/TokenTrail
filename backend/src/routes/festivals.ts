import express from "express";
import { addEditor, removeEditor, getEditors, updateOwnFestival } from "../services/festivals.js";
import { getQuestsByFestivalId, getUserByWallet, getFestivals, addFestival, getFestivalById, getAllFestivals, updateFestivalApproval, updateFestival, updateFestivalTokenAddress } from "../services/db.js";
import { authMiddleware, adminMiddleware, organizerMiddleware, festivalOrganizerMiddleware, festivalEditorMiddleware } from "../middlewares.js";
import { createToken } from "../services/solana.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const router = express.Router();

// Get all festivals (public)
router.get("/", authMiddleware, async (req, res) => {
    try {
      const festivals = await getFestivals();
      res.json({ festivals });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch festivals" });
    }
  });

// Get a specific festival by ID
router.get("/:id", authMiddleware, async (req, res) => {
    const festivalId = parseInt(req.params.id, 10);
    try {
        const festival = await getFestivalById(festivalId);
        if (!festival) {
        return res.status(404).json({ error: "Festival not found" });
        }
        res.json({ festival });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch festival" });
    }
});

// Get all festivals (admin)
router.get("/admin/all", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const festivals = await getAllFestivals();
        res.json({ festivals });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch festivals" });
    }
});

// Get quests for a festival
router.get("/:id/quests", authMiddleware, async (req, res) => {
    const festivalId = parseInt(req.params.id, 10);
    const wallet = req.user.wallet;

    const quests = await getQuestsByFestivalId(festivalId, req.user.id);

    res.json({ wallet, quests });
});

// Create a new festival
router.post("/", async (req, res) => {
    console.log("Festival form submission received ", req.body.festivalName);

    try {

        const {
        festivalName,
        organizerName,
        email,
        phone,
        location,
        startDate,
        endDate,
        expectedAttendees,
        sponsorBudget,
        description,
        website,
        tokenName,
        tokenSymbol,
        tokenSupply,
        wallet,
        } = req.body;

        // Parse dates and set default times
        const parsedStartDate = new Date(startDate + 'T00:00:00.000Z');
        const parsedEndDate = new Date(endDate + 'T23:59:59.999Z');

        const festival = await addFestival({
        festivalName,
        organizerName,
        email,
        phone,
        location,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        expectedAttendees,
        sponsorBudget,
        description,
        website,
        tokenName,
        tokenSymbol,
        tokenSupply: tokenSupply ? BigInt(tokenSupply) : null,
        wallet,
        });

        res.status(201).json({ festival });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add festival" });
    }
});

// Update festival approval status (admin)
router.put("/:id/approval", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const festivalId = parseInt(req.params.id, 10);
        const { approved } = req.body;

        console.log(`Updating festival ${festivalId} approval to ${approved} by admin ${req.user.walletAddress}`);

        if (typeof approved !== 'boolean') {
        return res.status(400).json({ error: "approved field must be a boolean" });
        }

        const festival = await updateFestivalApproval(festivalId, approved);
        res.json({ 
        festival,
        message: `Festival ${approved ? 'approved' : 'disapproved'} successfully` 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update festival approval" });
    }
});

// Update a festival (admin)
router.put("/:id/admin", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const festivalId = parseInt(req.params.id, 10);
        const data = req.body;

        // remove id from data
        delete data.id;

        // handle dates
        if (data.startDate) {
        const startDate = new Date(data.startDate);
        startDate.setUTCHours(0, 0, 0, 0);
        data.startDate = startDate;
        }
        if (data.endDate) {
        const endDate = new Date(data.endDate);
        endDate.setUTCHours(23, 59, 59, 999);
        data.endDate = endDate;
        }

        // handle BigInt
        if (data.tokenSupply) {
        data.tokenSupply = BigInt(data.tokenSupply);
        }

        const festival = await updateFestival(festivalId, data);
        res.json({
        festival,
        message: `Festival updated successfully`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update festival" });
    }
});

// Generate token for a festival
router.post("/:id/generate-token", authMiddleware, adminMiddleware, async (req, res) => {
    const festivalId = parseInt(req.params.id, 10);

    try {
        // Fetch festival details from the database
        const festival = await getFestivalById(festivalId);

        if (!festival) {
        return res.status(404).json({ error: "Festival not found" });
        }

        const { tokenName, tokenSymbol, tokenSupply } = festival;

        if (!tokenName || !tokenSymbol || !tokenSupply) {
        return res.status(400).json({ error: "Token details are not set for this festival" });
        }

        // Load the logo
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const logoPath = path.join(__dirname, '..', 'src', 'logo.png');
        const logoBuffer = fs.readFileSync(logoPath);

        // Generate the token on Solana Devnet
        const { tokenAddress } = await createToken(tokenName, tokenSymbol, Number(tokenSupply), logoBuffer);

        // Update the festival with the token address
        const updatedFestival = await updateFestivalTokenAddress(festivalId, tokenAddress);

        res.json(updatedFestival);
    } catch (error) {
        console.error("Failed to generate token:", error);
        res.status(500).json({ error: "Failed to generate token" });
    }
});

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
router.delete("/:id/editors/:editorWallet", authMiddleware, organizerMiddleware, async (req, res) => {
    try {
        const festivalId = parseInt(req.params.id);
        const { editorWallet } = req.params;
        await removeEditor(festivalId, editorWallet);
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
