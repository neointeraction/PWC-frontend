import {
  Counselor,
  CounselorFilterParams,
  CounselorListResponse,
  CreateCounselorInput,
  UpdateCounselorInput,
} from '@/types/counselor.types';
import { mockCounselors } from '@/mocks/counselors.mock';

let counselorDb: Counselor[] = [...mockCounselors];

export const counselorService = {
  async getAll(params: CounselorFilterParams = {}): Promise<CounselorListResponse> {
    await new Promise(resolve => setTimeout(resolve, 200));

    let filtered = [...counselorDb];

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
    const data = filtered.slice(start, start + limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  },

  async getById(id: string): Promise<Counselor> {
    await new Promise(resolve => setTimeout(resolve, 150));
    const item = counselorDb.find(c => c.id === id);
    if (!item) throw new Error('Counselor not found');
    return item;
  },

  async create(input: CreateCounselorInput): Promise<Counselor> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newCounselor: Counselor = {
      id: `cns-${Date.now()}`,
      counselorId: input.counselorId || `C0${counselorDb.length + 1}`,
      name: input.name,
      email: input.email,
      mobile: input.mobile,
      pwd: input.pwd || '',
      status: input.status || 'active',
      createdAt: new Date().toISOString().split('T')[0],
    };
    counselorDb.unshift(newCounselor);
    return newCounselor;
  },

  async bulkCreate(inputs: CreateCounselorInput[]): Promise<Counselor[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const createdList: Counselor[] = inputs.map((input, index) => ({
      id: `cns-${Date.now()}-${index}`,
      counselorId: input.counselorId || `C${String(counselorDb.length + index + 1).padStart(3, '0')}`,
      name: input.name,
      email: input.email,
      mobile: input.mobile,
      pwd: input.pwd || '',
      status: input.status || 'active',
      createdAt: new Date().toISOString().split('T')[0],
    }));
    counselorDb.unshift(...createdList);
    return createdList;
  },

  async update(id: string, input: UpdateCounselorInput): Promise<Counselor> {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = counselorDb.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Counselor not found');

    const updated: Counselor = {
      ...counselorDb[index],
      ...input,
    };
    counselorDb[index] = updated;
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200));
    counselorDb = counselorDb.filter(c => c.id !== id);
    return true;
  },
};
