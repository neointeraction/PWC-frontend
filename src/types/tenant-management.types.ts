// A "Tenant" is an App Admin login (backend `User` with role ADMIN / VIEW_ONLY_ADMIN),
// managed via `/api/v1/admins`. SUPER_ADMIN is seed-only and not manageable here.
export type UserCategory = 'pwc' | 'institution' | 'counselor';
export type UserStatus = 'active' | 'inactive' | 'pending';
export type AdminRole = 'ADMIN' | 'VIEW_ONLY_ADMIN';

export interface UserRecord {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  username?: string;
  phone?: string;
  userCategory: UserCategory;
  role: AdminRole;
  roleLabel: string;
  organizationName?: string;
  status: UserStatus;
  isViewOnly?: boolean;
  createdAt: string;
  lastActive?: string;
  // One-time temp password — only present in the response right after create.
  // The backend never returns an existing admin's password (it's hashed).
  generatedPassword?: string;
}

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  isViewOnly?: boolean;
}

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  isViewOnly?: boolean;
  status?: UserStatus;
}

export interface UserFilters {
  search?: string;
  category?: UserCategory | 'all';
  status?: UserStatus | 'all';
  page?: number;
  limit?: number;
}
