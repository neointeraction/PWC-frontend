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
import { Button } from '@/components/Button';
import { PageHeader } from '@/components/PageHeader';
import { Table, Column } from '@/components/Table';
import { Tooltip } from '@/components/Tooltip';
import { getMockUpcomingSessions, UpcomingSession } from '@/mocks/upcomingSessions.mock';
import { ROUTES } from '@/constants';
import {
  Container,
  TimeContainer,
  TimeText,
  StatusPill,
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
        key: 'studentName',
        header: 'Student Name',
        accessor: 'studentName',
        cell: (row: UpcomingSession) => (
          <Tooltip content="Click to open Counsellor Form Chart & add session notes">
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<RiFileTextLine size={16} />}
              onClick={() => handleOpenStudentChart(row)}
            >
              {row.studentName}
            </Button>
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
      {
        key: 'sessions',
        header: 'Sessions',
        cell: (row: UpcomingSession) => {
          const canJoin = checkCanJoin(row.dateTime);

          if (canJoin) {
            return (
              <Button
                size="sm"
                variant="primary"
                leftIcon={<RiVideoChatLine size={16} />}
                onClick={() => window.open(row.meetUrl, '_blank')}
              >
                Join Session
              </Button>
            );
          }

          return (
            <Tooltip content="Join button enables 30 minutes before session start time">
              <Button
                size="sm"
                variant="secondary"
                disabled
                leftIcon={<RiVideoChatLine size={16} />}
              >
                Join Session
              </Button>
            </Tooltip>
          );
        },
      },
      {
        key: 'report',
        header: 'Report',
        cell: (row: UpcomingSession) => (
          <Button
            size="sm"
            variant="secondary"
            leftIcon={<RiPrinterLine size={16} />}
            onClick={() => navigate(ROUTES.GENERATE_REPORT.replace(':sessionId', row.id))}
          >
            Generate Report
          </Button>
        ),
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
