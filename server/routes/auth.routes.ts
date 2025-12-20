import express from "express";
import multer from "multer";
import { sendOTP, verifyOTP } from "../controllers/auth.controllers";
import { signupWithFace } from "../controllers/auth.signup.controller";

const router = express.Router();
const upload = multer();

router.post("/signup", upload.single("image"), signupWithFace);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

export default router;

