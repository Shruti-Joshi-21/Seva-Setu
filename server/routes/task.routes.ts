import express from "express";
import { createTask } from "../controllers/task.controller";
import { protect } from "../middleware/auth.middleware";
import { getMyTasks } from "../controllers/task.controller";

const router = express.Router();

// Create task
router.post("/create", protect, createTask);
router.get("/my", protect, getMyTasks);
export default router;
