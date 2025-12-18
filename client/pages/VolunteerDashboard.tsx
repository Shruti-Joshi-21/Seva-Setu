// client/src/components/Dashboard.tsx
import React from "react";
import { FaUserCheck, FaTasks, FaFileAlt, FaClock, FaCamera, FaPhone, FaCalendarAlt } from "react-icons/fa";
import VolunteerChatbot from "../components/VolunteerChatbot";


// Define types for dashboard cards
interface CardProps {
  title: string;
  description: string;
  statusText?: string;
  statusColor?: string;
  buttonText: string;
  onClick: () => void;
  icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, statusText, statusColor, buttonText, onClick, icon }) => (
  <div className="bg-seva-green-bg rounded-lg p-6 shadow-sm flex flex-col justify-between">
    <div className="flex items-center gap-3 mb-4 text-seva-green-dark">
      <div className="text-2xl">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-seva-gray-dark">{description}</p>
        {statusText && <p className={`text-sm mt-1 font-medium ${statusColor}`}>{statusText}</p>}
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

const Dashboard: React.FC = () => {
  const handleClick = (name: string) => alert(`${name} clicked!`);

  return (
    <>
    <div className="flex min-h-screen bg-seva-green-bg">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h1 className="font-bold text-xl text-seva-green-dark mb-6">EcoField</h1>
          <nav className="flex flex-col gap-4 text-seva-gray-dark">
            <button className="text-left hover:text-seva-green-dark">Dashboard</button>
            <button className="text-left hover:text-seva-green-dark">Attendance</button>
            <button className="text-left hover:text-seva-green-dark">Leave Management</button>
            <button className="text-left hover:text-seva-green-dark">Task Management</button>
            <button className="text-left hover:text-seva-green-dark">Field Reports</button>
            <button className="text-left hover:text-seva-green-dark">Team Management</button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold mb-2 text-seva-gray-darker">Welcome back, Sarah!</h2>
        <p className="text-seva-gray-dark mb-6">Here's your daily overview and quick actions for today's field operations.</p>

        {/* Top Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card
            title="Today's Status"
            description=""
            statusText="Checked In"
            statusColor="text-seva-green-dark"
            buttonText="View Details"
            onClick={() => handleClick("Today's Status")}
            icon={<FaUserCheck />}
          />
          <Card
            title="Active Tasks"
            description=""
            statusText="3 Active Tasks"
            statusColor="text-seva-yellow"
            buttonText="View Tasks"
            onClick={() => handleClick("Active Tasks")}
            icon={<FaTasks />}
          />
          <Card
            title="Reports Pending"
            description=""
            statusText="1 Pending"
            statusColor="text-seva-yellow"
            buttonText="View Reports"
            onClick={() => handleClick("Reports Pending")}
            icon={<FaFileAlt />}
          />
          <Card
            title="Hours Today"
            description=""
            statusText="6.5"
            buttonText="View Hours"
            onClick={() => handleClick("Hours Today")}
            icon={<FaClock />}
          />
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card
            title="Mark Attendance"
            description="GPS-verified check-in with face verification"
            statusText="Already Checked In"
            statusColor="text-seva-green-dark"
            buttonText="View Details"
            onClick={() => handleClick("Mark Attendance")}
            icon={<FaUserCheck />}
          />
          <Card
            title="View Assigned Tasks"
            description="Today's tasks and their current status"
            statusText="3 Active Tasks"
            statusColor="text-seva-yellow"
            buttonText="View Tasks"
            onClick={() => handleClick("View Assigned Tasks")}
            icon={<FaTasks />}
          />
          <Card
            title="Upload Geo-Tagged Photos"
            description="Before/after images with GPS tagging"
            statusText="Ready to Upload"
            buttonText="Upload Photos"
            onClick={() => handleClick("Upload Photos")}
            icon={<FaCamera />}
          />
          <Card
            title="Submit Daily Report"
            description="Complete your daily activity summary"
            statusText="Report Pending"
            statusColor="text-red-500"
            buttonText="Submit Report"
            onClick={() => handleClick("Submit Daily Report")}
            icon={<FaFileAlt />}
          />
          <Card
            title="Request Leave"
            description="Submit leave request with date range"
            statusText="No Pending Requests"
            statusColor="text-seva-gray-dark"
            buttonText="Request Leave"
            onClick={() => handleClick("Request Leave")}
            icon={<FaCalendarAlt />}
          />
          <Card
            title="Emergency Contact"
            description="Quick access to team lead and support"
            statusText="Available 24/7"
            statusColor="text-seva-green-dark"
            buttonText="Contact Support"
            onClick={() => handleClick("Emergency Contact")}
            icon={<FaPhone />}
          />
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-seva-gray-darker">Recent Activity</h3>
          <ul className="flex flex-col gap-2">
            <li className="bg-white p-4 rounded-md flex justify-between items-center shadow">
              <span>Checked in at Riverside Park - Today at 9:15 AM</span>
              <span className="text-seva-green-dark font-semibold">Completed</span>
            </li>
            <li className="bg-white p-4 rounded-md flex justify-between items-center shadow">
              <span>Completed waste collection task - Today at 11:30 AM</span>
              <span className="text-seva-green-dark font-semibold">Completed</span>
            </li>
            <li className="bg-white p-4 rounded-md flex justify-between items-center shadow">
              <span>Uploaded field photos (5 images) - Today at 2:45 PM</span>
              <span className="text-seva-green-dark font-semibold">Completed</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
    {/* ===== CHATBOT (NEW, SAFE) ===== */}
      <VolunteerChatbot />
  </>
  );
};

export default Dashboard;