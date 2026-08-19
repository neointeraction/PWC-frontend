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
        { id: 'slot-1', time: '09:30 - 10:30', isSelected: true },
        { id: 'slot-2', time: '11:00 - 12:00', isSelected: false },
        { id: 'slot-3', time: '14:00 - 15:00', isSelected: false },
        { id: 'slot-4', time: '16:00 - 17:00', isSelected: false },
      ],
      assignedStudents: [
        {
          name: 'Ananya Roy',
          email: 'ananya.roy1@student.edu',
          mobile: '+91 9810012345',
          grade: '11th',
          sessionDate: '18-02-2026',
          timeSlot: '09:30 - 10:30',
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
        { id: 'slot-1', time: '09:30 - 10:30', isSelected: false },
        { id: 'slot-2', time: '11:00 - 12:00', isSelected: true },
        { id: 'slot-3', time: '14:00 - 15:00', isSelected: false },
        { id: 'slot-4', time: '16:00 - 17:00', isSelected: false },
      ],
      assignedStudents: [
        {
          name: 'Rohan Menon',
          email: 'rohan.menon2@student.edu',
          mobile: '+91 9810024690',
          grade: '12th',
          sessionDate: '18-02-2026',
          timeSlot: '11:00 - 12:00',
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
        { id: 'slot-1', time: '09:30 - 10:30', isSelected: false },
        { id: 'slot-2', time: '11:00 - 12:00', isSelected: false },
        { id: 'slot-3', time: '14:00 - 15:00', isSelected: true },
        { id: 'slot-4', time: '16:00 - 17:00', isSelected: false },
      ],
      assignedStudents: [
        {
          name: 'Priya Rao',
          email: 'priya.rao3@student.edu',
          mobile: '+91 9810037035',
          grade: '10th',
          sessionDate: '19-02-2026',
          timeSlot: '14:00 - 15:00',
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
        { id: 'slot-1', time: '09:30 - 10:30', isSelected: false },
        { id: 'slot-2', time: '11:00 - 12:00', isSelected: false },
        { id: 'slot-3', time: '14:00 - 15:00', isSelected: false },
        { id: 'slot-4', time: '16:00 - 17:00', isSelected: true },
      ],
      assignedStudents: [
        {
          name: 'Vikram Kumar',
          email: 'vikram.kumar4@student.edu',
          mobile: '+91 9810049380',
          grade: '11th',
          sessionDate: '19-02-2026',
          timeSlot: '16:00 - 17:00',
          sessionType: 'S2',
        },
      ],
    },
  ],
};
