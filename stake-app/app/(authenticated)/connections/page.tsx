'use client';

import { useState } from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { CreateBetModal } from '@/components/bets/CreateBetModal';
import { UserSearch } from '@/components/friends/UserSearch';
import { FriendRequestNotifications } from '@/components/friends/FriendRequestNotifications';
import { UserCard } from '@/components/friends/UserCard';
import { useFriendsList, useFollowingList } from '@/features/friends/useFriends';
import { SkeletonUserCard } from '@/components/shared/SkeletonLoader';
import { EmptyState } from '@/components/shared/EmptyState';
import { Users, UserPlus, Heart, MessageSquare } from 'lucide-react';

type Tab = 'search' | 'friends' | 'following';

export default function ConnectionsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('search');
  const [showCreateBetModal, setShowCreateBetModal] = useState(false);
  const { data: friends, isLoading: friendsLoading } = useFriendsList();
  const { data: following, isLoading: followingLoading } = useFollowingList();

  const tabs: Array<{ id: Tab; label: string; icon: React.ReactNode }> = [
    { id: 'search', label: 'Find', icon: <UserPlus size={18} /> },
    { id: 'friends', label: `Friends (${friends?.length || 0})`, icon: <Users size={18} /> },
    { id: 'following', label: `Following (${following?.length || 0})`, icon: <Heart size={18} /> },
  ];

  return (
    <>
    <PageShell
      header={
        <div className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Users size={28} className="text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Connections</h1>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Friends & following
          </p>
        </div>
      }
      onCreateBetClick={() => setShowCreateBetModal(true)}
    >
      <div className="p-4 space-y-4">
        {/* Friend Request Notifications */}
        <FriendRequestNotifications />

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'search' && (
            <UserSearch />
          )}

          {activeTab === 'friends' && (
            <div className="space-y-2">
              {friendsLoading ? (
                <>
                  {[1, 2, 3].map((i) => (
                    <SkeletonUserCard key={i} />
                  ))}
                </>
              ) : !friends || friends.length === 0 ? (
                <EmptyState
                  icon={Users}
                  title="No friends yet"
                  description="Find and add friends to expand your network."
                />
              ) : (
                friends.map((friendship) => (
                  <UserCard
                    key={friendship.id}
                    user={friendship.friend!}
                    isFollowing={true}
                    showFollowButton={true}
                  />
                ))
              )}
            </div>
          )}

          {activeTab === 'following' && (
            <div className="space-y-2">
              {followingLoading ? (
                <>
                  {[1, 2, 3].map((i) => (
                    <SkeletonUserCard key={i} />
                  ))}
                </>
              ) : !following || following.length === 0 ? (
                <EmptyState
                  icon={Heart}
                  title="Not following anyone"
                  description="Follow users to see their public bets and activity."
                />
              ) : (
                following.map((follow) => {
                  const [localFollowing, setLocalFollowing] = useState(true);
                  return (
                    <UserCard
                      key={follow.id}
                      user={follow.following!}
                      isFollowing={localFollowing}
                      showFollowButton={true}
                      onFollowChange={setLocalFollowing}
                    />
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </PageShell>

    <CreateBetModal
      isOpen={showCreateBetModal}
      onClose={() => setShowCreateBetModal(false)}
    />
    </>
  );
}
