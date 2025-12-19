import express from "express";
import { createTask } from "../controllers/task.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

// Create task
router.post("/create", protect, createTask);

export default router;
