'use client';

import { LoginForm } from '@/components/forms/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 px-4 py-8 overflow-y-auto">
      <div className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">Rumble</h1>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Community Betting App
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
