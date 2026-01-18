'use client';

import { AlertCircle } from 'lucide-react';

interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
  disabled?: boolean;
}

export function DateTimePicker({
  value,
  onChange,
  error,
  label = 'Deadline',
  disabled = false,
}: DateTimePickerProps) {
  // Convert ISO string to datetime-local format
  const formatDateTimeLocal = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
  };

  // Convert datetime-local back to ISO string
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const datetimeLocal = e.target.value;
    if (datetimeLocal) {
      const date = new Date(datetimeLocal + ':00');
      onChange(date.toISOString());
    } else {
      onChange('');
    }
  };

  return (
    <div>
      <label htmlFor="deadline" className="block text-sm font-medium mb-2">
        {label} *
      </label>
      <input
        id="deadline"
        type="datetime-local"
        value={formatDateTimeLocal(value)}
        onChange={handleChange}
        disabled={disabled}
        className={`w-full px-4 py-2.5 border rounded-lg bg-white dark:bg-slate-800 transition-colors focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
}
