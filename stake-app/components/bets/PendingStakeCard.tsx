'use client';

import { useRouter } from 'next/navigation';
import { Bet, BetParticipant } from '@/types';
import { AlertCircle, Camera, Video, ChevronRight } from 'lucide-react';

interface PendingStakeCardProps {
  bet: Bet;
  participant: BetParticipant;
}

export function PendingStakeCard({ bet, participant }: PendingStakeCardProps) {
  const router = useRouter();
  const stakeInstance = participant.stakeInstance;

  if (!stakeInstance) return null;

  return (
    <button
      onClick={() => router.push(`/bets/${bet.id}`)}
      className="w-full text-left bg-orange-50 dark:bg-orange-950 rounded-lg border-2 border-orange-200 dark:border-orange-800 overflow-hidden hover:border-orange-400 dark:hover:border-orange-600 hover:shadow-md transition-all"
    >
      <div className="p-4 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={18} className="text-orange-600 dark:text-orange-400 flex-shrink-0" />
            <h3 className="font-bold text-base text-orange-900 dark:text-orange-100 line-clamp-2">
              {bet.title}
            </h3>
          </div>

          <div className="text-sm text-orange-800 dark:text-orange-200 space-y-1">
            <div>
              Stake Required: <span className="font-bold">${bet.stakeAmount || 'TBD'}</span>
            </div>

            {/* Proof Type Required */}
            {stakeInstance.proofRequirement !== 'NONE' && (
              <div className="flex items-center gap-1">
                {stakeInstance.proofRequirement === 'PHOTO' ? (
                  <>
                    <Camera size={14} />
                    <span>Photo proof required</span>
                  </>
                ) : (
                  <>
                    <Video size={14} />
                    <span>Video proof required</span>
                  </>
                )}
              </div>
            )}

            {/* Status */}
            <div className="pt-1 font-semibold text-orange-700 dark:text-orange-300">
              ⚠️ Action needed
            </div>
          </div>
        </div>

        <ChevronRight size={20} className="text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
      </div>
    </button>
  );
}
