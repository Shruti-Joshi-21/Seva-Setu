import type { Response } from "express";
import { Task } from "../models/Task";

export const createTask = async (req: any, res: Response) => {
  try {
    const { title, description, latitude, longitude, date } = req.body;

    if (!title || !latitude || !longitude || !date) {
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
        latitude,
        longitude,
      },
      date,
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
