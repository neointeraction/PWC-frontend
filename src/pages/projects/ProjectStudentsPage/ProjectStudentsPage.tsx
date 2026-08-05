import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RiSearchLine,
  RiTimeLine,
  RiUserLine,
  RiPhoneLine,
  RiMailLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiEditLine,
  RiUserAddLine,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components';
import { projectService } from '@/services/project.service';
import { ProjectStudentDetail, StudentSessionDetail } from '@/types/project.types';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { EditStudentModal } from './EditStudentModal';
import {
  Container,
  FilterBar,
  FiltersLeft,
  SearchWrapper,
  StudentsGrid,
  StudentCard,
  CardHeader,
  HeaderRight,
  ActionIconButton,
  StudentIdentity,
  StudentAvatar,
  StudentDetails,
  StudentNameRow,
  StudentName,
  StudentMeta,
  SessionsGrid,
  SessionCardBox,
  SessionTitleRow,
  SessionLabel,
  SessionSlotText,
  CounselorMeta,
  PaginationContainer,
  PaginationInfo,
  PaginationControls,
  PageButton,
} from './ProjectStudentsPage.styles';

export const ProjectStudentsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [editingStudent, setEditingStudent] = useState<ProjectStudentDetail | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const limit = 6;

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
      session1: {
        sessionNumber: 1,
        status: 'scheduled',
        date: new Date().toISOString().slice(0, 10),
        timeSlot: '09:30 AM - 10:30 AM',
        counselorName: 'Anil Iyer',
        counselorEmail: 'anil.iyer1@outlook.com',
      },
      session2: {
        sessionNumber: 2,
        status: 'pending',
        date: new Date().toISOString().slice(0, 10),
        timeSlot: '11:00 AM - 12:00 PM',
        counselorName: 'Mahesh Pillai',
        counselorEmail: 'mahesh.pillai2@rediffmail.com',
      },
    };
    setEditingStudent(newStd);
    setIsAddModalOpen(true);
  };

  const renderStatusBadge = (session: StudentSessionDetail) => {
    switch (session.status) {
      case 'completed':
        return (
          <Badge variant="default" dot>
            Completed
          </Badge>
        );
      case 'scheduled':
        return (
          <Badge variant="info" dot>
            Scheduled
          </Badge>
        );
      case 'pending':
      default:
        return (
          <Badge variant="warning" dot>
            Pending
          </Badge>
        );
    }
  };

  const filteredStudents = students.filter(std => {
    if (gradeFilter !== 'all' && std.grade !== gradeFilter) return false;
    if (statusFilter === 's1_completed' && std.session1.status !== 'completed') return false;
    if (statusFilter === 's2_completed' && std.session2.status !== 'completed') return false;
    if (statusFilter === 'pending' && std.session1.status !== 'pending' && std.session2.status !== 'pending') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        std.name.toLowerCase().includes(q) ||
        std.email.toLowerCase().includes(q) ||
        std.session1.counselorName.toLowerCase().includes(q) ||
        std.session2.counselorName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalPages = Math.ceil(filteredStudents.length / limit) || 1;
  const paginatedStudents = filteredStudents.slice((page - 1) * limit, page * limit);

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
                placeholder="Search student or counselor name..."
                leftIcon={<RiSearchLine size={16} />}
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
              />
            </SearchWrapper>

            <div style={{ width: '160px' }}>
              <Select
                value={gradeFilter}
                onChange={e => {
                  setGradeFilter(e.target.value);
                  setPage(1);
                }}
                options={[
                  { value: 'all', label: 'All Grades' },
                  { value: '10th', label: '10th Grade' },
                  { value: '11th', label: '11th Grade' },
                  { value: '12th', label: '12th Grade' },
                ]}
              />
            </div>

            <div style={{ width: '200px' }}>
              <Select
                value={statusFilter}
                onChange={e => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                options={[
                  { value: 'all', label: 'All Session Status' },
                  { value: 's1_completed', label: 'Session 1 Completed' },
                  { value: 's2_completed', label: 'Session 2 Completed' },
                  { value: 'pending', label: 'Pending Sessions' },
                ]}
              />
            </div>
          </FiltersLeft>

          <Button
            leftIcon={<RiUserAddLine size={16} />}
            onClick={handleCreateNewStudent}
          >
            Add Student
          </Button>
        </FilterBar>

        {isLoading ? (
          <p style={{ fontSize: '14px', color: '#6b7280' }}>Loading student cards...</p>
        ) : filteredStudents.length === 0 ? (
          <p style={{ fontSize: '14px', color: '#6b7280' }}>No students found matching filters.</p>
        ) : (
          <>
            <StudentsGrid>
              {paginatedStudents.map(student => (
                <StudentCard key={student.id}>
                  <CardHeader>
                    <StudentIdentity>
                      <StudentAvatar>
                        {student.name
                          .split(' ')
                          .filter(Boolean)
                          .map(n => n[0])
                          .join('') || 'ST'}
                      </StudentAvatar>
                      <StudentDetails>
                        <StudentNameRow>
                          <StudentName>{student.name}</StudentName>
                          <Badge variant="default">{student.grade}</Badge>
                        </StudentNameRow>
                        <StudentMeta>
                          <RiMailLine size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                          {student.email}
                        </StudentMeta>
                      </StudentDetails>
                    </StudentIdentity>

                    <HeaderRight>
                      <StudentMeta style={{ fontWeight: 500 }}>
                        <RiPhoneLine size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                        {student.mobile}
                      </StudentMeta>

                      <Tooltip content="Edit Student & Sessions">
                        <ActionIconButton onClick={() => setEditingStudent(student)}>
                          <RiEditLine size={16} />
                        </ActionIconButton>
                      </Tooltip>
                    </HeaderRight>
                  </CardHeader>

                  <SessionsGrid>
                    <SessionCardBox>
                      <SessionTitleRow>
                        <SessionLabel>Session 1</SessionLabel>
                        {renderStatusBadge(student.session1)}
                      </SessionTitleRow>
                      <SessionSlotText>
                        <RiTimeLine size={14} />
                        {student.session1.date} ({student.session1.timeSlot})
                      </SessionSlotText>
                      <CounselorMeta>
                        <RiUserLine size={13} />
                        Counselor: {student.session1.counselorName}
                      </CounselorMeta>
                    </SessionCardBox>

                    <SessionCardBox>
                      <SessionTitleRow>
                        <SessionLabel>Session 2</SessionLabel>
                        {renderStatusBadge(student.session2)}
                      </SessionTitleRow>
                      <SessionSlotText>
                        <RiTimeLine size={14} />
                        {student.session2.date} ({student.session2.timeSlot})
                      </SessionSlotText>
                      <CounselorMeta>
                        <RiUserLine size={13} />
                        Counselor: {student.session2.counselorName}
                      </CounselorMeta>
                    </SessionCardBox>
                  </SessionsGrid>
                </StudentCard>
              ))}
            </StudentsGrid>

            <PaginationContainer>
              <PaginationInfo>
                Showing {(page - 1) * limit + 1}–
                {Math.min(page * limit, filteredStudents.length)} of {filteredStudents.length} students
              </PaginationInfo>

              <PaginationControls>
                <PageButton disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                  <RiArrowLeftSLine size={16} />
                </PageButton>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <PageButton key={p} $isActive={p === page} onClick={() => setPage(p)}>
                    {p}
                  </PageButton>
                ))}
                <PageButton disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
                  <RiArrowRightSLine size={16} />
                </PageButton>
              </PaginationControls>
            </PaginationContainer>
          </>
        )}
      </Card>

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
