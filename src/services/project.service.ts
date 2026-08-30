import { apiClient } from './api';
import {
  Project,
  ProjectStatus,
  ProjectFilterParams,
  CreateProjectPayload,
  ProjectCounselor,
  CounselorSession,
  ProjectSlot,
  ProjectStudentDetail,
  StudentSessionDetail,
  ProjectStudent,
  TimeSlot,
} from '@/types/project.types';
import { PaginatedResponse } from '@/types/api.types';
import { getApiErrorMessage, getApiErrorStatus, normalizePhone } from '@/utils';

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
  parentEmail?: string;
  workflowStatus: string;
  user: { firstName: string; lastName: string; email: string };
  project?: { id: string; instituteId: string };
  division?: { id: string; name: string; class?: { id: string; name: string } };
  // Computed live by the backend (never stored): derived stage + ageing/🚩 flag.
  stageInfo?: {
    stage: string;
    stageLabel: string;
    stageEnteredAt: string;
    ageDays: number;
    flagged: boolean;
    flagReason: 'IDLE' | 'MISSED_SESSION' | null;
  };
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
  meetingLink?: string | null;
  notes?: string | null;
  // Reconciled lazily by the backend once a scheduled session's end time passes with
  // no join recorded — this is the 🚩 "missed session" the schedule table shows.
  studentNoShow?: boolean;
  counsellorNoShow?: boolean;
  counsellor?: { id: string; counsellorCode: string; user: { firstName: string; lastName: string; email: string } };
  student?: {
    id: string;
    studentCode: string;
    mobile: string;
    user: { firstName: string; lastName: string; email: string };
    division?: { name: string; class?: { name: string } };
  };
}
interface ApiSlot {
  id: string;
  slotDate: string;
  startTime: string;
  endTime: string;
  status: 'OPEN' | 'BOOKED';
  sessionId?: string | null;
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

const SLOT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// "2026-02-18" -> "18 Feb 2026", the format the schedule table renders.
const formatSlotDate = (ymd: string): string => {
  const [y, m, d] = ymd.split('-');
  if (!y || !m || !d) return ymd;
  return `${d} ${SLOT_MONTHS[Number(m) - 1] ?? m} ${y}`;
};

const sameName = (a: string | undefined, b: string | undefined): boolean =>
  (a ?? '').trim().toLowerCase() === (b ?? '').trim().toLowerCase();

// An institute's classes come back with their divisions nested, so one GET is enough to
// resolve (or create) the class/division pair a student was filed under.
interface ApiInstituteClass {
  id: string;
  name: string;
  divisions?: { id: string; name: string }[];
}

const resolveDivisionId = async (
  instituteId: string,
  className: string,
  divisionName: string
): Promise<string> => {
  const { data: classes } = await apiClient.get<ApiInstituteClass[]>(
    `/institutes/${instituteId}/classes`
  );
  let cls = classes.find(c => sameName(c.name, className));
  if (!cls) {
    const { data } = await apiClient.post<ApiInstituteClass>(
      `/institutes/${instituteId}/classes`,
      { name: className }
    );
    cls = { ...data, divisions: [] };
  }
  const existing = (cls.divisions ?? []).find(d => sameName(d.name, divisionName));
  if (existing) return existing.id;
  const { data: division } = await apiClient.post<{ id: string }>(
    `/institutes/${instituteId}/classes/${cls.id}/divisions`,
    { name: divisionName }
  );
  return division.id;
};

// PATCH /students/{id} can't change a login email; the caller is told when one was typed
// so it can say so instead of reporting a clean save.
export interface SaveStudentResult {
  emailChangeIgnored: boolean;
}

const mapProject = (p: ApiProject): Project => ({
  id: p.id,
  name: p.name,
  instituteId: p.instituteId,
  instituteName: p.institute?.name ?? '',
  counselorCount: p._count?.counsellors ?? 0,
  studentCount: p._count?.students ?? 0,
  status: API_TO_STATUS[p.status] ?? 'active',
  validFrom: (p.fromDate ?? '').slice(0, 10),
  validTo: (p.toDate ?? '').slice(0, 10),
  createdAt: (p.createdAt ?? '').slice(0, 10),
});

// ---- Mock stores still backing the not-yet-integrated methods (Stage 2/3) ----
// One student row that never made it into the table, with the reason to show the user.
export interface StudentImportFailure {
  name: string;
  reason: string;
}

export interface StudentImportSummary {
  total: number;
  imported: number;
  failed: number;
  failures: StudentImportFailure[];
}

// POST /sessions/slots/import is one-shot per project: a 409 means this project's sheet
// was already imported, which is the guard doing its job. Anything else is a real failure
// (e.g. 400 for a counsellor that isn't assigned to the project) and must reach the user.
export interface SlotImportSummary {
  attempted: number;
  imported: number;
  alreadyImported: boolean;
  error?: string;
}

export interface CreateProjectResult {
  project: Project;
  studentImport: StudentImportSummary;
  slotImport: SlotImportSummary;
}


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
  // (1:1, created inline). A bad student row doesn't abort the batch, but every skipped
  // row is counted and returned so the wizard can say what actually landed.
  create: async (payload: CreateProjectPayload): Promise<CreateProjectResult> => {
    const { instituteDetails, students, counselors } = payload;

    // 1. Institute (address/contactNumber/primaryEmail all come from the institute step).
    const { data: institute } = await apiClient.post<{ id: string; name: string }>('/institutes', {
      name: instituteDetails.name.trim(),
      address: instituteDetails.location.trim(),
      contactNumber: normalizePhone(instituteDetails.phone),
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

    // 4. Bulk-create students. `studentCode` is deliberately omitted so the backend mints
    //    its own sequential code (S0001, S0002, …) — the same thing `saveProjectStudent`
    //    does. Supplying one is only for carrying a legacy code in from another system.
    //    `seq` is kept purely to label a failed row that has no name or email.
    const failures: StudentImportFailure[] = [];
    let imported = 0;
    let seq = 0;
    for (const s of students) {
      seq += 1;
      const className = (s.grade || 'General').trim();
      const divisionName = (s.division || className).trim();
      const divisionId = divisionIdByKey.get(keyOf(className, divisionName));
      if (!divisionId) {
        failures.push({
          name: s.name || s.email || `Row ${seq}`,
          reason: `No class/division matched "${className} ${divisionName}"`,
        });
        continue;
      }
      const parts = s.name.trim().split(/\s+/);
      const firstName = parts[0] || s.name.trim();
      const lastName = parts.slice(1).join(' ') || firstName;
      try {
        await apiClient.post('/students', {
          firstName,
          lastName,
          email: s.email,
          mobile: normalizePhone(s.mobile),
          projectId: project.id,
          divisionId,
          parentMobile: normalizePhone(s.parentMobile || s.mobile),
          parentEmail: s.parentEmail || s.email,
          ...(s.parentName ? { fatherName: s.parentName } : {}),
          ...(s.password ? { password: s.password } : {}),
        });
        imported += 1;
      } catch (err) {
        // One bad row must not abort the batch — record it and carry on.
        failures.push({
          name: s.name || s.email || `Row ${seq}`,
          reason: getApiErrorMessage(err, 'Rejected by the server'),
        });
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
    const slotImport: SlotImportSummary = {
      attempted: slotPayload.length,
      imported: 0,
      alreadyImported: false,
    };
    if (slotPayload.length > 0) {
      try {
        await apiClient.post('/sessions/slots/import', { projectId: project.id, slots: slotPayload });
        slotImport.imported = slotPayload.length;
      } catch (err) {
        // 409 = this project's slots were already imported (the endpoint is one-shot), which
        // is expected on a retry. Anything else means no availability landed at all, and the
        // wizard must say so rather than reporting a clean success.
        if (getApiErrorStatus(err) === 409) {
          slotImport.alreadyImported = true;
        } else {
          slotImport.error = getApiErrorMessage(err, 'Rejected by the server');
        }
      }
    }

    return {
      project: mapProject(project),
      studentImport: {
        total: students.length,
        imported,
        failed: failures.length,
        failures,
      },
      slotImport,
    };
  },

  // Oversight: GET /sessions/slots?projectId (counsellor availability) + GET
  // /sessions?projectId (bookings) → one CounselorSession per counsellor. Only booked
  // students appear under a counsellor (unbooked slots stay as open time slots).
  // GET /sessions/slots?projectId (counsellor availability) + GET /sessions?projectId
  // (bookings) -> one CounselorSession per counsellor, each carrying that counsellor's
  // schedule rows. A slot supplies the row; the session linked to it (or, for an admin
  // booking made outside the slot inventory, a session with no slot at all) fills in the
  // student side.
  getProjectSessions: async (projectId: string): Promise<CounselorSession[]> => {
    const [slotsRes, sessionsRes, directoryRes] = await Promise.all([
      apiClient.get<ApiSlot[]>('/sessions/slots', { params: { projectId } }),
      apiClient.get<ApiSession[]>('/sessions', { params: { projectId } }),
      // Slots and sessions carry the counsellor's name and code but no contact details;
      // the directory fills the email/phone the counsellor cards show.
      apiClient.get<ApiCounsellorDir[]>('/counsellors', { params: { projectId } }),
    ]);
    const directory = new Map(directoryRes.data.map(c => [c.id, c]));

    const activeSessions = sessionsRes.data.filter(sess => sess.status !== 'CANCELLED');
    const sessionById = new Map(activeSessions.map(sess => [sess.id, sess]));

    interface Entry {
      code: string;
      name: string;
      email: string;
      slots: ProjectSlot[];
      timeSlots: TimeSlot[];
      assignedStudents: ProjectStudent[];
    }
    const byCounsellor = new Map<string, Entry>();
    const ensure = (id: string, code: string, name: string, email: string): Entry => {
      const existing = byCounsellor.get(id);
      if (existing) {
        // Later rows can supply details the first one lacked (slots carry no email).
        if (!existing.email && email) existing.email = email;
        if (!existing.code && code) existing.code = code;
        return existing;
      }
      const entry: Entry = { code, name, email, slots: [], timeSlots: [], assignedStudents: [] };
      byCounsellor.set(id, entry);
      return entry;
    };

    const bookingFields = (sess: ApiSession | undefined) =>
      sess
        ? {
            sessionId: sess.id,
            isBooked: true,
            isMissed: Boolean(sess.studentNoShow),
            studentId: sess.student?.id,
            studentCode: sess.student?.studentCode,
            studentName: sess.student
              ? `${sess.student.user.firstName} ${sess.student.user.lastName}`.trim()
              : '',
            studentEmail: sess.student?.user.email,
            mobile: sess.student?.mobile,
            grade: sess.student?.division?.class?.name || sess.student?.division?.name || '',
            sessionType: (sess.sessionNumber === 'SESSION_1' ? 'S1' : 'S2') as 'S1' | 'S2',
            notes: sess.notes ?? undefined,
            meetingLink: sess.meetingLink ?? undefined,
          }
        : { isBooked: false };

    // Seed from the project's assigned counsellors so one who has been added but hasn't
    // uploaded availability yet still gets a card, then layer slots and bookings on top.
    for (const c of directoryRes.data) {
      ensure(
        c.id,
        c.counsellorCode,
        `${c.user?.firstName ?? ''} ${c.user?.lastName ?? ''}`.trim(),
        c.user?.email ?? ''
      );
    }

    for (const slot of slotsRes.data) {
      if (!slot.counsellor) continue;
      const c = slot.counsellor;
      const entry = ensure(
        c.id,
        c.counsellorCode,
        `${c.user.firstName} ${c.user.lastName}`.trim(),
        ''
      );
      const slotDate = slot.slotDate.slice(0, 10);
      const booking = slot.sessionId ? sessionById.get(slot.sessionId) : undefined;
      entry.slots.push({
        id: slot.id,
        date: formatSlotDate(slotDate),
        time: `${slot.startTime} - ${slot.endTime}`,
        slotDate,
        startTime: slot.startTime,
        endTime: slot.endTime,
        ...bookingFields(booking),
      });
      entry.timeSlots.push({
        id: slot.id,
        time: `${slotDate} ${slot.startTime}-${slot.endTime}`,
        isSelected: slot.status === 'BOOKED',
      });
    }

    // Sessions the slot sheet doesn't account for — an admin booking made with
    // POST /sessions bypasses the slot inventory, so it has no slot row to attach to.
    const slotBackedSessionIds = new Set(
      slotsRes.data.map(slot => slot.sessionId).filter(Boolean) as string[]
    );

    for (const sess of activeSessions) {
      if (!sess.counsellor) continue;
      const c = sess.counsellor;
      const entry = ensure(
        c.id,
        c.counsellorCode,
        `${c.user.firstName} ${c.user.lastName}`.trim(),
        c.user.email
      );
      if (sess.student) {
        entry.assignedStudents.push({
          studentId: sess.student.id,
          name: `${sess.student.user.firstName} ${sess.student.user.lastName}`.trim(),
          email: sess.student.user.email,
          mobile: sess.student.mobile,
          grade: sess.student.division?.class?.name || sess.student.division?.name || '',
          sessionDate: sess.scheduledDate ? sess.scheduledDate.slice(0, 10) : '',
          timeSlot: `${sess.startTime} - ${sess.endTime}`,
          sessionType: sess.sessionNumber === 'SESSION_1' ? 'S1' : 'S2',
        });
      }
      if (slotBackedSessionIds.has(sess.id)) continue;
      const scheduledDate = sess.scheduledDate ? sess.scheduledDate.slice(0, 10) : '';
      entry.slots.push({
        id: `session-${sess.id}`,
        date: formatSlotDate(scheduledDate),
        time: `${sess.startTime} - ${sess.endTime}`,
        slotDate: scheduledDate,
        startTime: sess.startTime,
        endTime: sess.endTime,
        ...bookingFields(sess),
      });
    }

    return Array.from(byCounsellor.entries()).map(([id, v]) => {
      const contact = directory.get(id);
      return {
      id,
      counselorId: id,
      counselorCode: v.code || contact?.counsellorCode || '',
      counselorName: v.name,
      counselorEmail: v.email || contact?.user?.email || '',
      counselorPhone: contact?.mobile ?? '',
      timeSlots: v.timeSlots,
      slots: v.slots.sort((a, b) =>
        a.slotDate === b.slotDate
          ? a.startTime.localeCompare(b.startTime)
          : a.slotDate.localeCompare(b.slotDate)
      ),
      assignedStudents: v.assignedStudents,
      };
    });
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
            counselorId: sess.counsellor?.counsellorCode,
            counselorName: sess.counsellor
              ? `${sess.counsellor.user.firstName} ${sess.counsellor.user.lastName}`.trim()
              : '',
            counselorEmail: sess.counsellor?.user.email ?? '',
          }
        : { sessionNumber: num, status: 'pending', date: '', timeSlot: '', counselorName: '', counselorEmail: '' };

    return studentsRes.data.map(st => {
      const session1 = mapSess(byStudent.get(st.id)?.s1, 1);
      const session2 = mapSess(byStudent.get(st.id)?.s2, 2);
      const assignedSession = session1.counselorName ? session1 : session2;
      return {
        id: st.id,
        studentId: st.studentCode,
        name: `${st.user.firstName} ${st.user.lastName}`.trim(),
        email: st.user.email,
        mobile: st.mobile,
        parentMobile: st.parentMobile,
        grade: st.division?.class?.name || st.division?.name || '',
        className: st.division?.class?.name ?? '',
        division: st.division?.name ?? '',
        parentEmail: st.parentEmail ?? '',
        // Prefer the backend's derived stage label + live 🚩 flag; fall back to the coarse
        // workflowStatus map if stageInfo isn't present (older backend).
        stage: st.stageInfo?.stageLabel ?? WORKFLOW_STAGE[st.workflowStatus] ?? st.workflowStatus,
        isFlagged: st.stageInfo?.flagged ?? false,
        flagReason: st.stageInfo?.flagReason ?? null,
        counselorId: assignedSession.counselorId,
        counselorName: assignedSession.counselorName || undefined,
        session1,
        session2,
      };
    });
  },

  // Add (POST /students) or edit (PATCH /students/{id}) a single student on a project.
  // A student with no `id` is a new row. `studentCode` is left out so the backend
  // generates the next one in sequence (S0001, S0002, ...).
  //
  // Email is only sent on create: PATCH /students/{id} has no `email` field — the login
  // address lives on the User row and there's no admin endpoint to change it — so an
  // edited email is reported back to the caller rather than silently dropped.
  saveProjectStudent: async (
    projectId: string,
    student: ProjectStudentDetail
  ): Promise<SaveStudentResult> => {
    const parts = student.name.trim().split(/\s+/);
    const firstName = parts[0] || student.name.trim();
    // The backend requires a non-empty lastName; a single-word name repeats it.
    const lastName = parts.slice(1).join(' ') || firstName;
    const className = (student.className || student.grade || 'General').trim();
    const divisionName = (student.division || className).trim();

    if (!student.id) {
      const { data: project } = await apiClient.get<ApiProject>(`/projects/${projectId}`);
      const divisionId = await resolveDivisionId(project.instituteId, className, divisionName);
      await apiClient.post('/students', {
        firstName,
        lastName,
        email: student.email,
        mobile: normalizePhone(student.mobile),
        projectId,
        divisionId,
        // Both are required by the backend; a project sheet may only carry one contact,
        // so the student's own details stand in — same fallback the import wizard uses.
        parentMobile: normalizePhone(student.parentMobile || student.mobile),
        parentEmail: student.parentEmail || student.email,
      });
      return { emailChangeIgnored: false };
    }

    const { data: current } = await apiClient.get<ApiStudent>(`/students/${student.id}`);
    const body: Record<string, unknown> = {
      firstName,
      lastName,
      mobile: normalizePhone(student.mobile),
    };
    if (student.parentMobile) body.parentMobile = normalizePhone(student.parentMobile);
    if (student.parentEmail) body.parentEmail = student.parentEmail;

    // Only re-file the student when the class/division actually changed — resolving is a
    // find-or-create, so sending it unconditionally could mint divisions from the
    // modal's placeholder values.
    const movedClass = !sameName(current.division?.class?.name, className);
    const movedDivision = !sameName(current.division?.name, divisionName);
    if ((movedClass || movedDivision) && current.project?.instituteId) {
      body.divisionId = await resolveDivisionId(
        current.project.instituteId,
        className,
        divisionName
      );
    }

    await apiClient.patch(`/students/${student.id}`, body);
    return {
      emailChangeIgnored:
        Boolean(student.email.trim()) &&
        !sameName(current.user.email, student.email),
    };
  },

  // ---- Schedule writes (admin oversight of a project's sessions) ----

  // Admin manual booking — POST /sessions. This is the documented escape hatch outside
  // the student-driven blind booking flow: it bypasses the slot inventory, so the slot
  // itself stays OPEN and the session is surfaced as its own schedule row.
  assignStudentToSlot: async (input: {
    studentId: string;
    counsellorId: string;
    sessionType: 'S1' | 'S2';
    date: string;
    startTime: string;
    endTime: string;
  }): Promise<void> => {
    await apiClient.post('/sessions', {
      studentId: input.studentId,
      counsellorId: input.counsellorId,
      sessionNumber: input.sessionType === 'S1' ? 'SESSION_1' : 'SESSION_2',
      date: input.date,
      startTime: input.startTime,
      endTime: input.endTime,
    });
  },

  // POST /sessions/{id}/reschedule — same counsellor, new date/time. Releases the old
  // slot back to OPEN and claims the new one.
  rescheduleSession: async (
    sessionId: string,
    date: string,
    startTime: string
  ): Promise<void> => {
    await apiClient.post(`/sessions/${sessionId}/reschedule`, {
      date,
      startTime,
      initiatedBy: 'ADMIN',
    });
  },

  // DELETE /counsellors/{id}/projects/{projectId} — unassigns without touching the
  // counsellor account.
  unassignCounsellorFromProject: async (
    counsellorId: string,
    projectId: string
  ): Promise<void> => {
    await apiClient.delete(`/counsellors/${counsellorId}/projects/${projectId}`);
  },

  // POST /counsellors/{id}/projects — assigns an existing counsellor to the project.
  assignCounsellorToProject: async (
    counsellorId: string,
    projectId: string
  ): Promise<void> => {
    await apiClient.post(`/counsellors/${counsellorId}/projects`, { projectId });
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

  // Matches uploaded/typed counsellors against the real directory (GET /counsellors) by
  // email, carrying the matched id through as `directoryId` — that id is what the project
  // assignment endpoint needs, so an unmatched row can't be assigned.
  validateCounselors: async (
    counselors: Omit<ProjectCounselor, 'matchStatus'>[]
  ): Promise<ProjectCounselor[]> => {
    const directory = await projectService.getCounsellorDirectory();
    const byEmail = new Map(directory.map(c => [c.email.toLowerCase().trim(), c]));
    return counselors.map(c => {
      const match = byEmail.get(c.email.toLowerCase().trim());
      return {
        ...c,
        matchStatus: match ? ('matched' as const) : ('new' as const),
        directoryId: match?.id ?? c.directoryId,
        counsellorCode: match?.counsellorCode ?? c.counsellorCode,
      };
    });
  },
};
