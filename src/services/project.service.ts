import { apiClient } from './api';
import {
  Project,
  ProjectStatus,
  ProjectFilterParams,
  CreateProjectPayload,
  ProjectCounselor,
  CounselorSession,
  ProjectStudentDetail,
  StudentSessionDetail,
  ProjectStudent,
  TimeSlot,
} from '@/types/project.types';
import { PaginatedResponse } from '@/types/api.types';
import { mockCounselors } from '@/mocks/counselors.mock';
import { mockProjectSessions } from '@/mocks/projectSessions.mock';
import { mockProjectStudents } from '@/mocks/projectStudents.mock';

// ---- Backend project shape (GET /projects — institute + _count) ----
interface ApiProject {
  id: string;
  name: string;
  instituteId: string;
  fromDate: string;
  toDate: string;
  status: 'ACTIVE' | 'CLOSED' | 'DELETED';
  institute?: { id: string; name: string };
  _count?: { students: number; counsellors: number; counsellorSlots: number };
  createdAt?: string;
}

// Directory shape (GET /counsellors) — used to match project uploads by code.
interface ApiCounsellorDir {
  id: string;
  counsellorCode: string;
  mobile: string;
  user?: { firstName: string; lastName: string; email: string };
}

// GET /students?projectId
interface ApiStudent {
  id: string;
  studentCode: string;
  mobile: string;
  parentMobile: string;
  workflowStatus: string;
  user: { firstName: string; lastName: string; email: string };
  division?: { name: string; class?: { name: string } };
}

// GET /sessions?projectId  and  GET /sessions/slots?projectId
interface ApiSession {
  id: string;
  studentId: string;
  sessionNumber: 'SESSION_1' | 'SESSION_2';
  scheduledDate: string;
  startTime: string;
  endTime: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  counsellor?: { id: string; counsellorCode: string; user: { firstName: string; lastName: string; email: string } };
  student?: { id: string; studentCode: string; mobile: string; user: { firstName: string; lastName: string; email: string } };
}
interface ApiSlot {
  id: string;
  slotDate: string;
  startTime: string;
  endTime: string;
  status: 'OPEN' | 'BOOKED';
  counsellor?: { id: string; counsellorCode: string; user: { firstName: string; lastName: string } };
}

const SESSION_STATUS: Record<string, 'completed' | 'scheduled' | 'pending'> = {
  COMPLETED: 'completed',
  SCHEDULED: 'scheduled',
  CANCELLED: 'pending',
};

// workflowStatus → a readable "stage" label for the students table.
const WORKFLOW_STAGE: Record<string, string> = {
  DRAFT: 'Login Activated',
  PROFILE_COMPLETED: 'Profile Completed',
  PRE_COUNSELLING_FORMS_SUBMITTED: 'Pre-Counselling Done',
  ASSESSMENT_PENDING: 'Assessment Pending',
  ASSESSMENT_COMPLETED: 'Assessment Done',
  SESSION_SCHEDULED: 'Session Scheduled',
  SESSION_1_COMPLETED: 'Session 1 Done',
  SESSION_2_COMPLETED: 'Session 2 Done',
  COMPLETED: 'Completed',
};

const API_TO_STATUS: Record<string, ProjectStatus> = {
  ACTIVE: 'active',
  CLOSED: 'closed',
  DELETED: 'deleted',
};
const STATUS_TO_API: Record<string, string> = {
  active: 'ACTIVE',
  closed: 'CLOSED',
  deleted: 'DELETED',
};

const mapProject = (p: ApiProject): Project => ({
  id: p.id,
  name: p.name,
  instituteName: p.institute?.name ?? '',
  counselorCount: p._count?.counsellors ?? 0,
  studentCount: p._count?.students ?? 0,
  status: API_TO_STATUS[p.status] ?? 'active',
  validFrom: (p.fromDate ?? '').slice(0, 10),
  validTo: (p.toDate ?? '').slice(0, 10),
  createdAt: (p.createdAt ?? '').slice(0, 10),
});

// ---- Mock stores still backing the not-yet-integrated methods (Stage 2/3) ----
let sessionsDb: Record<string, CounselorSession[]> = { ...mockProjectSessions };
let studentsDb: Record<string, ProjectStudentDetail[]> = { ...mockProjectStudents };

