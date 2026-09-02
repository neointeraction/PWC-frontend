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
// the legacy `UgEntranceExam.examName` / `UgCourse.courseName` used by the old related*
// (broad, domain-wide value-match) view. These are the entry's *actual* linked records —
// the canonical field set an add-new item can carry (docs/api-list.md -> Career Library
// -> "Normalized links").
interface ApiNormalizedExam {
  id: string;
  name: string;
  level?: 'UG' | 'PG' | string | null;
  fullForm?: string | null;
  conductingBody?: string | null;
  officialWebsite?: string | null;
  examMode?: string | null;
  frequency?: string | null;
  applicableFor?: string | null;
  subjectRequirements12th?: string | null;
  applicationWindow?: string | null;
}
interface ApiNormalizedCourse {
  id: string;
  name: string;
  level?: string | null;
  fullForm?: string | null;
  stream12thRequirements?: string | null;
  relevantEntranceExams?: string | null;
  programmesOffered?: string | null;
  topColleges?: string | null;
  furtherStudyOptions?: string | null;
}
interface ApiNormalizedInstitution {
  id: string;
  name: string;
  city?: string | null;
  state?: string | null;
  type?: string | null;
  website?: string | null;
  entranceExamsRequired?: string | null;
  programmesOffered?: string | null;
  ranking?: string | null;
}

// ---- Domain education path (docs/api-list.md -> Career Taxonomy -> Education Path) ----

export type EducationLevel =
  | 'CLASS_10_PLUS_2'
  | 'GRADUATE'
  | 'POST_GRADUATE'
  | 'CERTIFICATION_STUDENT'
  | 'CERTIFICATION_UG';

// The labels the job-role form shows against each entry.
export const EDUCATION_LEVEL_LABEL: Record<EducationLevel, string> = {
  CLASS_10_PLUS_2: '10+2',
  GRADUATE: 'Graduate',
  POST_GRADUATE: 'Post-Graduate',
  CERTIFICATION_STUDENT: 'Certification (Student Level)',
  CERTIFICATION_UG: 'Certification (Undergraduate Level)',
};

// Level order as the education path reads top to bottom.
export const EDUCATION_LEVELS: EducationLevel[] = [
  'CLASS_10_PLUS_2',
  'GRADUATE',
  'POST_GRADUATE',
  'CERTIFICATION_STUDENT',
  'CERTIFICATION_UG',
];

export interface DomainEducationEntry {
  id: string;
  level: EducationLevel;
  programme: string;
  description?: string | null;
}

