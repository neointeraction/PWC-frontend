import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RiSearchLine,
  RiTimeLine,
  RiUserLine,
  RiEditLine,
  RiUserAddLine,
  RiFlag2Line,
  RiFileExcel2Line,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Table, Column } from '@/components/Table';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components';
import { projectService } from '@/services/project.service';
import { ProjectStudentDetail } from '@/types/project.types';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { formatDateDDMMYYYY } from '@/utils';
import { EditStudentModal } from './EditStudentModal';
import { ViewStudentModal } from '../ProjectSessionsPage/ViewStudentModal';
import {
  Container,
  FilterBar,
  FiltersLeft,
  FiltersRight,
  ToolbarIconButton,
  SearchWrapper,
  StudentNameButton,
  StageCellWrapper,
  SessionTimeText,
  CounselorSubtext,
  ActionIconButtonGroup,
  ActionIconButton,
} from './ProjectStudentsPage.styles';

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

export const ProjectStudentsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [isFlagFilterActive, setIsFlagFilterActive] = useState(false);
  const [page, setPage] = useState(1);
  const [editingStudent, setEditingStudent] = useState<ProjectStudentDetail | null>(null);
  const [viewingStudent, setViewingStudent] = useState<ProjectStudentDetail | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const limit = 10;

  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectService.getById(projectId || 'proj-001'),
  });

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
      setIsAddModalOpen(false);
    },
    onError: () => {
      toast.error('Save Failed', 'Could not update student details.');
    },
  });

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
    setIsAddModalOpen(true);
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
    link.setAttribute('download', `${(project?.name || 'Project').replace(/\s+/g, '_')}_Students_List.csv`);
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
    <Container>
      <PageHeader
        title={`Project Students - ${project?.name || 'Career Guidance'}`}
        subtitle="Manage enrolled students, edit personal info, and reassign session counselors."
        breadcrumbs={[
          { label: 'Dashboard', href: ROUTES.DASHBOARD },
          { label: 'Projects', href: ROUTES.PROJECTS },
          { label: 'Project Students' },
        ]}
        onBack={() => navigate(ROUTES.PROJECTS)}
      />

      <Card padding="lg">
        <FilterBar style={{ marginBottom: '24px' }}>
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
        instituteName={project?.instituteName}
      />

      <EditStudentModal
        isOpen={Boolean(editingStudent) || isAddModalOpen}
        onClose={() => {
          setEditingStudent(null);
          setIsAddModalOpen(false);
        }}
        student={editingStudent}
        onSave={updated => updateMutation.mutate(updated)}
        isSaving={updateMutation.isPending}
      />
    </Container>
  );
};
export default ProjectStudentsPage;
