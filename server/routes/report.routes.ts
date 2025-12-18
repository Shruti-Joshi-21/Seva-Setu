import express from "express";
import multer from "multer";
import { createReport } from "../controllers/report.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();
const upload = multer();

// Expect 2 images
router.post(
  "/",
  protect,
  upload.fields([
    { name: "before", maxCount: 1 },
    { name: "after", maxCount: 1 },
  ]),
  createReport
);

export default router;
