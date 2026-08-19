import styled from 'styled-components';

export const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WelcomeBanner = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.surface} 0%,
    ${({ theme }) => theme.colors.primaryLight} 100%
  );
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const WelcomeText = styled.div`
  h2 {
    font-size: ${({ theme }) => theme.fontSize.xxl};
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 6px 0;
  }

  p {
    font-size: ${({ theme }) => theme.fontSize.base};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 0 0 12px 0;
  }
`;

export const StatBadgeRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

export const PillStat = styled.span`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const StatMetricValue = styled.div<{ $variant?: 'success' | 'warning' | 'info' | 'default' }>`
  font-size: ${({ theme }) => theme.fontSize.display};
  font-weight: 700;
  color: ${({ theme, $variant }) => {
    if ($variant === 'success') return theme.colors.success;
    if ($variant === 'warning') return theme.colors.warning;
    if ($variant === 'info') return '#0088FE';
    return theme.colors.text;
  }};
  margin-top: 4px;
`;

export const MetaText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 4px;
`;

export const ActionCardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};

  p {
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 0;
  }
`;

export const SectionHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const RequestsTableContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
`;

export const RequestsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

export const TableHeaderRow = styled.tr`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.primaryMuted};
`;

export const TableTh = styled.th`
  padding: 14px 18px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: capitalize;
`;

export const TableTd = styled.td`
  padding: 16px 18px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TableTr = styled.tr`
  transition: background-color ${({ theme }) => theme.transition.fast};

  &:last-child ${TableTd} {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

export const ItemTitle = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const ActionButtonCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ApproveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ModalDetailCard = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  border: 1px solid ${({ theme }) => theme.colors.primaryMuted};
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ModalDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
`;

export const ModalDetailLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

export const ModalDetailValue = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

export const QuickActionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const QuickActionItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

export const QuickActionIcon = styled.div`
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

export const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const NotificationCardItem = styled.div<{ $type?: string }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
  background-color: ${({ theme, $type }) =>
    $type === 'approval'
      ? theme.colors.warningLight
      : $type === 'reminder'
        ? theme.colors.infoLight
        : theme.colors.surfaceHover};
  border-left: 4px solid
    ${({ theme, $type }) =>
      $type === 'approval'
        ? theme.colors.warning
        : $type === 'reminder'
          ? theme.colors.info
          : theme.colors.primary};
`;
