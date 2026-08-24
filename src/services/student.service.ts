import { apiClient } from './api';
import {
  PreCounsellingForm,
  Student,
  StudentListResponse,
  CurrentStudent,
  StudentWorkflowStatus,
} from '@/types';

// ---- Backend shape: GET /api/v1/students/me ----
interface ApiCurrentStudent {
  id: string;
  userId: string;
  studentCode: string;
  mobile: string;
  whatsappNumber?: string | null;
  parentMobile: string;
  parentEmail: string;
  fatherName: string;
  fatherOccupation?: string | null;
  fatherEmployer?: string | null;
  motherName?: string | null;
  motherOccupation?: string | null;
  motherEmployer?: string | null;
  academicYear?: string | null;
  workflowStatus: StudentWorkflowStatus;
  user: { id: string; email: string; firstName: string; lastName: string; isActive: boolean };
  project: { id: string; name: string; instituteId: string };
  division: {
    id: string;
    name?: string | null;
    class?: { id: string; name: string; instituteId: string } | null;
  };
  cohort?: { code: string; name: string } | null;
  stageInfo?: {
    stageLabel?: string;
    flagged?: boolean;
    flagReason?: string | null;
  } | null;
}

// ---- Backend shape: GET /api/v1/forms/students/{id}/status ----
interface ApiFormSubmissionFlag {
  submitted: boolean;
  submittedAt: string | null;
}
interface ApiFormsStatus {
  forms?: {
    preCounsellingStudent?: ApiFormSubmissionFlag;
    preCounsellingParent?: ApiFormSubmissionFlag;
    feedbackStudent?: ApiFormSubmissionFlag;
    feedbackParent?: ApiFormSubmissionFlag;
  };
  preCounsellingComplete?: boolean;
  feedbackComplete?: boolean;
}

export interface StudentFormsStatus {
  preCounsellingStudent: boolean;
  preCounsellingParent: boolean;
  feedbackStudent: boolean;
  feedbackParent: boolean;
  preCounsellingComplete: boolean;
  feedbackComplete: boolean;
}

const mapCurrentStudent = (s: ApiCurrentStudent): CurrentStudent => ({
  id: s.id,
  userId: s.userId,
  studentCode: s.studentCode,
  name: `${s.user.firstName} ${s.user.lastName}`.trim(),
  email: s.user.email,
  mobile: s.mobile,
  whatsappNumber: s.whatsappNumber || undefined,
  parentMobile: s.parentMobile,
  parentEmail: s.parentEmail,
  father: {
    name: s.fatherName,
    occupation: s.fatherOccupation || undefined,
    employer: s.fatherEmployer || undefined,
  },
  mother: {
    name: s.motherName || undefined,
    occupation: s.motherOccupation || undefined,
    employer: s.motherEmployer || undefined,
  },
  academicYear: s.academicYear || undefined,
  workflowStatus: s.workflowStatus,
  project: s.project,
  division: {
    id: s.division.id,
    name: s.division.name || undefined,
    className: s.division.class?.name,
    classId: s.division.class?.id,
  },
  cohort: s.cohort || undefined,
  stageLabel: s.stageInfo?.stageLabel,
  isFlagged: s.stageInfo?.flagged ?? false,
  flagReason: s.stageInfo?.flagReason ?? null,
});

const mockStudents: Student[] = [
  {
    id: 'student-1',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    school: 'Lincoln High School',
    grade: '10th',
    assignedCounselorId: 'user-counselor-john',
    formStatus: 'submitted',
  },
  {
    id: 'student-2',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    school: 'Washington High',
    grade: '12th',
    assignedCounselorId: 'user-counselor-john',
    formStatus: 'submitted',
  },
  {
    id: 'student-3',
    name: 'Jessica Wilson',
    email: 'jessica.w@example.com',
    school: 'Lincoln High School',
    grade: '11th',
    assignedCounselorId: 'user-counselor-john',
    formStatus: 'pending',
  },
];

