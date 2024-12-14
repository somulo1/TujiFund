import React from 'react';
import { ContributionSummary } from '../components/treasurer_dash_comp/ContributionSummary';
import { LoanSummary } from '../components/treasurer_dash_comp/LoanSummary';
import { TransactionList } from '../components/treasurer_dash_comp/TransactionList';

// Sample data - replace with actual data from your backend
const sampleData = {
  contributions: {
    total: 1500000,
    pending: 250000,
    overdue: 75000,
  },
  loans: {
    total: 2000000,
    outstanding: 800000,
    repaymentProgress: 60,
  },
  transactions: [
    {
      id: '1',
      type: 'contribution',
      description: 'Monthly contribution from John Doe',
      amount: 50000,
      date: '2023-12-13',
      status: 'completed',
    },
    {
      id: '2',
      type: 'loan',
      description: 'Loan disbursement to Jane Smith',
      amount: 100000,
      date: '2023-12-12',
      status: 'completed',
    },
    {
      id: '3',
      type: 'expense',
      description: 'Office supplies purchase',
      amount: 15000,
      date: '2023-12-11',
      status: 'pending',
    },
  ],
};

export function TreasurerDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Treasurer Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Monitor contributions, loans, and financial activities
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Contribution Summary */}
      <ContributionSummary
        totalContributions={sampleData.contributions.total}
        pendingContributions={sampleData.contributions.pending}
        overduePayments={sampleData.contributions.overdue}
      />

      {/* Loan Summary */}
      <LoanSummary
        totalLoans={sampleData.loans.total}
        outstandingAmount={sampleData.loans.outstanding}
        repaymentProgress={sampleData.loans.repaymentProgress}
      />

      {/* Transaction List */}
      <TransactionList transactions={sampleData.transactions} />
    </div>
  );
}
