import React, { useState } from 'react';
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
import { useAuthStore } from '@/store';
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

interface StudentSession {
  id: string;
  title: string;
  counselorName: string;
  dateTime: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const MOCK_STUDENT_SESSIONS: StudentSession[] = [
  {
    id: 'sess-1',
    title: 'Engineering & STEM Stream Selection',
    counselorName: 'Sarah Jenkins',
    dateTime: '2026-08-12 10:00 AM',
    type: '1-on-1 Online Session',
    status: 'scheduled',
  },
  {
    id: 'sess-2',
    title: 'Pre-Counselling Initial Assessment Review',
    counselorName: 'Sarah Jenkins',
    dateTime: '2026-08-01 02:30 PM',
    type: 'Assessment Review',
    status: 'completed',
  },
];

export const StudentCounselingPage: React.FC = () => {
  const user = useAuthStore(state => state.user);
  const [isAnswersModalOpen, setIsAnswersModalOpen] = useState(false);

  const columns: Column<StudentSession>[] = [
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
            <Tooltip content="Join Video Call">
              <ActionIconButton aria-label="Join Call">
                <RiVideoChatLine size={16} />
              </ActionIconButton>
            </Tooltip>
          )}
          <Tooltip content="View Session Details">
            <ActionIconButton aria-label="View Details">
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
          <AvatarBox>SJ</AvatarBox>
          <CounselorInfo>
            <CounselorName>Sarah Jenkins, M.Sc Psych</CounselorName>
            <CounselorRole>Assigned Senior Career Counselor • St. Xavier&apos;s High School</CounselorRole>
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
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Sarah Jenkins</h4>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <RiCalendarEventLine size={24} style={{ color: '#0284C7' }} />
            <div>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>Next Upcoming Session</p>
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Aug 12, 2026 @ 10:00 AM</h4>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <RiCheckDoubleLine size={24} style={{ color: '#16A34A' }} />
            <div>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>Assessment Form</p>
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Submitted & Reviewed</h4>
            </div>
          </div>
        </Card>
      </StatsRow>

      <SessionSection>
        <SectionHeader>
          <SectionTitle>Your Counseling Sessions</SectionTitle>
        </SectionHeader>
        <Table data={MOCK_STUDENT_SESSIONS} columns={columns} keyExtractor={item => item.id} />
      </SessionSection>

      <PreCounsellingAnswersModal
        isOpen={isAnswersModalOpen}
        onClose={() => setIsAnswersModalOpen(false)}
        studentId={user?.id || 'user-student-alex'}
        studentName={user?.name || 'Alex Johnson'}
      />
    </Container>
  );
};

export default StudentCounselingPage;
