import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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
import { projectService } from '@/services/project.service';
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

interface ReportRow {
  id: string;
  studentName: string;
  studentRoll: string;
  email: string;
  grade: string;
  counselorName: string;
  session1Status: 'completed' | 'scheduled' | 'pending';
  session2Status: 'completed' | 'scheduled' | 'pending';
  recommendedTrack: string;
  reportStatus: 'generated' | 'pending';
}

const mockReportData: Record<string, ReportRow[]> = {
  'proj-001': [
    {
      id: 'rep-1',
      studentName: 'Rohan Sharma',
      studentRoll: 'STD-101',
      email: 'rohan.s@student.edu',
      grade: '12th',
      counselorName: 'Anil Iyer',
      session1Status: 'completed',
      session2Status: 'completed',
      recommendedTrack: 'Technology & AI Engineering',
      reportStatus: 'generated',
    },
    {
      id: 'rep-2',
      studentName: 'Priya Verma',
      studentRoll: 'STD-102',
      email: 'priya.v@student.edu',
      grade: '12th',
      counselorName: 'Anil Iyer',
      session1Status: 'completed',
      session2Status: 'scheduled',
      recommendedTrack: 'Healthcare & Medicine',
      reportStatus: 'pending',
    },
    {
      id: 'rep-3',
      studentName: 'Ananya Roy',
      studentRoll: 'STD-103',
      email: 'ananya.r@student.edu',
      grade: '11th',
      counselorName: 'Mahesh Pillai',
      session1Status: 'completed',
      session2Status: 'completed',
      recommendedTrack: 'Financial Markets & Economics',
      reportStatus: 'generated',
    },
    {
      id: 'rep-4',
      studentName: 'Siddharth Menon',
      studentRoll: 'STD-104',
      email: 'sid.m@student.edu',
      grade: '12th',
      counselorName: 'Hema Kurup',
      session1Status: 'scheduled',
      session2Status: 'pending',
      recommendedTrack: 'Digital Design & Animation',
      reportStatus: 'pending',
    },
    {
      id: 'rep-5',
      studentName: 'Kavya Gupta',
      studentRoll: 'STD-105',
      email: 'kavya.g@student.edu',
      grade: '10th',
      counselorName: 'Girish Bhat',
      session1Status: 'completed',
      session2Status: 'completed',
      recommendedTrack: 'Law & International Relations',
      reportStatus: 'generated',
    },
  ],
};

export const ReportsPage: React.FC = () => {
  const toast = useToast();

  const [selectedProjectId, setSelectedProjectId] = useState('proj-001');
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
    })) || [
      { value: 'proj-001', label: 'Greenwood High School - Career Guidance' },
      { value: 'proj-002', label: 'St. Xavier College - Higher Edu Pathway' },
      { value: 'proj-003', label: 'DPS International - Stream Selection' },
    ];

  const reportList = mockReportData[selectedProjectId] || mockReportData['proj-001'];

  const filteredReports = reportList.filter(row => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      row.studentName.toLowerCase().includes(q) ||
      row.counselorName.toLowerCase().includes(q) ||
      row.recommendedTrack.toLowerCase().includes(q)
    );
  });

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
              onChange={e => setSelectedProjectId(e.target.value)}
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
          <MetricValue>120</MetricValue>
        </MetricCard>
        <MetricCard>
          <MetricLabel>Completed Sessions</MetricLabel>
          <MetricValue>184</MetricValue>
        </MetricCard>

        <MetricCard>
          <MetricLabel>Reports Generated</MetricLabel>
          <MetricValue>98</MetricValue>
        </MetricCard>
        <MetricCard>
          <MetricLabel>Pending Review</MetricLabel>
          <MetricValue>22</MetricValue>
        </MetricCard>
      </MetricsRow>

      <Card padding="lg">
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
      </Card>
    </Container>
  );
};
export default ReportsPage;
