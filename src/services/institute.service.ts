import { apiClient } from './api';

export interface Institute {
  id: string;
  name: string;
  address: string;
  contactNumber: string;
  primaryEmail: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInstitutePayload {
  name: string;
  address: string;
  contactNumber: string;
  primaryEmail: string;
}

export interface InstituteDivision {
  id: string;
  name: string;
  classId: string;
}

export interface InstituteClass {
  id: string;
  name: string;
  instituteId: string;
  divisions: InstituteDivision[];
}

export const instituteService = {
  // GET /api/v1/institutes — no filters/pagination, returns all institutes.
  getAll: async (): Promise<Institute[]> => {
    const { data } = await apiClient.get<Institute[]>('/institutes');
    return data;
  },

  getById: async (id: string): Promise<Institute> => {
    const { data } = await apiClient.get<Institute>(`/institutes/${id}`);
    return data;
  },

  create: async (payload: CreateInstitutePayload): Promise<Institute> => {
    const { data } = await apiClient.post<Institute>('/institutes', payload);
    return data;
  },

  update: async (id: string, payload: Partial<CreateInstitutePayload>): Promise<Institute> => {
    const { data } = await apiClient.patch<Institute>(`/institutes/${id}`, payload);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/institutes/${id}`);
  },

  // Classes/Divisions — each institute's class/section structure. No dedicated
  // management screen exists yet; consumed inline wherever a division is needed
  // (e.g. student creation).
  getClasses: async (instituteId: string): Promise<InstituteClass[]> => {
    const { data } = await apiClient.get<InstituteClass[]>(`/institutes/${instituteId}/classes`);
    return data;
  },

  createClass: async (instituteId: string, name: string): Promise<InstituteClass> => {
    const { data } = await apiClient.post<InstituteClass>(`/institutes/${instituteId}/classes`, { name });
    return data;
  },

  getDivisions: async (instituteId: string, classId: string): Promise<InstituteDivision[]> => {
    const { data } = await apiClient.get<InstituteDivision[]>(
      `/institutes/${instituteId}/classes/${classId}/divisions`
    );
    return data;
  },

  createDivision: async (instituteId: string, classId: string, name: string): Promise<InstituteDivision> => {
    const { data } = await apiClient.post<InstituteDivision>(
      `/institutes/${instituteId}/classes/${classId}/divisions`,
      { name }
    );
    return data;
  },
};
