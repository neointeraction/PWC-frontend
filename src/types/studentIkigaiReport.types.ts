// View-model types for the kREATE Compass Report page, assembled from
// GET /api/v1/reports/students/{studentId}/assessment (docs/api-list.md "Reports").
// A few sections of the original mock (Introduction copy, Roadmap phases, entrance
// exams, shortlisted colleges) have no backend equivalent and were dropped rather than
// bound to fabricated data — see src/services/reports.service.ts.

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
}

export interface GraduationPathwayItem {
  id: string;
  cluster: string;
  degree: string;
  specialisations: string;
  keyExams: string;
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
}
