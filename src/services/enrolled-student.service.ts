import { apiClient } from './api';
import { getApiErrorMessage } from '@/utils';
import {
  EnrolledStudent,
  CreateEnrolledStudentInput,
  CreateEnrolledStudentResult,
} from '@/types/enrolled-student.types';

interface ApiEnrolledStudent {
  id: string;
  studentCode: string;
  mobile: string;
  whatsappNumber: string | null;
  parentMobile: string;
  parentEmail: string;
  fatherName: string;
  fatherOccupation: string;
  fatherEmployer: string | null;
  motherName: string;
  motherOccupation: string;
  motherEmployer: string | null;
  workflowStatus: string;
  createdAt: string;
  user: { id: string; email: string; firstName: string; lastName: string; isActive: boolean };
  project: { id: string; name: string; instituteId: string };
  division: { id: string; name: string; class: { id: string; name: string; instituteId: string } };
}

const mapStudent = (s: ApiEnrolledStudent): EnrolledStudent => ({
  id: s.id,
  studentCode: s.studentCode,
  firstName: s.user.firstName,
  lastName: s.user.lastName,
  name: `${s.user.firstName} ${s.user.lastName}`.trim(),
  email: s.user.email,
  mobile: s.mobile,
  whatsappNumber: s.whatsappNumber || undefined,
  projectId: s.project.id,
  projectName: s.project.name,
  divisionId: s.division.id,
  divisionName: s.division.name,
  className: s.division.class.name,
  parentMobile: s.parentMobile,
  parentEmail: s.parentEmail,
  fatherName: s.fatherName,
  fatherOccupation: s.fatherOccupation,
  fatherEmployer: s.fatherEmployer || undefined,
  motherName: s.motherName,
  motherOccupation: s.motherOccupation,
  motherEmployer: s.motherEmployer || undefined,
  workflowStatus: s.workflowStatus,
  createdAt: s.createdAt,
});

export const enrolledStudentService = {
  getAll: async (params: { projectId?: string; divisionId?: string } = {}): Promise<EnrolledStudent[]> => {
    const { data } = await apiClient.get<ApiEnrolledStudent[]>('/students', { params });
    return data.map(mapStudent);
  },

  getById: async (id: string): Promise<EnrolledStudent> => {
    const { data } = await apiClient.get<ApiEnrolledStudent>(`/students/${id}`);
    return mapStudent(data);
  },

  // Returns the temp password alongside the record — shown once, per the API contract.
  create: async (input: CreateEnrolledStudentInput): Promise<CreateEnrolledStudentResult> => {
    const { data } = await apiClient.post<{ student: ApiEnrolledStudent; tempPassword: string }>(
      '/students',
      input
    );
    return { student: mapStudent(data.student), tempPassword: data.tempPassword };
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/students/${id}`);
  },

  // No bulk-create endpoint exists — sequential individual creates, collecting
  // per-row failures instead of aborting the whole batch (mirrors counselorService.bulkCreate).
  async bulkCreate(
    inputs: CreateEnrolledStudentInput[]
  ): Promise<{
    succeeded: CreateEnrolledStudentResult[];
    failed: { input: CreateEnrolledStudentInput; message: string }[];
  }> {
    const succeeded: CreateEnrolledStudentResult[] = [];
    const failed: { input: CreateEnrolledStudentInput; message: string }[] = [];

    for (const input of inputs) {
      try {
        succeeded.push(await enrolledStudentService.create(input));
      } catch (err) {
        failed.push({ input, message: getApiErrorMessage(err) });
      }
    }

    return { succeeded, failed };
  },
};
