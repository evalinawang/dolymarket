'use client';

import { useRouter } from 'next/navigation';
import { Bet } from '@/types';
import { Clock, Lock, CheckCircle2, Shield, Video, Camera, Eye, Users } from 'lucide-react';
import { formatDistanceToNow, isPast } from 'date-fns';

interface BetCardProps {
  bet: Bet;
  circle?: { name: string };
}

export function BetCard({ bet, circle }: BetCardProps) {
  const router = useRouter();
  
  // Safely parse deadline - handle invalid dates
  const deadlineDate = bet.deadline ? new Date(bet.deadline) : new Date();
  const isValidDate = !isNaN(deadlineDate.getTime());
  const isDeadlinePassed = isValidDate && isPast(deadlineDate);

  return (
    <button
      onClick={() => router.push(`/bets/${bet.id}`)}
      className="w-full text-left bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md transition-all"
    >
      {/* Card Header with Title and Status Badge */}
      <div className="p-4 pb-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-base text-gray-900 dark:text-white flex-1 line-clamp-2">
            {bet.title}
          </h3>
          {/* Status Badge */}
          <div className="flex-shrink-0">
            {bet.status === 'OPEN' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 whitespace-nowrap">
                <Clock size={12} />
                Open
              </span>
            )}
            {bet.status === 'LOCKED' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 whitespace-nowrap">
                <Lock size={12} />
                Locked
              </span>
            )}
            {bet.status === 'RESOLVED' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 whitespace-nowrap">
                <CheckCircle2 size={12} />
                Done
              </span>
            )}
          </div>
        </div>

        {/* Circle and Host Info */}
        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          {circle && (
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{circle.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Body with Metadata */}
      <div className="p-4 space-y-3">
        {/* Deadline */}
        {isValidDate && (
          <div className="flex items-center gap-2 text-sm">
            <Clock size={16} className="text-gray-400 dark:text-gray-600 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-400">
              {isDeadlinePassed ? (
                <span className="text-red-600 dark:text-red-400 font-semibold">
                  Deadline passed
                </span>
              ) : (
                formatDistanceToNow(deadlineDate, { addSuffix: true })
              )}
            </span>
          </div>
        )}

        {/* Stake */}
        {bet.stakeAmount && (
          <div className="flex items-center gap-2 text-sm">
            <Shield size={16} className="text-gray-400 dark:text-gray-600 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-400">
              Stake: <span className="font-semibold text-gray-900 dark:text-white">${bet.stakeAmount}</span>
            </span>
          </div>
        )}

        {/* Options Count */}
        {bet.options && bet.options.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {bet.options.length} options
            </span>
          </div>
        )}

        {/* Privacy and Proof Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {/* Privacy Badge */}
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300">
            {bet.privacy === 'CIRCLE_PRIVATE' ? (
              <>
                <Shield size={12} />
                Private
              </>
            ) : (
              <>
                <Eye size={12} />
                Public
              </>
            )}
          </span>

          {/* Proof Badge */}
          {bet.proofRequirement !== 'NONE' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
              {bet.proofRequirement === 'PHOTO' ? (
                <>
                  <Camera size={12} />
                  Photo
                </>
              ) : (
                <>
                  <Video size={12} />
                  Video
                </>
              )}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
