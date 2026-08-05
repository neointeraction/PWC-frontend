export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  STUDENT_PORTAL: '/student-portal',
  STUDENTS: '/students',
  STUDENTS_UPLOAD: '/students/upload',
  STUDENTS_CREDENTIALS: '/students/credentials',
  SESSIONS: '/sessions',
  CAREER_LIBRARY: '/career-library',
  CAREER_PENDING: '/career-library/pending',
  PROGRESS: '/progress',
  SETTINGS: '/settings',
  COUNSELOR_PORTAL: '/counselor-portal',
  TENANT_MANAGEMENT: '/tenant-management',
  INSTITUTIONS: '/institutions',
  PROJECTS: '/projects',
  PROJECT_SESSIONS: '/projects/:projectId/sessions',
  PROJECT_STUDENTS: '/projects/:projectId/students',
  COUNSELORS: '/counselors',
  REPORTS: '/reports',
} as const;

export const PLANS = [
  { value: 'basic', label: 'Basic' },
  { value: 'standard', label: 'Standard' },
  { value: 'enterprise', label: 'Enterprise' },
] as const;

export const INSTITUTION_STATUS = [
  { value: 'active', label: 'Active' },
  { value: 'trial', label: 'Trial' },
  { value: 'pending', label: 'Pending' },
  { value: 'suspended', label: 'Suspended' },
] as const;

export const CAREER_STATUS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
] as const;

export const CAREER_CATEGORIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Engineering',
  'Arts & Design',
  'Business',
  'Science',
  'Law',
  'Social Services',
] as const;

export const PAGE_SIZES = [10, 20, 50, 100] as const;
export const DEFAULT_PAGE_SIZE = 10;
