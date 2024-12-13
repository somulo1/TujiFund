import { useState, useEffect } from 'react';
import { contributions } from '../../lib/api';
import { formatDate, formatCurrency } from '../../lib/utils/date';

export function ContributionList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const data = await contributions.getAll();
        setItems(data);
      } catch (err) {
        console.error('Failed to fetch contributions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  if (loading) {
    return <div>Loading contributions...</div>;
  }

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {items.map((item: any) => (
            <tr key={item.id}>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {formatDate(item.date)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {formatCurrency(item.amount)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                  item.status === 'approved' 
                    ? 'bg-green-100 text-green-800'
                    : item.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}