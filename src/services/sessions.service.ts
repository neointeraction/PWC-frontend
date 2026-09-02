import dayjs from 'dayjs';
import { apiClient } from './api';
import { parseApiDate } from '@/utils';

// Client-side "Join Now" gate, shown 10 minutes before the session starts through its
// end time — mirrors the backend's own window (POST /sessions/{id}/join,
// JOIN_WINDOW_MINUTES_BEFORE in PWC-backend/src/modules/sessions/sessions.service.ts).
// Keep these two in sync if that value ever changes.
const JOIN_WINDOW_MINUTES_BEFORE = 10;

export const isWithinJoinWindow = (session: { scheduledDate: string; startTime: string; endTime: string }): boolean => {
  const now = dayjs();
  const opensAt = dayjs(`${session.scheduledDate}T${session.startTime}`).subtract(JOIN_WINDOW_MINUTES_BEFORE, 'minute');
  const closesAt = dayjs(`${session.scheduledDate}T${session.endTime}`);
  return !now.isBefore(opensAt) && now.isBefore(closesAt);
};

export type SessionNumber = 'SESSION_1' | 'SESSION_2';
export type SessionStatus = 'SCHEDULED' | 'COMPLETED' | 'RESCHEDULED' | 'CANCELLED';
export type CancellationReason =
  | 'STUDENT_UNAVAILABLE'
  | 'COUNSELLOR_UNAVAILABLE'
  | 'INSTITUTION_REQUEST'
  | 'OTHER';
export type InitiatedBy = 'STUDENT' | 'COUNSELLOR' | 'ADMIN';

// GET /sessions/students/{studentId}/booking-options — deduped open slots. Session 1 is
// blind (any open slot in the project); Session 2 is locked to the counsellor Session 1's
// pick would assign, ≥2 calendar days later (see docs/api-list.md "Sessions").
export interface BookingSlotOption {
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
}

interface ApiBookingSlot {
  slotDate: string;
  startTime: string;
  endTime: string;
}

const mapSlot = (s: ApiBookingSlot): BookingSlotOption => ({
  date: parseApiDate(s.slotDate),
  startTime: s.startTime,
  endTime: s.endTime,
});

interface SessionPartyUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

// A counsellor has one fixed meeting room (their own Zoom/Meet link, set when they're
// added/edited) that every one of their sessions uses — there's no per-session link
// anymore (that field was removed from Session; POST /sessions/{id}/join resolves and
// returns session.counsellor.meetingLink).
export interface SessionCounsellor {
  id: string;
  counsellorCode: string;
  meetingLink: string | null;
  user: SessionPartyUser;
}

export interface SessionStudent {
  id: string;
  studentCode: string;
  parentEmail: string;
  parentMobile: string;
  user: SessionPartyUser;
}

export interface Session {
  id: string;
  studentId: string;
  counsellorId: string;
  sessionNumber: SessionNumber;
  scheduledDate: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  status: SessionStatus;
  studentJoinedAt: string | null;
  counsellorJoinedAt: string | null;
  studentNoShow: boolean;
  counsellorNoShow: boolean;
  notes: string | null;
  cancellationReason: CancellationReason | null;
  cancellationNotes: string | null;
  // Set once a STUDENT-initiated reschedule has been used — self-service reschedule is
  // limited to one per session; a further attempt 400s and points to Admin.
  studentRescheduleUsed: boolean;
  // A pending counsellor-proposed reschedule (non-null counsellorProposedDate = pending).
  // The student accepts (moves the session) or declines (clears it) via the dedicated
  // endpoints below; doesn't touch scheduledDate/startTime/endTime until accepted.
  counsellorRescheduleReason: string | null;
  counsellorProposedDate: string | null; // YYYY-MM-DD
  counsellorProposedStartTime: string | null;
  counsellorProposedEndTime: string | null;
  student: SessionStudent;
  counsellor: SessionCounsellor;
}

interface ApiSession
  extends Omit<Session, 'scheduledDate' | 'counsellorProposedDate'> {
  scheduledDate: string;
  counsellorProposedDate: string | null;
}

const mapSession = (s: ApiSession): Session => ({
  ...s,
  scheduledDate: parseApiDate(s.scheduledDate),
  counsellorProposedDate: s.counsellorProposedDate ? parseApiDate(s.counsellorProposedDate) : null,
});

export interface BookSessionsInput {
  session1: { date: string; startTime: string };
  session2: { date: string; startTime: string };
}

export interface RescheduleSessionInput {
  date: string;
  startTime: string;
  initiatedBy: InitiatedBy;
}

export interface CancelSessionInput {
  reason: CancellationReason;
  notes?: string;
  initiatedBy: InitiatedBy;
}

export type SlotStatus = 'OPEN' | 'BOOKED';

// GET /sessions/slots — a counsellor's raw availability inventory (oversight). Generic
// per date/time until booked — nothing on a slot says which session number it'll become,
// that's only decided at booking time by which pick the student makes.
export interface CounsellorSlot {
  id: string;
  projectId: string;
  counsellorId: string;
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  status: SlotStatus;
  sessionId: string | null;
}

interface ApiCounsellorSlot {
  id: string;
  projectId: string;
  counsellorId: string;
  slotDate: string;
  startTime: string;
  endTime: string;
  status: SlotStatus;
  sessionId: string | null;
}

