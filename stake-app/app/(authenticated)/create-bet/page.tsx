'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CreateBetPage() {
  const router = useRouter();

  // This page serves as a route but the actual create bet is via modal
  // Redirect to home and let the modal be triggered from bottom nav
  useEffect(() => {
    router.replace('/home');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting...</p>
    </div>
  );
}
