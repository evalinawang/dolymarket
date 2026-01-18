/**
 * Form validation utilities
 */

interface ValidationRule {
  validate: (value: string) => boolean;
  error: string;
  minLength?: number;
  maxLength?: number;
}

export const ValidationRules: Record<string, ValidationRule> = {
  email: {
    validate: (value: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    error: 'Please enter a valid email address',
  },
  password: {
    minLength: 8,
    validate: (value: string): boolean => {
      return value.length >= 8;
    },
    error: `Password must be at least 8 characters`,
  },
  username: {
    minLength: 3,
    maxLength: 30,
    validate: (value: string): boolean => {
      if (value.length < 3) return false;
      if (value.length > 30) return false;
      // Allow alphanumeric and underscores only
      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      return usernameRegex.test(value);
    },
    error: `Username must be 3-30 characters (alphanumeric and underscores only)`,
  },
};

export function validateEmail(email: string): string | null {
  if (!email) return 'Email is required';
  if (!ValidationRules.email.validate(email)) {
    return ValidationRules.email.error;
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required';
  if (!ValidationRules.password.validate(password)) {
    return ValidationRules.password.error;
  }
  return null;
}

export function validateUsername(username: string): string | null {
  if (!username) return 'Username is required';
  if (!ValidationRules.username.validate(username)) {
    return ValidationRules.username.error;
  }
  return null;
}

export function validatePasswordMatch(
  password: string,
  confirmPassword: string
): string | null {
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return null;
}
