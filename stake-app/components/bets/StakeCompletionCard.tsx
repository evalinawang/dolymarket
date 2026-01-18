'use client';

import { BetParticipant, StakeInstance } from '@/types';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';

interface StakeCompletionCardProps {
  participant: BetParticipant;
  stakeInstance: StakeInstance;
  onUploadClick?: () => void;
}

export function StakeCompletionCard({
  participant,
  stakeInstance,
  onUploadClick,
}: StakeCompletionCardProps) {
  const isCompleted = stakeInstance.status === 'completed';
  const isPending = stakeInstance.status === 'pending';

  return (
    <div
      className={`rounded-lg p-3 border-2 ${
        isCompleted
          ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
          : 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-start gap-2 flex-1">
          {isCompleted ? (
            <CheckCircle2 size={20} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle size={20} className="text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <p className="font-semibold text-sm">
              {isCompleted ? 'Stake Completed' : 'Stake Required'}
            </p>
            <p className={`text-xs mt-0.5 ${
              isCompleted
                ? 'text-green-700 dark:text-green-300'
                : 'text-orange-700 dark:text-orange-300'
            }`}>
              {stakeInstance.proofRequirement === 'NONE'
                ? 'No proof required'
                : `Proof: ${stakeInstance.proofRequirement}`}
            </p>
          </div>
        </div>
        {isCompleted && (
          <span className="text-xs font-semibold bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
            ✓ Verified
          </span>
        )}
      </div>

      {isPending && onUploadClick && (
        <button
          onClick={onUploadClick}
          className="w-full mt-2 px-3 py-2 bg-orange-600 dark:bg-orange-700 text-white text-sm font-semibold rounded hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors"
        >
          Upload Proof
        </button>
      )}

      {isCompleted && stakeInstance.proofUpload && (
        <div className="mt-2 text-xs text-green-700 dark:text-green-300">
          <p>Submitted: {new Date(stakeInstance.proofUpload.uploadedAt).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}
