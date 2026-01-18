'use client';

import { useGenerateIdentityBadge } from '@/features/profile/useIdentity';
import { Sparkles, Zap } from 'lucide-react';

export function IdentityBadgeEmpty() {
  const generateMutation = useGenerateIdentityBadge();

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 rounded-lg border-2 border-dashed border-purple-200 dark:border-purple-800 overflow-hidden">
      <div className="p-8 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-full">
            <Sparkles size={32} className="text-purple-600 dark:text-purple-400" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            No Identity Badge Yet
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Generate your identity badge based on your activity. This will analyze your bets,
            interactions, and profile to create a personalized identity.
          </p>
        </div>

        <button
          onClick={() => generateMutation.mutateAsync()}
          disabled={generateMutation.isPending}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors disabled:opacity-60"
        >
          <Zap size={18} />
          {generateMutation.isPending ? 'Generating...' : 'Generate Badge'}
        </button>

        {generateMutation.isPending && (
          <div className="space-y-2">
            <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-purple-600 animate-pulse" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Analyzing your profile... This may take a moment.
            </p>
          </div>
        )}

        {generateMutation.isError && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <p className="text-sm text-red-700 dark:text-red-300">
              Failed to generate badge. Please try again.
            </p>
          </div>
        )}

        {generateMutation.isSuccess && (
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-3">
            <p className="text-sm text-green-700 dark:text-green-300">
              ✓ Badge generated successfully!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
