import React from 'react';
import styled from 'styled-components';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { ProjectStudent } from '@/types/project.types';

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

const StatusBadge = styled.span<{ $variant?: 'active' | 'pending' | 'completed' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  padding: 4px 10px;
  background-color: #DCFCE7;
  color: #16A34A;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #16A34A;
  }
`;

interface ViewStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: ProjectStudent | null;
  instituteName?: string;
}

export const ViewStudentModal: React.FC<ViewStudentModalProps> = ({
  isOpen,
  onClose,
  student,
  instituteName = 'Greenwood High International School',
}) => {
  if (!student) return null;

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
          <FieldLabel>Full Name</FieldLabel>
          <FieldValue>{student.name}</FieldValue>
        </FieldItem>

        <FieldItem>
          <FieldLabel>Grade / Class</FieldLabel>
          <FieldValue>
            <PurplePill>{student.grade || 'Grade 11'}</PurplePill>
          </FieldValue>
        </FieldItem>

        <FieldItem>
          <FieldLabel>Session Stage</FieldLabel>
          <FieldValue>
            <PurplePill>{student.sessionType || 'Session 1 (S1)'}</PurplePill>
          </FieldValue>
        </FieldItem>

        <FieldItem>
          <FieldLabel>Email Address</FieldLabel>
          <FieldValue>{student.email || '—'}</FieldValue>
        </FieldItem>

        <FieldItem>
          <FieldLabel>Phone Number</FieldLabel>
          <FieldValue>{student.mobile || '—'}</FieldValue>
        </FieldItem>

        <FieldItem>
          <FieldLabel>Institute</FieldLabel>
          <FieldValue>{instituteName}</FieldValue>
        </FieldItem>

        <FieldItem>
          <FieldLabel>Status</FieldLabel>
          <FieldValue>
            <StatusBadge>ACTIVE</StatusBadge>
          </FieldValue>
        </FieldItem>

        <FieldItem>
          <FieldLabel>Session Slot</FieldLabel>
          <FieldValue>
            {student.sessionDate || '18-02-2026'} &bull; {student.timeSlot || '09:30 - 10:30'}
          </FieldValue>
        </FieldItem>
      </DetailGrid>
    </Modal>
  );
};

export default ViewStudentModal;
