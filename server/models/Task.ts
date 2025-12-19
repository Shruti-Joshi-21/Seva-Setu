import { Schema, model, Types } from "mongoose";

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,

    location: {
      latitude: { type: Number, default: 0 },
      longitude: { type: Number, default: 0 },
      address: String,
    },

    date: { type: Date, required: true },

    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "COMPLETED"],
      default: "OPEN",
    },

    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);


export const Task = model("Task", TaskSchema);
