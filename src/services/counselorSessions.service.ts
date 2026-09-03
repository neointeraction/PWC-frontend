import { apiClient } from './api';
import { formatFullName } from '@/utils';
import { sessionsService } from './sessions.service';
import { CurrentCounselorProject } from './counselor.service';

// Neither a Session nor a CounsellorSlot carries its institute/project name or the
// student's grade — those live on Project/Institute and Student/Division respectively.
// This composes the counsellor's own sessions + slot inventory with that lookup data
// (GET /projects/{id} for the institute, GET /students?projectId for grade) into the
// row shape the Upcoming/All Sessions screens render.
export interface CounselorSessionRow {
  id: string;
  studentId?: string;
  studentName?: string;
  studentEmail?: string;
  studentGrade?: string;
  institutionName: string;
  projectId?: string;
  projectName?: string;
  sessionNumber?: 'S1' | 'S2';
  sessionTitle: string;
  dateTime: string; // ISO
  timeSlot: string;
  meetUrl?: string;
  isBooked: boolean;
  isCompleted: boolean;
}

export interface CounselorProjectSummary {
  projectId: string;
  code: string;
  name: string;
  instituteName: string;
  instituteAddress: string;
  status: 'ACTIVE' | 'CLOSED' | 'DELETED';
  totalAllotted: number;
  openSlots: number;
  bookedSlots: number;
}

// Institute was merged into Project — address/name live directly on the project row.
interface ApiProjectDetail {
  id: string;
  code?: string | null;
  name: string;
  address?: string;
  status: 'ACTIVE' | 'CLOSED' | 'DELETED';
}

interface ApiStudentGrade {
  id: string;
  className?: string;
  divisionName?: string;
}

const formatGrade = (student: ApiStudentGrade): string => {
  const className = student.className ?? '';
  const divisionName = student.divisionName ?? '';
  if (className && divisionName && divisionName !== className) return `${className} - ${divisionName}`;
  return className || divisionName;
};

export const counselorSessionsService = {
  getBoard: async (
    counsellorId: string,
    projects: CurrentCounselorProject[]
  ): Promise<{ rows: CounselorSessionRow[]; projectSummaries: CounselorProjectSummary[] }> => {
    if (projects.length === 0) {
      return { rows: [], projectSummaries: [] };
    }

    const [projectDetails, studentLists, sessions, slots] = await Promise.all([
      Promise.all(projects.map(p => apiClient.get<ApiProjectDetail>(`/projects/${p.projectId}`))),
      Promise.all(
        projects.map(p => apiClient.get<ApiStudentGrade[]>('/students', { params: { projectId: p.projectId } }))
      ),
      sessionsService.getCounsellorSessions(counsellorId),
      sessionsService.getSlots({ counsellorId }),
    ]);

    const instituteByProject = new Map<string, string>();
    const projectDetailById = new Map<string, ApiProjectDetail>();
    projectDetails.forEach((res, i) => {
      instituteByProject.set(projects[i].projectId, res.data.name ?? '');
      projectDetailById.set(projects[i].projectId, res.data);
    });

    const studentInfo = new Map<string, { projectId: string; grade: string }>();
    studentLists.forEach((res, i) => {
      const projectId = projects[i].projectId;
      res.data.forEach(st => studentInfo.set(st.id, { projectId, grade: formatGrade(st) }));
    });

    const projectName = (projectId: string | undefined) =>
      projects.find(p => p.projectId === projectId)?.name;

    const sessionRows: CounselorSessionRow[] = sessions
      .filter(s => s.status !== 'CANCELLED')
      .map(s => {
        const info = studentInfo.get(s.studentId);
        return {
          id: s.id,
          studentId: s.studentId,
          studentName: formatFullName(s.student.user.firstName, s.student.user.lastName),
          studentEmail: s.student.user.email,
          studentGrade: info?.grade,
          institutionName: instituteByProject.get(info?.projectId ?? '') ?? '',
          projectId: info?.projectId,
          projectName: projectName(info?.projectId),
          sessionNumber: (s.sessionNumber === 'SESSION_1' ? 'S1' : 'S2') as 'S1' | 'S2',
          sessionTitle: `Session ${s.sessionNumber === 'SESSION_1' ? '1' : '2'}`,
          dateTime: `${s.scheduledDate}T${s.startTime}:00`,
          timeSlot: `${s.startTime} - ${s.endTime}`,
          meetUrl: s.counsellor.meetingLink ?? undefined,
          isBooked: true,
          isCompleted: s.status === 'COMPLETED',
        };
      });

    const openSlotRows: CounselorSessionRow[] = slots
      .filter(sl => sl.status === 'OPEN')
      .map(sl => ({
        id: `slot-${sl.id}`,
        institutionName: instituteByProject.get(sl.projectId) ?? '',
        projectId: sl.projectId,
        projectName: projectName(sl.projectId),
        sessionTitle: 'Available Slot',
        dateTime: `${sl.date}T${sl.startTime}:00`,
        timeSlot: `${sl.startTime} - ${sl.endTime}`,
        isBooked: false,
        isCompleted: false,
      }));

    const projectSummaries: CounselorProjectSummary[] = projects.map(p => {
      const projectSlots = slots.filter(sl => sl.projectId === p.projectId);
      const detail = projectDetailById.get(p.projectId);
      return {
        projectId: p.projectId,
        code: detail?.code ?? '',
        name: p.name,
        instituteName: detail?.name ?? '',
        instituteAddress: detail?.address ?? '',
        status: detail?.status ?? 'ACTIVE',
        totalAllotted: projectSlots.length,
        openSlots: projectSlots.filter(sl => sl.status === 'OPEN').length,
        bookedSlots: projectSlots.filter(sl => sl.status === 'BOOKED').length,
      };
    });

    return { rows: [...sessionRows, ...openSlotRows], projectSummaries };
  },
};
