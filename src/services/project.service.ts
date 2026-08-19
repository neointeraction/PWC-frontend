import { apiClient } from './api';
import {
  Project,
  ProjectStatus,
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

// ---- Backend project shape (GET /projects — institute + _count) ----
interface ApiProject {
  id: string;
  name: string;
  instituteId: string;
  fromDate: string;
  toDate: string;
  status: 'ACTIVE' | 'CLOSED' | 'DELETED';
  institute?: { id: string; name: string };
  _count?: { students: number; counsellors: number; counsellorSlots: number };
  createdAt?: string;
}

const API_TO_STATUS: Record<string, ProjectStatus> = {
  ACTIVE: 'active',
  CLOSED: 'closed',
  DELETED: 'deleted',
};
const STATUS_TO_API: Record<string, string> = {
  active: 'ACTIVE',
  closed: 'CLOSED',
  deleted: 'DELETED',
};

const mapProject = (p: ApiProject): Project => ({
  id: p.id,
  name: p.name,
  instituteName: p.institute?.name ?? '',
  counselorCount: p._count?.counsellors ?? 0,
  studentCount: p._count?.students ?? 0,
  status: API_TO_STATUS[p.status] ?? 'active',
  validFrom: (p.fromDate ?? '').slice(0, 10),
  validTo: (p.toDate ?? '').slice(0, 10),
  createdAt: (p.createdAt ?? '').slice(0, 10),
});

// ---- Mock stores still backing the not-yet-integrated methods (Stage 2/3) ----
let sessionsDb: Record<string, CounselorSession[]> = { ...mockProjectSessions };
let studentsDb: Record<string, ProjectStudentDetail[]> = { ...mockProjectStudents };

export const projectService = {
  // GET /api/v1/projects — no server-side search/pagination, so both are client-side.
  // No `status` → active+closed (excludes soft-deleted); status=DELETED → only deleted.
  getAll: async (filters: ProjectFilterParams = {}): Promise<PaginatedResponse<Project>> => {
    const params: Record<string, string> = {};
    if (filters.status && filters.status !== 'all' && STATUS_TO_API[filters.status]) {
      params.status = STATUS_TO_API[filters.status];
    }
    const { data } = await apiClient.get<ApiProject[]>('/projects', { params });
    let results = data.map(mapProject);

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        p => p.name.toLowerCase().includes(q) || p.instituteName.toLowerCase().includes(q)
      );
    }

    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;
    const total = results.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    return { data: results.slice(start, start + limit), total, page, limit, totalPages };
  },

  getById: async (id: string): Promise<Project | undefined> => {
    const { data } = await apiClient.get<ApiProject>(`/projects/${id}`);
    return mapProject(data);
  },

  update: async (id: string, updates: Partial<Project>): Promise<Project> => {
    const body: Record<string, unknown> = {};
    if (updates.name !== undefined) body.name = updates.name;
    if (updates.validFrom !== undefined) body.fromDate = updates.validFrom;
    if (updates.validTo !== undefined) body.toDate = updates.validTo;
    if (updates.status !== undefined && STATUS_TO_API[updates.status]) {
      body.status = STATUS_TO_API[updates.status];
    }
    const { data } = await apiClient.patch<ApiProject>(`/projects/${id}`, body);
    return mapProject(data);
  },

  // DELETE is a soft-delete on the backend (status → DELETED); reversible via restore.
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/projects/${id}`);
  },

  restore: async (id: string): Promise<Project> => {
    const { data } = await apiClient.patch<ApiProject>(`/projects/${id}/restore`, {});
    return mapProject(data);
  },

  // ---- Stage 2/3 (still mock — orchestration/oversight not wired yet) ----

  // TODO(Stage 2): orchestrate POST /institutes → /projects → /students → counsellor
  // assignment + slots/import. Currently returns a mock record.
  create: async (payload: CreateProjectPayload): Promise<Project> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const formatDate = (isoStr?: string) =>
      !isoStr ? new Date().toISOString().slice(0, 10) : isoStr.slice(0, 10);
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: `${payload.instituteDetails.name} Project`,
      instituteName: payload.instituteDetails.name,
      counselorCount: payload.counselors.length,
      studentCount: payload.students.length,
      status: 'active',
      validFrom: formatDate(payload.instituteDetails.validFrom),
      validTo: formatDate(payload.instituteDetails.validTo),
      createdAt: new Date().toISOString().slice(0, 10),
    };
    return newProject;
  },

  // TODO(Stage 3): GET /sessions/slots?projectId + GET /sessions?projectId (booked only).
  getProjectSessions: async (projectId: string): Promise<CounselorSession[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return sessionsDb[projectId] || sessionsDb['proj-001'] || [];
  },

  // TODO(Stage 3): GET /students?projectId (+ their sessions).
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
    const updatedList = exists
      ? currentList.map(s => (s.id === student.id ? student : s))
      : [student, ...currentList];
    studentsDb[projectId] = updatedList;
    return updatedList;
  },

  updateCounselorSession: async (
    projectId: string,
    sessionId: string,
    selectedSlotId: string,
    assignedStudents: unknown[]
  ): Promise<CounselorSession[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const currentList = sessionsDb[projectId] || sessionsDb['proj-001'] || [];
    const updated = currentList.map(s =>
      s.id === sessionId
        ? {
            ...s,
            timeSlots: s.timeSlots.map(ts => ({ ...ts, isSelected: ts.id === selectedSlotId })),
            assignedStudents: assignedStudents as CounselorSession['assignedStudents'],
          }
        : s
    );
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
