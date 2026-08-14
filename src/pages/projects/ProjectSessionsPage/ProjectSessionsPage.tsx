import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RiSearchLine,
  RiEditLine,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Table, Column } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { Tooltip, EmptyState, Loader } from '@/components';
import { projectService } from '@/services/project.service';
import { CounselorSession, ProjectStudent } from '@/types/project.types';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { ModifySessionModal } from './ModifySessionModal';
import { ViewStudentModal } from './ViewStudentModal';
import {
  Container,
  FilterBar,
  SearchWrapper,
  CounselorsGrid,
  CounselorCard,
  CounselorHeader,
  CounselorIdentity,
  CounselorAvatar,
  CounselorDetails,
  CounselorNameRow,
  CounselorName,
  CounselorSubtext,
  StudentsSection,
  StudentsTableWrapper,
  ActionIconButton,
  StudentNameButton,
} from './ProjectSessionsPage.styles';

const getStudentColumns = (
  session: CounselorSession,
  onModify: (session: CounselorSession) => void,
  onViewStudent: (student: ProjectStudent) => void
): Column<ProjectStudent>[] => [
  {
    key: 'actions',
    header: 'Action',
    render: () => (
      <Tooltip content="Edit Session Assignment">
        <ActionIconButton aria-label="Edit Session Assignment" onClick={() => onModify(session)}>
          <RiEditLine size={16} />
        </ActionIconButton>
      </Tooltip>
    ),
  },
  {
    key: 'sessionDate',
    header: 'Date',
    render: row => row.sessionDate || '18 Feb 2026',
  },
  {
    key: 'timeSlot',
    header: 'Time',
    render: row => row.timeSlot || session.timeSlots.find(s => s.isSelected)?.time || '09:30 AM - 10:30 AM',
  },
  {
    key: 'name',
    header: 'Student',
    render: row => (
      <StudentNameButton type="button" onClick={() => onViewStudent(row)}>
        {row.name}
      </StudentNameButton>
    ),
  },
  {
    key: 'sessionType',
    header: 'Session',
    render: row => (
      <Badge variant={row.sessionType === 'S2' ? 'info' : 'primary'}>
        {row.sessionType || 'S1'}
      </Badge>
    ),
  },
  {
    key: 'mobile',
    header: 'Phone',
    render: row => row.mobile || 'N/A',
  },
];

interface CounselorSessionCardProps {
  session: CounselorSession;
  onModify: (session: CounselorSession) => void;
  onViewStudent: (student: ProjectStudent) => void;
}

const CounselorSessionCard: React.FC<CounselorSessionCardProps> = ({ session, onModify, onViewStudent }) => {
  return (
    <CounselorCard key={session.id}>
      <CounselorHeader>
        <CounselorIdentity>
          <CounselorAvatar>
            {session.counselorName
              .split(' ')
              .map(n => n[0])
              .join('')}
          </CounselorAvatar>
          <CounselorDetails>
            <CounselorNameRow>
              <CounselorName>{session.counselorName}</CounselorName>
              <Badge variant="success">Matched Counselor</Badge>
            </CounselorNameRow>
            <CounselorSubtext>
              {session.counselorEmail} • {session.counselorPhone}
            </CounselorSubtext>
          </CounselorDetails>
        </CounselorIdentity>

        <Button
          size="sm"
          variant="secondary"
          leftIcon={<RiEditLine size={16} />}
          onClick={() => onModify(session)}
        >
          Modify Session
        </Button>
      </CounselorHeader>

      <StudentsSection>
        <StudentsTableWrapper>
          <Table
            columns={getStudentColumns(session, onModify, onViewStudent)}
            data={session.assignedStudents}
            keyExtractor={row => row.email}
            emptyMessage="No student assigned."
          />
        </StudentsTableWrapper>
      </StudentsSection>
    </CounselorCard>
  );
};

export const ProjectSessionsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSession, setSelectedSession] = useState<CounselorSession | null>(null);
  const [selectedStudentForView, setSelectedStudentForView] = useState<ProjectStudent | null>(null);

  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectService.getById(projectId || 'proj-001'),
  });

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['projectSessions', projectId],
    queryFn: () => projectService.getProjectSessions(projectId || 'proj-001'),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      sessionId,
      selectedSlotId,
      assignedStudents,
    }: {
      sessionId: string;
      selectedSlotId: string;
      assignedStudents: ProjectStudent[];
    }) =>
      projectService.updateCounselorSession(
        projectId || 'proj-001',
        sessionId,
        selectedSlotId,
        assignedStudents
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectSessions', projectId] });
      toast.success('Session Updated', 'Counselor time slot and assigned students updated successfully.');
      setSelectedSession(null);
    },
    onError: () => {
      toast.error('Update Failed', 'Could not update session. Please try again.');
    },
  });

  const filteredSessions = sessions.filter(s => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.counselorName.toLowerCase().includes(q) ||
      s.assignedStudents.some(std => std.name.toLowerCase().includes(q))
    );
  });

  return (
    <Container>
      <PageHeader
        title={`Project Sessions - ${project?.name || 'Career Guidance'}`}
        subtitle="View counselor time slots and assigned student details."
        breadcrumbs={[
          { label: 'Dashboard', href: ROUTES.DASHBOARD },
          { label: 'Projects', href: ROUTES.PROJECTS },
          { label: 'Project Sessions' },
        ]}
        onBack={() => navigate(ROUTES.PROJECTS)}
      />

      <Card padding="lg">
        <FilterBar style={{ marginBottom: '20px' }}>
          <SearchWrapper>
            <Input
              placeholder="Search counselor or student name..."
              leftIcon={<RiSearchLine size={16} />}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </SearchWrapper>
        </FilterBar>

        {isLoading ? (
          <Loader />
        ) : filteredSessions.length === 0 ? (
          <EmptyState title="No counselor sessions found" description="Try adjusting your search criteria or filter." />
        ) : (
          <CounselorsGrid>
            {filteredSessions.map(session => (
              <CounselorSessionCard
                key={session.id}
                session={session}
                onModify={setSelectedSession}
                onViewStudent={setSelectedStudentForView}
              />
            ))}
          </CounselorsGrid>
        )}
      </Card>

      <ModifySessionModal
        isOpen={Boolean(selectedSession)}
        onClose={() => setSelectedSession(null)}
        session={selectedSession}
        onSave={(sessionId, selectedSlotId, assignedStudents) => {
          updateMutation.mutate({ sessionId, selectedSlotId, assignedStudents });
        }}
        isSaving={updateMutation.isPending}
      />

      <ViewStudentModal
        isOpen={Boolean(selectedStudentForView)}
        onClose={() => setSelectedStudentForView(null)}
        student={selectedStudentForView}
        instituteName={project?.instituteName}
      />
    </Container>
  );
};
export default ProjectSessionsPage;
