import type { Request, Response } from "express";
import { User } from "../models/User";
import { generateToken } from "../utils/jwt";
import { sendOTPEmail } from "../utils/mailer";

// email → { otp, expiry }
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

/* =====================
   1️⃣ SEND OTP (EMAIL)
===================== */
export const sendOTP = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore.set(email, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 mins
  });

  await sendOTPEmail(email, otp);

  return res.json({ message: "OTP sent to email" });
};

/* =====================
   2️⃣ VERIFY OTP
===================== */
export const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const record = otpStore.get(email);
  if (!record || record.otp !== otp) {
    return res.status(401).json({ message: "Invalid OTP" });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return res.status(401).json({ message: "OTP expired" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "User not registered. Please sign up first.",
    });
  }

  const token = generateToken({
    id: user._id.toString(),
    role: user.role,
  });

  otpStore.delete(email);

  return res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
