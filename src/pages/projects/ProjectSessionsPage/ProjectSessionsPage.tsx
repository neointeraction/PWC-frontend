import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  RiSearchLine,
  RiEditLine,
  RiFileCopyLine,
  RiUserAddLine,
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
import { ViewStudentModal } from './ViewStudentModal';
import { AssignStudentModal, SlotData } from './AssignStudentModal';
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
  NBStudentText,
} from './ProjectSessionsPage.styles';

const getSlotColumns = (
  session: CounselorSession,
  onAssignSlot: (session: CounselorSession, slot: SlotData) => void,
  onViewStudent: (student: ProjectStudent) => void
): Column<SlotData>[] => [
  {
    key: 'date',
    header: 'Date',
    render: row => (
      <span style={{ color: row.isBooked ? undefined : '#94A3B8' }}>
        {row.date}
      </span>
    ),
  },
  {
    key: 'time',
    header: 'Time',
    render: row => (
      <strong style={{ color: row.isBooked ? undefined : '#94A3B8' }}>
        {row.time}
      </strong>
    ),
  },
  {
    key: 'studentName',
    header: 'Student',
    render: row =>
      row.isBooked ? (
        <StudentNameButton
          type="button"
          onClick={() =>
            onViewStudent({
              name: row.studentName || '',
              email: `${row.studentName?.toLowerCase().replace(/\s+/g, '.')}@student.edu`,
              mobile: row.mobile || '+91 9810012345',
              grade: '11th',
            })
          }
        >
          {row.studentName}
        </StudentNameButton>
      ) : (
        <NBStudentText>NB (not booked)</NBStudentText>
      ),
  },
  {
    key: 'sessionType',
    header: 'Session',
    render: row =>
      row.isBooked ? (
        <Badge variant={row.sessionType === 'S2' ? 'info' : 'primary'}>
          {row.sessionType || 'S1'}
        </Badge>
      ) : (
        <Badge variant="default" size="sm">
          NB
        </Badge>
      ),
  },
  {
    key: 'mobile',
    header: 'Phone',
    render: row =>
      row.isBooked ? (
        row.mobile || 'N/A'
      ) : (
        <span style={{ color: '#CBD5E1' }}>—</span>
      ),
  },
  {
    key: 'actions',
    header: 'Action',
    render: row => (
      <Tooltip content={row.isBooked ? 'Edit Student Schedule' : 'Assign Student to Session'}>
        <ActionIconButton
          aria-label={row.isBooked ? 'Edit Schedule' : 'Assign Student'}
          onClick={() => onAssignSlot(session, row)}
        >
          {row.isBooked ? <RiEditLine size={16} /> : <RiUserAddLine size={16} />}
        </ActionIconButton>
      </Tooltip>
    ),
  },
];

interface CounselorSessionCardProps {
  session: CounselorSession;
  slots: SlotData[];
  onAssignSlot: (session: CounselorSession, slot: SlotData) => void;
  onViewStudent: (student: ProjectStudent) => void;
  onCopyMeetLink: (session: CounselorSession) => void;
}

const CounselorSessionCard: React.FC<CounselorSessionCardProps> = ({
  session,
  slots,
  onAssignSlot,
  onViewStudent,
  onCopyMeetLink,
}) => {
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

        <Tooltip content="Copy Google Meet link for this counselor">
          <Button
            size="sm"
            variant="secondary"
            leftIcon={<RiFileCopyLine size={16} />}
            onClick={() => onCopyMeetLink(session)}
          >
            Copy Meet Link
          </Button>
        </Tooltip>
      </CounselorHeader>

      <StudentsSection>
        <StudentsTableWrapper>
          <Table
            columns={getSlotColumns(session, onAssignSlot, onViewStudent)}
            data={slots}
            keyExtractor={row => row.id}
            emptyMessage="No available or booked session slots."
          />
        </StudentsTableWrapper>
      </StudentsSection>
    </CounselorCard>
  );
};

