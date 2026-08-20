import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RiDownloadLine,
  RiTimeLine,
  RiDeleteBinLine,
  RiArrowLeftLine,
  RiCloseCircleLine,
  RiSearchLine,
  RiUserLine,
  RiEditLine,
  RiUserAddLine,
  RiFlag2Line,
  RiFileExcel2Line,
} from 'react-icons/ri';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Table, Column } from '@/components/Table';
import { AlertModal, Tooltip } from '@/components';
import { projectService } from '@/services/project.service';
import { ProjectStudentDetail } from '@/types/project.types';
import { mockProjects } from '@/mocks/projects.mock';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { formatDateDDMMYYYY } from '@/utils';
import { EditProjectModal } from '../components/EditProjectModal';
import { EditStudentModal } from '../ProjectStudentsPage/EditStudentModal';
import { ViewStudentModal } from '../ProjectSessionsPage/ViewStudentModal';
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
  FilterBar,
  FiltersLeft,
  FiltersRight,
  SearchWrapper,
  ToolbarIconButton,
  StudentNameButton,
  StageCellWrapper,
  SessionTimeText,
  CounselorSubtext,
  ActionIconButtonGroup,
  ActionIconButton,
} from './ProjectDashboardPage.styles';

export const PROJECT_STAGES_OPTIONS = [
  { value: 'all', label: 'All Stages' },
  { value: 'Login Activated', label: 'Login Activated' },
  { value: 'Profile Completed', label: 'Profile Completed' },
  { value: 'Pre-Counselling — Student', label: 'Pre-Counselling — Student' },
  { value: 'Pre-Counselling — Parent', label: 'Pre-Counselling — Parent' },
  { value: 'Assessment Completed', label: 'Assessment Completed' },
  { value: 'Session Booked', label: 'Session Booked' },
  { value: 'Session 1 Completed', label: 'Session 1 Completed' },
  { value: 'Session 2 Completed', label: 'Session 2 Completed' },
  { value: 'Feedback — Student', label: 'Feedback — Student' },
  { value: 'Feedback — Parent', label: 'Feedback — Parent' },
  { value: 'Report Downloaded', label: 'Report Downloaded' },
];

