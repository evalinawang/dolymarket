'use client';

import { Plus, Trash2 } from 'lucide-react';

export interface Outcome {
  label: string;
}

interface OutcomeManagerProps {
  outcomes: Outcome[];
  onChange: (outcomes: Outcome[]) => void;
  error?: string;
  maxOutcomes?: number;
}

export function OutcomeManager({
  outcomes,
  onChange,
  error,
  maxOutcomes = 10,
}: OutcomeManagerProps) {
  const handleAddOutcome = () => {
    if (outcomes.length < maxOutcomes) {
      onChange([...outcomes, { label: '' }]);
    }
  };

  const handleUpdateOutcome = (index: number, label: string) => {
    const updated = [...outcomes];
    updated[index] = { label };
    onChange(updated);
  };

  const handleRemoveOutcome = (index: number) => {
    onChange(outcomes.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Bet Outcomes (min 2, max {maxOutcomes}) *
      </label>

      <div className="space-y-2 mb-3">
        {outcomes.map((outcome, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={outcome.label}
              onChange={(e) => handleUpdateOutcome(index, e.target.value)}
              placeholder={`Outcome ${index + 1}`}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => handleRemoveOutcome(index)}
              disabled={outcomes.length <= 2}
              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              title="Remove outcome"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddOutcome}
        disabled={outcomes.length >= maxOutcomes}
        className="w-full py-2 border border-dashed border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Outcome
      </button>

      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
}
