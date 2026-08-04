import {
  Project,
  ProjectFilterParams,
  CreateProjectPayload,
  ProjectCounselor,
} from '@/types/project.types';
import { PaginatedResponse } from '@/types/api.types';
import { mockProjects } from '@/mocks/projects.mock';
import { mockCounselors } from '@/mocks/counselors.mock';

let projectDb: Project[] = [...mockProjects];

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

  create: async (payload: CreateProjectPayload): Promise<Project> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: `${payload.instituteDetails.name} Project`,
      instituteName: payload.instituteDetails.name,
      counselorCount: payload.counselors.length,
      studentCount: payload.students.length,
      status: 'active',
      createdAt: new Date().toISOString().slice(0, 10),
    };

    projectDb = [newProject, ...projectDb];
    return newProject;
  },

  delete: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    projectDb = projectDb.filter(p => p.id !== id);
  },

  /**
   * Validates uploaded counselors against the existing counselor database.
   * Matching is based on email address (case-insensitive).
   */
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
