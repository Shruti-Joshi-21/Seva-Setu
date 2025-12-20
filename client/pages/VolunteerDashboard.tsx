// client/src/components/Dashboard.tsx
import React, { useState } from "react";
import api from "@/lib/api";
import {
  FaUserCheck,
  FaTasks,
  FaFileAlt,
  FaClock,
  FaCamera,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";

import MarkAttendanceDialog from "../components/MarkAttendanceDialog";
import VolunteerChatbot from "../components/VolunteerChatbot";
import LeaveRequestDialog from "../components/LeaveRequestDialog";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";

/* ================= CARD TYPE ================= */
interface CardProps {
  title: string;
  description: string;
  statusText?: string;
  statusColor?: string;
  buttonText: string;
  onClick: () => void;
  icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  statusText,
  statusColor,
  buttonText,
  onClick,
  icon,
}) => (
  <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col justify-between">
    <div className="flex items-center gap-3 mb-4 text-seva-green-dark">
      <div className="text-2xl">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-seva-gray-dark">{description}</p>
        {statusText && (
          <p className={`text-sm mt-1 font-medium ${statusColor}`}>
            {statusText}
          </p>
        )}
      </div>
    </div>

    <button
      onClick={onClick}
      className="bg-seva-green text-white rounded-md py-2 mt-3 hover:bg-seva-green-light transition"
    >
      {buttonText}
    </button>
  </div>
);

/* ================= DASHBOARD ================= */
const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);

  /* -------- TASK STATE -------- */
  const [tasks, setTasks] = useState<any[]>([]);
  const [showTasks, setShowTasks] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);

  const userName = localStorage.getItem("userName") || "User";

  /* ================= FETCH TASKS ================= */
  const fetchAssignedTasks = async () => {
    try {
      setLoadingTasks(true);

      const res = await api.get("/tasks/my");
      setTasks(res.data || []);
      setShowTasks(true);
    } catch (err) {
      console.error("FETCH TASKS ERROR:", err);
      alert("Failed to fetch assigned tasks");
    } finally {
      setLoadingTasks(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-seva-green-bg">
        {/* ========== SIDEBAR ========== */}
        <aside className="w-64 bg-white shadow-md p-6">
          <h1 className="font-bold text-xl text-seva-green-dark mb-6">
            SevaSetu
          </h1>
          <nav className="flex flex-col gap-4 text-seva-gray-dark">
            <button className="text-left hover:text-seva-green-dark">
              Dashboard
            </button>
            <button className="text-left hover:text-seva-green-dark">
              Attendance
            </button>
            <button className="text-left hover:text-seva-green-dark">
              Leave Management
            </button>
            <button className="text-left hover:text-seva-green-dark">
              Task Management
            </button>
            <button className="text-left hover:text-seva-green-dark">
              Field Reports
            </button>
          </nav>
        </aside>

        {/* ========== MAIN CONTENT ========== */}
        <main className="flex-1 p-8">
          <h2 className="text-2xl font-semibold mb-2 text-seva-gray-darker">
            Welcome back, {userName}!
          </h2>

          <p className="text-seva-gray-dark mb-6">
            Here's your daily overview and quick actions.
          </p>

          {/* ===== STATUS CARDS ===== */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card
              title="Today's Status"
              description=""
              statusText="Checked In"
              statusColor="text-seva-green-dark"
              buttonText="View Details"
              onClick={() => {}}
              icon={<FaUserCheck />}
            />
            <Card
              title="Active Tasks"
              description=""
              statusText={`${tasks.length} Active`}
              statusColor="text-seva-yellow"
              buttonText="View Tasks"
              onClick={fetchAssignedTasks}
              icon={<FaTasks />}
            />
            <Card
              title="Reports Pending"
              description=""
              statusText="Pending"
              statusColor="text-seva-yellow"
              buttonText="View Reports"
              onClick={() => navigate("/field-reports")}
              icon={<FaFileAlt />}
            />
            <Card
              title="Hours Today"
              description=""
              statusText="6.5"
              buttonText="View Hours"
              onClick={() => {}}
              icon={<FaClock />}
            />
          </div>

          {/* ===== ACTION CARDS ===== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card
              title="Mark Attendance"
              description="GPS + face verification"
              statusText="Tap to mark"
              statusColor="text-seva-green-dark"
              buttonText="Mark Now"
              onClick={() => setAttendanceOpen(true)}
              icon={<FaUserCheck />}
            />

            <Card
              title="View Assigned Tasks"
              description="Today's field tasks"
              statusText="Active"
              statusColor="text-seva-yellow"
              buttonText="View Tasks"
              onClick={fetchAssignedTasks}
              icon={<FaTasks />}
            />

            <Card
              title="Submit Daily Report"
              description="Before / After proof"
              statusText="Pending"
              statusColor="text-red-500"
              buttonText="Submit Report"
              onClick={() => navigate("/field-reports")}
              icon={<FaFileAlt />}
            />

            <Card
              title="Request Leave"
              description="Apply for leave"
              statusText="Optional"
              statusColor="text-seva-gray-dark"
              buttonText="Request Leave"
              onClick={() => setLeaveOpen(true)}
              icon={<FaCalendarAlt />}
            />

            <Card
              title="Upload Photos"
              description="Geo-tagged images"
              buttonText="Upload"
              onClick={() => {}}
              icon={<FaCamera />}
            />

            <Card
              title="Emergency Contact"
              description="Team lead / Admin"
              statusText="24/7"
              statusColor="text-seva-green-dark"
              buttonText="Call Now"
              onClick={() => {}}
              icon={<FaPhone />}
            />
          </div>

          {/* ===== ASSIGNED TASKS LIST ===== */}
          {showTasks && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 text-seva-gray-darker">
                Assigned Tasks
              </h3>

              {loadingTasks && (
                <p className="text-sm text-gray-500">Loading tasks...</p>
              )}

              {!loadingTasks && tasks.length === 0 && (
                <p className="text-sm text-gray-500">
                  No tasks assigned yet
                </p>
              )}

              {!loadingTasks &&
                tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    title={task.title}
                    assignedTo={userName}
                    status={
                      task.status === "COMPLETED"
                        ? "Completed"
                        : "In Progress"
                    }
                    progress={task.status === "COMPLETED" ? 100 : 40}
                    time={new Date(task.date).toDateString()}
                    location={task.location?.address || "Field Area"}
                  />
                ))}
            </div>
          )}
        </main>
      </div>

      {/* ===== MODALS ===== */}
      <LeaveRequestDialog open={leaveOpen} onClose={() => setLeaveOpen(false)} />
      <MarkAttendanceDialog
        open={attendanceOpen}
        onClose={() => setAttendanceOpen(false)}
      />

      <VolunteerChatbot />
    </>
  );
};

export default Dashboard;
