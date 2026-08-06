import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Loader } from '@/components/Loader';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/constants';

const LoginPage = lazy(() => import('@/pages/auth/Login').then(m => ({ default: m.LoginPage })));
const ResetPasswordPage = lazy(() =>
  import('@/pages/auth/ResetPassword').then(m => ({ default: m.ResetPasswordPage }))
);
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
const ProjectSessionsPage = lazy(() =>
  import('@/pages/projects/ProjectSessionsPage').then(m => ({ default: m.ProjectSessionsPage }))
);
const ProjectStudentsPage = lazy(() =>
  import('@/pages/projects/ProjectStudentsPage').then(m => ({ default: m.ProjectStudentsPage }))
);
const ReportsPage = lazy(() =>
  import('@/pages/reports').then(m => ({ default: m.ReportsPage }))
);
const CounselorsListPage = lazy(() =>
  import('@/pages/counselors').then(m => ({ default: m.CounselorsListPage }))
);
const UpcomingSessionsPage = lazy(() =>
  import('@/pages/counselor/UpcomingSessions').then(m => ({ default: m.UpcomingSessionsPage }))
);
const StudentFormChartPage = lazy(() =>
  import('@/pages/counselor/StudentFormChart').then(m => ({ default: m.StudentFormChartPage }))
);
const StudentCareerIkigaiReportPage = lazy(() =>
  import('@/pages/counselor/StudentCareerIkigaiReport').then(m => ({ default: m.StudentCareerIkigaiReportPage }))
);

function ProtectedRoute({ children, allowResetOnly }: { children: React.ReactNode; allowResetOnly?: boolean }) {
  const { isAuthenticated, mustResetPassword } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  if (mustResetPassword && !allowResetOnly) {
    return <Navigate to={ROUTES.RESET_PASSWORD} replace />;
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
  const { isAuthenticated, role, mustResetPassword } = useAuthStore();
  if (isAuthenticated) {
    if (mustResetPassword) {
      return <Navigate to={ROUTES.RESET_PASSWORD} replace />;
    }
    if (role === 'counselor') {
      return <Navigate to={ROUTES.UPCOMING_SESSIONS} replace />;
    }
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
          path={ROUTES.RESET_PASSWORD}
          element={
            <ProtectedRoute allowResetOnly>
              <ResetPasswordPage />
            </ProtectedRoute>
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
          <Route path={ROUTES.UPCOMING_SESSIONS} element={<UpcomingSessionsPage />} />
          <Route path={ROUTES.COUNSELOR_STUDENT_CHART} element={<StudentFormChartPage />} />
          <Route path={ROUTES.GENERATE_REPORT} element={<StudentCareerIkigaiReportPage />} />
          <Route path={ROUTES.PROJECTS} element={<ProjectsPage />} />
          <Route path={ROUTES.PROJECT_SESSIONS} element={<ProjectSessionsPage />} />
          <Route path={ROUTES.PROJECT_STUDENTS} element={<ProjectStudentsPage />} />
          <Route path={ROUTES.COUNSELORS} element={<CounselorsListPage />} />
          <Route
            path={ROUTES.TENANT_MANAGEMENT}
            element={
              <SuperAdminRoute>
                <TenantManagementPage />
              </SuperAdminRoute>
            }
          />
          <Route path={ROUTES.CAREER_LIBRARY} element={<CareerListPage />} />
          <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
          <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
        </Route>

        <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </Suspense>
  );
};
