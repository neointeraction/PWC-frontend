import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ProjectTopHeaderCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const TopHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`;

export const BackIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const ProjectIdentity = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ProjectTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const ProjectInstituteTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const InstCodeBadge = styled.span`
  background-color: rgba(245, 158, 11, 0.12);
  color: #D97706;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

export const StatusPill = styled.span<{ $isClosed?: boolean }>`
  background-color: ${({ theme, $isClosed }) =>
    $isClosed ? theme.colors.surfaceHover : theme.colors.successLight};
  color: ${({ theme, $isClosed }) =>
    $isClosed ? theme.colors.textSecondary : theme.colors.success};
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`;

export const LocationAndPeriod = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  flex-wrap: wrap;
`;

export const PeriodText = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const TopHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const OverviewStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const OverviewCard = styled.div<{ $clickable?: boolean }>`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  transition: all 0.2s ease;

  ${({ $clickable, theme }) =>
    $clickable &&
    `
    &:hover {
      border-color: ${theme.colors.primary};
      box-shadow: 0 4px 12px rgba(93, 35, 132, 0.08);
      transform: translateY(-1px);
    }
  `}
`;

export const OverviewCardLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const OverviewCardValue = styled.span`
  font-size: 28px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FiltersLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FiltersRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SearchWrapper = styled.div`
  max-width: 320px;
  width: 100%;
`;

export const ToolbarIconButton = styled.button<{
  $active?: boolean;
  $variant?: 'flag' | 'excel' | 'default';
}>`
  width: 38px;
  height: 38px;
  border: 1px solid ${({ theme, $active }) =>
    $active ? '#EF4444' : theme.colors.border};
  border-radius: 4px;
  background-color: ${({ theme, $active }) =>
    $active ? '#FEF2F2' : theme.colors.surface};
  color: ${({ theme, $active, $variant }) =>
    $active
      ? '#DC2626'
      : $variant === 'flag'
      ? '#DC2626'
      : $variant === 'excel'
      ? '#16A34A'
      : theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ $variant, theme }) =>
      $variant === 'flag' ? '#DC2626' : $variant === 'excel' ? '#16A34A' : theme.colors.primary};
    background-color: ${({ $variant, theme }) =>
      $variant === 'flag' ? '#FEF2F2' : $variant === 'excel' ? '#F0FDF4' : theme.colors.primaryLight};
    color: ${({ $variant, theme }) =>
      $variant === 'flag' ? '#DC2626' : $variant === 'excel' ? '#16A34A' : theme.colors.primary};
  }
`;

export const StudentCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const StudentNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const StudentNameText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

export const StudentNameButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
  cursor: pointer;
  transition: color ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;

export const StageCellWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const SessionTimeText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CounselorSubtext = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ActionIconButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease, visibility 0.15s ease;

  tr:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

export const ActionIconButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;
