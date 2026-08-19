import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RiMessage2Line, RiTimeLine } from 'react-icons/ri';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { ProjectStudentDetail, StudentComment } from '@/types/project.types';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SectionBox = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceHover};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SectionTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const CommentInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 12px 14px;
`;

const CommentInputRow = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr auto;
  gap: 10px;
  align-items: flex-end;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  min-height: 40px;
  height: 40px;
  padding: 8px 12px;
  font-family: inherit;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  resize: vertical;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
`;

const CommentCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const CommentCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const CommentHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SessionBadge = styled.span`
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const CommentDate = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ByTag = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
`;

const CommentBody = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.45;
  display: flex;
  align-items: flex-start;
  gap: 6px;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 2px;
    flex-shrink: 0;
  }
`;

const EmptyCommentsText = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-style: italic;
  margin: 0;
  padding: 8px 0;
`;

const counselorsList = [
  'Anil Iyer',
  'Mahesh Pillai',
  'Hema Kurup',
  'Girish Bhat',
  'Manoj Chacko',
];

const sessionOptions = [
  { value: 'Pre-counselling', label: 'Pre-counselling' },
  { value: 'Session 1', label: 'Session 1' },
  { value: 'Session 2', label: 'Session 2' },
  { value: 'Feedback', label: 'Feedback' },
  { value: 'General', label: 'General' },
];

const INITIAL_COMMENTS: StudentComment[] = [
  {
    id: 'c-1',
    session: 'Pre-counselling',
    comment: 'precounselling call made, parent confirmed session availability',
    createdAt: '16 Aug 2026, 11:30 AM',
    by: 'Admin',
  },
];

interface EditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: ProjectStudentDetail | null;
  onSave: (updated: ProjectStudentDetail) => void;
  isSaving?: boolean;
}

export const EditStudentModal: React.FC<EditStudentModalProps> = ({
  isOpen,
  onClose,
  student,
  onSave,
  isSaving,
}) => {
  const [formData, setFormData] = useState<ProjectStudentDetail | null>(null);
  const [selectedSession, setSelectedSession] = useState('Pre-counselling');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentsList, setCommentsList] = useState<StudentComment[]>(INITIAL_COMMENTS);

  useEffect(() => {
    if (student) {
      const copy = JSON.parse(JSON.stringify(student));
      if (!copy.parentMobile) {
        copy.parentMobile = '+91 9820011223';
      }
      setFormData(copy);
      if (copy.comments && copy.comments.length > 0) {
        setCommentsList(copy.comments);
      } else {
        setCommentsList(INITIAL_COMMENTS);
      }
    }
  }, [student]);

  if (!formData) return null;

  const handleAddComment = () => {
    if (!newCommentText.trim()) return;

    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })}, ${now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    const newComment: StudentComment = {
      id: `comment-${Date.now()}`,
      session: selectedSession,
      comment: newCommentText.trim(),
      createdAt: formattedDate,
      by: 'Admin',
    };

    setCommentsList(prev => [newComment, ...prev]);
    setNewCommentText('');
  };

  const handleSave = () => {
    const updatedStudent: ProjectStudentDetail = {
      ...formData,
      comments: commentsList,
    };
    onSave(updatedStudent);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={student?.id ? `Edit Student - ${formData.name}` : 'Add New Student'}
      subtitle="Modify student personal details, grade, parent contact, and session notes."
      size="lg"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', width: '100%' }}>
          <Button variant="secondary" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} isLoading={isSaving}>
            Save Changes
          </Button>
        </div>
      }
    >
      <FormContainer>
        {/* Student Information Section */}
        <SectionBox>
          <SectionTitle>Student Information</SectionTitle>
          <FormGrid>
            <Input
              label="Student Full Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              label="Mobile Number"
              value={formData.mobile}
              onChange={e => setFormData({ ...formData, mobile: e.target.value })}
            />
            <Input
              label="Parent Phone Number"
              placeholder="+91 9820011223"
              value={formData.parentMobile || ''}
              onChange={e => setFormData({ ...formData, parentMobile: e.target.value })}
            />
            <Select
              label="Grade / Class"
              value={formData.grade}
              onChange={e => setFormData({ ...formData, grade: e.target.value })}
              options={[
                { value: '10th', label: '10th Grade' },
                { value: '11th', label: '11th Grade' },
                { value: '12th', label: '12th Grade' },
              ]}
            />
            <Select
              label="Assigned Counselor"
              value={formData.session1.counselorName || formData.session2.counselorName}
              onChange={e => {
                const val = e.target.value;
                setFormData({
                  ...formData,
                  session1: { ...formData.session1, counselorName: val },
                  session2: { ...formData.session2, counselorName: val },
                });
              }}
              options={counselorsList.map(c => ({ value: c, label: c }))}
            />
          </FormGrid>
        </SectionBox>

        {/* Session Notes & Comments Section */}
        <SectionBox>
          <SectionTitle>Session Notes &amp; Comments</SectionTitle>

          {/* Add New Comment Controls */}
          <CommentInputBox>
            <CommentInputRow>
              <Select
                label="Session"
                value={selectedSession}
                onChange={e => setSelectedSession(e.target.value)}
                options={sessionOptions}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                  Comment / Note
                </span>
                <CommentTextarea
                  placeholder="e.g. precounselling call made, parent confirmed..."
                  value={newCommentText}
                  onChange={e => setNewCommentText(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAddComment();
                    }
                  }}
                />
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleAddComment}
                disabled={!newCommentText.trim()}
                style={{ height: '38px', alignSelf: 'flex-end' }}
              >
                Add Note
              </Button>
            </CommentInputRow>
          </CommentInputBox>

          {/* Comments List */}
          <CommentsList>
            {commentsList.length === 0 ? (
              <EmptyCommentsText>No comments logged yet.</EmptyCommentsText>
            ) : (
              commentsList.map(item => (
                <CommentCard key={item.id}>
                  <CommentCardHeader>
                    <CommentHeaderLeft>
                      <SessionBadge>{item.session}</SessionBadge>
                      <CommentDate>
                        <RiTimeLine size={12} />
                        {item.createdAt}
                      </CommentDate>
                    </CommentHeaderLeft>
                    {item.by && <ByTag>BY: {item.by}</ByTag>}
                  </CommentCardHeader>
                  <CommentBody>
                    <RiMessage2Line size={14} />
                    <span>{item.comment}</span>
                  </CommentBody>
                </CommentCard>
              ))
            )}
          </CommentsList>
        </SectionBox>
      </FormContainer>
    </Modal>
  );
};
