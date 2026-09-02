import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RiDownloadLine,
  RiTimeLine,
  RiDeleteBinLine,
  RiArrowLeftLine,
  RiCloseCircleLine,
  RiSearchLine,
  RiFlag2Fill,
  RiFlag2Line,
  RiFileExcel2Line,
  RiUserAddLine,
  RiCalendarLine,
} from 'react-icons/ri';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Table, Column } from '@/components/Table';
import { AlertModal, Tooltip } from '@/components';
import { Loader } from '@/components/Loader';
import { projectService } from '@/services/project.service';
import { ProjectStudentDetail } from '@/types/project.types';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { formatDate, getApiErrorMessage } from '@/utils';
import { EditProjectModal } from '../components/EditProjectModal';
import { EditStudentModal } from '../ProjectStudentsPage/EditStudentModal';
import { StudentFollowUpModal } from '../components/StudentFollowUpModal';
import { buildCounselorChartReport, buildCounselorFeedbackRatingReport } from './projectReports';
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
  StudentNameButton,
  StageCellWrapper,
  CounselorWrapper,
  CounselorIdBadge,
  DateCellWrapper,
  FlagIconWrapper,
  FlagFilterButton,
  ToolbarIconButton,
  ExportMenuWrapper,
  ExportMenu,
  ExportMenuItem,
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

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// "2026-08-01" -> "01 Aug, 2026". Parsed by parts rather than through `new Date` so a
// date-only string doesn't shift a day in timezones behind UTC.
const formatBannerDate = (ymd?: string): string => {
  if (!ymd) return '—';
  const [y, m, d] = ymd.split('-');
  if (!y || !m || !d) return ymd;
  return `${d} ${MONTHS[Number(m) - 1] ?? m}, ${y}`;
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Date-only strings are pinned to UTC midnight on both sides of every subtraction below,
// so a day is never gained or lost to the local timezone.
const parseYmd = (ymd?: string): number | null => {
  if (!ymd) return null;
  const [y, m, d] = ymd.split('-').map(Number);
  if (!y || !m || !d) return null;
  return Date.UTC(y, m - 1, d);
};

const todayUtc = (): number => {
  const now = new Date();
  return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
};

// The project window, counting both the first and last day.
const totalDays = (from?: string, to?: string): number | null => {
  const start = parseYmd(from);
  const end = parseYmd(to);
  if (start === null || end === null || end < start) return null;
  return Math.round((end - start) / MS_PER_DAY) + 1;
};

// Whole days left after today; 0 once the window has closed.
const remainingDays = (to?: string): number | null => {
  const end = parseYmd(to);
  if (end === null) return null;
  return Math.max(0, Math.round((end - todayUtc()) / MS_PER_DAY));
};

export const ProjectDashboardPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: project, isLoading: isProjectLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectService.getById(projectId as string),
    enabled: Boolean(projectId),
  });

  const isProjectClosed = project?.status === 'closed';
  const projectTotalDays = totalDays(project?.validFrom, project?.validTo);
  const projectRemainingDays = remainingDays(project?.validTo);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Table Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [isFlagFilterActive, setIsFlagFilterActive] = useState(false);
  const [page, setPage] = useState(1);
  const [editingStudent, setEditingStudent] = useState<ProjectStudentDetail | null>(null);
  const [viewingStudent, setViewingStudent] = useState<ProjectStudentDetail | null>(null);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [exportingReport, setExportingReport] = useState<
    'student' | 'counselorChart' | 'counselorFeedback' | null
  >(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);
  const limit = 10;

  useEffect(() => {
    if (!isExportMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setIsExportMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExportMenuOpen]);

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
      // The Total Students card reads the project's `_count`, not the student list.
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
      setIsAddStudentModalOpen(false);
    },
    onError: err => {
      toast.error('Save Failed', getApiErrorMessage(err, 'Could not update student details.'));
    },
  });

  const handleExtendProject = () => {
    setIsEditModalOpen(true);
  };

  // PATCH /projects/{id} with status CLOSED — the soft close that also gates
  // student/parent submissions on the backend.
  const closeMutation = useMutation({
    mutationFn: () => projectService.update(projectId as string, { status: 'closed' }),
    onSuccess: updated => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects-stats'] });
      setIsCloseModalOpen(false);
      toast.success('Project Closed', `"${updated.name}" has been marked as completed.`);
    },
    onError: () => {
      toast.error('Close Failed', 'Could not close this project. Please try again.');
    },
  });

  // DELETE /projects/{id} is a soft-delete (status → DELETED); the record is preserved
  // and can be restored from the projects list.
  const deleteMutation = useMutation({
    mutationFn: () => projectService.delete(projectId as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects-stats'] });
      setIsDeleteModalOpen(false);
      toast.warning('Project Deleted', `${project?.name ?? 'Project'} has been removed.`);
      navigate(ROUTES.PROJECTS);
    },
    onError: () => {
      toast.error('Delete Failed', 'Could not delete this project. Please try again.');
    },
  });

  const handleConfirmClose = () => closeMutation.mutate();

  const handleConfirmDelete = () => deleteMutation.mutate();

  const handleCreateNewStudent = () => {
    const newStd: ProjectStudentDetail = {
      id: '',
      studentId: `ST${100 + students.length + 1}`,
      name: '',
      email: '',
      mobile: '',
      grade: 'Grade 11',
      counselorId: 'COU-01',
      counselorName: 'Dr. Rajeshwari Menon',
      stage: 'Login Activated',
      stageCompletedDate: new Date().toISOString().slice(0, 10),
      daysInStage: 0,
      isFlagged: false,
    };
    setEditingStudent(newStd);
    setIsAddStudentModalOpen(true);
  };

  const downloadCsv = (csvContent: string, filenameSuffix: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `${(project?.name ?? 'Project').replace(/\s+/g, '_')}_${filenameSuffix}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportStudentReport = () => {
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
    csvContent += `Project Name,${project?.name ?? ''}\n`;
    csvContent += `Institution,${project?.instituteName ?? ''}\n`;
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
      csvContent += `"${s.studentId || s.id}","${s.name}","${s.grade}","${s.counselorId || 'COU-01'}","${s.counselorName || s.session1?.counselorName || 'Dr. Rajeshwari Menon'}","${s.stage || 'Login Activated'}","${s.stageCompletedDate || s.session1?.date || '—'}","${s.daysInStage ?? '—'}","${s.isFlagged ? 'FLAGGED (>2 Days Inactive)' : 'On Track'}"\n`;
    });

    downloadCsv(csvContent, 'Student_Details_Report');
    toast.success('Report Export Started', 'Downloaded student details report (.csv).');
  };

  // Per-student counsellor chart (pre-counselling + computed assessment + SCRI) — real
  // .xlsx matching docs/Class 910_Counsellor Chart(4analytics).xlsx.
  const handleExportCounselorChart = async () => {
    setExportingReport('counselorChart');
    try {
      await buildCounselorChartReport(project, students);
      toast.success('Report Export Started', 'Downloaded counselor chart report (.xlsx).');
    } catch (err) {
      toast.error('Export Failed', getApiErrorMessage(err, 'Could not generate the counselor chart report.'));
    } finally {
      setExportingReport(null);
    }
  };

  // Raw per-question feedback form answers — real .xlsx matching
  // docs/Class 910_Counsellor Feedback Rating.xlsx.
  const handleExportCounselorFeedback = async () => {
    setExportingReport('counselorFeedback');
    try {
      await buildCounselorFeedbackRatingReport(project, students);
      toast.success('Report Export Started', 'Downloaded counselor feedback rating report (.xlsx).');
    } catch (err) {
      toast.error(
        'Export Failed',
        getApiErrorMessage(err, 'Could not generate the counselor feedback rating report.')
      );
    } finally {
      setExportingReport(null);
    }
  };

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
      render: row => row.studentId || `ST${100 + (parseInt(row.id.replace(/\D/g, ''), 10) || 1)}`,
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
      key: 'stage',
      header: 'Stage',
      width: '240px',
      render: row => (
        <StageCellWrapper>
          <span>{row.stage || 'Login Activated'}</span>
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
      key: 'counselor',
      header: 'Counselor',
      width: '230px',
      render: row => (
        <CounselorWrapper>
          <CounselorIdBadge>{row.counselorId || 'COU-01'}</CounselorIdBadge>
          <span>{row.counselorName || row.session1?.counselorName || 'Dr. Rajeshwari Menon'}</span>
        </CounselorWrapper>
      ),
    },
    {
      key: 'stage',
      header: 'Current Stage',
      width: '240px',
      render: row => (
        <StageCellWrapper>
          <span>{row.stage || 'Login Activated'}</span>
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
            <span>{rawDate ? formatDate(rawDate) : '—'}</span>
            {row.isFlagged && (
              <Tooltip
                content={`Stage inactive for ${row.daysInStage || 3} days (> 2 days threshold) — follow up required`}
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

  if (isProjectLoading) return <Loader />;

  return (
    <DashboardContainer>
      {/* Top Project Identity Banner */}
      <ProjectTopHeaderCard>
        <TopHeaderLeft>
          <BackIconButton
            type="button"
            onClick={() => navigate(ROUTES.PROJECTS)}
            aria-label="Back to Projects"
          >
            <RiArrowLeftLine size={18} />
          </BackIconButton>

          <ProjectIdentity>
            <ProjectTitleRow>
              <ProjectInstituteTitle>{project?.instituteName}</ProjectInstituteTitle>
              <InstCodeBadge>INS001</InstCodeBadge>
              <StatusPill $isClosed={isProjectClosed}>
                {isProjectClosed ? 'Completed' : 'Ongoing'}
              </StatusPill>
            </ProjectTitleRow>
            <LocationAndPeriod>
              <span>{project?.location || 'Mumbai, Maharashtra'}</span>
              <span>•</span>
              <PeriodText>
                Period : {formatBannerDate(project?.validFrom)} –{' '}
                {formatBannerDate(project?.validTo)}
              </PeriodText>
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
          {isProjectClosed && (
            <Button
              variant="danger"
              size="sm"
              leftIcon={<RiDeleteBinLine size={16} />}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete project
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            leftIcon={<RiDownloadLine size={16} />}
            onClick={handleExportStudentReport}
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
            navigate(ROUTES.PROJECT_SESSIONS.replace(':projectId', projectId as string))
          }
          title="Click to view Project Sessions"
        >
          <OverviewCardLabel>Counsellors</OverviewCardLabel>
          <OverviewCardValue>{project?.counselorCount ?? 0}</OverviewCardValue>
        </OverviewCard>

        <OverviewCard>
          <OverviewCardLabel>Total Students</OverviewCardLabel>
          <OverviewCardValue>{project?.studentCount ?? students.length}</OverviewCardValue>
        </OverviewCard>

        <OverviewCard>
          <OverviewCardLabel>Total Days</OverviewCardLabel>
          <OverviewCardValue>{projectTotalDays ?? '—'}</OverviewCardValue>
        </OverviewCard>

        <OverviewCard>
          <OverviewCardLabel>Remaining Days</OverviewCardLabel>
          <OverviewCardValue>{projectRemainingDays ?? '—'}</OverviewCardValue>
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

            <ExportMenuWrapper ref={exportMenuRef}>
              <Tooltip content="Export Reports">
                <ToolbarIconButton
                  type="button"
                  $variant="excel"
                  onClick={() => setIsExportMenuOpen(prev => !prev)}
                  aria-label="Export Reports"
                  aria-haspopup="true"
                  aria-expanded={isExportMenuOpen}
                >
                  <RiFileExcel2Line size={18} />
                </ToolbarIconButton>
              </Tooltip>

              {isExportMenuOpen && (
                <ExportMenu>
                  <ExportMenuItem
                    type="button"
                    disabled={exportingReport !== null}
                    onClick={() => {
                      handleExportStudentReport();
                      setIsExportMenuOpen(false);
                    }}
                  >
                    Student details report
                  </ExportMenuItem>
                  <ExportMenuItem
                    type="button"
                    disabled={exportingReport !== null}
                    onClick={async () => {
                      setIsExportMenuOpen(false);
                      await handleExportCounselorChart();
                    }}
                  >
                    Counselor chart report
                  </ExportMenuItem>
                  <ExportMenuItem
                    type="button"
                    disabled={exportingReport !== null}
                    onClick={async () => {
                      setIsExportMenuOpen(false);
                      await handleExportCounselorFeedback();
                    }}
                  >
                    Counselor feedback rating report
                  </ExportMenuItem>
                </ExportMenu>
              )}
            </ExportMenuWrapper>

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
      {project && (
        <EditProjectModal
          isOpen={isEditModalOpen}
          project={project}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {/* Delete Project Confirmation Modal */}
      <AlertModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Project"
        description={`Are you sure you want to delete "${project?.name ?? ''}"? This action cannot be undone.`}
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
        description={`Are you sure you want to close "${project?.name ?? ''}"? This will mark the project status as completed.`}
        variant="warning"
        confirmText="Close Project"
        cancelText="Cancel"
      />
    </DashboardContainer>
  );
};

export default ProjectDashboardPage;
