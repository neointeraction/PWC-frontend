import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  RiVideoChatLine,
  RiFileTextLine,
  RiTimeLine,
  RiCheckDoubleLine,
  RiPrinterLine,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Table, Column } from '@/components/Table';
import { Tooltip } from '@/components/Tooltip';
import { getMockUpcomingSessions, UpcomingSession } from '@/mocks/upcomingSessions.mock';
import { ROUTES } from '@/constants';
import {
  Container,
  StudentNameButton,
  TimeContainer,
  TimeText,
  StatusPill,
  ActionIconButtonGroup,
  ActionIconButton,
} from './UpcomingSessionsPage.styles';

export const UpcomingSessionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [sessions] = useState<UpcomingSession[]>(() => getMockUpcomingSessions());

  // Helper to check if join button should be enabled (30 mins before start until session end)
  const checkCanJoin = (dateTimeStr: string): boolean => {
    const now = new Date().getTime();
    const sessionTime = new Date(dateTimeStr).getTime();
    const diffMinutes = (sessionTime - now) / (1000 * 60);
    return diffMinutes <= 30 && diffMinutes >= -360;
  };

  const handleOpenStudentChart = (session: UpcomingSession) => {
    navigate(ROUTES.COUNSELOR_STUDENT_CHART.replace(':sessionId', session.id));
  };

  const columns: Column<UpcomingSession>[] = useMemo(
    () => [
      {
        key: 'actions',
        header: 'Action',
        cell: (row: UpcomingSession) => {
          const canJoin = checkCanJoin(row.dateTime);

          return (
            <ActionIconButtonGroup>
              {canJoin ? (
                <Tooltip content="Join video meeting">
                  <ActionIconButton
                    $variant="primary"
                    aria-label="Join Meet"
                    onClick={() => window.open(row.meetUrl, '_blank')}
                  >
                    <RiVideoChatLine size={16} />
                  </ActionIconButton>
                </Tooltip>
              ) : (
                <Tooltip content="Join button enables 30 minutes before session start time">
                  <ActionIconButton disabled aria-label="Join disabled">
                    <RiVideoChatLine size={16} />
                  </ActionIconButton>
                </Tooltip>
              )}

              <Tooltip content="Generate & view Student Career IKIGAI Report">
                <ActionIconButton
                  aria-label="Generate Report"
                  onClick={() => navigate(ROUTES.GENERATE_REPORT.replace(':sessionId', row.id))}
                >
                  <RiPrinterLine size={16} />
                </ActionIconButton>
              </Tooltip>
            </ActionIconButtonGroup>
          );
        },
      },
      {
        key: 'studentName',
        header: 'Student Name',
        accessor: 'studentName',
        cell: (row: UpcomingSession) => (
          <Tooltip content="Click to open Counsellor Form Chart & add session notes">
            <StudentNameButton type="button" onClick={() => handleOpenStudentChart(row)}>
              <RiFileTextLine size={16} />
              {row.studentName}
            </StudentNameButton>
          </Tooltip>
        ),
      },
      {
        key: 'sessionTitle',
        header: 'Session Title',
        accessor: 'sessionTitle',
        cell: (row: UpcomingSession) => <span style={{ fontWeight: 500 }}>{row.sessionTitle}</span>,
      },
      {
        key: 'dateTime',
        header: 'Date & Time',
        accessor: 'dateTime',
        cell: (row: UpcomingSession) => {
          const canJoin = checkCanJoin(row.dateTime);
          return (
            <TimeContainer>
              <TimeText>{dayjs(row.dateTime).format('MMM DD, YYYY • h:mm A')}</TimeText>
              <StatusPill $canJoin={canJoin}>
                {canJoin ? (
                  <>
                    <RiCheckDoubleLine size={14} /> Ready to Join
                  </>
                ) : (
                  <>
                    <RiTimeLine size={14} /> Opens 30 mins prior
                  </>
                )}
              </StatusPill>
            </TimeContainer>
          );
        },
      },
    ],
    []
  );

  return (
    <Container>
      <PageHeader
        title="Upcoming Counseling Sessions"
        subtitle="Manage assigned counseling time slots, join video meetings, and record live student assessment notes"
        breadcrumbs={[{ label: 'Upcoming Sessions' }]}
      />

      <Table data={sessions} columns={columns} keyExtractor={row => row.id} />
    </Container>
  );
};

export default UpcomingSessionsPage;
