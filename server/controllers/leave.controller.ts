import type { Response } from "express";
import { Leave } from "../models/Leave";

// 🧑‍💼 Volunteer: apply leave
export const applyLeave = async (req: any, res: Response) => {
  try {
    const { fromDate, toDate, reason } = req.body;

    if (!fromDate || !toDate) {
      return res.status(400).json({ message: "Dates are required" });
    }

    const leave = await Leave.create({
      user: req.user.id,
      fromDate,
      toDate,
      reason,
    });

    return res.status(201).json({
      message: "Leave applied successfully",
      leave,
    });
  } catch (error) {
    console.error("APPLY LEAVE ERROR:", error);
    return res.status(500).json({ message: "Failed to apply leave" });
  }
};

// 🧑‍💼 Leader/Admin: approve leave
export const approveLeave = async (req: any, res: Response) => {
  try {
    if (!["LEADER", "ADMIN"].includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: "APPROVED" },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    return res.json({
      message: "Leave approved",
      leave,
    });
  } catch (error) {
    console.error("APPROVE LEAVE ERROR:", error);
    return res.status(500).json({ message: "Failed to approve leave" });
  }
};

// 🙋 Volunteer: view own leaves
export const getMyLeaves = async (req: any, res: Response) => {
  try {
    const leaves = await Leave.find({ user: req.user.id }).sort({
      fromDate: -1,
    });

    return res.json(leaves);
  } catch (error) {
    console.error("GET MY LEAVES ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch leaves" });
  }
};
