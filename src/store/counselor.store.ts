import { create } from 'zustand';
import { Counselor } from '@/types/counselor.types';

export interface CounselorState {
  searchQuery: string;
  statusFilter: string;
  isAddModalOpen: boolean;
  isBulkUploadModalOpen: boolean;
  selectedCounselorForEdit: Counselor | null;
  selectedCounselorForView: Counselor | null;
}

export interface CounselorActions {
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string) => void;
  openAddModal: () => void;
  closeAddModal: () => void;
  openBulkUploadModal: () => void;
  closeBulkUploadModal: () => void;
  openEditModal: (counselor: Counselor) => void;
  closeEditModal: () => void;
  openViewModal: (counselor: Counselor) => void;
  closeViewModal: () => void;
  resetFilters: () => void;
}

export const useCounselorStore = create<CounselorState & CounselorActions>(set => ({
  searchQuery: '',
  statusFilter: 'all',
  isAddModalOpen: false,
  isBulkUploadModalOpen: false,
  selectedCounselorForEdit: null,
  selectedCounselorForView: null,

  setSearchQuery: query => set({ searchQuery: query }),
  setStatusFilter: status => set({ statusFilter: status }),
  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),
  openBulkUploadModal: () => set({ isBulkUploadModalOpen: true }),
  closeBulkUploadModal: () => set({ isBulkUploadModalOpen: false }),
  openEditModal: counselor => set({ selectedCounselorForEdit: counselor }),
  closeEditModal: () => set({ selectedCounselorForEdit: null }),
  openViewModal: counselor => set({ selectedCounselorForView: counselor }),
  closeViewModal: () => set({ selectedCounselorForView: null }),
  resetFilters: () => set({ searchQuery: '', statusFilter: 'all' }),
}));
