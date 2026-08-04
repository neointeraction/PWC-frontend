import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Loader } from '@/components/Loader';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/constants';

const LoginPage = lazy(() => import('@/pages/auth/Login').then(m => ({ default: m.LoginPage })));
const DashboardPage = lazy(() =>
  import('@/pages/dashboard').then(m => ({ default: m.DashboardPage }))
);
const SettingsPage = lazy(() =>
  import('@/pages/settings').then(m => ({ default: m.SettingsPage }))
);
const TenantManagementPage = lazy(() =>
  import('@/pages/tenant-management').then(m => ({ default: m.TenantManagementPage }))
);
const CareerListPage = lazy(() =>
  import('@/pages/career-library').then(m => ({ default: m.CareerListPage }))
);
const ProjectsPage = lazy(() =>
  import('@/pages/projects').then(m => ({ default: m.ProjectsPage }))
);
const CounselorsListPage = lazy(() =>
  import('@/pages/counselors').then(m => ({ default: m.CounselorsListPage }))
);

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return <>{children}</>;
}

function SuperAdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, role } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  if (role !== 'super_admin') {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
  return <>{children}</>;
}

const SuspenseFallback = () => <Loader fullPage />;

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Routes>
        <Route
          path={ROUTES.LOGIN}
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.PROJECTS} element={<ProjectsPage />} />
          <Route path={ROUTES.COUNSELORS} element={<CounselorsListPage />} />
          <Route
            path={ROUTES.TENANT_MANAGEMENT}
            element={
              <SuperAdminRoute>
                <TenantManagementPage />
              </SuperAdminRoute>
            }
          />
          <Route
            path={ROUTES.CAREER_LIBRARY}
            element={
              <SuperAdminRoute>
                <CareerListPage />
              </SuperAdminRoute>
            }
          />
          <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
        </Route>

        <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </Suspense>
  );
};
