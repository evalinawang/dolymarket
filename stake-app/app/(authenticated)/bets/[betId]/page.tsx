'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageShell } from '@/components/shared/PageShell';
import { useBetDetail, useUpdateParticipantPick } from '@/features/bets/useBets';
import { useAuth } from '@/features/auth/useAuth';
import { PickOptionButton } from '@/components/bets/PickOptionButton';
import { ResolveBetModal } from '@/components/bets/ResolveBetModal';
import { ProofUploadModal } from '@/components/bets/ProofUploadModal';
import { BetParticipants } from '@/components/bets/BetParticipants';
import { BetParticipant, StakeInstance } from '@/types';
import { ArrowLeft, Clock, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatDistanceToNow, isPast } from 'date-fns';

export default function BetDetailPage({
  params,
}: {
  params: { betId: string };
}) {
  const router = useRouter();
  const { user } = useAuth();
  const { data: bet, isLoading, error } = useBetDetail(params.betId);
  const updatePickMutation = useUpdateParticipantPick(params.betId);
  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<BetParticipant | null>(null);

  if (isLoading) {
    return (
      <PageShell
        header={
          <div className="p-4 flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">Loading...</h1>
          </div>
        }
      >
        <div className="p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          </div>
        </div>
      </PageShell>
    );
  }

  if (error || !bet) {
    return (
      <PageShell
        header={
          <div className="p-4 flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">Bet Not Found</h1>
          </div>
        }
      >
        <div className="p-4">
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-700 dark:text-red-300">
              {error ? 'Failed to load bet' : 'Bet not found'}
            </p>
          </div>
        </div>
      </PageShell>
    );
  }

  const isHost = user?.id === bet.createdBy;
  const currentUserParticipant = bet.participants?.find(
    (p) => p.userId === user?.id
  );
  const deadlineDate = new Date(bet.deadline);
  const isDeadlinePassed = isPast(deadlineDate);
  const canChangePick = bet.status === 'OPEN' && !isDeadlinePassed && currentUserParticipant;

  const handlePickOption = async (optionId: string) => {
    if (!canChangePick) return;

    try {
      await updatePickMutation.mutateAsync({ optionId });
    } catch (error) {
      console.error('Failed to update pick:', error);
    }
  };

  return (
    <>
      <PageShell
        header={
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => router.back()}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="flex items-center gap-2">
                {bet.status === 'OPEN' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    <Clock size={16} />
                    Open
                  </span>
                )}
                {bet.status === 'LOCKED' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300">
                    <Lock size={16} />
                    Locked
                  </span>
                )}
                {bet.status === 'RESOLVED' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300">
                    <CheckCircle2 size={16} />
                    Resolved
                  </span>
                )}
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {bet.title}
            </h1>
          </div>
        }
      >
        <div className="p-4 space-y-6">
          {/* Bet Info */}
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800 space-y-3">
            {bet.description && (
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Description
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {bet.description}
                </p>
              </div>
            )}

            {/* Deadline */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Deadline
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {deadlineDate.toLocaleString()}
                </span>
                {isDeadlinePassed && (
                  <span className="text-xs bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 px-2 py-1 rounded">
                    Passed
                  </span>
                )}
              </div>
            </div>

            {/* Stake Info */}
            {bet.stakeAmount && (
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Stake Required
                </h3>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  ${bet.stakeAmount}
                </p>
              </div>
            )}

            {/* Proof Requirement */}
            {bet.proofRequirement !== 'NONE' && (
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Proof Required
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {bet.proofRequirement === 'PHOTO' && '📸 Photo'}
                  {bet.proofRequirement === 'VIDEO' && '🎥 Video'}
                </p>
              </div>
            )}

            {/* Privacy */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Visibility
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {bet.privacy === 'FRIENDS_PUBLIC' ? '👥 Friends Public' : '🔒 Circle Private'}
              </p>
            </div>
          </div>

          {/* Options - OPEN State */}
          {bet.status === 'OPEN' && (
            <div className="space-y-3">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  Make Your Pick
                </h2>
                {!currentUserParticipant && (
                  <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-3">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      You haven't participated in this bet yet.
                    </p>
                  </div>
                )}
                <div className="space-y-2">
                  {bet.options.map((option) => (
                    <PickOptionButton
                      key={option.id}
                      option={option}
                      isSelected={
                        currentUserParticipant?.selectedOptionId === option.id
                      }
                      disabled={!canChangePick || updatePickMutation.isPending}
                      onClick={() => handlePickOption(option.id)}
                    />
                  ))}
                </div>
                {isDeadlinePassed && bet.status === 'OPEN' && (
                  <div className="mt-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                    <div className="flex gap-2">
                      <AlertCircle size={16} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Deadline has passed. Bet will be locked shortly.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Options - LOCKED State */}
          {bet.status === 'LOCKED' && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Options
              </h2>
              <div className="space-y-2">
                {bet.options.map((option) => (
                  <div
                    key={option.id}
                    className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900"
                  >
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {option.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                <div className="flex gap-2">
                  <Lock size={16} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    This bet is locked. No changes allowed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Host-Only Resolution Button */}
          {bet.status !== 'RESOLVED' && isHost && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setResolveModalOpen(true)}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                {bet.status === 'OPEN' ? 'Lock & Resolve Bet' : 'Resolve Bet'}
              </button>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
                Only the bet creator can resolve
              </p>
            </div>
          )}

          {/* Participants */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <BetParticipants 
              bet={bet} 
              participants={bet.participants}
              onUploadProof={(participant) => {
                setSelectedParticipant(participant);
                setUploadModalOpen(true);
              }}
            />
          </div>

          {/* Resolved Info */}
          {bet.status === 'RESOLVED' && bet.resolutionDetails && (
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex gap-2 mb-2">
                <CheckCircle2
                  size={20}
                  className="text-green-600 dark:text-green-400 flex-shrink-0"
                />
                <div>
                  <h3 className="font-semibold text-green-900 dark:text-green-100">
                    Bet Resolved
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Resolved {formatDistanceToNow(new Date(bet.resolvedAt || ''), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </PageShell>

      {/* Resolve Modal */}
      <ResolveBetModal
        bet={bet}
        isOpen={resolveModalOpen}
        onClose={() => setResolveModalOpen(false)}
        onResolved={() => {
          setResolveModalOpen(false);
        }}
      />

      {/* Proof Upload Modal */}
      {selectedParticipant && selectedParticipant.stakeInstance && (
        <ProofUploadModal
          betId={bet.id}
          participant={selectedParticipant}
          stakeInstance={selectedParticipant.stakeInstance}
          isOpen={uploadModalOpen}
          onClose={() => {
            setUploadModalOpen(false);
            setSelectedParticipant(null);
          }}
          onUploaded={() => {
            setUploadModalOpen(false);
            setSelectedParticipant(null);
          }}
        />
      )}
    </>
  );
}
