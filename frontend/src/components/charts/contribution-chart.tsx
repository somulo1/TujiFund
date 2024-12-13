import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { month: 'Jan', amount: 50000 },
  { month: 'Feb', amount: 65000 },
  { month: 'Mar', amount: 85000 },
  { month: 'Apr', amount: 95000 },
  { month: 'May', amount: 120000 },
  { month: 'Jun', amount: 150000 },
];

export function ContributionChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}