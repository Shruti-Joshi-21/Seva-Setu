import type { Response } from "express";
import { Attendance } from "../models/Attendance";
import { Report } from "../models/Report";
import { Task } from "../models/Task";

// 🔐 Admin-only guard
const ensureAdmin = (role: string) =>
  role === "ADMIN";

// ------------------------------------------------
// 📊 IMPACT DASHBOARD
// ------------------------------------------------
export const getImpactDashboard = async (req: any, res: Response) => {
  try {
    if (!ensureAdmin(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const totalWaste = await Report.aggregate([
      {
        $group: {
          _id: null,
          totalKg: { $sum: "$wasteCollectedKg" },
        },
      },
    ]);

    const volunteerCount = await Attendance.distinct("user");

    return res.json({
      totalWasteKg: totalWaste[0]?.totalKg || 0,
      volunteersParticipated: volunteerCount.length,
    });
  } catch (err) {
    console.error("IMPACT DASHBOARD ERROR:", err);
    return res.status(500).json({ message: "Failed to fetch impact data" });
  }
};

// ------------------------------------------------
// 📊 ATTENDANCE DASHBOARD
// ------------------------------------------------
export const getAttendanceDashboard = async (req: any, res: Response) => {
  try {
    if (!ensureAdmin(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const stats = await Attendance.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const result = {
      total: 0,
      valid: 0,
      rejected: 0,
    };

    stats.forEach((s) => {
      result.total += s.count;
      if (s._id === "VALID") result.valid = s.count;
      if (s._id === "REJECTED") result.rejected = s.count;
    });

    return res.json(result);
  } catch (err) {
    console.error("ATTENDANCE DASHBOARD ERROR:", err);
    return res.status(500).json({ message: "Failed to fetch attendance data" });
  }
};

// ------------------------------------------------
// 📊 REPORTS DASHBOARD
// ------------------------------------------------
export const getReportsDashboard = async (req: any, res: Response) => {
  try {
    if (!ensureAdmin(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const reportsByTask = await Report.aggregate([
      {
        $group: {
          _id: "$task",
          reportCount: { $sum: 1 },
          totalWaste: { $sum: "$wasteCollectedKg" },
        },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "_id",
          as: "task",
        },
      },
      {
        $unwind: "$task",
      },
      {
        $project: {
          _id: 0,
          taskId: "$task._id",
          taskTitle: "$task.title",
          reportCount: 1,
          totalWaste: 1,
        },
      },
    ]);

    return res.json(reportsByTask);
  } catch (err) {
    console.error("REPORTS DASHBOARD ERROR:", err);
    return res.status(500).json({ message: "Failed to fetch reports data" });
  }
};