export const ProjectDashboardPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();

  const project =
    mockProjects.find(p => p.id === projectId) || mockProjects[0];

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [isProjectClosed, setIsProjectClosed] = useState(project.status === 'completed');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Table Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [isFlagFilterActive, setIsFlagFilterActive] = useState(false);
  const [page, setPage] = useState(1);
  const [editingStudent, setEditingStudent] = useState<ProjectStudentDetail | null>(null);
  const [viewingStudent, setViewingStudent] = useState<ProjectStudentDetail | null>(null);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const limit = 10;

  const { data: students = [], isLoading } = useQuery({
    queryKey: ['projectStudents', projectId],
    queryFn: () => projectService.getProjectStudents(projectId || 'proj-001'),
  });

  const updateMutation = useMutation({
    mutationFn: (updatedStudent: ProjectStudentDetail) =>
      projectService.updateProjectStudent(projectId || 'proj-001', updatedStudent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectStudents', projectId] });
      toast.success('Student Saved', 'Student information and session details updated successfully.');
      setEditingStudent(null);
      setIsAddStudentModalOpen(false);
    },
    onError: () => {
      toast.error('Save Failed', 'Could not update student details.');
    },
  });

  const handleExtendProject = () => {
    setIsEditModalOpen(true);
  };

  const handleConfirmClose = () => {
    setIsProjectClosed(true);
    setIsCloseModalOpen(false);
    toast.success('Project Closed', `"${project.name}" has been marked as completed.`);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    toast.warning('Project Deleted', `${project.name} has been removed.`);
    navigate(ROUTES.PROJECTS);
  };

  const handleCreateNewStudent = () => {
    const newStd: ProjectStudentDetail = {
      id: `std-new-${Date.now()}`,
      name: '',
      email: '',
      mobile: '+91 ',
      grade: '12th',
      stage: 'Login Activated',
      session1: {
        sessionNumber: 1,
        status: 'scheduled',
        date: new Date().toISOString().slice(0, 10),
        timeSlot: '09:30 - 10:30',
        counselorName: 'Anil Iyer',
        counselorEmail: 'anil.iyer1@outlook.com',
      },
      session2: {
        sessionNumber: 2,
        status: 'pending',
        date: new Date().toISOString().slice(0, 10),
        timeSlot: '11:00 - 12:00',
        counselorName: 'Mahesh Pillai',
        counselorEmail: 'mahesh.pillai2@rediffmail.com',
      },
    };
    setEditingStudent(newStd);
    setIsAddStudentModalOpen(true);
  };

  const handleExportExcel = () => {
    const csvContent =
      `Student ID,Student Name,Stage,Counselor,Session 1 Date,Session 1 Slot,Session 1 Status,Session 2 Date,Session 2 Slot,Session 2 Status\n` +
      filteredStudents
        .map(
          s =>
            `"${s.studentId || s.id}","${s.name}","${s.stage || 'Login Activated'}","${s.session1.counselorName || s.session2.counselorName}","${s.session1.date}","${s.session1.timeSlot}","${s.session1.status}","${s.session2.date}","${s.session2.timeSlot}","${s.session2.status}"`
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${project.name.replace(/\s+/g, '_')}_Students_List.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Excel Export Started', 'Downloaded project students list (.csv).');
  };

  const filteredStudents = students.filter(std => {
    if (isFlagFilterActive && !std.isFlagged) return false;
    if (stageFilter !== 'all' && std.stage !== stageFilter) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        std.name.toLowerCase().includes(q) ||
        (std.studentId && std.studentId.toLowerCase().includes(q)) ||
        (std.stage && std.stage.toLowerCase().includes(q)) ||
        std.email.toLowerCase().includes(q) ||
        std.mobile.toLowerCase().includes(q) ||
        std.session1.counselorName.toLowerCase().includes(q) ||
        std.session2.counselorName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const columns: Column<ProjectStudentDetail>[] = [
    {
      key: 'studentId',
      header: 'Student ID',
      width: '120px',
      render: row => row.studentId || `ST${100 + (parseInt(row.id.replace(/\D/g, ''), 10) || 1)}`,
    },
    {
      key: 'name',
      header: 'Student',
      width: '200px',
      render: row => (
        <StudentNameButton
          type="button"
          onClick={() => setViewingStudent(row)}
          aria-label={`View details for ${row.name}`}
        >
          {row.name}
        </StudentNameButton>
      ),
    },
    {
      key: 'stage',
      header: 'Stage',
      width: '240px',
      render: row => (
        <StageCellWrapper>
          <span>{row.stage || 'Login Activated'}</span>
          {row.isFlagged && (
            <Tooltip content="Flagged for admin follow-up">
              <span>
                <RiFlag2Line size={15} style={{ color: '#EF4444', verticalAlign: '-2px' }} />
              </span>
            </Tooltip>
          )}
        </StageCellWrapper>
      ),
    },
    {
      key: 'counselor',
      header: 'Counselor',
      width: '180px',
      render: row => (
        <CounselorSubtext style={{ fontSize: '13px', color: '#1f2937' }}>
          <RiUserLine size={14} /> {row.session1.counselorName || row.session2.counselorName}
        </CounselorSubtext>
      ),
    },
    {
      key: 'session1',
      header: 'Session 1',
      width: '220px',
      render: row => (
        <SessionTimeText>
          <RiTimeLine size={13} /> {formatDateDDMMYYYY(row.session1.date)} ({row.session1.timeSlot})
        </SessionTimeText>
      ),
    },
    {
      key: 'session2',
      header: 'Session 2',
      width: '220px',
      render: row => (
        <SessionTimeText>
          <RiTimeLine size={13} /> {formatDateDDMMYYYY(row.session2.date)} ({row.session2.timeSlot})
        </SessionTimeText>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '80px',
      render: row => (
        <ActionIconButtonGroup>
          <Tooltip content="Edit Student & Sessions">
            <ActionIconButton onClick={() => setEditingStudent(row)}>
              <RiEditLine size={16} />
            </ActionIconButton>
          </Tooltip>
        </ActionIconButtonGroup>
      ),
    },
  ];

  return (
    <DashboardContainer>
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
              <StatusPill $isClosed={isProjectClosed}>
                {isProjectClosed ? 'Completed' : 'Ongoing'}
              </StatusPill>
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
            variant="secondary"
            size="sm"
            leftIcon={<RiCloseCircleLine size={16} />}
            onClick={() => setIsCloseModalOpen(true)}
          >
            {isProjectClosed ? 'Closed' : 'Close Project'}
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
            onClick={handleExportExcel}
          >
            Export Report
          </Button>
        </TopHeaderActions>
      </ProjectTopHeaderCard>

      {/* 4 Top Overview Metrics */}
      <OverviewStatsGrid>
        <OverviewCard
          $clickable
          onClick={() =>
            navigate(
              ROUTES.PROJECT_SESSIONS.replace(
                ':projectId',
                projectId || 'proj-001'
              )
            )
          }
          title="Click to view Project Sessions"
        >
          <OverviewCardLabel>Counsellors</OverviewCardLabel>
          <OverviewCardValue>44</OverviewCardValue>
        </OverviewCard>

        <OverviewCard>
          <OverviewCardLabel>Total Students</OverviewCardLabel>
          <OverviewCardValue>{students.length || 350}</OverviewCardValue>
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

      {/* Students Data Table Section */}
      <Card padding="lg">
        <FilterBar>
          <FiltersLeft>
            <SearchWrapper>
              <Input
                placeholder="Search student, ID, stage or counselor..."
                leftIcon={<RiSearchLine size={16} />}
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
              />
            </SearchWrapper>

            <div style={{ width: '260px' }}>
              <Select
                value={stageFilter}
                onChange={e => {
                  setStageFilter(e.target.value);
                  setPage(1);
                }}
                options={PROJECT_STAGES_OPTIONS}
              />
            </div>
          </FiltersLeft>

          <FiltersRight>
            <Tooltip content={isFlagFilterActive ? 'Show All Students' : 'Filter by Red Flag'}>
              <ToolbarIconButton
                type="button"
                $active={isFlagFilterActive}
                $variant="flag"
                onClick={() => {
                  setIsFlagFilterActive(prev => !prev);
                  setPage(1);
                }}
                aria-label="Filter by Red Flag"
              >
                <RiFlag2Line size={18} />
              </ToolbarIconButton>
            </Tooltip>

            <Tooltip content="Export Students to Excel">
              <ToolbarIconButton
                type="button"
                $variant="excel"
                onClick={handleExportExcel}
                aria-label="Export Students to Excel"
              >
                <RiFileExcel2Line size={18} />
              </ToolbarIconButton>
            </Tooltip>

            <Button
              leftIcon={<RiUserAddLine size={16} />}
              onClick={handleCreateNewStudent}
            >
              Add Student
            </Button>
          </FiltersRight>
        </FilterBar>

        <Table
          columns={columns}
          data={filteredStudents.slice((page - 1) * limit, page * limit)}
          isLoading={isLoading}
          keyExtractor={row => row.id}
          emptyMessage="No project students found matching filters."
          pagination={{
            page,
            limit,
            total: filteredStudents.length,
            totalPages: Math.ceil(filteredStudents.length / limit) || 1,
            onPageChange: setPage,
          }}
        />
      </Card>

      {/* View Student Details Modal */}
      <ViewStudentModal
        isOpen={Boolean(viewingStudent)}
        onClose={() => setViewingStudent(null)}
        student={viewingStudent}
        instituteName={project.instituteName}
      />

      {/* Edit Student Modal */}
      <EditStudentModal
        isOpen={Boolean(editingStudent) || isAddStudentModalOpen}
        onClose={() => {
          setEditingStudent(null);
          setIsAddStudentModalOpen(false);
        }}
        student={editingStudent}
        onSave={updated => updateMutation.mutate(updated)}
        isSaving={updateMutation.isPending}
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

      {/* Close Project Confirmation Modal */}
      <AlertModal
        isOpen={isCloseModalOpen}
        onClose={() => setIsCloseModalOpen(false)}
        onConfirm={handleConfirmClose}
        title="Close Project"
        description={`Are you sure you want to close "${project.name}"? This will mark the project status as completed.`}
        variant="warning"
        confirmText="Close Project"
        cancelText="Cancel"
      />
    </DashboardContainer>
  );
};

export default ProjectDashboardPage;
