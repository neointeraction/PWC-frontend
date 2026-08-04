import {
  InstitutionProfile,
  SubscriptionInfo,
  AdminUser,
  NotificationPreferences,
  SecuritySettings,
} from '@/types';
import {
  mockInstitutionProfile,
  mockSubscriptionInfo,
  mockAdminUsers,
  mockNotificationPreferences,
  mockSecuritySettings,
} from '@/mocks';

let institutionDb = { ...mockInstitutionProfile };
let subscriptionDb = { ...mockSubscriptionInfo };
let adminsDb = [...mockAdminUsers];
let notificationsDb = { ...mockNotificationPreferences };
let securityDb = { ...mockSecuritySettings };

export const settingsService = {
  getInstitutionProfile: async (): Promise<InstitutionProfile> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { ...institutionDb };
  },

  updateInstitutionProfile: async (payload: Partial<InstitutionProfile>): Promise<InstitutionProfile> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    institutionDb = { ...institutionDb, ...payload };
    return { ...institutionDb };
  },

  getSubscriptionInfo: async (): Promise<SubscriptionInfo> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { ...subscriptionDb };
  },

  getAdminUsers: async (): Promise<AdminUser[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [...adminsDb];
  },

  addAdminUser: async (user: Omit<AdminUser, 'id' | 'lastActive'>): Promise<AdminUser> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newUser: AdminUser = {
      id: `adm-${Date.now()}`,
      ...user,
      lastActive: 'Never',
    };
    adminsDb.unshift(newUser);
    return newUser;
  },

  getNotificationPreferences: async (): Promise<NotificationPreferences> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { ...notificationsDb };
  },

  updateNotificationPreferences: async (payload: Partial<NotificationPreferences>): Promise<NotificationPreferences> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    notificationsDb = { ...notificationsDb, ...payload };
    return { ...notificationsDb };
  },

  getSecuritySettings: async (): Promise<SecuritySettings> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { ...securityDb };
  },

  updateSecuritySettings: async (payload: Partial<SecuritySettings>): Promise<SecuritySettings> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    securityDb = { ...securityDb, ...payload };
    return { ...securityDb };
  },
};