interface CareerLibraryDetailResponse extends ApiCareerEntry {
  // Curated many-to-many links actually attached to this entry (with ids) — the source
  // for both the read-only detail tabs and pre-ticking the edit form's tick-lists.
  // (The API also returns a legacy `related*` broad value-match view — matched by
  // domain/cluster name, not by this entry's own links — which is deliberately not read
  // here: it showed unrelated institutions/courses on every role in an industry.)
  linkedEntranceExams?: ApiNormalizedExam[];
  linkedCourses?: ApiNormalizedCourse[];
  linkedInstitutions?: ApiNormalizedInstitution[];
  linkedEducationEntries?: DomainEducationEntry[];
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
  // Derived from the Education Path tick-list, which is optional on the form — omitted
  // entirely (not sent as `''`) when nothing is ticked at that level.
  qualification10th12th?: string;
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
  // Ticked domain education entries. Sending the array replaces this role's links;
  // omitting it leaves them unchanged.
  educationEntries?: { id: string }[];
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
  domainId: entry.domain.id,
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

const mapInstitution = (inst: ApiNormalizedInstitution): InstitutionDetail => ({
  id: inst.id,
  badge: inst.type || 'Institution',
  name: inst.name,
  cityState: [inst.city, inst.state].filter(Boolean).join(', ') || '—',
  entranceExam: inst.entranceExamsRequired || '—',
  programsOffered: inst.programmesOffered || '—',
  ranking: inst.ranking || '—',
  website: inst.website || '',
});

const mapCourse = (course: ApiNormalizedCourse): CourseDetail => ({
  id: course.id,
  badge: course.level || 'UG',
  title: course.fullForm ? `${course.name} (${course.fullForm})` : course.name,
  streamRequirement: course.stream12thRequirements || '—',
  entranceExams: course.relevantEntranceExams || '—',
  programsOffered: course.programmesOffered || '—',
  topColleges: course.topColleges || '—',
  furtherStudyOptions: course.furtherStudyOptions || '—',
});

const mapExam = (exam: ApiNormalizedExam): EntranceExam => ({
  id: exam.id,
  name: exam.name,
  fullTitle: exam.fullForm || '',
  level: exam.level === 'PG' ? 'PG' : 'UG',
  conductedBy: exam.conductingBody || '—',
  mode: exam.examMode || '—',
  frequency: exam.frequency || '—',
  applicableFor: exam.applicableFor || '—',
  requirement12th: exam.subjectRequirements12th || '—',
  website: exam.officialWebsite || '',
  datesText: exam.applicationWindow || undefined,
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

// ---- Career entry proposals (docs/api-list.md is stale here \u2014 PWC-backend renamed
// CareerLibraryRequest -> CareerLibraryEntryProposal, /career-library/requests ->
// /career-library/proposals. A proposal is staged from the same payload as a real
// entry (POST /career-library as a counsellor) and is DELETED on approve/reject rather
// than transitioning status, so a listable proposal is always implicitly "pending" \u2014
// there is no server-side history of resolved ones. ----

interface ApiCareerEntryProposal {
  id: string;
  jobRole: string;
  oneLineDescription: string;
  submittedBy: string;
  createdAt: string;
  domain: ApiCareerDomainChain | null;
}

interface ApiCareerEntryProposalListResponse {
  data: ApiCareerEntryProposal[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
}

// A proposal row carries only `submittedBy` (a counsellor's User id), so the requester's
// name comes from the counsellor directory. A failure there must not blank the whole list.
const getCounsellorNames = async (): Promise<Map<string, string>> => {
  try {
    const { data } = await apiClient.get<
      { id: string; user?: { firstName: string; lastName: string } }[]
    >('/counsellors');
    return new Map(
      data.map(c => [c.id, `${c.user?.firstName ?? ''} ${c.user?.lastName ?? ''}`.trim()])
    );
  } catch {
    return new Map();
  }
};

const mapCareerProposal = (
  p: ApiCareerEntryProposal,
  names: Map<string, string>
): PendingRatification => ({
  id: p.id,
  careerName: p.jobRole,
  sourceTenant: names.get(p.submittedBy) || '\u2014',
  suggestedCategory: p.domain?.industry?.cluster?.name ?? '\u2014',
  description: p.oneLineDescription,
  submittedAt: p.createdAt,
  // Nothing but pending proposals are ever returned \u2014 see note above.
  status: 'pending',
  suggestedIndustry: p.domain?.industry?.name,
  suggestedDomain: p.domain?.name,
  resultingEntryId: null,
});

// `status` no longer maps to anything server-side (resolved proposals don't exist as
// rows); an 'ratified'/'rejected' filter can only ever be empty.
const listRatificationRequests = async (
  status?: PendingRatification['status']
): Promise<PendingRatification[]> => {
  if (status === 'ratified' || status === 'rejected') return [];
  const [{ data }, names] = await Promise.all([
    apiClient.get<ApiCareerEntryProposalListResponse>('/career-library/proposals'),
    getCounsellorNames(),
  ]);
  return data.data.map(p => mapCareerProposal(p, names));
};

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
    linkedEducationEntries: DomainEducationEntry[];
  }> => {
    const { data } = await apiClient.get<CareerLibraryDetailResponse>(`/career-library/${id}`);
    return {
      career: mapCareerEntry(data),
      // The detail tabs show only what's actually linked to this entry — not the API's
      // legacy `related*` view, which broad-matches by domain/cluster name and so showed
      // the same institutions/courses on every role in an industry regardless of links.
      entranceExams: (data.linkedEntranceExams || []).map(mapExam),
      courses: (data.linkedCourses || []).map(mapCourse),
      institutions: (data.linkedInstitutions || []).map(mapInstitution),
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
      linkedEducationEntries: data.linkedEducationEntries || [],
    };
  },

  // ---- Education path entries ----
  // Global canonical rows (like exams / courses / institutions), NOT per-domain: one
  // `{ level, programme }` row is reused by every job role that names it. `domainId`
  // narrows the list to entries already linked to roles in that domain — which is what
  // "pulled from this Domain" means on the job-role form. Pickers see APPROVED rows only
  // (the endpoint defaults to that).
  listEducationEntries: async (params: {
    domainId?: string;
    search?: string;
    level?: EducationLevel;
    limit?: number;
  } = {}): Promise<DomainEducationEntry[]> => {
    const { data } = await apiClient.get<DomainEducationEntry[] | { data: DomainEducationEntry[] }>(
      '/career-library/education',
      {
        params: {
          ...(params.domainId ? { domainId: params.domainId } : {}),
          ...(params.search ? { search: params.search } : {}),
          ...(params.level ? { level: params.level } : {}),
          ...(params.limit ? { limit: params.limit } : {}),
        },
      }
    );
    return Array.isArray(data) ? data : data.data;
  },

  // POST /career-library/education. Submitted by an admin it is APPROVED immediately;
  // a counsellor's proposal lands PENDING for review. 409 if the same level+programme
  // already exists among live rows.
  createEducationEntry: async (input: {
    level: EducationLevel;
    programme: string;
    description?: string;
  }): Promise<DomainEducationEntry> => {
    const { data } = await apiClient.post<DomainEducationEntry>('/career-library/education', {
      level: input.level,
      programme: input.programme,
      ...(input.description ? { description: input.description } : {}),
    });
    return data;
  },

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

  // ---- Career entry proposals: counsellors propose careers, admins review ----
  // GET /career-library/proposals, POST .../{id}/approve, POST .../{id}/reject.
  // Approve creates the real CareerLibraryEntry straight from the proposal's own data
  // (it was staged with the full entry payload) and deletes the proposal; reject just
  // deletes it. Neither returns a proposal-shaped object, so both resolve void.

  getRatificationRequests: listRatificationRequests,

  getPendingRatifications: (): Promise<PendingRatification[]> =>
    listRatificationRequests('pending'),

  ratify: async (id: string): Promise<void> => {
    await apiClient.post(`/career-library/proposals/${id}/approve`);
  },

  rejectRatification: async (id: string): Promise<void> => {
    await apiClient.post(`/career-library/proposals/${id}/reject`);
  },
};
