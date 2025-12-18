import { Schema, model, Types } from "mongoose";

const LeaveSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },

    reason: String,

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export const Leave = model("Leave", LeaveSchema);
