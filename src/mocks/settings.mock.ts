import { InstitutionProfile, SubscriptionInfo, AdminUser, NotificationPreferences, SecuritySettings } from '@/types';

export const mockInstitutionProfile: InstitutionProfile = {
  name: 'Phoenix Water Club Career Institute',
  code: 'PWC-INS-2026',
  email: 'admin@phoenixwaterclub.edu',
  phone: '+1 (555) 234-5678',
  address: '750 Academic Parkway, Suite 400, San Francisco, CA 94107',
  website: 'https://careers.phoenixwaterclub.edu',
  logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=120&auto=format&fit=crop&q=80',
};

export const mockSubscriptionInfo: SubscriptionInfo = {
  plan: 'enterprise',
  status: 'active',
  seatsAllocated: 100,
  seatsUsed: 50,
  renewsOn: '2027-01-15',
  billingEmail: 'billing@phoenixwaterclub.edu',
};

export const mockAdminUsers: AdminUser[] = [
  { id: 'adm-01', name: 'Aarav Sharma', email: 'aarav.sharma@phoenixwaterclub.edu', role: 'super_admin', status: 'active', lastActive: 'Just now' },
  { id: 'adm-02', name: 'Sunita Sharma', email: 's.sharma@phoenixwaterclub.edu', role: 'institution_admin', status: 'active', lastActive: '2 hours ago' },
  { id: 'adm-03', name: 'Mahesh Pillai', email: 'm.pillai@phoenixwaterclub.edu', role: 'counselor', status: 'active', lastActive: 'Yesterday' },
  { id: 'adm-04', name: 'Rohan Menon', email: 'r.menon@phoenixwaterclub.edu', role: 'counselor', status: 'active', lastActive: '3 days ago' },
];

export const mockNotificationPreferences: NotificationPreferences = {
  emailAlerts: true,
  smsNotifications: false,
  weeklyDigests: true,
  pendingApprovals: true,
};

export const mockSecuritySettings: SecuritySettings = {
  enforce2FA: true,
  sessionTimeoutMinutes: 30,
  passwordExpirationDays: 90,
  ipWhitelistEnabled: false,
};
