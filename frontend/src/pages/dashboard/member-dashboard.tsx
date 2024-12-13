import { BarChart, DollarSign, TrendingUp } from 'lucide-react';
import { ContributionChart } from '../../components/charts/contribution-chart';
import { StatCard } from '../../components/ui/stat-card';

export function MemberDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Contributions"
          value="KES 150,000"
          icon={DollarSign}
          trend="+12.5%"
        />
        <StatCard
          title="Expected Dividend"
          value="KES 15,000"
          icon={TrendingUp}
          trend="+5.2%"
        />
        <StatCard
          title="Group Position"
          value="3rd"
          icon={BarChart}
          trend="Up 1 position"
        />
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold">Account Overview</h2>
        <p>Account Balance: KES 200,000</p>
        <p>Recent Transactions:</p>
        <ul>
          <li>Transaction 1: KES -5,000 (Transfer)</li>
          <li>Transaction 2: KES +10,000 (Deposit)</li>
          <li>Transaction 3: KES -1,500 (Bill Payment)</li>
        </ul>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold">Transaction History</h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024-12-01</td>
              <td>Transfer to Account X</td>
              <td>KES -5,000</td>
            </tr>
            <tr>
              <td>2024-12-05</td>
              <td>Deposit</td>
              <td>KES +10,000</td>
            </tr>
            <tr>
              <td>2024-12-10</td>
              <td>Bill Payment</td>
              <td>KES -1,500</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold">Fund Transfer</h2>
        <button className="bg-blue-500 text-white p-2 rounded">Transfer Funds</button>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold">Bill Payments</h2>
        <button className="bg-green-500 text-white p-2 rounded">Pay Bills</button>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <p>No new notifications.</p>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold">Profile Management</h2>
        <button className="bg-yellow-500 text-white p-2 rounded">Edit Profile</button>
      </div>
    </div>
  );
}