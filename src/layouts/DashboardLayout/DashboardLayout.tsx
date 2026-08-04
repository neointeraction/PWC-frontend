import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { ToastContainer } from '@/components/Toast';
import { Loader } from '@/components/Loader';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useSidebarStore } from '@/store';

const LayoutRoot = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const MobileOverlay = styled.div<{ $visible: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: ${({ $visible }) => ($visible ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: calc(${({ theme }) => theme.zIndex.sticky} - 1);
  }
`;

const MainArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100vh;
  overflow: hidden;
`;

const ContentArea = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const DashboardLayout: React.FC = () => {
  const { isMobileOpen, setMobileOpen } = useSidebarStore();
  const location = useLocation();

  return (
    <LayoutRoot>
      <Sidebar />
      <MobileOverlay $visible={isMobileOpen} onClick={() => setMobileOpen(false)} />
      <MainArea>
        <Header />
        <ContentArea>
          <ErrorBoundary key={location.pathname}>
            <Suspense fallback={<Loader fullPage />}>
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                <Outlet />
              </motion.div>
            </Suspense>
          </ErrorBoundary>
        </ContentArea>
      </MainArea>
      <ToastContainer />
    </LayoutRoot>
  );
};

