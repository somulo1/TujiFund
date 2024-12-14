import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { formatCurrency } from '../../lib/utils/date';
import { useAuthStore } from '../../store/auth';
import { PieChart, TrendingUp, ArrowUpRight, ArrowDownRight, History } from 'lucide-react';

interface Saving {
  id: string;
  amount: number;
  date: string;
  type: 'deposit' | 'withdrawal';
  balance: number;
  description?: string;
}

interface SavingsStats {
  totalSavings: number;
  monthlyGrowth: number;
  interestEarned: number;
  lastTransaction: Saving | null;
}

export function Savings() {
  const [savings, setSavings] = useState<Saving[]>([]);
  const [stats, setStats] = useState<SavingsStats>({
    totalSavings: 0,
    monthlyGrowth: 0,
    interestEarned: 0,
    lastTransaction: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    type: 'deposit' as 'deposit' | 'withdrawal',
    description: '',
  });
  const { user } = useAuthStore();

  // Mock data for development
  const mockSavings: Saving[] = [
    {
      id: '1',
      amount: 5000,
      date: '2024-12-10',
      type: 'deposit',
      balance: 25000,
      description: 'Monthly savings'
    },
    {
      id: '2',
      amount: 2000,
      date: '2024-12-05',
      type: 'withdrawal',
      balance: 20000,
      description: 'Emergency funds'
    },
    {
      id: '3',
      amount: 7000,
      date: '2024-12-01',
      type: 'deposit',
      balance: 22000,
      description: 'Bonus savings'
    }
  ];

  useEffect(() => {
    fetchSavings();
  }, [user]);

  const fetchSavings = async () => {
    try {
      setLoading(true);
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSavings(mockSavings);

      // Calculate stats
      const totalSavings = mockSavings[0].balance;
      const monthlyGrowth = 5.2; // Mock growth percentage
      const interestEarned = 1200; // Mock interest earned
      
      setStats({
        totalSavings,
        monthlyGrowth,
        interestEarned,
        lastTransaction: mockSavings[0],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load savings data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate amount
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Please enter a valid amount');
      }

      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newSaving: Saving = {
        id: String(Date.now()),
        amount,
        date: new Date().toISOString().split('T')[0],
        type: formData.type,
        balance: formData.type === 'deposit' 
          ? stats.totalSavings + amount 
          : stats.totalSavings - amount,
        description: formData.description,
      };

      setSavings(prev => [newSaving, ...prev]);
      setStats(prev => ({
        ...prev,
        totalSavings: newSaving.balance,
        lastTransaction: newSaving,
      }));

      setShowForm(false);
      setFormData({
        amount: '',
        type: 'deposit',
        description: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process transaction');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-600">{error}</p>
        <Button onClick={fetchSavings} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Savings Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                Track your savings, make deposits, and manage withdrawals
              </p>
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center space-x-2"
            >
              {showForm ? 'Cancel Transaction' : 'New Transaction'}
            </Button>
          </div>
        </div>

        {/* Transaction Form */}
        {showForm && (
          <div className="bg-white shadow sm:rounded-lg mb-8">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">New Transaction</h3>
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Transaction Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      type: e.target.value as 'deposit' | 'withdrawal' 
                    }))}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="deposit">Deposit</option>
                    <option value="withdrawal">Withdrawal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount (KES)
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      amount: e.target.value 
                    }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      description: e.target.value 
                    }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter description"
                  />
                </div>
                <Button type="submit">
                  Process Transaction
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <PieChart className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Savings
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {formatCurrency(stats.totalSavings)}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Monthly Growth
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stats.monthlyGrowth}%
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <ArrowUpRight className="self-center flex-shrink-0 h-5 w-5" />
                        <span className="sr-only">Increased by</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <History className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Interest Earned
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {formatCurrency(stats.interestEarned)}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="mt-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-xl font-semibold text-gray-900">Transaction History</h2>
              <p className="mt-2 text-sm text-gray-700">
                A list of all your savings transactions including deposits and withdrawals.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Date
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Type
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Amount
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Balance
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {savings.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span
                              className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                transaction.type === 'deposit'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {formatCurrency(transaction.amount)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {formatCurrency(transaction.balance)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {transaction.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
