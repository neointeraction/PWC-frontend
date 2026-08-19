import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  RiSearchLine,
  RiFileCopyLine,
  RiCheckLine,
  RiFlag2Fill,
  RiMessage2Line,
  RiUserForbidLine,
  RiCalendarEventLine,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Table, Column } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { Tooltip, EmptyState, Loader } from '@/components';
import { Modal } from '@/components/Modal';
import { DatePicker } from '@/components/DatePicker';
import { Select } from '@/components/Select';
import { projectService } from '@/services/project.service';
import { CounselorSession, ProjectStudent } from '@/types/project.types';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { ViewStudentModal } from './ViewStudentModal';
import { AssignStudentModal, SlotData } from './AssignStudentModal';
import { LogCallModal } from '../components/LogCallModal';
import {
  Container,
  TopMetricCardsGrid,
  MetricFilterCard,
  MetricCardLabel,
  MetricCardValue,
  FilterBar,
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
  NoteIconButton,
  CounselorHeaderRight,
  CounselorMetricsGroup,
  MetricChip,
  MetricChipLabel,
  MetricChipValue,
  MissedMetricChip,
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

export interface EnhancedSlotData extends SlotData {
  counselorCode?: string;
  isMissed?: boolean;
  notes?: string;
}

export const ProjectSessionsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string | null>(null);

  // Modals state
  const [selectedSlotForAssign, setSelectedSlotForAssign] = useState<{
    session: CounselorSession;
    slot: SlotData;
  } | null>(null);
  const [selectedStudentForView, setSelectedStudentForView] = useState<ProjectStudent | null>(null);
  const [rescheduleSlot, setRescheduleSlot] = useState<{
    counselorName: string;
    slot: EnhancedSlotData;
  } | null>(null);
  const [logCallTarget, setLogCallTarget] = useState<{
    targetName: string;
    targetCode?: string;
    stageName?: string;
  } | null>(null);

  // Reschedule form state
  const [rescheduleDate, setRescheduleDate] = useState<Date | null>(new Date('2026-02-28'));
  const [rescheduleTime, setRescheduleTime] = useState('11:00 - 12:00');

  // Local state for customized slot rows per counselor
  const [counselorSlotsMap, setCounselorSlotsMap] = useState<Record<string, EnhancedSlotData[]>>({
    'cs-101': [
      {
        id: 'anil-slot-1',
        date: '18 Feb 2026',
        time: '09:30 - 10:30',
        studentName: 'Ananya Roy',
        sessionType: 'S1',
        mobile: '+91 9810012345',
        isBooked: true,
        isMissed: false,
        notes: 'Session completed successfully. Recommended focus on science stream.',
      },
      {
        id: 'anil-slot-2',
        date: '22 Feb 2026',
        time: '09:30 - 10:30',
        studentName: 'Ananya Roy',
        sessionType: 'S2',
        mobile: '+91 9810012345',
        isBooked: true,
        isMissed: true,
        notes: 'Student missed session due to illness. Parent requested reschedule.',
      },
      {
        id: 'anil-slot-3',
        date: '18 Feb 2026',
        time: '11:00 - 12:00',
        isBooked: false,
      },
      {
        id: 'anil-slot-4',
        date: '25 Feb 2026',
        time: '14:00 - 15:00',
        isBooked: false,
      },
    ],
    'cs-102': [
      {
        id: 'mahesh-slot-1',
        date: '18 Feb 2026',
        time: '09:30 - 10:30',
        studentName: 'Aarav Sharma',
        sessionType: 'S1',
        mobile: '+91 9810054321',
        isBooked: true,
        isMissed: false,
        notes: 'Session completed.',
      },
      {
        id: 'mahesh-slot-2',
        date: '22 Feb 2026',
        time: '09:30 - 10:30',
        studentName: 'Rohan Menon',
        sessionType: 'S2',
        mobile: '+91 9810067890',
        isBooked: true,
        isMissed: true,
        notes: 'Follow-up required with student.',
      },
      {
        id: 'mahesh-slot-3',
        date: '18 Feb 2026',
        time: '11:00 - 12:00',
        isBooked: false,
      },
      {
        id: 'mahesh-slot-4',
        date: '25 Feb 2026',
        time: '14:00 - 15:00',
        isBooked: false,
      },
    ],
    'cs-103': [
      {
        id: 'hema-slot-1',
        date: '19 Feb 2026',
        time: '14:00 - 15:00',
        studentName: 'Devika Nair',
        sessionType: 'S2',
        mobile: '+91 9810037035',
        isBooked: true,
        isMissed: false,
      },
      {
        id: 'hema-slot-2',
        date: '23 Feb 2026',
        time: '11:00 - 12:00',
        isBooked: false,
      },
      {
        id: 'hema-slot-3',
        date: '26 Feb 2026',
        time: '16:00 - 17:00',
        isBooked: false,
      },
    ],
    'cs-104': [
      {
        id: 'girish-slot-1',
        date: '19 Feb 2026',
        time: '16:00 - 17:00',
        studentName: 'Siddharth Pillai',
        sessionType: 'S1',
        mobile: '+91 9810049380',
        isBooked: true,
        isMissed: false,
      },
      {
        id: 'girish-slot-2',
        date: '24 Feb 2026',
        time: '09:30 - 10:30',
        isBooked: false,
      },
      {
        id: 'girish-slot-3',
        date: '27 Feb 2026',
        time: '14:00 - 15:00',
        isBooked: false,
      },
    ],
  });

  const counselorCodes: Record<string, string> = {
    'cs-101': 'CN003',
    'cs-102': 'CN004',
    'cs-103': 'CN005',
    'cs-104': 'CN006',
  };

  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectService.getById(projectId || 'proj-001'),
  });

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['projectSessions', projectId],
    queryFn: () => projectService.getProjectSessions(projectId || 'proj-001'),
  });

  const handleCopyMeetLink = (session: CounselorSession) => {
    const link = `https://meet.google.com/pwc-${session.counselorId.toLowerCase()}`;
    navigator.clipboard.writeText(link);
    toast.success(
      'Link Copied',
      `Google Meet link for ${session.counselorName} copied to clipboard.`
    );
  };

  const handleOpenAssignModal = (session: CounselorSession, slot: SlotData) => {
    setSelectedSlotForAssign({ session, slot });
  };

  const handleSaveSlotAssignment = (slotId: string, updatedSlot: Partial<SlotData>) => {
    if (!selectedSlotForAssign) return;
    const sessionKey = selectedSlotForAssign.session.id;

    setCounselorSlotsMap(prev => {
      const currentSlots = prev[sessionKey] || [];
      const updatedSlots = currentSlots.map(s =>
        s.id === slotId ? { ...s, ...updatedSlot, isMissed: false } : s
      );
      return { ...prev, [sessionKey]: updatedSlots };
    });

    toast.success(
      'Schedule Saved',
      `Assigned ${updatedSlot.studentName} to ${selectedSlotForAssign.session.counselorName}'s session on ${selectedSlotForAssign.slot.date}.`
    );
    setSelectedSlotForAssign(null);
  };

  const handleConfirmReschedule = () => {
    if (!rescheduleSlot) return;
    const dateFormatted = rescheduleDate
      ? rescheduleDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      : '28 Feb 2026';

    // Update the slot in state
    setCounselorSlotsMap(prev => {
      const newMap = { ...prev };
      Object.keys(newMap).forEach(key => {
        newMap[key] = newMap[key].map(s =>
          s.id === rescheduleSlot.slot.id
            ? {
                ...s,
                date: dateFormatted,
                time: rescheduleTime,
                isMissed: false,
              }
            : s
        );
      });
      return newMap;
    });

    toast.success(
      'Session Rescheduled',
      `Rescheduled session for ${rescheduleSlot.slot.studentName} to ${dateFormatted} at ${rescheduleTime}.`
    );
    setRescheduleSlot(null);
  };

  const filteredSessions = sessions.filter(s => {
    const slots = counselorSlotsMap[s.id] || [];

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
      (counselorCodes[s.id] && counselorCodes[s.id].toLowerCase().includes(q)) ||
      slots.some(slot => slot.studentName && slot.studentName.toLowerCase().includes(q))
    );
  });

  const getSlotColumns = (
    session: CounselorSession
  ): Column<EnhancedSlotData>[] => [
    {
      key: 'date',
      header: 'Date',
      render: row => (
        <span style={{ color: row.isBooked ? undefined : '#94A3B8', fontWeight: 500 }}>
          {row.date}
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
                name: row.studentName || '',
                email: `${row.studentName?.toLowerCase().replace(/\s+/g, '.')}@student.edu`,
                mobile: row.mobile || '+91 9810012345',
                grade: '11th',
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
          row.mobile || '+91 9810012345'
        ) : (
          <span style={{ color: '#CBD5E1' }}>—</span>
        ),
    },
    {
      key: 'action',
      header: 'Action',
      render: row => (
        <ActionCellWrapper>
          {row.isBooked && (
            <Tooltip content="Log a Call / View History">
              <NoteIconButton
                type="button"
                onClick={() => {
                  setLogCallTarget({
                    targetName: row.studentName || 'Student',
                    stageName: row.sessionType || 'Session 1',
                  });
                }}
              >
                <RiMessage2Line size={18} />
              </NoteIconButton>
            </Tooltip>
          )}

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
          <MetricCardValue $color="#5D2384">17</MetricCardValue>
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
          <MetricCardValue $color="#EA580C">3</MetricCardValue>
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
          <MetricCardValue $color="#EA580C">9</MetricCardValue>
        </MetricFilterCard>
      </TopMetricCardsGrid>

      <Card padding="lg">
        <FilterBar style={{ marginBottom: '20px' }}>
          <SearchWrapper>
            <Input
              placeholder="Search counselor or student name..."
              leftIcon={<RiSearchLine size={16} />}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </SearchWrapper>
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
              const code = counselorCodes[session.id] || 'CN001';
              const slots = counselorSlotsMap[session.id] || [];

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
                          <Badge variant="success">Matched Counselor</Badge>
                          <CounselorCode>{code}</CounselorCode>
                          <Tooltip content={`Log a call for ${session.counselorName}`}>
                            <NoteIconButton
                              type="button"
                              onClick={() => {
                                setLogCallTarget({
                                  targetName: session.counselorName,
                                  targetCode: code,
                                  stageName: 'Session 1',
                                });
                              }}
                            >
                              <RiMessage2Line size={18} />
                            </NoteIconButton>
                          </Tooltip>
                        </CounselorNameRow>
                        <CounselorSubtext>
                          {session.counselorEmail} • {session.counselorPhone}
                        </CounselorSubtext>
                      </CounselorDetails>
                    </CounselorIdentity>

                    <CounselorHeaderRight>
                      <CounselorMetricsGroup>
                        <MetricChip>
                          <MetricChipLabel>Allotted</MetricChipLabel>
                          <MetricChipValue>80 hrs</MetricChipValue>
                        </MetricChip>

                        <MetricChip>
                          <MetricChipLabel>Booked</MetricChipLabel>
                          <MetricChipValue>80 hrs</MetricChipValue>
                        </MetricChip>

                        <MetricChip>
                          <MetricChipLabel>Session 1</MetricChipLabel>
                          <MetricChipValue>32</MetricChipValue>
                        </MetricChip>

                        <MetricChip>
                          <MetricChipLabel>Session 2</MetricChipLabel>
                          <MetricChipValue>32</MetricChipValue>
                        </MetricChip>

                        <MissedMetricChip>
                          <RiUserForbidLine size={15} />
                          <span>4 Missed</span>
                        </MissedMetricChip>
                      </CounselorMetricsGroup>

                      <Tooltip content="Copy Google Meet link for this counselor">
                        <Button
                          size="sm"
                          variant="secondary"
                          leftIcon={<RiFileCopyLine size={16} />}
                          onClick={() => handleCopyMeetLink(session)}
                        >
                          Copy Meet Link
                        </Button>
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
        onSave={handleSaveSlotAssignment}
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

      {/* Log Call Modal */}
      <LogCallModal
        isOpen={Boolean(logCallTarget)}
        onClose={() => setLogCallTarget(null)}
        targetName={logCallTarget?.targetName || ''}
        targetCode={logCallTarget?.targetCode}
        stageName={logCallTarget?.stageName}
      />
    </Container>
  );
};

export default ProjectSessionsPage;
