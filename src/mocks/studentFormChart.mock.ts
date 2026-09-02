export interface AcademicRecord {
  id: string;
  subject: string;
  class7: string;
  class8: string;
  class9: string;
  isOther?: boolean;
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
}

export interface GraduationItem {
  id: string;
  cluster: string;
  mainStream: string;
  subStream: string;
  specialization: string;
  reasoning: string;
  keyExams: string;
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
}

export interface CareerCompassClusterItem {
  id: string;
  cluster: string;
  industry: string;
  domain: string;
  streamRequirement: string;
  gradingLevel: string;
  meaning: string;
}

export interface CareerCompassItem {
  id: string;
  domain: string;
  role: string;
  whyItFits: string;
  topEmployers: string;
  aiResilience: string;
  salaryIndia: string;
  salaryAbroad: string;
  approvalStatus?: 'Approved' | 'Pending Admin Approval';
}

export interface ReliabilityCardData {
  code: string;
  name: string;
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
      careerStyle: string;
      personalSignature: string;
      thinkingMode: string;
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
  };
  // Step 4: Section D
  sectionD: {
    indicators: ReliabilityCardData[];
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

