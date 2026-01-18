'use client';

import { Bet, BetParticipant } from '@/types';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { StakeCompletionCard } from './StakeCompletionCard';

interface BetParticipantsProps {
  bet: Bet;
  participants?: BetParticipant[];
  onUploadProof?: (participant: BetParticipant) => void;
}

export function BetParticipants({ 
  bet, 
  participants = [],
  onUploadProof,
}: BetParticipantsProps) {
  if (!participants.length) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          No participants yet
        </p>
      </div>
    );
  }

  const winnerIds = bet.resolutionDetails?.winnerIds || [];
  const winners = participants.filter((p) => winnerIds.includes(p.userId));
  const losers = participants.filter((p) => !winnerIds.includes(p.userId));

  return (
    <div className="space-y-4">
      {/* Winners Section */}
      {bet.status === 'RESOLVED' && winners.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-green-200 dark:border-green-900">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={20} className="text-green-600 dark:text-green-400" />
            <h3 className="font-semibold text-green-900 dark:text-green-100">
              Winners ({winners.length})
            </h3>
          </div>
          <div className="space-y-2">
            {winners.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950 rounded text-sm"
              >
                <span className="font-medium text-gray-900 dark:text-white">
                  {participant.user?.displayName ||
                    participant.user?.username ||
                    'Unknown'}
                </span>
                <span className="text-green-700 dark:text-green-300 font-semibold">
                  Won
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Losers Section */}
      {bet.status === 'RESOLVED' && losers.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-orange-200 dark:border-orange-900">
          <div className="flex items-center gap-2 mb-3">
            <XCircle size={20} className="text-orange-600 dark:text-orange-400" />
            <h3 className="font-semibold text-orange-900 dark:text-orange-100">
              Losers ({losers.length})
            </h3>
          </div>
          <div className="space-y-3">
            {losers.map((participant) => (
              <div key={participant.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white text-sm">
                    {participant.user?.displayName ||
                      participant.user?.username ||
                      'Unknown'}
                  </span>
                  <span className="text-orange-700 dark:text-orange-300 font-semibold text-sm">
                    Lost
                  </span>
                </div>
                
                {/* Show stake completion status if available */}
                {participant.stakeInstance && (
                  <StakeCompletionCard
                    participant={participant}
                    stakeInstance={participant.stakeInstance}
                    onUploadClick={() => onUploadProof?.(participant)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Participants (for OPEN/LOCKED) */}
      {(bet.status === 'OPEN' || bet.status === 'LOCKED') && (
        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
            Participants ({participants.length})
          </h3>
          <div className="space-y-2">
            {participants.map((participant) => {
              const selectedOption = bet.options.find(
                (o) => o.id === participant.selectedOptionId
              );
              return (
                <div
                  key={participant.id}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-slate-800 rounded text-sm"
                >
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {participant.user?.displayName ||
                        participant.user?.username ||
                        'Unknown'}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Picked: {selectedOption?.label || 'Unknown'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
