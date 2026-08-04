import { UserRecord } from '@/types/tenant-management.types';

export const mockUserRecords: UserRecord[] = [
  {
    id: 'usr-101',
    name: 'Sarah Connor',
    email: 'sarah.connor@pwc-global.com',
    username: 'sarah.connor@pwc-global.com',
    phone: '+1 (555) 019-2834',
    userCategory: 'pwc',
    roleLabel: 'Super Admin',
    organizationName: 'kREATE Global Engine',
    status: 'active',
    createdAt: '2025-01-15',
    lastActive: 'Today, 10:42 AM',
    generatedPassword: 'kREATE@User2026!',
  },
];
