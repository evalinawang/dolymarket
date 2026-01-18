'use client';

export function SkeletonBetCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 animate-pulse">
      <div className="space-y-4">
        <div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-16" />
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-16" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonCircleCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 animate-pulse">
      <div className="space-y-3">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonUserCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-gray-800 p-3 animate-pulse flex items-center gap-3">
      <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
      </div>
      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-16 flex-shrink-0" />
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-300 dark:bg-gray-700 rounded"
          style={{ width: i === lines - 1 ? '75%' : '100%' }}
        />
      ))}
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 animate-pulse space-y-2"
        >
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
        </div>
      ))}
    </div>
  );
}
