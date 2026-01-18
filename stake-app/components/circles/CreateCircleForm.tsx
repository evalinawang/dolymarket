'use client';

import { useState } from 'react';
import { useCreateCircle } from '@/features/circles/useCircles';
import { validateCircleName, validateCircleDescription } from '@/features/circles/validation';
import { AlertCircle, Loader } from 'lucide-react';

interface CreateCircleFormProps {
  onSuccess?: () => void;
}

export function CreateCircleForm({ onSuccess }: CreateCircleFormProps) {
  const { mutate, isPending, error } = useCreateCircle();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    let error: string | null = null;
    if (name === 'name') {
      error = validateCircleName(formData.name);
    } else if (name === 'description') {
      error = validateCircleDescription(formData.description);
    }

    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const nameError = validateCircleName(formData.name);
    if (nameError) newErrors.name = nameError;

    const descError = validateCircleDescription(formData.description);
    if (descError) newErrors.description = descError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    mutate(formData, {
      onSuccess: () => {
        setFormData({ name: '', description: '' });
        setErrors({});
        setTouched({});
        onSuccess?.();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Circle Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Circle Name *
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2.5 border rounded-lg bg-white dark:bg-slate-800 transition-colors focus:outline-none focus:ring-2 ${
            touched.name && errors.name
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
          }`}
          placeholder="Friends Bets, Sports Club, etc."
        />
        {touched.name && errors.name && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.name}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Description (optional)
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={4}
          className={`w-full px-4 py-2.5 border rounded-lg bg-white dark:bg-slate-800 transition-colors focus:outline-none focus:ring-2 ${
            touched.description && errors.description
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
          }`}
          placeholder="What's this circle about?"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {formData.description.length}/500
        </p>
        {touched.description && errors.description && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.description}
          </p>
        )}
      </div>

      {/* Submit Error */}
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error instanceof Error ? error.message : 'Failed to create circle'}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
      >
        {isPending && <Loader className="w-4 h-4 animate-spin" />}
        {isPending ? 'Creating...' : 'Create Circle'}
      </button>
    </form>
  );
}
