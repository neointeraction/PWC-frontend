import { CounselorSession } from '@/types/project.types';

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
      assignedStudents: [
        {
          name: 'Ananya Roy',
          email: 'ananya.roy1@student.edu',
          mobile: '+91 9810012345',
          grade: '11th',
          sessionDate: '18 Feb 2026',
          timeSlot: '09:30 AM - 10:30 AM',
          sessionType: 'S1',
        },
      ],
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
      assignedStudents: [
        {
          name: 'Rohan Menon',
          email: 'rohan.menon2@student.edu',
          mobile: '+91 9810024690',
          grade: '12th',
          sessionDate: '18 Feb 2026',
          timeSlot: '11:00 AM - 12:00 PM',
          sessionType: 'S1',
        },
      ],
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
      assignedStudents: [
        {
          name: 'Priya Rao',
          email: 'priya.rao3@student.edu',
          mobile: '+91 9810037035',
          grade: '10th',
          sessionDate: '19 Feb 2026',
          timeSlot: '02:00 PM - 03:00 PM',
          sessionType: 'S2',
        },
      ],
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
      assignedStudents: [
        {
          name: 'Siddharth Pillai',
          email: 'siddharth.pillai4@student.edu',
          mobile: '+91 9810049380',
          grade: '11th',
          sessionDate: '19 Feb 2026',
          timeSlot: '04:00 PM - 05:00 PM',
          sessionType: 'S1',
        },
      ],
    },
  ],
};
