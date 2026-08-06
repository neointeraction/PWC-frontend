export interface UpcomingSession {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentGrade: string;
  institutionName: string;
  sessionTitle: string;
  dateTime: string;
  meetUrl: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  assessmentSheet: {
    aptitudeScore: string;
    topInterests: string[];
    personalityType: string;
    academicPerformance: string;
    counselorNotes: string;
    actionItems: string;
  };
}

// Generate realistic mock sessions with one starting soon (within 30 mins) for live JOIN button testing
const getMockUpcomingSessions = (): UpcomingSession[] => {
  const now = new Date();
  const soonDate = new Date(now.getTime() + 15 * 60 * 1000); // 15 minutes from now
  const tomorrowDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const nextWeekDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  return [
    {
      id: 'sess-counselor-1',
      studentId: 'stud-101',
      studentName: 'Aarav Sharma',
      studentEmail: 'aarav.sharma@pwc-school.edu',
      studentGrade: 'Grade 11 - Science (PCM)',
      institutionName: 'Phoenix Water Club High School',
      sessionTitle: 'Session 1: STEM & Engineering Pathways',
      dateTime: soonDate.toISOString(),
      meetUrl: 'https://meet.google.com/abc-defg-hij',
      status: 'Scheduled',
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
      institutionName: 'Phoenix Water Club High School',
      sessionTitle: 'Session 1: Finance & Global Economics',
      dateTime: tomorrowDate.toISOString(),
      meetUrl: 'https://meet.google.com/xyz-uvwx-rst',
      status: 'Scheduled',
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
      id: 'sess-counselor-3',
      studentId: 'stud-103',
      studentName: 'Rohan Verma',
      studentEmail: 'rohan.verma@pwc-school.edu',
      studentGrade: 'Grade 11 - Arts & Humanities',
      institutionName: 'Phoenix Water Club High School',
      sessionTitle: 'Session 2: Product Design & UX Research',
      dateTime: nextWeekDate.toISOString(),
      meetUrl: 'https://meet.google.com/mno-pqrs-tuv',
      status: 'Scheduled',
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
  ];
};

export const UPCOMING_SESSIONS_MOCK = getMockUpcomingSessions();
