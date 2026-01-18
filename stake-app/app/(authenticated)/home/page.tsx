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
                {pendingStakesData.map((item) => (
                  <PendingStakeCard
                    key={`${item.bet.id}-${item.participant.id}`}
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
                {feedBets && Array.isArray(feedBets) && feedBets.map((bet, index) => (
                  <BetCard
                    key={`${bet.id}-${index}`}
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
        </div>
      </PageShell>

      <CreateBetModal
        isOpen={showCreateBetModal}
        onClose={() => setShowCreateBetModal(false)}
      />
    </>
  );
}
