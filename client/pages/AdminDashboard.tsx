import React from "react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// --------------------
// Color Palette
// --------------------
const COLORS = {
  primary: "#246427",
  secondary: "#81C784",
  accent: "#F8AC3B",
  background: "#F1F8E9",
  text: "#212121",
  textSecondary: "#616161",
};

// --------------------
// Mock Data
// --------------------
const weeklyAttendance = [
  { day: "Mon", value: 89 },
  { day: "Tue", value: 92 },
  { day: "Wed", value: 88 },
  { day: "Thu", value: 94 },
  { day: "Fri", value: 87 },
  { day: "Sat", value: 85 },
  { day: "Sun", value: 91 },
];

const projectStatus = [
  { name: "Completed", value: 45, color: COLORS.primary },
  { name: "In Progress", value: 35, color: COLORS.secondary },
  { name: "Planning", value: 15, color: COLORS.accent },
  { name: "On Hold", value: 5, color: "#9E9E9E" },
];

// --------------------
// Reusable Components
// --------------------
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  highlightColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, highlightColor }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm">
    <h4 className="text-sm" style={{ color: COLORS.textSecondary }}>{title}</h4>
    <div className="text-2xl font-bold" style={{ color: COLORS.text }}>{value}</div>
    <p className="text-sm" style={{ color: highlightColor || COLORS.secondary }}>{subtitle}</p>
  </div>
);

// --------------------
// Main Dashboard
// --------------------
const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: COLORS.background }}>

      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold" style={{ color: COLORS.primary }}>Seva Setu</h1>
          <p className="text-sm" style={{ color: COLORS.textSecondary }}>Field Operations Management</p>
        </div>
        <div className="font-medium" style={{ color: COLORS.text }}>John Admin</div>
      </header>

      {/* Top Navigation */}
      <div className="flex gap-4 mb-6">
        <button className="px-6 py-2 rounded-lg text-white" style={{ backgroundColor: COLORS.primary }}>Dashboard</button>
        <button className="px-6 py-2 rounded-lg bg-white">Attendance</button>
        <button className="px-6 py-2 rounded-lg bg-white">Reports</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Active Projects" value={24} subtitle="+12% from last month" />
        <StatCard title="Team Leads" value={18} subtitle="2 new this week" />
        <StatCard title="Field Workers" value={156} subtitle="89% attendance today" highlightColor={COLORS.accent} />
        <StatCard title="Pending Reports" value={7} subtitle="3 overdue" highlightColor="#E53935" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-4" style={{ color: COLORS.text }}>Weekly Attendance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyAttendance}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke={COLORS.primary} strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-4" style={{ color: COLORS.text }}>Project Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={projectStatus} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90}>
                {projectStatus.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Project Management */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold" style={{ color: COLORS.text }}>Project Management</h3>
            <button className="px-4 py-2 text-white rounded-lg" style={{ backgroundColor: COLORS.primary }}>+ New Project</button>
          </div>

          {/* Project Card */}
          <div className="border rounded-lg p-4 mb-4">
            <div className="flex justify-between">
              <h4 className="font-medium">Beach Cleanup Drive</h4>
              <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: COLORS.secondary, color: COLORS.primary }}>Active</span>
            </div>
            <p className="text-sm" style={{ color: COLORS.textSecondary }}>Lead: Mike Chen</p>
            <div className="w-full bg-gray-200 h-2 rounded mt-2">
              <div className="h-2 rounded" style={{ width: "75%", backgroundColor: COLORS.secondary }} />
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex justify-between">
              <h4 className="font-medium">Recycling Awareness Campaign</h4>
              <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: COLORS.accent }}>Planning</span>
            </div>
            <p className="text-sm" style={{ color: COLORS.textSecondary }}>Lead: Lisa Park</p>
            <div className="w-full bg-gray-200 h-2 rounded mt-2">
              <div className="h-2 rounded" style={{ width: "25%", backgroundColor: COLORS.accent }} />
            </div>
          </div>
        </div>

        {/* Team Leads */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold" style={{ color: COLORS.text }}>Team Leads</h3>
            <button className="text-sm" style={{ color: COLORS.primary }}>+ Add Lead</button>
          </div>

          <ul className="space-y-4">
            <li>Mike Chen – Beach Operations</li>
            <li>Lisa Park – Awareness Campaigns</li>
            <li>David Kim – Waste Collection</li>
            <li>Emma Wilson – Tree Planting</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
