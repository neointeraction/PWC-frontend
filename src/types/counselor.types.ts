export interface Counselor {
  id: string;
  counselorId: string;
  name: string;
  mobile: string;
  email: string;
  meetingLink?: string;
  pwd?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface CounselorFilterParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface CreateCounselorInput {
  counselorId: string;
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
