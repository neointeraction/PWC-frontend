import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { User } from '@/types';

export interface AuthState {
  user: User | null;
  token: string | null;
  role: User['role'] | null;
  isAuthenticated: boolean;
}

export interface AuthActions {
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
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
        login: (user, token) =>
          set({
            user,
            token,
            role: user.role,
            isAuthenticated: true,
          }),
        logout: () =>
          set({
            user: null,
            token: null,
            role: null,
            isAuthenticated: false,
          }),
        setUser: user =>
          set({
            user,
            role: user.role,
          }),
        clearSession: () =>
          set({
            user: null,
            token: null,
            role: null,
            isAuthenticated: false,
          }),
      }),
      {
        name: 'pwc-auth',
        partialize: state => ({
          user: state.user,
          token: state.token,
          role: state.role,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);
