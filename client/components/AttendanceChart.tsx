import { PieChart, Pie, Cell, Legend } from "recharts";

type AttendanceChartProps = {
  data: { name: string; value: number; color: string }[];
};

const AttendanceChart: React.FC<AttendanceChartProps> = ({ data }) => {
  return (
    <PieChart width={300} height={200}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>
        {data.map((entry, index) => (
          <Cell key={index} fill={entry.color} />
        ))}
      </Pie>
      <Legend />
    </PieChart>
  );
};

export default AttendanceChart;
