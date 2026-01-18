'use client';

import { LoginForm } from '@/components/forms/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-xl p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">Stake</h1>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Community Betting App
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
