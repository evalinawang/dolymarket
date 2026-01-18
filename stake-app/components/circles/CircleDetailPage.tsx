'use client';

import { useState } from 'react';
import { useCircleDetail } from '@/features/circles/useCircles';
import { PageShell } from '@/components/shared/PageShell';
import { InviteFlow } from './InviteFlow';
import { MembersList } from './MembersList';
import { AlertCircle, Loader, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CircleDetailPageProps {
  circleId: string;
}

type Tab = 'active-bets' | 'past-bets' | 'members';

export function CircleDetailPage({ circleId }: CircleDetailPageProps) {
  const { data: circle, isLoading, error } = useCircleDetail(circleId);
  const [activeTab, setActiveTab] = useState<Tab>('active-bets');

  return (
    <PageShell
      header={
        <div className="p-4">
          <Link
            href="/circles"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-2xl font-bold">
            {isLoading ? 'Loading...' : circle?.name || 'Circle'}
          </h1>
          {circle?.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {circle.description}
            </p>
          )}
        </div>
      }
    >
      <div className="p-4 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-2">
              <Loader className="w-8 h-8 animate-spin text-blue-600" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Loading circle details...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-medium">Failed to load circle</p>
              <p className="text-sm">
                {error instanceof Error ? error.message : 'Please try again'}
              </p>
            </div>
          </div>
        ) : circle ? (
          <>
            {/* Tab Navigation */}
            <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800 -mx-4 px-4">
              <button
                onClick={() => setActiveTab('active-bets')}
                className={`py-3 px-4 font-medium border-b-2 transition ${
                  activeTab === 'active-bets'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                Active Bets
              </button>
              <button
                onClick={() => setActiveTab('past-bets')}
                className={`py-3 px-4 font-medium border-b-2 transition ${
                  activeTab === 'past-bets'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                Past Bets
              </button>
              <button
                onClick={() => setActiveTab('members')}
                className={`py-3 px-4 font-medium border-b-2 transition ${
                  activeTab === 'members'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                Members
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'active-bets' && (
              <div>
                <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800 text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    No active bets yet
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'past-bets' && (
              <div>
                <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800 text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    No past bets yet
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div className="space-y-4">
                <MembersList members={circle.members} />
                <InviteFlow circleId={circleId} circleName={circle.name} />
              </div>
            )}
          </>
        ) : null}
      </div>
    </PageShell>
  );
}
