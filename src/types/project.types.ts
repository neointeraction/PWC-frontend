export type ProjectStatus = 'active' | 'draft' | 'completed' | 'deleted';

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

export interface ProjectCounselor {
  name: string;
  email: string;
  mobile: string;
  matchStatus: 'matched' | 'new';
}

export interface ProjectStudent {
  studentId?: string;
  name: string;
  email: string;
  mobile: string;
  grade: string;
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
  grade: string;
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
  isDiscontinued?: boolean;
}

export interface CreateProjectPayload {
  instituteDetails: InstituteDetails;
  counselors: ProjectCounselor[];
  students: ProjectStudent[];
}
