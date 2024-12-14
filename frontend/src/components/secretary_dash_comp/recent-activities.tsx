import React from 'react';
import { UserCircleIcon, BanknotesIcon } from '@heroicons/react/24/outline';

interface Activity {
  id: string;
  type: 'contribution' | 'member_added' | 'loan_request';
  description: string;
  timestamp: string;
  amount?: string;
  status?: 'pending' | 'approved' | 'rejected';
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'contribution',
    description: 'John Doe made a contribution',
    timestamp: '30 minutes ago',
    amount: 'KES 5,000',
    status: 'approved'
  },
  {
    id: '2',
    type: 'member_added',
    description: 'New member Jane Smith joined',
    timestamp: '2 hours ago'
  },
  {
    id: '3',
    type: 'loan_request',
    description: 'Mike Johnson requested a loan',
    timestamp: '5 hours ago',
    amount: 'KES 50,000',
    status: 'pending'
  }
];

const getStatusColor = (status?: string) => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'contribution':
      return <BanknotesIcon className="h-6 w-6 text-indigo-600" />;
    case 'member_added':
    case 'loan_request':
      return <UserCircleIcon className="h-6 w-6 text-indigo-600" />;
    default:
      return null;
  }
};

export const RecentActivities: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h2>
      <div className="flow-root">
        <ul className="-mb-8">
          {activities.map((activity, activityIdx) => (
            <li key={activity.id}>
              <div className="relative pb-8">
                {activityIdx !== activities.length - 1 ? (
                  <span
                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white">
                      {getActivityIcon(activity.type)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">{activity.description}</span>
                      {activity.amount && (
                        <span className="ml-2 font-medium text-gray-900">{activity.amount}</span>
                      )}
                      {activity.status && (
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      <time>{activity.timestamp}</time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
