import { apiClient } from './api';
import { getApiErrorMessage } from '@/utils';
import {
  Counselor,
  CounselorFilterParams,
  CounselorListResponse,
  CreateCounselorInput,
  UpdateCounselorInput,
  CreateCounselorResult,
} from '@/types/counselor.types';

interface ApiCounsellor {
  id: string;
  counsellorCode: string;
  instituteId: string;
  mobile: string;
  createdAt: string;
  user: { id: string; email: string; firstName: string; lastName: string; isActive: boolean };
  institute: { id: string; name: string };
}

const mapCounsellor = (c: ApiCounsellor): Counselor => ({
  id: c.id,
  counselorId: c.counsellorCode,
  name: `${c.user.firstName} ${c.user.lastName}`.trim(),
  firstName: c.user.firstName,
  lastName: c.user.lastName,
  mobile: c.mobile,
  email: c.user.email,
  instituteId: c.institute.id,
  instituteName: c.institute.name,
  status: c.user.isActive ? 'active' : 'inactive',
  createdAt: c.createdAt,
});

// Splits a single "full name" UI field into firstName/lastName for the API —
// everything after the first space becomes lastName ("" if there's no space).
export const splitName = (fullName: string): { firstName: string; lastName: string } => {
  const trimmed = fullName.trim();
  const spaceIdx = trimmed.indexOf(' ');
  if (spaceIdx === -1) return { firstName: trimmed, lastName: '' };
  return { firstName: trimmed.slice(0, spaceIdx), lastName: trimmed.slice(spaceIdx + 1).trim() };
};

export const counselorService = {
  // GET /api/v1/counsellors returns a flat, unpaginated array — paginate/filter
  // client-side to keep the existing table UI's pagination contract.
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

  // Returns the temp password alongside the record — shown once, per the API contract.
  async create(input: CreateCounselorInput): Promise<CreateCounselorResult> {
    const { data } = await apiClient.post<{ counsellor: ApiCounsellor; tempPassword: string }>(
      '/counsellors',
      {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        mobile: input.mobile,
        counsellorCode: input.counselorId,
        instituteId: input.instituteId,
      }
    );
    return { counselor: mapCounsellor(data.counsellor), tempPassword: data.tempPassword };
  },

  // No bulk-create endpoint exists — sequential individual creates, collecting
  // per-row failures instead of aborting the whole batch.
  async bulkCreate(
    inputs: CreateCounselorInput[]
  ): Promise<{ succeeded: CreateCounselorResult[]; failed: { input: CreateCounselorInput; message: string }[] }> {
    const succeeded: CreateCounselorResult[] = [];
    const failed: { input: CreateCounselorInput; message: string }[] = [];

    for (const input of inputs) {
      try {
        succeeded.push(await counselorService.create(input));
      } catch (err) {
        failed.push({ input, message: getApiErrorMessage(err) });
      }
    }

    return { succeeded, failed };
  },

  async update(id: string, input: UpdateCounselorInput): Promise<Counselor> {
    const { data } = await apiClient.patch<ApiCounsellor>(`/counsellors/${id}`, {
      firstName: input.firstName,
      lastName: input.lastName,
      mobile: input.mobile,
      isActive: input.status ? input.status === 'active' : undefined,
    });
    return mapCounsellor(data);
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/counsellors/${id}`);
  },
};
