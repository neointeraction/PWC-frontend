import { apiClient } from './api';

export interface Cohort {
  id: string;
  code: string;
  name: string;
  displayOrder: number;
}

export const cohortsService = {
  // GET /api/v1/cohorts — active cohorts in display order. Today there is always a
  // single system-wide active cohort (see backend students.service.ts
  // getStudentByUserId), so the first entry is the one to use for the question bank.
  list: async (): Promise<Cohort[]> => {
    const { data } = await apiClient.get<Cohort[] | { data: Cohort[] }>('/cohorts');
    return Array.isArray(data) ? data : data.data ?? [];
  },
};
