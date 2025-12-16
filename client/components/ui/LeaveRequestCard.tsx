type LeaveRequestCardProps = {
  name: string;
  avatar: string;
  date: string;
  reason: string;
};

const LeaveRequestCard: React.FC<LeaveRequestCardProps> = ({ name, avatar, date, reason }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-3">
      <div className="flex items-center gap-3 mb-2">
        <img src={avatar} className="w-8 h-8 rounded-full" alt={name} />
        <div>
          <p className="text-[#212121] font-semibold">{name}</p>
          <p className="text-[#616161] text-sm">{date}</p>
        </div>
        <span className="ml-auto text-[#F8AC3B] text-sm font-semibold">Pending</span>
      </div>
      <p className="text-[#212121] mb-2">{reason}</p>
      <div className="flex gap-2">
        <button className="bg-[#F8AC3B] text-white px-3 py-1 rounded">Approve</button>
        <button className="border border-[#F8AC3B] text-[#F8AC3B] px-3 py-1 rounded">Reject</button>
      </div>
    </div>
  );
};

export default LeaveRequestCard;
