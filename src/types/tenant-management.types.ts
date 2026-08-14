export type UserCategory = 'pwc' | 'institution' | 'counselor';
export type UserStatus = 'active' | 'inactive' | 'pending';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  username?: string;
  phone?: string;
  userCategory: UserCategory;
  roleLabel: string;
  organizationName?: string;
  status: UserStatus;
  isViewOnly?: boolean;
  createdAt: string;
  lastActive?: string;
  generatedPassword?: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  username?: string;
  phone?: string;
  userCategory: UserCategory;
  roleLabel: string;
  organizationName?: string;
  status: UserStatus;
  isViewOnly?: boolean;
  generatedPassword?: string;
}

export interface UserFilters {
  search?: string;
  category?: UserCategory | 'all';
  status?: UserStatus | 'all';
  page?: number;
  limit?: number;
}
