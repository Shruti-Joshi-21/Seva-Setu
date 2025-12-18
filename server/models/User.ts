import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      default: "New User", // auto for OTP users
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["VOLUNTEER", "LEADER", "ADMIN"],
      default: "VOLUNTEER",
    },

    // Store face embedding, NOT raw image
    faceEmbedding: {
      type: [Number],
      select: false,
    },
  },
  { timestamps: true }
);

export const User = model("User", UserSchema);
