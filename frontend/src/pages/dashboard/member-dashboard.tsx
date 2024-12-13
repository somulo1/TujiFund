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
    </div>
  );
}