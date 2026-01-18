'use client';

import { SignupForm } from '@/components/forms/SignupForm';

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 px-4 py-8 overflow-y-auto">
      <div className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">Rumble</h1>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Create Your Account
          </p>
        </div>

        <SignupForm />
      </div>
    </div>
  );
}
