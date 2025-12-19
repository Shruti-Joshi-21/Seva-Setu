import { Schema, model, Types } from "mongoose";

const AttendanceSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    task: {
      type: Types.ObjectId,
      ref: "Task",
      required: true,
    },

    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },

    imageHash: {
      type: String,
      required: true,
    },

    faceMatchScore: Number,

    status: {
      type: String,
      enum: ["VALID", "REJECTED"],
      required: true,
    },

    checkInTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Prevent duplicate attendance
AttendanceSchema.index({ user: 1, task: 1 }, { unique: true });

export const Attendance = model("Attendance", AttendanceSchema);
