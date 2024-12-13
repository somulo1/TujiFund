import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { month: 'Jan', amount: 50000 },
  { month: 'Feb', amount: 65000 },
  { month: 'Mar', amount: 85000 },
  { month: 'Apr', amount: 95000 },
  { month: 'May', amount: 120000 },
  { month: 'Jun', amount: 150000 },
  { month: 'may', amount: 150000 },
  { month: 'July', amount: 0 },
  { month: 'Aug', amount: 150},
  { month: 'sept', amount: 150 },
  { month: 'oct', amount: 150 },
  { month: 'nov', amount: 150 },
  { month: 'dec', amount: 1500 },
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