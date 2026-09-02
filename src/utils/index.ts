/**
 * Utility functions for the kREATE Career Counselling Platform.
 * Add shared utility functions here as the project grows.
 */

/**
 * Joins a first/last name pair for display. The backend requires a non-empty lastName,
 * so a single-word name is stored with lastName === firstName — collapse that back down
 * so it doesn't render twice (e.g. "Jishnu Jishnu").
 */
export const formatFullName = (firstName: string, lastName?: string): string =>
  lastName && lastName !== firstName ? `${firstName} ${lastName}`.trim() : firstName;

/**
 * Formats a date string into "10 Aug 2026" style — the app-wide display format.
 */
export const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
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
 * The HTTP status behind an API error, when there is one. Lets a caller tell an expected
 * rejection (a 409 from a one-shot endpoint) apart from a real failure, which
 * `getApiErrorMessage` alone cannot do.
 */
export const getApiErrorStatus = (error: unknown): number | undefined => {
  if (error && typeof error === 'object' && ('isAxiosError' in error || 'response' in error)) {
    return (error as { response?: { status?: number } }).response?.status;
  }
  return undefined;
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

/** Whether a value will pass the backend's @IsEmail() check. */
export const isValidEmail = (value?: string | null): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value ?? '').trim());

const MONTH_ABBR: Record<string, string> = {
  jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
  jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
};

/**
 * Converts the API's pre-formatted display date ("01 Aug 2026") to ISO "YYYY-MM-DD"
 * so it can be fed into `new Date()`/`dayjs()`/date-only parsers elsewhere in the app.
 * Falls back to slicing the first 10 chars for fields that are already ISO
 * (e.g. `createdAt`/`updatedAt`), per the backend's date-field conventions.
 */
export const parseApiDate = (value?: string | null): string => {
  if (!value) return '';
  const match = value.match(/^(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{4})$/);
  if (!match) return value.slice(0, 10);
  const [, day, monthName, year] = match;
  const month = MONTH_ABBR[monthName.slice(0, 3).toLowerCase()];
  if (!month) return value.slice(0, 10);
  return `${year}-${month}-${day.padStart(2, '0')}`;
};
