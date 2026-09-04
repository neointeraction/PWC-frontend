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
import {
  formatFullName,
  getApiErrorMessage,
  getApiErrorStatus,
  normalizePhone,
  parseApiDate,
} from '@/utils';

// ---- Backend project shape (GET /projects) — Institute was merged into Project, so
// address/contactNumber/primaryEmail/languageId now live directly on the project row. ----
interface ApiProject {
  id: string;
  code?: string;
  name: string;
  address?: string;
  contactNumber?: string;
  primaryEmail?: string;
  languageId?: string;
  fromDate: string;
  toDate: string;
  status: 'ACTIVE' | 'CLOSED' | 'DELETED';
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

// GET /students?projectId — className/divisionName are plain free-text fields on the
// Student row now (no Division/Class entity to join against).
interface ApiStudent {
  id: string;
  studentCode: string;
  mobile: string;
  whatsappNumber?: string;
  parentMobile: string;
  parentEmail?: string;
  fatherName?: string;
  workflowStatus: string;
  user: { firstName: string; lastName: string; email: string };
  project?: { id: string };
  className?: string;
  divisionName?: string;
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
    className?: string;
    divisionName?: string;
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

// PATCH /students/{id} can't change a login email; the caller is told when one was typed
// so it can say so instead of reporting a clean save.
export interface SaveStudentResult {
  emailChangeIgnored: boolean;
}

const mapProject = (p: ApiProject): Project => ({
  id: p.id,
  code: p.code,
  name: p.name,
  instituteName: p.name,
  location: p.address || undefined,
  email: p.primaryEmail || undefined,
  phone: p.contactNumber || undefined,
  counselorCount: p._count?.counsellors ?? 0,
  studentCount: p._count?.students ?? 0,
  status: API_TO_STATUS[p.status] ?? 'active',
  validFrom: parseApiDate(p.fromDate),
  validTo: parseApiDate(p.toDate),
  createdAt: (p.createdAt ?? '').slice(0, 10),
});

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

export interface CounselorAssignFailure {
  name: string;
  reason: string;
}

export interface CounselorAssignResult {
  assigned: number;
  failures: CounselorAssignFailure[];
  slotImport: SlotImportSummary;
}

export interface CreateProjectResult {
  project: Project;
  studentImport: StudentImportSummary;
  counselorAssign: CounselorAssignResult;
}


// Assigns each matched (real-directory) counsellor to the project, then imports their
// availability slots in one shot. A counsellor already tied to a *different* institute is
// rejected by the backend (400) — that's a real failure, not a race, so (unlike the old
// silent catch-and-ignore) it's surfaced instead of masquerading as a clean assignment; only
// a 409 (already assigned to this project) is safely ignored. Slots for a counsellor whose
// assignment failed are skipped — the import endpoint 400s the *entire* batch if any
// counsellor in it isn't assigned to the project yet.
const assignCounselorsWithSlots = async (
  projectId: string,
  counselors: ProjectCounselor[]
): Promise<CounselorAssignResult> => {
  const matched = counselors.filter(c => c.matchStatus === 'matched' && c.directoryId);
  const failures: CounselorAssignFailure[] = [];
  const assignedIds = new Set<string>();

  for (const c of matched) {
    try {
      await apiClient.post(`/counsellors/${c.directoryId}/projects`, { projectId });
      assignedIds.add(c.directoryId!);
    } catch (err) {
      if (getApiErrorStatus(err) === 409) {
        // Already assigned to this project — treat as success.
        assignedIds.add(c.directoryId!);
      } else {
        failures.push({
          name: c.name || c.counsellorCode || c.email || 'Unknown counsellor',
          reason: getApiErrorMessage(err, 'Rejected by the server'),
        });
      }
    }
  }

  const slotPayload: { counsellorId: string; date: string; startTime: string; endTime: string }[] = [];
  for (const c of matched) {
    if (!c.directoryId || !assignedIds.has(c.directoryId)) continue;
    for (const slot of c.slots ?? []) {
      slotPayload.push({
        counsellorId: c.directoryId,
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
      await apiClient.post('/sessions/slots/import', { projectId, slots: slotPayload });
      slotImport.imported = slotPayload.length;
    } catch (err) {
      if (getApiErrorStatus(err) === 409) {
        slotImport.alreadyImported = true;
      } else {
        slotImport.error = getApiErrorMessage(err, 'Rejected by the server');
      }
    }
  }

  return { assigned: assignedIds.size, failures, slotImport };
};

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
    if (updates.location !== undefined) body.address = updates.location;
    if (updates.email !== undefined) body.primaryEmail = updates.email;
    if (updates.phone !== undefined) body.contactNumber = normalizePhone(updates.phone);
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

  // Orchestrates real creation: project (institute fields sent directly on it, no more
  // separate Institute entity) → students (bulk) → counsellors + slot import. A bad
  // student row doesn't abort the batch, but every skipped row is counted and returned
  // so the wizard can say what actually landed.
  create: async (payload: CreateProjectPayload): Promise<CreateProjectResult> => {
    const { instituteDetails, students, counselors } = payload;

    // 1. Project — `code` is admin-supplied and required (no longer auto-generated);
    //    address/contactNumber/primaryEmail live directly on the project row now.
    const { data: project } = await apiClient.post<ApiProject>('/projects', {
      code: instituteDetails.instituteId.trim(),
      name: instituteDetails.name.trim(),
      address: instituteDetails.location.trim(),
      contactNumber: normalizePhone(instituteDetails.phone),
      primaryEmail: instituteDetails.email,
      fromDate: instituteDetails.validFrom,
      toDate: instituteDetails.validTo,
    });

    // 2. Bulk-create students. `studentCode` is required by the backend (no longer
    //    auto-generated) — taken from the sheet's Student ID column, falling back to a
    //    generated placeholder for rows that don't carry one so the row isn't rejected.
    //    `className`/`divisionName` are plain free-text fields on the student, no
    //    class/division lookup needed. `seq` also labels a failed row with no name/email.
    const failures: StudentImportFailure[] = [];
    let imported = 0;
    let seq = 0;
    for (const s of students) {
      seq += 1;
      const className = (s.grade || 'General').trim();
      const divisionName = (s.division || className).trim();
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
          className,
          divisionName,
          parentMobile: normalizePhone(s.parentMobile || s.mobile),
          parentEmail: s.parentEmail || s.email,
          studentCode: s.studentId?.trim() || `S${String(seq).padStart(4, '0')}`,
          ...(s.parentName ? { fatherName: s.parentName } : {}),
          ...(s.password ? { password: s.password } : {}),
          ...(s.whatsappNumber ? { whatsappNumber: normalizePhone(s.whatsappNumber) } : {}),
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

    // 3. Counsellors: assign each matched (directory) counsellor to the project, and
    //    import their availability slots.
    const counselorAssign = await assignCounselorsWithSlots(project.id, counselors);

    return {
      project: mapProject(project),
      studentImport: {
        total: students.length,
        imported,
        failed: failures.length,
        failures,
      },
      counselorAssign,
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
              ? formatFullName(sess.student.user.firstName, sess.student.user.lastName)
              : '',
            studentEmail: sess.student?.user.email,
            mobile: sess.student?.mobile,
            grade: sess.student?.className || sess.student?.divisionName || '',
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
        formatFullName(c.user?.firstName ?? '', c.user?.lastName),
        c.user?.email ?? ''
      );
    }

    for (const slot of slotsRes.data) {
      if (!slot.counsellor) continue;
      const c = slot.counsellor;
      const entry = ensure(
        c.id,
        c.counsellorCode,
        formatFullName(c.user.firstName, c.user.lastName),
        ''
      );
      const slotDate = parseApiDate(slot.slotDate);
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
        formatFullName(c.user.firstName, c.user.lastName),
        c.user.email
      );
      if (sess.student) {
        entry.assignedStudents.push({
          studentId: sess.student.id,
          name: formatFullName(sess.student.user.firstName, sess.student.user.lastName),
          email: sess.student.user.email,
          mobile: sess.student.mobile,
          grade: sess.student.className || sess.student.divisionName || '',
          sessionDate: sess.scheduledDate ? parseApiDate(sess.scheduledDate) : '',
          timeSlot: `${sess.startTime} - ${sess.endTime}`,
          sessionType: sess.sessionNumber === 'SESSION_1' ? 'S1' : 'S2',
        });
      }
      if (slotBackedSessionIds.has(sess.id)) continue;
      const scheduledDate = sess.scheduledDate ? parseApiDate(sess.scheduledDate) : '';
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
            date: sess.scheduledDate ? parseApiDate(sess.scheduledDate) : '',
            timeSlot: sess.startTime ? `${sess.startTime} - ${sess.endTime}` : '',
            counselorId: sess.counsellor?.counsellorCode,
            counselorName: sess.counsellor
              ? formatFullName(sess.counsellor.user.firstName, sess.counsellor.user.lastName)
              : '',
            counselorEmail: sess.counsellor?.user.email ?? '',
          }
        : { sessionNumber: num, status: 'pending', date: '', timeSlot: '', counselorName: '', counselorEmail: '' };

    return studentsRes.data.map(st => {
      const session1 = mapSess(byStudent.get(st.id)?.s1, 1);
      const session2 = mapSess(byStudent.get(st.id)?.s2, 2);
      const assignedSession = session1.counselorName ? session1 : session2;
      const className = st.className ?? '';
      const divisionName = st.divisionName ?? '';
      return {
        id: st.id,
        studentId: st.studentCode,
        name: formatFullName(st.user.firstName, st.user.lastName),
        email: st.user.email,
        mobile: st.mobile,
        whatsappNumber: st.whatsappNumber || undefined,
        parentMobile: st.parentMobile,
        grade:
          className && divisionName && divisionName !== className
            ? `${className} - ${divisionName}`
            : className || divisionName,
        className,
        division: divisionName,
        parentEmail: st.parentEmail ?? '',
        parentName: st.fatherName ?? '',
        // Prefer the backend's derived stage label + live 🚩 flag; fall back to the coarse
        // workflowStatus map if stageInfo isn't present (older backend).
        stage: st.stageInfo?.stageLabel ?? WORKFLOW_STAGE[st.workflowStatus] ?? st.workflowStatus,
        stageCompletedDate: st.stageInfo?.stageEnteredAt
          ? st.stageInfo.stageEnteredAt.slice(0, 10)
          : undefined,
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
  // A student with no `id` is a new row. `studentCode` is only sent when the admin typed
  // one in; left out otherwise so the backend generates the next one in sequence (S0001, S0002, ...).
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
      await apiClient.post('/students', {
        firstName,
        lastName,
        email: student.email,
        mobile: normalizePhone(student.mobile),
        projectId,
        className,
        divisionName,
        // Both are required by the backend; a project sheet may only carry one contact,
        // so the student's own details stand in — same fallback the import wizard uses.
        parentMobile: normalizePhone(student.parentMobile || student.mobile),
        parentEmail: student.parentEmail || student.email,
        // Required by the backend (no longer auto-generated) — the Add Student form
        // validates this is filled in before calling here.
        studentCode: (student.studentId || '').trim(),
        ...(student.parentName ? { fatherName: student.parentName } : {}),
        ...(student.whatsappNumber
          ? { whatsappNumber: normalizePhone(student.whatsappNumber) }
          : {}),
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
    if (student.parentName) body.fatherName = student.parentName;
    if (student.whatsappNumber) body.whatsappNumber = normalizePhone(student.whatsappNumber);

    // Only send class/division when they actually changed.
    if (!sameName(current.className, className)) body.className = className;
    if (!sameName(current.divisionName, divisionName)) body.divisionName = divisionName;

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

  // Assigns a batch of matched (directory) counsellors to an existing project and imports
  // their availability slots in one shot — the same flow the create wizard uses.
  assignCounselorsToProject: (
    projectId: string,
    counselors: ProjectCounselor[]
  ): Promise<CounselorAssignResult> => assignCounselorsWithSlots(projectId, counselors),

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
