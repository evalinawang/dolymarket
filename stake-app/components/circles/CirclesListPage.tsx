'use client';

import { useState } from 'react';
import { useAuth } from '@/features/auth/useAuth';
import { useCircles } from '@/features/circles/useCircles';
import { PageShell } from '@/components/shared/PageShell';
import { CircleCard } from '@/components/circles/CircleCard';
import { CreateCircleModal } from '@/components/circles/CreateCircleModal';
import { SkeletonCircleCard } from '@/components/shared/SkeletonLoader';
import { EmptyState, ErrorState } from '@/components/shared/EmptyState';
import { Plus, AlertCircle, Loader, Layers } from 'lucide-react';
import { CreateBetModal } from '@/components/bets/CreateBetModal';

export function CirclesListPage() {
  const { user } = useAuth();
  const { data: circles, isLoading, error } = useCircles(user?.id);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateBetModal, setShowCreateBetModal] = useState(false);

  return (
    <>
    <PageShell
      header={
        <div className="p-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Circles</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Join or create a circle
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
            title="Create circle"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      }
      onCreateBetClick={() => setShowCreateBetModal(true)}
    >
      <div className="p-4 space-y-3">
        {isLoading ? (
          <>
            {[1, 2, 3].map((i) => (
              <SkeletonCircleCard key={i} />
            ))}
          </>
        ) : error ? (
          <ErrorState
            title="Failed to load circles"
            description={error instanceof Error ? error.message : 'Please try again later'}
          />
        ) : !circles || circles.length === 0 ? (
          <EmptyState
            icon={Layers}
            title="No circles yet"
            description="Create or join a circle to start betting with friends"
            action={{
              label: 'Create Circle',
              onClick: () => setShowCreateModal(true),
            }}
          />
        ) : (
          <>
            {circles.map((circle) => (
              <CircleCard key={circle.id} circle={circle} />
            ))}
          </>
        )}
      </div>

      {showCreateModal && (
        <CreateCircleModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => setShowCreateModal(false)}
        />
      )}
    </PageShell>

    <CreateBetModal
      isOpen={showCreateBetModal}
      onClose={() => setShowCreateBetModal(false)}
    />
    </>
  );
}
