'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/useAuth';
import { LogOut } from 'lucide-react';

export function ProfileHeader() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        {user && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            @{user.username || 'user'}
          </p>
        )}
      </div>
      <button
        onClick={handleLogout}
        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 transition"
        title="Logout"
      >
        <LogOut className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
    </div>
  );
}
