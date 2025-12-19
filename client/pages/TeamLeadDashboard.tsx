import Sidebar from "@/components/Sidebar";
import StatsCard from "@/components/StatsCard";
import LeaveRequestCard from "@/components/ui/LeaveRequestCard";
import TaskCard from "@/components/TaskCard";
import AttendanceChart from "@/components/AttendanceChart";
import VolunteerAddTaskDialog from "@/components/VolunteerAddTaskDialog";
import { useState } from "react";

const TeamLeadDashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ ONLY LOGIC ADDED
  const userName = localStorage.getItem("userName") || "User";

  const attendanceData = [
    { name: "Present", value: 85, color: "#246427" },
    { name: "Absent", value: 10, color: "#F8AC3B" },
    { name: "Late", value: 5, color: "#81C784" },
  ];

  return (
    <div className="flex bg-[#F1F8E9] min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#246427] text-white px-4 py-2 rounded-lg hover:bg-[#81C784] transition"
          >
            + New Task
          </button>

          <VolunteerAddTaskDialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />

          <div className="flex items-center gap-4">
            {/* ✅ USER NAME FROM LOCALSTORAGE */}
            <p className="text-[#212121] font-semibold">{userName}</p>
            <img
              src="https://i.pravatar.cc/40"
              className="w-10 h-10 rounded-full"
              alt="User"
            />
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard title="Total Volunteers" value={247} />
          <StatsCard title="Waste Collected" value="1,847 kg" />
          <StatsCard title="Active Tasks" value={34} />
          <StatsCard title="Attendance Rate" value="94%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Leave Requests */}
          <div className="lg:col-span-1">
            <h2 className="text-[#212121] font-semibold mb-2">
              Leave Requests
            </h2>
            <LeaveRequestCard
              name="Mike Chen"
              avatar="https://i.pravatar.cc/40?u=mike"
              date="Dec 20-22, 2024"
              reason="Family emergency - need 3 days off"
            />
            <LeaveRequestCard
              name="Lisa John"
              avatar="https://i.pravatar.cc/40?u=lisa"
              date="Dec 20-22, 2024"
              reason="Family emergency - need 3 days off"
            />
          </div>

          {/* Team Attendance */}
          <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow">
            <h2 className="text-[#212121] font-semibold mb-2">
              Team Attendance
            </h2>
            <AttendanceChart data={attendanceData} />
          </div>

          {/* Active Field Tasks */}
          <div className="lg:col-span-1">
            <h2 className="text-[#212121] font-semibold mb-2">
              Active Field Tasks
            </h2>
            <TaskCard
              title="Waste Collection - Sector 12"
              assignedTo="Rajesh Kumar's Team"
              status="In Progress"
              progress={65}
              time="Today, 09:00 AM"
              location="Sector 12, Delhi"
            />
            <TaskCard
              title="Tree Plantation Drive"
              assignedTo="Vikram Singh's Team"
              status="Completed"
              progress={100}
              time="Today, 07:00 AM"
              location="Vasant Kunj"
            />
          </div>
        </div>

        {/* Pending Tasks */}
        <div>
          <h2 className="text-[#212121] font-semibold mb-2">
            Pending Tasks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="text-[#212121] font-semibold">
                  River cleanup survey
                </p>
                <p className="text-[#616161] text-sm">
                  Due: Today, 5:00 PM
                </p>
              </div>
              <span className="bg-red-200 text-red-700 text-xs px-2 py-1 rounded">
                High
              </span>
            </div>

            <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="text-[#212121] font-semibold">
                  Volunteer training session
                </p>
                <p className="text-[#616161] text-sm">
                  Due: Tomorrow, 10:00 AM
                </p>
              </div>
              <span className="bg-yellow-200 text-yellow-700 text-xs px-2 py-1 rounded">
                Medium
              </span>
            </div>

            <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="text-[#212121] font-semibold">
                  Equipment inventory check
                </p>
                <p className="text-[#616161] text-sm">
                  Due: Dec 18, 2024
                </p>
              </div>
              <span className="bg-green-200 text-green-700 text-xs px-2 py-1 rounded">
                Low
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamLeadDashboard;
