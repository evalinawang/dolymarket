'use client';

import { AlertCircle } from 'lucide-react';

const STAKE_PRESETS = [
  { value: 10, label: '$10' },
  { value: 25, label: '$25' },
  { value: 50, label: '$50' },
  { value: 100, label: '$100' },
];

interface StakeSelectorProps {
  value?: number;
  onChange: (value: number | undefined) => void;
  error?: string;
}

export function StakeSelector({ value, onChange, error }: StakeSelectorProps) {
  const isCustom = value !== undefined && !STAKE_PRESETS.find(p => p.value === value);

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Stake Amount (optional)
      </label>

      {/* Preset buttons */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {STAKE_PRESETS.map((preset) => (
          <button
            key={preset.value}
            type="button"
            onClick={() => onChange(preset.value)}
            className={`py-2 px-2 rounded-lg font-medium transition ${
              value === preset.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-slate-600'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Custom input */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          $
        </span>
        <input
          type="number"
          value={isCustom ? value : ''}
          onChange={(e) => {
            const num = e.target.value ? parseInt(e.target.value) : undefined;
            onChange(num);
          }}
          placeholder="Custom amount"
          className={`w-full pl-8 pr-4 py-2.5 border rounded-lg bg-white dark:bg-slate-800 transition-colors focus:outline-none focus:ring-2 ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
          }`}
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Leave blank to not set a stake amount
      </p>
    </div>
  );
}
