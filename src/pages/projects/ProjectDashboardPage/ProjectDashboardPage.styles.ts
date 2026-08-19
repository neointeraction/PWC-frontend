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

export const StatusPill = styled.span`
  background-color: ${({ theme }) => theme.colors.successLight};
  color: ${({ theme }) => theme.colors.success};
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

export const OverviewCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
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

export const SectionHeading = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 8px 0 0 0;
`;

export const StageProgressLayout = styled.div`
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 20px;
  align-items: flex-start;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

export const FollowUpCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  width: 100%;
  margin-top: 4px;
  margin-bottom: 4px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const FollowUpStatCard = styled.button<{ $isActive?: boolean }>`
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primaryLight : theme.colors.surface};
  border: 1px solid
    ${({ theme, $isActive }) => ($isActive ? theme.colors.primary : theme.colors.border)};
  border-radius: 4px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const FollowUpCardLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const FollowUpCardValue = styled.span<{ $color?: string }>`
  font-size: 24px;
  font-weight: 800;
  color: ${({ $color, theme }) => $color || theme.colors.text};
`;

export const StagesCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const StagesTableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const StageList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StageRowItem = styled.button<{ $isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: none;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primaryLight : 'transparent'};
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  font-weight: ${({ $isSelected }) => ($isSelected ? 700 : 500)};
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme, $isSelected }) =>
      $isSelected ? theme.colors.primaryLight : theme.colors.surfaceHover};
  }
`;

export const StageNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PendingBadge = styled.span<{ $isFlagged?: boolean }>`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme, $isFlagged }) => ($isFlagged ? theme.colors.danger : theme.colors.text)};
`;

export const AgeingFootnote = styled.div`
  padding: 14px 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 12px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ActionIconButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease, visibility 0.15s ease;

  tr:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

export const ActionIconButton = styled.button`
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
  transition: all ${({ theme }) => theme.transition.fast};

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const DaysAgeingPill = styled.span<{ $days: number }>`
  font-weight: 700;
  color: ${({ $days, theme }) => ($days >= 5 ? theme.colors.danger : theme.colors.text)};
`;
