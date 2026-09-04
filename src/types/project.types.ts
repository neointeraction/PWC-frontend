export type ProjectStatus = 'active' | 'closed' | 'deleted';

export interface Project {
  id: string;
  code?: string;
  name: string;
  instituteId?: string;
  instituteName: string;
  counselorCount: number;
  studentCount: number;
  status: ProjectStatus;
  previousStatus?: ProjectStatus;
  validFrom: string;
  validTo: string;
  location?: string;
  email?: string;
  phone?: string;
  createdAt?: string;
  hasRedFlag?: boolean;
}

export interface ProjectFilterParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface CounsellorSlotRow {
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
}

export interface ProjectCounselor {
  name: string;
  email: string;
  mobile: string;
  matchStatus: 'matched' | 'new';
  // Set from the availability-sheet flow: the counsellor's directory code, the
  // matched backend id (when found), and their parsed availability slots.
  counsellorCode?: string;
  directoryId?: string;
  slots?: CounsellorSlotRow[];
}

export interface ProjectStudent {
  studentId?: string;
  name: string;
  email: string;
  mobile: string;
  grade: string;
  // Extended fields parsed from the real import sheet (not shown in the preview
  // table) — used when bulk-creating students against the backend.
  division?: string;
  parentName?: string;
  parentMobile?: string;
  parentEmail?: string;
  whatsappNumber?: string;
  password?: string;
  sessionDate?: string;
  timeSlot?: string;
  sessionType?: 'S1' | 'S2';
  isMissed?: boolean;
}

export interface StudentDuplicateMatch {
  field: string;
  value: string;
  projectName: string;
}

export interface StudentDuplicateCheckResult {
  index: number;
  isDuplicate: boolean;
  matches: StudentDuplicateMatch[];
}

export interface InstituteDetails {
  instituteId: string;
  name: string;
  email: string;
  location: string;
  phone: string;
  validFrom: string;
  validTo: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  isSelected: boolean;
}

export interface CounselorSession {
  id: string;
  counselorId: string;
  counselorCode: string;
  counselorName: string;
  counselorEmail: string;
  counselorPhone: string;
  timeSlots: TimeSlot[];
  slots: ProjectSlot[];
  assignedStudents: ProjectStudent[];
}

// One row of a counsellor's schedule table: an availability slot, plus the booking
// sitting in it when there is one. A session booked by an admin outside the slot
// inventory (POST /sessions) has no slot behind it and still gets a row.
export interface ProjectSlot {
  id: string;
  sessionId?: string;
  // Display strings the table renders directly ("18 Feb 2026", "09:30 - 10:30").
  date: string;
  time: string;
  // Raw values the session endpoints need back.
  slotDate: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  isMissed?: boolean;
  studentId?: string;
  studentName?: string;
  studentCode?: string;
  studentEmail?: string;
  mobile?: string;
  grade?: string;
  sessionType?: 'S1' | 'S2';
  notes?: string;
  meetingLink?: string;
}

export interface StudentSessionDetail {
  sessionNumber: 1 | 2;
  status: 'completed' | 'scheduled' | 'pending';
  date: string;
  timeSlot: string;
  counselorId?: string;
  counselorName: string;
  counselorEmail: string;
}

export interface StudentComment {
  id: string;
  session: string;
  comment: string;
  createdAt: string;
  by?: string;
}

export interface FollowUpRecord {
  id: string;
  stage: string;
  date: string;
  timestamp: string;
  type: 'whatsapp' | 'email' | 'call' | 'manual';
  recipient: 'student' | 'parent' | 'both';
  notes?: string;
}

export interface ProjectStudentDetail {
  id: string;
  studentId?: string;
  name: string;
  email: string;
  mobile: string;
  parentName?: string;
  parentMobile?: string;
  parentEmail?: string;
  whatsappNumber?: string;
  grade: string;
  className?: string;
  division?: string;
  counselorId?: string;
  counselorName?: string;
  stage?: string;
  stageCompletedDate?: string;
  daysInStage?: number;
  session1?: StudentSessionDetail;
  session2?: StudentSessionDetail;
  comments?: StudentComment[];
  followUpHistory?: FollowUpRecord[];
  lastFollowUpDate?: string;
  isFlagged?: boolean;
  // Reason behind the derived 🚩 flag (backend stageInfo) — drives the flag tooltip.
  flagReason?: 'IDLE' | 'MISSED_SESSION' | null;
}

export interface CreateProjectPayload {
  instituteDetails: InstituteDetails;
  counselors: ProjectCounselor[];
  students: ProjectStudent[];
}
