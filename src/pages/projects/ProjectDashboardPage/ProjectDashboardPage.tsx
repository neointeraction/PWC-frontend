import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  RiDownloadLine,
  RiTimeLine,
  RiDeleteBinLine,
  RiArrowLeftLine,
  RiPhoneLine,
  RiFlag2Fill,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Table, Column } from '@/components/Table';
import { AlertModal, Tooltip } from '@/components';
import { mockProjects } from '@/mocks/projects.mock';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { EditProjectModal } from '../components/EditProjectModal';
import { LogCallModal } from '../components/LogCallModal';
import {
  DashboardContainer,
  ProjectTopHeaderCard,
  TopHeaderLeft,
  BackIconButton,
  ProjectIdentity,
  ProjectTitleRow,
  ProjectInstituteTitle,
  InstCodeBadge,
  StatusPill,
  LocationAndPeriod,
  PeriodText,
  TopHeaderActions,
  OverviewStatsGrid,
  OverviewCard,
  OverviewCardLabel,
  OverviewCardValue,
  SectionHeading,
  StageProgressLayout,
  FollowUpCardsGrid,
  FollowUpStatCard,
  FollowUpCardLabel,
  FollowUpCardValue,
  StagesCard,
  StagesTableHeader,
  StageList,
  StageRowItem,
  StageNameWrapper,
  PendingBadge,
  AgeingFootnote,
  ActionIconButtonGroup,
  ActionIconButton,
  DaysAgeingPill,
} from './ProjectDashboardPage.styles';

export interface FollowUpStudent {
  id: string;
  studentId: string;
  studentName: string;
  stageKey: string;
  stuckAtStage: string;
  daysAgeing: number;
  lastCall: string;
}

const INDIAN_FIRST_NAMES = [
  'Aarav', 'Aditya', 'Ananya', 'Devika', 'Diya', 'Ishaan', 'Kabir', 'Meera',
  'Pooja', 'Priya', 'Rahul', 'Rhea', 'Rohan', 'Sana', 'Siddharth', 'Tanvi',
  'Varun', 'Vihaan', 'Yash', 'Zoya', 'Karan', 'Aryan', 'Neha', 'Shreya',
  'Nikhil', 'Gaurav', 'Manish', 'Kavya', 'Deepak', 'Sanjay', 'Arjun', 'Pranav'
];

const INDIAN_LAST_NAMES = [
  'Sharma', 'Patel', 'Nair', 'Menon', 'Verma', 'Gupta', 'Iyer', 'Deshmukh',
  'Kulkarni', 'Rao', 'Farooqui', 'Sheikh', 'Joshi', 'Bhat', 'Hegde', 'Kapoor',
  'Singhania', 'Khan', 'Reddy', 'Chopra', 'Malhotra', 'Bose', 'Mukherjee', 'Das'
];

export const STAGES_LIST = [
  { key: 'login_activated', label: 'Login Activated', pending: 10, isFlagged: true },
  { key: 'profile_completed', label: 'Profile Completed', pending: 22, isFlagged: false },
  { key: 'pre_counselling_student', label: 'Pre-Counselling — Student', pending: 23, isFlagged: false },
  { key: 'pre_counselling_parent', label: 'Pre-Counselling — Parent', pending: 28, isFlagged: false },
  { key: 'assessment_completed', label: 'Assessment Completed', pending: 29, isFlagged: true },
  { key: 'session_booked', label: 'Session Booked', pending: 45, isFlagged: false },
  { key: 'session_1_completed', label: 'Session 1 Completed', pending: 55, isFlagged: true },
  { key: 'session_2_completed', label: 'Session 2 Completed', pending: 66, isFlagged: false },
  { key: 'feedback_student', label: 'Feedback — Student', pending: 68, isFlagged: false },
  { key: 'feedback_parent', label: 'Feedback — Parent', pending: 71, isFlagged: false },
  { key: 'report_downloaded', label: 'Report Downloaded', pending: 12, isFlagged: false },
];

const LAST_CALL_OPTIONS = ['Not called', '1 day ago', '2 days ago', '3 days ago', '4 days ago'];

