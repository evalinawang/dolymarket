'use client';

import { usePendingFriendRequests, useAcceptFriendRequest, useDeclineFriendRequest } from '@/features/friends/useFriends';
import { Check, X, AlertCircle } from 'lucide-react';

export function FriendRequestNotifications() {
  const { data: requests, isLoading } = usePendingFriendRequests();
  const acceptMutation = useAcceptFriendRequest();
  const declineMutation = useDeclineFriendRequest();

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
        <p className="text-sm text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2">
        <AlertCircle size={20} className="text-blue-600 dark:text-blue-400" />
        <h3 className="font-bold text-blue-900 dark:text-blue-100">
          Friend Requests ({requests.length})
        </h3>
      </div>

      <div className="space-y-2">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg"
          >
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {request.sender?.displayName || request.sender?.username}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                @{request.sender?.username}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => acceptMutation.mutateAsync(request.id)}
                disabled={acceptMutation.isPending || declineMutation.isPending}
                className="flex items-center gap-1 px-3 py-1 rounded bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-60"
              >
                <Check size={16} />
              </button>
              <button
                onClick={() => declineMutation.mutateAsync(request.id)}
                disabled={acceptMutation.isPending || declineMutation.isPending}
                className="flex items-center gap-1 px-3 py-1 rounded bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
