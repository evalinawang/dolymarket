'use client';

import { useAuth } from '@/features/auth/useAuth';
import { PageShell } from '@/components/shared/PageShell';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageShell
      header={
        <div className="p-4">
          <h1 className="text-2xl font-bold">Home</h1>
        </div>
      }
    >
      {children}
    </PageShell>
  );
}
