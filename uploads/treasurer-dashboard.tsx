import React, { useState, useEffect } from 'react';
import { ContributionSummary } from '../components/treasurer_dash_comp/ContributionSummary';
import { LoanSummary } from '../components/treasurer_dash_comp/LoanSummary';
import { TransactionList } from '../components/treasurer_dash_comp/TransactionList';
import { contributions, dividends } from '../lib/api';
import type { Transaction } from '../types';

// Default data for initial render and error cases
const defaultData = {
  contributions: {
    total: 0,
    pending: 0,
    overdue: 0,
  },
  loans: {
    total: 0,
    outstanding: 0,
    repaymentProgress: 0,
  },
  transactions: [],
};

export function TreasurerDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch contributions data
        const contributionsResponse = await contributions.getAll();
        const contributionsData = contributionsResponse.data;

        // Calculate contribution summaries
        const total = contributionsData.reduce((sum, c) => sum + c.amount, 0);
        const pending = contributionsData
          .filter(c => c.status === 'pending')
          .reduce((sum, c) => sum + c.amount, 0);
        const overdue = contributionsData
          .filter(c => c.status === 'overdue')
          .reduce((sum, c) => sum + c.amount, 0);

        // Fetch dividends/loans data
        const dividendsResponse = await dividends.getAll();
        const dividendsData = dividendsResponse.data;

        // Calculate loan summaries
        const totalLoans = dividendsData.reduce((sum, d) => sum + d.amount, 0);
        const outstandingLoans = dividendsData
          .filter(d => d.status === 'pending')
          .reduce((sum, d) => sum + d.amount, 0);
        const repaymentProgress = totalLoans > 0 
          ? Math.round(((totalLoans - outstandingLoans) / totalLoans) * 100)
          : 0;

        // Combine transactions
        const transactions: Transaction[] = [
          ...contributionsData.map(c => ({
            id: c.id,
            type: 'contribution' as const,
            description: `Contribution from Member`,
            amount: c.amount,
            date: c.date,
            status: c.status,
          })),
          ...dividendsData.map(d => ({
            id: d.id,
            type: 'loan' as const,
            description: `Loan Transaction`,
            amount: d.amount,
            date: d.date,
            status: d.status,
          })),
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setData({
          contributions: {
            total,
            pending,
            overdue,
          },
          loans: {
            total: totalLoans,
            outstanding: outstandingLoans,
            repaymentProgress,
          },
          transactions: transactions.slice(0, 10), // Show only last 10 transactions
        });
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

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
            onClick={() => {
              // TODO: Implement report generation
              console.log('Generate report clicked');
            }}
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Contribution Summary */}
      <ContributionSummary
        totalContributions={data.contributions.total}
        pendingContributions={data.contributions.pending}
        overduePayments={data.contributions.overdue}
      />

      {/* Loan Summary */}
      <LoanSummary
        totalLoans={data.loans.total}
        outstandingAmount={data.loans.outstanding}
        repaymentProgress={data.loans.repaymentProgress}
      />

      {/* Transaction List */}
      <TransactionList transactions={data.transactions} />
    </div>
  );
}
