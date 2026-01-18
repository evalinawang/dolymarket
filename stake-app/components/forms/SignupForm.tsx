'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/features/auth/useAuth';
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validatePasswordMatch,
} from '@/lib/validation';
import { Mail, Lock, User, AlertCircle, Loader, Check } from 'lucide-react';

interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  submit?: string;
}

export function SignupForm() {
  const router = useRouter();
  const { signup, isLoading } = useAuth();
  const [formData, setFormData] = useState<SignupFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    if (name === 'username') {
      error = validateUsername(formData.username);
    } else if (name === 'email') {
      error = validateEmail(formData.email);
    } else if (name === 'password') {
      error = validatePassword(formData.password);
    } else if (name === 'confirmPassword') {
      error = validatePasswordMatch(formData.password, formData.confirmPassword);
    }

    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const usernameError = validateUsername(formData.username);
    if (usernameError) newErrors.username = usernameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmError = validatePasswordMatch(
      formData.password,
      formData.confirmPassword
    );
    if (confirmError) newErrors.confirmPassword = confirmError;

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
      await signup(formData.email, formData.password, formData.username);
      router.push('/home');
    } catch (err) {
      setErrors({
        submit:
          err instanceof Error
            ? err.message
            : 'Failed to sign up. Please try again.',
      });
    }
  };

  const hasUsernameError = touched.username && errors.username;
  const hasEmailError = touched.email && errors.email;
  const hasPasswordError = touched.password && errors.password;
  const hasConfirmError = touched.confirmPassword && errors.confirmPassword;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Username Field */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium mb-2">
          Username
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg bg-white dark:bg-slate-800 transition-colors focus:outline-none focus:ring-2 ${
              hasUsernameError
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
            }`}
            placeholder="john_doe"
            autoComplete="username"
          />
        </div>
        {hasUsernameError && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.username}
          </p>
        )}
        {!hasUsernameError && touched.username && formData.username && (
          <p className="mt-1 text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
            <Check className="w-4 h-4" />
            Username looks good
          </p>
        )}
      </div>

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
        {!hasEmailError && touched.email && formData.email && (
          <p className="mt-1 text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
            <Check className="w-4 h-4" />
            Email looks good
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
            autoComplete="new-password"
          />
        </div>
        {hasPasswordError && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.password}
          </p>
        )}
        {!hasPasswordError && touched.password && formData.password && (
          <p className="mt-1 text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
            <Check className="w-4 h-4" />
            Password is strong
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium mb-2"
        >
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg bg-white dark:bg-slate-800 transition-colors focus:outline-none focus:ring-2 ${
              hasConfirmError
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
            }`}
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </div>
        {hasConfirmError && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.confirmPassword}
          </p>
        )}
        {!hasConfirmError &&
          touched.confirmPassword &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword && (
            <p className="mt-1 text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
              <Check className="w-4 h-4" />
              Passwords match
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
        {isLoading ? 'Creating account...' : 'Sign Up'}
      </button>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 hover:underline font-medium">
          Login
        </Link>
      </p>
    </form>
  );
}
