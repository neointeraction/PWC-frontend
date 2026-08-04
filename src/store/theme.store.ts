import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { ThemeName } from '@/styles';

export interface ThemeState {
  theme: ThemeName;
}

export interface ThemeActions {
  toggleTheme: () => void;
  setTheme: (theme: ThemeName) => void;
}

export type ThemeStore = ThemeState & ThemeActions;

export const useThemeStore = create<ThemeStore>()(
  subscribeWithSelector(
    persist(
      set => ({
        theme: 'light',
        toggleTheme: () =>
          set(state => ({
            theme: state.theme === 'light' ? 'dark' : 'light',
          })),
        setTheme: (theme: ThemeName) => set({ theme }),
      }),
      {
        name: 'pwc-theme',
      }
    )
  )
);
