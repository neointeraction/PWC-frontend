// View-model types for the kREATE Compass Report page, assembled from
// GET /api/v1/reports/students/{studentId}/assessment (docs/api-list.md "Reports"). The
// printed/PDF-exported version of the report additionally reads counsellor-authored
// session-local fields (roadmap grid, colleges/exams, notes) straight off the
// GET /counsellor-chart/students/{studentId} response already fetched by
// StudentCareerIkigaiReportPage.tsx — see sections/print/PrintReportContent.tsx.

export interface TraitMapItem {
  no: number;
  layerTrait: string;
  traitName: string;
  whatItMeasures: string;
  grade: string;
  gradeMeaning: string;
}

export interface ReliabilityMetric {
  code: string;
  name: string;
  score: string;
  status: string;
  guidance: string;
}

export interface StreamFitItem {
  id: string;
  mainStream: string;
  subStream: string;
  coreSubjects: string;
  electives: string;
  requirement: string;
  gradingLevel: string;
  meaning: string;
}

export interface GraduationPathwayItem {
  id: string;
  cluster: string;
  degree: string;
  specialisations: string;
  keyExams: string;
  reasoning: string;
}

export interface IndustryChoiceItem {
  id: string;
  cluster: string;
  industry: string;
  domain: string;
  requirement: string;
  gradingLevel: string;
  meaning: string;
}

export interface ChampionTrait {
  name: string;
  description: string;
}

export interface CareerRecommendationCard {
  id: string;
  role: string;
  cluster: string;
  industry: string;
  domain: string;
  whyItFits: string;
  topEmployers: string;
  aiResilience: string;
  salaryIndia: string;
  salaryAbroad: string;
  fitScore: number | null;
  level: string;
  addedByCounsellor: boolean;
}

export interface StudentCareerIkigaiReportData {
  studentInfo: {
    studentName: string;
    studentId: string;
    gradeClass: string;
    schoolName: string;
    counselorName: string;
    reportDate: string;
  };
  studentProfile: {
    archetype: string;
    snapshotSummary: string;
    coreStrengths: string[];
    hobbies: string[];
    careerStyle: ChampionTrait;
    personalSignature: ChampionTrait;
    thinkingMode: ChampionTrait;
  };
  traitMap: TraitMapItem[];
  reliability: ReliabilityMetric[];
  streamFit: {
    table: StreamFitItem[];
    whyTheseStreams: string;
  };
  graduation: {
    pathways: GraduationPathwayItem[];
  };
  careerCompass: CareerRecommendationCard[];
  industryChoice: IndustryChoiceItem[];
}
