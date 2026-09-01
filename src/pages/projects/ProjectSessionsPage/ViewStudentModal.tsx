import React from 'react';
import styled from 'styled-components';
import { RiWhatsappLine } from 'react-icons/ri';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components';
import { ProjectStudent, ProjectStudentDetail } from '@/types/project.types';
import { formatDate } from '@/utils';

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 22px;
  column-gap: 32px;
  padding: 8px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    row-gap: 18px;
  }
`;

const FieldItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FieldLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted || '#94A3B8'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FieldValue = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
`;

const PurplePill = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 4px 10px;
  background-color: ${({ theme }) => theme.colors.primaryLight || '#F3E8FF'};
  color: ${({ theme }) => theme.colors.primary || '#5D2384'};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`;

const STATUS_BADGE_COLORS: Record<'active' | 'pending' | 'completed', { bg: string; fg: string }> = {
  active: { bg: '#DCFCE7', fg: '#16A34A' },
  pending: { bg: '#FEE2E2', fg: '#DC2626' },
  completed: { bg: '#DBEAFE', fg: '#1D4ED8' },
};

const StatusBadge = styled.span<{ $variant?: 'active' | 'pending' | 'completed' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  padding: 4px 10px;
  background-color: ${({ $variant = 'active' }) => STATUS_BADGE_COLORS[$variant].bg};
  color: ${({ $variant = 'active' }) => STATUS_BADGE_COLORS[$variant].fg};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${({ $variant = 'active' }) => STATUS_BADGE_COLORS[$variant].fg};
  }
`;

const WhatsAppPhoneLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    color: #16A34A;
    transition: transform 0.2s ease;
  }

  &:hover {
    color: #16A34A;
    text-decoration: underline;

    svg {
      transform: scale(1.15);
    }
  }
`;

interface ViewStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: ProjectStudent | ProjectStudentDetail | null;
  instituteName?: string;
  counselorPhone?: string;
}

export const ViewStudentModal: React.FC<ViewStudentModalProps> = ({
  isOpen,
  onClose,
  student,
  instituteName,
  counselorPhone = '',
}) => {
  if (!student) return null;

  const isMissed = 'isMissed' in student && student.isMissed;
  const stageDisplay =
    ('stage' in student && student.stage) ||
    ('sessionType' in student && student.sessionType) ||
    '—';

  const sessionDateRaw =
    'session1' in student && student.session1?.date
      ? student.session1.date
      : ('sessionDate' in student && student.sessionDate) || '';
  const sessionTimeRaw =
    'session1' in student && student.session1?.date
      ? student.session1.timeSlot
      : ('timeSlot' in student && student.timeSlot) || '';
  const sessionSlotDisplay = sessionDateRaw
    ? `${formatDate(sessionDateRaw)}${sessionTimeRaw ? ` • ${sessionTimeRaw}` : ''}`
    : '—';

  const studentIdDisplay =
    ('studentId' in student && student.studentId) || ('id' in student && student.id) || '—';

  const studentPhone = student.mobile || '';
  const cleanStudentPhone = studentPhone.replace(/\D/g, '');
  const cleanCounselorPhone = counselorPhone.replace(/\D/g, '');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Student Details"
      subtitle={`Detailed metadata for ${student.name}`}
      size="md"
      footer={
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      }
    >
      <DetailGrid>
        <FieldItem>
          <FieldLabel>Student ID</FieldLabel>
          <FieldValue>
            <strong>{studentIdDisplay}</strong>
          </FieldValue>
        </FieldItem>

        <FieldItem>
          <FieldLabel>Full Name</FieldLabel>
          <FieldValue>{student.name}</FieldValue>
        </FieldItem>

        <FieldItem>
          <FieldLabel>Grade / Class</FieldLabel>
          <FieldValue>
            <PurplePill>{student.grade || '—'}</PurplePill>
          </FieldValue>
        </FieldItem>

        <FieldItem>
          <FieldLabel>Session Stage</FieldLabel>
          <FieldValue>
            <PurplePill>{stageDisplay}</PurplePill>
          </FieldValue>
        </FieldItem>

        <FieldItem>
          <FieldLabel>Email Address</FieldLabel>
          <FieldValue>{student.email || '—'}</FieldValue>
        </FieldItem>

        <FieldItem>
          <FieldLabel>Student Phone Number</FieldLabel>
          <FieldValue>
            <Tooltip content="Chat with student on WhatsApp">
              <WhatsAppPhoneLink
                href={`https://wa.me/${cleanStudentPhone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiWhatsappLine size={16} />
                <span>{studentPhone}</span>
              </WhatsAppPhoneLink>
            </Tooltip>
          </FieldValue>
        </FieldItem>

        <FieldItem>
          <FieldLabel>Counselor Phone Number</FieldLabel>
          <FieldValue>
            <Tooltip content="Chat with counselor on WhatsApp">
              <WhatsAppPhoneLink
                href={`https://wa.me/${cleanCounselorPhone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiWhatsappLine size={16} />
                <span>{counselorPhone}</span>
              </WhatsAppPhoneLink>
            </Tooltip>
          </FieldValue>
        </FieldItem>

        <FieldItem>
          <FieldLabel>Institute</FieldLabel>
          <FieldValue>{instituteName || '—'}</FieldValue>
        </FieldItem>

        <FieldItem>
          <FieldLabel>Status</FieldLabel>
          <FieldValue>
            <StatusBadge $variant={isMissed ? 'pending' : 'active'}>
              {isMissed ? 'Missed' : 'Booked'}
            </StatusBadge>
          </FieldValue>
        </FieldItem>

        <FieldItem>
          <FieldLabel>Session Slot</FieldLabel>
          <FieldValue>{sessionSlotDisplay}</FieldValue>
        </FieldItem>
      </DetailGrid>
    </Modal>
  );
};

export default ViewStudentModal;
