import type { Response } from "express";
import { Attendance } from "../models/Attendance";

export const getTeamSummary = async (req: any, res: Response) => {
  try {
    if (!["LEADER", "ADMIN"].includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const summary = await Attendance.aggregate([
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

    summary.forEach((item) => {
      result.total += item.count;
      if (item._id === "VALID") result.valid = item.count;
      if (item._id === "REJECTED") result.rejected = item.count;
    });

    return res.json(result);
  } catch (error) {
    console.error("TEAM SUMMARY ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch summary" });
  }
};
