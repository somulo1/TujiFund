import { useState, useEffect } from 'react';
import { members } from '../../lib/api';
import { MemberList } from '../../components/members/member-list';
import { MemberProfile } from '../../components/members/member-profile';
import type { User } from '../../types';

// Default members for development/testing
const defaultMembers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'member',
    joinedAt: new Date().toISOString(),
    totalContributions: 50000
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'member',
    joinedAt: new Date().toISOString(),
    totalContributions: 75000
  }
];

export function MembersPage() {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [membersList, setMembersList] = useState<User[]>(defaultMembers);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await members.getAll();
        if (response && response.data) {
          setMembersList(response.data);
          setError(null);
        } else {
          setError('No data received from server');
        }
      } catch (err) {
        console.error('Failed to fetch members:', err);
        setError('Failed to load members. Using default data.');
        // Keep using default members in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading members...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Members List
            </h2>
            <MemberList
              members={membersList}
              onSelectMember={setSelectedMemberId}
            />
          </div>
        </div>
        <div>
          {selectedMemberId && (
            <MemberProfile memberId={selectedMemberId} />
          )}
        </div>
      </div>
    </div>
  );
}