import type { Response } from "express";
import { Task } from "../models/Task";

export const createTask = async (req: any, res: Response) => {
  try {
    const {
      title,
      description,
      location,
      startDate,
      latitude,
      longitude,
      date,
    } = req.body;

    // ✅ Accept BOTH formats (UI safe)
    const taskDate = date || startDate;
    const taskLatitude = latitude ?? 0;
    const taskLongitude = longitude ?? 0;

    if (!title || !taskDate) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    if (!["ADMIN", "LEADER"].includes(req.user.role)) {
      return res.status(403).json({
        message: "Not allowed to create tasks",
      });
    }

    const task = await Task.create({
      title,
      description,
      location: {
        latitude: taskLatitude,
        longitude: taskLongitude,
        address: location || "General Area",
      },
      date: new Date(taskDate),
      createdBy: req.user.id,
    });

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("CREATE TASK ERROR:", error);
    return res.status(500).json({
      message: "Failed to create task",
    });
  }
};
