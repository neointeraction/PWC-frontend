import {
  Career,
  PendingRatification,
  CareerFilters,
  PaginatedResponse,
} from '@/types';
import { mockCareers, mockPendingRatifications } from '@/mocks';

let careersDb: Career[] = [...mockCareers];
let ratificationsDb: PendingRatification[] = [...mockPendingRatifications];

export const careerService = {
  getAll: async (filters: CareerFilters = {}): Promise<PaginatedResponse<Career>> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    let results = [...careersDb];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        c =>
          c.jobRole.toLowerCase().includes(q) ||
          (c.title ? c.title.toLowerCase().includes(q) : false) ||
          c.careerCluster.toLowerCase().includes(q) ||
          c.domain.toLowerCase().includes(q)
      );
    }
    if (filters.status) {
      results = results.filter(c => c.status === filters.status);
    }
    if (filters.category || filters.cluster) {
      const cat = filters.category || filters.cluster;
      results = results.filter(c => c.category === cat || c.careerCluster === cat);
    }

    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;
    const total = results.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;

    return { data: results.slice(start, start + limit), total, page, limit, totalPages };
  },

  getById: async (id: string): Promise<Career> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const career = careersDb.find(c => c.id === id);
    if (!career) throw new Error('Career not found');
    return { ...career };
  },

  update: async (id: string, payload: Partial<Career>): Promise<Career> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const idx = careersDb.findIndex(c => c.id === id);
    if (idx === -1) throw new Error('Career not found');
    careersDb[idx] = {
      ...careersDb[idx],
      ...payload,
      lastUpdated: new Date().toISOString().slice(0, 10),
    };
    return careersDb[idx];
  },

  create: async (payload: Partial<Career>): Promise<Career> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const roleName = payload.jobRole || payload.title || 'New Job Role';
    const clusterName = payload.careerCluster || payload.category || 'General';
    const newCareer: Career = {
      id: `career-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      jobRole: roleName,
      title: roleName,
      careerCluster: clusterName,
      category: clusterName,
      industry: payload.industry || clusterName,
      domain: payload.domain || 'General Domain',
      aiResilienceGrading: payload.aiResilienceGrading || 'High',
      aiResilienceComment: payload.aiResilienceComment || 'Requires strategic human oversight.',
      oneLineDescription: payload.oneLineDescription || payload.description || 'Career pathway.',
      description: payload.description || payload.oneLineDescription || 'Career pathway.',
      topCompaniesRecruiting: payload.topCompaniesRecruiting || ['Top Enterprise Recruiters'],
      approxSalaryRangeIndia: payload.approxSalaryRangeIndia || '₹8,00,000 - ₹20,00,000 / year',
      globalSalaryRange: payload.globalSalaryRange || '$80,000 - $140,000 / year',
      minQual10th12thRecommendedSubjects: payload.minQual10th12thRecommendedSubjects || '12th Standard Relevant Stream',
      minQualGradRecommendedSubjects: payload.minQualGradRecommendedSubjects || 'Relevant Bachelor Degree',
      entranceExamsUG: payload.entranceExamsUG || 'Standard University Entrance Exams',
      minQualPGRecommendedSubjects: payload.minQualPGRecommendedSubjects || 'Relevant Master Degree',
      entranceExamsPG: payload.entranceExamsPG || 'GATE / GRE / CAT',
      certificationsStudents: payload.certificationsStudents || 'Foundation Certifications',
      certificationsUG: payload.certificationsUG || 'Professional Domain Certifications',
      topCoursesToStudy: payload.topCoursesToStudy || 'Undergraduate & Postgraduate Degree Tracks',
      status: payload.status || 'active',
      lastUpdated: new Date().toISOString().slice(0, 10),
      sourceTenant: payload.sourceTenant || 'Super Admin',
    };
    careersDb.unshift(newCareer);
    return newCareer;
  },

  bulkCreate: async (
    items: Partial<Career>[]
  ): Promise<{ count: number; careers: Career[] }> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const created: Career[] = await Promise.all(items.map(item => careerService.create(item)));
    return { count: created.length, careers: created };
  },

  syncUpdates: async (id: string): Promise<Career> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return careerService.update(id, { lastUpdated: new Date().toISOString().slice(0, 10) });
  },

  getPendingRatifications: async (): Promise<PendingRatification[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return ratificationsDb.filter(r => r.status === 'pending');
  },

  ratify: async (id: string): Promise<PendingRatification> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const idx = ratificationsDb.findIndex(r => r.id === id);
    if (idx === -1) throw new Error('Pending ratification not found');

    ratificationsDb[idx] = { ...ratificationsDb[idx], status: 'ratified' };

    await careerService.create({
      jobRole: ratificationsDb[idx].careerName,
      title: ratificationsDb[idx].careerName,
      careerCluster: ratificationsDb[idx].suggestedCategory,
      category: ratificationsDb[idx].suggestedCategory,
      oneLineDescription: ratificationsDb[idx].description,
      description: ratificationsDb[idx].description,
      status: 'active',
      sourceTenant: ratificationsDb[idx].sourceTenant,
    });

    return ratificationsDb[idx];
  },

  rejectRatification: async (id: string): Promise<PendingRatification> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const idx = ratificationsDb.findIndex(r => r.id === id);
    if (idx === -1) throw new Error('Pending ratification not found');

    ratificationsDb[idx] = { ...ratificationsDb[idx], status: 'rejected' };
    return ratificationsDb[idx];
  },
};
