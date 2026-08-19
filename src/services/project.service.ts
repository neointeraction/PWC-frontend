import {
  Project,
  ProjectFilterParams,
  CreateProjectPayload,
  ProjectCounselor,
  CounselorSession,
  ProjectStudentDetail,
} from '@/types/project.types';
import { PaginatedResponse } from '@/types/api.types';
import { mockProjects } from '@/mocks/projects.mock';
import { mockCounselors } from '@/mocks/counselors.mock';
import { mockProjectSessions } from '@/mocks/projectSessions.mock';
import { mockProjectStudents } from '@/mocks/projectStudents.mock';

let projectDb: Project[] = [...mockProjects];
let sessionsDb: Record<string, CounselorSession[]> = { ...mockProjectSessions };
let studentsDb: Record<string, ProjectStudentDetail[]> = { ...mockProjectStudents };

export const projectService = {
  getAll: async (filters: ProjectFilterParams = {}): Promise<PaginatedResponse<Project>> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    let results = [...projectDb];

    if (filters.status && filters.status !== 'all') {
      results = results.filter(p => p.status === filters.status);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.instituteName.toLowerCase().includes(q)
      );
    }

    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;
    const total = results.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const data = results.slice(start, start + limit);

    return { data, total, page, limit, totalPages };
  },

  getById: async (id: string): Promise<Project | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return projectDb.find(p => p.id === id) || mockProjects[0];
  },

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

  create: async (payload: CreateProjectPayload): Promise<Project> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const formatDate = (isoStr?: string) => {
      if (!isoStr) return new Date().toISOString().slice(0, 10);
      return isoStr.includes('T') ? isoStr.slice(0, 10) : isoStr;
    };

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

    projectDb = [newProject, ...projectDb];
    return newProject;
  },

  update: async (id: string, updates: Partial<Project>): Promise<Project> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    projectDb = projectDb.map(p => (p.id === id ? { ...p, ...updates } : p));
    const updated = projectDb.find(p => p.id === id);
    if (!updated) throw new Error('Project not found');
    return updated;
  },

  delete: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    projectDb = projectDb.map(p => {
      if (p.id === id) {
        return {
          ...p,
          previousStatus: p.status !== 'deleted' ? p.status : 'active',
          status: 'deleted',
        };
      }
      return p;
    });
  },

  restore: async (id: string): Promise<Project> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    projectDb = projectDb.map(p => {
      if (p.id === id) {
        return {
          ...p,
          status: p.previousStatus || 'active',
        };
      }
      return p;
    });
    const restored = projectDb.find(p => p.id === id);
    if (!restored) throw new Error('Project not found');
    return restored;
  },

  validateCounselors: async (
    counselors: Omit<ProjectCounselor, 'matchStatus'>[]
  ): Promise<ProjectCounselor[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));

    const existingEmails = new Set(
      mockCounselors.map(c => c.email.toLowerCase().trim())
    );

    return counselors.map(c => ({
      ...c,
      matchStatus: existingEmails.has(c.email.toLowerCase().trim())
        ? ('matched' as const)
        : ('new' as const),
    }));
  },
};
