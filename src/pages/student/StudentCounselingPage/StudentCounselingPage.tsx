import React, { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import {
  RiUserHeartLine,
  RiCalendarEventLine,
  RiCheckDoubleLine,
  RiFileTextLine,
  RiEyeLine,
  RiVideoChatLine,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Table, Column } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import { useCurrentStudent, useToast } from '@/hooks';
import { deriveStudentProgress } from '@/services/student.service';
import { sessionsService, Session, isWithinJoinWindow } from '@/services/sessions.service';
import { getApiErrorMessage } from '@/utils';
import { PreCounsellingAnswersModal } from '@/pages/dashboard/components/PreCounsellingAnswersModal';
import {
  Container,
  CounselorCard,
  CounselorProfile,
  AvatarBox,
  CounselorInfo,
  CounselorName,
  CounselorRole,
  StatsRow,
  SessionSection,
  SectionHeader,
  SectionTitle,
  TableActionsContainer,
  ActionIconButton,
} from './StudentCounselingPage.styles';

interface StudentSessionRow {
  id: string;
  title: string;
  counselorName: string;
  dateTime: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  session: Session;
}

const formatTime = (t: string): string => dayjs(`2000-01-01T${t}`).format('hh:mm A');

const STATUS_MAP: Record<Session['status'], StudentSessionRow['status']> = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  RESCHEDULED: 'scheduled',
  CANCELLED: 'cancelled',
};

