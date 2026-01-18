'use client';

import { BetOption } from '@/types';
import { cn } from '@/lib/utils';

interface PickOptionButtonProps {
  option: BetOption;
  isSelected: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function PickOptionButton({
  option,
  isSelected,
  disabled,
  onClick,
}: PickOptionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'p-4 rounded-lg border-2 transition-all font-semibold text-lg',
        isSelected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500',
        disabled && 'opacity-60 cursor-not-allowed'
      )}
    >
      {option.label}
    </button>
  );
}
