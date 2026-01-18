'use client';

import { useState } from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { CreateBetModal } from '@/components/bets/CreateBetModal';
import { BetCard } from '@/components/bets/BetCard';
import { PendingStakeCard } from '@/components/bets/PendingStakeCard';
import { useHomeFeed, usePendingStakes } from '@/features/bets/useBets';
import { SkeletonBetCard } from '@/components/shared/SkeletonLoader';
import { EmptyState, ErrorState } from '@/components/shared/EmptyState';
import { AlertCircle, TrendingUp, Zap } from 'lucide-react';

export default function HomePage() {
  const [showCreateBetModal, setShowCreateBetModal] = useState(false);
  const { data: feedBets, isLoading: isFeedLoading, error: feedError } = useHomeFeed();
  const { data: pendingStakes, isLoading: isPendingLoading, error: pendingError } = usePendingStakes();

  const pendingStakesData = pendingStakes || [];

  return (
    <>
      <PageShell
        header={
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Home</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              All accessible bets from your circles
            </p>
          </div>
        }
        onCreateBetClick={() => setShowCreateBetModal(true)}
      >
        <div className="p-4 space-y-6">
          {/* You Owe Section */}
          {pendingStakesData.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircle size={20} className="text-orange-600 dark:text-orange-400" />
                <h2 className="text-lg font-bold text-orange-900 dark:text-orange-100">
                  You Owe ({pendingStakesData.length})
                </h2>
              </div>

              <div className="space-y-2">
                {pendingStakesData.map((item, index) => (
                  <PendingStakeCard
                    key={index}
                    bet={item.bet}
                    participant={item.participant}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Active Bets Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Active Bets
              </h2>
            </div>

            {isFeedLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <SkeletonBetCard key={i} />
                ))}
              </div>
            ) : feedError ? (
              <ErrorState
                title="Failed to load bets"
                description="There was a problem loading your feed. Please try again."
              />
            ) : !feedBets || feedBets.length === 0 ? (
              <EmptyState
                icon={Zap}
                title="No active bets yet"
                description="Create your first bet or join a circle to see bets appear here."
              />
            ) : (
              <div className="space-y-2">
                {feedBets.map((bet) => (
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

          {/* Empty State */}
          {!isFeedLoading &&
            !feedError &&
            (!feedBets || feedBets.length === 0) &&
            pendingStakesData.length === 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-8 text-center border border-blue-200 dark:border-blue-800">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Get Started
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Create your first bet or join a circle to see bets appear here.
                  </p>
                </div>
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
