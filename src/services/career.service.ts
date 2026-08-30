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

// Classification is normalized on the backend: each entry points at its leaf domain,
// and cluster/industry are derived by walking up the relations. The list/detail
// endpoints flatten that chain onto `domain` as nested {id,name} objects.
interface ApiTaxonomyNode {
  id: string;
  name: string;
}

interface ApiCareerDomainChain extends ApiTaxonomyNode {
  industry: ApiTaxonomyNode & { cluster: ApiTaxonomyNode };
}

interface ApiCareerEntry {
  id: string;
  domain: ApiCareerDomainChain;
  jobRole: string;
  aiResilienceGrade: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
  aiResilienceComment: string;
  oneLineDescription: string;
  roleOverview: string | null;
  keySkills: string[];
  topCompanies: string[];
  salaryIndiaRangeText: string;
  salaryIndiaMinLPA: number | null;
  salaryIndiaMaxLPA: number | null;
  salaryGlobalRangeText: string;
  salaryGlobalMinUSD: number | null;
  salaryGlobalMaxUSD: number | null;
  qualification10th12th: string;
  qualification10th12thExplanation: string | null;
  qualificationGraduation: string;
  qualificationGraduationDefined: string | null;
  qualificationPG: string;
  qualificationPGDefined: string | null;
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

// The curated links + typeahead lookups come from the NORMALIZED lookup tables
// (`EntranceExam` / `Course` / `Institution`), whose short-name column is `name` — not
// the legacy `UgEntranceExam.examName` / `UgCourse.courseName` used by the related* views.
interface ApiNormalizedExam {
  id: string;
  name: string;
  level?: 'UG' | 'PG' | string | null;
  fullForm?: string | null;
}
interface ApiNormalizedCourse {
  id: string;
  name: string;
  level?: string | null;
  fullForm?: string | null;
}
interface ApiNormalizedInstitution {
  id: string;
  name: string;
  city?: string | null;
  state?: string | null;
}

interface CareerLibraryDetailResponse extends ApiCareerEntry {
  relatedInstitutions: ApiUgInstitution[];
  relatedCourses: ApiUgCourse[];
  relatedEntranceExams: ApiUgEntranceExam[];
  // Curated many-to-many links actually attached to this entry (with ids) — the source
  // for pre-ticking the linked-reference lists when editing a job role.
  linkedEntranceExams?: ApiNormalizedExam[];
  linkedCourses?: ApiNormalizedCourse[];
  linkedInstitutions?: ApiNormalizedInstitution[];
}

// Typeahead endpoints ("dropdown" reads) may return a bare array or a `{ data }` wrapper.
const unwrapList = <T>(payload: T[] | { data: T[] } | null | undefined): T[] =>
  Array.isArray(payload) ? payload : payload?.data ?? [];

const examOptionLabel = (e: ApiNormalizedExam): string =>
  e.fullForm ? `${e.name} (${e.fullForm})` : e.name;
const courseOptionLabel = (c: ApiNormalizedCourse): string =>
  c.fullForm ? `${c.name} (${c.fullForm})` : c.name;
const institutionOptionLabel = (i: ApiNormalizedInstitution): string =>
  [i.name, i.city].filter(Boolean).join(', ');

// ---- Write payloads (create/update a job-role entry) ----

// Each link item either references an existing canonical row by `id` or adds a new one by
// name (find-or-create). A by-name item carries the full canonical field set; on a name
// that already exists the backend fills only still-blank columns, so an inline add never
// overwrites reference data another job role shares. Unrecognised keys are silently
// stripped server-side, so these names must match the API exactly.
export interface CareerEntryLinkRef {
  id: string;
}

// `name` is the abbreviation ("NID DAT") and `fullForm` the expansion — the pair is what
// `@@unique([name, level])` matches on, so sending the long title as `name` would create a
// duplicate row instead of finding the seeded one.
export interface CareerEntryExamInput {
  name: string;
  level: 'UG' | 'PG';
  fullForm?: string;
  conductingBody?: string;
  officialWebsite?: string;
  examMode?: string;
  frequency?: string;
  applicableFor?: string;
  subjectRequirements12th?: string;
  applicationWindow?: string;
}

// Same abbreviation-as-`name` convention as exams ("B.Des" + "Bachelor of Design").
export interface CareerEntryCourseInput {
  name: string;
  level?: 'UG' | 'PG';
  fullForm?: string;
  durationYears?: string;
  stream12thRequirements?: string;
  relevantEntranceExams?: string;
  programmesOffered?: string;
  topColleges?: string;
  furtherStudyOptions?: string;
}

// Inverted from exams/courses: `name` is the full institution name (it is unique on its
// own) and the abbreviation goes in `shortName`.
export interface CareerEntryInstitutionInput {
  name: string;
  shortName?: string;
  city?: string;
  state?: string;
  type?: string;
  website?: string;
  entranceExamsRequired?: string;
  programmesOffered?: string;
  ranking?: string;
}

export type CareerEntryExamItem = CareerEntryLinkRef | CareerEntryExamInput;
export type CareerEntryCourseItem = CareerEntryLinkRef | CareerEntryCourseInput;
export type CareerEntryInstitutionItem = CareerEntryLinkRef | CareerEntryInstitutionInput;

// Normalized option for the add/edit job-role linked-reference pickers (typeahead
// results and an entry's currently-linked records). `id` identifies an existing
// canonical row; `label` is what the tick-list shows.
export interface CareerLinkOption {
  id: string;
  label: string;
  level?: 'UG' | 'PG';
}

export interface CareerEntryPayload {
  domainId: string;
  jobRole: string;
  aiResilienceGrade: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
  aiResilienceComment: string;
  oneLineDescription: string;
  roleOverview?: string | null;
  keySkills?: string[];
  topCompanies?: string[];
  salaryIndiaRangeText?: string | null;
  // Nullable: the entry mapper prefers these imported numeric columns over the text
  // range, so an edit that only changes the text has to clear them explicitly.
  salaryIndiaMinLPA?: number | null;
  salaryIndiaMaxLPA?: number | null;
  salaryGlobalRangeText?: string | null;
  salaryGlobalMinUSD?: number | null;
  salaryGlobalMaxUSD?: number | null;
  qualification10th12th: string;
  qualification10th12thExplanation?: string | null;
  qualificationGraduation?: string | null;
  qualificationGraduationDefined?: string | null;
  qualificationPG?: string | null;
  qualificationPGDefined?: string | null;
  entranceExamsUGDescription?: string | null;
  certificationsStudent?: string[];
  certificationsUG?: string[];
  entranceExams?: CareerEntryExamItem[];
  courses?: CareerEntryCourseItem[];
  institutions?: CareerEntryInstitutionItem[];
  status?: 'DRAFT' | 'ACTIVE';
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
  careerCluster: entry.domain.industry.cluster.name,
  industry: entry.domain.industry.name,
  domain: entry.domain.name,
  aiResilienceGrading: AI_GRADE_MAP[entry.aiResilienceGrade] || 'High',
  aiResilienceComment: entry.aiResilienceComment,
  oneLineDescription: entry.oneLineDescription,
  roleOverview: entry.roleOverview || undefined,
  keySkills: entry.keySkills || [],
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
  qualification10th12thExplanation: entry.qualification10th12thExplanation || undefined,
  minQualGradRecommendedSubjects: entry.qualificationGraduation,
  qualificationGraduationDefined: entry.qualificationGraduationDefined || undefined,
  entranceExamsUG: entry.entranceExams?.join(', ') || entry.entranceExamsUGDescription,
  minQualPGRecommendedSubjects: entry.qualificationPG,
  qualificationPGDefined: entry.qualificationPGDefined || undefined,
  entranceExamsPG: entry.entranceExamsPG?.join(', ') || '',
  certificationsStudents: entry.certificationsStudent?.join('; ') || '',
  certificationsUG: entry.certificationsUG?.join('; ') || '',
  topCoursesToStudy: entry.topCourses?.join(', ') || '',
  title: entry.jobRole,
  category: entry.domain.industry.cluster.name,
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

// Live taxonomy tree (clusters → industries → domains) — the authoritative source for
// browsing/CRUD: real ids, parent links, and empty nodes (a freshly-created cluster with
// no job roles yet still appears). Counts come from children length; role counts are
// matched against the full entry list.
interface ApiTreeDomain {
  id: string;
  name: string;
}
interface ApiTreeIndustry {
  id: string;
  name: string;
  domains: ApiTreeDomain[];
}
interface ApiTreeCluster {
  id: string;
  name: string;
  industries: ApiTreeIndustry[];
}

export type TaxonomyTree = ApiTreeCluster[];

let treeCache: Promise<ApiTreeCluster[]> | null = null;

const getTree = (): Promise<ApiTreeCluster[]> => {
  if (!treeCache) {
    treeCache = apiClient
      .get<ApiTreeCluster[]>('/career-taxonomy/tree')
      .then(res => res.data)
      .catch(err => {
        treeCache = null;
        throw err;
      });
  }
  return treeCache;
};

// Any write to the taxonomy or an entry invalidates both derived caches so the next
// read reflects the change (react-query re-invokes the service on invalidation).
const invalidateCareerCaches = () => {
  fullListCache = null;
  treeCache = null;
};

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

// Entries for a single industry — used to compute per-domain role counts on the domains
// view without downloading the whole library (an industry is almost always one page).
const fetchEntriesByIndustry = async (industryId: string): Promise<Career[]> => {
  const pageSize = 100;
  let page = 1;
  let totalPages = 1;
  const all: ApiCareerEntry[] = [];
  do {
    const { data } = await apiClient.get<CareerLibraryListResponse>('/career-library', {
      params: { industryId, page, pageSize },
    });
    all.push(...data.data);
    totalPages = data.pagination.totalPages;
    page += 1;
  } while (page <= totalPages);
  return all.map(mapCareerEntry);
};

let ratificationsDb: PendingRatification[] = [...mockPendingRatifications];

export const careerService = {
  // Cluster / Industry / Domain browsing — sourced from the live taxonomy tree so ids
  // are real (needed for edit/delete) and empty nodes still appear.
  getClusters: async (search?: string): Promise<CareerCluster[]> => {
    const tree = await getTree();
    let clusters: CareerCluster[] = tree.map(c => ({
      id: c.id,
      name: c.name,
      industryCount: c.industries.length,
    }));
    if (search) {
      const q = search.toLowerCase();
      clusters = clusters.filter(c => c.name.toLowerCase().includes(q));
    }
    return clusters.sort((a, b) => a.name.localeCompare(b.name));
  },

  // `clusterId` filters to one cluster's industries. Falls back to matching by name for
  // callers that still pass a cluster name.
  getIndustries: async (clusterId?: string, search?: string): Promise<CareerIndustry[]> => {
    const tree = await getTree();
    let industries: CareerIndustry[] = [];
    tree.forEach(c => {
      if (clusterId && c.id !== clusterId && c.name !== clusterId) return;
      c.industries.forEach(i =>
        industries.push({
          id: i.id,
          clusterId: c.id,
          clusterName: c.name,
          name: i.name,
          domainCount: i.domains.length,
        })
      );
    });
    if (search) {
      const q = search.toLowerCase();
      industries = industries.filter(i => i.name.toLowerCase().includes(q));
    }
    return industries.sort((a, b) => a.name.localeCompare(b.name));
  },

  getDomains: async (industryId?: string, search?: string): Promise<CareerDomain[]> => {
    // Scope the role-count fetch to the current industry rather than the whole library
    // (the previous getFullList() download was the domains view's main slow path).
    const [tree, all] = await Promise.all([
      getTree(),
      industryId ? fetchEntriesByIndustry(industryId) : getFullList(),
    ]);
    let domains: CareerDomain[] = [];
    tree.forEach(c =>
      c.industries.forEach(i => {
        if (industryId && i.id !== industryId && i.name !== industryId) return;
        i.domains.forEach(d =>
          domains.push({
            id: d.id,
            industryId: i.id,
            industryName: i.name,
            clusterName: c.name,
            name: d.name,
            // Role counts aren't on the tree — matched against the entry list by
            // domain+industry name (ids aren't carried onto mapped entries).
            roleCount: all.filter(r => r.domain === d.name && r.industry === i.name).length,
          })
        );
      })
    );
    if (search) {
      const q = search.toLowerCase();
      domains = domains.filter(d => d.name.toLowerCase().includes(q));
    }
    return domains.sort((a, b) => a.name.localeCompare(b.name));
  },

  // `domainId` scopes to one domain's roles via the server-side filter (exact, unlike a
  // name match). Without it, returns the full list (used by the Simple View browser).
  getJobRoles: async (domainId?: string, search?: string): Promise<Career[]> => {
    let result: Career[];
    if (domainId) {
      const { data } = await apiClient.get<CareerLibraryListResponse>('/career-library', {
        params: { domainId, pageSize: 100 },
      });
      result = data.data.map(mapCareerEntry);
    } else {
      result = await getFullList();
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

  // GET /api/v1/career-library/{id} — includes related institutions/courses/exams
  getById: async (
    id: string
  ): Promise<{
    career: Career;
    entranceExams: EntranceExam[];
    courses: CourseDetail[];
    institutions: InstitutionDetail[];
    // Currently-linked canonical records (ids) for the edit form's tick-lists.
    linkedEntranceExams: CareerLinkOption[];
    linkedCourses: CareerLinkOption[];
    linkedInstitutions: CareerLinkOption[];
  }> => {
    const { data } = await apiClient.get<CareerLibraryDetailResponse>(`/career-library/${id}`);
    return {
      career: mapCareerEntry(data),
      entranceExams: (data.relatedEntranceExams || []).map(mapExam),
      courses: (data.relatedCourses || []).map(mapCourse),
      institutions: (data.relatedInstitutions || []).map(mapInstitution),
      linkedEntranceExams: (data.linkedEntranceExams || []).map(e => ({
        id: e.id,
        label: examOptionLabel(e),
        level: e.level === 'PG' ? 'PG' : 'UG',
      })),
      linkedCourses: (data.linkedCourses || []).map(c => ({ id: c.id, label: courseOptionLabel(c) })),
      linkedInstitutions: (data.linkedInstitutions || []).map(i => ({
        id: i.id,
        label: institutionOptionLabel(i),
      })),
    };
  },

  // ---- Typeahead pickers for the add/edit job-role linked references (select-or-add) ----
  // GET /api/v1/career-library/entrance-exams | /courses | /institutions
  searchEntranceExams: async (search: string, level?: 'UG' | 'PG'): Promise<CareerLinkOption[]> => {
    const { data } = await apiClient.get<ApiNormalizedExam[] | { data: ApiNormalizedExam[] }>(
      '/career-library/entrance-exams',
      { params: { search: search || undefined, level, limit: 20 } }
    );
    return unwrapList(data).map(e => ({
      id: e.id,
      label: examOptionLabel(e),
      level: e.level === 'PG' ? 'PG' : 'UG',
    }));
  },
  searchCourses: async (search: string, level?: 'UG' | 'PG'): Promise<CareerLinkOption[]> => {
    const { data } = await apiClient.get<ApiNormalizedCourse[] | { data: ApiNormalizedCourse[] }>(
      '/career-library/courses',
      { params: { search: search || undefined, level, limit: 20 } }
    );
    return unwrapList(data).map(c => ({ id: c.id, label: courseOptionLabel(c) }));
  },
  searchInstitutions: async (search: string): Promise<CareerLinkOption[]> => {
    const { data } = await apiClient.get<ApiNormalizedInstitution[] | { data: ApiNormalizedInstitution[] }>(
      '/career-library/institutions',
      { params: { search: search || undefined, limit: 20 } }
    );
    return unwrapList(data).map(i => ({ id: i.id, label: institutionOptionLabel(i) }));
  },

  // GET /api/v1/career-library/filters
  getFilters: async (): Promise<CareerLibraryFiltersResponse> => {
    const { data } = await apiClient.get<CareerLibraryFiltersResponse>('/career-library/filters');
    return data;
  },

  // Live nested taxonomy (clusters → industries → domains) for the cascading picker on
  // the add/edit job-role form.
  getTaxonomyTree: async (): Promise<TaxonomyTree> => {
    return getTree();
  },

  // ---- Taxonomy CRUD (admin) — POST/PATCH/DELETE /career-taxonomy/{level} ----

  createCluster: async (name: string): Promise<void> => {
    await apiClient.post('/career-taxonomy/clusters', { name });
    invalidateCareerCaches();
  },
  updateCluster: async (id: string, name: string): Promise<void> => {
    await apiClient.patch(`/career-taxonomy/clusters/${id}`, { name });
    invalidateCareerCaches();
  },
  deleteCluster: async (id: string): Promise<void> => {
    await apiClient.delete(`/career-taxonomy/clusters/${id}`);
    invalidateCareerCaches();
  },

  createIndustry: async (clusterId: string, name: string): Promise<void> => {
    await apiClient.post('/career-taxonomy/industries', { clusterId, name });
    invalidateCareerCaches();
  },
  updateIndustry: async (
    id: string,
    payload: { name?: string; clusterId?: string }
  ): Promise<void> => {
    await apiClient.patch(`/career-taxonomy/industries/${id}`, payload);
    invalidateCareerCaches();
  },
  deleteIndustry: async (id: string): Promise<void> => {
    await apiClient.delete(`/career-taxonomy/industries/${id}`);
    invalidateCareerCaches();
  },

  createDomain: async (industryId: string, name: string): Promise<void> => {
    await apiClient.post('/career-taxonomy/domains', { industryId, name });
    invalidateCareerCaches();
  },
  updateDomain: async (
    id: string,
    payload: { name?: string; industryId?: string }
  ): Promise<void> => {
    await apiClient.patch(`/career-taxonomy/domains/${id}`, payload);
    invalidateCareerCaches();
  },
  deleteDomain: async (id: string): Promise<void> => {
    await apiClient.delete(`/career-taxonomy/domains/${id}`);
    invalidateCareerCaches();
  },

  // ---- Job-role (career entry) CRUD (admin) — POST/PATCH/DELETE /career-library ----

  createEntry: async (payload: CareerEntryPayload): Promise<Career> => {
    const { data } = await apiClient.post<ApiCareerEntry>('/career-library', payload);
    invalidateCareerCaches();
    return mapCareerEntry(data);
  },
  updateEntry: async (id: string, payload: Partial<CareerEntryPayload>): Promise<Career> => {
    const { data } = await apiClient.patch<ApiCareerEntry>(`/career-library/${id}`, payload);
    invalidateCareerCaches();
    return mapCareerEntry(data);
  },
  deleteEntry: async (id: string): Promise<void> => {
    await apiClient.delete(`/career-library/${id}`);
    invalidateCareerCaches();
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
