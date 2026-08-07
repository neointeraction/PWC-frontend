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
            mustResetPassword: user.role === 'counselor' || user.role === 'student',
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
