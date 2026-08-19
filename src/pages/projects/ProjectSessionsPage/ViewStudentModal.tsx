import React from 'react';
import styled from 'styled-components';
import { Modal } from '@/components/Modal';
import { Badge } from '@/components/Badge';
import { ProjectStudent } from '@/types/project.types';
import {
  RiUserLine,
  RiBuilding4Line,
  RiGraduationCapLine,
  RiMailLine,
  RiPhoneLine,
  RiCalendarEventLine,
  RiTimeLine,
} from 'react-icons/ri';

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const DetailCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceHover};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
`;

const IconBox = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const DetailLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DetailValue = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
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
    <Modal isOpen={isOpen} onClose={onClose} title="Student Details" size="md">
      <ModalContainer>
        <DetailGrid>
          <DetailCard style={{ gridColumn: '1 / -1' }}>
            <IconBox>
              <RiUserLine size={20} />
            </IconBox>
            <DetailContent>
              <DetailLabel>Student Name</DetailLabel>
              <DetailValue style={{ fontSize: '16px' }}>{student.name}</DetailValue>
            </DetailContent>
          </DetailCard>

          <DetailCard>
            <IconBox>
              <RiGraduationCapLine size={20} />
            </IconBox>
            <DetailContent>
              <DetailLabel>Grade</DetailLabel>
              <DetailValue>
                <Badge variant="default">{student.grade || '11th Grade'}</Badge>
              </DetailValue>
            </DetailContent>
          </DetailCard>

          <DetailCard>
            <IconBox>
              <RiBuilding4Line size={20} />
            </IconBox>
            <DetailContent>
              <DetailLabel>Institute</DetailLabel>
              <DetailValue>{instituteName}</DetailValue>
            </DetailContent>
          </DetailCard>

          <DetailCard>
            <IconBox>
              <RiMailLine size={20} />
            </IconBox>
            <DetailContent>
              <DetailLabel>Email</DetailLabel>
              <DetailValue>{student.email}</DetailValue>
            </DetailContent>
          </DetailCard>

          <DetailCard>
            <IconBox>
              <RiPhoneLine size={20} />
            </IconBox>
            <DetailContent>
              <DetailLabel>Phone</DetailLabel>
              <DetailValue>{student.mobile}</DetailValue>
            </DetailContent>
          </DetailCard>

          <DetailCard>
            <IconBox>
              <RiCalendarEventLine size={20} />
            </IconBox>
            <DetailContent>
              <DetailLabel>Session Date</DetailLabel>
              <DetailValue>{student.sessionDate || '18-02-2026'}</DetailValue>
            </DetailContent>
          </DetailCard>

          <DetailCard>
            <IconBox>
              <RiTimeLine size={20} />
            </IconBox>
            <DetailContent>
              <DetailLabel>Session & Slot</DetailLabel>
              <DetailValue>
                {student.sessionType || 'S1'} ({student.timeSlot || '09:30 - 10:30'})
              </DetailValue>
            </DetailContent>
          </DetailCard>
        </DetailGrid>
      </ModalContainer>
    </Modal>
  );
};
