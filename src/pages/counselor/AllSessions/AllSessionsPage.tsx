import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { getMockUpcomingSessions, UpcomingSession } from '@/mocks/upcomingSessions.mock';
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

interface InstitutionOption {
  id: string;
  name: string;
  code: string;
  location: string;
  status: string;
  totalAllotted: number;
  session1Balance: number;
  session2Balance: number;
}

const INSTITUTIONS_LIST: InstitutionOption[] = [
  {
    id: 'inst-001',
    name: "St. Xavier's College, Mumbai",
    code: 'INS001',
    location: 'Mumbai, Maharashtra',
    status: 'Ongoing',
    totalAllotted: 62,
    session1Balance: 18,
    session2Balance: 26,
  },
  {
    id: 'inst-002',
    name: 'Delhi Public School, Kochi',
    code: 'INS002',
    location: 'Kochi, Kerala',
    status: 'Ongoing',
    totalAllotted: 45,
    session1Balance: 12,
    session2Balance: 19,
  },
  {
    id: 'inst-003',
    name: 'Loyola College, Chennai',
    code: 'INS003',
    location: 'Chennai, Tamil Nadu',
    status: 'Ongoing',
    totalAllotted: 30,
    session1Balance: 8,
    session2Balance: 14,
  },
];

export const AllSessionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedInst, setSelectedInst] = useState<InstitutionOption>(INSTITUTIONS_LIST[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sessions] = useState<UpcomingSession[]>(() => getMockUpcomingSessions());
  const [dateFilter, setDateFilter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    return sessions
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
        cell: (row: UpcomingSession) => (
          <DateText>{dayjs(row.dateTime).format('DD MMM YYYY')}</DateText>
        ),
      },
      {
        key: 'time',
        header: 'Time',
        cell: (row: UpcomingSession) => {
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
        cell: (row: UpcomingSession) =>
          row.sessionNumber ? (
            <SessionBadge $session={row.sessionNumber}>{row.sessionNumber}</SessionBadge>
          ) : (
            <span style={{ color: '#94A3B8' }}>—</span>
          ),
      },
      {
        key: 'actions',
        header: 'Action',
        cell: (row: UpcomingSession) => {
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
      <InstitutionSelectorCard ref={dropdownRef}>
        <InstitutionTriggerButton
          type="button"
          onClick={() => setIsDropdownOpen(prev => !prev)}
          aria-expanded={isDropdownOpen}
        >
          <InstitutionInfoBox>
            <InstitutionTitleRow>
              <InstitutionName>{selectedInst.name}</InstitutionName>
              <CodeBadge>{selectedInst.code}</CodeBadge>
              <StatusPill>{selectedInst.status}</StatusPill>
            </InstitutionTitleRow>
            <LocationText>{selectedInst.location}</LocationText>
          </InstitutionInfoBox>
          <RiArrowDownSLine size={20} style={{ color: '#64748B' }} />
        </InstitutionTriggerButton>

        {isDropdownOpen && (
          <InstitutionDropdownMenu>
            {INSTITUTIONS_LIST.map(inst => (
              <DropdownItem
                key={inst.id}
                type="button"
                $isSelected={inst.id === selectedInst.id}
                onClick={() => {
                  setSelectedInst(inst);
                  setIsDropdownOpen(false);
                }}
              >
                <InstitutionTitleRow>
                  <InstitutionName>{inst.name}</InstitutionName>
                  <CodeBadge>{inst.code}</CodeBadge>
                </InstitutionTitleRow>
                <LocationText>{inst.location}</LocationText>
              </DropdownItem>
            ))}
          </InstitutionDropdownMenu>
        )}
      </InstitutionSelectorCard>

      {/* 3 Summary Metric Cards */}
      <SummaryCardsGrid>
        <MetricCard>
          <MetricCardHeader>Total Allotted</MetricCardHeader>
          <MetricCardBody>{selectedInst.totalAllotted}</MetricCardBody>
        </MetricCard>

        <MetricCard>
          <MetricCardHeader>Session 1 Balance</MetricCardHeader>
          <MetricCardBody>{selectedInst.session1Balance}</MetricCardBody>
        </MetricCard>

        <MetricCard>
          <MetricCardHeader>Session 2 Balance</MetricCardHeader>
          <MetricCardBody>{selectedInst.session2Balance}</MetricCardBody>
        </MetricCard>
      </SummaryCardsGrid>

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
          emptyMessage="No sessions found for the selected date."
        />
      </Card>
    </Container>
  );
};

export default AllSessionsPage;
