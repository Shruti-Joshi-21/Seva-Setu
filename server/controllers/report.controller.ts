import type { Response } from "express";
import { Report } from "../models/Report";
import { Task } from "../models/Task";

export const createReport = async (req: any, res: Response) => {
  try {
    const { taskId, wasteCollectedKg, latitude, longitude } = req.body;

    if (!taskId || !latitude || !longitude) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 1️⃣ Verify task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 2️⃣ Verify images
    if (!req.files?.before || !req.files?.after) {
      return res.status(400).json({
        message: "Before and After images are required",
      });
    }

    // 3️⃣ Simulated cloud upload (replace later with S3 / Cloudinary)
    const beforeImageUrl = `cloud://before-${Date.now()}.jpg`;
    const afterImageUrl = `cloud://after-${Date.now()}.jpg`;

    // 4️⃣ Save report
    const report = await Report.create({
      task: taskId,
      submittedBy: req.user.id,
      beforeImageUrl,
      afterImageUrl,
      wasteCollectedKg,
      location: {
        latitude,
        longitude,
      },
    });

    return res.status(201).json({
      message: "Report submitted successfully",
      report,
    });
  } catch (error) {
    console.error("REPORT ERROR:", error);
    return res.status(500).json({ message: "Failed to submit report" });
  }
};
