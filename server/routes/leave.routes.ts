import express from "express";
import {
  applyLeave,
  approveLeave,
  getMyLeaves,
} from "../controllers/leave.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

// Volunteer
router.post("/", protect, applyLeave);
router.get("/my", protect, getMyLeaves);

// Leader/Admin
router.put("/:id/approve", protect, approveLeave);

export default router;
