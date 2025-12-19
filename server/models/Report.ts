import { Schema, model, Types } from "mongoose";

const ReportSchema = new Schema(
  {
    task: {
      type: Types.ObjectId,
      ref: "Task",
      required: true,
    },

    submittedBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    beforeImageUrl: String,
    afterImageUrl: String,

    wasteCollectedKg: Number,

    location: {
      latitude: Number,
      longitude: Number,
    },
  },
  { timestamps: true }
);

export const Report = model("Report", ReportSchema);