export const ProjectSessionsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSlotForAssign, setSelectedSlotForAssign] = useState<{
    session: CounselorSession;
    slot: SlotData;
  } | null>(null);
  const [selectedStudentForView, setSelectedStudentForView] = useState<ProjectStudent | null>(null);

  // Local state for customized slot rows per counselor
  const [counselorSlotsMap, setCounselorSlotsMap] = useState<Record<string, SlotData[]>>({
    'cs-101': [
      {
        id: 'anil-slot-1',
        date: '18 Feb 2026',
        time: '09:30 - 10:30',
        studentName: 'Ananya Roy',
        sessionType: 'S1',
        mobile: '+91 9810012345',
        isBooked: true,
      },
      {
        id: 'anil-slot-2',
        date: '22 Feb 2026',
        time: '09:30 - 10:30',
        studentName: 'Ananya Roy',
        sessionType: 'S2',
        mobile: '+91 9810012345',
        isBooked: true,
      },
      {
        id: 'anil-slot-3',
        date: '18 Feb 2026',
        time: '11:00 - 12:00',
        isBooked: false,
      },
      {
        id: 'anil-slot-4',
        date: '25 Feb 2026',
        time: '14:00 - 15:00',
        isBooked: false,
      },
    ],
    'cs-102': [
      {
        id: 'mahesh-slot-1',
        date: '18 Feb 2026',
        time: '09:30 - 10:30',
        studentName: 'Ananya Roy',
        sessionType: 'S1',
        mobile: '+91 9810012345',
        isBooked: true,
      },
      {
        id: 'mahesh-slot-2',
        date: '22 Feb 2026',
        time: '09:30 - 10:30',
        studentName: 'Ananya Roy',
        sessionType: 'S2',
        mobile: '+91 9810012345',
        isBooked: true,
      },
      {
        id: 'mahesh-slot-3',
        date: '18 Feb 2026',
        time: '11:00 - 12:00',
        isBooked: false,
      },
      {
        id: 'mahesh-slot-4',
        date: '25 Feb 2026',
        time: '14:00 - 15:00',
        isBooked: false,
      },
    ],
    'cs-103': [
      {
        id: 'hema-slot-1',
        date: '19 Feb 2026',
        time: '14:00 - 15:00',
        studentName: 'Priya Rao',
        sessionType: 'S2',
        mobile: '+91 9810037035',
        isBooked: true,
      },
      {
        id: 'hema-slot-2',
        date: '23 Feb 2026',
        time: '11:00 - 12:00',
        isBooked: false,
      },
      {
        id: 'hema-slot-3',
        date: '26 Feb 2026',
        time: '16:00 - 17:00',
        isBooked: false,
      },
    ],
    'cs-104': [
      {
        id: 'girish-slot-1',
        date: '19 Feb 2026',
        time: '16:00 - 17:00',
        studentName: 'Siddharth Pillai',
        sessionType: 'S1',
        mobile: '+91 9810049380',
        isBooked: true,
      },
      {
        id: 'girish-slot-2',
        date: '24 Feb 2026',
        time: '09:30 - 10:30',
        isBooked: false,
      },
      {
        id: 'girish-slot-3',
        date: '27 Feb 2026',
        time: '14:00 - 15:00',
        isBooked: false,
      },
    ],
  });

  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectService.getById(projectId || 'proj-001'),
  });

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['projectSessions', projectId],
    queryFn: () => projectService.getProjectSessions(projectId || 'proj-001'),
  });

  const handleCopyMeetLink = (session: CounselorSession) => {
    const link = `https://meet.google.com/pwc-${session.counselorId.toLowerCase()}`;
    navigator.clipboard.writeText(link);
    toast.success(
      'Link Copied',
      `Google Meet link for ${session.counselorName} copied to clipboard.`
    );
  };

  const handleOpenAssignModal = (session: CounselorSession, slot: SlotData) => {
    setSelectedSlotForAssign({ session, slot });
  };

  const handleSaveSlotAssignment = (slotId: string, updatedSlot: Partial<SlotData>) => {
    if (!selectedSlotForAssign) return;

    const sessionKey = selectedSlotForAssign.session.id;

    setCounselorSlotsMap(prev => {
      const currentSlots = prev[sessionKey] || [];
      const updatedSlots = currentSlots.map(s =>
        s.id === slotId ? { ...s, ...updatedSlot } : s
      );
      return { ...prev, [sessionKey]: updatedSlots };
    });

    toast.success(
      'Schedule Saved',
      `Assigned ${updatedSlot.studentName} to ${selectedSlotForAssign.session.counselorName}'s session on ${selectedSlotForAssign.slot.date}.`
    );
    setSelectedSlotForAssign(null);
  };

  const filteredSessions = sessions.filter(s => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const slots = counselorSlotsMap[s.id] || [];
    return (
      s.counselorName.toLowerCase().includes(q) ||
      slots.some(
        slot => slot.studentName && slot.studentName.toLowerCase().includes(q)
      )
    );
  });

  return (
    <Container>
      <PageHeader
        title={`Project Sessions - ${project?.name || 'Career Guidance 2026 Batch A'}`}
        subtitle={`School: ${project?.instituteName || "St. Xavier's College, Mumbai"} • View counselor time slots and assigned student details.`}
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
          <EmptyState
            title="No counselor sessions found"
            description="Try adjusting your search criteria or filter."
          />
        ) : (
          <CounselorsGrid>
            {filteredSessions.map(session => (
              <CounselorSessionCard
                key={session.id}
                session={session}
                slots={counselorSlotsMap[session.id] || []}
                onAssignSlot={handleOpenAssignModal}
                onViewStudent={setSelectedStudentForView}
                onCopyMeetLink={handleCopyMeetLink}
              />
            ))}
          </CounselorsGrid>
        )}
      </Card>

      <AssignStudentModal
        isOpen={Boolean(selectedSlotForAssign)}
        onClose={() => setSelectedSlotForAssign(null)}
        session={selectedSlotForAssign?.session || null}
        slot={selectedSlotForAssign?.slot || null}
        onSave={handleSaveSlotAssignment}
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
