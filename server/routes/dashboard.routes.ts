import express from "express";
import { protect } from "../middleware/auth.middleware";
import {
  getImpactDashboard,
  getAttendanceDashboard,
  getReportsDashboard,
} from "../controllers/dashboard.controller";

const router = express.Router();

router.get("/impact", protect, getImpactDashboard);
router.get("/attendance", protect, getAttendanceDashboard);
router.get("/reports", protect, getReportsDashboard);

export default router;
