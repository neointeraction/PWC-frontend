import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  RiVideoChatLine,
  RiUser3Line,
  RiTimeLine,
  RiCheckDoubleLine,
  RiArrowUpLine,
  RiArrowDownLine,
} from 'react-icons/ri';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
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
  StudentCellWrapper,
  StudentInstiText,
  SortHeaderButton,
} from './UpcomingSessionsPage.styles';

export const UpcomingSessionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [sessions] = useState<UpcomingSession[]>(() => getMockUpcomingSessions());
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedSessions = useMemo(() => {
    return [...sessions].sort((a, b) => {
      const timeA = new Date(a.dateTime).getTime();
      const timeB = new Date(b.dateTime).getTime();
      return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
    });
  }, [sessions, sortOrder]);

  const handleToggleDateSort = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

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
          <StudentCellWrapper>
            <Tooltip content="Click to open Counsellor Form Chart & add session notes">
              <Button
                size="sm"
                variant="secondary"
                leftIcon={<RiUser3Line size={16} />}
                onClick={() => handleOpenStudentChart(row)}
              >
                {row.studentName}
              </Button>
            </Tooltip>
            <StudentInstiText>
              {row.institutionName} • {row.studentGrade}
            </StudentInstiText>
          </StudentCellWrapper>
        ),
      },
      {
        key: 'dateTime',
        header: (
          <SortHeaderButton type="button" onClick={handleToggleDateSort}>
            Date & Time
            {sortOrder === 'asc' ? <RiArrowUpLine size={14} /> : <RiArrowDownLine size={14} />}
          </SortHeaderButton>
        ),
        accessor: 'dateTime',
        sortable: true,
        cell: (row: UpcomingSession) => {
          const canJoin = checkCanJoin(row.dateTime);
          return (
            <TimeContainer>
              <TimeText>{dayjs(row.dateTime).format('DD-MM-YYYY • HH:mm')}</TimeText>
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
    ],
    [sortOrder]
  );

  return (
    <Container>
      <PageHeader
        title="Upcoming Counseling Sessions"
      />

      <Card>
        <Table data={sortedSessions} columns={columns} keyExtractor={row => row.id} />
      </Card>
    </Container>
  );
};

export default UpcomingSessionsPage;

