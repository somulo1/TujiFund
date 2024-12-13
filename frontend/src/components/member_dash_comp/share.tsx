import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { formatCurrency } from '../../lib/utils/date';
import { useAuthStore } from '../../store/auth';
import { PieChart, TrendingUp, ArrowUpRight, ArrowDownRight, History } from 'lucide-react';

interface Share {
  id: string;
  quantity: number;
  value: number;
  purchaseDate: string;
  type: 'purchase' | 'transfer_in' | 'transfer_out';
  status: 'pending' | 'completed' | 'cancelled';
  fromMember?: string;
  toMember?: string;
}

interface ShareFormData {
  quantity: number;
  type: 'purchase' | 'transfer_out';
  toMember?: string;
}

export function Shares() {
  const [shares, setShares] = useState<Share[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ShareFormData>({
    quantity: 0,
    type: 'purchase'
  });
  const { user } = useAuthStore();

  // Mock data
  const mockShares: Share[] = [
    {
      id: '1',
      quantity: 100,
      value: 10000,
      purchaseDate: '2024-01-15',
      type: 'purchase',
      status: 'completed'
    },
    {
      id: '2',
      quantity: 50,
      value: 5000,
      purchaseDate: '2024-02-01',
      type: 'transfer_in',
      status: 'completed',
      fromMember: 'John Doe'
    },
    {
      id: '3',
      quantity: 25,
      value: 2500,
      purchaseDate: '2024-03-10',
      type: 'transfer_out',
      status: 'pending',
      toMember: 'Jane Smith'
    }
  ];

  useEffect(() => {
    fetchShares();
  }, [user]);

  const fetchShares = async () => {
    try {
      setLoading(true);
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShares(mockShares);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load shares');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newShare: Share = {
        id: String(Date.now()),
        quantity: formData.quantity,
        value: formData.quantity * 100, // Assuming 100 per share
        purchaseDate: new Date().toISOString(),
        type: formData.type,
        status: 'pending',
        ...(formData.type === 'transfer_out' && { toMember: formData.toMember })
      };
      setShares(prev => [newShare, ...prev]);
      setShowForm(false);
      setFormData({
        quantity: 0,
        type: 'purchase'
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit share transaction');
    }
  };

  const getStatusColor = (status: Share['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-50';
      case 'pending':
        return 'text-yellow-700 bg-yellow-50';
      case 'cancelled':
        return 'text-red-700 bg-red-50';
    }
  };

  const getTypeIcon = (type: Share['type']) => {
    switch (type) {
      case 'purchase':
        return <TrendingUp className="h-4 w-4" />;
      case 'transfer_in':
        return <ArrowDownRight className="h-4 w-4" />;
      case 'transfer_out':
        return <ArrowUpRight className="h-4 w-4" />;
    }
  };

  const calculateTotalShares = () => {
    return shares.reduce((total, share) => {
      if (share.status === 'completed') {
        return total + (share.type === 'transfer_out' ? -share.quantity : share.quantity);
      }
      return total;
    }, 0);
  };

  const calculateTotalValue = () => {
    return shares.reduce((total, share) => {
      if (share.status === 'completed') {
        return total + (share.type === 'transfer_out' ? -share.value : share.value);
      }
      return total;
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/30">
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/30">
        <div className="text-center p-4">
          <p className="text-red-600">{error}</p>
          <Button onClick={fetchShares} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Share Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                View your shares, purchase new shares, or transfer existing shares
              </p>
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center space-x-2"
            >
              {showForm ? 'Cancel Transaction' : 'New Share Transaction'}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Share Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <div className="flex items-center">
                <PieChart className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total Shares</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {calculateTotalShares()}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total Value</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(calculateTotalValue())}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-6">
              <div className="flex items-center">
                <History className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Pending Transactions</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {shares.filter(s => s.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Share Transaction Form */}
          {showForm && (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">New Share Transaction</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Transaction Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value as 'purchase' | 'transfer_out' })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="purchase">Purchase Shares</option>
                      <option value="transfer_out">Transfer Shares</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  {formData.type === 'transfer_out' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Transfer To (Member Name)
                      </label>
                      <input
                        type="text"
                        value={formData.toMember || ''}
                        onChange={e => setFormData({ ...formData, toMember: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Submit Transaction</Button>
                </div>
              </form>
            </div>
          )}

          {/* Transaction History */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Transaction History</h3>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {shares.length === 0 ? (
                <div className="p-6 text-center text-gray-500">No transactions found</div>
              ) : (
                shares.map(share => (
                  <div
                    key={share.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="flex items-center space-x-1">
                            {getTypeIcon(share.type)}
                            <span className="font-medium text-gray-900">
                              {share.type === 'purchase'
                                ? 'Share Purchase'
                                : share.type === 'transfer_in'
                                ? 'Transfer Received'
                                : 'Transfer Sent'}
                            </span>
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              share.status
                            )}`}
                          >
                            {share.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {share.quantity} shares at {formatCurrency(share.value / share.quantity)} per share
                        </p>
                        {(share.fromMember || share.toMember) && (
                          <p className="text-sm text-gray-500">
                            {share.type === 'transfer_in'
                              ? `From: ${share.fromMember}`
                              : `To: ${share.toMember}`}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-medium text-gray-900">
                          {formatCurrency(share.value)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(share.purchaseDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}