import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateAmount } from '../../lib/utils/validation';
import { dividends } from '../../lib/api';

export function DividendDistribution() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const dividendAmount = Number(amount);
    if (!validateAmount(dividendAmount)) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      setLoading(true);
      await dividends.distribute({
        amount: dividendAmount,
        date: new Date().toISOString(),
      });
      setAmount('');
      // Navigate back to dividends page after successful distribution
      navigate('/dividends');
    } catch (err) {
      console.error('Failed to distribute dividends:', err);
      setError('Failed to distribute dividends. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="pb-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Distribute Dividends
          </h3>
          <p className="mt-2 max-w-4xl text-sm text-gray-500">
            Enter the total amount to distribute as dividends among all eligible members.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <label htmlFor="dividend-amount" className="block text-sm font-medium text-gray-700">
              Dividend Amount (KES)
            </label>
            <div className="mt-1">
              <input
                type="number"
                id="dividend-amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter total dividend amount"
                required
                min="0"
                step="0.01"
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600" id="dividend-error">
                {error}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
              onClick={() => navigate('/dividends')}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Distributing...' : 'Distribute Dividends'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}