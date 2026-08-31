import { ProjectStudentDetail } from '@/types/project.types';

const counselorsList = [
  { id: 'COU-01', name: 'Dr. Rajeshwari Menon', email: 'rajeshwari.menon@pwc.edu' },
  { id: 'COU-02', name: 'Anil Iyer', email: 'anil.iyer@pwc.edu' },
  { id: 'COU-03', name: 'Mahesh Pillai', email: 'mahesh.pillai@pwc.edu' },
  { id: 'COU-04', name: 'Hema Kurup', email: 'hema.kurup@pwc.edu' },
  { id: 'COU-05', name: 'Girish Bhat', email: 'girish.bhat@pwc.edu' },
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

const parentFirstNames = [
  'Sunita', 'Rajesh', 'Deepak', 'Anita', 'Manoj', 'Pooja', 'Suresh', 'Kavita',
  'Ramesh', 'Shobha', 'Ajay', 'Meenakshi', 'Alok', 'Neelam', 'Sanjay', 'Vandana',
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
  const grades = ['Grade 10', 'Grade 11', 'Grade 12'];

  const students: ProjectStudentDetail[] = [];

  for (let i = 1; i <= count; i++) {
    const fname = firstNames[i % firstNames.length];
    const lname = lastNames[(i * 3) % lastNames.length];
    const parentFname = parentFirstNames[i % parentFirstNames.length];
    const relation = i % 2 === 0 ? 'Mother' : 'Father';
    const grade = grades[i % grades.length];
    const stage = PROJECT_STAGES[(i * 3 + 2) % PROJECT_STAGES.length];
    const counselor = counselorsList[i % counselorsList.length];

    // Days since completed the stage (e.g. 1 to 6 days ago)
    const daysInStage = (i % 6) + 1;
    const stageDate = new Date(Date.now() - daysInStage * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    const isFlagged = daysInStage > 2;

    const s1Status: 'completed' | 'scheduled' | 'pending' =
      i % 3 === 0 ? 'completed' : i % 3 === 1 ? 'scheduled' : 'pending';
    const s2Status: 'completed' | 'scheduled' | 'pending' =
      s1Status === 'completed' ? (i % 2 === 0 ? 'completed' : 'scheduled') : 'pending';

    const followUpHistory =
      i % 2 === 0
        ? [
            {
              id: `fu-${i}-1`,
              stage: stage,
              date: '2026-08-20',
              timestamp: '2026-08-20 11:30 AM',
              type: 'whatsapp' as const,
              recipient: 'both' as const,
              notes: 'WhatsApp reminder sent for pending stage.',
            },
          ]
        : [];

    students.push({
      id: `std-det-${i}`,
      studentId: `ST${100 + i}`,
      name: `${fname} ${lname}`,
      email: `${fname.toLowerCase()}.${lname.toLowerCase()}${i}@student.edu`,
      mobile: `98${(10000000 + i * 12345).toString().slice(0, 8)}`,
      parentName: `${parentFname} ${lname} (${relation})`,
      parentMobile: `98${(19000000 + i * 23456).toString().slice(0, 8)}`,
      parentEmail: `${parentFname.toLowerCase()}.${lname.toLowerCase()}${i}@gmail.com`,
      grade,
      counselorId: counselor.id,
      counselorName: counselor.name,
      stage,
      stageCompletedDate: stageDate,
      daysInStage,
      followUpHistory,
      lastFollowUpDate: followUpHistory.length > 0 ? '2026-08-20' : undefined,
      session1: {
        sessionNumber: 1,
        status: s1Status,
        date: `2026-08-${(10 + (i % 5)).toString().padStart(2, '0')}`,
        timeSlot: timeSlots[i % timeSlots.length],
        counselorName: counselor.name,
        counselorEmail: counselor.email,
      },
      session2: {
        sessionNumber: 2,
        status: s2Status,
        date: `2026-08-${(17 + (i % 5)).toString().padStart(2, '0')}`,
        timeSlot: timeSlots[(i + 1) % timeSlots.length],
        counselorName: counselorsList[(i + 1) % counselorsList.length].name,
        counselorEmail: counselorsList[(i + 1) % counselorsList.length].email,
      },
      isFlagged,
    });
  }

  return students;
};

export const mockProjectStudents: Record<string, ProjectStudentDetail[]> = {
  'proj-001': generateProjectStudents(60),
};