// Helper to generate deterministic mock students for any stage count
const generateStudentsForStage = (stageKey: string, stageLabel: string, count: number): FollowUpStudent[] => {
  const result: FollowUpStudent[] = [];
  for (let i = 0; i < count; i++) {
    const fn = INDIAN_FIRST_NAMES[(i * 3 + stageKey.length) % INDIAN_FIRST_NAMES.length];
    const ln = INDIAN_LAST_NAMES[(i * 2 + stageKey.length) % INDIAN_LAST_NAMES.length];
    const idNum = 100 + ((i * 7 + stageKey.charCodeAt(0)) % 899);
    const daysAgeing = ((i + stageKey.length) % 7) + 1;
    const lastCall = LAST_CALL_OPTIONS[(i + stageKey.length) % LAST_CALL_OPTIONS.length];

    result.push({
      id: `${stageKey}-${i + 1}`,
      studentId: `ST${idNum}`,
      studentName: `${fn} ${ln}`,
      stageKey,
      stuckAtStage: stageLabel,
      daysAgeing,
      lastCall,
    });
  }
  return result;
};

// Helper for follow-up metric card generators
const generateStudentsForCategory = (category: string, count: number): FollowUpStudent[] => {
  const result: FollowUpStudent[] = [];
  const stageLabels = [
    'Pre-Counselling (Parent)',
    'Assessment',
    'Session 1 Missed',
    'Session 2 Missed',
    'Session Booking',
    'Report Download',
    'Profile Completed',
  ];

  for (let i = 0; i < count; i++) {
    const fn = INDIAN_FIRST_NAMES[(i * 5 + category.length) % INDIAN_FIRST_NAMES.length];
    const ln = INDIAN_LAST_NAMES[(i * 3 + category.length) % INDIAN_LAST_NAMES.length];
    const idNum = 200 + ((i * 11 + category.charCodeAt(0)) % 799);
    const stuckLabel = category === 'missed_session_1'
      ? 'Session 1 Missed'
      : category === 'missed_session_2'
      ? 'Session 2 Missed'
      : stageLabels[i % stageLabels.length];
    const daysAgeing = category === 'overdue' ? 3 + (i % 6) : ((i + 2) % 5) + 1;
    const lastCall = LAST_CALL_OPTIONS[i % LAST_CALL_OPTIONS.length];

    result.push({
      id: `${category}-${i + 1}`,
      studentId: `ST${idNum}`,
      studentName: `${fn} ${ln}`,
      stageKey: category,
      stuckAtStage: stuckLabel,
      daysAgeing,
      lastCall,
    });
  }
  return result;
};

