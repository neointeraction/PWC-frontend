import React, { useState, useEffect } from 'react';
import {
  RiWhatsappLine,
  RiMailLine,
  RiFileCopyLine,
  RiCheckLine,
  RiCloseCircleLine,
  RiMessage3Line,
} from 'react-icons/ri';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components';
import { ProjectStudentDetail, FollowUpRecord } from '@/types/project.types';
import { useToast } from '@/hooks';
import { formatDate } from '@/utils';
import {
  ModalBodyContainer,
  ContactCardsGrid,
  ContactCard,
  ContactCardHeader,
  ContactRoleTag,
  ContactName,
  ContactDetailRow,
  ContactValueText,
  ContactActionButtons,
  WhatsAppButton,
  EmailButton,
  CopyIconButton,
  MessageSection,
  MessageHeaderRow,
  MessageSectionTitle,
  MessageTextarea,
  MessageQuickSendRow,
  ModalFooterRow,
  FooterRightButtons,
} from './StudentFollowUpModal.styles';

export const STAGE_PREDEFINED_MESSAGES: Record<string, { subject: string; message: string }> = {
  'Login Activated': {
    subject: 'Action Required: Complete your PWC Career Counseling Profile Setup',
    message:
      'Hello {STUDENT_NAME}, your login for the Career Counselling platform has been activated. Please log in and complete your initial student profile to proceed.',
  },
  'Profile Completed': {
    subject: 'Next Step: Complete Pre-Counselling Questionnaire',
    message:
      'Hello {STUDENT_NAME}, great job on completing your profile! Please fill out the Pre-Counselling questionnaire to help your counsellor understand your career interests.',
  },
  'Pre-Counselling — Student': {
    subject: 'Parent Input Required: Pre-Counselling Form',
    message:
      'Dear {PARENT_NAME}, kindly provide your valuable inputs in the Parent Pre-Counselling questionnaire to help guide {STUDENT_NAME} on their career pathway.',
  },
  'Pre-Counselling — Parent': {
    subject: 'Next Step: Start Career Assessment Test',
    message:
      'Hello {STUDENT_NAME}, both student and parent pre-counselling inputs are received. You are now ready to take your Career Assessment test.',
  },
  'Assessment Completed': {
    subject: 'Action Required: Book your Counselling Session S1',
    message:
      'Hello {STUDENT_NAME}, congratulations on completing your Career Assessment! Please log in and select a convenient time slot with your counsellor for Session 1.',
  },
  'Session Booked': {
    subject: 'Reminder: Upcoming Counselling Session',
    message:
      'Hello {STUDENT_NAME}, this is a gentle reminder for your scheduled career counselling session. Please ensure you join on time.',
  },
  'Session 1 Completed': {
    subject: 'Next Step: Book Session 2 / Action Plan Review',
    message:
      'Hello {STUDENT_NAME}, following your Session 1 discussion, please book Session 2 with your counsellor to finalize your career plan and stream options.',
  },
  'Session 2 Completed': {
    subject: 'Feedback Request: How was your Counselling experience?',
    message:
      'Hello {STUDENT_NAME}, thank you for attending your counselling sessions. Please submit your brief feedback questionnaire to unlock your final report.',
  },
  'Feedback — Student': {
    subject: 'Parent Feedback Request: Career Guidance Program',
    message:
      'Dear {PARENT_NAME}, we request your feedback on {STUDENT_NAME}\'s career counselling journey. Your review helps us refine our guidance services.',
  },
  'Feedback — Parent': {
    subject: 'Your Comprehensive Career Report is Ready!',
    message:
      'Hello {STUDENT_NAME}, all steps are complete! Your official Career Compass Report is now available for download in your Student Portal.',
  },
  'Report Downloaded': {
    subject: 'Follow-up on your Career Roadmap',
    message:
      'Hello {STUDENT_NAME}, following up to check if you have reviewed your career roadmap report and have any questions for your counsellor.',
  },
};

interface StudentFollowUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: ProjectStudentDetail | null;
  onSave: (updated: ProjectStudentDetail) => void;
}

