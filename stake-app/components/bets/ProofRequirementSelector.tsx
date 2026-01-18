'use client';

import { AlertCircle, Camera, Video } from 'lucide-react';

interface ProofRequirementSelectorProps {
  value: 'NONE' | 'PHOTO' | 'VIDEO';
  onChange: (value: 'NONE' | 'PHOTO' | 'VIDEO') => void;
  error?: string;
}

const PROOF_OPTIONS = [
  {
    value: 'NONE' as const,
    label: 'No Proof',
    description: 'Honor system',
    icon: null,
  },
  {
    value: 'PHOTO' as const,
    label: 'Photo',
    description: 'Photo required',
    icon: Camera,
  },
  {
    value: 'VIDEO' as const,
    label: 'Video',
    description: 'Video required',
    icon: Video,
  },
];

export function ProofRequirementSelector({
  value,
  onChange,
  error,
}: ProofRequirementSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-3">
        Proof Requirement *
      </label>

      <div className="grid grid-cols-3 gap-2 mb-3">
        {PROOF_OPTIONS.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`py-3 px-2 rounded-lg text-center transition ${
                value === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              {Icon && <Icon className="w-5 h-5 mx-auto mb-1" />}
              <div className="text-sm font-medium">{option.label}</div>
              <div className="text-xs opacity-75">{option.description}</div>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
}
