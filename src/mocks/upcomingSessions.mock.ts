export interface UpcomingSession {
  id: string;
  studentId?: string;
  studentName?: string;
  studentEmail?: string;
  studentGrade?: string;
  institutionName: string;
  projectName?: string;
  sessionNumber?: 'S1' | 'S2';
  sessionTitle: string;
  dateTime: string;
  timeSlot: string;
  meetUrl?: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Available';
  isBooked: boolean;
  assessmentSheet?: {
    aptitudeScore: string;
    topInterests: string[];
    personalityType: string;
    academicPerformance: string;
    counselorNotes: string;
    actionItems: string;
  };
}

// Function to generate fresh mock sessions with an active session (starting in 10 mins) at runtime
export const getMockUpcomingSessions = (): UpcomingSession[] => {
  const now = new Date();
  const soonDate = new Date(now.getTime() + 10 * 60 * 1000); // 10 mins from current time
  const tomorrowDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const nextWeekDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  return [
    {
      id: 'sess-counselor-1',
      studentId: 'stud-101',
      studentName: 'Aarav Sharma',
      studentEmail: 'aarav.sharma@pwc-school.edu',
      studentGrade: 'Grade 11 - Science (PCM)',
      institutionName: "St. Xavier's College, Mumbai",
      projectName: "St. Xavier's Career Guidance 2026",
      sessionNumber: 'S1',
      sessionTitle: 'Session 1: STEM & Engineering Pathways',
      dateTime: soonDate.toISOString(),
      timeSlot: '09:30 - 10:30',
      meetUrl: 'https://meet.google.com/abc-defg-hij',
      status: 'Scheduled',
      isBooked: true,
      assessmentSheet: {
        aptitudeScore: '94/100 (Quantitative & Spatial Aptitude)',
        topInterests: ['Computer Science & AI', 'Robotics', 'Data Analytics'],
        personalityType: 'INTJ - Strategic & Analytical Thinker',
        academicPerformance: 'Mathematics: 98%, Physics: 92%, Chemistry: 89%',
        counselorNotes:
          'Aarav demonstrates exceptional logical reasoning skills. Recommending B.Tech Computer Science with specialization in AI/ML.',
        actionItems:
          '1. Research top tier engineering entrance exam deadlines.\n2. Complete programming interest module on kREATE.',
      },
    },
    {
      id: 'sess-counselor-2',
      studentId: 'stud-102',
      studentName: 'Priya Patel',
      studentEmail: 'priya.patel@pwc-school.edu',
      studentGrade: 'Grade 12 - Commerce',
      institutionName: "St. Xavier's College, Mumbai",
      projectName: "St. Xavier's Career Guidance 2026",
      sessionNumber: 'S2',
      sessionTitle: 'Session 2: Finance & Global Economics',
      dateTime: tomorrowDate.toISOString(),
      timeSlot: '09:30 - 10:30',
      meetUrl: 'https://meet.google.com/xyz-uvwx-rst',
      status: 'Scheduled',
      isBooked: true,
      assessmentSheet: {
        aptitudeScore: '89/100 (Verbal & Analytical Reasoning)',
        topInterests: ['Investment Banking', 'Chartered Accountancy', 'Corporate Law'],
        personalityType: 'ESTJ - Organized & Leadership Driven',
        academicPerformance: 'Economics: 95%, Accountancy: 96%, English: 90%',
        counselorNotes:
          'Priya has high interest in financial modeling and capital markets. Discussing B.Com (Hons) vs BBA Finance options.',
        actionItems:
          '1. Prepare resume outline for internship applications.\n2. Take mock financial aptitude assessment.',
      },
    },
    {
      id: 'sess-counselor-slot-1',
      institutionName: "St. Xavier's College, Mumbai",
      projectName: "St. Xavier's Career Guidance 2026",
      sessionNumber: 'S1',
      sessionTitle: 'Available Slot - Session 1',
      dateTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      timeSlot: '11:00 - 12:00',
      status: 'Available',
      isBooked: false,
    },
    {
      id: 'sess-counselor-3',
      studentId: 'stud-103',
      studentName: 'Rohan Verma',
      studentEmail: 'rohan.verma@pwc-school.edu',
      studentGrade: 'Grade 11 - Arts & Humanities',
      institutionName: 'Delhi Public School, Kochi',
      projectName: 'DPS Kochi Senior Counselling',
      sessionNumber: 'S1',
      sessionTitle: 'Session 1: Product Design & UX Research',
      dateTime: nextWeekDate.toISOString(),
      timeSlot: '14:00 - 15:00',
      meetUrl: 'https://meet.google.com/mno-pqrs-tuv',
      status: 'Scheduled',
      isBooked: true,
      assessmentSheet: {
        aptitudeScore: '91/100 (Visual Design & Empathy Profiling)',
        topInterests: ['UI/UX Design', 'Industrial Product Design', 'Digital Media'],
        personalityType: 'ENFP - Creative & Innovative Communicator',
        academicPerformance: 'Design & Arts: 97%, Psychology: 94%, Literature: 91%',
        counselorNotes:
          'Rohan has a strong design portfolio. Guiding towards Bachelor of Design (B.Des) programs in top tier institutes.',
        actionItems:
          '1. Finalize 5 portfolio projects.\n2. Apply for national design entrance test practice series.',
      },
    },
    {
      id: 'sess-counselor-slot-2',
      institutionName: 'Delhi Public School, Kochi',
      projectName: 'DPS Kochi Senior Counselling',
      sessionNumber: 'S2',
      sessionTitle: 'Available Slot - Session 2',
      dateTime: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      timeSlot: '15:30 - 16:30',
      status: 'Available',
      isBooked: false,
    },
  ];
};

