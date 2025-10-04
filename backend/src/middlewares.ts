import express from "express";
import jwt from "jsonwebtoken";
import prisma, { getUserByWallet, getFestivalById } from "./services/db.js";

// Extend Express Request type to include user property
declare global {
    namespace Express {
      interface Request {
        user?: any;
      }
    }
  }

export function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers.authorization;
    // if (!authHeader) return res.status(401).json({ error: "No token" });
    if (!authHeader){
      console.log("No auth header, using temporary user");
      req.user = { id: 1, wallet: "4HyurZ5ST7ZqiWK16fYfaBRXSxrpjJQfXje34TwHgbqC" }; // TEMPORARY
      next();
      return;
    }
  
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token is missing or malformed" });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded;
      next();
    } catch(e) {
      console.error("Invalid token", e);
      return res.status(403).json({ error: "Invalid token" });
    }
  }
  
export async function adminMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.user) {
      console.error("Authentication required for adminMiddleware");
      return res.status(401).json({ error: "Authentication required" });
    }
  
    try {
      const walletAddress = req.user.walletAddress || req.user.wallet;
      const user = await getUserByWallet(walletAddress);
      if (!user || !user.isAdmin) {
        console.warn(`Admin access denied for user: ${walletAddress}`);
        return res.status(403).json({ error: "Admin access required" });
      }
      next();
    } catch (error) {
      console.error("Error in adminMiddleware:", error);
      return res.status(500).json({ error: "Failed to verify admin status" });
    }
  }

export async function organizerMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.user) {
        console.error("Authentication required for organizerMiddleware");
        return res.status(401).json({ error: "Authentication required" });
    }

    try {
        const walletAddress = req.user.walletAddress || req.user.wallet;
        const user = await getUserByWallet(walletAddress);
        if (user && user.isAdmin) {
            console.log("User is admin, granting organizer access.");
            next();
            return;
        }
        const festivalId = req.body.festivalId;
        const festival = await getFestivalById(festivalId);
        const isOrganizer = festival && festival.wallet == walletAddress;
        if (!user || !festival || !isOrganizer) {
            console.warn(`Organizer access denied for user ${walletAddress} on festival ${festivalId}`);
            return res.status(403).json({ error: "Organizer access required" });
        }
        next();
    } catch (error) {
        console.error("Error in organizerMiddleware:", error);
        return res.status(500).json({ error: "Failed to verify organizer status" });
    }
}

export async function festivalEditorMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.user) {
        console.error("Authentication required for festivalEditorMiddleware");
        return res.status(401).json({ error: "Authentication required" });
    }

    let festivalId: number | undefined;

    if (req.params.festivalId) {
        festivalId = parseInt(req.params.festivalId, 10);
    } else if (req.body.festivalId) {
        festivalId = req.body.festivalId;
    } else if (req.params.id) {
        const questId = parseInt(req.params.id, 10);
        if (!isNaN(questId)) {
            const quest = await prisma.quest.findUnique({ where: { id: questId } });
            if (quest) { // Check if quest exists before accessing it
                festivalId = quest.festivalId;
            }
        }
    } else if (req.params.stepId) {
        const stepId = parseInt(req.params.stepId, 10);
        if (!isNaN(stepId)) {
            const step = await prisma.step.findUnique({ where: { id: stepId }, include: { quest: true } });
            if (step) {
                festivalId = step.quest.festivalId;
            }
        }
    }


    if (!festivalId) {
        return res.status(400).json({ error: "Invalid festival ID" });
    }

    try {
        const walletAddress = req.user.walletAddress || req.user.wallet;
        const user = await getUserByWallet(walletAddress);
        if (!user) {
            console.warn(`User not found: ${walletAddress}`);
            return res.status(404).json({ error: "User not found" });
        }

        if (user.isAdmin) {
            return next();
        }

        const festival = await getFestivalById(festivalId);
        if (festival?.wallet === user.wallet) {
            return next();
        }

        const editor = await prisma.festivalEditor.findUnique({
            where: {
                festivalId_userId: {
                    festivalId,
                    userId: user.id,
                },
            },
        });

        if (editor) {
            return next();
        }

        console.warn(`Editor access denied for user ${user.wallet} on festival ${festivalId}`);
        return res.status(403).json({ error: "You do not have permission to edit this festival's quests." });
    } catch (error) {
        console.error("Error in festivalEditorMiddleware:", error);
        return res.status(500).json({ error: "Failed to verify editor status" });
    }
}

export async function festivalOrganizerMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.user) {
        console.error("Authentication required for festivalOrganizerMiddleware");
        return res.status(401).json({ error: "Authentication required" });
    }

    const festivalId = parseInt(req.params.id);
    if (isNaN(festivalId)) {
        return res.status(400).json({ error: "Invalid festival ID" });
    }

    try {
        const walletAddress = req.user.walletAddress || req.user.wallet;
        const user = await getUserByWallet(walletAddress);
        if (!user) {
            console.warn(`User not found: ${walletAddress}`);
            return res.status(404).json({ error: "User not found" });
        }

        if (user.isAdmin) {
            return next();
        }

        const festival = await getFestivalById(festivalId);
        if (festival?.wallet === user.wallet) {
            return next();
        }

        console.warn(`Organizer access denied for user ${user.wallet} on festival ${festivalId}`);
        return res.status(403).json({ error: "You do not have permission to edit this festival." });
    } catch (error) {
        console.error("Error in festivalOrganizerMiddleware:", error);
        return res.status(500).json({ error: "Failed to verify organizer status" });
    }
}

