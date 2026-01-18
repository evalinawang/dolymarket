'use client';

import Link from 'next/link';
import { Circle } from '@/types';
import { Users, ArrowRight } from 'lucide-react';

interface CircleCardProps {
  circle: Circle;
}

export function CircleCard({ circle }: CircleCardProps) {
  return (
    <Link href={`/circles/${circle.id}`}>
      <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{circle.name}</h3>
            {circle.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {circle.description}
              </p>
            )}
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 ml-2 flex-shrink-0" />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Users className="w-4 h-4" />
          <span>{circle.members?.length || 0} members</span>
        </div>
      </div>
    </Link>
  );
}