export const StudentFollowUpModal: React.FC<StudentFollowUpModalProps> = ({
  isOpen,
  onClose,
  student,
  onSave,
}) => {
  const toast = useToast();

  const currentStage = student?.stage || 'Login Activated';
  const defaultTemplate = STAGE_PREDEFINED_MESSAGES[currentStage] || {
    subject: `Follow-up on Career Counseling: ${currentStage}`,
    message: `Hello ${student?.name || 'Student'}, this is a follow-up reminder from PWC Career Counselling regarding your pending stage: ${currentStage}. Please log in to complete your next step.`,
  };

  const [customMessage, setCustomMessage] = useState<string>('');
  const [customSubject, setCustomSubject] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (student) {
      const populatedMsg = defaultTemplate.message
        .replace('{STUDENT_NAME}', student.name)
        .replace('{PARENT_NAME}', student.parentName?.split(' ')[0] || 'Parent');
      setCustomMessage(populatedMsg);
      setCustomSubject(defaultTemplate.subject);
    }
  }, [student, currentStage]);

  if (!student) return null;

  const studentPhone = student.mobile || '';
  const cleanStudentPhone = (student.whatsappNumber || studentPhone).replace(/\D/g, '');
  const parentPhone = student.parentMobile || '';
  const cleanParentPhone = parentPhone.replace(/\D/g, '');
  const studentEmail = student.email || '';
  const parentEmail = student.parentEmail || '';

  const studentWhatsappUrl = `https://wa.me/${cleanStudentPhone}?text=${encodeURIComponent(customMessage)}`;
  const parentWhatsappUrl = `https://wa.me/${cleanParentPhone}?text=${encodeURIComponent(customMessage)}`;
  const studentMailtoUrl = `mailto:${studentEmail}?subject=${encodeURIComponent(customSubject)}&body=${encodeURIComponent(customMessage)}`;
  const parentMailtoUrl = `mailto:${parentEmail}?subject=${encodeURIComponent(customSubject)}&body=${encodeURIComponent(customMessage)}`;

  const handleCopy = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    toast.success('Copied to Clipboard', text);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleMarkCompleted = () => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newRecord: FollowUpRecord = {
      id: `fu-${Date.now()}`,
      stage: currentStage,
      date: todayStr,
      timestamp: `${formatDate(todayStr)}, ${timeStr}`,
      type: 'whatsapp',
      recipient: 'both',
      notes: customMessage,
    };

    const updatedHistory = [newRecord, ...(student.followUpHistory || [])];

    const updatedStudent: ProjectStudentDetail = {
      ...student,
      isFlagged: false, // Unflag immediately
      daysInStage: 0,
      lastFollowUpDate: todayStr,
      followUpHistory: updatedHistory,
    };

    onSave(updatedStudent);
    toast.success('Follow-up Completed', `Follow-up for ${student.name} logged and unflagged.`);
    onClose();
  };

  const handleMarkDiscontinued = () => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const updatedStudent: ProjectStudentDetail = {
      ...student,
      stage: 'Discontinued',
      isFlagged: false, // Unflag
      stageCompletedDate: todayStr,
      daysInStage: 0,
    };

    onSave(updatedStudent);
    toast.warning('Student Discontinued', `${student.name} marked as Discontinued and removed from active follow-up.`);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Student Follow-up"
      subtitle={`Direct contact & WhatsApp reminder for ${student.name}`}
      size="lg"
      footer={
        <ModalFooterRow>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleMarkDiscontinued}
            leftIcon={<RiCloseCircleLine size={16} />}
            style={{ color: '#DC2626', borderColor: '#FCA5A5' }}
          >
            Discontinue Student
          </Button>

          <FooterRightButtons>
            <Button type="button" variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleMarkCompleted}
              leftIcon={<RiCheckLine size={16} />}
            >
              Completed
            </Button>
          </FooterRightButtons>
        </ModalFooterRow>
      }
    >
      <ModalBodyContainer>
        {/* Contact Cards: Student and Parent */}
        <ContactCardsGrid>
          {/* Student Card */}
          <ContactCard>
            <ContactCardHeader>
              <ContactRoleTag $role="student">Student Contact</ContactRoleTag>
              <ContactName>{student.name}</ContactName>
            </ContactCardHeader>

            <ContactDetailRow>
              <span>Mobile</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <ContactValueText>{studentPhone}</ContactValueText>
                <Tooltip content="Copy phone number">
                  <CopyIconButton
                    type="button"
                    onClick={() => handleCopy(studentPhone, 'studentPhone')}
                    aria-label="Copy phone"
                  >
                    {copiedField === 'studentPhone' ? <RiCheckLine size={14} color="#16A34A" /> : <RiFileCopyLine size={14} />}
                  </CopyIconButton>
                </Tooltip>
              </div>
            </ContactDetailRow>

            <ContactDetailRow>
              <span>Email</span>
              <ContactValueText>{studentEmail}</ContactValueText>
            </ContactDetailRow>

            <ContactActionButtons>
              {cleanStudentPhone && (
                <WhatsAppButton
                  href={studentWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RiWhatsappLine size={16} /> WhatsApp Student
                </WhatsAppButton>
              )}
              {studentEmail && (
                <EmailButton href={studentMailtoUrl}>
                  <RiMailLine size={15} /> Email
                </EmailButton>
              )}
            </ContactActionButtons>
          </ContactCard>

          {/* Parent Card */}
          <ContactCard>
            <ContactCardHeader>
              <ContactRoleTag $role="parent">Parent Contact</ContactRoleTag>
              <ContactName>{student.parentName || ''}</ContactName>
            </ContactCardHeader>

            <ContactDetailRow>
              <span>Mobile</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <ContactValueText>{parentPhone}</ContactValueText>
                <Tooltip content="Copy parent phone">
                  <CopyIconButton
                    type="button"
                    onClick={() => handleCopy(parentPhone, 'parentPhone')}
                    aria-label="Copy parent phone"
                  >
                    {copiedField === 'parentPhone' ? <RiCheckLine size={14} color="#16A34A" /> : <RiFileCopyLine size={14} />}
                  </CopyIconButton>
                </Tooltip>
              </div>
            </ContactDetailRow>

            <ContactDetailRow>
              <span>Email</span>
              <ContactValueText>{parentEmail}</ContactValueText>
            </ContactDetailRow>

            <ContactActionButtons>
              {cleanParentPhone && (
                <WhatsAppButton
                  href={parentWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RiWhatsappLine size={16} /> WhatsApp Parent
                </WhatsAppButton>
              )}
              {parentEmail && (
                <EmailButton href={parentMailtoUrl}>
                  <RiMailLine size={15} /> Email
                </EmailButton>
              )}
            </ContactActionButtons>
          </ContactCard>
        </ContactCardsGrid>

        {/* Pre-defined Stage Message Template */}
        <MessageSection>
          <MessageHeaderRow>
            <MessageSectionTitle>
              <RiMessage3Line size={16} style={{ color: '#5D2384' }} />
              Pre-defined Stage Reminder Message
            </MessageSectionTitle>
          </MessageHeaderRow>

          <MessageTextarea
            value={customMessage}
            onChange={e => setCustomMessage(e.target.value)}
            placeholder="Type or tweak message to send..."
          />

          <MessageQuickSendRow>
            {cleanStudentPhone && (
              <WhatsAppButton
                href={studentWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiWhatsappLine size={15} /> Send to Student WhatsApp
              </WhatsAppButton>
            )}
            {cleanParentPhone && (
              <WhatsAppButton
                href={parentWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiWhatsappLine size={15} /> Send to Parent WhatsApp
              </WhatsAppButton>
            )}
          </MessageQuickSendRow>
        </MessageSection>

        {/* Follow-up Log / History
        <HistorySection>
          <HistoryHeader>
            <span>Follow-up Log History</span>
            <span style={{ fontSize: '11px', fontWeight: 500, color: '#9CA3AF' }}>
              <RiTimeLine size={13} style={{ verticalAlign: '-2px', marginRight: 3 }} />
              Auto-logged upon completion
            </span>
          </HistoryHeader>

          {student.followUpHistory && student.followUpHistory.length > 0 ? (
            <HistoryList>
              {student.followUpHistory.map((item, idx) => (
                <HistoryItem key={item.id || idx}>
                  <span>
                    <strong>Stage:</strong> {item.stage}
                  </span>
                  <HistoryDateBadge>{item.timestamp || formatDate(item.date)}</HistoryDateBadge>
                </HistoryItem>
              ))}
            </HistoryList>
          ) : (
            <EmptyHistoryText>No previous follow-ups recorded yet for this student.</EmptyHistoryText>
          )}
        </HistorySection>
        */}
      </ModalBodyContainer>
    </Modal>
  );
};

export default StudentFollowUpModal;
