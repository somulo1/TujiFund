import React, { useState } from 'react';
import { User } from '../../types';

interface ContributionFormProps {
  onSubmit?: (data: {
    memberId: string;
    amount: number;
    date: string;
  }) => void;
}

const ContributionForm: React.FC<ContributionFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    memberId: '',
    amount: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        memberId: formData.memberId,
        amount: parseFloat(formData.amount),
        date: formData.date
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Record New Contribution</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="memberId" className="block text-sm font-medium text-gray-700">
              Member ID
            </label>
            <input
              type="text"
              id="memberId"
              value={formData.memberId}
              onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount (KES)
            </label>
            <input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Record Contribution
        </button>
      </div>
    </form>
  );
};

export default ContributionForm;