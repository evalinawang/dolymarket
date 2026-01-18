'use client';

import { useState } from 'react';
import { useAuth } from '@/features/auth/useAuth';
import { useIdentityBadge, useUserStats } from '@/features/profile/useIdentity';
import { IdentityBadgeCard } from '@/components/profile/IdentityBadgeCard';
import { IdentityBadgeEmpty } from '@/components/profile/IdentityBadgeEmpty';
import { PageShell } from '@/components/shared/PageShell';
import { CreateBetModal } from '@/components/bets/CreateBetModal';
import { LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

export default function ProfilePage() {
  const [showCreateBetModal, setShowCreateBetModal] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();
  const { data: badge, isLoading: badgeLoading } = useIdentityBadge();
  const { data: stats } = useUserStats();

  const handleLogout = async () => {
    logout();
    router.push('/login');
  };

  if (!user) {
    return null; // Should be caught by auth guard
  }

  return (
    <>
    <PageShell
      onCreateBetClick={() => setShowCreateBetModal(true)}>
      <div className="p-4">
        {/* User Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 rounded-xl p-6 mb-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Avatar Placeholder */}
            <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center flex-shrink-0">
              <User size={40} />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold truncate">{user.displayName || 'User'}</h1>
              <p className="text-blue-100">@{user.username}</p>
              {user.createdAt && (
                <p className="text-blue-100 text-sm mt-1">
                  Joined {format(new Date(user.createdAt), 'MMM yyyy')}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex-shrink-0 p-3 bg-white/20 hover:bg-white/30 backdrop-blur rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatCard label="Total Bets" value={stats.totalBets} />
          <StatCard label="Wins" value={stats.wonBets} color="text-green-600 dark:text-green-400" />
          <StatCard label="Losses" value={stats.lostBets} color="text-orange-600 dark:text-orange-400" />
          <StatCard label="Friends" value={stats.friends} />
          <StatCard label="Following" value={stats.following} />
        </div>
      )}

      {/* Identity Badge Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Identity Badge</h2>

        {badgeLoading && (
          <div className="bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-8 space-y-4">
            <div className="space-y-3">
              <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
              <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center animate-pulse">
              Loading your badge...
            </p>
          </div>
        )}

        {!badgeLoading && badge ? (
          <IdentityBadgeCard badge={badge} />
        ) : !badgeLoading ? (
          <IdentityBadgeEmpty />
        ) : null}
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

function StatCard({
  label,
  value,
  color = 'text-blue-600 dark:text-blue-400',
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold mb-1">
        {label}
      </p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
