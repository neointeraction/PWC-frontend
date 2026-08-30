/**
 * Utility functions for the kREATE Career Counselling Platform.
 * Add shared utility functions here as the project grows.
 */

/**
 * Formats a date string into DD-MM-YYYY format.
 */
export const formatDateDDMMYYYY = (dateStr: string): string => {
  if (!dateStr) return '';
  const dateOnly = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
  const parts = dateOnly.split('-');
  if (parts.length === 3 && parts[0].length === 4) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return dateStr;
};

/**
 * Formats a date string into a human-readable format.
 */
export const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).replace(/\//g, '-');
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
  if (error && typeof error === 'object' && ('isAxiosError' in error || 'response' in error)) {
    const response = (error as { response?: { data?: { error?: { message?: string } } } }).response;
    const message = response?.data?.error?.message;
    if (message) return message;
    // Stop here for API failures. An axios error's own `message` is transport-level noise
    // ("Request failed with status code 401", "Network Error") and must never reach the UI,
    // so anything without a server-supplied message falls back to the caller's copy.
    return fallback;
  }
  // Errors thrown by our own code carry messages written for the user, so those still show.
  if (error instanceof Error && error.message) return error.message;
  return fallback;
};

/**
 * The backend accepts phone numbers as E.164 only — `/^\+?[1-9]\d{1,14}$/`, i.e. an
 * optional `+` then digits, with no spaces, hyphens, brackets or leading zero (see
 * `phoneSchema` in the backend's shared validators). Sheets and hand-typed input routinely
 * carry separators, so strip them before sending. A leading trunk `0` is deliberately left
 * alone: dropping it would silently rewrite the number, so let validation reject it instead.
 */
export const normalizePhone = (value?: string | null): string =>
  (value ?? '').replace(/[\s()\-.]/g, '');

/** Whether a phone number will pass the backend's E.164 check once normalized. */
export const isValidPhone = (value?: string | null): boolean =>
  /^\+?[1-9]\d{1,14}$/.test(normalizePhone(value));
