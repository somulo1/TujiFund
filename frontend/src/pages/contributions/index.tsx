import { useState } from 'react';
import { ContributionForm } from '../../components/contributions/contribution-form';
import { ContributionList } from '../../components/contributions/contribution-list';
import { ContributionChart } from '../../components/charts/contribution-chart';

export function ContributionsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleContributionSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Make a Contribution
        </h2>
        <ContributionForm onSuccess={handleContributionSuccess} />
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Contribution History
        </h2>
        <div className="mb-6">
          <ContributionChart />
        </div>
        <ContributionList key={refreshKey} />
      </div>
    </div>
  );
}