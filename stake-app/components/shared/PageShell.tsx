'use client';

import { BottomNav } from './BottomNav';

interface PageShellProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  onCreateBetClick?: () => void;
}

export function PageShell({ children, header, onCreateBetClick }: PageShellProps) {
  return (
    <div className="flex flex-col h-full">
      {header && <header className="bg-white border-b border-gray-200 dark:bg-slate-950 dark:border-gray-800 flex-shrink-0">{header}</header>}
      <main className="flex-1 overflow-y-auto w-full pb-20">
        {children}
      </main>
      <BottomNav onCreateBetClick={onCreateBetClick} />
    </div>
  );
}
