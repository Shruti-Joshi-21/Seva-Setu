type StatsCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
      <div>
        <p className="text-[#616161] text-sm">{title}</p>
        <p className="text-[#212121] text-2xl font-bold">{value}</p>
      </div>
      {icon && <div className="text-2xl">{icon}</div>}
    </div>
  );
};

export default StatsCard;
