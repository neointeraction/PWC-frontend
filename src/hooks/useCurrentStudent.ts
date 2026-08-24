import { useQuery } from '@tanstack/react-query';
import { studentService } from '@/services/student.service';
import { useAuthStore } from '@/store';

/**
 * Loads the logged-in student's own record (`GET /students/me`) — the shared entry point
 * for every student-facing screen. Exposes the Student `id`, `cohort` and `workflowStatus`
 * that all downstream `:studentId`-keyed routes (forms, assessment, sessions) require.
 *
 * Only runs for an authenticated `student` (staff have no Student row → the endpoint 404s).
 */
export const useCurrentStudent = () => {
  const role = useAuthStore(state => state.role);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return useQuery({
    queryKey: ['student-me'],
    queryFn: studentService.getMe,
    enabled: isAuthenticated && role === 'student',
    staleTime: 60_000,
  });
};
