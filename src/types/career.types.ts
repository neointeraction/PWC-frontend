export interface Career {
  id: string;
  // 18 Standardized Specification Fields
  jobRole: string; // Primary Key / Identifier
  careerCluster: string; // Text / Categorical
  industry: string; // Text / Categorical
  domain: string; // Text
  aiResilienceGrading: 'Low' | 'Medium' | 'High' | 'Very High'; // Categorical
  aiResilienceComment: string; // Long Text
  oneLineDescription: string; // Text
  roleOverview?: string; // Long Text — the role write-up shown in the Overview tab
  keySkills?: string[]; // Key skill requirements shown in the Overview tab
  topCompaniesRecruiting: string[]; // Text / Array of Tags
  approxSalaryRangeIndia: string; // Text
  globalSalaryRange: string; // Text
  minQual10th12thRecommendedSubjects: string; // Long Text
  qualification10th12thExplanation?: string; // "10+2 Explanation" note
  minQualGradRecommendedSubjects: string; // Long Text
  qualificationGraduationDefined?: string; // Graduation "defined" note
  entranceExamsUG: string; // Text
  minQualPGRecommendedSubjects: string; // Long Text
  qualificationPGDefined?: string; // Post-graduation "defined" note
  entranceExamsPG: string; // Text
  certificationsStudents: string; // Long Text
  certificationsUG: string; // Long Text
  topCoursesToStudy: string; // Long Text

  // Metadata & compatibility fields
  title?: string;
  category?: string;
  description?: string;
  status: 'active' | 'inactive' | 'pending';
  lastUpdated: string;
  sourceTenant?: string;
  isShortlisted?: boolean; // used by the (master) shortlist UI on career browsing
}

export interface CareerCluster {
  id: string;
  name: string;
  description?: string;
  industryCount?: number;
}

export interface CareerIndustry {
  id: string;
  clusterId: string;
  clusterName: string;
  name: string;
  description?: string;
  domainCount?: number;
}

export interface CareerDomain {
  id: string;
  industryId: string;
  industryName: string;
  clusterName: string;
  name: string;
  description?: string;
  roleCount?: number;
}

export interface PendingRatification {
  id: string;
  careerName: string;
  sourceTenant: string;
  suggestedCategory: string;
  description: string;
  submittedAt: string;
  status: 'pending' | 'ratified' | 'rejected';
}

export interface CareerFilters {
  search?: string;
  status?: string;
  category?: string;
  cluster?: string;
  aiResilience?: string;
  page?: number;
  limit?: number;
}

export interface EntranceExam {
  id: string;
  name: string;
  fullTitle: string;
  level: 'UG' | 'PG';
  conductedBy: string;
  mode: string;
  frequency: string;
  applicableFor: string;
  requirement12th: string;
  website: string;
  datesText?: string;
  isShortlisted?: boolean;
}

export interface CourseDetail {
  id: string;
  badge: string;
  title: string;
  streamRequirement: string;
  entranceExams: string;
  programsOffered: string;
  topColleges: string;
  furtherStudyOptions: string;
}

export interface InstitutionDetail {
  id: string;
  badge: string;
  name: string;
  cityState: string;
  entranceExam: string;
  programsOffered: string;
  ranking: string;
  website: string;
  isShortlisted?: boolean;
}
