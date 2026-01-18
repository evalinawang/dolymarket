'use client';

import { IdentityBadgeDetail } from '@/types';

interface PillarScoreBarsProps {
  pillars: IdentityBadgeDetail['pillars'];
}

export function PillarScoreBars({ pillars }: PillarScoreBarsProps) {
  const pillarData = [
    {
      key: 'express' as const,
      label: 'Express',
      description: 'Self-expression & Communication',
      color: 'bg-blue-500 dark:bg-blue-600',
      lightColor: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      key: 'protect' as const,
      label: 'Protect',
      description: 'Protection & Accountability',
      color: 'bg-green-500 dark:bg-green-600',
      lightColor: 'bg-green-100 dark:bg-green-900',
    },
    {
      key: 'create' as const,
      label: 'Create',
      description: 'Creation & Innovation',
      color: 'bg-purple-500 dark:bg-purple-600',
      lightColor: 'bg-purple-100 dark:bg-purple-900',
    },
    {
      key: 'evolve' as const,
      label: 'Evolve',
      description: 'Evolution & Growth',
      color: 'bg-orange-500 dark:bg-orange-600',
      lightColor: 'bg-orange-100 dark:bg-orange-900',
    },
  ];

  return (
    <div className="space-y-4">
      {pillarData.map((pillar) => {
        const score = pillars[pillar.key];
        const percentage = Math.round((score / 100) * 100);

        return (
          <div key={pillar.key} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {pillar.label}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {pillar.description}
                </p>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white ml-2">
                {score}
              </span>
            </div>

            {/* Progress Bar */}
            <div className={`h-3 rounded-full overflow-hidden ${pillar.lightColor}`}>
              <div
                className={`h-full ${pillar.color} transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
