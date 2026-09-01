import { apiClient } from './api';
import {
  Counselor,
  CounselorFilterParams,
  CounselorListResponse,
  CreateCounselorInput,
  UpdateCounselorInput,
  ProjectDeploymentDetail,
} from '@/types/counselor.types';
import { formatFullName, getApiErrorMessage, normalizePhone } from '@/utils';

// One import row that never made it in, with the reason to show the user.
export interface BulkCreateFailure {
  name: string;
  reason: string;
}

export interface BulkCreateResult {
  created: Counselor[];
  failures: BulkCreateFailure[];
}

// ---- Backend counsellor shape (GET /counsellors — user + institute + projects) ----
interface ApiCounsellor {
  id: string;
  counsellorCode: string;
  mobile: string;
  createdAt?: string;
  user: { id: string; email: string; firstName: string; lastName: string; isActive: boolean };
  institute?: { id: string; name: string };
  projects?: { projectId: string; project?: { id: string; name: string } }[];
}

const splitName = (full: string): { firstName: string; lastName: string } => {
  const parts = full.trim().split(/\s+/);
  return { firstName: parts[0] || full.trim(), lastName: parts.slice(1).join(' ') || parts[0] || '' };
};

const mapCounsellor = (c: ApiCounsellor): Counselor => {
  const projectsList: ProjectDeploymentDetail[] = (c.projects ?? []).map(p => ({
    schoolName: p.project?.name ?? '',
    totalAllotted: 0,
    session1Balance: 0,
    session2Balance: 0,
  }));
  const active = c.user.isActive;
  return {
    id: c.id,
    counselorId: c.counsellorCode,
    name: formatFullName(c.user.firstName, c.user.lastName),
    email: c.user.email,
    mobile: c.mobile,
    status: active ? 'active' : 'inactive',
    deploymentStatus: !active ? 'inactive' : projectsList.length > 0 ? 'deployed' : 'bench',
    projectDeployedName: projectsList[0]?.schoolName,
    projectsList,
    createdAt: c.createdAt ? c.createdAt.slice(0, 10) : '',
  };
};

export const counselorService = {
  // GET /api/v1/counsellors — flat array; search/status/pagination are client-side to
  // keep the existing table contract.
  async getAll(params: CounselorFilterParams = {}): Promise<CounselorListResponse> {
    const { data } = await apiClient.get<ApiCounsellor[]>('/counsellors');
    let filtered = data.map(mapCounsellor);

    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.counselorId.toLowerCase().includes(q) ||
          c.mobile.includes(q)
      );
    }
    if (params.status && params.status !== 'all') {
      filtered = filtered.filter(c => c.status === params.status);
    }

    const page = params.page || 1;
    const limit = params.limit || 10;
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const start = (page - 1) * limit;
    return { data: filtered.slice(start, start + limit), total, page, limit, totalPages };
  },

  async getById(id: string): Promise<Counselor> {
    const { data } = await apiClient.get<ApiCounsellor>(`/counsellors/${id}`);
    return mapCounsellor(data);
  },

  // POST /api/v1/counsellors. The backend also returns a one-time tempPassword; the
  // directory UI doesn't surface it, so only the mapped record is returned.
  async create(input: CreateCounselorInput): Promise<Counselor> {
    const { firstName, lastName } = splitName(input.name);
    const { data } = await apiClient.post<{ counsellor: ApiCounsellor }>('/counsellors', {
      firstName,
      lastName,
      email: input.email,
      mobile: normalizePhone(input.mobile),
      ...(input.counselorId ? { counsellorCode: input.counselorId } : {}),
      ...(input.pwd ? { password: input.pwd } : {}),
    });
    return mapCounsellor(data.counsellor);
  },

  // No bulk endpoint — sequential creates. A failing row (duplicate email/mobile, bad
  // format) is skipped rather than aborting the batch, but the reason is returned so the
  // caller can tell the user which rows never made it in.
  async bulkCreate(inputs: CreateCounselorInput[]): Promise<BulkCreateResult> {
    const created: Counselor[] = [];
    const failures: BulkCreateFailure[] = [];
    for (const input of inputs) {
      try {
        created.push(await counselorService.create(input));
      } catch (err) {
        failures.push({
          name: input.name || input.email || input.counselorId || 'Unknown',
          reason: getApiErrorMessage(err, 'Rejected by the server'),
        });
      }
    }
    return { created, failures };
  },

  async update(id: string, input: UpdateCounselorInput): Promise<Counselor> {
    const body: Record<string, unknown> = {};
    if (input.name !== undefined) {
      const { firstName, lastName } = splitName(input.name);
      body.firstName = firstName;
      body.lastName = lastName;
    }
    if (input.mobile !== undefined) body.mobile = input.mobile;
    if (input.status !== undefined) body.isActive = input.status === 'active';
    const { data } = await apiClient.patch<ApiCounsellor>(`/counsellors/${id}`, body);
    return mapCounsellor(data);
  },

  async delete(id: string): Promise<boolean> {
    await apiClient.delete(`/counsellors/${id}`);
    return true;
  },
};
