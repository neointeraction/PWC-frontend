import { apiClient } from './api';
import { LoginPayload, LoginResponse, User, Role } from '@/types';
import { formatFullName } from '@/utils';

interface ApiUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'STUDENT' | 'COUNSELLOR' | 'ADMIN' | 'VIEW_ONLY_ADMIN' | 'SUPER_ADMIN';
  isActive: boolean;
  mustChangePassword: boolean;
}

interface ApiAuthResponse {
  accessToken: string;
  user: ApiUser;
}

const ROLE_MAP: Record<ApiUser['role'], Role> = {
  STUDENT: 'student',
  COUNSELLOR: 'counselor',
  ADMIN: 'admin',
  VIEW_ONLY_ADMIN: 'view_only',
  SUPER_ADMIN: 'super_admin',
};

const mapUser = (u: ApiUser): User => ({
  id: u.id,
  name: formatFullName(u.firstName, u.lastName),
  email: u.email,
  role: ROLE_MAP[u.role],
  mustChangePassword: u.mustChangePassword,
  isViewOnly: u.role === 'VIEW_ONLY_ADMIN',
});

const mapAuthResponse = (data: ApiAuthResponse): LoginResponse => ({
  user: mapUser(data.user),
  token: data.accessToken,
});

export const authService = {
  // POST /api/v1/auth/login — sets the refreshToken httpOnly cookie as a side effect.
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await apiClient.post<ApiAuthResponse>('/auth/login', payload);
    return mapAuthResponse(data);
  },

  // POST /api/v1/auth/logout — reads/revokes the refreshToken cookie server-side.
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  // POST /api/v1/auth/refresh — no body, reads the refreshToken cookie; rotates it.
  refresh: async (): Promise<LoginResponse> => {
    const { data } = await apiClient.post<ApiAuthResponse>('/auth/refresh');
    return mapAuthResponse(data);
  },

  // POST /api/v1/auth/change-password — requires Bearer. Clears mustChangePassword and
  // revokes all refresh sessions server-side (204, no body).
  changePassword: async (payload: { currentPassword: string; newPassword: string }): Promise<void> => {
    await apiClient.post('/auth/change-password', payload);
  },
};
