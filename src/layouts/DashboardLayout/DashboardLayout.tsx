import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Loader } from '@/components/Loader';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useSidebarStore } from '@/store';

const LayoutRoot = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};

  @media print {
    display: block;
    min-height: 0;
  }
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

  @media print {
    display: block;
    height: auto;
    overflow: visible;
  }
`;

const ContentArea = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }

  /* Printed pages (e.g. the kREATE Compass Report) build their own full pages and manage
     their own page breaks — this scroll container must not clip them to one viewport. */
  @media print {
    overflow: visible;
    height: auto;
    padding: 0;
  }
`;

// Sidebar nav and top Header are on-screen app chrome only — no printed page should include
// them (the report's own PrintReportContent supplies its own cover/header per PDF page).
const PrintHiddenChrome = styled.div`
  display: contents;

  @media print {
    display: none;
  }
`;

export const DashboardLayout: React.FC = () => {
  const { isMobileOpen, setMobileOpen } = useSidebarStore();
  const location = useLocation();

  return (
    <LayoutRoot>
      <PrintHiddenChrome>
        <Sidebar />
        <MobileOverlay $visible={isMobileOpen} onClick={() => setMobileOpen(false)} />
      </PrintHiddenChrome>
      <MainArea>
        <PrintHiddenChrome>
          <Header />
        </PrintHiddenChrome>
        <ContentArea id="dashboard-content-area">
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
    </LayoutRoot>
  );
};

