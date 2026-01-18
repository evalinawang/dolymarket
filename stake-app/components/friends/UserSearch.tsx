'use client';

import { useState } from 'react';
import { useSearchUsers, useSendFriendRequest } from '@/features/friends/useFriends';
import { UserPlus, Search, Loader } from 'lucide-react';

export function UserSearch() {
  const [query, setQuery] = useState('');
  const { data: results, isLoading } = useSearchUsers(query);
  const sendRequestMutation = useSendFriendRequest();

  const handleSendRequest = async (userId: string) => {
    try {
      await sendRequestMutation.mutateAsync(userId);
    } catch (error) {
      console.error('Failed to send friend request:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search users by username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Results */}
      {query && (
        <div className="space-y-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader size={24} className="text-gray-400 animate-spin" />
            </div>
          ) : !results || results.length === 0 ? (
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No users found
              </p>
            </div>
          ) : (
            results.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-gray-800"
              >
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {user.displayName || user.username}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    @{user.username}
                  </p>
                </div>
                <button
                  onClick={() => handleSendRequest(user.id)}
                  disabled={sendRequestMutation.isPending}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
                >
                  <UserPlus size={16} />
                  Add
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
