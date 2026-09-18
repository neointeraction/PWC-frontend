import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
import { useCurrentCounselor, useToast } from '@/hooks';
import { counselorSessionsService, CounselorSessionRow } from '@/services/counselorSessions.service';
import { isWithinJoinWindow, hasJoinWindowClosed, sessionsService } from '@/services/sessions.service';
import { getApiErrorMessage } from '@/utils';
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
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data: me, isLoading: isMeLoading } = useCurrentCounselor();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const { data: board, isLoading: isBoardLoading } = useQuery({
    queryKey: ['counselor-sessions-board', me?.id],
    queryFn: () => counselorSessionsService.getBoard(me!.id, me!.projects),
    enabled: !!me?.id,
    staleTime: 30_000,
  });

  // POST /sessions/{id}/join — this click is the actual signal the backend uses to know
  // the counsellor showed up (counsellorJoinedAt); opening the meet link on its own,
  // without this call, would never clear a no-show.
  const joinMutation = useMutation({
    mutationFn: (sessionId: string) => sessionsService.join(sessionId, 'COUNSELLOR'),
    onSuccess: ({ meetingLink }) => {
      queryClient.invalidateQueries({ queryKey: ['counselor-sessions-board', me?.id] });
      if (meetingLink) {
        window.open(meetingLink, '_blank');
      } else {
        toast.warning('No Meeting Link Yet', 'Add a meeting link before joining this session.');
      }
    },
    onError: (err: unknown) => {
      toast.error('Cannot Join Yet', getApiErrorMessage(err, 'Unable to join this session right now.'));
    },
  });

  // "Upcoming" — not yet completed, and started no more than 6 hours ago (keeps a
  // just-missed session visible long enough to flag, without the list growing forever).
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

  // Join is only enabled within 10 minutes of the session's start time, either side —
  // past that band it's treated as a no-show rather than a late join (see
  // sessions.service's isWithinJoinWindow/hasJoinWindowClosed for the shared rule).
  // Once the counsellor has already joined (counsellorJoinedAt set), the window is
  // treated as closed so the row doesn't invite a second join.
  const checkCanJoin = (row: CounselorSessionRow): boolean =>
    !row.counsellorJoinedAt && isWithinJoinWindow(row);

  const checkJoinWindowClosed = (row: CounselorSessionRow): boolean =>
    !!row.counsellorJoinedAt || hasJoinWindowClosed(row);

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
          const canJoin = row.isBooked ? checkCanJoin(row) : false;
          const alreadyJoined = row.isBooked && !!row.counsellorJoinedAt;
          // "Join window closed" is a no-show remark — don't show it once the counsellor
          // has actually joined, or it reads as if they missed a session they attended.
          const missedJoin =
            row.isBooked && !row.isCompleted && !canJoin && !alreadyJoined && hasJoinWindowClosed(row);
          return (
            <TimeContainer>
              <TimeText>{row.timeSlot || dayjs(row.dateTime).format('HH:mm')}</TimeText>
              {row.isBooked ? (
                <StatusPill $canJoin={canJoin || alreadyJoined} $missed={missedJoin}>
                  {canJoin ? (
                    <>
                      <RiCheckDoubleLine size={14} /> Ready to Join
                    </>
                  ) : alreadyJoined ? (
                    <>
                      <RiCheckDoubleLine size={14} /> Joined
                    </>
                  ) : missedJoin ? (
                    <>
                      <RiTimeLine size={14} /> Join window closed
                    </>
                  ) : (
                    <>
                      <RiTimeLine size={14} /> Opens 10 mins prior
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

          const canJoin = checkCanJoin(row);

          if (canJoin) {
            return (
              <Button
                size="sm"
                variant="primary"
                leftIcon={<RiVideoChatLine size={16} />}
                isLoading={joinMutation.isPending && joinMutation.variables === row.id}
                onClick={() => joinMutation.mutate(row.id)}
              >
                Join Session
              </Button>
            );
          }

          const missedJoin = !row.isCompleted && checkJoinWindowClosed(row);

          return (
            <Tooltip
              content={
                row.counsellorJoinedAt
                  ? 'You have already joined this session'
                  : missedJoin
                    ? 'Join window has closed — this session is now marked as a no-show'
                    : 'Join button enables 10 minutes before session start time'
              }
            >
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

