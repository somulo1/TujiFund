import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { members } from '../../lib/api';
import { formatCurrency } from '../../lib/utils/date';

interface MemberProfileProps {
  memberId: string;
}

export function MemberProfile({ memberId }: MemberProfileProps) {
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const data = await members.getById(memberId);
        setMember(data);
      } catch (err) {
        console.error('Failed to fetch member:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [memberId]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!member) {
    return <div>Member not found</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center">
          <div className="p-2 bg-gray-100 rounded-full">
            <User className="h-8 w-8 text-gray-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-500">{member.email}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Total Contributions</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatCurrency(member.totalContributions)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Member Since</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(member.joinedAt).toLocaleDateString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                Active
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Last Contribution</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {member.lastContribution
                ? new Date(member.lastContribution).toLocaleDateString()
                : 'No contributions yet'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}