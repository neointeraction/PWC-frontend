import React, { useEffect, useState } from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';
import {
  RiSearchLine,
  RiDownloadCloudLine,
  RiFilePdfLine,
  RiUserLine,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Table, Column } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { Tooltip } from '@/components';
import { Loader } from '@/components/Loader';
import { projectService } from '@/services/project.service';
import { reportsService } from '@/services/reports.service';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import {
  Container,
  ControlCard,
  ControlGroupLeft,
  SelectWrapper,
  MetricsRow,
  MetricCard,
  MetricLabel,
  MetricValue,
  StudentCell,
  StudentNameText,
  StudentSubtext,
  CounselorCell,
  ActionIconButtonGroup,
  ActionIconButton,
} from './ReportsPage.styles';

type SessionStatus = 'completed' | 'scheduled' | 'pending';

interface ReportRow {
  id: string;
  studentName: string;
  studentRoll: string;
  email: string;
  grade: string;
  counselorName: string;
  session1Status: SessionStatus;
  session2Status: SessionStatus;
  recommendedTrack: string;
  reportStatus: 'generated' | 'pending';
}

export const ReportsPage: React.FC = () => {
  const toast = useToast();

  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: projectsData } = useQuery({
    queryKey: ['projectsSelect'],
    queryFn: () => projectService.getAll({ page: 1, limit: 100 }),
  });

  const projectOptions =
    projectsData?.data.map(p => ({
      value: p.id,
      label: `${p.name} (${p.instituteName})`,
    })) ?? [];

  // Default to the first project once the real list has loaded.
  useEffect(() => {
    if (!selectedProjectId && projectOptions.length > 0) {
      setSelectedProjectId(projectOptions[0].value);
    }
  }, [projectOptions, selectedProjectId]);

  const { data: students = [], isLoading: isStudentsLoading } = useQuery({
    queryKey: ['projectStudents', selectedProjectId],
    queryFn: () => projectService.getProjectStudents(selectedProjectId),
    enabled: Boolean(selectedProjectId),
  });

  // GET /reports/students/{id}/assessment 404s until the backend has computed a result,
  // so only fetch it for students who have actually finished Session 2 — everyone else
  // is "Pending Review" without a wasted round trip.
  const reportQueries = useQueries({
    queries: students.map(s => ({
      queryKey: ['studentAssessmentReport', s.id],
      queryFn: () => reportsService.getStudentAssessmentReport(s.id, s.counselorName ?? ''),
      enabled: s.session2?.status === 'completed',
      retry: false,
      staleTime: 5 * 60 * 1000,
    })),
  });

  const reportList: ReportRow[] = students.map((s, i) => {
    const reportQuery = reportQueries[i];
    const topRole = reportQuery?.data?.careerCompass?.[0]?.role;
    return {
      id: s.id,
      studentName: s.name,
      studentRoll: s.studentId || s.id,
      email: s.email,
      grade: s.grade,
      counselorName: s.counselorName || '—',
      session1Status: (s.session1?.status ?? 'pending') as SessionStatus,
      session2Status: (s.session2?.status ?? 'pending') as SessionStatus,
      recommendedTrack: topRole ?? '—',
      reportStatus: reportQuery?.isSuccess ? 'generated' : 'pending',
    };
  });

  const filteredReports = reportList.filter(row => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      row.studentName.toLowerCase().includes(q) ||
      row.counselorName.toLowerCase().includes(q) ||
      row.recommendedTrack.toLowerCase().includes(q)
    );
  });

  const completedSessions = reportList.reduce(
    (sum, row) =>
      sum + (row.session1Status === 'completed' ? 1 : 0) + (row.session2Status === 'completed' ? 1 : 0),
    0
  );
  const reportsGenerated = reportList.filter(row => row.reportStatus === 'generated').length;

  const handleDownloadExport = () => {
    toast.success('Report Export Started', 'Downloading comprehensive project report CSV...');
  };

  const columns: Column<ReportRow>[] = [
    {
      key: 'studentName',
      header: 'Student Info',
      render: row => (
        <StudentCell>
          <StudentNameText>{row.studentName}</StudentNameText>
          <StudentSubtext>
            Roll: {row.studentRoll} • {row.email}
          </StudentSubtext>
        </StudentCell>
      ),
    },
    {
      key: 'grade',
      header: 'Grade',
      render: row => <Badge variant="default">{row.grade}</Badge>,
    },
    {
      key: 'counselorName',
      header: 'Counselor',
      render: row => (
        <CounselorCell>
          <RiUserLine size={14} />
          {row.counselorName}
        </CounselorCell>
      ),
    },
    {
      key: 'session1Status',
      header: 'Session 1',
      render: row => (
        <Badge
          variant={
            row.session1Status === 'completed'
              ? 'default'
              : row.session1Status === 'scheduled'
              ? 'info'
              : 'warning'
          }
          dot
        >
          {row.session1Status.charAt(0).toUpperCase() + row.session1Status.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'session2Status',
      header: 'Session 2',
      render: row => (
        <Badge
          variant={
            row.session2Status === 'completed'
              ? 'default'
              : row.session2Status === 'scheduled'
              ? 'info'
              : 'warning'
          }
          dot
        >
          {row.session2Status.charAt(0).toUpperCase() + row.session2Status.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'recommendedTrack',
      header: 'Recommended Pathway',
      render: row => (
        <span style={{ fontSize: '13px', fontWeight: 500, color: '#1f2937' }}>
          {row.recommendedTrack}
        </span>
      ),
    },
    {
      key: 'reportStatus',
      header: 'Report Status',
      render: row => (
        <Badge variant={row.reportStatus === 'generated' ? 'success' : 'warning'}>
          {row.reportStatus === 'generated' ? 'Generated' : 'Pending Review'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: row => (
        <ActionIconButtonGroup>
          <Tooltip content="Download PDF Report">
            <ActionIconButton
              disabled={row.reportStatus !== 'generated'}
              onClick={() =>
                toast.info('Download Started', `Downloading PDF report for ${row.studentName}`)
              }
            >
              <RiFilePdfLine size={16} />
            </ActionIconButton>
          </Tooltip>
        </ActionIconButtonGroup>
      ),
    },
  ];

  return (
    <Container>
      <PageHeader
        title="Project Reports & Analytics"
        subtitle="Select a project to analyze student career counseling progress and download report summaries."
        breadcrumbs={[
          { label: 'Dashboard', href: ROUTES.DASHBOARD },
          { label: 'Report' },
        ]}
      />

      <ControlCard>
        <ControlGroupLeft>
          <SelectWrapper>
            <Select
              label="Select Project"
              value={selectedProjectId}
              onChange={e => {
                setSelectedProjectId(e.target.value);
                setPage(1);
              }}
              options={projectOptions}
            />
          </SelectWrapper>

          <div style={{ width: '280px', marginTop: '22px' }}>
            <Input
              placeholder="Search student or counselor..."
              leftIcon={<RiSearchLine size={16} />}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </ControlGroupLeft>

        <div style={{ marginTop: '22px' }}>
          <Button
            leftIcon={<RiDownloadCloudLine size={18} />}
            onClick={handleDownloadExport}
          >
            Export Project Report
          </Button>
        </div>
      </ControlCard>

      <MetricsRow>
        <MetricCard>
          <MetricLabel>Total Students Enrolled</MetricLabel>
          <MetricValue>{students.length}</MetricValue>
        </MetricCard>
        <MetricCard>
          <MetricLabel>Completed Sessions</MetricLabel>
          <MetricValue>{completedSessions}</MetricValue>
        </MetricCard>

        <MetricCard>
          <MetricLabel>Reports Generated</MetricLabel>
          <MetricValue>{reportsGenerated}</MetricValue>
        </MetricCard>
        <MetricCard>
          <MetricLabel>Pending Review</MetricLabel>
          <MetricValue>{students.length - reportsGenerated}</MetricValue>
        </MetricCard>
      </MetricsRow>

      <Card padding="lg">
        {isStudentsLoading ? (
          <Loader />
        ) : (
          <Table
            columns={columns}
            data={filteredReports}
            keyExtractor={row => row.id}
            emptyMessage="No reports found for the selected project."
            pagination={{
              page,
              limit,
              total: filteredReports.length,
              totalPages: Math.ceil(filteredReports.length / limit) || 1,
              onPageChange: setPage,
            }}
          />
        )}
      </Card>
    </Container>
  );
};
export default ReportsPage;
