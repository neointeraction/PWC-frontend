import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  RiDownloadLine,
  RiTimeLine,
  RiDeleteBinLine,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Table, Column } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { AlertModal } from '@/components';
import { mockProjects } from '@/mocks/projects.mock';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import {
  DashboardContainer,
  HeaderActionsRow,
  ContractBannerCard,
  ContractBannerTop,
  ContractMetaGroup,
  ContractDatesText,
  DaysElapsedText,
  ProgressBarTrack,
  ProgressBarFill,
  ContentGrid,
  ProgressList,
  ProgressItem,
  ProgressLabelRow,
  ProgressStageName,
  ProgressCountText,
  TeamList,
  TeamMemberCard,
  TeamMemberLeft,
  TeamMemberAvatar,
  TeamMemberInfo,
  SessionCountsRight,
  SessionMetricCol,
} from './ProjectDashboardPage.styles';

interface ProjectSummaryMetrics {
  id: string;
  counselors: number;
  totalStudents: number;
  profile: number;
  preCounsellingParent: number;
  preCounsellingStudent: number;
  assessment: number;
  session1: number;
  session2: number;
  feedbackParent: number;
  feedbackStudent: number;
  status: string;
}

export const ProjectDashboardPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const project =
    mockProjects.find(p => p.id === projectId) || mockProjects[0];

  const handleExtendProject = () => {
    toast.success(
      'Project Extended',
      `Contract for ${project.name} extended by 90 days.`
    );
  };

  const handleExportReport = () => {
    const csvContent =
      `Project Detailed Summary Report\n` +
      `Project Name,${project.name}\n` +
      `Institute,${project.instituteName}\n` +
      `Location,${project.location || 'Mumbai, Maharashtra'}\n` +
      `Contract Period,01 Feb 2026 – 31 Jan 2027\n\n` +
      `Counselors,Total Students,Profile Completed,Pre-counselling PARENT,Pre-counselling STUDENT,Assessment,Session 1,Session 2,Feedback PARENT,Feedback STUDENT\n` +
      `44,340,340,340,340,340,340,340,340,340\n\n` +
      `Stage-Wise Progress Metrics:\n` +
      `Login Activated,340/350\n` +
      `Profile Completed,322/350\n` +
      `Pre-Counselling Submitted STUDENT,305/350\n` +
      `Assessment Completed,298/350\n` +
      `Session 1 Completed,260/350\n` +
      `Session 2 Completed,231/350\n` +
      `Report Downloaded,214/350\n`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${project.name.replace(/\s+/g, '_')}_Dashboard_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Report Exported', `Downloaded executive project report CSV.`);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    toast.warning('Project Deleted', `${project.name} has been removed.`);
    navigate(ROUTES.PROJECTS);
  };

  const teamCounselors = [
    { name: 'Meera Joseph', initials: 'MI', studentCount: 62, session1: 26, session2: 46 },
    { name: 'R. Krishnan', initials: 'RK', studentCount: 58, session1: 26, session2: 46 },
    { name: 'Anjali Nair', initials: 'AN', studentCount: 60, session1: 26, session2: 46 },
    { name: 'Divya Menon', initials: 'DM', studentCount: 54, session1: 26, session2: 46 },
  ];

  const stageProgressData = [
    { label: 'Login Activated', count: 340, total: 350 },
    { label: 'Profile Completed', count: 322, total: 350 },
    { label: 'Pre-Counselling Submitted STUDENT', count: 305, total: 350 },
    { label: 'Assessment Completed', count: 298, total: 350 },
    { label: 'Session 1 Completed', count: 260, total: 350 },
    { label: 'Session 2 Completed', count: 231, total: 350 },
    { label: 'Report Downloaded', count: 214, total: 350 },
  ];

  const metricsColumns: Column<ProjectSummaryMetrics>[] = [
    { key: 'counselors', header: 'Counselors', width: '120px' },
    { key: 'totalStudents', header: 'Total Students', width: '140px' },
    { key: 'profile', header: 'Profile', width: '110px' },
    { key: 'preCounsellingParent', header: 'Pre-counselling PARENT', width: '190px' },
    { key: 'preCounsellingStudent', header: 'Pre-counselling STUDENT', width: '190px' },
    { key: 'assessment', header: 'Assessment', width: '130px' },
    { key: 'session1', header: 'Session 1', width: '110px' },
    { key: 'session2', header: 'Session 2', width: '110px' },
    { key: 'feedbackParent', header: 'Feedback PARENT', width: '170px' },
    { key: 'feedbackStudent', header: 'Feedback STUDENT', width: '170px' },
    {
      key: 'status',
      header: 'Status',
      width: '100px',
      render: () => (
        <Badge variant="success" size="sm" dot>
          Live
        </Badge>
      ),
    },
  ];

  const metricsData: ProjectSummaryMetrics[] = [
    {
      id: 'summary-1',
      counselors: 44,
      totalStudents: 340,
      profile: 340,
      preCounsellingParent: 340,
      preCounsellingStudent: 340,
      assessment: 340,
      session1: 340,
      session2: 340,
      feedbackParent: 340,
      feedbackStudent: 340,
      status: 'Live',
    },
  ];

  return (
    <DashboardContainer>
      <PageHeader
        title={project.instituteName}
        subtitle={project.location || 'Mumbai, Maharashtra'}
        breadcrumbs={[
          { label: 'Dashboard', href: ROUTES.DASHBOARD },
          { label: 'Projects', href: ROUTES.PROJECTS },
          { label: project.name },
        ]}
        onBack={() => navigate(ROUTES.PROJECTS)}
        actions={
          <HeaderActionsRow>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<RiTimeLine size={16} />}
              onClick={handleExtendProject}
            >
              Extend Project
            </Button>
            <Button
              variant="danger"
              size="sm"
              leftIcon={<RiDeleteBinLine size={16} />}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete project
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<RiDownloadLine size={16} />}
              onClick={handleExportReport}
            >
              Export Report
            </Button>
          </HeaderActionsRow>
        }
      />

      {/* Contract Duration Banner */}
      <ContractBannerCard>
        <ContractBannerTop>
          <ContractMetaGroup>
            <Badge variant="success" dot>
              Live
            </Badge>
            <ContractDatesText>Contract: 01 Feb 2026 – 31 Jan 2027</ContractDatesText>
          </ContractMetaGroup>
          <DaysElapsedText>196 of 365 days elapsed</DaysElapsedText>
        </ContractBannerTop>
        <ProgressBarTrack>
          <ProgressBarFill $percent={53.7} />
        </ProgressBarTrack>
      </ContractBannerCard>

      {/* Summary Metrics Table */}
      <Table<ProjectSummaryMetrics>
        columns={metricsColumns}
        data={metricsData}
        keyExtractor={row => row.id}
      />

      {/* Grid: Stage-Wise Progress & Team on This Project */}
      <ContentGrid>
        <Card title="Stage-Wise Progress" subtitle="Breakdown of student journey completion steps">
          <ProgressList>
            {stageProgressData.map(stage => {
              const percent = Math.round((stage.count / stage.total) * 100);
              return (
                <ProgressItem key={stage.label}>
                  <ProgressLabelRow>
                    <ProgressStageName>{stage.label}</ProgressStageName>
                    <ProgressCountText>
                      {stage.count}/{stage.total}
                    </ProgressCountText>
                  </ProgressLabelRow>
                  <ProgressBarTrack>
                    <ProgressBarFill $percent={percent} />
                  </ProgressBarTrack>
                </ProgressItem>
              );
            })}
          </ProgressList>
        </Card>

        <Card title="Team on This Project" subtitle="Assigned counselors & session completion counts">
          <TeamList>
            {teamCounselors.map(counselor => (
              <TeamMemberCard key={counselor.name}>
                <TeamMemberLeft>
                  <TeamMemberAvatar>{counselor.initials}</TeamMemberAvatar>
                  <TeamMemberInfo>
                    <span>{counselor.name}</span>
                    <span>{counselor.studentCount} students</span>
                  </TeamMemberInfo>
                </TeamMemberLeft>

                <SessionCountsRight>
                  <SessionMetricCol>
                    <span>Session 1</span>
                    <span>{counselor.session1}</span>
                  </SessionMetricCol>
                  <SessionMetricCol>
                    <span>Session 2</span>
                    <span>{counselor.session2}</span>
                  </SessionMetricCol>
                </SessionCountsRight>
              </TeamMemberCard>
            ))}
          </TeamList>
        </Card>
      </ContentGrid>

      <AlertModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Project"
        description={`Are you sure you want to delete "${project.name}"? This action cannot be undone.`}
        variant="danger"
        confirmText="Delete Project"
        cancelText="Cancel"
      />
    </DashboardContainer>
  );
};