const mockFormAnswers: Record<string, PreCounsellingForm> = {
  'student-1': {
    id: 'form-1',
    studentId: 'student-1',
    careerInterests: ['Computer Science', 'Data Analysis'],
    strengths: ['Problem Solving', 'Mathematics'],
    preferredSubjects: ['Math', 'Physics'],
    additionalNotes: 'I am very interested in AI and machine learning.',
    submittedAt: '2026-08-01T10:00:00Z',
  },
  'student-2': {
    id: 'form-2',
    studentId: 'student-2',
    careerInterests: ['Business Administration', 'Marketing'],
    strengths: ['Communication', 'Leadership'],
    preferredSubjects: ['Economics', 'English'],
    additionalNotes: 'Looking forward to understanding more about management roles.',
    submittedAt: '2026-08-02T14:30:00Z',
  },
};

// Ordered workflow stages — used to derive cumulative "reached this stage yet?" booleans
// for the portal's step tracker from the single `workflowStatus` enum.
const WORKFLOW_ORDER: StudentWorkflowStatus[] = [
  'DRAFT',
  'PROFILE_COMPLETED',
  'PRE_COUNSELLING_FORMS_SUBMITTED',
  'ASSESSMENT_PENDING',
  'ASSESSMENT_COMPLETED',
  'SESSION_SCHEDULED',
  'SESSION_1_COMPLETED',
  'COUNSELLOR_FEEDBACK_REPORT',
  'SESSION_2_COMPLETED',
  'COUNSELLOR_FEEDBACK',
  'STUDENT_PARENT_FEEDBACK',
  'CLOSED',
];

export interface StudentProgress {
  profileCompleted: boolean;
  preCounsellingSubmitted: boolean;
  assessmentSubmitted: boolean;
  booked: boolean;
  session1Completed: boolean;
  session2Completed: boolean;
  feedbackStage: boolean;
}

export const deriveStudentProgress = (status: StudentWorkflowStatus): StudentProgress => {
  const idx = WORKFLOW_ORDER.indexOf(status);
  const reached = (s: StudentWorkflowStatus) => idx >= WORKFLOW_ORDER.indexOf(s);
  return {
    profileCompleted: reached('PROFILE_COMPLETED'),
    preCounsellingSubmitted: reached('PRE_COUNSELLING_FORMS_SUBMITTED'),
    assessmentSubmitted: reached('ASSESSMENT_COMPLETED'),
    booked: reached('SESSION_SCHEDULED'),
    session1Completed: reached('SESSION_1_COMPLETED'),
    session2Completed: reached('SESSION_2_COMPLETED'),
    feedbackStage: reached('STUDENT_PARENT_FEEDBACK'),
  };
};

export const studentService = {
  // GET /api/v1/students/me — the logged-in student's own record. The entry point every
  // student-facing screen calls first to obtain its Student id + cohort + workflow stage.
  getMe: async (): Promise<CurrentStudent> => {
    const { data } = await apiClient.get<ApiCurrentStudent>('/students/me');
    return mapCurrentStudent(data);
  },

  // POST /api/v1/students/{id}/confirm-profile — student confirms their profile is correct
  // (DRAFT → PROFILE_COMPLETED).
  confirmProfile: async (studentId: string): Promise<void> => {
    await apiClient.post(`/students/${studentId}/confirm-profile`);
  },

  // GET /api/v1/forms/students/{id}/status — per-form submission flags (finalized only).
  getFormsStatus: async (studentId: string): Promise<StudentFormsStatus> => {
    const { data } = await apiClient.get<ApiFormsStatus>(`/forms/students/${studentId}/status`);
    return {
      preCounsellingStudent: data.forms?.preCounsellingStudent?.submitted ?? false,
      preCounsellingParent: data.forms?.preCounsellingParent?.submitted ?? false,
      feedbackStudent: data.forms?.feedbackStudent?.submitted ?? false,
      feedbackParent: data.forms?.feedbackParent?.submitted ?? false,
      preCounsellingComplete: data.preCounsellingComplete ?? false,
      feedbackComplete: data.feedbackComplete ?? false,
    };
  },

  getStudentsByCounselor: async (counselorId: string): Promise<StudentListResponse> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const data = mockStudents.filter(student => student.assignedCounselorId === counselorId);
    return { data, total: data.length };
  },

  getPreCounsellingForm: async (studentId: string): Promise<PreCounsellingForm | null> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockFormAnswers[studentId] || null;
  },
};
