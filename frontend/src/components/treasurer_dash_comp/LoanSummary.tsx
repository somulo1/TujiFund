import React from 'react';
import { BanknotesIcon, ClockIcon, ChartBarIcon } from '@heroicons/react/24/outline';

interface LoanSummaryProps {
  totalLoans: number;
  outstandingAmount: number;
  repaymentProgress: number;
}

export const LoanSummary: React.FC<LoanSummaryProps> = ({
  totalLoans,
  outstandingAmount,
  repaymentProgress,
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Loan Overview</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BanknotesIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Loans</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    KES {totalLoans.toLocaleString()}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClockIcon className="h-6 w-6 text-yellow-500" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Outstanding Amount</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    KES {outstandingAmount.toLocaleString()}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 overflow-hidden rounded-lg px-4 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Repayment Progress</dt>
                <dd className="mt-2">
                  <div className="relative w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="absolute h-full bg-blue-600 rounded-full"
                      style={{ width: `${repaymentProgress}%` }}
                    />
                  </div>
                  <div className="text-sm font-medium text-gray-900 mt-1">
                    {repaymentProgress}%
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
