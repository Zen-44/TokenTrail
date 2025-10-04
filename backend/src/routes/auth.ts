import express from "express";
import { PrismaClient } from "../../generated/prisma/client.js";
import nacl from "tweetnacl";
import jwt from "jsonwebtoken";
import { PublicKey } from "@solana/web3.js";
import { v4 as uuidv4 } from "uuid";
import { getUserByWallet } from "../services/db.js";

const router = express.Router();
const prisma = new PrismaClient();

// Request a token for signing
router.get("/challenge/:walletAddress", async (req, res) => {
  try {
    const { walletAddress } = req.params;
    if (!walletAddress) {
      return res.status(400).json({ error: "Wallet address is required" });
    }

    // Validate wallet address
    try {
      new PublicKey(walletAddress);
    } catch (error) {
      return res.status(400).json({ error: "Invalid wallet address" });
    }

    // Check if user exists, if not create a new one
    let user = await getUserByWallet(walletAddress);
    if (!user) {
      const nonce = uuidv4();
      user = await prisma.user.create({
        data: {
          wallet: walletAddress,
          nonce,
        },
      });
    }

    // The message the user will sign
    const message = `${user.nonce}`;

    // Return both nonce and message, as the frontend expects
    res.json({ nonce: user.nonce, message });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get challenge" });
  }
});
  
  // Login with signed nonce
  router.post("/login", async (req, res) => {
    try {
      const { walletAddress, signature } = req.body;
  
      if (!walletAddress) {
        return res.status(400).json({ error: "Wallet address is required" });
      }

      const user = await getUserByWallet(walletAddress);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!user.nonce) {
        return res.status(400).json({ error: "Nonce not found for this user." });
      }
  
      // Decode signature and nonce from base64
      const signatureUint8 = Buffer.from(signature, "base64");
      const nonceBytes = new TextEncoder().encode(user.nonce);
      const publicKey = new PublicKey(walletAddress).toBytes();
  
      // Verify signature
      const isVerified = nacl.sign.detached.verify(
        nonceBytes,
        signatureUint8,
        publicKey
      );
  
      if (!isVerified) {
        return res.status(401).json({ error: "Invalid signature" });
      }
  
      // Generate a new nonce for future logins
      const newNonce = uuidv4();
      await prisma.user.update({
        where: { id: user.id },
        data: { nonce: newNonce },
      });
  
      // Generate JWT
      const token = jwt.sign(
        { userId: user.id, walletAddress: user.wallet, isAdmin: user.isAdmin },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );
  
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to login" });
    }
  });

export default router;
