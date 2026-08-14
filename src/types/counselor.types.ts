export interface Counselor {
  id: string;
  counselorId: string; // backend counsellorCode
  name: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  instituteId: string;
  instituteName: string;
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
  counselorId: string; // -> counsellorCode
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  instituteId: string;
}

export interface UpdateCounselorInput {
  firstName?: string;
  lastName?: string;
  mobile?: string;
  status?: 'active' | 'inactive';
}

export interface CounselorListResponse {
  data: Counselor[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateCounselorResult {
  counselor: Counselor;
  tempPassword: string;
}
