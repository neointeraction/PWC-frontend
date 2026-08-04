import React from 'react';
import { useAuthStore } from '@/store';
import { SuperAdminDashboard } from './SuperAdminDashboard';
import { AdminDashboard } from './AdminDashboard';

export const DashboardPage: React.FC = () => {
  const role = useAuthStore(state => state.role);

  if (role === 'super_admin') {
    return <SuperAdminDashboard />;
  }

  return <AdminDashboard />;
};

export { SuperAdminDashboard } from './SuperAdminDashboard';
export { AdminDashboard } from './AdminDashboard';