export const getAllMockSessions = (): UpcomingSession[] => {
  const upcoming = getMockUpcomingSessions();
  const pastDate1 = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
  const pastDate2 = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
  const pastDate3 = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);

  const completed: UpcomingSession[] = [
    {
      id: 'sess-counselor-4',
      studentId: 'stud-104',
      studentName: 'Ananya Iyer',
      studentEmail: 'ananya.iyer@pwc-school.edu',
      studentGrade: 'Grade 12 - Science (PCB)',
      institutionName: "St. Xavier's College, Mumbai",
      projectName: "St. Xavier's Career Guidance 2026",
      sessionNumber: 'S2',
      sessionTitle: 'Session 2: Biotechnology & Medical Sciences',
      dateTime: pastDate1.toISOString(),
      timeSlot: '09:30 - 10:30',
      meetUrl: 'https://meet.google.com/pqr-stuv-wxy',
      status: 'Completed',
      isBooked: true,
      assessmentSheet: {
        aptitudeScore: '96/100 (Biological & Clinical Reasoning)',
        topInterests: ['Biomedical Engineering', 'Genetics', 'Neuroscience'],
        personalityType: 'INFJ - Insightful & Dedicated Researcher',
        academicPerformance: 'Biology: 99%, Chemistry: 95%, English: 92%',
        counselorNotes: 'Completed comprehensive stream & pathway selection. Student aims for medical research.',
        actionItems: '1. Reviewed NEET and IISER research tracks.\n2. Finalized IKIGAI report.',
      },
    },
    {
      id: 'sess-counselor-5',
      studentId: 'stud-105',
      studentName: 'Siddharth Nair',
      studentEmail: 'siddharth.nair@pwc-school.edu',
      studentGrade: 'Grade 10 - Foundation',
      institutionName: 'Loyola College, Chennai',
      projectName: 'Loyola Career Compass Project',
      sessionNumber: 'S1',
      sessionTitle: 'Session 1: Stream Selection Diagnostic',
      dateTime: pastDate2.toISOString(),
      timeSlot: '11:00 - 12:00',
      meetUrl: 'https://meet.google.com/stu-vwxy-zab',
      status: 'Completed',
      isBooked: true,
      assessmentSheet: {
        aptitudeScore: '92/100 (Logical & Abstract Analysis)',
        topInterests: ['Economics & Data', 'Computational Finance', 'Applied Mathematics'],
        personalityType: 'ENTP - Inventive & Visionary Thinker',
        academicPerformance: 'Mathematics: 97%, Social Studies: 93%, Science: 90%',
        counselorNotes: 'Stream choice confirmed for Commerce with Mathematics.',
        actionItems: '1. Complete Career Compass review with parents.',
      },
    },
    {
      id: 'sess-counselor-6',
      studentId: 'stud-106',
      studentName: 'Kavya Deshmukh',
      studentEmail: 'kavya.deshmukh@pwc-school.edu',
      studentGrade: 'Grade 12 - Humanities',
      institutionName: 'Loyola College, Chennai',
      projectName: 'Loyola Career Compass Project',
      sessionNumber: 'S2',
      sessionTitle: 'Session 2: International Relations & Public Policy',
      dateTime: pastDate3.toISOString(),
      timeSlot: '14:30 - 15:30',
      meetUrl: 'https://meet.google.com/bcd-efgh-ijk',
      status: 'Completed',
      isBooked: true,
      assessmentSheet: {
        aptitudeScore: '95/100 (Verbal Fluency & Critical Debate)',
        topInterests: ['International Relations', 'Public Policy', 'Journalism & Media'],
        personalityType: 'ENFJ - Empathetic & Articulate Leader',
        academicPerformance: 'Political Science: 98%, History: 96%, English: 95%',
        counselorNotes: 'Finalized University applications and statement of purpose outline.',
        actionItems: '1. Submit draft SOP for review.\n2. Attend global university fair.',
      },
    },
  ];

  return [...upcoming, ...completed];
};

export const UPCOMING_SESSIONS_MOCK = getMockUpcomingSessions();
export const ALL_SESSIONS_MOCK = getAllMockSessions();
