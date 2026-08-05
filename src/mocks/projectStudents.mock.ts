import { ProjectStudentDetail } from '@/types/project.types';

const counselorsList = [
  { name: 'Anil Iyer', email: 'anil.iyer1@outlook.com' },
  { name: 'Mahesh Pillai', email: 'mahesh.pillai2@rediffmail.com' },
  { name: 'Hema Kurup', email: 'hema.kurup3@yahoo.com' },
  { name: 'Girish Bhat', email: 'girish.bhat4@rediffmail.com' },
  { name: 'Manoj Chacko', email: 'manoj.chacko5@yahoo.com' },
];

const timeSlots = [
  '09:30 AM - 10:30 AM',
  '11:00 AM - 12:00 PM',
  '02:00 PM - 03:00 PM',
  '04:00 PM - 05:00 PM',
];

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
    const c1 = counselorsList[i % counselorsList.length];
    const c2 = counselorsList[(i + 2) % counselorsList.length];

    const s1Status: 'completed' | 'scheduled' | 'pending' =
      i % 3 === 0 ? 'completed' : i % 3 === 1 ? 'scheduled' : 'pending';
    const s2Status: 'completed' | 'scheduled' | 'pending' =
      s1Status === 'completed' ? (i % 2 === 0 ? 'completed' : 'scheduled') : 'pending';

    students.push({
      id: `std-det-${i}`,
      name: `${fname} ${lname}`,
      email: `${fname.toLowerCase()}.${lname.toLowerCase()}${i}@student.edu`,
      mobile: `+91 98${(10000000 + i * 12345).toString().slice(0, 8)}`,
      grade,
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
    });
  }

  return students;
};

export const mockProjectStudents: Record<string, ProjectStudentDetail[]> = {
  'proj-001': generateProjectStudents(60),
};
