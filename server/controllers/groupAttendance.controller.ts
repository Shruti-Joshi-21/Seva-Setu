import type { Response } from "express";
import { Attendance } from "../models/Attendance";
import { Task } from "../models/Task";

export const groupAttendance = async (req: any, res: Response) => {
  try {
    const { taskId, userIds, latitude, longitude } = req.body;

    if (!taskId || !userIds || !latitude || !longitude) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 🔐 Role check
    if (!["LEADER", "ADMIN"].includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Group photo required" });
    }

    const results = [];

    for (const userId of userIds) {
      try {
        const attendance = await Attendance.create({
          user: userId,
          task: taskId,
          location: { latitude, longitude },
          imageHash: "group-photo",
          faceMatchScore: 1,
          status: "VALID",
        });

        results.push({ userId, status: "MARKED" });
      } catch {
        results.push({ userId, status: "DUPLICATE / FAILED" });
      }
    }

    return res.status(201).json({
      message: "Group attendance processed",
      results,
    });
  } catch (error) {
    console.error("GROUP ATTENDANCE ERROR:", error);
    return res.status(500).json({ message: "Failed group attendance" });
  }
};
