export type ProjectStatus = 'active' | 'closed' | 'deleted';

export interface Project {
  id: string;
  name: string;
  instituteName: string;
  counselorCount: number;
  studentCount: number;
  status: ProjectStatus;
  previousStatus?: ProjectStatus;
  validFrom: string;
  validTo: string;
  location?: string;
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
  password?: string;
  sessionDate?: string;
  timeSlot?: string;
  sessionType?: 'S1' | 'S2';
}

export interface InstituteDetails {
  name: string;
  email: string;
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
  counselorName: string;
  counselorEmail: string;
  counselorPhone: string;
  timeSlots: TimeSlot[];
  assignedStudents: ProjectStudent[];
}

export interface StudentSessionDetail {
  sessionNumber: 1 | 2;
  status: 'completed' | 'scheduled' | 'pending';
  date: string;
  timeSlot: string;
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

export interface ProjectStudentDetail {
  id: string;
  name: string;
  email: string;
  mobile: string;
  parentMobile?: string;
  grade: string;
  session1: StudentSessionDetail;
  session2: StudentSessionDetail;
  comments?: StudentComment[];
}

export interface CreateProjectPayload {
  instituteDetails: InstituteDetails;
  counselors: ProjectCounselor[];
  students: ProjectStudent[];
}
