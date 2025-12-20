import type { Request, Response } from "express";
import { User } from "../models/User";
import { generateToken } from "../utils/jwt";
import { generateFaceEmbedding } from "../utils/faceEmbedding";

export const signupWithFace = async (req: any, res: Response) => {
  try {
    const { name, email, role } = req.body;

    if (!name || !email || !role || !req.file) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const embedding = await generateFaceEmbedding(req.file.buffer);

    const user = await User.create({
      name,
      email,
      role,
      faceEmbedding: embedding,
    });

    const token = generateToken({
      id: user._id.toString(),
      role: user.role,
    });

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return res.status(500).json({ message: "Signup failed" });
  }
};
