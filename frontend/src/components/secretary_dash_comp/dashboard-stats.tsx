import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, UsersIcon, WalletIcon, BanknotesIcon, ClockIcon } from '@heroicons/react/24/outline';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ElementType;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive, icon: Icon }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
        {change && (
          <p className="mt-1 text-sm">
            <span className={`inline-flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <ArrowUpIcon className="w-4 h-4 mr-1" /> : <ArrowDownIcon className="w-4 h-4 mr-1" />}
              {change}
            </span>
            <span className="text-gray-600 ml-1">vs last month</span>
          </p>
        )}
      </div>
      <div className="p-3 bg-indigo-50 rounded-full">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
    </div>
  </div>
);

export const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Members"
        value="24"
        change="12%"
        isPositive={true}
        icon={UsersIcon}
      />
      <StatCard
        title="Total Contributions"
        value="KES 1.2M"
        change="8.1%"
        isPositive={true}
        icon={BanknotesIcon}
      />
      <StatCard
        title="Available Balance"
        value="KES 850K"
        change="5.4%"
        isPositive={true}
        icon={WalletIcon}
      />
      <StatCard
        title="Next Meeting"
        value="Dec 20"
        icon={ClockIcon}
      />
    </div>
  );
};
