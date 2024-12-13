import { useState, useEffect } from 'react';
import { members } from '../../lib/api';
import { MemberList } from '../../components/members/member-list';
import { MemberProfile } from '../../components/members/member-profile';

export function MembersPage() {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [membersList, setMembersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await members.getAll();
        setMembersList(data);
      } catch (err) {
        console.error('Failed to fetch members:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return <div>Loading members...</div>;
  }

  return (
    <div className="space-y-6">
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