import React, { useState, useMemo, useRef, useEffect } from 'react';
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
  RiArrowDownSLine,
} from 'react-icons/ri';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { PageHeader } from '@/components/PageHeader';
import { Table, Column } from '@/components/Table';
import { Tooltip } from '@/components/Tooltip';
import { DatePicker } from '@/components/DatePicker';
import { useCurrentCounselor } from '@/hooks';
import {
  counselorSessionsService,
  CounselorSessionRow,
  CounselorProjectSummary,
} from '@/services/counselorSessions.service';
import { ROUTES } from '@/constants';
import {
  Container,
  InstitutionSelectorCard,
  InstitutionTriggerButton,
  InstitutionInfoBox,
  InstitutionTitleRow,
  InstitutionName,
  CodeBadge,
  StatusPill,
  LocationText,
  InstitutionDropdownMenu,
  DropdownItem,
  SummaryCardsGrid,
  MetricCard,
  MetricCardHeader,
  MetricCardBody,
  TableFilterToolbar,
  DateFilterWrapper,
  ClearDateButton,
  TimeContainer,
  TimeText,
  DateText,
  SessionBadge,
  SessionStatusIndicator,
  StudentCellWrapper,
  StudentGradeText,
  SortHeaderButton,
} from './AllSessionsPage.styles';

export const AllSessionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: me, isLoading: isMeLoading } = useCurrentCounselor();

  const { data: board, isLoading: isBoardLoading } = useQuery({
    queryKey: ['counselor-sessions-board', me?.id],
    queryFn: () => counselorSessionsService.getBoard(me!.id, me!.projects),
    enabled: !!me?.id,
    staleTime: 30_000,
  });
  const sessions = board?.rows ?? [];
  const projectSummaries = board?.projectSummaries ?? [];

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (projectSummaries.length > 0 && !projectSummaries.some(p => p.projectId === selectedProjectId)) {
      setSelectedProjectId(projectSummaries[0].projectId);
    }
  }, [projectSummaries, selectedProjectId]);

  const selectedProject: CounselorProjectSummary | undefined = projectSummaries.find(
    p => p.projectId === selectedProjectId
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const sortedAndFilteredSessions = useMemo(() => {
    return [...sessions]
      .filter(s => {
        if (!dateFilter) return true;
        const sessionDate = dayjs(s.dateTime).format('YYYY-MM-DD');
        return sessionDate === dateFilter;
      })
      .sort((a, b) => {
        const timeA = new Date(a.dateTime).getTime();
        const timeB = new Date(b.dateTime).getTime();
        return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
      });
  }, [sessions, dateFilter, sortOrder]);

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
            <StudentGradeText>
              {row.institutionName}
              {row.studentGrade ? ` • ${row.studentGrade}` : ''}
            </StudentGradeText>
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
                <SessionStatusIndicator $canJoin={canJoin}>
                  {canJoin ? (
                    <>
                      <RiCheckDoubleLine size={14} /> Ready to Join
                    </>
                  ) : (
                    <>
                      <RiTimeLine size={14} /> Opens 30 mins prior
                    </>
                  )}
                </SessionStatusIndicator>
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
      <PageHeader
        title="All Sessions"
      />

      {/* Top Institution Selector */}
      {selectedProject && (
        <InstitutionSelectorCard ref={dropdownRef}>
          <InstitutionTriggerButton
            type="button"
            onClick={() => setIsDropdownOpen(prev => !prev)}
            aria-expanded={isDropdownOpen}
          >
            <InstitutionInfoBox>
              <InstitutionTitleRow>
                <InstitutionName>{selectedProject.instituteName || selectedProject.name}</InstitutionName>
                {selectedProject.code && <CodeBadge>{selectedProject.code}</CodeBadge>}
                <StatusPill>{selectedProject.status === 'ACTIVE' ? 'Ongoing' : 'Closed'}</StatusPill>
              </InstitutionTitleRow>
              <LocationText>{selectedProject.instituteAddress || selectedProject.name}</LocationText>
            </InstitutionInfoBox>
            <RiArrowDownSLine size={20} style={{ color: '#64748B' }} />
          </InstitutionTriggerButton>

          {isDropdownOpen && (
            <InstitutionDropdownMenu>
              {projectSummaries.map(project => (
                <DropdownItem
                  key={project.projectId}
                  type="button"
                  $isSelected={project.projectId === selectedProjectId}
                  onClick={() => {
                    setSelectedProjectId(project.projectId);
                    setIsDropdownOpen(false);
                  }}
                >
                  <InstitutionTitleRow>
                    <InstitutionName>{project.instituteName || project.name}</InstitutionName>
                    {project.code && <CodeBadge>{project.code}</CodeBadge>}
                  </InstitutionTitleRow>
                  <LocationText>{project.instituteAddress || project.name}</LocationText>
                </DropdownItem>
              ))}
            </InstitutionDropdownMenu>
          )}
        </InstitutionSelectorCard>
      )}

      {/* 3 Summary Metric Cards */}
      {selectedProject && (
        <SummaryCardsGrid>
          <MetricCard>
            <MetricCardHeader>Total Allotted</MetricCardHeader>
            <MetricCardBody>{selectedProject.totalAllotted}</MetricCardBody>
          </MetricCard>

          <MetricCard>
            <MetricCardHeader>Open Slots</MetricCardHeader>
            <MetricCardBody>{selectedProject.openSlots}</MetricCardBody>
          </MetricCard>

          <MetricCard>
            <MetricCardHeader>Booked Slots</MetricCardHeader>
            <MetricCardBody>{selectedProject.bookedSlots}</MetricCardBody>
          </MetricCard>
        </SummaryCardsGrid>
      )}

      {/* Table Card */}
      <Card>
        <TableFilterToolbar>
          <DateFilterWrapper>
            <div style={{ width: '220px' }}>
              <DatePicker
                selected={dateFilter ? new Date(dateFilter) : null}
                onChange={(date: Date | null) =>
                  setDateFilter(date ? dayjs(date).format('YYYY-MM-DD') : '')
                }
                placeholderText="Filter by date"
                isClearable
              />
            </div>
            {dateFilter && (
              <ClearDateButton type="button" onClick={() => setDateFilter('')}>
                Clear Filter
              </ClearDateButton>
            )}
          </DateFilterWrapper>
        </TableFilterToolbar>

        <Table
          data={sortedAndFilteredSessions}
          columns={columns}
          keyExtractor={row => row.id}
          emptyMessage={
            isMeLoading || isBoardLoading ? 'Loading sessions…' : 'No sessions found for the selected date.'
          }
        />
      </Card>
    </Container>
  );
};

export default AllSessionsPage;
