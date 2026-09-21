import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RiSearchLine,
  RiCheckLine,
  RiFlag2Fill,
  RiUserForbidLine,
  RiCalendarEventLine,
  // RiFileExcel2Line,
  RiVideoChatLine,
  RiUserAddLine,
  RiDeleteBinLine,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Table, Column } from '@/components/Table';
import { Tooltip, EmptyState, Loader } from '@/components';
import { Modal } from '@/components/Modal';
import { AlertModal } from '@/components/AlertModal';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { DatePicker } from '@/components/DatePicker';
import { Select } from '@/components/Select';
import { projectService } from '@/services/project.service';
import { sessionsService, hasSessionEnded } from '@/services/sessions.service';
import { CounselorSession, ProjectStudent, ProjectCounselor, ProjectSlot } from '@/types/project.types';
import { useToast } from '@/hooks';
import { formatDate, getApiErrorMessage } from '@/utils';
import { ROUTES } from '@/constants';
import { ViewStudentModal } from './ViewStudentModal';
import { AssignStudentModal } from './AssignStudentModal';
import { AddCounselorModal } from './AddCounselorModal';
import {
  Container,
  TopMetricCardsGrid,
  MetricFilterCard,
  MetricCardLabel,
  MetricCardValue,
  FilterBar,
  FiltersLeft,
  FiltersRight,
  // ToolbarIconButton,
  SearchWrapper,
  CounselorsGrid,
  CounselorCard,
  CounselorHeader,
  CounselorIdentity,
  CounselorAvatar,
  CounselorDetails,
  CounselorNameRow,
  CounselorName,
  CounselorSubtext,
  CounselorCode,
  CounselorHeaderRight,
  CounselorMetricsGroup,
  MetricChip,
  MetricChipLabel,
  MetricChipValue,
  MissedMetricChip,
  MeetIconButton,
  StudentsSection,
  StudentsTableWrapper,
  StudentNameButton,
  NBStudentText,
  SessionBadgeWrapper,
  SessionPill,
  ActionCellWrapper,
  RescheduleButton,
  ActionIconButton,
  DangerIconButton,
} from './ProjectSessionsPage.styles';

