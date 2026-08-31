import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RiSearchLine,
  RiCheckLine,
  RiFlag2Fill,
  RiUserForbidLine,
  RiCalendarEventLine,
  RiFileExcel2Line,
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
import { DatePicker } from '@/components/DatePicker';
import { Select } from '@/components/Select';
import { projectService } from '@/services/project.service';
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
  ToolbarIconButton,
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
} from './ProjectSessionsPage.styles';

export const ProjectSessionsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string | null>(null);

  // Modals state
  const [isAddCounselorModalOpen, setIsAddCounselorModalOpen] = useState(false);
  const [counselorToDelete, setCounselorToDelete] = useState<CounselorSession | null>(null);
  const [selectedSlotForAssign, setSelectedSlotForAssign] = useState<{
    session: CounselorSession;
    slot: ProjectSlot;
  } | null>(null);
  const [selectedStudentForView, setSelectedStudentForView] = useState<ProjectStudent | null>(null);
  const [rescheduleSlot, setRescheduleSlot] = useState<{
    counselorName: string;
    slot: ProjectSlot;
  } | null>(null);

  // Reschedule form state
  const [rescheduleDate, setRescheduleDate] = useState<Date | null>(new Date('2026-02-28'));
  const [rescheduleTime, setRescheduleTime] = useState('11:00 - 12:00');

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
    const link = `https://meet.google.com/pwc-${session.counselorId.toLowerCase()}`;
    navigator.clipboard.writeText(link);
    toast.success(
      'Link Copied',
      `Google Meet link for ${session.counselorName} copied to clipboard.`
    );
  };

  const handleExportExcel = () => {
    const rows: string[] = [];
    rows.push('Counselor Code,Counselor Name,Counselor Email,Counselor Phone,Date,Time,Student Name,Session,Student Phone,Status');

    filteredSessions.forEach(session => {
      const code = session.counselorCode;
      session.slots.forEach(slot => {
        const student = slot.studentName || 'Not Booked';
        const sessionType = slot.sessionType || (slot.isBooked ? 'S1' : 'NB');
        const phone = slot.mobile || '—';
        const status = slot.isMissed ? 'Missed' : slot.isBooked ? 'Completed' : 'Available';
        rows.push(`"${code}","${session.counselorName}","${session.counselorEmail}","${session.counselorPhone}","${slot.date}","${slot.time}","${student}","${sessionType}","${phone}","${status}"`);
      });
    });

    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${(project?.name || 'Project_Sessions').replace(/\s+/g, '_')}_List.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Excel Export Started', 'Downloaded project sessions list (.csv).');
  };

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
      setRescheduleSlot(null);
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

  const filteredSessions = effectiveSessions.filter(s => {
    const slots = s.slots;

    if (selectedFilterCategory === 'follow_up_today') {
      return slots.some(slot => slot.isBooked);
    }
    if (selectedFilterCategory === 'missed_session_1') {
      return slots.some(slot => slot.isBooked && slot.sessionType === 'S1' && slot.isMissed);
    }
    if (selectedFilterCategory === 'missed_session_2') {
      return slots.some(slot => slot.isBooked && slot.sessionType === 'S2' && slot.isMissed);
    }

    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.counselorName.toLowerCase().includes(q) ||
      s.counselorCode.toLowerCase().includes(q) ||
      slots.some(slot => slot.studentName && slot.studentName.toLowerCase().includes(q))
    );
  });

  const followUpTodayCount = effectiveSessions.reduce(
    (count, s) => count + s.slots.filter(slot => slot.isBooked).length,
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
            onClick={() =>
              setSelectedStudentForView({
                studentId: row.studentCode,
                name: row.studentName || '',
                email: row.studentEmail || '',
                mobile: row.mobile || '',
                grade: row.grade || '',
                sessionDate: row.slotDate,
                timeSlot: row.time,
                sessionType: row.sessionType === 'S2' ? 'S2' : 'S1',
              })
            }
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
          return (
            <SessionBadgeWrapper>
              <SessionPill $type={row.sessionType === 'S2' ? 'S2' : 'S1'} $isMissed>
                {row.sessionType || 'S2'}
              </SessionPill>
              <Tooltip content="Missed Session — Reschedule Required">
                <RiFlag2Fill size={14} style={{ color: '#EF4444' }} />
              </Tooltip>
            </SessionBadgeWrapper>
          );
        }
        return (
          <SessionBadgeWrapper>
            <SessionPill $type={row.sessionType === 'S2' ? 'S2' : 'S1'}>
              {row.sessionType || 'S1'}
            </SessionPill>
            <RiCheckLine size={16} style={{ color: '#16A34A' }} />
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
      render: row => (
        <ActionCellWrapper>
          {row.isBooked && row.isMissed ? (
            <RescheduleButton
              type="button"
              onClick={() => {
                setRescheduleSlot({
                  counselorName: session.counselorName,
                  slot: row,
                });
              }}
            >
              Reschedule
            </RescheduleButton>
          ) : !row.isBooked ? (
            <Tooltip content="Assign Student to Slot">
              <ActionIconButton
                type="button"
                onClick={() => handleOpenAssignModal(session, row)}
              >
                <RiCalendarEventLine size={15} />
              </ActionIconButton>
            </Tooltip>
          ) : null}
        </ActionCellWrapper>
      ),
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

      {/* Top Follow-up Metric Filter Cards */}
      <TopMetricCardsGrid>
        <MetricFilterCard
          type="button"
          $isActive={selectedFilterCategory === 'follow_up_today'}
          onClick={() =>
            setSelectedFilterCategory(prev =>
              prev === 'follow_up_today' ? null : 'follow_up_today'
            )
          }
        >
          <MetricCardLabel>Follow-up today</MetricCardLabel>
          <MetricCardValue $color="#5D2384">{followUpTodayCount}</MetricCardValue>
        </MetricFilterCard>

        <MetricFilterCard
          type="button"
          $isActive={selectedFilterCategory === 'missed_session_1'}
          onClick={() =>
            setSelectedFilterCategory(prev =>
              prev === 'missed_session_1' ? null : 'missed_session_1'
            )
          }
        >
          <MetricCardLabel>Missed Session - 1</MetricCardLabel>
          <MetricCardValue $color="#EA580C">{missedSession1Count}</MetricCardValue>
        </MetricFilterCard>

        <MetricFilterCard
          type="button"
          $isActive={selectedFilterCategory === 'missed_session_2'}
          onClick={() =>
            setSelectedFilterCategory(prev =>
              prev === 'missed_session_2' ? null : 'missed_session_2'
            )
          }
        >
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
            <Tooltip content="Export Sessions to Excel">
              <ToolbarIconButton
                type="button"
                $variant="excel"
                onClick={handleExportExcel}
                aria-label="Export Sessions to Excel"
              >
                <RiFileExcel2Line size={18} />
              </ToolbarIconButton>
            </Tooltip>

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
        onClose={() => setSelectedStudentForView(null)}
        student={selectedStudentForView}
        instituteName={project?.instituteName}
      />

      {/* Reschedule Session Modal */}
      <Modal
        isOpen={Boolean(rescheduleSlot)}
        onClose={() => setRescheduleSlot(null)}
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
            placeholderText="Select new date"
          />

          <Select
            label="Available Time Slot"
            value={rescheduleTime}
            onChange={e => setRescheduleTime(e.target.value)}
            options={[
              { value: '09:30 - 10:30', label: '09:30 AM - 10:30 AM' },
              { value: '11:00 - 12:00', label: '11:00 AM - 12:00 PM' },
              { value: '14:00 - 15:00', label: '02:00 PM - 03:00 PM' },
              { value: '16:00 - 17:00', label: '04:00 PM - 05:00 PM' },
            ]}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
            <Button variant="secondary" size="sm" onClick={() => setRescheduleSlot(null)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleConfirmReschedule}>
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
