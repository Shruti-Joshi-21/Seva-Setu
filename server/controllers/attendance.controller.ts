import type { Response } from "express";
import { User } from "../models/User";
import { Task } from "../models/Task";
import { Attendance } from "../models/Attendance";
import { Leave } from "../models/Leave";

import { generateFaceEmbedding } from "../utils/faceEmbedding";
import { compareEmbeddings } from "../utils/faceCompare";
import { hashImage } from "../utils/imageHash";
import { getDistanceInMeters } from "../utils/geoDistance";

const FACE_THRESHOLD = 0.8;
const MAX_DISTANCE_METERS = 100;

export const checkInAttendance = async (req: any, res: Response) => {
  try {
    const { latitude, longitude } = req.body;
    const file = req.file;

    /* =========================
       0️⃣ Basic validation
    ========================= */
    if (!file || !latitude || !longitude) {
      return res.status(400).json({
        status: "REJECTED",
        reason: "Missing required data",
      });
    }

    const imageBuffer = file.buffer;

    /* =========================
       1️⃣ Leave check
    ========================= */
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

    /* =========================
       2️⃣ Face registered?
    ========================= */
    const user = await User.findById(req.user.id).select("+faceEmbedding");

    if (!user?.faceEmbedding) {
      return res.json({
        status: "REJECTED",
        reason: "Face not registered",
      });
    }

    /* =========================
       3️⃣ Face verification
    ========================= */
    const newEmbedding = await generateFaceEmbedding(imageBuffer);
    const score = compareEmbeddings(user.faceEmbedding, newEmbedding);

    if (score < FACE_THRESHOLD) {
      return res.json({
        status: "REJECTED",
        reason: "Face mismatch",
        score,
      });
    }

    /* =========================
       4️⃣ Image reuse check
    ========================= */
    const imageHashValue = hashImage(imageBuffer);
    const reused = await Attendance.findOne({ imageHash: imageHashValue });

    if (reused) {
      return res.json({
        status: "REJECTED",
        reason: "Image reuse detected",
      });
    }

    /* =========================
       5️⃣ Find nearest active task
    ========================= */
    const tasks = await Task.find({
      status: { $ne: "COMPLETED" },
      location: { $exists: true },
    });

    let nearestTask: any = null;
    let minDistance = Infinity;

    for (const task of tasks) {
      if (!task.location?.latitude || !task.location?.longitude) continue;

      const dist = getDistanceInMeters(
        Number(latitude),
        Number(longitude),
        task.location.latitude,
        task.location.longitude
      );

      if (dist < minDistance) {
        minDistance = dist;
        nearestTask = task;
      }
    }

    if (!nearestTask || minDistance > MAX_DISTANCE_METERS) {
      return res.json({
        status: "REJECTED",
        reason: "No nearby task found",
        distance: minDistance,
      });
    }

    /* =========================
       6️⃣ Save attendance
    ========================= */
    await Attendance.create({
      user: req.user.id,
      task: nearestTask._id,
      location: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      imageHash: imageHashValue,
      faceMatchScore: score,
      status: "VALID",
    });

    return res.json({
      status: "VALID",
      faceScore: score,
      distance: minDistance,
      taskId: nearestTask._id,
    });
  } catch (err) {
    console.error("ATTENDANCE ERROR:", err);
    return res.status(500).json({
      status: "REJECTED",
      reason: "Internal error",
    });
  }
};
