// Backend: PWC-backend/src/modules/counsellor-chart/* + assessment/scoring/*.
// GET/PUT /api/v1/counsellor-chart/students/{studentId} — docs/api-list.md "Counsellor Chart".
// Raw JSON, no envelope.

export type TraitKey =
  | 'REALISTIC'
  | 'INVESTIGATIVE'
  | 'ARTISTIC'
  | 'SOCIAL'
  | 'ENTERPRISING'
  | 'CONVENTIONAL'
  | 'OPENNESS'
  | 'CONSCIENTIOUSNESS'
  | 'EXTRAVERSION'
  | 'AGREEABLENESS'
  | 'EMOTIONAL_STABILITY'
  | 'NUMERICAL'
  | 'VERBAL'
  | 'LOGICAL'
  | 'SPATIAL'
  | 'LEARNING_VELOCITY'
  | 'UNCERTAINTY_TOLERANCE'
  | 'AUTONOMY_PREFERENCE';

export type AssessmentLayer = 'RIASEC' | 'BIG_FIVE' | 'APTITUDE' | 'COGNITIVE';

export interface EnrichedTraitScore {
  trait: TraitKey;
  score: number;
  level: string;
  levelMeaning: string;
  neutralCount: number;
  layer: AssessmentLayer;
  traitName: string;
  description: string;
}

export interface LayerReport {
  scores: EnrichedTraitScore[];
  ranking: TraitKey[];
  flags: string[];
}

export interface DominantCareerStyle {
  code: string;
  traits: TraitKey[];
  style: string;
  description: string;
  explanation: string;
}

export interface DominantPersonalityStyle {
  code: string;
  style: string;
  description: string;
  explanation: string;
}

export interface StreamFit {
  mainStream: string;
  subStream: string;
  coreSubjects: string | null;
  electiveSubjects: string | null;
  explanation: string | null;
  fitScore: number;
  level: string;
  meaning: string;
  weights: Partial<Record<TraitKey, number>>;
}

export interface StreamFitResult {
  ranked: StreamFit[];
  top3: StreamFit[];
}

export interface GraduationFit {
  clusterHead: string | null;
  mainStream: string;
  subStream: string;
  specialisations: string | null;
  eligibility: string | null;
  keyExams: string | null;
  explanation: string | null;
  fitScore: number;
  level: string;
  meaning: string;
}

export interface GraduationFitResult {
  ranked: GraduationFit[];
  top3: GraduationFit[];
}

export interface RepresentativeCareer {
  jobRole: string;
  cluster: string;
  industry: string;
  domain: string;
  aiResilienceGrade: 'VERY_HIGH' | 'HIGH' | 'MEDIUM' | 'LOW';
  aiResilienceComment: string;
  oneLineDescription: string;
  topCompanies: string[];
  salaryIndiaRangeText: string | null;
  salaryGlobalRangeText: string | null;
}

export interface DomainFit {
  cluster: string;
  industry: string;
  domain: string;
  fitScore: number;
  level: string;
  meaning: string;
  bestAiResilienceRank: number;
  representativeCareer: RepresentativeCareer | null;
}

export interface IndustryRollup {
  cluster: string;
  industry: string;
  domain: string;
  fitScore: number;
  level: string;
  meaning: string;
}

export interface CareerFitResult {
  rankedDomains: DomainFit[];
  top6Domains: DomainFit[];
  top3Industries: IndustryRollup[];
}

export interface AriResult {
  dc: number;
  tc: number | null;
  ari: { score: number; level: string; meaning: string } | null;
  timingAvailable: boolean;
}

export interface AciResult {
  notSureCount: number;
  totalQuestions: number;
  dkPercent: number;
  level: string;
  meaning: string;
}

export interface OriResult {
  completionMinutes: number;
  level: string;
  meaning: string;
}

export interface MirrorPairResult {
  code: string;
  a: string;
  b: string;
  responseA: number;
  responseB: number;
  gap: number;
  severity: 'good' | 'acceptable' | 'mild' | 'strong';
  penalty: number;
}

export interface RvsResult {
  score: number;
  level: string;
  meaning: string;
  totalPenalty: number;
  contradictionCount: number;
  mildCount: number;
  strongCount: number;
  evaluatedPairs: number;
  pairs: MirrorPairResult[];
}

