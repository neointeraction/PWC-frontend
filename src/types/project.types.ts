export type ProjectStatus = 'active' | 'closed';

export interface Project {
  id: string;
  name: string;
  instituteId: string;
  instituteName: string;
  counselorCount: number;
  studentCount: number;
  status: ProjectStatus;
  fromDate: string;
  toDate: string;
  // Back-compat aliases used by existing table/UI code.
  validFrom: string;
  validTo: string;
  createdAt: string;
}

export interface ProjectFilterParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface CreateProjectPayload {
  instituteId: string;
  name: string;
  fromDate: string;
  toDate: string;
}

// --- Legacy shapes still used by the (not-yet-rebound) Sessions mock flows ---

export interface ProjectCounselor {
  name: string;
  email: string;
  mobile: string;
  matchStatus: 'matched' | 'new';
}

export interface ProjectStudent {
  name: string;
  email: string;
  mobile: string;
  grade: string;
  sessionDate?: string;
  timeSlot?: string;
  sessionType?: 'S1' | 'S2';
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

export interface ProjectStudentDetail {
  id: string;
  name: string;
  email: string;
  mobile: string;
  grade: string;
  session1: StudentSessionDetail;
  session2: StudentSessionDetail;
}
