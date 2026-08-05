import { PreCounsellingForm, Student, StudentListResponse } from '@/types';

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

export const studentService = {
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
