import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaClient } from "../generated/prisma/client.js";
import { fileURLToPath } from "url";

import questRoutes from "./routes/quests.js";
import festivalRoutes from "./routes/festivals.js";
import authRoutes from "./routes/auth.js";
import rewardRoutes from "./routes/rewards.js";
import claimRoutes from "./routes/claims.js";

// Monkey patch BigInt to allow JSON serialization
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const app = express();
const PORT = process.env.PORT || 4000;
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/quests", questRoutes);
app.use("/api/festivals", festivalRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/claims", claimRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Hello"});
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