export interface AssessmentReport {
  traitScores: Record<string, number>;
  riasec: LayerReport;
  bigFive: LayerReport;
  aptitude: LayerReport;
  cognitive: LayerReport;
  dominantCareerStyle: DominantCareerStyle;
  dominantPersonalityStyle: DominantPersonalityStyle;
  streamFit: StreamFitResult;
  graduationPathways: GraduationFitResult;
  careerFit: CareerFitResult | null;
  reliability: {
    ari: AriResult;
    aci: AciResult;
    ori: OriResult;
    rvs: RvsResult;
  };
  meta: {
    computedAt: string;
    timingAvailable: boolean;
    pending: string[];
  };
}

export interface ChartParameter {
  code: string;
  group: string;
  label: string;
  student: unknown | null;
  parent: unknown | null;
}

export interface ChartSection {
  key: 'academics' | 'strengths' | 'compass' | 'goals';
  title: string;
  parameters: ChartParameter[];
}

export type AcademicTrend = 'IMPROVING' | 'STABLE' | 'DECLINING' | 'NOT_ASSESSED';
export type AlignmentRating =
  | 'STRONGLY_ALIGNED'
  | 'PARTIALLY_ALIGNED'
  | 'MISALIGNED'
  | 'NOT_YET_ASSESSED';

export interface CounsellorChartResponse {
  studentId: string;
  ourChampion: {
    name: string;
    currentAcademicYear: string;
    institute: string;
    instituteLocation: string;
    class: string;
    division: string;
    fatherName: string | null;
    fatherOccupationCompany: string;
    motherName: string | null;
    motherOccupationCompany: string;
  };
  academicRecord: unknown | null;
  preCounselling: ChartSection[];
  assessment: AssessmentReport | null;
  flaggedMirrorPairs: MirrorPairResult[];
  hasAssessment: boolean;
  counsellor: {
    strengths: string[];
    hobbies: string[];
    careerShortlist: string[];
    academicTrend: AcademicTrend | null;
    alignmentRating: AlignmentRating | null;
    scri: {
      confidence: number | null;
      reasonedThinking: number | null;
      reducedAnxiety: number | null;
      selfAwareness: number | null;
      careerCuriosity: number | null;
      decisionOwnership: number | null;
      total: number | null;
      band: number | null;
      bandLabel: string | null;
    };
    notes: Record<string, string>;
    lastEditedBy: string | null;
    finalizedAt: string | null;
    updatedAt: string;
  };
}

// Only the note codes the backend actually recognises (SYNTHESIS_NOTE_CODES) — a save
// with any other code 400s the whole PUT, so the frontend must filter to this set.
export const VALID_SYNTHESIS_NOTE_CODES = new Set([
  'A1', 'A2', 'A3', 'A4', 'A5',
  'B1', 'B2', 'B3', 'B4', 'B5',
  'C1', 'C2', 'C3', 'C4', 'C5',
  'D1', 'D2', 'D3', 'D4', 'D5',
  'E1', 'E2', 'E3', 'E4', 'E5', 'E6',
  'F1', 'F2', 'F3',
  'G1', 'G2', 'G3', 'G4',
  'H1', 'H2', 'H3', 'H4',
]);

export interface PutCounsellorChartBody {
  strengths?: string[];
  hobbies?: string[];
  careerShortlist?: string[];
  academicTrend?: AcademicTrend;
  alignmentRating?: AlignmentRating;
  scri?: Partial<{
    confidence: number;
    reasonedThinking: number;
    reducedAnxiety: number;
    selfAwareness: number;
    careerCuriosity: number;
    decisionOwnership: number;
  }>;
  notes?: Array<{ code: string; body: string }>;
  lastEditedBy?: string;
}

export interface AmendMirrorPairBody {
  questionCode: string;
  amendedOption: number;
  counsellorId?: string;
}

// POST/DELETE mirror-pair-amendments — the raw AssessmentResult row, distinct in shape
// from `assessment` above (report nested one level in, plus denormalized scalars).
export interface AssessmentResultRow {
  id: string;
  attemptId: string;
  traitScores: Record<string, number>;
  report: AssessmentReport;
  recommendedStreams: string[];
  dominantCareerStyle: string | null;
  dominantPersonalityStyle: string | null;
  engineVersion: string;
  summary: string | null;
  createdAt: string;
}