export const ProjectDashboardPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStageKey, setSelectedStageKey] = useState<string>('login_activated');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [logCallStudent, setLogCallStudent] = useState<FollowUpStudent | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const project =
    mockProjects.find(p => p.id === projectId) || mockProjects[0];

  const handleExtendProject = () => {
    setIsEditModalOpen(true);
  };

  const handleExportReport = () => {
    const csvContent =
      `Project Stage-Wise Progress Report\n` +
      `Project Name,${project.name}\n` +
      `Institute,${project.instituteName}\n` +
      `Location,${project.location || 'Mumbai, Maharashtra'}\n` +
      `Period,01 Aug 2026 – 31 Oct 2026\n\n` +
      `Student ID,Student Name,Stuck at Stage,Days Ageing,Last Call\n` +
      allCurrentStudents
        .map(
          s =>
            `${s.studentId},${s.studentName},${s.stuckAtStage},${s.daysAgeing},${s.lastCall}`
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${project.name.replace(/\s+/g, '_')}_Progress_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Report Exported', `Downloaded stage-wise project report CSV.`);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    toast.warning('Project Deleted', `${project.name} has been removed.`);
    navigate(ROUTES.PROJECTS);
  };

  // Generate complete rows dynamically based on the active selection
  const allCurrentStudents = useMemo(() => {
    if (selectedCategory) {
      const counts: Record<string, number> = {
        follow_up_today: 57,
        overdue: 18,
        missed_session_1: 3,
        missed_session_2: 9,
      };
      return generateStudentsForCategory(selectedCategory, counts[selectedCategory] || 10);
    }

    const matchedStage = STAGES_LIST.find(s => s.key === selectedStageKey) || STAGES_LIST[0];
    return generateStudentsForStage(matchedStage.key, matchedStage.label, matchedStage.pending);
  }, [selectedStageKey, selectedCategory]);

  // Paginate the student rows
  const paginatedStudents = useMemo(() => {
    const start = (page - 1) * limit;
    return allCurrentStudents.slice(start, start + limit);
  }, [allCurrentStudents, page, limit]);

  const totalPages = Math.ceil(allCurrentStudents.length / limit);

  const columns: Column<FollowUpStudent>[] = [
    {
      key: 'studentId',
      header: 'Student ID',
      accessor: 'studentId',
      width: '120px',
    },
    {
      key: 'studentName',
      header: 'Student',
      accessor: 'studentName',
      render: (row: FollowUpStudent) => <strong>{row.studentName}</strong>,
    },
    {
      key: 'stuckAtStage',
      header: 'Stuck at stage',
      accessor: 'stuckAtStage',
    },
    {
      key: 'daysAgeing',
      header: 'Days Ageing',
      accessor: 'daysAgeing',
      render: (row: FollowUpStudent) => (
        <DaysAgeingPill $days={row.daysAgeing}>{row.daysAgeing}</DaysAgeingPill>
      ),
    },
    {
      key: 'lastCall',
      header: 'Last call',
      accessor: 'lastCall',
    },
    {
      key: 'action',
      header: 'Action',
      width: '80px',
      render: (row: FollowUpStudent) => (
        <ActionIconButtonGroup>
          <Tooltip content="Log Call">
            <ActionIconButton
              type="button"
              aria-label="Log Call"
              onClick={() => {
                setLogCallStudent(row);
              }}
            >
              <RiPhoneLine size={16} />
            </ActionIconButton>
          </Tooltip>
        </ActionIconButtonGroup>
      ),
    },
  ];

  return (
    <DashboardContainer>
      <PageHeader
        title=""
        breadcrumbs={[
          { label: 'Projects', href: ROUTES.PROJECTS },
          { label: project.name },
        ]}
      />

      {/* Top Project Identity Banner */}
      <ProjectTopHeaderCard>
        <TopHeaderLeft>
          <BackIconButton type="button" onClick={() => navigate(ROUTES.PROJECTS)} aria-label="Back to Projects">
            <RiArrowLeftLine size={18} />
          </BackIconButton>

          <ProjectIdentity>
            <ProjectTitleRow>
              <ProjectInstituteTitle>{project.instituteName}</ProjectInstituteTitle>
              <InstCodeBadge>INS001</InstCodeBadge>
              <StatusPill>Ongoing</StatusPill>
            </ProjectTitleRow>
            <LocationAndPeriod>
              <span>{project.location || 'Mumbai, Maharashtra'}</span>
              <span>•</span>
              <PeriodText>Period : 01 Aug, 2026 – 31 Oct, 2026</PeriodText>
            </LocationAndPeriod>
          </ProjectIdentity>
        </TopHeaderLeft>

        <TopHeaderActions>
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
        </TopHeaderActions>
      </ProjectTopHeaderCard>

      {/* 4 Top Overview Metrics */}
      <OverviewStatsGrid>
        <OverviewCard>
          <OverviewCardLabel>Counsellors</OverviewCardLabel>
          <OverviewCardValue>44</OverviewCardValue>
        </OverviewCard>

        <OverviewCard>
          <OverviewCardLabel>Total Students</OverviewCardLabel>
          <OverviewCardValue>350</OverviewCardValue>
        </OverviewCard>

        <OverviewCard>
          <OverviewCardLabel>Total Days</OverviewCardLabel>
          <OverviewCardValue>95</OverviewCardValue>
        </OverviewCard>

        <OverviewCard>
          <OverviewCardLabel>Remaining Days</OverviewCardLabel>
          <OverviewCardValue>15</OverviewCardValue>
        </OverviewCard>
      </OverviewStatsGrid>

      {/* Section Title */}
      <SectionHeading>Stage Wise Progress</SectionHeading>

      {/* 4 Follow-up Stat Filter Cards */}
      <FollowUpCardsGrid>
        <FollowUpStatCard
          type="button"
          $isActive={selectedCategory === 'follow_up_today'}
          onClick={() => {
            setSelectedCategory(prev => (prev === 'follow_up_today' ? null : 'follow_up_today'));
            setPage(1);
          }}
        >
          <FollowUpCardLabel>Follow-up today</FollowUpCardLabel>
          <FollowUpCardValue $color="#5D2384">57</FollowUpCardValue>
        </FollowUpStatCard>

        <FollowUpStatCard
          type="button"
          $isActive={selectedCategory === 'overdue'}
          onClick={() => {
            setSelectedCategory(prev => (prev === 'overdue' ? null : 'overdue'));
            setPage(1);
          }}
        >
          <FollowUpCardLabel>Overdue (&gt; 2 days)</FollowUpCardLabel>
          <FollowUpCardValue $color="#DC2626">18</FollowUpCardValue>
        </FollowUpStatCard>

        <FollowUpStatCard
          type="button"
          $isActive={selectedCategory === 'missed_session_1'}
          onClick={() => {
            setSelectedCategory(prev => (prev === 'missed_session_1' ? null : 'missed_session_1'));
            setPage(1);
          }}
        >
          <FollowUpCardLabel>Missed Session - 1</FollowUpCardLabel>
          <FollowUpCardValue $color="#EA580C">3</FollowUpCardValue>
        </FollowUpStatCard>

        <FollowUpStatCard
          type="button"
          $isActive={selectedCategory === 'missed_session_2'}
          onClick={() => {
            setSelectedCategory(prev => (prev === 'missed_session_2' ? null : 'missed_session_2'));
            setPage(1);
          }}
        >
          <FollowUpCardLabel>Missed Session - 2</FollowUpCardLabel>
          <FollowUpCardValue $color="#EA580C">9</FollowUpCardValue>
        </FollowUpStatCard>
      </FollowUpCardsGrid>

      {/* Interactive Stages & Follow-up Students Layout */}
      <StageProgressLayout>
        {/* Left Stages Table Card */}
        <StagesCard>
          <StagesTableHeader>
            <span>Stages</span>
            <span>Pending</span>
          </StagesTableHeader>

          <StageList>
            {STAGES_LIST.map(stage => {
              const isSelected = selectedStageKey === stage.key && !selectedCategory;
              return (
                <StageRowItem
                  key={stage.key}
                  type="button"
                  $isSelected={isSelected}
                  onClick={() => {
                    setSelectedStageKey(stage.key);
                    setSelectedCategory(null);
                    setPage(1);
                  }}
                >
                  <StageNameWrapper>
                    <span>{stage.label}</span>
                    {stage.isFlagged && (
                      <RiFlag2Fill size={15} style={{ color: '#EF4444' }} />
                    )}
                  </StageNameWrapper>
                  <PendingBadge $isFlagged={stage.isFlagged}>{stage.pending}</PendingBadge>
                </StageRowItem>
              );
            })}
          </StageList>

          <AgeingFootnote>
            <RiFlag2Fill size={13} style={{ color: '#EF4444', marginRight: '6px', verticalAlign: '-2px' }} />
            <strong>Ageing</strong> = calendar days since the student completed the previous stage. Beyond 2 days idle, the stage is flagged for admin follow-up.
          </AgeingFootnote>
        </StagesCard>

        {/* Right Content Area: Follow-up Students Table */}
        <Card>
          <Table
            columns={columns}
            data={paginatedStudents}
            keyExtractor={row => row.id}
            emptyMessage="No pending follow-ups found for the selected stage filter."
            pagination={{
              page,
              totalPages,
              total: allCurrentStudents.length,
              limit,
              onPageChange: p => setPage(p),
              onLimitChange: l => {
                setLimit(l);
                setPage(1);
              },
            }}
          />
        </Card>
      </StageProgressLayout>

      {/* Log Call Modal */}
      <LogCallModal
        isOpen={Boolean(logCallStudent)}
        onClose={() => setLogCallStudent(null)}
        targetName={logCallStudent?.studentName || ''}
        targetCode={logCallStudent?.studentId}
        stageName={logCallStudent?.stuckAtStage}
      />

      {/* Edit / Extend Project Modal */}
      <EditProjectModal
        isOpen={isEditModalOpen}
        project={project}
        onClose={() => setIsEditModalOpen(false)}
      />

      {/* Delete Project Confirmation Modal */}
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

export default ProjectDashboardPage;
