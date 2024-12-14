import { Users, Wallet, TrendingUp } from 'lucide-react';
import { ContributionChart } from '../../components/charts/contribution-chart';
import { StatCard } from '../../components/ui/stat-card';
import { MemberList } from '../../components/members/member-list';
import type { User } from '../../types';

export function AdminDashboard() {
  // Sample members data - replace with actual data from your backend
  const members: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'member',
      totalContributions: 50000
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'member',
      totalContributions: 75000
    }
  ];

  const handleSelectMember = (id: string) => {
    console.log('Selected member:', id);
    // Add your member selection logic here
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Members"
          value="25"
          icon={Users}
          trend="+2 this month"
        />
        <StatCard
          title="Total Fund"
          value="KES 2.5M"
          icon={Wallet}
          trend="+15.3%"
        />
        <StatCard
          title="Growth Rate"
          value="18.2%"
          icon={TrendingUp}
          trend="+2.4%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Fund Growth</h3>
          <ContributionChart />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Members</h3>
          <MemberList members={members} onSelectMember={handleSelectMember} />
        </div>
      </div>
    </div>
  );
}