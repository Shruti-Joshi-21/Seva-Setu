import type { Response } from "express";
import { User } from "../models/User";
import { generateFaceEmbedding } from "../utils/faceEmbedding";

export const registerFace = async (req: any, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Face image required" });
    }

    const userId = req.user.id;

    const embedding = await generateFaceEmbedding(req.file.buffer);

    await User.findByIdAndUpdate(userId, {
      faceEmbedding: embedding,
    });

    return res.json({ message: "Face registered successfully" });
  } catch (error) {
    console.error("FACE REGISTER ERROR:", error);
    return res.status(500).json({ message: "Face registration failed" });
  }
};
