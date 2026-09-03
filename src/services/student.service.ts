import { apiClient } from './api';
import { CurrentStudent, StudentWorkflowStatus } from '@/types';
import { formatFullName } from '@/utils';

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
  project: { id: string; name: string };
  // Institute was merged into Project — className/divisionName are plain free-text
  // fields on the Student row now (no Division/Class entity to join against).
  className?: string | null;
  divisionName?: string | null;
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

// Student-editable profile fields sent with confirm-profile. Field names mirror the
// POST /students create body so the backend can reuse its validation; firstName/lastName
// update the linked User, the rest are Student columns.
export interface StudentProfileUpdate {
  firstName?: string;
  lastName?: string;
  mobile?: string;
  whatsappNumber?: string;
  parentMobile?: string;
  parentEmail?: string;
  fatherName?: string;
  fatherOccupation?: string;
  fatherEmployer?: string;
  motherName?: string;
  motherOccupation?: string;
  motherEmployer?: string;
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
  name: formatFullName(s.user.firstName, s.user.lastName),
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
    name: s.divisionName || undefined,
    className: s.className || undefined,
  },
  cohort: s.cohort || undefined,
  stageLabel: s.stageInfo?.stageLabel,
  isFlagged: s.stageInfo?.flagged ?? false,
  flagReason: s.stageInfo?.flagReason ?? null,
});

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

  // POST /api/v1/students/{id}/confirm-profile — student confirms their profile
  // (DRAFT → PROFILE_COMPLETED). Optionally saves the student-editable fields in the same
  // call (contract mirrors the POST /students create body; firstName/lastName update the
  // linked User). Backend support for the body is pending — sending it is a no-op until
  // the endpoint accepts it, and the empty-body confirm still works today.
  confirmProfile: async (studentId: string, payload?: StudentProfileUpdate): Promise<void> => {
    await apiClient.post(`/students/${studentId}/confirm-profile`, payload);
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
};
