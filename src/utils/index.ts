/**
 * Utility functions for the kREATE Career Counselling Platform.
 * Add shared utility functions here as the project grows.
 */

/**
 * Formats a date string into a human-readable format.
 */
export const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Truncates a string to the given maximum length and appends "..." if truncated.
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
};

/**
 * Generates a random alphanumeric ID string.
 */
export const generateId = (prefix = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
};

/**
 * Converts a snake_case or camelCase string to Title Case.
 */
export const toTitleCase = (str: string): string => {
  return str
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, c => c.toUpperCase());
};

/**
 * Safely accesses a nested object property by dot-notation key.
 */
export const getNestedValue = <T>(obj: Record<string, unknown>, path: string): T | undefined => {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj) as T | undefined;
};

/**
 * Extracts a human-readable message from an API error response, per the
 * backend's `{ error: { message, details } }` contract (see
 * docs/frontend-integration-guide.md). Falls back to a generic message for
 * network errors or unexpected shapes.
 */
export const getApiErrorMessage = (error: unknown, fallback = 'Something went wrong. Please try again.'): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (error as { response?: { data?: { error?: { message?: string } } } }).response;
    const message = response?.data?.error?.message;
    if (message) return message;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
};
