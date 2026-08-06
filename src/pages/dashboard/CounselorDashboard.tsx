import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RiEyeLine } from 'react-icons/ri';
import { useAuthStore } from '@/store';
import { Table, Column } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { Tooltip } from '@/components/Tooltip';
import { studentService } from '@/services/student.service';
import { Student } from '@/types';
import { PreCounsellingAnswersModal } from './components/PreCounsellingAnswersModal';
import {
  DashboardContainer,
  DashboardHeader,
  DashboardTitle,
  DashboardSubtitle,
  StudentsSection,
  SectionTitle,
} from './CounselorDashboard.styles';

export const CounselorDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedStudentName, setSelectedStudentName] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['students', user?.id],
    queryFn: () => (user?.id ? studentService.getStudentsByCounselor(user.id) : null),
    enabled: !!user?.id,
  });

  const students = data?.data || [];

  const handleViewAnswers = (student: Student) => {
    setSelectedStudentId(student.id);
    setSelectedStudentName(student.name);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudentId(null);
    setSelectedStudentName('');
  };

  const columns: Column<Student>[] = [
    {
      key: 'actions',
      header: 'Actions',
      width: '100px',
      render: (row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          {row.formStatus === 'submitted' && (
            <Tooltip content="View Answers">
              <button
                type="button"
                className="table-action-btn"
                onClick={() => handleViewAnswers(row)}
                style={{
                  width: '32px',
                  height: '32px',
                  border: '1px solid var(--theme-colors-border)',
                  borderRadius: '4px',
                  backgroundColor: 'var(--theme-colors-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <RiEyeLine size={16} />
              </button>
            </Tooltip>
          )}
        </div>
      ),
    },
    { key: 'name', header: 'Student Name' },
    { key: 'email', header: 'Email' },
    { key: 'school', header: 'School' },
    { key: 'grade', header: 'Grade' },
    {
      key: 'formStatus',
      header: 'Form Status',
      render: (row) => (
        <Badge variant={row.formStatus === 'submitted' ? 'success' : 'warning'}>
          {row.formStatus === 'submitted' ? 'Submitted' : 'Pending'}
        </Badge>
      ),
    },
  ];

  return (
    <DashboardContainer>
      <DashboardHeader>
        <DashboardTitle>Welcome, {user?.name}</DashboardTitle>
        <DashboardSubtitle>Here is an overview of your assigned students.</DashboardSubtitle>
      </DashboardHeader>

      <StudentsSection>
        <SectionTitle>Assigned Students</SectionTitle>
        <Table<Student>
          columns={columns}
          data={students}
          isLoading={isLoading}
          keyExtractor={(row) => row.id}
          emptyMessage="No students assigned to you yet."
        />
      </StudentsSection>

      <PreCounsellingAnswersModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        studentId={selectedStudentId}
        studentName={selectedStudentName}
      />
    </DashboardContainer>
  );
};
