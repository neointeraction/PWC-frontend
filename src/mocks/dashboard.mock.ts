export const DASHBOARD_MOCKS = {
  stats: {
    totalProjects: 12,
    totalCounselors: 8,
    totalStudents: 156,
    totalSessions: 45,
  },
  projects: [
    {
      id: 'proj-1',
      name: 'Spring 2026 Batch A',
      endDate: '2026-05-30',
      counselors: 3,
      students: 45,
      sessions: 12,
    },
    {
      id: 'proj-2',
      name: 'Summer Intensive',
      endDate: '2026-08-15',
      counselors: 2,
      students: 28,
      sessions: 8,
    },
    {
      id: 'proj-3',
      name: 'Fall 2026 Prep',
      endDate: '2026-12-10',
      counselors: 5,
      students: 83,
      sessions: 25,
    },
  ],
  upcomingSessions: [
    {
      id: 'sess-1',
      title: 'Career Planning Strategy',
      counselor: 'Sarah Connor',
      date: '2026-08-05T10:00:00Z',
    },
    {
      id: 'sess-2',
      title: 'Mock Interview Prep',
      counselor: 'John Smith',
      date: '2026-08-05T14:00:00Z',
    },
    {
      id: 'sess-3',
      title: 'College Application Review',
      counselor: 'Emily Chen',
      date: '2026-08-06T09:30:00Z',
    },
  ],
  careerRequests: [
    {
      id: 'req-1',
      title: 'Quantum Computing Researcher',
      requestedBy: 'Alex Johnson',
      date: '2026-08-03',
    },
    {
      id: 'req-2',
      title: 'AI Ethics Consultant',
      requestedBy: 'Sarah Connor',
      date: '2026-08-02',
    },
  ],
  studentSessionProgress: [
    { name: 'Completed', value: 310, fill: 'var(--chart-success, #10B981)' },
    { name: 'Pending', value: 140, fill: 'var(--chart-warning, #F59E0B)' },
  ],
  counselorReportStatuses: [
    { name: 'Submitted', value: 18, fill: 'var(--chart-primary, #3B82F6)' },
    { name: 'Pending', value: 7, fill: 'var(--chart-danger, #EF4444)' },
  ],
  pendingReports: [
    {
      id: 'rep-1',
      studentName: 'Alex Johnson',
      counselorName: 'Sarah Connor',
      dueDate: '2026-08-01',
      status: 'Overdue',
    },
    {
      id: 'rep-2',
      studentName: 'Maria Garcia',
      counselorName: 'John Smith',
      dueDate: '2026-08-05',
      status: 'Pending',
    },
    {
      id: 'rep-3',
      studentName: 'David Kim',
      counselorName: 'Emily Chen',
      dueDate: '2026-08-06',
      status: 'Pending',
    },
  ],
};
