'use client';

import { useState } from 'react';
import { Bet, BetOption } from '@/types';
import { useResolveBet } from '@/features/bets/useBets';
import { X } from 'lucide-react';

interface ResolveBetModalProps {
  bet: Bet;
  isOpen: boolean;
  onClose: () => void;
  onResolved?: () => void;
}

export function ResolveBetModal({
  bet,
  isOpen,
  onClose,
  onResolved,
}: ResolveBetModalProps) {
  const [selectedWinningOptionId, setSelectedWinningOptionId] = useState<
    string | null
  >(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const resolveMutation = useResolveBet(bet.id);

  if (!isOpen) return null;

  const handleResolve = async () => {
    if (!selectedWinningOptionId) return;

    setIsConfirming(true);
    try {
      await resolveMutation.mutateAsync({
        winningOptionId: selectedWinningOptionId,
      });
      onResolved?.();
      onClose();
    } catch (error) {
      console.error('Failed to resolve bet:', error);
    } finally {
      setIsConfirming(false);
    }
  };

  const isLoading = resolveMutation.isPending;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 rounded-t-2xl z-50 max-h-[90vh] overflow-y-auto md:bottom-auto md:left-1/2 md:right-auto md:top-1/2 md:w-full md:max-w-md md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900">
          <h2 className="text-xl font-bold">Resolve Bet</h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
              {bet.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Select the winning option
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2">
            {bet.options.map((option) => (
              <button
                key={option.id}
                onClick={() =>
                  !isLoading && setSelectedWinningOptionId(option.id)
                }
                disabled={isLoading}
                className={`w-full p-3 rounded-lg border-2 transition-all text-left font-semibold ${
                  selectedWinningOptionId === option.id
                    ? 'border-green-500 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300'
                } ${isLoading && 'opacity-60 cursor-not-allowed'}`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Confirmation */}
          {isConfirming && selectedWinningOptionId && (
            <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
              <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                This will:
              </p>
              <ul className="text-xs text-yellow-700 dark:text-yellow-300 mt-2 space-y-1 list-disc list-inside">
                <li>Lock the bet from further changes</li>
                <li>Mark participants as winners/losers</li>
                <li>Create stake instances for losers</li>
              </ul>
            </div>
          )}

          {resolveMutation.isError && (
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-sm text-red-700 dark:text-red-300">
                Error resolving bet. Please try again.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-4">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              onClick={handleResolve}
              disabled={!selectedWinningOptionId || isLoading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Resolving...' : 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