const mapCounsellorSlot = (s: ApiCounsellorSlot): CounsellorSlot => ({
  id: s.id,
  projectId: s.projectId,
  counsellorId: s.counsellorId,
  date: parseApiDate(s.slotDate),
  startTime: s.startTime,
  endTime: s.endTime,
  status: s.status,
  sessionId: s.sessionId,
});

export const sessionsService = {
  // GET /sessions/students/{studentId}/booking-options?sessionNumber=&session1Date=&session1StartTime=
  // session1 params are required (and only meaningful) when previewing SESSION_2 options.
  getBookingOptions: async (
    studentId: string,
    sessionNumber: SessionNumber,
    session1?: { date: string; startTime: string }
  ): Promise<BookingSlotOption[]> => {
    const { data } = await apiClient.get<ApiBookingSlot[]>(
      `/sessions/students/${studentId}/booking-options`,
      {
        params: {
          sessionNumber,
          session1Date: session1?.date,
          session1StartTime: session1?.startTime,
        },
      }
    );
    return data.map(mapSlot);
  },

  // POST /sessions/students/{studentId}/book — books Session 1 & 2 together, atomically.
  // Requires workflowStatus >= ASSESSMENT_COMPLETED; 409 if sessions already exist.
  bookSessions: async (
    studentId: string,
    input: BookSessionsInput
  ): Promise<{ session1: Session; session2: Session }> => {
    const { data } = await apiClient.post<{ session1: ApiSession; session2: ApiSession }>(
      `/sessions/students/${studentId}/book`,
      input
    );
    return { session1: mapSession(data.session1), session2: mapSession(data.session2) };
  },

  // GET /sessions/students/{studentId} — the student's booked sessions (dashboard cards).
  getStudentSessions: async (studentId: string): Promise<Session[]> => {
    const { data } = await apiClient.get<ApiSession[]>(`/sessions/students/${studentId}`);
    return data.map(mapSession);
  },

  // GET /sessions/{id} — one session, incl. its studentId. Used to resolve the studentId
  // behind a :sessionId route param (e.g. the Counsellor Form Chart, which is keyed on
  // studentId server-side).
  getById: async (sessionId: string): Promise<Session> => {
    const { data } = await apiClient.get<ApiSession>(`/sessions/${sessionId}`);
    return mapSession(data);
  },

  // POST /sessions/{id}/reschedule — same (already-locked) counsellor, new date/time.
  // STUDENT-initiated requests are rejected within 24h of the current startTime.
  reschedule: async (sessionId: string, input: RescheduleSessionInput): Promise<Session> => {
    const { data } = await apiClient.post<ApiSession>(`/sessions/${sessionId}/reschedule`, input);
    return mapSession(data);
  },

  // POST /sessions/{id}/cancel — releases the slot back to OPEN.
  cancel: async (sessionId: string, input: CancelSessionInput): Promise<Session> => {
    const { data } = await apiClient.post<ApiSession>(`/sessions/${sessionId}/cancel`, input);
    return mapSession(data);
  },

  // POST /sessions/{id}/join — "Join Now". Window: 10 minutes before startTime through
  // endTime (400 outside it). Returns the counsellor's meeting link to open.
  join: async (
    sessionId: string,
    role: 'STUDENT' | 'COUNSELLOR'
  ): Promise<{ session: Session; meetingLink: string | null }> => {
    const { data } = await apiClient.post<{ session: ApiSession; meetingLink: string | null }>(
      `/sessions/${sessionId}/join`,
      { role }
    );
    return { session: mapSession(data.session), meetingLink: data.meetingLink };
  },

  // POST /sessions/students/{studentId}/restart — cancels both sessions and clears the
  // way to rebook via the normal booking-options/book flow. Only before Session 1 has
  // started (409 once it's COMPLETED or either party has joined).
  restart: async (studentId: string): Promise<Session[]> => {
    const { data } = await apiClient.post<{ cancelled: ApiSession[] }>(
      `/sessions/students/${studentId}/restart`
    );
    return data.cancelled.map(mapSession);
  },

  // POST /sessions/{id}/reschedule-request/accept — performs the counsellor's proposed
  // move. Doesn't consume the student's own 1-reschedule allowance.
  acceptCounsellorReschedule: async (sessionId: string): Promise<Session> => {
    const { data } = await apiClient.post<ApiSession>(`/sessions/${sessionId}/reschedule-request/accept`);
    return mapSession(data);
  },

  // POST /sessions/{id}/reschedule-request/decline — clears the proposal; no automatic
  // cancellation (restart is the student's own next move if they want a fresh start).
  declineCounsellorReschedule: async (sessionId: string): Promise<Session> => {
    const { data } = await apiClient.post<ApiSession>(`/sessions/${sessionId}/reschedule-request/decline`);
    return mapSession(data);
  },

  // GET /sessions/counsellors/{counsellorId} — the counsellor's own dashboard sessions.
  getCounsellorSessions: async (counsellorId: string, status?: SessionStatus): Promise<Session[]> => {
    const { data } = await apiClient.get<ApiSession[]>(`/sessions/counsellors/${counsellorId}`, {
      params: { status },
    });
    return data.map(mapSession);
  },

  // GET /sessions/slots — availability oversight, filterable by project/counsellor/status.
  getSlots: async (params: {
    projectId?: string;
    counsellorId?: string;
    status?: SlotStatus;
  }): Promise<CounsellorSlot[]> => {
    const { data } = await apiClient.get<ApiCounsellorSlot[]>('/sessions/slots', { params });
    return data.map(mapCounsellorSlot);
  },
};
