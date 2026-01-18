'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Compass, Plus, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const TABS = [
  { label: 'Home', href: '/home', icon: Home },
  { label: 'Explore', href: '/explore', icon: Compass },
  { label: 'Add Bet', href: '#', icon: Plus, special: true, isModal: true },
  { label: 'Circles', href: '/circles', icon: Users },
  { label: 'Profile', href: '/profile', icon: User },
];

interface BottomNavProps {
  onCreateBetClick?: () => void;
}

export function BottomNav({ onCreateBetClick }: BottomNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string): boolean => {
    if (href === '/circles') {
      return pathname === '/circles' || pathname.startsWith('/circles/');
    }
    return pathname === href;
  };

  const handleTabClick = (tab: typeof TABS[0]) => {
    if (tab.isModal) {
      onCreateBetClick?.();
    } else {
      router.push(tab.href);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[393px] mx-auto bg-white border-t border-gray-200 dark:bg-slate-950 dark:border-gray-800">
      <div className="flex items-center justify-around h-20 px-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = !tab.isModal && isActive(tab.href);

          return (
            <button
              key={tab.href}
              onClick={() => handleTabClick(tab)}
              className={cn(
                'flex flex-col items-center justify-center w-full h-20 transition-colors flex-1',
                active
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              )}
            >
              <Icon
                size={24}
                className={cn(
                  'mb-1',
                  tab.special && 'w-12 h-12 bg-blue-600 text-white rounded-full p-3'
                )}
              />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
