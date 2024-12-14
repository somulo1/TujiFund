import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { formatCurrency } from '../../lib/utils/date';
import { useAuthStore } from '../../store/auth';

interface Dividend {
  id: string;
  amount: number;
  distributionDate: string;
  status: 'pending' | 'distributed' | 'failed';
  description?: string;
}

interface DividendsProps {
  memberId?: string;
}

export function Dividends({ memberId }: DividendsProps) {
  const [dividends, setDividends] = useState<Dividend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalDividends, setTotalDividends] = useState(0);
  const { user } = useAuthStore();

  // Mock data for development
  const mockDividends: Dividend[] = [
    {
      id: '1',
      amount: 25000,
      distributionDate: '2024-12-01',
      status: 'distributed',
      description: 'Q4 2024 Dividend Distribution'
    },
    {
      id: '2',
      amount: 18000,
      distributionDate: '2024-09-01',
      status: 'distributed',
      description: 'Q3 2024 Dividend Distribution'
    },
    {
      id: '3',
      amount: 22000,
      distributionDate: '2024-06-01',
      status: 'distributed',
      description: 'Q2 2024 Dividend Distribution'
    },
    {
      id: '4',
      amount: 30000,
      distributionDate: '2024-12-31',
      status: 'pending',
      description: 'Upcoming Q1 2025 Distribution'
    }
  ];

  useEffect(() => {
    fetchDividends();
  }, [memberId, user]);

  const fetchDividends = async () => {
    try {
      setLoading(true);
      // Using mock data for now
      // In production, replace this with actual API call
      // const response = await fetch(`/api/members/${memberId || user?.id}/dividends`);
      // if (!response.ok) {
      //   throw new Error('Failed to fetch dividends');
      // }
      // const data = await response.json();
      
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDividends(mockDividends);
      const total = mockDividends
        .filter(d => d.status === 'distributed')
        .reduce((sum, d) => sum + d.amount, 0);
      setTotalDividends(total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dividends');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: Dividend['status']) => {
    switch (status) {
      case 'distributed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
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
        <Button onClick={fetchDividends} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Dividends Summary */}
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Dividends Summary</h3>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Dividends Earned</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {formatCurrency(totalDividends)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Distribution</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {dividends.length > 0
                ? formatCurrency(dividends[0].amount)
                : 'No distributions yet'}
            </p>
          </div>
        </div>
      </div>

      {/* Dividends History */}
      <div className="px-4 py-5 sm:px-6">
        <h4 className="text-base font-medium text-gray-900">Distribution History</h4>
        {dividends.length === 0 ? (
          <p className="text-gray-500 text-sm mt-4">No dividend distributions found.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {dividends.map((dividend) => (
              <div
                key={dividend.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">
                      {formatCurrency(dividend.amount)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(dividend.distributionDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                      dividend.status
                    )}`}
                  >
                    {dividend.status}
                  </span>
                </div>
                {dividend.description && (
                  <p className="mt-2 text-sm text-gray-600">{dividend.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Distribution Information */}
      <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="text-base font-medium text-blue-900">Next Distribution</h4>
          <p className="mt-2 text-sm text-blue-700">
            Dividend distributions are processed quarterly based on your contribution
            history and the company's performance. The next distribution is scheduled for
            the end of this quarter.
          </p>
          <Button
            onClick={() => window.location.href = '/dividends/distribution'}
            className="mt-4"
          >
            View Distribution Details
          </Button>
        </div>
      </div>
    </div>
  );
}