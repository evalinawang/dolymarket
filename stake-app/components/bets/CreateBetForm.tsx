'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCircles } from '@/features/circles/useCircles';
import { useCreateBet } from '@/features/bets/useBets';
import {
  validateBetTitle,
  validateBetDescription,
  validateBetOutcomes,
  validateBetDeadline,
} from '@/features/bets/validation';
import { OutcomeManager, Outcome } from './OutcomeManager';
import { DateTimePicker } from './DateTimePicker';
import { ProofRequirementSelector } from './ProofRequirementSelector';
import { PrivacyToggle } from './PrivacyToggle';
import { AlertCircle, Loader } from 'lucide-react';

interface CreateBetFormProps {
  onSuccess?: () => void;
}

export function CreateBetForm({ onSuccess }: CreateBetFormProps) {
  const router = useRouter();
  const { data: circles } = useCircles();
  const { mutate: createBet, isPending, error: submitError } = useCreateBet();

  const [formData, setFormData] = useState({
    circleId: '',
    title: '',
    description: '',
    outcomes: [{ label: 'Yes' }, { label: 'No' }] as Outcome[],
    deadline: '',
    proofRequirement: 'NONE' as 'NONE' | 'PHOTO' | 'VIDEO',
    privacy: 'FRIENDS_PUBLIC' as 'FRIENDS_PUBLIC' | 'CIRCLE_PRIVATE',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const canSubmit = useMemo(() => {
    return (
      formData.circleId &&
      !touched.title ||
      !touched.description ||
      !touched.outcomes ||
      !touched.deadline ||
      Object.keys(errors).length === 0
    );
  }, [formData, touched, errors]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    let error: string | null = null;
    switch (field) {
      case 'title':
        error = validateBetTitle(formData.title);
        break;
      case 'description':
        error = validateBetDescription(formData.description);
        break;
      case 'outcomes':
        error = validateBetOutcomes(formData.outcomes);
        break;
      case 'deadline':
        error = validateBetDeadline(formData.deadline);
        break;
    }

    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.circleId) newErrors.circleId = 'Circle is required';

    const titleError = validateBetTitle(formData.title);
    if (titleError) newErrors.title = titleError;

    const descError = validateBetDescription(formData.description);
    if (descError) newErrors.description = descError;

    const outcomeError = validateBetOutcomes(formData.outcomes);
    if (outcomeError) newErrors.outcomes = outcomeError;

    const deadlineError = validateBetDeadline(formData.deadline);
    if (deadlineError) newErrors.deadline = deadlineError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    createBet(
      {
        circleId: formData.circleId,
        title: formData.title,
        description: formData.description || undefined,
        options: formData.outcomes,
        deadline: formData.deadline,
        proofRequirement: formData.proofRequirement,
        privacy: formData.privacy,
      },
      {
        onSuccess: (newBet) => {
          onSuccess?.();
          // Navigate to bet detail page
          router.push(`/bets/${newBet.id}`);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Circle Select */}
      <div>
        <label htmlFor="circleId" className="block text-sm font-medium mb-2">
          Circle *
        </label>
        <select
          id="circleId"
          value={formData.circleId}
          onChange={(e) => handleChange('circleId', e.target.value)}
          className={`w-full px-4 py-2.5 border rounded-lg bg-white dark:bg-slate-800 transition-colors focus:outline-none focus:ring-2 ${
            errors.circleId
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
          }`}
        >
          <option value="">Select a circle</option>
          {circles?.map((circle) => (
            <option key={circle.id} value={circle.id}>
              {circle.name}
            </option>
          ))}
        </select>
        {errors.circleId && (
          <p className="mt-1 text-sm text-red-500">{errors.circleId}</p>
        )}
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Bet Title *
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          onBlur={() => handleBlur('title')}
          placeholder="e.g., Who will win the game?"
          className={`w-full px-4 py-2.5 border rounded-lg bg-white dark:bg-slate-800 transition-colors focus:outline-none focus:ring-2 ${
            touched.title && errors.title
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
          }`}
        />
        {touched.title && errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Description (optional)
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          onBlur={() => handleBlur('description')}
          rows={3}
          placeholder="Add more details about this bet..."
          className={`w-full px-4 py-2.5 border rounded-lg bg-white dark:bg-slate-800 transition-colors focus:outline-none focus:ring-2 ${
            touched.description && errors.description
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
          }`}
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {formData.description.length}/1000
        </p>
        {touched.description && errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      {/* Outcomes */}
      <div
        onBlur={() => handleBlur('outcomes')}
        onFocus={() => setTouched((prev) => ({ ...prev, outcomes: true }))}
      >
        <OutcomeManager
          outcomes={formData.outcomes}
          onChange={(outcomes) => handleChange('outcomes', outcomes)}
          error={touched.outcomes ? errors.outcomes : undefined}
        />
      </div>

      {/* Deadline */}
      <div onBlur={() => handleBlur('deadline')}>
        <DateTimePicker
          value={formData.deadline}
          onChange={(value) => handleChange('deadline', value)}
          error={touched.deadline ? errors.deadline : undefined}
        />
      </div>

      {/* Proof Requirement */}
      <ProofRequirementSelector
        value={formData.proofRequirement}
        onChange={(value) => handleChange('proofRequirement', value)}
      />

      {/* Privacy */}
      <PrivacyToggle
        value={formData.privacy}
        onChange={(value) => handleChange('privacy', value)}
      />

      {/* Submit Error */}
      {submitError && (
        <div className="p-3 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {submitError instanceof Error
            ? submitError.message
            : 'Failed to create bet'}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
      >
        {isPending && <Loader className="w-4 h-4 animate-spin" />}
        {isPending ? 'Creating Bet...' : 'Create Bet'}
      </button>
    </form>
  );
}
