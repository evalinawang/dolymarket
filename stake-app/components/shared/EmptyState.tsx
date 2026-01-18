'use client';

import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
        <Icon size={40} className="text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-sm mb-4">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'Please try again later',
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-900">
      <div className="mb-4 text-4xl">⚠️</div>
      <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">{title}</h3>
      <p className="text-sm text-red-700 dark:text-red-300 text-center max-w-sm mb-4">
        {description}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
