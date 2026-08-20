import { ProjectStudentDetail } from '@/types/project.types';

const counselorsList = [
  { name: 'Anil Iyer', email: 'anil.iyer1@outlook.com' },
  { name: 'Mahesh Pillai', email: 'mahesh.pillai2@rediffmail.com' },
  { name: 'Hema Kurup', email: 'hema.kurup3@yahoo.com' },
  { name: 'Girish Bhat', email: 'girish.bhat4@rediffmail.com' },
  { name: 'Manoj Chacko', email: 'manoj.chacko5@yahoo.com' },
];

const timeSlots = [
  '09:30 - 10:30',
  '11:00 - 12:00',
  '14:00 - 15:00',
  '16:00 - 17:00',
];

export const PROJECT_STAGES = [
  'Login Activated',
  'Profile Completed',
  'Pre-Counselling — Student',
  'Pre-Counselling — Parent',
  'Assessment Completed',
  'Session Booked',
  'Session 1 Completed',
  'Session 2 Completed',
  'Feedback — Student',
  'Feedback — Parent',
  'Report Downloaded',
] as const;

const generateProjectStudents = (count: number): ProjectStudentDetail[] => {
  const firstNames = [
    'Aarav', 'Ananya', 'Rohan', 'Priya', 'Siddharth', 'Kavya', 'Vikram', 'Meera',
    'Dev', 'Neha', 'Aditya', 'Ishita', 'Karan', 'Sneha', 'Rahul', 'Diya', 'Kabir', 'Tanvi',
  ];
  const lastNames = [
    'Sharma', 'Verma', 'Patel', 'Roy', 'Nair', 'Gupta', 'Menon', 'Joshi',
    'Singh', 'Rao', 'Bhat', 'Iyer', 'Pillai', 'Kumar', 'Reddy', 'Chaudhary',
  ];
  const grades = ['10th', '11th', '12th'];

  const students: ProjectStudentDetail[] = [];

  for (let i = 1; i <= count; i++) {
    const fname = firstNames[i % firstNames.length];
    const lname = lastNames[(i * 3) % lastNames.length];
    const grade = grades[i % grades.length];
    const stage = PROJECT_STAGES[(i * 3 + 2) % PROJECT_STAGES.length];
    const c1 = counselorsList[i % counselorsList.length];
    const c2 = counselorsList[(i + 2) % counselorsList.length];

    const s1Status: 'completed' | 'scheduled' | 'pending' =
      i % 3 === 0 ? 'completed' : i % 3 === 1 ? 'scheduled' : 'pending';
    const s2Status: 'completed' | 'scheduled' | 'pending' =
      s1Status === 'completed' ? (i % 2 === 0 ? 'completed' : 'scheduled') : 'pending';

    students.push({
      id: `std-det-${i}`,
      studentId: `ST${100 + i}`,
      name: `${fname} ${lname}`,
      email: `${fname.toLowerCase()}.${lname.toLowerCase()}${i}@student.edu`,
      mobile: `+91 98${(10000000 + i * 12345).toString().slice(0, 8)}`,
      grade,
      stage,
      session1: {
        sessionNumber: 1,
        status: s1Status,
        date: `2026-08-${(10 + (i % 5)).toString().padStart(2, '0')}`,
        timeSlot: timeSlots[i % timeSlots.length],
        counselorName: c1.name,
        counselorEmail: c1.email,
      },
      session2: {
        sessionNumber: 2,
        status: s2Status,
        date: `2026-08-${(17 + (i % 5)).toString().padStart(2, '0')}`,
        timeSlot: timeSlots[(i + 1) % timeSlots.length],
        counselorName: c2.name,
        counselorEmail: c2.email,
      },
      isFlagged: i % 3 === 0 || i % 7 === 1,
    });
  }

  return students;
};

export const mockProjectStudents: Record<string, ProjectStudentDetail[]> = {
  'proj-001': generateProjectStudents(60),
};
