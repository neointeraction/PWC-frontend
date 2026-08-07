import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RiSearchLine,
  RiCheckLine,
  RiEditLine,
  RiTimeLine,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Table, Column } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { projectService } from '@/services/project.service';
import { CounselorSession, ProjectStudent } from '@/types/project.types';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { ModifySessionModal } from './ModifySessionModal';
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
  SectionTitle,
  TimeSlotsRow,
  TimeSlotPill,
  TickIconBadge,
  StudentsSection,
  StudentsHeaderRow,
  StudentsTableWrapper,
} from './ProjectSessionsPage.styles';

const studentColumns: Column<ProjectStudent>[] = [
  { key: 'name', header: 'Student Name' },
  { key: 'email', header: 'Email' },
  { key: 'mobile', header: 'Mobile' },
  {
    key: 'grade',
    header: 'Grade',
    render: row => <Badge variant="default">{row.grade}</Badge>,
  },
];

interface CounselorSessionCardProps {
  session: CounselorSession;
  onModify: (session: CounselorSession) => void;
}

const CounselorSessionCard: React.FC<CounselorSessionCardProps> = ({ session, onModify }) => {
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

      <div>
        <SectionTitle>Available Time Slots (Selected Ticked)</SectionTitle>
        <TimeSlotsRow>
          {session.timeSlots.map(slot => (
            <TimeSlotPill key={slot.id} $isSelected={slot.isSelected}>
              <RiTimeLine size={14} />
              <span>{slot.time}</span>
              {slot.isSelected && (
                <TickIconBadge>
                  <RiCheckLine size={12} />
                </TickIconBadge>
              )}
            </TimeSlotPill>
          ))}
        </TimeSlotsRow>
      </div>

      <StudentsSection>
        <StudentsHeaderRow>
          <SectionTitle style={{ margin: 0 }}>
            ASSIGNED STUDENT ({session.assignedStudents.length})
          </SectionTitle>
        </StudentsHeaderRow>

        <StudentsTableWrapper>
          <Table
            columns={studentColumns}
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
          <p style={{ fontSize: '14px', color: '#6b7280' }}>Loading sessions...</p>
        ) : filteredSessions.length === 0 ? (
          <p style={{ fontSize: '14px', color: '#6b7280' }}>No counselor sessions found.</p>
        ) : (
          <CounselorsGrid>
            {filteredSessions.map(session => (
              <CounselorSessionCard
                key={session.id}
                session={session}
                onModify={setSelectedSession}
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
    </Container>
  );
};
export default ProjectSessionsPage;
