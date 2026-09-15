import React from 'react';
import { AppRoutes } from './routes';
import { ToastContainer } from '@/components/Toast';

export const App: React.FC = () => (
  <>
    <AppRoutes />
    <ToastContainer />
  </>
);
