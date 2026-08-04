import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

export interface SidebarState {
  isCollapsed: boolean;
  isMobileOpen: boolean;
}

export interface SidebarActions {
  toggleCollapse: () => void;
  setCollapsed: (collapsed: boolean) => void;
  toggleMobile: () => void;
  setMobileOpen: (open: boolean) => void;
}

export type SidebarStore = SidebarState & SidebarActions;

export const useSidebarStore = create<SidebarStore>()(
  subscribeWithSelector(
    persist(
      set => ({
        isCollapsed: false,
        isMobileOpen: false,
        toggleCollapse: () => set(state => ({ isCollapsed: !state.isCollapsed })),
        setCollapsed: (collapsed: boolean) => set({ isCollapsed: collapsed }),
        toggleMobile: () => set(state => ({ isMobileOpen: !state.isMobileOpen })),
        setMobileOpen: (open: boolean) => set({ isMobileOpen: open }),
      }),
      {
        name: 'pwc-sidebar',
        partialize: state => ({ isCollapsed: state.isCollapsed }),
      }
    )
  )
);
