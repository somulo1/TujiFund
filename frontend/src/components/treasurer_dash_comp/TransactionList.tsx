import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, BanknotesIcon } from '@heroicons/react/24/outline';

interface Transaction {
  id: string;
  type: 'contribution' | 'expense' | 'loan';
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'contribution':
        return <ArrowUpIcon className="h-5 w-5 text-green-500" />;
      case 'expense':
        return <ArrowDownIcon className="h-5 w-5 text-red-500" />;
      case 'loan':
        return <BanknotesIcon className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Recent Transactions</h2>
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {transactions.map((transaction, idx) => (
              <li key={transaction.id}>
                <div className="relative pb-8">
                  {idx !== transactions.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-gray-50">
                        {getTypeIcon(transaction.type)}
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500">{transaction.description}</p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          KES {transaction.amount.toLocaleString()}
                        </div>
                        <time className="text-gray-500">{new Date(transaction.date).toLocaleDateString()}</time>
                      </div>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
