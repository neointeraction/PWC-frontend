import { create } from 'zustand';

export type InstituteMode = 'existing' | 'new';

interface NewInstituteFields {
  name: string;
  address: string;
  contactNumber: string;
  primaryEmail: string;
}

interface ProjectState {
  searchQuery: string;
  isWizardOpen: boolean;
  wizardStep: number;

  instituteMode: InstituteMode;
  selectedInstituteId: string;
  newInstitute: NewInstituteFields;
  projectName: string;
  fromDate: string;
  toDate: string;

  // Set once step 1 successfully creates the institute (if new) + project.
  createdProjectId: string | null;
  createdInstituteId: string | null;
  createdInstituteName: string | null;
}

const emptyNewInstitute: NewInstituteFields = {
  name: '',
  address: '',
  contactNumber: '',
  primaryEmail: '',
};

interface ProjectActions {
  setSearchQuery: (query: string) => void;
  openWizard: () => void;
  closeWizard: () => void;
  setWizardStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setInstituteMode: (mode: InstituteMode) => void;
  setSelectedInstituteId: (id: string) => void;
  setNewInstituteField: (fields: Partial<NewInstituteFields>) => void;
  setProjectName: (name: string) => void;
  setFromDate: (date: string) => void;
  setToDate: (date: string) => void;
  setCreated: (projectId: string, instituteId: string, instituteName: string) => void;
  resetWizard: () => void;
}

const wizardResetState: Omit<ProjectState, 'searchQuery'> = {
  isWizardOpen: false,
  wizardStep: 0,
  instituteMode: 'existing',
  selectedInstituteId: '',
  newInstitute: emptyNewInstitute,
  projectName: '',
  fromDate: '',
  toDate: '',
  createdProjectId: null,
  createdInstituteId: null,
  createdInstituteName: null,
};

export const useProjectStore = create<ProjectState & ProjectActions>(set => ({
  searchQuery: '',
  ...wizardResetState,

  setSearchQuery: searchQuery => set({ searchQuery }),

  openWizard: () => set({ isWizardOpen: true, wizardStep: 0 }),
  closeWizard: () => set({ ...wizardResetState }),

  setWizardStep: wizardStep => set({ wizardStep }),
  nextStep: () => set(state => ({ wizardStep: Math.min(state.wizardStep + 1, 1) })),
  prevStep: () => set(state => ({ wizardStep: Math.max(state.wizardStep - 1, 0) })),

  setInstituteMode: instituteMode => set({ instituteMode }),
  setSelectedInstituteId: selectedInstituteId => set({ selectedInstituteId }),
  setNewInstituteField: fields =>
    set(state => ({ newInstitute: { ...state.newInstitute, ...fields } })),
  setProjectName: projectName => set({ projectName }),
  setFromDate: fromDate => set({ fromDate }),
  setToDate: toDate => set({ toDate }),

  setCreated: (createdProjectId, createdInstituteId, createdInstituteName) =>
    set({ createdProjectId, createdInstituteId, createdInstituteName }),

  resetWizard: () => set({ ...wizardResetState }),
}));
