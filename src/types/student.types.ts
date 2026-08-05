export interface PreCounsellingForm {
  id: string;
  studentId: string;
  careerInterests: string[];
  strengths: string[];
  preferredSubjects: string[];
  additionalNotes?: string;
  submittedAt: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  school: string;
  grade: string;
  assignedCounselorId: string;
  formStatus: 'pending' | 'submitted';
}

export interface StudentListResponse {
  data: Student[];
  total: number;
}
