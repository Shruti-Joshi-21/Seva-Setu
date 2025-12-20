import express from "express";
import multer from "multer";
import { protect } from "../middleware/auth.middleware";
import { checkInAttendance } from "../controllers/attendance.controller";

const router = express.Router();
const upload = multer();

router.post(
  "/mark",        // 👈 CHANGE HERE
  protect,
  upload.single("image"),
  checkInAttendance
);

export default router;
