import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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
import { useCurrentCounselor } from '@/hooks';
import { counselorSessionsService, CounselorSessionRow } from '@/services/counselorSessions.service';
import { ROUTES } from '@/constants';
import {
  Container,
  TimeContainer,
  TimeText,
  DateText,
  SessionBadge,
  StatusPill,
  StudentCellWrapper,
  StudentInstiText,
  SortHeaderButton,
} from './UpcomingSessionsPage.styles';

export const UpcomingSessionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: me, isLoading: isMeLoading } = useCurrentCounselor();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const { data: board, isLoading: isBoardLoading } = useQuery({
    queryKey: ['counselor-sessions-board', me?.id],
    queryFn: () => counselorSessionsService.getBoard(me!.id, me!.projects),
    enabled: !!me?.id,
    staleTime: 30_000,
  });

  // "Upcoming" — not yet completed, and not further in the past than the join window
  // still covers (checkCanJoin's 6-hour tail below).
  const upcomingSessions = useMemo(() => {
    const cutoff = dayjs().subtract(6, 'hour');
    return (board?.rows ?? []).filter(row => !row.isCompleted && dayjs(row.dateTime).isAfter(cutoff));
  }, [board]);

  const sortedSessions = useMemo(() => {
    return [...upcomingSessions].sort((a, b) => {
      const timeA = new Date(a.dateTime).getTime();
      const timeB = new Date(b.dateTime).getTime();
      return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
    });
  }, [upcomingSessions, sortOrder]);

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

  const handleOpenStudentChart = (session: CounselorSessionRow) => {
    navigate(ROUTES.COUNSELOR_STUDENT_CHART.replace(':sessionId', session.id));
  };

  const columns: Column<CounselorSessionRow>[] = useMemo(
    () => [
      {
        key: 'studentName',
        header: 'Student Name',
        accessor: 'studentName',
        cell: (row: CounselorSessionRow) => (
          <StudentCellWrapper>
            {row.isBooked && row.studentName ? (
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
            ) : (
              <span
                style={{
                  fontStyle: 'italic',
                  color: '#94A3B8',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  padding: '4px 0',
                }}
              >
                Unbooked Slot
              </span>
            )}
            <StudentInstiText>
              {row.institutionName}
              {row.studentGrade ? ` • ${row.studentGrade}` : ''}
            </StudentInstiText>
          </StudentCellWrapper>
        ),
      },
      {
        key: 'date',
        header: (
          <SortHeaderButton type="button" onClick={handleToggleDateSort}>
            Date
            {sortOrder === 'asc' ? <RiArrowUpLine size={14} /> : <RiArrowDownLine size={14} />}
          </SortHeaderButton>
        ),
        accessor: 'dateTime',
        sortable: true,
        cell: (row: CounselorSessionRow) => (
          <DateText>{dayjs(row.dateTime).format('DD MMM YYYY')}</DateText>
        ),
      },
      {
        key: 'time',
        header: 'Time',
        cell: (row: CounselorSessionRow) => {
          const canJoin = row.isBooked ? checkCanJoin(row.dateTime) : false;
          return (
            <TimeContainer>
              <TimeText>{row.timeSlot || dayjs(row.dateTime).format('HH:mm')}</TimeText>
              {row.isBooked ? (
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
              ) : (
                <span style={{ fontSize: '11px', color: '#64748B', fontStyle: 'italic' }}>
                  Available for Booking
                </span>
              )}
            </TimeContainer>
          );
        },
      },
      {
        key: 'sessionNumber',
        header: 'Session',
        cell: (row: CounselorSessionRow) =>
          row.sessionNumber ? (
            <SessionBadge $session={row.sessionNumber}>{row.sessionNumber}</SessionBadge>
          ) : (
            <span style={{ color: '#94A3B8' }}>—</span>
          ),
      },
      {
        key: 'actions',
        header: 'Action',
        cell: (row: CounselorSessionRow) => {
          if (!row.isBooked) {
            return (
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#64748B',
                  backgroundColor: '#F1F5F9',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  border: '1px solid #E2E8F0',
                }}
              >
                Unbooked
              </span>
            );
          }

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
      <PageHeader title="Upcoming Counseling Sessions" />

      <Card>
        <Table
          data={sortedSessions}
          columns={columns}
          keyExtractor={row => row.id}
          emptyMessage={isMeLoading || isBoardLoading ? 'Loading your sessions…' : 'No upcoming sessions.'}
        />
      </Card>
    </Container>
  );
};

export default UpcomingSessionsPage;

