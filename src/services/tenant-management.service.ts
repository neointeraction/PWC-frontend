import { apiClient } from './api';
import {
  UserRecord,
  CreateUserPayload,
  UpdateUserPayload,
  UserFilters,
} from '@/types/tenant-management.types';
import { PaginatedResponse } from '@/types/api.types';
import { formatFullName } from '@/utils';

// Backend App Admin shape (`/api/v1/admins`). SUPER_ADMIN may appear on reads but
// isn't creatable/updatable here.
interface ApiAdmin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'ADMIN' | 'VIEW_ONLY_ADMIN' | 'SUPER_ADMIN';
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  lastLoginAt?: string | null;
  mustChangePassword?: boolean;
}

const mapAdmin = (a: ApiAdmin, tempPassword?: string): UserRecord => {
  const isViewOnly = a.role === 'VIEW_ONLY_ADMIN';
  return {
    id: a.id,
    firstName: a.firstName,
    lastName: a.lastName,
    name: formatFullName(a.firstName, a.lastName),
    email: a.email,
    username: a.email,
    userCategory: 'pwc',
    role: isViewOnly ? 'VIEW_ONLY_ADMIN' : 'ADMIN',
    roleLabel:
      a.role === 'SUPER_ADMIN'
        ? 'Super Admin'
        : isViewOnly
        ? 'View Only Admin'
        : 'Admin',
    organizationName: 'kREATE Global Engine',
    status: a.isActive ? 'active' : 'inactive',
    isViewOnly,
    createdAt: a.createdAt ? a.createdAt.slice(0, 10) : '',
    lastActive: a.lastLoginAt ? new Date(a.lastLoginAt).toLocaleString() : undefined,
    generatedPassword: tempPassword,
  };
};

export const tenantManagementService = {
  // GET /api/v1/admins — returns all admins (newest first), no server-side
  // search/pagination, so both are applied client-side to keep the table working.
  getAll: async (filters: UserFilters = {}): Promise<PaginatedResponse<UserRecord>> => {
    const { data } = await apiClient.get<ApiAdmin[]>('/admins');
    let results = data.map(a => mapAdmin(a));

    if (filters.status && filters.status !== 'all') {
      results = results.filter(u => u.status === filters.status);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        u =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.roleLabel.toLowerCase().includes(q)
      );
    }

    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;
    const total = results.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const pageData = results.slice(start, start + limit);

    return { data: pageData, total, page, limit, totalPages };
  },

  getById: async (id: string): Promise<UserRecord> => {
    const { data } = await apiClient.get<ApiAdmin>(`/admins/${id}`);
    return mapAdmin(data);
  },

  // POST /api/v1/admins — 201 returns the admin + a one-time `tempPassword`.
  create: async (payload: CreateUserPayload): Promise<UserRecord> => {
    const { data } = await apiClient.post<ApiAdmin & { tempPassword?: string; admin?: ApiAdmin }>(
      '/admins',
      {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        role: payload.isViewOnly ? 'VIEW_ONLY_ADMIN' : 'ADMIN',
      }
    );
    // Tolerate either a flat `{ ...admin, tempPassword }` or a nested `{ admin, tempPassword }`.
    const admin = data.admin ?? data;
    const tempPassword = data.tempPassword ?? (data.admin as { tempPassword?: string } | undefined)?.tempPassword;
    return mapAdmin(admin, tempPassword);
  },

  // PATCH /api/v1/admins/{id} — firstName?, lastName?, role?, isActive?.
  update: async (id: string, payload: UpdateUserPayload): Promise<UserRecord> => {
    const body: Record<string, unknown> = {};
    if (payload.firstName !== undefined) body.firstName = payload.firstName;
    if (payload.lastName !== undefined) body.lastName = payload.lastName;
    if (payload.isViewOnly !== undefined) body.role = payload.isViewOnly ? 'VIEW_ONLY_ADMIN' : 'ADMIN';
    if (payload.status !== undefined) body.isActive = payload.status === 'active';

    const { data } = await apiClient.patch<ApiAdmin>(`/admins/${id}`, body);
    return mapAdmin(data);
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/admins/${id}`);
  },

  // POST /api/v1/admins/{id}/regenerate-password (Super Admin) — mints a fresh temp
  // password and returns it once. The mapped record carries it as `generatedPassword`.
  regeneratePassword: async (id: string): Promise<UserRecord> => {
    const { data } = await apiClient.post<{ admin: ApiAdmin; tempPassword: string }>(
      `/admins/${id}/regenerate-password`
    );
    return mapAdmin(data.admin, data.tempPassword);
  },

  // POST /api/v1/auth/forgot-password mints a single-use reset link and emails it
  // (always 202, never leaks whether the address exists).
  sendPasswordReset: async (email: string): Promise<void> => {
    await apiClient.post('/auth/forgot-password', { email });
  },
};
