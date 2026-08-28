import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // Absolute base so hashed asset URLs resolve from the root on deep links
  // (e.g. /reset-password) under BrowserRouter — a relative './' base would
  // resolve assets against the current path and 404.
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
}));
