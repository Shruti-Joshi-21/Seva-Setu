import type { Response } from "express";
import { User } from "../models/User";
import { Task } from "../models/Task";
import { Attendance } from "../models/Attendance";
import { Leave } from "../models/Leave"; // ✅ ADD THIS

import { generateFaceEmbedding } from "../utils/faceEmbedding";
import { compareEmbeddings } from "../utils/faceCompare";
import { hashImage } from "../utils/imageHash";
import { getDistanceInMeters } from "../utils/geoDistance";

const FACE_THRESHOLD = 0.8;
const MAX_DISTANCE_METERS = 100;

export const checkInAttendance = async (req: any, res: Response) => {
  try {
    const { taskId, latitude, longitude } = req.body;

    if (!req.file || !taskId || !latitude || !longitude) {
      return res.status(400).json({
        status: "REJECTED",
        reason: "Missing required data",
      });
    }

    // 🔴 STEP 0: CHECK APPROVED LEAVE (NEW)
    const now = new Date();
    const onLeave = await Leave.findOne({
      user: req.user.id,
      status: "APPROVED",
      fromDate: { $lte: now },
      toDate: { $gte: now },
    });

    if (onLeave) {
      return res.json({
        status: "REJECTED",
        reason: "User on approved leave",
      });
    }

    // 1️⃣ Get user with face embedding
    const user = await User.findById(req.user.id).select("+faceEmbedding");
    if (!user?.faceEmbedding) {
      return res.json({
        status: "REJECTED",
        reason: "Face not registered",
      });
    }

    // 2️⃣ Extract face embedding
    const newEmbedding = await generateFaceEmbedding(req.file.buffer);

    // 3️⃣ Compare face
    const score = compareEmbeddings(user.faceEmbedding, newEmbedding);
    if (score < FACE_THRESHOLD) {
      return res.json({
        status: "REJECTED",
        reason: "Face mismatch",
        score,
      });
    }

    // 4️⃣ Image reuse check
    const imageHashValue = hashImage(req.file.buffer);
    const reused = await Attendance.findOne({ imageHash: imageHashValue });

    if (reused) {
      return res.json({
        status: "REJECTED",
        reason: "Image reuse detected",
      });
    }

    // 5️⃣ GPS validation
    const task = await Task.findById(taskId);
    if (!task?.location) {
      return res.json({
        status: "REJECTED",
        reason: "Invalid task location",
      });
    }

    const distance = getDistanceInMeters(
      latitude,
      longitude,
      task.location.latitude!,
      task.location.longitude!
    );

    if (distance > MAX_DISTANCE_METERS) {
      return res.json({
        status: "REJECTED",
        reason: "Outside task location",
        distance,
      });
    }

    // 6️⃣ Store attendance
    await Attendance.create({
      user: user._id,
      task: taskId,
      location: { latitude, longitude },
      imageHash: imageHashValue,
      faceMatchScore: score,
      status: "VALID",
    });

    return res.json({
      status: "VALID",
      faceScore: score,
      distance,
    });
  } catch (err) {
    console.error("ATTENDANCE ERROR:", err);
    return res.status(500).json({
      status: "REJECTED",
      reason: "Internal error",
    });
  }
};
