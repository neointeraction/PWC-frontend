import React from 'react';
import styled from 'styled-components';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Table, Column } from '@/components/Table';
import { Counselor, ProjectDeploymentDetail } from '@/types/counselor.types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const CounselorMetaCard = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  border: 1px solid ${({ theme }) => theme.colors.primaryMuted};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const CounselorMetaText = styled.div`
  display: flex;
  flex-direction: column;

  span:first-child {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.primary};
  }

  span:last-child {
    font-size: 15px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const SummaryStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  span:first-child {
    font-size: 11px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-transform: uppercase;
  }

  span:last-child {
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

interface CounselorDeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  counselor: Counselor | null;
}

export const CounselorDeploymentModal: React.FC<CounselorDeploymentModalProps> = ({
  isOpen,
  onClose,
  counselor,
}) => {
  if (!counselor) return null;

  const projects = counselor.projectsList ?? [];

  const totalAllotted = projects.reduce((sum, p) => sum + p.totalAllotted, 0);
  const session1Balance = projects.reduce((sum, p) => sum + p.session1Balance, 0);
  const session2Balance = projects.reduce((sum, p) => sum + p.session2Balance, 0);

  const columns: Column<ProjectDeploymentDetail>[] = [
    {
      key: 'schoolName',
      header: 'Schools',
      render: row => <strong>{row.schoolName}</strong>,
    },
    {
      key: 'totalAllotted',
      header: 'Total Allotted',
      render: row => <span>{row.totalAllotted}</span>,
    },
    {
      key: 'session1Balance',
      header: 'Session 1 Balance',
      render: row => <span>{row.session1Balance}</span>,
    },
    {
      key: 'session2Balance',
      header: 'Session 2 Balance',
      render: row => <span>{row.session2Balance}</span>,
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Deployment &amp; Workload Breakdown"
      size="xl"
    >
      <Container>
        <CounselorMetaCard>
          <CounselorMetaText>
            <span>Counsellor Details</span>
            <span>
              {counselor.name} ({counselor.counselorId})
            </span>
          </CounselorMetaText>

          <div style={{ display: 'flex', gap: '24px' }}>
            <SummaryStat>
              <span>Total Allotted</span>
              <span>{totalAllotted}</span>
            </SummaryStat>

            <SummaryStat>
              <span>S1 Balance</span>
              <span>{session1Balance}</span>
            </SummaryStat>

            <SummaryStat>
              <span>S2 Balance</span>
              <span>{session2Balance}</span>
            </SummaryStat>
          </div>
        </CounselorMetaCard>

        <Table<ProjectDeploymentDetail>
          columns={columns}
          data={projects}
          keyExtractor={row => row.schoolName}
        />

        <FooterContainer>
          <Button variant="secondary" onClick={onClose}>
            Close Breakdown
          </Button>
        </FooterContainer>
      </Container>
    </Modal>
  );
};
