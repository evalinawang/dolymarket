'use client';

/**
 * Explore Page
 * 
 * Displays FRIENDS_PUBLIC bets from friends and following only.
 * Does not show global bets (privacy-first approach).
 * Supports sorting: newest first (default), by deadline, or active bets (OPEN/LOCKED).
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageShell } from '@/components/shared/PageShell';
import { CreateBetModal } from '@/components/bets/CreateBetModal';
import { BetCard } from '@/components/bets/BetCard';
import { useExploreFeed } from '@/features/bets/useBets';
import { SkeletonBetCard } from '@/components/shared/SkeletonLoader';
import { EmptyState, ErrorState } from '@/components/shared/EmptyState';
import { Sparkles, TrendingUp, Clock, Zap, Users, Eye } from 'lucide-react';

type SortOption = 'newest' | 'deadline' | 'active';

export default function ExplorePage() {
  const [showCreateBetModal, setShowCreateBetModal] = useState(false);
  const router = useRouter();
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const { data: exploreBets, isLoading, error } = useExploreFeed(sortBy);

  const sortOptions: Array<{ value: SortOption; label: string; icon: React.ReactNode }> = [
    { value: 'newest', label: 'Newest', icon: <Sparkles size={16} /> },
    { value: 'active', label: 'Active', icon: <Zap size={16} /> },
    { value: 'deadline', label: 'By Deadline', icon: <Clock size={16} /> },
  ];

  return (
    <>
    <PageShell
      header={
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp size={28} className="text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Explore</h1>
            </div>
            <button
              onClick={() => router.push('/connections')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900 transition-colors"
            >
              <Users size={18} />
              <span className="text-sm font-semibold">Connections</span>
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Public bets from friends & following
          </p>
        </div>
      }
      onCreateBetClick={() => setShowCreateBetModal(true)}
    >
      <div className="p-4 space-y-4">
        {/* Sort Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
                sortBy === option.value
                  ? 'bg-blue-600 dark:bg-blue-700 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>

        {/* Bets Feed */}
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <SkeletonBetCard key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorState
            title="Failed to load bets"
            description="There was a problem loading the explore feed. Please try again."
          />
        ) : !exploreBets || exploreBets.length === 0 ? (
          <EmptyState
            icon={Eye}
            title="No public bets yet"
            description="Follow friends or find more connections to see their public bets here."
            action={{
              label: 'Find Connections',
              onClick: () => router.push('/connections'),
            }}
          />
        ) : (
          <div className="space-y-2">
            {exploreBets.map((bet) => (
              <BetCard
                key={bet.id}
                bet={bet}
                circle={
                  bet.circleId
                    ? { name: `Circle ${bet.circleId.slice(0, 8)}` }
                    : undefined
                }
              />
            ))}
          </div>
        )}
      </div>
    </PageShell>

    <CreateBetModal
      isOpen={showCreateBetModal}
      onClose={() => setShowCreateBetModal(false)}
    />
    </>
  );
}
