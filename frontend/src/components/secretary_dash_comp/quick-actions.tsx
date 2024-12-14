import React from 'react';
import { PlusIcon, UserPlusIcon, DocumentPlusIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ElementType;
  onClick: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ title, description, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className="relative block rounded-lg border border-gray-300 bg-white p-6 hover:border-indigo-500 hover:ring-1 hover:ring-indigo-500 focus:outline-none"
  >
    <div className="inline-flex rounded-lg bg-indigo-50 p-3">
      <Icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
    </div>
    <h3 className="mt-4 text-base font-medium text-gray-900">{title}</h3>
    <p className="mt-1 text-sm text-gray-500">{description}</p>
  </button>
);

export const QuickActions: React.FC = () => {
  const handleNewContribution = () => {
    // Implement new contribution action
  };

  const handleAddMember = () => {
    // Implement add member action
  };

  const handleNewLoan = () => {
    // Implement new loan action
  };

  const handleScheduleMeeting = () => {
    // Implement schedule meeting action
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <QuickAction
          title="Record Contribution"
          description="Record a new member contribution"
          icon={PlusIcon}
          onClick={handleNewContribution}
        />
        <QuickAction
          title="Add Member"
          description="Register a new member"
          icon={UserPlusIcon}
          onClick={handleAddMember}
        />
        <QuickAction
          title="New Loan Request"
          description="Process a new loan request"
          icon={DocumentPlusIcon}
          onClick={handleNewLoan}
        />
        <QuickAction
          title="Schedule Meeting"
          description="Set up the next group meeting"
          icon={CalendarIcon}
          onClick={handleScheduleMeeting}
        />
      </div>
    </div>
  );
};
