export type ProjectStatus = 'active' | 'draft' | 'completed';

export interface Project {
  id: string;
  name: string;
  instituteName: string;
  counselorCount: number;
  studentCount: number;
  status: ProjectStatus;
  validFrom: string;
  validTo: string;
  createdAt?: string;
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
  name: string;
  email: string;
  mobile: string;
  grade: string;
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

export interface ProjectStudentDetail {
  id: string;
  name: string;
  email: string;
  mobile: string;
  grade: string;
  session1: StudentSessionDetail;
  session2: StudentSessionDetail;
}

export interface CreateProjectPayload {
  instituteDetails: InstituteDetails;
  counselors: ProjectCounselor[];
  students: ProjectStudent[];
}
