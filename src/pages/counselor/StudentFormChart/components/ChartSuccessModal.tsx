import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiCheckDoubleLine, RiFileTextLine, RiArrowRightLine } from 'react-icons/ri';
import styled from 'styled-components';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { ROUTES } from '@/constants';

interface ChartSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  sessionId: string;
}

const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
`;

const IconCircle = styled(motion.div)`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: #ECFDF5;
  border: 2px solid #10B981;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #10B981;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SuccessTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`;

const SuccessDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 420px;
  margin: 0 0 ${({ theme }) => theme.spacing.xl} 0;
  line-height: 1.5;
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

export const ChartSuccessModal: React.FC<ChartSuccessModalProps> = ({
  isOpen,
  onClose,
  studentName,
  sessionId,
}) => {
  const navigate = useNavigate();

  const handleReturnToSessions = () => {
    onClose();
    navigate(ROUTES.UPCOMING_SESSIONS);
  };

  const handleGenerateReport = () => {
    onClose();
    navigate(ROUTES.GENERATE_REPORT.replace(':sessionId', sessionId));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalContentWrapper>
        <IconCircle
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: [0, 1.25, 1], rotate: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <RiCheckDoubleLine size={40} />
        </IconCircle>

        <SuccessTitle>Counsellor Form Chart Complete</SuccessTitle>
        <SuccessDescription>
          All sections A through F for <strong>{studentName}</strong> have been reviewed and transcribed. The chart has been recorded successfully in the system.
        </SuccessDescription>

        <ActionGroup>
          <Button
            variant="secondary"
            leftIcon={<RiFileTextLine size={16} />}
            onClick={handleGenerateReport}
          >
            Generate Report
          </Button>
          <Button
            variant="primary"
            rightIcon={<RiArrowRightLine size={16} />}
            onClick={handleReturnToSessions}
          >
            Return to Upcoming Sessions
          </Button>
        </ActionGroup>
      </ModalContentWrapper>
    </Modal>
  );
};
