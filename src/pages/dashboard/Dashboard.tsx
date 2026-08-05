import React from 'react';
import { useAuthStore } from '@/store';
import { SuperAdminDashboard } from './SuperAdminDashboard';
import { AdminDashboard } from './AdminDashboard';
import { CounselorDashboard } from './CounselorDashboard';

export const DashboardPage: React.FC = () => {
  const role = useAuthStore(state => state.role);

  if (role === 'super_admin') {
    return <SuperAdminDashboard />;
  }

  if (role === 'counselor') {
    return <CounselorDashboard />;
  }

  return <AdminDashboard />;
};

export { SuperAdminDashboard } from './SuperAdminDashboard';
export { AdminDashboard } from './AdminDashboard';
export { CounselorDashboard } from './CounselorDashboard';
