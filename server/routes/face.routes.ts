import express from "express";
import multer from "multer";
import { registerFace } from "../controllers/face.controller";
import { protect } from "../middleware/auth.middleware";

console.log("✅ face.routes loaded");

const router = express.Router();
const upload = multer();

router.post("/register", protect, upload.single("image"), registerFace);

export default router;
