// Backend workflow stages (Prisma `WorkflowStatus`) — the student's position in the
// counselling journey, the real source of truth behind the portal's step tracker.
export type StudentWorkflowStatus =
  | 'DRAFT'
  | 'PROFILE_COMPLETED'
  | 'PRE_COUNSELLING_FORMS_SUBMITTED'
  | 'ASSESSMENT_PENDING'
  | 'ASSESSMENT_COMPLETED'
  | 'SESSION_SCHEDULED'
  | 'SESSION_1_COMPLETED'
  | 'COUNSELLOR_FEEDBACK_REPORT'
  | 'SESSION_2_COMPLETED'
  | 'COUNSELLOR_FEEDBACK'
  | 'STUDENT_PARENT_FEEDBACK'
  | 'CLOSED';

// The logged-in student's own record (`GET /students/me`). Carries the Student `id`,
// `cohort` and `workflowStatus` every downstream `:studentId`-keyed screen needs.
export interface CurrentStudent {
  id: string; // Student id — used for all :studentId routes (forms, assessment, sessions)
  userId: string;
  studentCode: string;
  name: string;
  email: string;
  mobile: string;
  whatsappNumber?: string;
  parentMobile: string;
  parentEmail: string;
  father: { name: string; occupation?: string; employer?: string };
  mother: { name?: string; occupation?: string; employer?: string };
  academicYear?: string;
  workflowStatus: StudentWorkflowStatus;
  project: { id: string; name: string; instituteId: string };
  division: { id: string; name?: string; className?: string; classId?: string };
  // Active cohort code (e.g. CLASS_9_10) — selects the right form/assessment bank.
  cohort?: { code: string; name: string };
  // Derived stage + red-flag, computed live by the backend (never stored).
  stageLabel?: string;
  isFlagged?: boolean;
  flagReason?: string | null;
}
