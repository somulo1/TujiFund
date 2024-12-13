import { useState } from 'react';
import { DividendDistribution } from '../../components/dividends/dividend-distribution';
import { StatCard } from '../../components/ui/stat-card';
import { DollarSign, TrendingUp, Users } from 'lucide-react';

export function DividendsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDistributionSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Dividends"
          value="KES 500,000"
          icon={DollarSign}
          trend="+15.3% from last period"
        />
        <StatCard
          title="Average Per Member"
          value="KES 20,000"
          icon={Users}
          trend="+12.1% from last period"
        />
        <StatCard
          title="Growth Rate"
          value="18.2%"
          icon={TrendingUp}
          trend="+2.4% from last period"
        />
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Distribute Dividends
        </h2>
        <DividendDistribution onSuccess={handleDistributionSuccess} />
      </div>

      {/* Add dividend history or other relevant components */}
    </div>
  );
}