'use client';

import { useState } from 'react';
import { IdentityBadgeDetail } from '@/types';
import { PillarScoreBars } from './PillarScoreBars';
import { useRegenerateIdentityBadge } from '@/features/profile/useIdentity';
import { RefreshCw, Zap } from 'lucide-react';

interface IdentityBadgeCardProps {
  badge: IdentityBadgeDetail;
  isLoading?: boolean;
}

export function IdentityBadgeCard({ badge, isLoading }: IdentityBadgeCardProps) {
  const regenerateMutation = useRegenerateIdentityBadge();
  const [showDetails, setShowDetails] = useState(false);

  // Calculate average pillar score
  const averageScore = Math.round(
    (badge.pillars.express +
      badge.pillars.protect +
      badge.pillars.create +
      badge.pillars.evolve) /
      4
  );

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 rounded-lg border border-purple-200 dark:border-purple-800 overflow-hidden">
      {/* Header with Title & Average Score */}
      <div className="p-4 border-b border-purple-200 dark:border-purple-800 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {badge.title}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              {badge.description}
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-purple-200 dark:bg-purple-900">
              <span className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                {averageScore}
              </span>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="text-xs text-gray-600 dark:text-gray-400">
          <p>
            Generated{' '}
            {new Date(badge.generatedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Pillars Section */}
      <div className="p-4 space-y-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full text-left flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
        >
          <span className="font-semibold text-gray-900 dark:text-white text-sm">
            {showDetails ? 'Hide' : 'View'} Pillars
          </span>
          <Zap size={16} className="text-yellow-600 dark:text-yellow-400" />
        </button>

        {showDetails && (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
            <PillarScoreBars pillars={badge.pillars} />
          </div>
        )}
      </div>

      {/* Footer with Regenerate Button */}
      <div className="p-4 border-t border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-900">
        <button
          onClick={() => regenerateMutation.mutateAsync()}
          disabled={regenerateMutation.isPending}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-colors disabled:opacity-60"
        >
          <RefreshCw size={16} className={regenerateMutation.isPending ? 'animate-spin' : ''} />
          {regenerateMutation.isPending ? 'Regenerating...' : 'Refresh Badge'}
        </button>
        {regenerateMutation.isError && (
          <p className="text-xs text-red-600 dark:text-red-400 mt-2">
            Failed to regenerate. Try again.
          </p>
        )}
      </div>
    </div>
  );
}
