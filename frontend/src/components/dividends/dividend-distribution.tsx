import { useState } from 'react';
import { Button } from '../ui/button';
import { validateAmount } from '../../lib/utils/validation';
import { dividends } from '../../lib/api';

interface DividendDistributionProps {
  onSuccess: () => void;
}

export function DividendDistribution({ onSuccess }: DividendDistributionProps) {
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
      onSuccess();
    } catch (err) {
      setError('Failed to distribute dividends');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="dividend-amount" className="block text-sm font-medium text-gray-700">
          Dividend Amount (KES)
        </label>
        <input
          type="number"
          id="dividend-amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter total dividend amount"
          required
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? 'Distributing...' : 'Distribute Dividends'}
      </Button>
    </form>
  );
}