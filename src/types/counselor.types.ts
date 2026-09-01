export type DeploymentStatus = 'deployed' | 'bench' | 'inactive';

export interface ProjectDeploymentDetail {
  schoolName: string;
  totalAllotted: number;
  session1Balance: number;
  session2Balance: number;
}

export interface Counselor {
  id: string;
  counselorId: string;
  name: string;
  mobile: string;
  email: string;
  meetingLink?: string;
  pwd?: string;
  status: 'active' | 'inactive';
  deploymentStatus?: DeploymentStatus;
  projectDeployedName?: string;
  totalAllotted?: number;
  session1Balance?: number;
  session2Balance?: number;
  projectsList?: ProjectDeploymentDetail[];
  createdAt: string;
}

export interface CounselorFilterParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface CreateCounselorInput {
  counselorId?: string;
  name: string;
  mobile: string;
  email: string;
  meetingLink?: string;
  pwd?: string;
  status?: 'active' | 'inactive';
}

export interface UpdateCounselorInput {
  counselorId?: string;
  name?: string;
  mobile?: string;
  email?: string;
  meetingLink?: string;
  pwd?: string;
  status?: 'active' | 'inactive';
}

export interface CounselorListResponse {
  data: Counselor[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
