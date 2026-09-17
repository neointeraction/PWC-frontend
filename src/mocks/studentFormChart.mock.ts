export interface AcademicRecord {
  id: string;
  subject: string;
  class7: string;
  class8: string;
  class9: string;
  isOther?: boolean;
  // Free text the student entered next to the row label — e.g. which language for
  // "Second Language", or the subject name for "Other subject".
  specifiedLabel?: string;
}

export interface ComparisonItem {
  id: string;
  code: string;
  parameter: string;
  studentResponse: string;
  parentResponse: string;
}

export interface ComparisonSubGroup {
  id: string;
  title: string;
  items: ComparisonItem[];
}

export interface TraitAssessmentItem {
  id: string;
  no: number;
  layerTrait: string;
  traitName: string;
  whatItMeasures: string;
  percentage?: string;
  grade: string;
  gradeMeaning: string;
  studentQuality?: string; // real-life example, from AssessmentTraitDefinition
  studentFriendlyExplanation?: string | null; // populated for Cognitive traits only, today
}

export interface StreamFitItem {
  id: string;
  mainStream: string;
  subStream: string;
  coreSubjects: string;
  electives: string;
  explanation?: string;
  streamRequirement?: string;
  gradingLevel?: string;
  meaning?: string;
  // Only present on system-generated rows (from StreamFit.fitScore) — used to sort them
  // before counsellor-added rows fill the remaining slots up to the table's max.
  fitScore?: number;
  // A free-text row the counsellor typed in directly (vs. picked from the career
  // library) — flagged so Super Admin can review it against the taxonomy.
  isManualEntry?: boolean;
}

export interface GraduationItem {
  id: string;
  cluster: string;
  mainStream: string;
  subStream: string;
  specialization: string;
  reasoning: string;
  keyExams: string;
  // Only present on system-generated rows (from GraduationFit.fitScore) — used to sort
  // them before counsellor-added rows fill the remaining slots up to the table's max.
  fitScore?: number;
  isManualEntry?: boolean;
}

export interface EntranceExamItem {
  id: string;
  fullName: string;
  conductingBody: string;
  level: string;
  applicableFor: string;
  subjectRequirements: string;
  examMonth: string;
  urlLink: string;
  isManualEntry?: boolean;
  // Set when this row was auto-suggested from a Career Compass target role's linked
  // entrance exams (see CareerCompassItem.roleId), rather than added by hand — lets the
  // suggestion sync drop it again if that target role is later removed, without
  // touching rows the counsellor added or edited themselves.
  sourceRoleId?: string;
}

export interface CollegesAfterItem {
  id: string;
  collegeName: string;
  location: string;
  type: string;
  course: string;
  entranceExam: string;
  ranking: string;
  website: string;
  isManualEntry?: boolean;
  // See EntranceExamItem.sourceRoleId — same auto-suggestion provenance tag.
  sourceRoleId?: string;
}

export interface CareerCompassClusterItem {
  id: string;
  cluster: string;
  industry: string;
  domain: string;
  streamRequirement: string;
  gradingLevel: string;
  meaning: string;
  // Only present on system-generated rows (from IndustryRollup.fitScore) — used to sort
  // them before counsellor-added rows fill the remaining slots up to the table's max.
  fitScore?: number;
  isManualEntry?: boolean;
}

export interface CareerCompassItem {
  id: string;
  cluster: string;
  industry: string;
  domain: string;
  role: string;
  whyItFits: string;
  topEmployers: string;
  salaryIndia: string;
  salaryAbroad: string;
  // Only present on system-generated rows (from DomainFit.fitScore) — used to sort them
  // before counsellor-added rows fill the remaining slots up to the table's max.
  fitScore?: number;
  isManualEntry?: boolean;
  // Career-library id of the picked Target Role (absent for manual entries) — used to
  // auto-suggest/sync this role's linked colleges & entrance exams into the Colleges
  // After Class 11&12 / Entrance Exams tables. See EntranceExamItem/CollegesAfterItem
  // .sourceRoleId.
  roleId?: string;
}

export interface ReliabilityCardData {
  code: string;
  name: string;
  measure: string;
  guidingQuestion: string;
  valueStatus: string;
  explanationText: string;
}

export interface SCRIItemData {
  code: string;
  name: string;
  description: string;
  rating: number; // 1 to 4
}

// One of the 10 RIASEC/BIG FIVE/Cognitive mirror-pair consistency checks (Response
// Validity Score). `flagged` mirrors the backend's flaggedMirrorPairs list (severity
// "strong" only) — the pairs worth a counsellor's attention.
export interface MirrorPairSummaryItem {
  code: string;
  questionA: string;
  questionB: string;
  responseA: number;
  responseB: number;
  gap: number;
  severity: 'good' | 'acceptable' | 'mild' | 'strong';
  penalty: number;
  flagged: boolean;
}

