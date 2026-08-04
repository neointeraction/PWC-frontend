export interface InstitutionProfile {
  name: string;
  code: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  logoUrl?: string;
}

export interface SubscriptionInfo {
  plan: 'basic' | 'standard' | 'enterprise';
  status: 'active' | 'trial' | 'past_due';
  seatsAllocated: number;
  seatsUsed: number;
  renewsOn: string;
  billingEmail: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'institution_admin' | 'counselor';
  status: 'active' | 'inactive';
  lastActive: string;
}

export interface NotificationPreferences {
  emailAlerts: boolean;
  smsNotifications: boolean;
  weeklyDigests: boolean;
  pendingApprovals: boolean;
}

export interface SecuritySettings {
  enforce2FA: boolean;
  sessionTimeoutMinutes: number;
  passwordExpirationDays: number;
  ipWhitelistEnabled: boolean;
}
