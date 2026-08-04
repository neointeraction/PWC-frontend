export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}

export interface DashboardStats {
  totalTenants: number;
  activeTenants: number;
  pendingRatifications: number;
  totalCareers: number;
  tenantGrowth: number | string;
  ratificationsPending?: number;
}
