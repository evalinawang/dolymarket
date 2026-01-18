'use client';

import { Lock, Users } from 'lucide-react';

interface PrivacyToggleProps {
  value: 'FRIENDS_PUBLIC' | 'CIRCLE_PRIVATE';
  onChange: (value: 'FRIENDS_PUBLIC' | 'CIRCLE_PRIVATE') => void;
}

export function PrivacyToggle({ value, onChange }: PrivacyToggleProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-3">Privacy</label>

      <div className="grid grid-cols-2 gap-3">
        {/* Friends Public */}
        <button
          type="button"
          onClick={() => onChange('FRIENDS_PUBLIC')}
          className={`p-3 rounded-lg border-2 transition ${
            value === 'FRIENDS_PUBLIC'
              ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/30'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4" />
            <span className="font-medium text-sm">Friends Public</span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Visible to friends
          </p>
        </button>

        {/* Circle Private */}
        <button
          type="button"
          onClick={() => onChange('CIRCLE_PRIVATE')}
          className={`p-3 rounded-lg border-2 transition ${
            value === 'CIRCLE_PRIVATE'
              ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/30'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4" />
            <span className="font-medium text-sm">Circle Only</span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Visible to circle members
          </p>
        </button>
      </div>
    </div>
  );
}
