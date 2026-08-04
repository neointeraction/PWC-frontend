import React from 'react';
import { useAuthStore } from '@/store';
import { SuperAdminSettings } from './SuperAdminSettings';
import { AdminSettings } from './AdminSettings';

export const SettingsPage: React.FC = () => {
  const role = useAuthStore(state => state.role);

  if (role === 'super_admin') {
    return <SuperAdminSettings />;
  }

  return <AdminSettings />;
};

export { SuperAdminSettings } from './SuperAdminSettings';
export { AdminSettings } from './AdminSettings';
