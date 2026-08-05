import { CounselorSession, ProjectStudent } from '@/types/project.types';

const generateStudents = (count: number): ProjectStudent[] => {
  const firstNames = ['Aarav', 'Ananya', 'Rohan', 'Priya', 'Siddharth', 'Kavya', 'Vikram', 'Meera', 'Dev', 'Neha', 'Aditya', 'Ishita', 'Karan', 'Sneha', 'Rahul', 'Diya'];
  const lastNames = ['Sharma', 'Verma', 'Patel', 'Roy', 'Nair', 'Gupta', 'Menon', 'Joshi', 'Singh', 'Rao', 'Bhat', 'Iyer', 'Pillai', 'Kumar', 'Reddy', 'Chaudhary'];
  const grades = ['10th', '11th', '12th'];

  const students: ProjectStudent[] = [];
  for (let i = 1; i <= count; i++) {
    const fname = firstNames[i % firstNames.length];
    const lname = lastNames[(i * 3) % lastNames.length];
    const grade = grades[i % grades.length];
    students.push({
      name: `${fname} ${lname}`,
      email: `${fname.toLowerCase()}.${lname.toLowerCase()}${i}@student.edu`,
      mobile: `+91 98${(10000000 + i * 12345).toString().slice(0, 8)}`,
      grade,
    });
  }
  return students;
};

export const mockProjectSessions: Record<string, CounselorSession[]> = {
  'proj-001': [
    {
      id: 'cs-101',
      counselorId: 'C001',
      counselorName: 'Anil Iyer',
      counselorEmail: 'anil.iyer1@outlook.com',
      counselorPhone: '+91 98190 93786',
      timeSlots: [
        { id: 'slot-1', time: '09:30 AM - 10:30 AM', isSelected: true },
        { id: 'slot-2', time: '11:00 AM - 12:00 PM', isSelected: false },
        { id: 'slot-3', time: '02:00 PM - 03:00 PM', isSelected: false },
        { id: 'slot-4', time: '04:00 PM - 05:00 PM', isSelected: false },
      ],
      assignedStudents: generateStudents(120),
    },
    {
      id: 'cs-102',
      counselorId: 'C002',
      counselorName: 'Mahesh Pillai',
      counselorEmail: 'mahesh.pillai2@rediffmail.com',
      counselorPhone: '+91 91895 55979',
      timeSlots: [
        { id: 'slot-1', time: '09:30 AM - 10:30 AM', isSelected: false },
        { id: 'slot-2', time: '11:00 AM - 12:00 PM', isSelected: true },
        { id: 'slot-3', time: '02:00 PM - 03:00 PM', isSelected: false },
        { id: 'slot-4', time: '04:00 PM - 05:00 PM', isSelected: false },
      ],
      assignedStudents: generateStudents(95),
    },
    {
      id: 'cs-103',
      counselorId: 'C003',
      counselorName: 'Hema Kurup',
      counselorEmail: 'hema.kurup3@yahoo.com',
      counselorPhone: '+91 90342 36671',
      timeSlots: [
        { id: 'slot-1', time: '09:30 AM - 10:30 AM', isSelected: false },
        { id: 'slot-2', time: '11:00 AM - 12:00 PM', isSelected: false },
        { id: 'slot-3', time: '02:00 PM - 03:00 PM', isSelected: true },
        { id: 'slot-4', time: '04:00 PM - 05:00 PM', isSelected: false },
      ],
      assignedStudents: generateStudents(110),
    },
    {
      id: 'cs-104',
      counselorId: 'C004',
      counselorName: 'Girish Bhat',
      counselorEmail: 'girish.bhat4@rediffmail.com',
      counselorPhone: '+91 99952 89078',
      timeSlots: [
        { id: 'slot-1', time: '09:30 AM - 10:30 AM', isSelected: false },
        { id: 'slot-2', time: '11:00 AM - 12:00 PM', isSelected: false },
        { id: 'slot-3', time: '02:00 PM - 03:00 PM', isSelected: false },
        { id: 'slot-4', time: '04:00 PM - 05:00 PM', isSelected: true },
      ],
      assignedStudents: generateStudents(85),
    },
  ],
};
