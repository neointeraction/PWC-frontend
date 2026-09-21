import dayjs from 'dayjs';
import { apiClient } from './api';
import { parseApiDate } from '@/utils';

// Client-side "Join Now" gate: enabled only within 10 minutes of the session's start
// time, before or after. This is a stricter product policy than the backend's own join
// window (10 min before through endTime — POST /sessions/{id}/join would still accept a
// join after this closes); anyone who hasn't joined once this band passes is treated as
// a no-show rather than let in late. Same window on both the student and counsellor
// sides — see hasJoinWindowClosed below for the no-show check that follows it.
const JOIN_WINDOW_MINUTES = 10;

export const isWithinJoinWindow = (session: { scheduledDate: string; startTime: string }): boolean => {
  const startsAt = dayjs(`${session.scheduledDate}T${session.startTime}`);
  return Math.abs(dayjs().diff(startsAt, 'minute')) <= JOIN_WINDOW_MINUTES;
};

// True once the join window above has closed without a join — the moment a session
// should start reading as a no-show rather than "not joined yet".
export const hasJoinWindowClosed = (session: { scheduledDate: string; startTime: string }): boolean =>
  dayjs().isAfter(dayjs(`${session.scheduledDate}T${session.startTime}`).add(JOIN_WINDOW_MINUTES, 'minute'));

// The session's actual scheduled window is happening right now — distinct from
// isWithinJoinWindow's 10-minutes-early allowance, and from a journey step merely being
// the student's "current" (next-actionable) one regardless of how far off it is.
export const isSessionLive = (session: { scheduledDate: string; startTime: string; endTime: string }): boolean => {
  const now = dayjs();
  const startsAt = dayjs(`${session.scheduledDate}T${session.startTime}`);
  const endsAt = dayjs(`${session.scheduledDate}T${session.endTime}`);
  return !now.isBefore(startsAt) && now.isBefore(endsAt);
};

// True once the scheduled end time has passed. The journey step only moves to
// "completed" when the counsellor/admin explicitly calls POST /sessions/{id}/complete
// (§10.9) — so a session can be over in wall-clock time while still sitting here waiting
// on that confirmation, and shouldn't keep reading as "Scheduled".
export const hasSessionEnded = (session: { scheduledDate: string; endTime: string }): boolean =>
  dayjs(`${session.scheduledDate}T${session.endTime}`).isBefore(dayjs());

const RESCHEDULE_LOCKOUT_HOURS = 24;

// A student-initiated reschedule or cancel needs 24 hours' notice — POST
// /sessions/{id}/reschedule 400s inside this window for initiatedBy: "STUDENT" (see
// docs/frontend-integration-guide.md §10.10), so the buttons are gated the same way here.
export const isWithinRescheduleLockout = (session: { scheduledDate: string; startTime: string }): boolean => {
  const now = dayjs();
  const startsAt = dayjs(`${session.scheduledDate}T${session.startTime}`);
  return startsAt.diff(now, 'hour', true) < RESCHEDULE_LOCKOUT_HOURS;
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
  // limited to one per session; a further attempt 400s and points to Admin. Counsellors
  // have no self-service reschedule of their own — one who needs a session moved
  // contacts Admin manually, who reschedules on the student's behalf via `initiatedBy:
  // "ADMIN"` on the same endpoint below (no separate counsellor-proposal flow exists).
  studentRescheduleUsed: boolean;
  student: SessionStudent;
  counsellor: SessionCounsellor;
}

interface ApiSession extends Omit<Session, 'scheduledDate'> {
  scheduledDate: string;
}

const mapSession = (s: ApiSession): Session => ({
  ...s,
  scheduledDate: parseApiDate(s.scheduledDate),
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

  // POST /sessions/students/{studentId}/detach — admin only. Cancels both sessions and frees
  // their slots even after Session 1 has started or completed (409 once the student is
  // past the session phase — Session 2 done, or in feedback and beyond), and rolls the student back to the booking step so both sessions can be
  // reassigned to another counsellor.
  detach: async (studentId: string): Promise<Session[]> => {
    const { data } = await apiClient.post<{ cancelled: ApiSession[] }>(
      `/sessions/students/${studentId}/detach`
    );
    return data.cancelled.map(mapSession);
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
