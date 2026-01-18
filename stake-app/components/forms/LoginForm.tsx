'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/features/auth/useAuth';
import { validateEmail, validatePassword } from '@/lib/validation';
import { Mail, Lock, AlertCircle, Loader } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  submit?: string;
}

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate on blur
    let error: string | null = null;
    if (name === 'email') {
      error = validateEmail(formData.email);
    } else if (name === 'password') {
      error = validatePassword(formData.password);
    }

    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    try {
      await login(formData.email, formData.password);
      router.push('/home');
    } catch (err) {
      setErrors({
        submit:
          err instanceof Error
            ? err.message
            : 'Failed to login. Please try again.',
      });
    }
  };

  const hasEmailError = touched.email && errors.email;
  const hasPasswordError = touched.password && errors.password;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg bg-white dark:bg-slate-800 transition-colors focus:outline-none focus:ring-2 ${
              hasEmailError
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
            }`}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>
        {hasEmailError && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg bg-white dark:bg-slate-800 transition-colors focus:outline-none focus:ring-2 ${
              hasPasswordError
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
            }`}
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </div>
        {hasPasswordError && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.password}
          </p>
        )}
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="p-3 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {errors.submit}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
      >
        {isLoading && <Loader className="w-4 h-4 animate-spin" />}
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?{' '}
        <Link href="/signup" className="text-blue-600 hover:underline font-medium">
          Sign up
        </Link>
      </p>
    </form>
  );
}