export const StudentCounselingPage: React.FC = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data: me } = useCurrentStudent();
  const [isAnswersModalOpen, setIsAnswersModalOpen] = useState(false);

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['student-sessions', me?.id],
    queryFn: () => sessionsService.getStudentSessions(me!.id),
    enabled: !!me?.id,
    staleTime: 30_000,
  });

  const isAssessmentSubmitted = me ? deriveStudentProgress(me.workflowStatus).assessmentSubmitted : false;

  const activeSessions = sessions.filter(s => s.status !== 'CANCELLED');
  // The counsellor is only resolved once Session 1 is booked (blind booking) — same
  // counsellor covers both sessions.
  const assignedCounsellor = activeSessions[0]?.counsellor;

  const nextUpcoming = useMemo(() => {
    const now = dayjs();
    return activeSessions
      .filter(s => s.status === 'SCHEDULED')
      .map(s => ({ s, at: dayjs(`${s.scheduledDate}T${s.startTime}`) }))
      .filter(x => x.at.isAfter(now))
      .sort((a, b) => a.at.valueOf() - b.at.valueOf())[0]?.s;
  }, [activeSessions]);

  const rows: StudentSessionRow[] = activeSessions.map(s => ({
    id: s.id,
    title: `Session ${s.sessionNumber === 'SESSION_1' ? '1' : '2'}`,
    counselorName: `${s.counsellor.user.firstName} ${s.counsellor.user.lastName}`,
    dateTime: `${dayjs(s.scheduledDate).format('DD MMM YYYY')} ${formatTime(s.startTime)}`,
    type: s.sessionNumber === 'SESSION_1' ? 'Discovery & Assessment Review' : 'Roadmap & Recommendations',
    status: STATUS_MAP[s.status],
    session: s,
  }));

  const joinMutation = useMutation({
    mutationFn: (session: Session) => sessionsService.join(session.id, 'STUDENT'),
    onSuccess: ({ meetingLink }) => {
      queryClient.invalidateQueries({ queryKey: ['student-sessions', me?.id] });
      if (meetingLink) {
        window.open(meetingLink, '_blank');
      } else {
        toast.warning(
          'No Meeting Link Yet',
          'Your counsellor hasn’t set up their meeting link yet — please contact them directly.'
        );
      }
    },
    onError: (err: unknown) => {
      toast.error('Cannot Join Yet', getApiErrorMessage(err, 'Unable to join this session right now.'));
    },
  });

  const handleViewDetails = (row: StudentSessionRow) => {
    toast.info(
      `${row.title} Details`,
      `${row.counselorName} • ${row.dateTime}${row.session.notes ? ` • Notes: ${row.session.notes}` : ''}`
    );
  };

  const columns: Column<StudentSessionRow>[] = [
    {
      key: 'title',
      header: 'Session Title',
      render: row => <strong>{row.title}</strong>,
    },
    {
      key: 'counselorName',
      header: 'Counselor',
    },
    {
      key: 'dateTime',
      header: 'Date & Time',
    },
    {
      key: 'type',
      header: 'Type',
    },
    {
      key: 'status',
      header: 'Status',
      render: row => (
        <Badge variant={row.status === 'scheduled' ? 'primary' : 'success'} size="sm">
          {row.status === 'scheduled' ? 'Scheduled' : 'Completed'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: row => (
        <TableActionsContainer>
          {row.status === 'scheduled' && (
            <Tooltip
              content={
                isWithinJoinWindow(row.session) ? 'Join Video Call' : 'Join opens 10 minutes before the session starts'
              }
            >
              <ActionIconButton
                aria-label="Join Call"
                disabled={!isWithinJoinWindow(row.session)}
                onClick={() => joinMutation.mutate(row.session)}
              >
                <RiVideoChatLine size={16} />
              </ActionIconButton>
            </Tooltip>
          )}
          <Tooltip content="View Session Details">
            <ActionIconButton aria-label="View Details" onClick={() => handleViewDetails(row)}>
              <RiEyeLine size={16} />
            </ActionIconButton>
          </Tooltip>
        </TableActionsContainer>
      ),
    },
  ];

  return (
    <Container>
      <PageHeader
        title="Counseling Overview"
        subtitle="Manage your 1-on-1 counseling appointments, view session history, and review assessment inputs."
      />

      <CounselorCard>
        <CounselorProfile>
          <AvatarBox>
            {assignedCounsellor
              ? `${assignedCounsellor.user.firstName[0] ?? ''}${assignedCounsellor.user.lastName[0] ?? ''}`
              : '—'}
          </AvatarBox>
          <CounselorInfo>
            <CounselorName>
              {assignedCounsellor
                ? `${assignedCounsellor.user.firstName} ${assignedCounsellor.user.lastName}`
                : 'Not yet assigned'}
            </CounselorName>
            <CounselorRole>
              {assignedCounsellor
                ? `Assigned Career Counsellor • ${assignedCounsellor.counsellorCode}`
                : 'Assigned once you book your first session'}
            </CounselorRole>
          </CounselorInfo>
        </CounselorProfile>

        <Button
          variant="secondary"
          size="md"
          leftIcon={<RiFileTextLine size={18} />}
          onClick={() => setIsAnswersModalOpen(true)}
        >
          View Assessment Answers
        </Button>
      </CounselorCard>

      <StatsRow>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <RiUserHeartLine size={24} style={{ color: '#5D2384' }} />
            <div>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>Assigned Counselor</p>
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
                {assignedCounsellor
                  ? `${assignedCounsellor.user.firstName} ${assignedCounsellor.user.lastName}`
                  : '—'}
              </h4>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <RiCalendarEventLine size={24} style={{ color: '#0284C7' }} />
            <div>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>Next Upcoming Session</p>
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
                {nextUpcoming
                  ? `${dayjs(nextUpcoming.scheduledDate).format('MMM D, YYYY')} @ ${formatTime(nextUpcoming.startTime)}`
                  : '—'}
              </h4>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <RiCheckDoubleLine size={24} style={{ color: '#16A34A' }} />
            <div>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>Assessment Form</p>
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
                {isAssessmentSubmitted ? 'Submitted' : 'Not Submitted Yet'}
              </h4>
            </div>
          </div>
        </Card>
      </StatsRow>

      <SessionSection>
        <SectionHeader>
          <SectionTitle>Your Counseling Sessions</SectionTitle>
        </SectionHeader>
        <Table
          data={rows}
          columns={columns}
          keyExtractor={item => item.id}
          emptyMessage={isLoading ? 'Loading your sessions…' : 'No sessions booked yet.'}
        />
      </SessionSection>

      <PreCounsellingAnswersModal
        isOpen={isAnswersModalOpen}
        onClose={() => setIsAnswersModalOpen(false)}
        studentId={me?.id ?? null}
        studentName={me?.name ?? ''}
      />
    </Container>
  );
};

export default StudentCounselingPage;
