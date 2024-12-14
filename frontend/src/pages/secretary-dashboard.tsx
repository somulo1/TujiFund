import React from 'react';
import ContributionForm from '../components/secretary_dash_comp/contribution-form';

export function SecretaryDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Secretary Dashboard</h1>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <ContributionForm />
      </div>
    </div>
  );
}
