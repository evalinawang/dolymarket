'use client';

import { PageShell } from '@/components/shared/PageShell';

export default function BetDetailPage({
  params,
}: {
  params: { betId: string };
}) {
  return (
    <PageShell
      header={
        <div className="p-4">
          <h1 className="text-2xl font-bold">Bet {params.betId}</h1>
        </div>
      }
    >
      <div className="p-4 space-y-4">
        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
          <h2 className="font-semibold mb-2">Bet Details</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Coming soon...
          </p>
        </div>
      </div>
    </PageShell>
  );
}
