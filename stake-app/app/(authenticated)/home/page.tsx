'use client';

import { PageShell } from '@/components/shared/PageShell';

export default function HomePage() {
  return (
    <PageShell>
      <div className="p-4 space-y-4">
        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
          <h2 className="font-semibold mb-2">Your Recent Bets</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No bets yet. Create your first bet!
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
          <h2 className="font-semibold mb-2">Friends' Activity</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add friends to see their activity
          </p>
        </div>
      </div>
    </PageShell>
  );
}
