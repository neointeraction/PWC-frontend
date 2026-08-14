import { apiClient } from './api';
import {
  Project,
  ProjectFilterParams,
  CreateProjectPayload,
  ProjectCounselor,
  CounselorSession,
  ProjectStudentDetail,
} from '@/types/project.types';
import { PaginatedResponse } from '@/types/api.types';
import { mockCounselors } from '@/mocks/counselors.mock';
import { mockProjectSessions } from '@/mocks/projectSessions.mock';
import { mockProjectStudents } from '@/mocks/projectStudents.mock';

// Sessions (counsellor slot booking) has no bound backend integration yet — these
// stay mock-backed until that module is scoped in.
let sessionsDb: Record<string, CounselorSession[]> = { ...mockProjectSessions };
let studentsDb: Record<string, ProjectStudentDetail[]> = { ...mockProjectStudents };

interface ApiProject {
  id: string;
  instituteId: string;
  name: string;
  fromDate: string;
  toDate: string;
  status: 'ACTIVE' | 'CLOSED';
  createdAt: string;
  institute: { id: string; name: string };
  _count: { students: number; counsellors: number; counsellorSlots: number };
}

const mapProject = (p: ApiProject): Project => ({
  id: p.id,
  name: p.name,
  instituteId: p.institute.id,
  instituteName: p.institute.name,
  counselorCount: p._count.counsellors,
  studentCount: p._count.students,
  status: p.status === 'ACTIVE' ? 'active' : 'closed',
  fromDate: p.fromDate,
  toDate: p.toDate,
  validFrom: p.fromDate,
  validTo: p.toDate,
  createdAt: p.createdAt,
});

export const projectService = {
  // GET /api/v1/projects — flat, unpaginated array; paginate/filter client-side.
  getAll: async (filters: ProjectFilterParams = {}): Promise<PaginatedResponse<Project>> => {
    const { data } = await apiClient.get<ApiProject[]>('/projects');
    let results = data.map(mapProject);

    if (filters.status && filters.status !== 'all') {
      results = results.filter(p => p.status === filters.status);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        p => p.name.toLowerCase().includes(q) || p.instituteName.toLowerCase().includes(q)
      );
    }

    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;
    const total = results.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const start = (page - 1) * limit;

    return { data: results.slice(start, start + limit), total, page, limit, totalPages };
  },

  getById: async (id: string): Promise<Project | undefined> => {
    const { data } = await apiClient.get<ApiProject>(`/projects/${id}`);
    return mapProject(data);
  },

  create: async (payload: CreateProjectPayload): Promise<Project> => {
    const { data } = await apiClient.post<ApiProject>('/projects', payload);
    return mapProject(data);
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/projects/${id}`);
  },

  // --- Sessions (mock-backed; not yet bound to a real endpoint) ---

  getProjectSessions: async (projectId: string): Promise<CounselorSession[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return sessionsDb[projectId] || sessionsDb['proj-001'] || [];
  },

  getProjectStudents: async (projectId: string): Promise<ProjectStudentDetail[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return studentsDb[projectId] || studentsDb['proj-001'] || [];
  },

  updateProjectStudent: async (
    projectId: string,
    student: ProjectStudentDetail
  ): Promise<ProjectStudentDetail[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const currentList = studentsDb[projectId] || studentsDb['proj-001'] || [];
    const exists = currentList.some(s => s.id === student.id);

    let updatedList: ProjectStudentDetail[];
    if (exists) {
      updatedList = currentList.map(s => (s.id === student.id ? student : s));
    } else {
      updatedList = [student, ...currentList];
    }

    studentsDb[projectId] = updatedList;
    return updatedList;
  },

  updateCounselorSession: async (
    projectId: string,
    sessionId: string,
    selectedSlotId: string,
    assignedStudents: any[]
  ): Promise<CounselorSession[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const currentList = sessionsDb[projectId] || sessionsDb['proj-001'] || [];

    const updated = currentList.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          timeSlots: s.timeSlots.map(ts => ({
            ...ts,
            isSelected: ts.id === selectedSlotId,
          })),
          assignedStudents,
        };
      }
      return s;
    });

    sessionsDb[projectId] = updated;
    return updated;
  },

  validateCounselors: async (
    counselors: Omit<ProjectCounselor, 'matchStatus'>[]
  ): Promise<ProjectCounselor[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));

    const existingEmails = new Set(mockCounselors.map(c => c.email.toLowerCase().trim()));

    return counselors.map(c => ({
      ...c,
      matchStatus: existingEmails.has(c.email.toLowerCase().trim())
        ? ('matched' as const)
        : ('new' as const),
    }));
  },
};
