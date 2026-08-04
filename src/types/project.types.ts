export type ProjectStatus = 'active' | 'draft' | 'completed';

export interface Project {
  id: string;
  name: string;
  instituteName: string;
  counselorCount: number;
  studentCount: number;
  status: ProjectStatus;
  createdAt: string;
}

export interface ProjectFilterParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface ProjectCounselor {
  name: string;
  email: string;
  mobile: string;
  matchStatus: 'matched' | 'new';
}

export interface ProjectStudent {
  name: string;
  email: string;
  mobile: string;
  grade: string;
}

export interface InstituteDetails {
  name: string;
  email: string;
  phone: string;
  validFrom: string;
  validTo: string;
}

export interface CreateProjectPayload {
  instituteDetails: InstituteDetails;
  counselors: ProjectCounselor[];
  students: ProjectStudent[];
}
