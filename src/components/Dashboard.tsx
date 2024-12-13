import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Contribution {
  id: number;
  member_id: number;
  amount: number;
  date: string;
}

const Dashboard: React.FC = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [totalContribution, setTotalContribution] = useState<number>(0);

  useEffect(() => {
    // Fetch contributions from API
    fetch('/api/contributions')
      .then(response => response.json())
      .then(data => {
        setContributions(data);
        const total = data.reduce((sum: number, contribution: Contribution) => sum + contribution.amount, 0);
        setTotalContribution(total);
      });
  }, []);

  const chartData = {
    labels: contributions.map(c => c.date),
    datasets: [
      {
        label: 'Contributions Over Time',
        data: contributions.map(c => c.amount),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Member Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${totalContribution.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contribution History</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={chartData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

