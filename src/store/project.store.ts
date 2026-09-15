import { create } from 'zustand';
import { ProjectCounselor, ProjectStudent, InstituteDetails } from '@/types/project.types';

interface ProjectState {
  searchQuery: string;
  isWizardOpen: boolean;
  wizardStep: number;
  instituteDetails: InstituteDetails;
  counselors: ProjectCounselor[];
  students: ProjectStudent[];
}

interface ProjectActions {
  setSearchQuery: (query: string) => void;
  openWizard: () => void;
  closeWizard: () => void;
  setWizardStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setInstituteDetails: (details: Partial<InstituteDetails>) => void;
  setCounselors: (counselors: ProjectCounselor[]) => void;
  setStudents: (students: ProjectStudent[]) => void;
  resetWizard: () => void;
}

const emptyInstituteDetails: InstituteDetails = {
  instituteId: '',
  name: '',
  email: '',
  location: '',
  phone: '',
  validFrom: '',
  validTo: '',
};

const initialState: ProjectState = {
  searchQuery: '',
  isWizardOpen: false,
  wizardStep: 0,
  instituteDetails: emptyInstituteDetails,
  counselors: [],
  students: [],
};

export const useProjectStore = create<ProjectState & ProjectActions>(set => ({
  ...initialState,

  setSearchQuery: searchQuery => set({ searchQuery }),

  openWizard: () => set({ isWizardOpen: true, wizardStep: 0 }),
  closeWizard: () =>
    set({
      isWizardOpen: false,
      wizardStep: 0,
      instituteDetails: emptyInstituteDetails,
      counselors: [],
      students: [],
    }),

  setWizardStep: wizardStep => set({ wizardStep }),
  nextStep: () => set(state => ({ wizardStep: Math.min(state.wizardStep + 1, 2) })),
  prevStep: () => set(state => ({ wizardStep: Math.max(state.wizardStep - 1, 0) })),

  setInstituteDetails: details =>
    set(state => ({
      instituteDetails: { ...state.instituteDetails, ...details },
    })),
  setCounselors: counselors => set({ counselors }),
  setStudents: students => set({ students }),

  resetWizard: () =>
    set({
      isWizardOpen: false,
      wizardStep: 0,
      instituteDetails: emptyInstituteDetails,
      counselors: [],
      students: [],
    }),
}));
