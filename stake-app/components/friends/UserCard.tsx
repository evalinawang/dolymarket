'use client';

import { User } from '@/types';
import { useFollowUser, useUnfollowUser } from '@/features/friends/useFriends';
import { UserCheck, UserPlus } from 'lucide-react';

interface UserCardProps {
  user: User;
  isFollowing?: boolean;
  showFollowButton?: boolean;
  onFollowChange?: (isFollowing: boolean) => void;
}

export function UserCard({
  user,
  isFollowing = false,
  showFollowButton = true,
  onFollowChange,
}: UserCardProps) {
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();
  const isLoading = followMutation.isPending || unfollowMutation.isPending;

  const handleToggleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowMutation.mutateAsync(user.id);
        onFollowChange?.(false);
      } else {
        await followMutation.mutateAsync(user.id);
        onFollowChange?.(true);
      }
    } catch (error) {
      console.error('Failed to toggle follow:', error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
      <div className="flex-1">
        <p className="font-semibold text-gray-900 dark:text-white">
          {user.displayName || user.username}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          @{user.username}
        </p>
        {user.bio && (
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 line-clamp-2">
            {user.bio}
          </p>
        )}
      </div>

      {showFollowButton && (
        <button
          onClick={handleToggleFollow}
          disabled={isLoading}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors disabled:opacity-60 ml-3 ${
            isFollowing
              ? 'bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isFollowing ? (
            <>
              <UserCheck size={16} />
              Following
            </>
          ) : (
            <>
              <UserPlus size={16} />
              Follow
            </>
          )}
        </button>
      )}
    </div>
  );
}
