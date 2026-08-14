import { UserRecord, CreateUserPayload, UserFilters } from '@/types/tenant-management.types';
import { PaginatedResponse } from '@/types/api.types';
import { mockUserRecords } from '@/mocks/tenant-management.mock';

let userDb: UserRecord[] = mockUserRecords.filter(
  u => u.userCategory !== 'institution' && u.userCategory !== 'counselor'
);

const generateRandomPassword = (category: string) => {
  const prefix =
    category === 'pwc'
      ? 'kREATE'
      : category === 'view_only'
      ? 'ViewOnly'
      : category === 'counselor'
      ? 'Cnslt'
      : 'Inst';
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}@Key${num}!`;
};

export const tenantManagementService = {
  getAll: async (filters: UserFilters = {}): Promise<PaginatedResponse<UserRecord>> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    let results = [...userDb];

    if (filters.category && filters.category !== 'all') {
      results = results.filter(u => u.userCategory === filters.category);
    }

    if (filters.status && filters.status !== 'all') {
      results = results.filter(u => u.status === filters.status);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        u =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.roleLabel.toLowerCase().includes(q) ||
          (u.organizationName && u.organizationName.toLowerCase().includes(q))
      );
    }

    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;
    const total = results.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const data = results.slice(start, start + limit);

    return { data, total, page, limit, totalPages };
  },

  getById: async (id: string): Promise<UserRecord> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const user = userDb.find(u => u.id === id);
    if (!user) throw new Error('Tenant user not found');
    return { ...user };
  },

  getByEmailOrUsername: async (identifier: string): Promise<UserRecord | undefined> => {
    const q = identifier.toLowerCase().trim();
    return userDb.find(u => u.email.toLowerCase() === q || (u.username && u.username.toLowerCase() === q));
  },

  create: async (payload: CreateUserPayload): Promise<UserRecord> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    if (payload.userCategory === 'pwc') {
      const existingKreateUser = userDb.find(u => u.userCategory === 'pwc');
      if (existingKreateUser) {
        throw new Error('A kREATE User already exists. Only 1 kREATE User is allowed on the system.');
      }
    }
    const password = payload.generatedPassword || generateRandomPassword(payload.userCategory);
    const newUser: UserRecord = {
      id: `usr-${Date.now()}`,
      ...payload,
      username: payload.username || payload.email,
      generatedPassword: password,
      createdAt: new Date().toISOString().slice(0, 10),
      lastActive: 'Just now',
    };
    userDb = [newUser, ...userDb];
    return newUser;
  },

  update: async (id: string, payload: Partial<UserRecord>): Promise<UserRecord> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = userDb.findIndex(u => u.id === id);
    if (index === -1) throw new Error('Tenant user not found');

    const updated = {
      ...userDb[index],
      ...payload,
    };
    userDb[index] = updated;
    return updated;
  },

  regeneratePassword: async (id: string): Promise<UserRecord> => {
    const user = userDb.find(u => u.id === id);
    if (!user) throw new Error('Tenant user not found');

    const newPassword = generateRandomPassword(user.userCategory);
    return tenantManagementService.update(id, { generatedPassword: newPassword });
  },

  delete: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    userDb = userDb.filter(u => u.id !== id);
  },

  updateStatus: async (id: string, status: UserRecord['status']): Promise<UserRecord> => {
    return tenantManagementService.update(id, { status });
  },
};
