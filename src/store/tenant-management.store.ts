import { create } from 'zustand';
import { UserCategory, UserRecord } from '@/types/tenant-management.types';

interface TenantManagementState {
  activeCategory: UserCategory | 'all';
  searchQuery: string;
  selectedUser: UserRecord | null;
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  isViewModalOpen: boolean;
  isCredentialsModalOpen: boolean;
}

interface TenantManagementActions {
  setActiveCategory: (category: UserCategory | 'all') => void;
  setSearchQuery: (query: string) => void;
  setSelectedUser: (user: UserRecord | null) => void;
  openAddModal: () => void;
  closeAddModal: () => void;
  openEditModal: (user: UserRecord) => void;
  closeEditModal: () => void;
  openViewModal: (user: UserRecord) => void;
  closeViewModal: () => void;
  openCredentialsModal: (user: UserRecord) => void;
  closeCredentialsModal: () => void;
  resetState: () => void;
}

const initialState: TenantManagementState = {
  activeCategory: 'pwc',
  searchQuery: '',
  selectedUser: null,
  isAddModalOpen: false,
  isEditModalOpen: false,
  isViewModalOpen: false,
  isCredentialsModalOpen: false,
};

export const useTenantManagementStore = create<TenantManagementState & TenantManagementActions>(set => ({
  ...initialState,

  setActiveCategory: activeCategory => set({ activeCategory }),
  setSearchQuery: searchQuery => set({ searchQuery }),
  setSelectedUser: selectedUser => set({ selectedUser }),

  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),

  openEditModal: selectedUser => set({ selectedUser, isEditModalOpen: true }),
  closeEditModal: () => set({ isEditModalOpen: false, selectedUser: null }),

  openViewModal: selectedUser => set({ selectedUser, isViewModalOpen: true }),
  closeViewModal: () => set({ isViewModalOpen: false, selectedUser: null }),

  openCredentialsModal: selectedUser => set({ selectedUser, isCredentialsModalOpen: true }),
  closeCredentialsModal: () => set({ isCredentialsModalOpen: false, selectedUser: null }),

  resetState: () => set({ ...initialState }),
}));
