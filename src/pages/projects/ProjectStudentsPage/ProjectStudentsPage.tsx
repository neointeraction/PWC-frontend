import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RiSearchLine,
  RiFlag2Fill,
  RiFlag2Line,
  // RiFileExcel2Line,
  RiUserAddLine,
  RiCalendarLine,
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
import { formatDate, getApiErrorMessage } from '@/utils';
import { EditStudentModal } from './EditStudentModal';
import { StudentFollowUpModal } from '../components/StudentFollowUpModal';
import {
  Container,
  FilterBar,
  FiltersLeft,
  FiltersRight,
  SearchWrapper,
  StudentNameButton,
  StageCellWrapper,
  CounselorWrapper,
  CounselorIdBadge,
  DateCellWrapper,
  FlagIconWrapper,
  FlagFilterButton,
  // ToolbarIconButton,
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
    queryFn: () => projectService.getById(projectId as string),
    enabled: Boolean(projectId),
  });

  const { data: students = [], isLoading } = useQuery({
    queryKey: ['projectStudents', projectId],
    queryFn: () => projectService.getProjectStudents(projectId as string),
    enabled: Boolean(projectId),
  });

  const updateMutation = useMutation({
    mutationFn: (updatedStudent: ProjectStudentDetail) =>
      projectService.saveProjectStudent(projectId as string, updatedStudent),
    onSuccess: result => {
      queryClient.invalidateQueries({ queryKey: ['projectStudents', projectId] });
      // Student counts elsewhere read the project's `_count`, not the student list.
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success('Student Saved', 'Student information updated successfully.');
      // PATCH /students/{id} has no email field, so an edited address never reached the
      // backend — say so rather than letting the success toast imply it saved.
      if (result.emailChangeIgnored) {
        toast.warning(
          'Email Not Changed',
          "A student's login email can't be edited here — every other change was saved."
        );
      }
      setEditingStudent(null);
      setIsAddModalOpen(false);
    },
    onError: err => {
      toast.error('Save Failed', getApiErrorMessage(err, 'Could not update student details.'));
    },
  });

  const handleCreateNewStudent = () => {
    const newStd: ProjectStudentDetail = {
      id: '',
      studentId: '',
      name: '',
      email: '',
      mobile: '',
      grade: '',
      stage: 'Login Activated',
      daysInStage: 0,
      isFlagged: false,
    };
    setEditingStudent(newStd);
    setIsAddModalOpen(true);
  };

  /*
  const handleExportExcel = () => {
    // Generate stage-wise distribution summary
    const stageCounts: Record<string, number> = {};
    PROJECT_STAGES_OPTIONS.filter(opt => opt.value !== 'all').forEach(opt => {
      stageCounts[opt.value] = 0;
    });

    students.forEach(s => {
      const stg = s.stage || 'Login Activated';
      stageCounts[stg] = (stageCounts[stg] || 0) + 1;
    });

    const flaggedCount = students.filter(s => s.isFlagged).length;

    let csvContent = `PROJECT STUDENTS STAGE REPORT\n`;
    csvContent += `Project Name,${project?.name || 'Career Guidance 2026 Batch A'}\n`;
    csvContent += `Institution,${project?.instituteName || "St. Xavier's College, Mumbai"}\n`;
    csvContent += `Total Enrolled Students,${students.length}\n`;
    csvContent += `Total Overdue Flagged (>2 Days Inactive),${flaggedCount}\n\n`;

    csvContent += `STAGE-WISE DISTRIBUTION SUMMARY\n`;
    csvContent += `Stage Name,Student Count\n`;
    Object.entries(stageCounts).forEach(([stageName, count]) => {
      csvContent += `"${stageName}",${count}\n`;
    });
    csvContent += `\n`;

    csvContent += `STUDENT-LEVEL DETAIL LIST\n`;
    csvContent += `Student ID,Student Name,Grade / Class,Counselor ID,Counselor Name,Current Stage,Stage Date,Days In Stage,Follow-up Flag (>2 Days)\n`;
    filteredStudents.forEach(s => {
      csvContent += `"${s.studentId || s.id}","${s.name}","${s.grade}","${s.counselorId || ''}","${s.counselorName || ''}","${s.stage || ''}","${s.stageCompletedDate || s.session1?.date || ''}","${s.daysInStage ?? ''}","${s.isFlagged ? 'FLAGGED (>2 Days Inactive)' : 'On Track'}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `${(project?.name || 'Project').replace(/\s+/g, '_')}_Stage_Report.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(
      'Excel Export Started',
      'Downloaded project stage distribution and students report (.csv).'
    );
  };
  */

  const totalFlaggedCount = students.filter(s => s.isFlagged).length;

  const filteredStudents = students.filter(std => {
    if (isFlagFilterActive && !std.isFlagged) return false;
    if (stageFilter !== 'all' && std.stage !== stageFilter) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        std.name.toLowerCase().includes(q) ||
        (std.studentId && std.studentId.toLowerCase().includes(q)) ||
        (std.grade && std.grade.toLowerCase().includes(q)) ||
        (std.stage && std.stage.toLowerCase().includes(q)) ||
        (std.counselorId && std.counselorId.toLowerCase().includes(q)) ||
        (std.counselorName && std.counselorName.toLowerCase().includes(q)) ||
        std.email.toLowerCase().includes(q) ||
        std.mobile.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const columns: Column<ProjectStudentDetail>[] = [
    {
      key: 'studentId',
      header: 'Student ID',
      width: '120px',
      render: row => row.studentId || '',
    },
    {
      key: 'name',
      header: 'Student Name',
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
      key: 'grade',
      header: 'Grade / Class',
      width: '140px',
      render: row => row.grade || '',
    },
    {
      key: 'counselor',
      header: 'Counselor',
      width: '230px',
      render: row =>
        row.counselorName ? (
          <CounselorWrapper>
            {row.counselorId && <CounselorIdBadge>{row.counselorId}</CounselorIdBadge>}
            <span>{row.counselorName}</span>
          </CounselorWrapper>
        ) : (
          ''
        ),
    },
    {
      key: 'stage',
      header: 'Current Stage',
      width: '240px',
      render: row => (
        <StageCellWrapper>
          <span>{row.stage || ''}</span>
          {row.isFlagged && (
            <Tooltip
              content={
                row.flagReason === 'MISSED_SESSION'
                  ? 'Flagged: missed session — needs follow-up'
                  : row.flagReason === 'IDLE'
                  ? 'Flagged: idle too long — needs follow-up'
                  : 'Flagged for admin follow-up'
              }
            >
              <span>
                <RiFlag2Line size={15} style={{ color: '#EF4444', verticalAlign: '-2px' }} />
              </span>
            </Tooltip>
          )}
        </StageCellWrapper>
      ),
    },
    {
      key: 'stageCompletedDate',
      header: 'Stage Date',
      width: '180px',
      render: row => {
        const rawDate = row.stageCompletedDate || row.session1?.date;
        return (
          <DateCellWrapper>
            <RiCalendarLine size={14} style={{ color: '#6B7280', flexShrink: 0 }} />
            <span>{rawDate ? formatDate(rawDate) : ''}</span>
            {row.isFlagged && (
              <Tooltip
                content={
                  row.daysInStage
                    ? `Stage inactive for ${row.daysInStage} days (> 2 days threshold) — follow up required`
                    : 'Flagged for admin follow-up'
                }
              >
                <FlagIconWrapper>
                  <RiFlag2Fill size={16} />
                </FlagIconWrapper>
              </Tooltip>
            )}
          </DateCellWrapper>
        );
      },
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
            <FlagFilterButton
              type="button"
              $active={isFlagFilterActive}
              onClick={() => {
                setIsFlagFilterActive(prev => !prev);
                setPage(1);
              }}
              aria-label="Filter by Overdue Flag"
            >
              <RiFlag2Fill size={16} />
              <span>
                {isFlagFilterActive ? 'Showing Flagged' : `Flagged (${totalFlaggedCount})`}
              </span>
            </FlagFilterButton>

            {/* <Tooltip content="Export Students Stage Report to Excel">
              <ToolbarIconButton
                type="button"
                $variant="excel"
                onClick={handleExportExcel}
                aria-label="Export Students to Excel"
              >
                <RiFileExcel2Line size={18} />
              </ToolbarIconButton>
            </Tooltip> */}

            <Button leftIcon={<RiUserAddLine size={16} />} onClick={handleCreateNewStudent}>
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

      {/* Student Follow-up Details & WhatsApp Modal */}
      <StudentFollowUpModal
        isOpen={Boolean(viewingStudent)}
        onClose={() => setViewingStudent(null)}
        student={viewingStudent}
        onSave={updated => updateMutation.mutate(updated)}
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
