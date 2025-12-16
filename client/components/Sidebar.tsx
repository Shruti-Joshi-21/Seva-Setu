import { FaUsers, FaCalendarAlt, FaTasks, FaMapMarkerAlt, FaUserFriends } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#F1F8E9] p-6 flex flex-col gap-4 h-screen">
      <h1 className="text-[#246427] font-bold text-lg mb-4">Seva Setu</h1>
      <p className="text-[#616161] text-sm mb-6">Field Operations Management</p>
      <nav className="flex flex-col gap-3">
        <button className="flex items-center gap-2 p-2 bg-[#81C784]/20 text-[#246427] rounded font-semibold">Dashboard</button>
        <button className="flex items-center gap-2 p-2 hover:bg-[#81C784]/20 text-[#212121] rounded">Attendance</button>
        <button className="flex items-center gap-2 p-2 hover:bg-[#81C784]/20 text-[#212121] rounded">Leave Management</button>
        <button className="flex items-center gap-2 p-2 hover:bg-[#81C784]/20 text-[#212121] rounded">Task Management</button>
        <button className="flex items-center gap-2 p-2 hover:bg-[#81C784]/20 text-[#212121] rounded">Field Reports</button>
        <button className="flex items-center gap-2 p-2 hover:bg-[#81C784]/20 text-[#212121] rounded">Team Management</button>
      </nav>
    </aside>
  );
};

export default Sidebar;