export interface RankedTraitScore {
  name: string;
  percentage: string;
}

export interface DominantCareerStyleSummary {
  code: string;
  traits: RankedTraitScore[]; // rank-ordered traits w/ score, e.g. Rank 1 -> Rank 3
  style: string;
  description: string;
  explanation: string;
}

export interface DominantPersonalitySummary {
  code: string;
  traits: RankedTraitScore[]; // rank-ordered traits w/ score, e.g. Rank 1 -> Rank 2
  style: string;
  description: string;
  explanation: string;
}

export interface DominantThinkingModeSummary {
  layer: string; // e.g. "Cognitive & Decision"
  trait: string; // workbook label, e.g. "Learning Velocity"
  traitName: string;
  whatItMeasures: string;
  studentQuality?: string; // real-life example, from AssessmentTraitDefinition
  percentage?: string;
  level: string;
  levelMeaning: string;
  personalizedExplanation?: string; // AssessmentTraitDefinition.studentFriendlyExplanation
}

export interface RoadmapGridData {
  nowSkills: string;
  nowActivities: string;
  nowHabits: string;
  c11Stream: string;
  c11Exams: string;
  c11Electives: string;
  afterDegrees: string;
  afterCertifications: string;
  afterAbroad: string;
}

export interface CounsellorFormChartData {
  sessionId: string;
  studentId: string;
  // Step 0: Student Info
  studentInfo: {
    studentName: string;
    className: string;
    instituteName: string;
    fatherName: string;
    fatherOccupation: string;
    motherName: string;
    motherOccupation: string;
    academicRecords: AcademicRecord[];
    academicTrend: 'Improving' | 'Stable' | 'Declining' | 'Not Assessed';
    academicTrendNotes: string;
  };
  // Step 1: Section A
  sectionA: {
    comparisonGroups: ComparisonSubGroup[];
    synthesisNotes: Record<string, string>; // A1..A5
  };
  // Step 2: Section B
  sectionB: {
    comparisonGroups: ComparisonSubGroup[];
    synthesisNotesPre: Record<string, string>; // B1..B5
    traitsTable: TraitAssessmentItem[];
    summaryStrip: {
      careerStyle: DominantCareerStyleSummary;
      personalSignature: DominantPersonalitySummary;
      thinkingMode: DominantThinkingModeSummary;
    };
    redFlags: Record<string, string>;
    careerDnaNarrative: {
      dnaDefinition: string;
      careerStyleReveals: string;
      personalityStyleReveals: string;
      thinkingModeReveals: string;
      aptitudeProfileReveals: string;
    };
  };
  // Step 3: Section C
  sectionC: {
    comparisonGroups: ComparisonSubGroup[];
    synthesisNotesPre: Record<string, string>; // D1..D5
    streamFitTable: StreamFitItem[];
    whyThisStream1: string;
    synthesisNotesE: Record<string, string>; // E1..E5
    graduationTable: GraduationItem[];
    whyThisStream2: string;
    synthesisNotesF: Record<string, string>; // F1..F5
    entranceExamsTable: EntranceExamItem[];
    collegesTable: CollegesAfterItem[];
    careerCompassClusterTable: CareerCompassClusterItem[];
    careerCompassTable: CareerCompassItem[];
    // Assessment-derived fit scores keyed by natural key (see counsellorChart.service's
    // `fitKey`), covering every stream/domain the assessment scored — not just the top
    // N shown by default. Lets the counsellor-add-row flow score a new row the instant
    // it's picked from the career library, matching the same fit score that would be
    // re-attached on the next chart load.
    fitScoreLookup: {
      stream: Record<string, number | null>; // key: mainStream|subStream
      graduation: Record<string, number | null>; // key: clusterHead|mainStream|subStream
      domain: Record<string, number | null>; // key: domain
      industry: Record<string, number | null>; // key: cluster|industry|domain
    };
  };
  // Step 4: Section D
  sectionD: {
    indicators: ReliabilityCardData[];
    mirrorPairs: MirrorPairSummaryItem[];
    synthesisNotes: Record<string, string>; // G1..G5
  };
  // Step 5: Section E
  sectionE: {
    roadmapGrid: RoadmapGridData;
    scriItems: SCRIItemData[];
    academicCareerAlignment:
      'Strongly Aligned' | 'Partially Aligned' | 'Misaligned' | 'Not Yet Assessed';
    synthesisNotes: Record<string, string>; // H1..H5
  };
  // Step 6: Section F
  sectionF: {
    comparisonGroups: ComparisonSubGroup[];
    synthesisNotes: Record<string, string>; // I1..I5
  };
}

