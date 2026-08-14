// Real, backend-bound student enrollment records (POST/GET /api/v1/students) —
// distinct from the mock `Student`/`studentService` in student.types.ts, which
// backs the (still-mocked) Counselor Dashboard's assigned-students view.

export interface EnrolledStudent {
  id: string;
  studentCode: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  mobile: string;
  whatsappNumber?: string;
  projectId: string;
  projectName: string;
  divisionId: string;
  divisionName: string;
  className: string;
  parentMobile: string;
  parentEmail: string;
  fatherName: string;
  fatherOccupation: string;
  fatherEmployer?: string;
  motherName: string;
  motherOccupation: string;
  motherEmployer?: string;
  workflowStatus: string;
  createdAt: string;
}

export interface CreateEnrolledStudentInput {
  studentCode: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  whatsappNumber?: string;
  projectId: string;
  divisionId: string;
  parentMobile: string;
  parentEmail: string;
  fatherName: string;
  fatherOccupation: string;
  fatherEmployer?: string;
  motherName: string;
  motherOccupation: string;
  motherEmployer?: string;
}

export interface CreateEnrolledStudentResult {
  student: EnrolledStudent;
  tempPassword: string;
}
