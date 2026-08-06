import React, { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import {
  RiVideoChatLine,
  RiFileTextLine,
  RiSaveLine,
  RiTimeLine,
  RiCheckDoubleLine,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Table, Column } from '@/components/Table';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import { Badge } from '@/components/Badge';
import { useToast } from '@/hooks';
import { getMockUpcomingSessions, UpcomingSession } from '@/mocks/upcomingSessions.mock';
import {
  Container,
  StudentNameButton,
  TimeContainer,
  TimeText,
  StatusPill,
  ModalSection,
  ModalSectionTitle,
  InfoBadgeGrid,
  InfoBadgeItem,
  InfoLabel,
  InfoValue,
  TagGroup,
  InterestTag,
  TextareaInput,
} from './UpcomingSessionsPage.styles';

export const UpcomingSessionsPage: React.FC = () => {
  const toast = useToast();
  const [sessions, setSessions] = useState<UpcomingSession[]>(() => getMockUpcomingSessions());
  const [selectedSession, setSelectedSession] = useState<UpcomingSession | null>(null);

  // Live notes form state for open modal
  const [liveNotes, setLiveNotes] = useState('');
  const [actionItems, setActionItems] = useState('');

  // Helper to check if join button should be enabled (30 mins before start until session end)
  const checkCanJoin = (dateTimeStr: string): boolean => {
    const now = new Date().getTime();
    const sessionTime = new Date(dateTimeStr).getTime();
    const diffMinutes = (sessionTime - now) / (1000 * 60);
    return diffMinutes <= 30 && diffMinutes >= -360;
  };

  const handleOpenAssessmentModal = (session: UpcomingSession) => {
    setSelectedSession(session);
    setLiveNotes(session.assessmentSheet.counselorNotes);
    setActionItems(session.assessmentSheet.actionItems);
  };

  const handleSaveAssessmentSheet = () => {
    if (!selectedSession) return;

    setSessions(prev =>
      prev.map(s =>
        s.id === selectedSession.id
          ? {
              ...s,
              assessmentSheet: {
                ...s.assessmentSheet,
                counselorNotes: liveNotes,
                actionItems: actionItems,
              },
            }
          : s
      )
    );

    toast.success(
      'Assessment Sheet Saved',
      `Live session notes and action items for ${selectedSession.studentName} have been recorded.`
    );
    setSelectedSession(null);
  };

  const columns: Column<UpcomingSession>[] = useMemo(
    () => [
      {
        key: 'studentName',
        header: 'Student Name',
        accessor: 'studentName',
        cell: (row: UpcomingSession) => (
          <Tooltip content="Click to view assessment sheet">
            <StudentNameButton type="button" onClick={() => handleOpenAssessmentModal(row)}>
              <RiFileTextLine size={16} />
              {row.studentName}
            </StudentNameButton>
          </Tooltip>
        ),
      },
      {
        key: 'sessionTitle',
        header: 'Session Title',
        accessor: 'sessionTitle',
        cell: (row: UpcomingSession) => <span style={{ fontWeight: 500 }}>{row.sessionTitle}</span>,
      },
      {
        key: 'dateTime',
        header: 'Date & Time',
        accessor: 'dateTime',
        cell: (row: UpcomingSession) => {
          const canJoin = checkCanJoin(row.dateTime);
          return (
            <TimeContainer>
              <TimeText>{dayjs(row.dateTime).format('MMM DD, YYYY • h:mm A')}</TimeText>
              <StatusPill $canJoin={canJoin}>
                {canJoin ? (
                  <>
                    <RiCheckDoubleLine size={14} /> Ready to Join
                  </>
                ) : (
                  <>
                    <RiTimeLine size={14} /> Opens 30 mins prior
                  </>
                )}
              </StatusPill>
            </TimeContainer>
          );
        },
      },
      {
        key: 'actions',
        header: 'Action',
        cell: (row: UpcomingSession) => {
          const canJoin = checkCanJoin(row.dateTime);

          if (canJoin) {
            return (
              <Button
                size="sm"
                variant="primary"
                leftIcon={<RiVideoChatLine size={16} />}
                onClick={() => window.open(row.meetUrl, '_blank')}
              >
                JOIN MEET
              </Button>
            );
          }

          return (
            <Tooltip content="Join button enables 30 minutes before session start time">
              <Button size="sm" variant="secondary" disabled leftIcon={<RiVideoChatLine size={16} />}>
                JOIN
              </Button>
            </Tooltip>
          );
        },
      },
    ],
    []
  );

  return (
    <Container>
      <PageHeader
        title="Upcoming Counseling Sessions"
        subtitle="Manage assigned counseling time slots, join video meetings, and record live student assessment notes"
        breadcrumbs={[{ label: 'Upcoming Sessions' }]}
      />

      <Table data={sessions} columns={columns} keyExtractor={row => row.id} />

      {/* Assessment Sheet Modal */}
      {selectedSession && (
        <Modal
          isOpen={Boolean(selectedSession)}
          onClose={() => setSelectedSession(null)}
          title={`Assessment Sheet — ${selectedSession.studentName}`}
          size="xl"
          footer={
            <>
              <Button variant="secondary" onClick={() => setSelectedSession(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                leftIcon={<RiSaveLine size={16} />}
                onClick={handleSaveAssessmentSheet}
              >
                Save Assessment Notes
              </Button>
            </>
          }
        >
          {/* Student Profile Info */}
          <ModalSection>
            <ModalSectionTitle>Student Profile Overview</ModalSectionTitle>
            <InfoBadgeGrid>
              <InfoBadgeItem>
                <InfoLabel>Student Email</InfoLabel>
                <InfoValue>{selectedSession.studentEmail}</InfoValue>
              </InfoBadgeItem>
              <InfoBadgeItem>
                <InfoLabel>Grade & Stream</InfoLabel>
                <InfoValue>{selectedSession.studentGrade}</InfoValue>
              </InfoBadgeItem>
              <InfoBadgeItem>
                <InfoLabel>Institution</InfoLabel>
                <InfoValue>{selectedSession.institutionName}</InfoValue>
              </InfoBadgeItem>
              <InfoBadgeItem>
                <InfoLabel>Session Status</InfoLabel>
                <InfoValue>
                  <Badge variant="info">{selectedSession.status}</Badge>
                </InfoValue>
              </InfoBadgeItem>
            </InfoBadgeGrid>
          </ModalSection>

          {/* Assessment & Aptitude Results */}
          <ModalSection>
            <ModalSectionTitle>Aptitude & Interest Assessment</ModalSectionTitle>
            <InfoBadgeGrid>
              <InfoBadgeItem>
                <InfoLabel>Aptitude Test Score</InfoLabel>
                <InfoValue>{selectedSession.assessmentSheet.aptitudeScore}</InfoValue>
              </InfoBadgeItem>
              <InfoBadgeItem>
                <InfoLabel>Personality Profile</InfoLabel>
                <InfoValue>{selectedSession.assessmentSheet.personalityType}</InfoValue>
              </InfoBadgeItem>
            </InfoBadgeGrid>
            <div style={{ marginTop: '12px' }}>
              <InfoLabel>Top Career Interests Identified:</InfoLabel>
              <TagGroup>
                {selectedSession.assessmentSheet.topInterests.map((interest, idx) => (
                  <InterestTag key={idx}>{interest}</InterestTag>
                ))}
              </TagGroup>
            </div>
          </ModalSection>

          {/* Academic Performance */}
          <ModalSection>
            <ModalSectionTitle>Academic Performance</ModalSectionTitle>
            <InfoBadgeGrid style={{ gridTemplateColumns: '1fr' }}>
              <InfoBadgeItem>
                <InfoLabel>Recent Marks / Grades</InfoLabel>
                <InfoValue>{selectedSession.assessmentSheet.academicPerformance}</InfoValue>
              </InfoBadgeItem>
            </InfoBadgeGrid>
          </ModalSection>

          {/* Counselor Live Session Notes */}
          <ModalSection>
            <ModalSectionTitle>Counselor Live Discussion & Assessment Notes</ModalSectionTitle>
            <TextareaInput
              value={liveNotes}
              onChange={e => setLiveNotes(e.target.value)}
              placeholder="Record live discussion notes, career advice, and assessment observations..."
            />
          </ModalSection>

          {/* Action Items for Student */}
          <ModalSection>
            <ModalSectionTitle>Action Items & Recommendations for Student</ModalSectionTitle>
            <TextareaInput
              value={actionItems}
              onChange={e => setActionItems(e.target.value)}
              placeholder="Enter recommended next steps, courses, or entrance exam prep for the student..."
            />
          </ModalSection>
        </Modal>
      )}
    </Container>
  );
};

export default UpcomingSessionsPage;
