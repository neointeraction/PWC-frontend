import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RiSearchLine,
  RiTimeLine,
  RiUserLine,
  RiEditLine,
  RiUserAddLine,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Table, Column } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components';
import { projectService } from '@/services/project.service';
import { ProjectStudentDetail } from '@/types/project.types';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { EditStudentModal } from './EditStudentModal';
import {
  Container,
  FilterBar,
  FiltersLeft,
  SearchWrapper,
  StudentCell,
  StudentNameText,
  StudentSubtext,
  SessionTimeText,
  CounselorSubtext,
  ActionIconButtonGroup,
  ActionIconButton,
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
        std.mobile.toLowerCase().includes(q) ||
        std.session1.counselorName.toLowerCase().includes(q) ||
        std.session2.counselorName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const columns: Column<ProjectStudentDetail>[] = [
    {
      key: 'id',
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
    {
      key: 'name',
      header: 'Student Info',
      width: '220px',
      render: row => (
        <StudentCell>
          <StudentNameText>{row.name}</StudentNameText>
          <StudentSubtext>
            {row.email} • {row.mobile}
          </StudentSubtext>
        </StudentCell>
      ),
    },
    {
      key: 'grade',
      header: 'Grade',
      width: '80px',
      render: row => <Badge variant="default">{row.grade}</Badge>,
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
          <RiTimeLine size={13} /> {row.session1.date} ({row.session1.timeSlot})
        </SessionTimeText>
      ),
    },
    {
      key: 'session2',
      header: 'Session 2',
      width: '220px',
      render: row => (
        <SessionTimeText>
          <RiTimeLine size={13} /> {row.session2.date} ({row.session2.timeSlot})
        </SessionTimeText>
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
