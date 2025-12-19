import express from "express";
import { protect } from "../middleware/auth.middleware";
import { getTeamSummary } from "../controllers/teamSummary.controller";

const router = express.Router();

router.get("/summary", protect, getTeamSummary);

export default router;
