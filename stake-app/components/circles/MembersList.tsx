'use client';

import { User } from '@/types';
import { Users } from 'lucide-react';

interface MembersListProps {
  members: User[];
}

export function MembersList({ members }: MembersListProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2">
        <Users className="w-5 h-5" />
        <h3 className="font-semibold">{members.length} Members</h3>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {members.map((member) => (
          <div
            key={member.id}
            className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800/50 transition"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{member.displayName || member.username}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                @{member.username}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
