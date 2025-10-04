import express from "express";
import jwt from "jsonwebtoken";
import { getUserByWallet, getFestivalById } from "./services/db.js";

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
      req.user = { id: 1, wallet: "4HyurZ5ST7ZqiWK16fYfaBRXSxrpjJQfXje34TwHgbqC" }; // TEMPORARY
      next();
      return;
    }
  
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded;
      next();
    } catch {
      return res.status(403).json({ error: "Invalid token" });
    }
  }
  
export async function adminMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }
  
    try {
      const user = await getUserByWallet(req.user.wallet);
      if (!user || !user.isAdmin) {
        return res.status(403).json({ error: "Admin access required" });
      }
      next();
    } catch (error) {
      return res.status(500).json({ error: "Failed to verify admin status" });
    }
  }

export async function organizerMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
    }

    try {
        const user = await getUserByWallet(req.user.wallet);
        if (user && user.isAdmin) {
            next();
            return;
        }
        const festival = await getFestivalById(req.body.festivalId);
        const isOrganizer = festival && festival.wallet == req.user.wallet;
        if (!user || !festival || !isOrganizer) {
            return res.status(403).json({ error: "Organizer access required" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: "Failed to verify organizer status" });
    }
}

