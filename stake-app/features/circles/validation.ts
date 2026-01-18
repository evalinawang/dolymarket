/**
 * Circles validation utilities
 */

export function validateCircleName(name: string): string | null {
  if (!name) return 'Circle name is required';
  if (name.length < 3) return 'Circle name must be at least 3 characters';
  if (name.length > 50) return 'Circle name must be at most 50 characters';
  return null;
}

export function validateCircleDescription(description: string): string | null {
  if (description.length > 500) {
    return 'Description must be at most 500 characters';
  }
  return null;
}
