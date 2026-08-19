import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/constants';
import { SuperAdminDashboard } from './SuperAdminDashboard';

export const DashboardPage: React.FC = () => {
  const role = useAuthStore(state => state.role);

  if (role === 'super_admin') {
    return <SuperAdminDashboard />;
  }

  if (role === 'admin') {
    return <Navigate to={ROUTES.PROJECTS} replace />;
  }

  if (role === 'counselor') {
    return <Navigate to={ROUTES.UPCOMING_SESSIONS} replace />;
  }

  if (role === 'student') {
    return <Navigate to={ROUTES.STUDENT_PORTAL} replace />;
  }

  return <Navigate to={ROUTES.PROJECTS} replace />;
};

export { SuperAdminDashboard } from './SuperAdminDashboard';

