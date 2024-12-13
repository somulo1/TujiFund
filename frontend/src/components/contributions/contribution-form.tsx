import { useState } from 'react';
import { Button } from '../ui/button';
import { validateAmount } from '../../lib/utils/validation';
import { contributions } from '../../lib/api';

interface ContributionFormProps {
  onSuccess: () => void;
}

export function ContributionForm({ onSuccess }: ContributionFormProps) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const contributionAmount = Number(amount);
    if (!validateAmount(contributionAmount)) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      setLoading(true);
      await contributions.create({
        amount: contributionAmount,
        date: new Date().toISOString(),
      });
      setAmount('');
      onSuccess();
    } catch (err) {
      setError('Failed to submit contribution');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Contribution Amount (KES)
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter amount"
          required
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Contribution'}
      </Button>
    </form>
  );
}