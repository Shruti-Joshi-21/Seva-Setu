
import express from "express";
import multer from "multer";
import { protect } from "../middleware/auth.middleware";
import { groupAttendance } from "../controllers/groupAttendance.controller";

const router = express.Router();
const upload = multer();

router.post(
  "/group",
  protect,
  upload.single("groupPhoto"),
  groupAttendance
);

export default router;