export const ProjectSessionsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isAddCounselorModalOpen, setIsAddCounselorModalOpen] = useState(false);
  const [counselorToDelete, setCounselorToDelete] = useState<CounselorSession | null>(null);
  const [selectedSlotForAssign, setSelectedSlotForAssign] = useState<{
    session: CounselorSession;
    slot: ProjectSlot;
  } | null>(null);
  const [selectedStudentForView, setSelectedStudentForView] = useState<ProjectStudent | null>(null);
  // The counsellor + slot behind the student-details popup, needed to detach that student.
  const [viewedSlotContext, setViewedSlotContext] = useState<{
    session: CounselorSession;
    slot: ProjectSlot;
  } | null>(null);
  const [studentToDetach, setStudentToDetach] = useState<{
    studentId: string;
    studentName: string;
    counselorName: string;
    sessionType?: 'S1' | 'S2';
  } | null>(null);
  const [rescheduleSlot, setRescheduleSlot] = useState<{
    counselorId: string;
    counselorName: string;
    slot: ProjectSlot;
  } | null>(null);

  // Reschedule form state — populated from the counsellor's real open slots (below),
  // not a fixed date/time list.
  const [rescheduleDate, setRescheduleDate] = useState<Date | null>(null);
  const [rescheduleTime, setRescheduleTime] = useState('');

  // The same counsellor's remaining open availability — reschedule keeps them locked in,
  // it just moves to a different one of their own open slots.
  const { data: rescheduleOpenSlots = [] } = useQuery({
    queryKey: ['reschedule-open-slots', rescheduleSlot?.counselorId, projectId],
    queryFn: () =>
      sessionsService.getSlots({
        counsellorId: rescheduleSlot!.counselorId,
        projectId: projectId as string,
        status: 'OPEN',
      }),
    enabled: Boolean(rescheduleSlot?.counselorId && projectId),
  });

  // The session being rescheduled may itself be in the past (a missed session), but the
  // *new* slot has to be upcoming — drop any open slot whose start time has already passed
  // (earlier dates, and earlier times today), so only future dates/times are offered.
  const upcomingRescheduleSlots = useMemo(() => {
    const now = new Date();
    return rescheduleOpenSlots.filter(s => {
      const [y, m, d] = s.date.split('-').map(Number);
      const [hh, mm] = s.startTime.split(':').map(Number);
      return new Date(y, m - 1, d, hh || 0, mm || 0) > now;
    });
  }, [rescheduleOpenSlots]);

  const rescheduleDates = useMemo(
    () => Array.from(new Set(upcomingRescheduleSlots.map(s => s.date))).sort(),
    [upcomingRescheduleSlots]
  );

  const rescheduleDateObjs = useMemo(
    () =>
      rescheduleDates.map(d => {
        const [y, m, day] = d.split('-').map(Number);
        return new Date(y, m - 1, day);
      }),
    [rescheduleDates]
  );

  const rescheduleTimeOptions = useMemo(() => {
    if (!rescheduleDate) return [];
    const ymd = [
      rescheduleDate.getFullYear(),
      String(rescheduleDate.getMonth() + 1).padStart(2, '0'),
      String(rescheduleDate.getDate()).padStart(2, '0'),
    ].join('-');
    return upcomingRescheduleSlots
      .filter(s => s.date === ymd)
      .map(s => ({ value: `${s.startTime} - ${s.endTime}`, label: `${s.startTime} - ${s.endTime}` }));
  }, [upcomingRescheduleSlots, rescheduleDate]);

  // Default-select the first available date once this counsellor's open slots load.
  useEffect(() => {
    if (rescheduleSlot && rescheduleDates.length > 0 && !rescheduleDate) {
      const [y, m, d] = rescheduleDates[0].split('-').map(Number);
      setRescheduleDate(new Date(y, m - 1, d));
    }
  }, [rescheduleDates, rescheduleSlot, rescheduleDate]);

  // Default-select the first time slot for whichever date is picked.
  useEffect(() => {
    if (rescheduleTimeOptions.length === 0) {
      setRescheduleTime('');
    } else if (!rescheduleTimeOptions.some(o => o.value === rescheduleTime)) {
      setRescheduleTime(rescheduleTimeOptions[0].value);
    }
  }, [rescheduleTimeOptions, rescheduleTime]);

  const handleCloseRescheduleModal = () => {
    setRescheduleSlot(null);
    setRescheduleDate(null);
    setRescheduleTime('');
  };

  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectService.getById(projectId as string),
    enabled: Boolean(projectId),
  });

  const { data: effectiveSessions = [], isLoading } = useQuery({
    queryKey: ['projectSessions', projectId],
    queryFn: () => projectService.getProjectSessions(projectId as string),
    enabled: Boolean(projectId),
  });

  // Every schedule write lands back through the same two endpoints this page reads.
  const refreshSchedule = () => {
    queryClient.invalidateQueries({ queryKey: ['projectSessions', projectId] });
    queryClient.invalidateQueries({ queryKey: ['project', projectId] });
  };

  // Assigns each counsellor to the project (POST /counsellors/{id}/projects) and imports
  // their availability slots. Only rows matched against the real directory carry the id
  // that endpoint needs; anything else has to be created under Counselors List first.
  const assignCounselorsMutation = useMutation({
    mutationFn: (newCounselors: ProjectCounselor[]) => {
      const unmatched = newCounselors.filter(c => !c.directoryId).map(c => c.counsellorCode || c.name);
      return projectService
        .assignCounselorsToProject(projectId as string, newCounselors)
        .then(result => ({ ...result, unmatched }));
    },
    onSuccess: ({ assigned, failures, slotImport, unmatched }) => {
      refreshSchedule();
      setIsAddCounselorModalOpen(false);
      if (assigned > 0) {
        toast.success(
          'Counselors Assigned',
          `Assigned ${assigned} counselor(s) to this project` +
            (slotImport.imported > 0 ? ` with ${slotImport.imported} availability slot(s).` : '.')
        );
      }
      if (failures.length > 0) {
        toast.warning(
          'Some Counselors Skipped',
          failures.map(f => `${f.name}: ${f.reason}`).join(' · ')
        );
      }
      if (slotImport.error) {
        toast.warning('Availability Not Imported', slotImport.error);
      }
      if (unmatched.length > 0) {
        toast.warning(
          'Not In Directory',
          `${unmatched.join(', ')} — add them under Counselors List before assigning.`
        );
      }
    },
    onError: err => {
      toast.error('Assignment Failed', getApiErrorMessage(err, 'Could not assign counselors.'));
    },
  });

  const handleCounselorsAssigned = (newCounselors: ProjectCounselor[]) => {
    assignCounselorsMutation.mutate(newCounselors);
  };

  const unassignCounselorMutation = useMutation({
    mutationFn: (counselor: CounselorSession) =>
      projectService.unassignCounsellorFromProject(counselor.counselorId, projectId as string),
    onSuccess: (_data, counselor) => {
      refreshSchedule();
      toast.success(
        'Counselor Removed',
        `Removed ${counselor.counselorName} from project counselor assignments.`
      );
      setCounselorToDelete(null);
    },
    onError: err => {
      toast.error('Removal Failed', getApiErrorMessage(err, 'Could not remove this counselor.'));
    },
  });

  const handleConfirmDeleteCounselor = () => {
    if (!counselorToDelete) return;
    unassignCounselorMutation.mutate(counselorToDelete);
  };

  const handleCopyMeetLink = (session: CounselorSession) => {
    if (!session.counselorMeetingLink) {
      toast.error(
        'No Meet Link',
        `${session.counselorName} has no meeting link on file. Add one from Counselors List.`
      );
      return;
    }
    navigator.clipboard.writeText(session.counselorMeetingLink);
    toast.success(
      'Link Copied',
      `Google Meet link for ${session.counselorName} copied to clipboard.`
    );
  };

  // const handleExportExcel = () => {
  //   const rows: string[] = [];
  //   rows.push('Counselor Code,Counselor Name,Counselor Email,Counselor Phone,Date,Time,Student Name,Session,Student Phone,Status');

  //   filteredSessions.forEach(session => {
  //     const code = session.counselorCode;
  //     session.slots.forEach(slot => {
  //       const student = slot.studentName || 'Not Booked';
  //       const sessionType = slot.sessionType || (slot.isBooked ? 'S1' : 'NB');
  //       const phone = slot.mobile || '—';
  //       const status = slot.isMissed ? 'Missed' : slot.isBooked ? 'Completed' : 'Available';
  //       rows.push(`"${code}","${session.counselorName}","${session.counselorEmail}","${session.counselorPhone}","${slot.date}","${slot.time}","${student}","${sessionType}","${phone}","${status}"`);
  //     });
  //   });

  //   const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.setAttribute('href', url);
  //   link.setAttribute('download', `${(project?.name || 'Project_Sessions').replace(/\s+/g, '_')}_List.csv`);
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //   toast.success('Excel Export Started', 'Downloaded project sessions list (.csv).');
  // };

  const handleOpenAssignModal = (session: CounselorSession, slot: ProjectSlot) => {
    setSelectedSlotForAssign({ session, slot });
  };

  // POST /sessions — admin manual booking against the counsellor whose slot was clicked.
  const assignStudentMutation = useMutation({
    mutationFn: (input: { studentId: string; sessionType: 'S1' | 'S2' }) => {
      if (!selectedSlotForAssign) throw new Error('No slot selected');
      const { session, slot } = selectedSlotForAssign;
      return projectService.assignStudentToSlot({
        studentId: input.studentId,
        counsellorId: session.counselorId,
        sessionType: input.sessionType,
        date: slot.slotDate,
        startTime: slot.startTime,
        endTime: slot.endTime,
      });
    },
    onSuccess: () => {
      const label = selectedSlotForAssign;
      refreshSchedule();
      toast.success(
        'Schedule Saved',
        `Assigned a student to ${label?.session.counselorName}'s session on ${label?.slot.date ? formatDate(label.slot.date) : ''}.`
      );
      setSelectedSlotForAssign(null);
    },
    onError: err => {
      toast.error('Assignment Failed', getApiErrorMessage(err, 'Could not book this session.'));
    },
  });

  const handleSaveSlotAssignment = (input: { studentId: string; sessionType: 'S1' | 'S2' }) => {
    assignStudentMutation.mutate(input);
  };

  // DELETE /sessions/slots/{id} — removes an open (unbooked) availability slot, after the
  // admin confirms. Booked slots have no delete action (cancel the session first).
  const [slotToDelete, setSlotToDelete] = useState<{ counselorName: string; slot: ProjectSlot } | null>(
    null
  );
  const deleteSlotMutation = useMutation({
    mutationFn: (slotId: string) => projectService.deleteSlot(slotId),
    onSuccess: () => {
      refreshSchedule();
      toast.success('Slot Deleted', 'The open slot has been removed from the counselor\'s schedule.');
      setSlotToDelete(null);
    },
    onError: err => {
      toast.error('Delete Failed', getApiErrorMessage(err, 'Could not delete this slot.'));
      setSlotToDelete(null);
    },
  });

  // POST /sessions/{id}/reschedule — same counsellor, new date/time. Only a booked row
  // has a session behind it to move.
  const rescheduleMutation = useMutation({
    mutationFn: ({ sessionId, date, startTime }: { sessionId: string; date: string; startTime: string }) =>
      projectService.rescheduleSession(sessionId, date, startTime),
    onSuccess: () => {
      refreshSchedule();
      toast.success(
        'Session Rescheduled',
        `Rescheduled session for ${rescheduleSlot?.slot.studentName ?? 'the student'}.`
      );
      handleCloseRescheduleModal();
    },
    onError: err => {
      toast.error('Reschedule Failed', getApiErrorMessage(err, 'Could not reschedule this session.'));
    },
  });

  const handleConfirmReschedule = () => {
    if (!rescheduleSlot?.slot.sessionId) {
      toast.error('Nothing To Reschedule', 'This slot has no booked session behind it.');
      return;
    }
    if (!rescheduleDate) {
      toast.error('Date Required', 'Pick the new session date.');
      return;
    }
    if (!rescheduleTime) {
      toast.error('Time Required', 'Pick an available time slot for that date.');
      return;
    }
    // The picker holds a local Date; the API takes a plain YYYY-MM-DD.
    const date = [
      rescheduleDate.getFullYear(),
      String(rescheduleDate.getMonth() + 1).padStart(2, '0'),
      String(rescheduleDate.getDate()).padStart(2, '0'),
    ].join('-');
    // "11:00 - 12:00" -> "11:00"; the backend derives the end from the slot it claims.
    const startTime = rescheduleTime.split('-')[0].trim();
    rescheduleMutation.mutate({ sessionId: rescheduleSlot.slot.sessionId, date, startTime });
  };

  // POST /sessions/students/{id}/detach — cancels the student's Session 1 *and* Session 2
  // together (both must stay with one counsellor, even if Session 1 is already done), frees
  // both slots and sends the student back to booking, so they can be assigned to another
  // counsellor. The backend 409s only once Session 2 is completed.
  const detachStudentMutation = useMutation({
    mutationFn: (studentId: string) => projectService.detachStudent(projectId as string, studentId),
    onSuccess: () => {
      refreshSchedule();
      toast.success(
        'Student Detached',
        `${studentToDetach?.studentName ?? 'The student'} was removed from ${studentToDetach?.counselorName ?? 'the counselor'}'s slots. You can now assign them to another counselor.`
      );
      setStudentToDetach(null);
    },
    onError: err => {
      toast.error('Detach Failed', getApiErrorMessage(err, 'Could not detach this student.'));
      setStudentToDetach(null);
    },
  });

  const handleRequestDetach = () => {
    if (!viewedSlotContext?.slot.studentId) {
      toast.error('Nothing To Detach', 'This slot has no booked student behind it.');
      return;
    }
    const { session, slot } = viewedSlotContext;
    setStudentToDetach({
      studentId: slot.studentId as string,
      studentName: slot.studentName || 'this student',
      counselorName: session.counselorName,
      sessionType: slot.sessionType,
    });
    setSelectedStudentForView(null);
    setViewedSlotContext(null);
  };

  const todayLabel = formatDate(new Date().toISOString());

  const filteredSessions = effectiveSessions.filter(s => {
    const slots = s.slots;

    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.counselorName.toLowerCase().includes(q) ||
      s.counselorCode.toLowerCase().includes(q) ||
      slots.some(slot => slot.studentName && slot.studentName.toLowerCase().includes(q))
    );
  });

  const followUpTodayCount = effectiveSessions.reduce(
    (count, s) => count + s.slots.filter(slot => slot.isBooked && slot.date === todayLabel).length,
    0
  );
  const missedSession1Count = effectiveSessions.reduce(
    (count, s) =>
      count + s.slots.filter(slot => slot.isBooked && slot.sessionType === 'S1' && slot.isMissed).length,
    0
  );
  const missedSession2Count = effectiveSessions.reduce(
    (count, s) =>
      count + s.slots.filter(slot => slot.isBooked && slot.sessionType === 'S2' && slot.isMissed).length,
    0
  );

  const getSlotColumns = (
    session: CounselorSession
  ): Column<ProjectSlot>[] => [
    {
      key: 'date',
      header: 'Date',
      render: row => (
        <span style={{ color: row.isBooked ? undefined : '#94A3B8', fontWeight: 500 }}>
          {row.date ? formatDate(row.date) : ''}
        </span>
      ),
    },
    {
      key: 'time',
      header: 'Time',
      render: row => (
        <strong style={{ color: row.isBooked ? undefined : '#94A3B8' }}>
          {row.time}
        </strong>
      ),
    },
    {
      key: 'studentName',
      header: 'Student',
      render: row =>
        row.isBooked ? (
          <StudentNameButton
            type="button"
            onClick={() => {
              setViewedSlotContext({ session, slot: row });
              setSelectedStudentForView({
                studentId: row.studentCode,
                name: row.studentName || '',
                email: row.studentEmail || '',
                mobile: row.mobile || '',
                grade: row.grade || '',
                sessionDate: row.slotDate,
                timeSlot: row.time,
                sessionType: row.sessionType === 'S2' ? 'S2' : 'S1',
                isMissed: row.isMissed,
              });
            }}
          >
            {row.studentName}
          </StudentNameButton>
        ) : (
          <NBStudentText>NB (not booked)</NBStudentText>
        ),
    },
    {
      key: 'sessionType',
      header: 'Session',
      render: row => {
        if (!row.isBooked) {
          return <SessionPill $type="NB">NB</SessionPill>;
        }
        if (row.isMissed) {
          // Name who no-showed for the admin, even though every case shares the same
          // "needs reschedule" follow-up — a counsellor-only miss gets a distinct color
          // so it doesn't read as the student's absence.
          const missedByStudent = Boolean(row.studentNoShow);
          const missedByCounsellor = Boolean(row.counsellorNoShow);
          const missedLabel =
            missedByStudent && missedByCounsellor
              ? 'Both Student & Counsellor No-Show — Reschedule Required'
              : missedByCounsellor
                ? 'Counsellor No-Show — did not join within the 10-minute window. Reschedule Required.'
                : missedByStudent
                  ? 'Student No-Show — did not join within the 10-minute window. Reschedule Required.'
                  : 'Missed Session — Reschedule Required';
          const missedByCounsellorOnly = missedByCounsellor && !missedByStudent;
          return (
            <SessionBadgeWrapper>
              <SessionPill $type={row.sessionType === 'S2' ? 'S2' : 'S1'} $isMissed>
                {row.sessionType || 'S2'}
              </SessionPill>
              <Tooltip content={missedLabel}>
                <RiFlag2Fill
                  size={14}
                  style={{ color: missedByCounsellorOnly ? '#D97706' : '#EF4444' }}
                />
              </Tooltip>
            </SessionBadgeWrapper>
          );
        }
        return (
          <SessionBadgeWrapper>
            <SessionPill $type={row.sessionType === 'S2' ? 'S2' : 'S1'}>
              {row.sessionType || 'S1'}
            </SessionPill>
            {row.attended && (
              <Tooltip content="Both student and counsellor joined the session">
                <RiCheckLine size={16} style={{ color: '#16A34A' }} />
              </Tooltip>
            )}
          </SessionBadgeWrapper>
        );
      },
    },
    {
      key: 'mobile',
      header: 'Phone',
      render: row =>
        row.isBooked ? (
          row.mobile || '—'
        ) : (
          <span style={{ color: '#CBD5E1' }}>—</span>
        ),
    },
    {
      key: 'action',
      header: 'Action',
      render: row => {
        if (row.isBooked) {
          // Admin reschedule has no notice window (unlike the student's own 24h
          // self-service rule) — it's just gated on whether there's still something to
          // reschedule: a session that already happened and went fine needs nothing,
          // one that's upcoming or was missed still does.
          const nothingToReschedule =
            (hasSessionEnded({ scheduledDate: row.slotDate, endTime: row.endTime }) || row.attended) &&
            !row.isMissed;
          const button = (
            <RescheduleButton
              type="button"
              disabled={nothingToReschedule}
              onClick={() => {
                if (nothingToReschedule) return;
                setRescheduleSlot({
                  counselorId: session.counselorId,
                  counselorName: session.counselorName,
                  slot: row,
                });
              }}
            >
              Reschedule
            </RescheduleButton>
          );
          return (
            <ActionCellWrapper>
              {nothingToReschedule ? (
                <Tooltip content="This session already happened — nothing to reschedule">
                  {button}
                </Tooltip>
              ) : (
                button
              )}
            </ActionCellWrapper>
          );
        }
        return (
          <ActionCellWrapper>
            <Tooltip content="Assign Student to Slot">
              <ActionIconButton
                type="button"
                onClick={() => handleOpenAssignModal(session, row)}
              >
                <RiCalendarEventLine size={15} />
              </ActionIconButton>
            </Tooltip>
            <Tooltip content="Delete Slot">
              <DangerIconButton
                type="button"
                aria-label="Delete slot"
                onClick={() => setSlotToDelete({ counselorName: session.counselorName, slot: row })}
              >
                <RiDeleteBinLine size={15} />
              </DangerIconButton>
            </Tooltip>
          </ActionCellWrapper>
        );
      },
    },
  ];

  return (
    <Container>
      <PageHeader
        title={`Project Sessions - ${project?.name || 'Career Guidance 2026 Batch A'}`}
        subtitle={`School: ${project?.instituteName || "St. Xavier's College, Mumbai"} • View counselor time slots and assigned student details.`}
        breadcrumbs={[
          { label: 'Dashboard', href: ROUTES.DASHBOARD },
          { label: 'Projects', href: ROUTES.PROJECTS },
          { label: 'Project Sessions' },
        ]}
        onBack={() => navigate(ROUTES.PROJECTS)}
      />

      {/* Top Follow-up Metric Cards */}
      <TopMetricCardsGrid>
        <MetricFilterCard>
          <MetricCardLabel>Follow-up today</MetricCardLabel>
          <MetricCardValue $color="#5D2384">{followUpTodayCount}</MetricCardValue>
        </MetricFilterCard>

        <MetricFilterCard>
          <MetricCardLabel>Missed Session - 1</MetricCardLabel>
          <MetricCardValue $color="#EA580C">{missedSession1Count}</MetricCardValue>
        </MetricFilterCard>

        <MetricFilterCard>
          <MetricCardLabel>Missed Session - 2</MetricCardLabel>
          <MetricCardValue $color="#EA580C">{missedSession2Count}</MetricCardValue>
        </MetricFilterCard>
      </TopMetricCardsGrid>

      <Card padding="lg">
        <FilterBar style={{ marginBottom: '20px' }}>
          <FiltersLeft>
            <SearchWrapper>
              <Input
                placeholder="Search counselor or student name..."
                leftIcon={<RiSearchLine size={16} />}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </SearchWrapper>
          </FiltersLeft>

          <FiltersRight>
            {/* <Tooltip content="Export Sessions to Excel">
              <ToolbarIconButton
                type="button"
                $variant="excel"
                onClick={handleExportExcel}
                aria-label="Export Sessions to Excel"
              >
                <RiFileExcel2Line size={18} />
              </ToolbarIconButton>
            </Tooltip> */}

            <Button
              leftIcon={<RiUserAddLine size={16} />}
              onClick={() => setIsAddCounselorModalOpen(true)}
            >
              Add Counselor
            </Button>
          </FiltersRight>
        </FilterBar>

        {isLoading ? (
          <Loader />
        ) : filteredSessions.length === 0 ? (
          <EmptyState
            title="No counselor sessions found"
            description="Try adjusting your search criteria or filter."
          />
        ) : (
          <CounselorsGrid>
            {filteredSessions.map(session => {
              const code = session.counselorCode;
              const slots = session.slots;
              const bookedCount = slots.filter(slot => slot.isBooked).length;
              const session1Count = slots.filter(
                slot => slot.isBooked && slot.sessionType === 'S1'
              ).length;
              const session2Count = slots.filter(
                slot => slot.isBooked && slot.sessionType === 'S2'
              ).length;
              const missedCount = slots.filter(slot => slot.isBooked && slot.isMissed).length;

              return (
                <CounselorCard key={session.id}>
                  <CounselorHeader>
                    <CounselorIdentity>
                      <CounselorAvatar>
                        {session.counselorName
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </CounselorAvatar>
                      <CounselorDetails>
                        <CounselorNameRow>
                          <CounselorName>{session.counselorName}</CounselorName>
                          <CounselorCode>{code}</CounselorCode>
                        </CounselorNameRow>
                        <CounselorSubtext>
                          {session.counselorEmail} • {session.counselorPhone}
                        </CounselorSubtext>
                      </CounselorDetails>
                    </CounselorIdentity>

                    <CounselorHeaderRight>
                      <CounselorMetricsGroup>
                        <MetricChip>
                          <MetricChipLabel>Booked</MetricChipLabel>
                          <MetricChipValue>{bookedCount}/{slots.length} hrs</MetricChipValue>
                        </MetricChip>

                        <MetricChip>
                          <MetricChipLabel>Session 1</MetricChipLabel>
                          <MetricChipValue>{session1Count}</MetricChipValue>
                        </MetricChip>

                        <MetricChip>
                          <MetricChipLabel>Session 2</MetricChipLabel>
                          <MetricChipValue>{session2Count}</MetricChipValue>
                        </MetricChip>

                        <MissedMetricChip>
                          <RiUserForbidLine size={15} />
                          <span>{missedCount} Missed</span>
                        </MissedMetricChip>
                      </CounselorMetricsGroup>

                      <Tooltip content="Copy Google Meet link for this counselor">
                        <MeetIconButton
                          type="button"
                          onClick={() => handleCopyMeetLink(session)}
                          aria-label="Copy Google Meet Link"
                        >
                          <RiVideoChatLine size={18} />
                        </MeetIconButton>
                      </Tooltip>

                      <Tooltip content="Remove Counselor from Project">
                        <MeetIconButton
                          type="button"
                          onClick={() => setCounselorToDelete(session)}
                          aria-label="Remove Counselor"
                          style={{ color: '#DC2626' }}
                        >
                          <RiDeleteBinLine size={18} />
                        </MeetIconButton>
                      </Tooltip>
                    </CounselorHeaderRight>
                  </CounselorHeader>

                  <StudentsSection>
                    <StudentsTableWrapper>
                      <Table
                        columns={getSlotColumns(session)}
                        data={slots}
                        keyExtractor={row => row.id}
                        emptyMessage="No available or booked session slots."
                      />
                    </StudentsTableWrapper>
                  </StudentsSection>
                </CounselorCard>
              );
            })}
          </CounselorsGrid>
        )}
      </Card>

      {/* Delete open slot confirmation */}
      <ConfirmDialog
        isOpen={Boolean(slotToDelete)}
        onClose={() => setSlotToDelete(null)}
        onConfirm={() => slotToDelete && deleteSlotMutation.mutate(slotToDelete.slot.id)}
        title="Delete this slot?"
        description={
          slotToDelete
            ? `This will permanently remove ${slotToDelete.counselorName}'s open slot on ${formatDate(slotToDelete.slot.date)} (${slotToDelete.slot.time}). Students will no longer be able to book it.`
            : undefined
        }
        confirmLabel="Delete Slot"
        isLoading={deleteSlotMutation.isPending}
        isDangerous
      />

      {/* Assign Student Modal */}
      <AssignStudentModal
        isOpen={Boolean(selectedSlotForAssign)}
        onClose={() => setSelectedSlotForAssign(null)}
        session={selectedSlotForAssign?.session || null}
        slot={selectedSlotForAssign?.slot || null}
        projectId={projectId}
        onSave={handleSaveSlotAssignment}
        isSaving={assignStudentMutation.isPending}
      />

      {/* View Student Modal */}
      <ViewStudentModal
        isOpen={Boolean(selectedStudentForView)}
        onClose={() => {
          setSelectedStudentForView(null);
          setViewedSlotContext(null);
        }}
        student={selectedStudentForView}
        instituteName={project?.instituteName}
        counselorPhone={viewedSlotContext?.session.counselorPhone}
        onDetach={
          viewedSlotContext?.slot.studentId && viewedSlotContext.slot.canDetach
            ? handleRequestDetach
            : undefined
        }
      />

      {/* Detach Student Confirmation Modal */}
      <AlertModal
        isOpen={Boolean(studentToDetach)}
        onClose={() => setStudentToDetach(null)}
        onConfirm={() => studentToDetach && detachStudentMutation.mutate(studentToDetach.studentId)}
        title="Detach Student from Counselor?"
        description={`${studentToDetach?.studentName} will be removed from ${studentToDetach?.counselorName}'s slots. Both Session 1 and Session 2 will be cancelled and their slots released${
          studentToDetach?.sessionType === 'S2'
            ? ', even though you opened Session 2 — both sessions must be taken by the same counselor'
            : ''
        }. This applies even if Session 1 was already completed: the student goes back to the Session 1 booking step and both sessions must be reassigned or rescheduled with another counselor. The student, parent and counselor will be notified by email.`}
        variant="danger"
        confirmText="Detach Student"
        cancelText="Cancel"
        isLoading={detachStudentMutation.isPending}
      />

      {/* Reschedule Session Modal */}
      <Modal
        isOpen={Boolean(rescheduleSlot)}
        onClose={handleCloseRescheduleModal}
        title={`Reschedule Session — ${rescheduleSlot?.slot.studentName}`}
        size="md"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>SESSION DETAILS</span>
            <p style={{ margin: '4px 0 0 0', fontWeight: 700, fontSize: '14px' }}>
              {rescheduleSlot?.slot.studentName} • {rescheduleSlot?.slot.sessionType || 'Session'} • Counselor: {rescheduleSlot?.counselorName}
            </p>
          </div>

          <DatePicker
            label="New Session Date"
            selected={rescheduleDate}
            onChange={(date: Date | null) => setRescheduleDate(date)}
            placeholderText={rescheduleDates.length > 0 ? 'Select new date' : 'No open slots for this counselor'}
            includeDates={rescheduleDateObjs}
          />

          <Select
            label="Available Time Slot"
            value={rescheduleTime}
            onChange={e => setRescheduleTime(e.target.value)}
            options={
              rescheduleTimeOptions.length > 0
                ? rescheduleTimeOptions
                : [{ value: '', label: 'No open slots for this date' }]
            }
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
            <Button variant="secondary" size="sm" onClick={handleCloseRescheduleModal}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleConfirmReschedule}
              isLoading={rescheduleMutation.isPending}
              disabled={!rescheduleDate || !rescheduleTime}
            >
              Confirm Reschedule
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add / Assign Counselors Modal */}
      <AddCounselorModal
        isOpen={isAddCounselorModalOpen}
        onClose={() => setIsAddCounselorModalOpen(false)}
        onCounselorsAssigned={handleCounselorsAssigned}
      />

      {/* Counselor Delete / Unassign Confirmation Modal */}
      <AlertModal
        isOpen={Boolean(counselorToDelete)}
        onClose={() => setCounselorToDelete(null)}
        onConfirm={handleConfirmDeleteCounselor}
        title="Remove Counselor from Project?"
        description={`Are you sure you want to remove ${counselorToDelete?.counselorName} (${counselorToDelete?.counselorCode ?? ''}) from this project? If this counselor has active or booked sessions, any uncompleted sessions will need to be rescheduled or reassigned.`}
        variant="danger"
        confirmText="Remove Counselor"
        cancelText="Cancel"
      />
    </Container>
  );
};

export default ProjectSessionsPage;
