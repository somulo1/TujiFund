import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { formatCurrency } from '../../lib/utils/date';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useAuthStore } from '../../store/auth';

interface Fine {
  id: string;
  amount: number;
  reason: string;
  dateIssued: string;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  paidDate?: string;
}

interface FineProps {
  memberId?: string;
}

export function Fine({ memberId }: FineProps) {
  const [fines, setFines] = useState<Fine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalUnpaid, setTotalUnpaid] = useState(0);
  const { user } = useAuthStore();

  // Mock data for development
  const mockFines: Fine[] = [
    {
      id: '1',
      amount: 1000,
      reason: 'Late Meeting Attendance',
      dateIssued: '2024-12-01',
      dueDate: '2024-12-31',
      status: 'pending'
    },
    {
      id: '2',
      amount: 500,
      reason: 'Missing Documentation',
      dateIssued: '2024-11-15',
      dueDate: '2024-12-15',
      status: 'overdue'
    },
    {
      id: '3',
      amount: 750,
      reason: 'Late Contribution Payment',
      dateIssued: '2024-11-01',
      dueDate: '2024-12-01',
      status: 'paid',
      paidDate: '2024-11-25'
    }
  ];

  useEffect(() => {
    fetchFines();
  }, [memberId, user]);

  const fetchFines = async () => {
    try {
      setLoading(true);
      // Using mock data for now
      // In production, replace this with actual API call
      // const response = await fetch(`/api/members/${memberId || user?.id}/fines`);
      // if (!response.ok) {
      //   throw new Error('Failed to fetch fines');
      // }
      // const data = await response.json();
      
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFines(mockFines);
      calculateTotalUnpaid(mockFines);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load fines');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalUnpaid = (finesList: Fine[]) => {
    const total = finesList
      .filter(fine => fine.status !== 'paid')
      .reduce((sum, fine) => sum + fine.amount, 0);
    setTotalUnpaid(total);
  };

  const getStatusIcon = (status: Fine['status']) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'overdue':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: Fine['status']) => {
    switch (status) {
      case 'paid':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'overdue':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'pending':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    }
  };

  const handlePayFine = async (fineId: string) => {
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state to reflect payment
      setFines(prevFines => 
        prevFines.map(fine => 
          fine.id === fineId 
            ? { ...fine, status: 'paid' as const, paidDate: new Date().toISOString() }
            : fine
        )
      );
      
      // Recalculate total unpaid
      calculateTotalUnpaid(fines);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process payment');
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
        <Button onClick={fetchFines} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Summary Section */}
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Fines Summary</h3>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Total Unpaid Fines</p>
            <p className="mt-1 text-2xl font-semibold text-blue-900">
              {formatCurrency(totalUnpaid)}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-600">Pending Fines</p>
            <p className="mt-1 text-2xl font-semibold text-yellow-900">
              {fines.filter(fine => fine.status === 'pending').length}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-600">Overdue Fines</p>
            <p className="mt-1 text-2xl font-semibold text-red-900">
              {fines.filter(fine => fine.status === 'overdue').length}
            </p>
          </div>
        </div>
      </div>

      {/* Fines List */}
      <div className="px-4 py-5 sm:px-6">
        <h4 className="text-base font-medium text-gray-900 mb-4">Active Fines</h4>
        {fines.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <p className="mt-2 text-sm text-gray-500">No fines found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {fines.map((fine) => (
              <div
                key={fine.id}
                className={`border rounded-lg p-4 ${getStatusColor(fine.status)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(fine.status)}
                    <div>
                      <p className="font-medium">{fine.reason}</p>
                      <p className="text-sm mt-1">
                        Issued: {new Date(fine.dateIssued).toLocaleDateString()}
                      </p>
                      <p className="text-sm">
                        Due: {new Date(fine.dueDate).toLocaleDateString()}
                      </p>
                      {fine.paidDate && (
                        <p className="text-sm">
                          Paid: {new Date(fine.paidDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      {formatCurrency(fine.amount)}
                    </p>
                    {fine.status !== 'paid' && (
                      <Button
                        onClick={() => handlePayFine(fine.id)}
                        className="mt-2"
                        size="sm"
                      >
                        Pay Fine
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment Instructions */}
      <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-base font-medium text-gray-900">Payment Information</h4>
          <div className="mt-2 space-y-2 text-sm text-gray-600">
            <p>• Fines must be paid within 30 days of issuance</p>
            <p>• Late payments may incur additional penalties</p>
            <p>• Payment can be made through M-Pesa or bank transfer</p>
            <p>• Contact the administrator if you need a payment plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
