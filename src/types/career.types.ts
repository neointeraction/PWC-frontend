export interface Career {
  id: string;
  // 18 Standardized Specification Fields
  jobRole: string; // Primary Key / Identifier
  careerCluster: string; // Text / Categorical
  industry: string; // Text / Categorical
  domain: string; // Text
  aiResilienceGrading: 'Low' | 'Medium' | 'High'; // Categorical
  aiResilienceComment: string; // Long Text
  oneLineDescription: string; // Text
  topCompaniesRecruiting: string[]; // Text / Array of Tags
  approxSalaryRangeIndia: string; // Text
  globalSalaryRange: string; // Text
  minQual10th12thRecommendedSubjects: string; // Long Text
  minQualGradRecommendedSubjects: string; // Long Text
  entranceExamsUG: string; // Text
  minQualPGRecommendedSubjects: string; // Long Text
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
