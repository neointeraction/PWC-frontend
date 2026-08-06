import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/constants';
import { SuperAdminDashboard } from './SuperAdminDashboard';
import { AdminDashboard } from './AdminDashboard';

export const DashboardPage: React.FC = () => {
  const role = useAuthStore(state => state.role);

  if (role === 'super_admin') {
    return <SuperAdminDashboard />;
  }

  if (role === 'counselor') {
    return <Navigate to={ROUTES.UPCOMING_SESSIONS} replace />;
  }

  if (role === 'student') {
    return <Navigate to={ROUTES.STUDENT_PORTAL} replace />;
  }

  return <AdminDashboard />;
};

export { SuperAdminDashboard } from './SuperAdminDashboard';
export { AdminDashboard } from './AdminDashboard';
export { CounselorDashboard } from './CounselorDashboard';
