'use client';

import { CreateBetForm } from './CreateBetForm';
import { X } from 'lucide-react';

interface CreateBetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateBetModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateBetModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
        <div className="w-full sm:max-w-lg bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Create a Bet</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-lg transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <CreateBetForm
            onSuccess={() => {
              onSuccess?.();
              onClose();
            }}
          />
        </div>
      </div>
    </>
  );
}
