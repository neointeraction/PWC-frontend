import { useQuery } from '@tanstack/react-query';
import { counselorService } from '@/services/counselor.service';
import { useAuthStore } from '@/store';

/**
 * Loads the logged-in counsellor's own record (`GET /counsellors/me`) — the entry point
 * every counsellor-facing screen needs for its Counsellor `id` and assigned `projects`,
 * mirroring `useCurrentStudent` for the student side.
 *
 * Only runs for an authenticated `counselor` (other roles have no Counsellor row).
 */
export const useCurrentCounselor = () => {
  const role = useAuthStore(state => state.role);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return useQuery({
    queryKey: ['counselor-me'],
    queryFn: counselorService.getMe,
    enabled: isAuthenticated && role === 'counselor',
    staleTime: 60_000,
  });
};
