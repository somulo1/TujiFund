import { User } from 'lucide-react';
import { formatCurrency } from '../../lib/utils/date';
import type { User as UserType } from '../../types';

interface MemberListProps {
  members: UserType[];
  onSelectMember: (id: string) => void;
}

export function MemberList({ members, onSelectMember }: MemberListProps) {
  return (
    <div className="divide-y divide-gray-200">
      {members.map((member) => (
        <button
          key={member.id}
          onClick={() => onSelectMember(member.id)}
          className="w-full flex items-center justify-between py-3 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-full">
              {member.avatar ? (
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <User className="h-5 w-5 text-gray-600" />
              )}
            </div>
            <div className="ml-3 text-left">
              <p className="text-sm font-medium text-gray-900">{member.name}</p>
              <p className="text-sm text-gray-500 capitalize">{member.role}</p>
            </div>
          </div>
          {member.totalContributions && (
            <div className="text-sm text-gray-900">
              {formatCurrency(member.totalContributions)}
            </div>
          )}
        </button>
      ))}
    </div>
  );
}