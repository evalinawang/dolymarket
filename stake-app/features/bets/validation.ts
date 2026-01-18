/**
 * Bet validation utilities
 */

export function validateBetTitle(title: string): string | null {
  if (!title) return 'Bet title is required';
  if (title.length < 5) return 'Bet title must be at least 5 characters';
  if (title.length > 200) return 'Bet title must be at most 200 characters';
  return null;
}

export function validateBetDescription(description: string): string | null {
  if (description.length > 1000) {
    return 'Description must be at most 1000 characters';
  }
  return null;
}

export function validateBetOutcomes(outcomes: Array<{ label: string }>): string | null {
  if (!outcomes || outcomes.length < 2) {
    return 'Bet must have at least 2 outcomes';
  }
  if (outcomes.length > 10) {
    return 'Bet cannot have more than 10 outcomes';
  }

  // Check for empty or duplicate outcomes
  const labels = new Set<string>();
  for (const outcome of outcomes) {
    if (!outcome.label || !outcome.label.trim()) {
      return 'All outcomes must have labels';
    }
    if (labels.has(outcome.label.toLowerCase())) {
      return 'Outcomes must be unique';
    }
    labels.add(outcome.label.toLowerCase());
  }

  return null;
}

export function validateBetDeadline(deadline: string): string | null {
  if (!deadline) return 'Deadline is required';

  const deadlineDate = new Date(deadline);
  const now = new Date();

  if (isNaN(deadlineDate.getTime())) {
    return 'Invalid deadline date';
  }

  if (deadlineDate <= now) {
    return 'Deadline must be in the future';
  }

  return null;
}

export function validateStakeAmount(amount: number | undefined): string | null {
  if (amount === undefined || amount === null) return null; // Optional field

  if (typeof amount !== 'number' || amount <= 0) {
    return 'Stake amount must be greater than 0';
  }

  if (amount > 1000000) {
    return 'Stake amount cannot exceed 1,000,000';
  }

  return null;
}
