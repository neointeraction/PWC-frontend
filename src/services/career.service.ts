import {
  Career,
  CareerCluster,
  CareerIndustry,
  CareerDomain,
  PendingRatification,
  CareerFilters,
  PaginatedResponse,
  EntranceExam,
  CourseDetail,
  InstitutionDetail,
} from '@/types';
import {
  mockCareers,
  mockClusters,
  mockIndustries,
  mockDomains,
  mockPendingRatifications,
  mockEntranceExams,
  mockCourses,
  mockInstitutions,
} from '@/mocks';

let clustersDb: CareerCluster[] = [...mockClusters];
let industriesDb: CareerIndustry[] = [...mockIndustries];
let domainsDb: CareerDomain[] = [...mockDomains];
let careersDb: Career[] = [...mockCareers];
let ratificationsDb: PendingRatification[] = [...mockPendingRatifications];
let examsDb: EntranceExam[] = [...mockEntranceExams];
let coursesDb: CourseDetail[] = [...mockCourses];
let institutionsDb: InstitutionDetail[] = [...mockInstitutions];

export const careerService = {
  // Cluster APIs
  getClusters: async (search?: string): Promise<CareerCluster[]> => {
    await new Promise(resolve => setTimeout(resolve, 150));
    if (!search) return [...clustersDb];
    const q = search.toLowerCase();
    return clustersDb.filter(c => c.name.toLowerCase().includes(q) || (c.description && c.description.toLowerCase().includes(q)));
  },

  createCluster: async (payload: { name: string; description?: string }): Promise<CareerCluster> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const newCluster: CareerCluster = {
      id: `cluster-${Date.now()}`,
      name: payload.name,
      description: payload.description || '',
      industryCount: 0,
    };
    clustersDb.push(newCluster);
    return newCluster;
  },

  updateCluster: async (id: string, payload: { name: string; description?: string }): Promise<CareerCluster> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const idx = clustersDb.findIndex(c => c.id === id);
    if (idx === -1) throw new Error('Cluster not found');
    clustersDb[idx] = { ...clustersDb[idx], ...payload };
    return clustersDb[idx];
  },

  deleteCluster: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    clustersDb = clustersDb.filter(c => c.id !== id);
  },

  // Industry APIs
  getIndustries: async (clusterName?: string, search?: string): Promise<CareerIndustry[]> => {
    await new Promise(resolve => setTimeout(resolve, 150));
    let result = [...industriesDb];
    if (clusterName) {
      result = result.filter(i => i.clusterName.toLowerCase() === clusterName.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(i => i.name.toLowerCase().includes(q) || (i.description && i.description.toLowerCase().includes(q)));
    }
    return result;
  },

  createIndustry: async (payload: { clusterName: string; name: string; description?: string }): Promise<CareerIndustry> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const cluster = clustersDb.find(c => c.name === payload.clusterName);
    const newInd: CareerIndustry = {
      id: `ind-${Date.now()}`,
      clusterId: cluster?.id || 'cluster-1',
      clusterName: payload.clusterName,
      name: payload.name,
      description: payload.description || '',
      domainCount: 0,
    };
    industriesDb.push(newInd);
    return newInd;
  },

  updateIndustry: async (id: string, payload: { name: string; description?: string }): Promise<CareerIndustry> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const idx = industriesDb.findIndex(i => i.id === id);
    if (idx === -1) throw new Error('Industry not found');
    industriesDb[idx] = { ...industriesDb[idx], ...payload };
    return industriesDb[idx];
  },

  deleteIndustry: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    industriesDb = industriesDb.filter(i => i.id !== id);
  },

  // Domain APIs
  getDomains: async (industryName?: string, search?: string): Promise<CareerDomain[]> => {
    await new Promise(resolve => setTimeout(resolve, 150));
    let result = [...domainsDb];
    if (industryName) {
      result = result.filter(d => d.industryName.toLowerCase() === industryName.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(d => d.name.toLowerCase().includes(q));
    }
    return result;
  },

  createDomain: async (payload: { clusterName: string; industryName: string; name: string; description?: string }): Promise<CareerDomain> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const ind = industriesDb.find(i => i.name === payload.industryName);
    const newDom: CareerDomain = {
      id: `dom-${Date.now()}`,
      industryId: ind?.id || 'ind-1',
      industryName: payload.industryName,
      clusterName: payload.clusterName,
      name: payload.name,
      description: payload.description || '',
      roleCount: 0,
    };
    domainsDb.push(newDom);
    return newDom;
  },

  updateDomain: async (id: string, payload: { name: string; description?: string }): Promise<CareerDomain> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const idx = domainsDb.findIndex(d => d.id === id);
    if (idx === -1) throw new Error('Domain not found');
    domainsDb[idx] = { ...domainsDb[idx], ...payload };
    return domainsDb[idx];
  },

  deleteDomain: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    domainsDb = domainsDb.filter(d => d.id !== id);
  },

  // Career / Job Role APIs
  getJobRoles: async (domainName?: string, search?: string): Promise<Career[]> => {
    await new Promise(resolve => setTimeout(resolve, 150));
    let result = [...careersDb];
    if (domainName) {
      result = result.filter(c => c.domain.toLowerCase() === domainName.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        c =>
          c.jobRole.toLowerCase().includes(q) ||
          c.oneLineDescription.toLowerCase().includes(q) ||
          c.careerCluster.toLowerCase().includes(q) ||
          c.domain.toLowerCase().includes(q)
      );
    }
    return result;
  },

  toggleShortlist: async (id: string): Promise<Career> => {
    await new Promise(resolve => setTimeout(resolve, 150));
    const idx = careersDb.findIndex(c => c.id === id);
    if (idx === -1) throw new Error('Career role not found');
    careersDb[idx] = {
      ...careersDb[idx],
      isShortlisted: !careersDb[idx].isShortlisted,
    };
    return careersDb[idx];
  },

  // Entrance Exam APIs
  getEntranceExams: async (): Promise<EntranceExam[]> => {
    await new Promise(resolve => setTimeout(resolve, 150));
    return [...examsDb];
  },

  toggleExamShortlist: async (id: string): Promise<EntranceExam> => {
    await new Promise(resolve => setTimeout(resolve, 150));
    const idx = examsDb.findIndex(e => e.id === id);
    if (idx === -1) throw new Error('Exam not found');
    examsDb[idx] = {
      ...examsDb[idx],
      isShortlisted: !examsDb[idx].isShortlisted,
    };
    return examsDb[idx];
  },

  // Course APIs
  getCourses: async (): Promise<CourseDetail[]> => {
    await new Promise(resolve => setTimeout(resolve, 150));
    return [...coursesDb];
  },

  // Institution APIs
  getInstitutions: async (): Promise<InstitutionDetail[]> => {
    await new Promise(resolve => setTimeout(resolve, 150));
    return [...institutionsDb];
  },

  toggleInstitutionShortlist: async (id: string): Promise<InstitutionDetail> => {
    await new Promise(resolve => setTimeout(resolve, 150));
    const idx = institutionsDb.findIndex(i => i.id === id);
    if (idx === -1) throw new Error('Institution not found');
    institutionsDb[idx] = {
      ...institutionsDb[idx],
      isShortlisted: !institutionsDb[idx].isShortlisted,
    };
    return institutionsDb[idx];
  },

  getAll: async (filters: CareerFilters = {}): Promise<PaginatedResponse<Career>> => {
    await new Promise(resolve => setTimeout(resolve, 200));

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
    await new Promise(resolve => setTimeout(resolve, 150));
    const career = careersDb.find(c => c.id === id);
    if (!career) throw new Error('Career not found');
    return { ...career };
  },

  update: async (id: string, payload: Partial<Career>): Promise<Career> => {
    await new Promise(resolve => setTimeout(resolve, 200));
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
    await new Promise(resolve => setTimeout(resolve, 200));
    const roleName = payload.jobRole || payload.title || 'New Job Role';
    const clusterName = payload.careerCluster || payload.category || 'Arts, Design & Creative';
    const newCareer: Career = {
      id: `role-${Date.now()}`,
      jobRole: roleName,
      title: roleName,
      careerCluster: clusterName,
      category: clusterName,
      industry: payload.industry || 'Applied Arts',
      domain: payload.domain || 'Digital Arts',
      aiResilienceGrading: payload.aiResilienceGrading || 'High',
      aiResilienceComment: payload.aiResilienceComment || 'Requires strategic human creativity.',
      oneLineDescription: payload.oneLineDescription || payload.description || 'Designs user experiences.',
      description: payload.description || payload.oneLineDescription || 'Designs user experiences.',
      topCompaniesRecruiting: payload.topCompaniesRecruiting || ['Tech Firms', 'Startups'],
      approxSalaryRangeIndia: payload.approxSalaryRangeIndia || '₹4–15 LPA',
      globalSalaryRange: payload.globalSalaryRange || '$70k–$120k',
      minQual10th12thRecommendedSubjects: payload.minQual10th12thRecommendedSubjects || '12th Standard Relevant Stream',
      minQualGradRecommendedSubjects: payload.minQualGradRecommendedSubjects || 'Relevant Bachelor Degree',
      entranceExamsUG: payload.entranceExamsUG || 'NID DAT, UCEED',
      minQualPGRecommendedSubjects: payload.minQualPGRecommendedSubjects || 'Relevant Master Degree',
      entranceExamsPG: payload.entranceExamsPG || 'CEED',
      certificationsStudents: payload.certificationsStudents || 'Foundation Certifications',
      certificationsUG: payload.certificationsUG || 'Professional Domain Certifications',
      topCoursesToStudy: payload.topCoursesToStudy || 'Undergraduate & Postgraduate Degree Tracks',
      status: payload.status || 'active',
      lastUpdated: new Date().toISOString().slice(0, 10),
      sourceTenant: payload.sourceTenant || 'Super Admin',
      isShortlisted: false,
    };
    careersDb.unshift(newCareer);
    return newCareer;
  },

  deleteJobRole: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    careersDb = careersDb.filter(c => c.id !== id);
  },

  bulkCreate: async (
    items: Partial<Career>[]
  ): Promise<{ count: number; careers: Career[] }> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const created: Career[] = await Promise.all(items.map(item => careerService.create(item)));
    return { count: created.length, careers: created };
  },

  syncUpdates: async (id: string): Promise<Career> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return careerService.update(id, { lastUpdated: new Date().toISOString().slice(0, 10) });
  },

  getPendingRatifications: async (): Promise<PendingRatification[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return ratificationsDb.filter(r => r.status === 'pending');
  },

  ratify: async (id: string): Promise<PendingRatification> => {
    await new Promise(resolve => setTimeout(resolve, 200));
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
    await new Promise(resolve => setTimeout(resolve, 200));
    const idx = ratificationsDb.findIndex(r => r.id === id);
    if (idx === -1) throw new Error('Pending ratification not found');

    ratificationsDb[idx] = { ...ratificationsDb[idx], status: 'rejected' };
    return ratificationsDb[idx];
  },
};
