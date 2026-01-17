'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth/useAuth';

const AUTH_ROUTES = ['/login', '/signup'];
const PROTECTED_ROUTES = ['/home', '/explore', '/circles', '/profile', '/create-bet', '/bets'];

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => {
    if (route.includes('[')) {
      // Handle dynamic routes like /circles/[circleId]
      const pattern = route.replace(/\[.*?\]/g, '(.+)');
      return new RegExp(`^${pattern}(/.*)?$`).test(pathname);
    }
    return pathname === route || pathname.startsWith(`${route}/`);
  });
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    const isAuthRoute = AUTH_ROUTES.includes(pathname);
    const isProtected = isProtectedRoute(pathname);

    if (isProtected && !isAuthenticated) {
      // Redirect to login if accessing protected route without auth
      router.replace('/login');
    } else if (isAuthRoute && isAuthenticated) {
      // Redirect to home if already authenticated and trying to access login/signup
      router.replace('/home');
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return children;
}
