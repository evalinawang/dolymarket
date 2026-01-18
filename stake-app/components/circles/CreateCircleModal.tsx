'use client';

import { CreateCircleForm } from './CreateCircleForm';
import { X } from 'lucide-react';

interface CreateCircleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateCircleModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateCircleModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal - Constrained to iPhone frame */}
      <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
        <div className="w-full max-w-[393px] h-full flex items-end pointer-events-auto">
          <div className="w-full bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Create a Circle</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-lg transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <CreateCircleForm
              onSuccess={() => {
                onSuccess?.();
                onClose();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
