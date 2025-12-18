import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./db/mongo";

import authRoutes from "./routes/auth.routes";
import faceRoutes from "./routes/face.routes";
import attendanceRoutes from "./routes/attendance.routes";
import groupAttendanceRoutes from "./routes/groupAttendance.routes";
import taskRoutes from "./routes/task.routes";
import reportRoutes from "./routes/report.routes";
import teamRoutes from "./routes/team.routes";
import leaveRoutes from "./routes/leave.routes";
import dashboardRoutes from "./routes/dashboard.routes";

dotenv.config();

const app = express();

/* =======================
   🌍 GLOBAL MIDDLEWARES
======================= */

// ✅ CORS (VERY IMPORTANT)
app.use(
  cors({
    origin: "http://localhost:8080", // frontend
    credentials: true,
  })
);

// ✅ JSON parser
app.use(express.json());

/* =======================
   🚀 SERVER BOOTSTRAP
======================= */

const startServer = async () => {
  try {
    // 🔴 MUST WAIT for DB
    await connectDB();

    /* =======================
       🔐 AUTH & CORE ROUTES
    ======================= */
    app.use("/auth", authRoutes);
    app.use("/face", faceRoutes);

    /* =======================
       📋 TASKS & ATTENDANCE
    ======================= */
    app.use("/tasks", taskRoutes);

    // Individual attendance (check-in)
    app.use("/attendance", attendanceRoutes);

    // Group attendance (leader)
    app.use("/attendance", groupAttendanceRoutes);

    /* =======================
       📸 REPORTS
    ======================= */
    app.use("/reports", reportRoutes);

    /* =======================
       👥 TEAM & LEAVES
    ======================= */
    app.use("/team", teamRoutes);
    app.use("/leaves", leaveRoutes);

    /* =======================
       📊 DASHBOARDS
    ======================= */
    app.use("/dashboard", dashboardRoutes);

    /* =======================
       ❤️ HEALTH CHECK
    ======================= */
    app.get("/health", (_, res) => {
      res.status(200).send("OK");
    });

    /* =======================
       🟢 START SERVER
    ======================= */
    app.listen(3000, () => {
      console.log("🚀 Backend running on http://localhost:3000");
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
  }
};

startServer();
