import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { User } from '@/types';

export interface AuthState {
  user: User | null;
  token: string | null;
  role: User['role'] | null;
  isAuthenticated: boolean;
  mustResetPassword: boolean;
}

export interface AuthActions {
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setMustResetPassword: (mustReset: boolean) => void;
  clearSession: () => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  subscribeWithSelector(
    persist(
      set => ({
        user: null,
        token: null,
        role: null,
        isAuthenticated: false,
        mustResetPassword: false,
        login: (user, token) =>
          set({
            user,
            token,
            role: user.role,
            isAuthenticated: true,
            // App-admin roles (super admin / admin / view-only admin) are never forced
            // through the mandatory password-change flow, regardless of the backend flag.
            mustResetPassword:
              user.role === 'super_admin' || user.role === 'admin' || user.role === 'view_only'
                ? false
                : user.mustChangePassword ??
                  (user.role === 'counselor' || user.role === 'student'),
          }),
        logout: () =>
          set({
            user: null,
            token: null,
            role: null,
            isAuthenticated: false,
            mustResetPassword: false,
          }),
        setUser: user =>
          set({
            user,
            role: user.role,
          }),
        setToken: token => set({ token }),
        setMustResetPassword: mustReset =>
          set({
            mustResetPassword: mustReset,
          }),
        clearSession: () =>
          set({
            user: null,
            token: null,
            role: null,
            isAuthenticated: false,
            mustResetPassword: false,
          }),
      }),
      {
        name: 'pwc-auth',
        partialize: state => ({
          user: state.user,
          token: state.token,
          role: state.role,
          isAuthenticated: state.isAuthenticated,
          mustResetPassword: state.mustResetPassword,
        }),
      }
    )
  )
);
