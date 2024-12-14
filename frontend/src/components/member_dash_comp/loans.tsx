import { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { formatCurrency } from '../../lib/utils/date';
import { useAuthStore } from '../../store/auth';
import { Calculator, Calendar, Clock, CreditCard, DollarSign, FileText, PieChart, X } from 'lucide-react';

interface Loan {
  id: string;
  amount: number;
  purpose: string;
  applicationDate: string;
  approvalDate?: string;
  dueDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid' | 'defaulted';
  interestRate: number;
  totalRepayment: number;
  amountPaid: number;
  collateral?: string;
  guarantors: string[];
}

interface LoanFormData {
  amount: number;
  purpose: string;
  collateral: string;
  guarantors: string[];
}

export function Loans() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<LoanFormData>({
    amount: 0,
    purpose: '',
    collateral: '',
    guarantors: []
  });
  const { user } = useAuthStore();
  const loansRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (loansRef.current && !loansRef.current.contains(event.target as Node)) {
        setShowForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mock data for development
  const mockLoans: Loan[] = [
    {
      id: '1',
      amount: 50000,
      purpose: 'Business Expansion',
      applicationDate: '2024-11-15',
      approvalDate: '2024-11-20',
      dueDate: '2025-05-20',
      status: 'approved',
      interestRate: 12,
      totalRepayment: 56000,
      amountPaid: 28000,
      collateral: 'Business Equipment',
      guarantors: ['John Doe', 'Jane Smith']
    },
    {
      id: '2',
      amount: 30000,
      purpose: 'Emergency Medical',
      applicationDate: '2024-10-01',
      approvalDate: '2024-10-03',
      dueDate: '2025-04-03',
      status: 'paid',
      interestRate: 10,
      totalRepayment: 33000,
      amountPaid: 33000,
      guarantors: ['Alice Johnson']
    },
    {
      id: '3',
      amount: 75000,
      purpose: 'Education Fees',
      applicationDate: '2024-12-01',
      dueDate: '2025-06-01',
      status: 'pending',
      interestRate: 12,
      totalRepayment: 84000,
      amountPaid: 0,
      collateral: 'Car Logbook',
      guarantors: ['Bob Wilson', 'Carol Brown']
    }
  ];

  useEffect(() => {
    fetchLoans();
  }, [user]);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoans(mockLoans);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load loans');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newLoan: Loan = {
        id: String(Date.now()),
        ...formData,
        applicationDate: new Date().toISOString(),
        dueDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending',
        interestRate: 12,
        totalRepayment: formData.amount * 1.12,
        amountPaid: 0
      };
      setLoans(prev => [newLoan, ...prev]);
      setShowForm(false);
      setFormData({
        amount: 0,
        purpose: '',
        collateral: '',
        guarantors: []
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit loan application');
    }
  };

  const getStatusColor = (status: Loan['status']) => {
    switch (status) {
      case 'approved':
        return 'text-green-700 bg-green-50';
      case 'pending':
        return 'text-yellow-700 bg-yellow-50';
      case 'rejected':
        return 'text-red-700 bg-red-50';
      case 'paid':
        return 'text-blue-700 bg-blue-50';
      case 'defaulted':
        return 'text-gray-700 bg-gray-50';
    }
  };

  const calculateProgress = (loan: Loan) => {
    return (loan.amountPaid / loan.totalRepayment) * 100;
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
        <Button onClick={fetchLoans} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div ref={loansRef} className="flex-1 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Loans Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                View your loans, apply for new loans, and track repayments
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center space-x-2"
              >
                {showForm ? 'Cancel Application' : 'Apply for Loan'}
              </Button>
              {showForm && (
                <button onClick={() => setShowForm(false)} className="bg-transparent border-0 text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Loan Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Active Loans</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {loans.filter(l => l.status === 'approved').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total Borrowed</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(loans.reduce((sum, loan) => sum + loan.amount, 0))}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-6">
              <div className="flex items-center">
                <Calculator className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Outstanding Balance</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(
                      loans.reduce(
                        (sum, loan) => sum + (loan.totalRepayment - loan.amountPaid),
                        0
                      )
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Loan Application Form */}
          {showForm && (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">New Loan Application</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Loan Amount
                    </label>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={e => setFormData({ ...formData, amount: Number(e.target.value) })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Purpose
                    </label>
                    <input
                      type="text"
                      value={formData.purpose}
                      onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Collateral
                    </label>
                    <input
                      type="text"
                      value={formData.collateral}
                      onChange={e => setFormData({ ...formData, collateral: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Guarantors (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.guarantors.join(', ')}
                      onChange={e => setFormData({ ...formData, guarantors: e.target.value.split(',').map(s => s.trim()) })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Submit Application</Button>
                </div>
              </form>
            </div>
          )}

          {/* Loans List */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Loan History</h3>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {loans.length === 0 ? (
                <div className="p-6 text-center text-gray-500">No loans found</div>
              ) : (
                loans.map(loan => (
                  <div
                    key={loan.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-lg font-medium text-gray-900">
                            {formatCurrency(loan.amount)}
                          </h4>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              loan.status
                            )}`}
                          >
                            {loan.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{loan.purpose}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Applied: {new Date(loan.applicationDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Due: {new Date(loan.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          Interest Rate: {loan.interestRate}%
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          Total Repayment: {formatCurrency(loan.totalRepayment)}
                        </p>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Repayment Progress</span>
                        <span>{Math.round(calculateProgress(loan))}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-2 bg-blue-600 rounded-full"
                          style={{ width: `${calculateProgress(loan)}%` }}
                        />
                      </div>
                    </div>
                    {/* Additional Details */}
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p className="font-medium">Guarantors:</p>
                        <ul className="mt-1 list-disc list-inside">
                          {loan.guarantors.map((guarantor, index) => (
                            <li key={index}>{guarantor}</li>
                          ))}
                        </ul>
                      </div>
                      {loan.collateral && (
                        <div>
                          <p className="font-medium">Collateral:</p>
                          <p className="mt-1">{loan.collateral}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Loan Guidelines */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Loan Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Eligibility Criteria</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Must be an active member for at least 3 months</li>
                  <li>Regular contribution history</li>
                  <li>No outstanding defaulted loans</li>
                  <li>Maximum loan amount is 3x your savings</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Loan Terms</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Interest rate: 12% per annum</li>
                  <li>Maximum repayment period: 12 months</li>
                  <li>Early repayment allowed without penalty</li>
                  <li>Minimum 2 guarantors required</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
