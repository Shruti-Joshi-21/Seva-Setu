type TaskCardProps = {
  title: string;
  assignedTo: string;
  status: "In Progress" | "Completed";
  progress: number;
  time: string;
  location: string;
};

const TaskCard: React.FC<TaskCardProps> = ({ title, assignedTo, status, progress, time, location }) => {
  const statusColor = status === "Completed" ? "bg-[#81C784]/20 text-[#81C784]" : "bg-blue-200 text-blue-700";
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-3">
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-[#212121]">{title}</p>
        <span className={`text-sm px-2 py-1 rounded ${statusColor}`}>{status}</span>
      </div>
      <p className="text-[#616161] text-sm mb-1">Assigned to: {assignedTo}</p>
      <p className="text-[#616161] text-sm mb-2">{time} | {location}</p>
      <div className="h-2 bg-gray-200 rounded-full">
        <div className="h-2 bg-[#246427] rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default TaskCard;
