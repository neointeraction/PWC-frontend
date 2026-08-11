import { apiClient } from './api';
import {
  Career,
  CareerCluster,
  CareerIndustry,
  CareerDomain,
  PendingRatification,
  EntranceExam,
  CourseDetail,
  InstitutionDetail,
} from '@/types';
import { mockPendingRatifications } from '@/mocks';

// ---- Backend response shapes (docs/api-list.md -> Career Library) ----

interface ApiCareerEntry {
  id: string;
  cluster: string;
  industry: string;
  domain: string;
  jobRole: string;
  aiResilienceGrade: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
  aiResilienceComment: string;
  oneLineDescription: string;
  topCompanies: string[];
  salaryIndiaRangeText: string;
  salaryIndiaMinLPA: number | null;
  salaryIndiaMaxLPA: number | null;
  salaryGlobalRangeText: string;
  salaryGlobalMinUSD: number | null;
  salaryGlobalMaxUSD: number | null;
  qualification10th12th: string;
  qualificationGraduation: string;
  qualificationPG: string;
  entranceExamsUGDescription: string;
  entranceExams: string[];
  entranceExamsPG: string[];
  certificationsStudent: string[];
  certificationsUG: string[];
  topCourses: string[];
  status: 'ACTIVE' | 'DRAFT';
  createdBy: string;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ApiUgInstitution {
  id: string;
  name: string;
  city?: string | null;
  state?: string | null;
  type?: string | null;
  category?: string | null;
  programmesOffered?: string | null;
  keyProgrammesOffered?: string | null;
  primaryEntranceExams?: string | null;
  nirfRanking?: string | null;
  otherRankings?: string | null;
  website?: string | null;
}

interface ApiUgCourse {
  id: string;
  courseName: string;
  fullForm?: string | null;
  level?: string | null;
  stream12thRequirements?: string | null;
  entranceExamsPrimary?: string | null;
  entranceExamsAlternate?: string | null;
  topSpecialisations?: string | null;
  topGovtColleges?: string | null;
  topPrivateColleges?: string | null;
  furtherStudyOptions?: string | null;
}

interface ApiUgEntranceExam {
  id: string;
  examName: string;
  fullForm?: string | null;
  conductingBody?: string | null;
  level?: string | null;
  applicableFor?: string | null;
  subjectRequirements12th?: string | null;
  applicationWindow?: string | null;
  examMonth?: string | null;
  examMode?: string | null;
  frequency?: string | null;
  officialWebsite?: string | null;
}

interface CareerLibraryListResponse {
  data: ApiCareerEntry[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
}

interface CareerLibraryFiltersResponse {
  clusters: string[];
  industries: string[];
  domains: string[];
  aiResilienceGrades: string[];
}

interface CareerLibraryDetailResponse extends ApiCareerEntry {
  relatedInstitutions: ApiUgInstitution[];
  relatedCourses: ApiUgCourse[];
  relatedEntranceExams: ApiUgEntranceExam[];
}

// ---- Mappers: API shape -> existing frontend shape (keeps views unchanged) ----

const AI_GRADE_MAP: Record<ApiCareerEntry['aiResilienceGrade'], Career['aiResilienceGrading']> = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  VERY_HIGH: 'Very High',
};

const mapCareerEntry = (entry: ApiCareerEntry): Career => ({
  id: entry.id,
  jobRole: entry.jobRole,
  careerCluster: entry.cluster,
  industry: entry.industry,
  domain: entry.domain,
  aiResilienceGrading: AI_GRADE_MAP[entry.aiResilienceGrade] || 'High',
  aiResilienceComment: entry.aiResilienceComment,
  oneLineDescription: entry.oneLineDescription,
  topCompaniesRecruiting: entry.topCompanies || [],
  approxSalaryRangeIndia:
    entry.salaryIndiaMinLPA != null && entry.salaryIndiaMaxLPA != null
      ? `₹${entry.salaryIndiaMinLPA}–${entry.salaryIndiaMaxLPA} LPA`
      : entry.salaryIndiaRangeText,
  globalSalaryRange:
    entry.salaryGlobalMinUSD != null && entry.salaryGlobalMaxUSD != null
      ? `$${entry.salaryGlobalMinUSD}–${entry.salaryGlobalMaxUSD}`
      : entry.salaryGlobalRangeText,
  minQual10th12thRecommendedSubjects: entry.qualification10th12th,
  minQualGradRecommendedSubjects: entry.qualificationGraduation,
  entranceExamsUG: entry.entranceExams?.join(', ') || entry.entranceExamsUGDescription,
  minQualPGRecommendedSubjects: entry.qualificationPG,
  entranceExamsPG: entry.entranceExamsPG?.join(', ') || '',
  certificationsStudents: entry.certificationsStudent?.join('; ') || '',
  certificationsUG: entry.certificationsUG?.join('; ') || '',
  topCoursesToStudy: entry.topCourses?.join(', ') || '',
  title: entry.jobRole,
  category: entry.cluster,
  description: entry.oneLineDescription,
  status: entry.status === 'ACTIVE' ? 'active' : 'pending',
  lastUpdated: (entry.updatedAt || entry.createdAt || '').slice(0, 10),
  sourceTenant: entry.createdBy,
});

const mapInstitution = (inst: ApiUgInstitution): InstitutionDetail => ({
  id: inst.id,
  badge: inst.type || inst.category || 'Institution',
  name: inst.name,
  cityState: [inst.city, inst.state].filter(Boolean).join(', ') || '—',
  entranceExam: inst.primaryEntranceExams || '—',
  programsOffered: inst.keyProgrammesOffered || inst.programmesOffered || '—',
  ranking: inst.nirfRanking || inst.otherRankings || '—',
  website: inst.website || '',
});

const mapCourse = (course: ApiUgCourse): CourseDetail => ({
  id: course.id,
  badge: course.level || 'UG',
  title: course.fullForm ? `${course.courseName} (${course.fullForm})` : course.courseName,
  streamRequirement: course.stream12thRequirements || '—',
  entranceExams: course.entranceExamsPrimary || course.entranceExamsAlternate || '—',
  programsOffered: course.topSpecialisations || '—',
  topColleges: [course.topGovtColleges, course.topPrivateColleges].filter(Boolean).join('; ') || '—',
  furtherStudyOptions: course.furtherStudyOptions || '—',
});

const mapExam = (exam: ApiUgEntranceExam): EntranceExam => ({
  id: exam.id,
  name: exam.examName,
  fullTitle: exam.fullForm || '',
  level: exam.level === 'PG' ? 'PG' : 'UG',
  conductedBy: exam.conductingBody || '—',
  mode: exam.examMode || '—',
  frequency: exam.frequency || '—',
  applicableFor: exam.applicableFor || '—',
  requirement12th: exam.subjectRequirements12th || '—',
  website: exam.officialWebsite || '',
  datesText: [exam.applicationWindow, exam.examMonth].filter(Boolean).join(' / ') || undefined,
});

// ---- Full-dataset cache: derives cluster/industry/domain browsing client-side
// (the backend only exposes a flat, filterable list — there's no cluster/industry/
// domain CRUD or hierarchy endpoint) ----

let fullListCache: Promise<Career[]> | null = null;

const fetchFullList = async (): Promise<Career[]> => {
  const pageSize = 100;
  let page = 1;
  let totalPages = 1;
  const all: ApiCareerEntry[] = [];

  do {
    const { data } = await apiClient.get<CareerLibraryListResponse>('/career-library', {
      params: { page, pageSize },
    });
    all.push(...data.data);
    totalPages = data.pagination.totalPages;
    page += 1;
  } while (page <= totalPages);

  return all.map(mapCareerEntry);
};

const getFullList = (): Promise<Career[]> => {
  if (!fullListCache) {
    fullListCache = fetchFullList().catch(err => {
      fullListCache = null;
      throw err;
    });
  }
  return fullListCache;
};

let ratificationsDb: PendingRatification[] = [...mockPendingRatifications];

export const careerService = {
  // Cluster / Industry / Domain browsing — derived client-side from the full list
  getClusters: async (search?: string): Promise<CareerCluster[]> => {
    const all = await getFullList();
    const byName = new Map<string, { industries: Set<string> }>();
    all.forEach(c => {
      if (!byName.has(c.careerCluster)) byName.set(c.careerCluster, { industries: new Set() });
      byName.get(c.careerCluster)!.industries.add(c.industry);
    });
    let clusters: CareerCluster[] = Array.from(byName.entries()).map(([name, v]) => ({
      id: name,
      name,
      industryCount: v.industries.size,
    }));
    if (search) {
      const q = search.toLowerCase();
      clusters = clusters.filter(c => c.name.toLowerCase().includes(q));
    }
    return clusters.sort((a, b) => a.name.localeCompare(b.name));
  },

  getIndustries: async (clusterName?: string, search?: string): Promise<CareerIndustry[]> => {
    const all = await getFullList();
    const filtered = clusterName ? all.filter(c => c.careerCluster === clusterName) : all;
    const byName = new Map<string, { clusterName: string; domains: Set<string> }>();
    filtered.forEach(c => {
      if (!byName.has(c.industry)) {
        byName.set(c.industry, { clusterName: c.careerCluster, domains: new Set() });
      }
      byName.get(c.industry)!.domains.add(c.domain);
    });
    let industries: CareerIndustry[] = Array.from(byName.entries()).map(([name, v]) => ({
      id: name,
      clusterId: v.clusterName,
      clusterName: v.clusterName,
      name,
      domainCount: v.domains.size,
    }));
    if (search) {
      const q = search.toLowerCase();
      industries = industries.filter(i => i.name.toLowerCase().includes(q));
    }
    return industries.sort((a, b) => a.name.localeCompare(b.name));
  },

  getDomains: async (industryName?: string, search?: string): Promise<CareerDomain[]> => {
    const all = await getFullList();
    const filtered = industryName ? all.filter(c => c.industry === industryName) : all;
    const byName = new Map<string, { clusterName: string; industryName: string; roles: Set<string> }>();
    filtered.forEach(c => {
      if (!byName.has(c.domain)) {
        byName.set(c.domain, { clusterName: c.careerCluster, industryName: c.industry, roles: new Set() });
      }
      byName.get(c.domain)!.roles.add(c.id);
    });
    let domains: CareerDomain[] = Array.from(byName.entries()).map(([name, v]) => ({
      id: name,
      industryId: v.industryName,
      industryName: v.industryName,
      clusterName: v.clusterName,
      name,
      roleCount: v.roles.size,
    }));
    if (search) {
      const q = search.toLowerCase();
      domains = domains.filter(d => d.name.toLowerCase().includes(q));
    }
    return domains.sort((a, b) => a.name.localeCompare(b.name));
  },

  getJobRoles: async (domainName?: string, search?: string): Promise<Career[]> => {
    const all = await getFullList();
    let result = domainName ? all.filter(c => c.domain === domainName) : all;
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

  // GET /api/v1/career-library/{id} — includes related institutions/courses/exams
  getById: async (
    id: string
  ): Promise<{
    career: Career;
    entranceExams: EntranceExam[];
    courses: CourseDetail[];
    institutions: InstitutionDetail[];
  }> => {
    const { data } = await apiClient.get<CareerLibraryDetailResponse>(`/career-library/${id}`);
    return {
      career: mapCareerEntry(data),
      entranceExams: (data.relatedEntranceExams || []).map(mapExam),
      courses: (data.relatedCourses || []).map(mapCourse),
      institutions: (data.relatedInstitutions || []).map(mapInstitution),
    };
  },

  // GET /api/v1/career-library/filters
  getFilters: async (): Promise<CareerLibraryFiltersResponse> => {
    const { data } = await apiClient.get<CareerLibraryFiltersResponse>('/career-library/filters');
    return data;
  },

  // Pending ratifications: no backend endpoint exists yet (career library is
  // read-only) — kept on mock data until that module is built.
  getPendingRatifications: async (): Promise<PendingRatification[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return ratificationsDb.filter(r => r.status === 'pending');
  },

  ratify: async (id: string): Promise<PendingRatification> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const idx = ratificationsDb.findIndex(r => r.id === id);
    if (idx === -1) throw new Error('Pending ratification not found');
    ratificationsDb[idx] = { ...ratificationsDb[idx], status: 'ratified' };
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
