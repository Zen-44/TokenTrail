import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Prisma, PrismaClient } from "../generated/prisma/client.js";
import nacl from "tweetnacl";
import jwt from "jsonwebtoken";
import { PublicKey } from "@solana/web3.js";

import { addFestival, getFestivals, getAllFestivals, updateFestivalApproval, getUserByWallet } from "./services/db.js";
import { getQuestsByFestivalId } from "./services/db.js";

import { v4 as uuidv4 } from "uuid";

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

function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
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

async function adminMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
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

app.get("/", (req, res) => {
    res.json({ message: "Hello"});
})

//
// AUTH ENDPOINTS
//
app.get("/auth/challenge/:wallet", async (req, res) => {
  console.log("Challenge request for wallet:", req.params.wallet);

  const wallet = req.params.wallet;

  // generate a random nonce (store in DB/Redis with expiration)
  const nonce: string = uuidv4();

  // store it temporarily (you could also use Redis or a DB table)
  await prisma.user.upsert({
    where: { wallet },
    update: { nonce },
    create: { wallet, nonce }
  });

  res.json({ nonce, message: `Sign this message to login: ${nonce}` });
});

app.post("/auth/verify", async (req, res) => {
  const { wallet, signature, nonce } = req.body;

  const user = await prisma.user.findUnique({ where: { wallet } });

  if (!user || user.nonce !== nonce) {
    return res.status(400).json({ error: "Invalid nonce" });
  }

  // verify signature
  const message = `Sign this message to login: ${nonce}`;
  const messageBytes = new TextEncoder().encode(message);
  const signatureUint8 = new Uint8Array(signature);
  const publicKeyBytes = new PublicKey(wallet).toBytes();

  const valid = nacl.sign.detached.verify(messageBytes, signatureUint8, publicKeyBytes);
  if (!valid) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  // generate JWT
  const token = jwt.sign({ wallet }, process.env.JWT_SECRET!, { expiresIn: "1h" });

  // rotate nonce so replay attacks don’t work
  await prisma.user.update({
    where: { wallet },
    data: { nonce: null }
  });

  res.json({ token });

  console.log("User authenticated:", wallet);
});


//
// Festival Endpoints
//
app.get("/festivals", authMiddleware, async (req, res) => {
  try {
    const festivals = await getFestivals();
    res.json({ festivals });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch festivals" });
  }
});

app.get("/admin/festivals", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const festivals = await getAllFestivals();
    res.json({ festivals });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch festivals" });
  }
});

app.get("/festivals/:id/quests", authMiddleware, async (req, res) => {
  const festivalId = parseInt(req.params.id, 10);
  const wallet = req.user.wallet;

  const quests = await getQuestsByFestivalId(festivalId, req.user.id);

  res.json({ wallet, quests });
});

app.post("/festivals", authMiddleware, async (req, res) => {
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
      website
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
    });

    res.status(201).json({ festival });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add festival" });
  }
});

app.put("/admin/festivals/:id/approval", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const festivalId = parseInt(req.params.id, 10);
    const { approved } = req.body;

    console.log(`Updating festival ${festivalId} approval to ${approved} by admin ${req.user.wallet}`);

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


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