export const projectService = {
  // GET /api/v1/projects — no server-side search/pagination, so both are client-side.
  // No `status` → active+closed (excludes soft-deleted); status=DELETED → only deleted.
  getAll: async (filters: ProjectFilterParams = {}): Promise<PaginatedResponse<Project>> => {
    const params: Record<string, string> = {};
    if (filters.status && filters.status !== 'all' && STATUS_TO_API[filters.status]) {
      params.status = STATUS_TO_API[filters.status];
    }
    const { data } = await apiClient.get<ApiProject[]>('/projects', { params });
    let results = data.map(mapProject);

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        p => p.name.toLowerCase().includes(q) || p.instituteName.toLowerCase().includes(q)
      );
    }

    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;
    const total = results.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    return { data: results.slice(start, start + limit), total, page, limit, totalPages };
  },

  getById: async (id: string): Promise<Project | undefined> => {
    const { data } = await apiClient.get<ApiProject>(`/projects/${id}`);
    return mapProject(data);
  },

  update: async (id: string, updates: Partial<Project>): Promise<Project> => {
    const body: Record<string, unknown> = {};
    if (updates.name !== undefined) body.name = updates.name;
    if (updates.validFrom !== undefined) body.fromDate = updates.validFrom;
    if (updates.validTo !== undefined) body.toDate = updates.validTo;
    if (updates.status !== undefined && STATUS_TO_API[updates.status]) {
      body.status = STATUS_TO_API[updates.status];
    }
    const { data } = await apiClient.patch<ApiProject>(`/projects/${id}`, body);
    return mapProject(data);
  },

  // DELETE is a soft-delete on the backend (status → DELETED); reversible via restore.
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/projects/${id}`);
  },

  restore: async (id: string): Promise<Project> => {
    const { data } = await apiClient.patch<ApiProject>(`/projects/${id}/restore`, {});
    return mapProject(data);
  },

  // ---- Stage 2/3 (still mock — orchestration/oversight not wired yet) ----

  // Orchestrates real creation: institute → project → classes/divisions → students
  // (bulk). Counsellor assignment + slot import land in Stage 2b. Institute = project
  // (1:1, created inline). Students are best-effort — a bad row doesn't abort the batch.
  create: async (payload: CreateProjectPayload): Promise<Project> => {
    const { instituteDetails, students, counselors } = payload;

    // 1. Institute (address/location optional; contactNumber/primaryEmail from the form).
    const { data: institute } = await apiClient.post<{ id: string; name: string }>('/institutes', {
      name: instituteDetails.name.trim(),
      contactNumber: instituteDetails.phone,
      primaryEmail: instituteDetails.email,
    });

    // 2. Project (window = the institute-step dates).
    const { data: project } = await apiClient.post<ApiProject>('/projects', {
      instituteId: institute.id,
      name: `${institute.name} Project`,
      fromDate: instituteDetails.validFrom,
      toDate: instituteDetails.validTo,
    });

    // 3. Resolve each distinct Class + Division from the sheet into a real divisionId.
    const classIdByName = new Map<string, string>();
    const divisionIdByKey = new Map<string, string>();
    const keyOf = (cls: string, div: string) => `${cls}||${div}`;
    for (const s of students) {
      const className = (s.grade || 'General').trim();
      const divisionName = (s.division || className).trim();
      const key = keyOf(className, divisionName);
      if (divisionIdByKey.has(key)) continue;
      let classId = classIdByName.get(className);
      if (!classId) {
        const { data: cls } = await apiClient.post<{ id: string }>(
          `/institutes/${institute.id}/classes`,
          { name: className }
        );
        classId = cls.id;
        classIdByName.set(className, classId);
      }
      const { data: div } = await apiClient.post<{ id: string }>(
        `/institutes/${institute.id}/classes/${classId}/divisions`,
        { name: divisionName }
      );
      divisionIdByKey.set(key, div.id);
    }

    // 4. Bulk-create students. studentCode is auto-generated, ordered & unique per project.
    const projShort = project.id.slice(-5);
    let seq = 0;
    for (const s of students) {
      seq += 1;
      const className = (s.grade || 'General').trim();
      const divisionName = (s.division || className).trim();
      const divisionId = divisionIdByKey.get(keyOf(className, divisionName));
      if (!divisionId) continue;
      const parts = s.name.trim().split(/\s+/);
      const firstName = parts[0] || s.name.trim();
      const lastName = parts.slice(1).join(' ') || firstName;
      try {
        await apiClient.post('/students', {
          firstName,
          lastName,
          email: s.email,
          mobile: s.mobile,
          studentCode: `STU-${projShort}-${String(seq).padStart(3, '0')}`,
          projectId: project.id,
          divisionId,
          parentMobile: s.parentMobile || s.mobile,
          parentEmail: s.parentEmail || s.email,
          ...(s.parentName ? { fatherName: s.parentName } : {}),
          ...(s.password ? { password: s.password } : {}),
        });
      } catch {
        // best-effort — master's wizard has no per-row surface to report failures.
      }
    }

    // 5. Counsellors: assign each matched (directory) counsellor to the project, and
    //    collect their availability slots for a single one-time slot import.
    const matched = counselors.filter(c => c.matchStatus === 'matched' && c.directoryId);
    const slotPayload: { counsellorId: string; date: string; startTime: string; endTime: string }[] = [];
    for (const c of matched) {
      try {
        await apiClient.post(`/counsellors/${c.directoryId}/projects`, { projectId: project.id });
      } catch {
        // already assigned / race — ignore; still import their slots below.
      }
      for (const slot of c.slots ?? []) {
        slotPayload.push({
          counsellorId: c.directoryId!,
          date: slot.date,
          startTime: slot.startTime,
          endTime: slot.endTime,
        });
      }
    }
    if (slotPayload.length > 0) {
      try {
        await apiClient.post('/sessions/slots/import', { projectId: project.id, slots: slotPayload });
      } catch {
        // slot import is one-shot per project; ignore if it was already done.
      }
    }

    return mapProject(project);
  },

  // Oversight: GET /sessions/slots?projectId (counsellor availability) + GET
  // /sessions?projectId (bookings) → one CounselorSession per counsellor. Only booked
  // students appear under a counsellor (unbooked slots stay as open time slots).
  getProjectSessions: async (projectId: string): Promise<CounselorSession[]> => {
    const [slotsRes, sessionsRes] = await Promise.all([
      apiClient.get<ApiSlot[]>('/sessions/slots', { params: { projectId } }),
      apiClient.get<ApiSession[]>('/sessions', { params: { projectId } }),
    ]);

    const byCounsellor = new Map<
      string,
      { name: string; email: string; timeSlots: TimeSlot[]; assignedStudents: ProjectStudent[] }
    >();
    const ensure = (id: string, name: string, email: string) => {
      if (!byCounsellor.has(id)) byCounsellor.set(id, { name, email, timeSlots: [], assignedStudents: [] });
      return byCounsellor.get(id)!;
    };

    for (const slot of slotsRes.data) {
      if (!slot.counsellor) continue;
      const c = slot.counsellor;
      const entry = ensure(c.id, `${c.user.firstName} ${c.user.lastName}`.trim(), '');
      entry.timeSlots.push({
        id: slot.id,
        time: `${slot.slotDate.slice(0, 10)} ${slot.startTime}-${slot.endTime}`,
        isSelected: slot.status === 'BOOKED',
      });
    }

    for (const sess of sessionsRes.data) {
      if (!sess.counsellor || sess.status === 'CANCELLED') continue; // booked only
      const c = sess.counsellor;
      const entry = ensure(c.id, `${c.user.firstName} ${c.user.lastName}`.trim(), c.user.email);
      if (sess.student) {
        entry.assignedStudents.push({
          name: `${sess.student.user.firstName} ${sess.student.user.lastName}`.trim(),
          email: sess.student.user.email,
          mobile: sess.student.mobile,
          grade: '',
          sessionDate: sess.scheduledDate ? sess.scheduledDate.slice(0, 10) : '',
          timeSlot: `${sess.startTime} - ${sess.endTime}`,
          sessionType: sess.sessionNumber === 'SESSION_1' ? 'S1' : 'S2',
        });
      }
    }

    return Array.from(byCounsellor.entries()).map(([id, v]) => ({
      id,
      counselorId: id,
      counselorName: v.name,
      counselorEmail: v.email,
      counselorPhone: '',
      timeSlots: v.timeSlots,
      assignedStudents: v.assignedStudents,
    }));
  },

  // GET /students?projectId + GET /sessions?projectId → merge each student's Session 1/2.
  getProjectStudents: async (projectId: string): Promise<ProjectStudentDetail[]> => {
    const [studentsRes, sessionsRes] = await Promise.all([
      apiClient.get<ApiStudent[]>('/students', { params: { projectId } }),
      apiClient.get<ApiSession[]>('/sessions', { params: { projectId } }),
    ]);
    const byStudent = new Map<string, { s1?: ApiSession; s2?: ApiSession }>();
    for (const sess of sessionsRes.data) {
      const e = byStudent.get(sess.studentId) ?? {};
      if (sess.sessionNumber === 'SESSION_1') e.s1 = sess;
      else if (sess.sessionNumber === 'SESSION_2') e.s2 = sess;
      byStudent.set(sess.studentId, e);
    }
    const mapSess = (sess: ApiSession | undefined, num: 1 | 2): StudentSessionDetail =>
      sess
        ? {
            sessionNumber: num,
            status: SESSION_STATUS[sess.status] ?? 'pending',
            date: sess.scheduledDate ? sess.scheduledDate.slice(0, 10) : '',
            timeSlot: sess.startTime ? `${sess.startTime} - ${sess.endTime}` : '',
            counselorName: sess.counsellor
              ? `${sess.counsellor.user.firstName} ${sess.counsellor.user.lastName}`.trim()
              : '',
            counselorEmail: sess.counsellor?.user.email ?? '',
          }
        : { sessionNumber: num, status: 'pending', date: '', timeSlot: '', counselorName: '', counselorEmail: '' };

    return studentsRes.data.map(st => ({
      id: st.id,
      studentId: st.studentCode,
      name: `${st.user.firstName} ${st.user.lastName}`.trim(),
      email: st.user.email,
      mobile: st.mobile,
      parentMobile: st.parentMobile,
      grade: st.division?.class?.name || st.division?.name || '',
      stage: WORKFLOW_STAGE[st.workflowStatus] ?? st.workflowStatus,
      session1: mapSess(byStudent.get(st.id)?.s1, 1),
      session2: mapSess(byStudent.get(st.id)?.s2, 2),
    }));
  },

  updateProjectStudent: async (
    projectId: string,
    student: ProjectStudentDetail
  ): Promise<ProjectStudentDetail[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const currentList = studentsDb[projectId] || studentsDb['proj-001'] || [];
    const exists = currentList.some(s => s.id === student.id);
    const updatedList = exists
      ? currentList.map(s => (s.id === student.id ? student : s))
      : [student, ...currentList];
    studentsDb[projectId] = updatedList;
    return updatedList;
  },

  updateCounselorSession: async (
    projectId: string,
    sessionId: string,
    selectedSlotId: string,
    assignedStudents: unknown[]
  ): Promise<CounselorSession[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const currentList = sessionsDb[projectId] || sessionsDb['proj-001'] || [];
    const updated = currentList.map(s =>
      s.id === sessionId
        ? {
            ...s,
            timeSlots: s.timeSlots.map(ts => ({ ...ts, isSelected: ts.id === selectedSlotId })),
            assignedStudents: assignedStudents as CounselorSession['assignedStudents'],
          }
        : s
    );
    sessionsDb[projectId] = updated;
    return updated;
  },

  // Real counsellor directory (GET /counsellors) — for matching availability-sheet
  // uploads (by Counsellor ID) and manual adds (by email) in the project wizard.
  getCounsellorDirectory: async (): Promise<
    { id: string; counsellorCode: string; name: string; email: string; mobile: string }[]
  > => {
    const { data } = await apiClient.get<ApiCounsellorDir[]>('/counsellors');
    return data.map(c => ({
      id: c.id,
      counsellorCode: c.counsellorCode,
      name: `${c.user?.firstName ?? ''} ${c.user?.lastName ?? ''}`.trim(),
      email: c.user?.email ?? '',
      mobile: c.mobile ?? '',
    }));
  },

  validateCounselors: async (
    counselors: Omit<ProjectCounselor, 'matchStatus'>[]
  ): Promise<ProjectCounselor[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const existingEmails = new Set(mockCounselors.map(c => c.email.toLowerCase().trim()));
    return counselors.map(c => ({
      ...c,
      matchStatus: existingEmails.has(c.email.toLowerCase().trim())
        ? ('matched' as const)
        : ('new' as const),
    }));
  },
};
