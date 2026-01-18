'use client';

import { BottomNav } from './BottomNav';

interface PageShellProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  onCreateBetClick?: () => void;
}

export function PageShell({ children, header, onCreateBetClick }: PageShellProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {header && <header className="bg-white border-b border-gray-200 dark:bg-slate-950 dark:border-gray-800">{header}</header>}
      <main className="flex-1 pb-24 max-w-screen-sm mx-auto w-full">
        {children}
      </main>
      <BottomNav onCreateBetClick={onCreateBetClick} />
    </div>
  );
}
