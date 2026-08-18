import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  margin: 0 auto;
`;

export const MainCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 28px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surface} 0%, ${({ theme }) => theme.colors.background} 100%);
`;

export const HeaderTopNavRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 4px;
`;

export const HeaderTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const HeaderBackButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const TitleText = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.3px;
`;

export const SubtitleText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

/* Lock Warning Card for Parent Form */
export const LockWarningContainer = styled.div`
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
`;

export const WarningBox = styled.div`
  background-color: ${({ theme }) => theme.colors.warningLight};
  border: 1px solid ${({ theme }) => theme.colors.warning};
  border-left: 4px solid ${({ theme }) => theme.colors.warning};
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  max-width: 640px;
  width: 100%;
  box-shadow: ${({ theme }) => theme.colors.shadow};
`;

export const WarningTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const WarningDesc = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  line-height: 1.6;
`;

export const ActionsButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;

/* Wizard Section */
export const WizardBody = styled.div`
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const StepIndicatorBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 12px 16px 24px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
`;

export const StepItem = styled.div<{ $active: boolean; $completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid
    ${({ $active, $completed, theme }) =>
      $active
        ? theme.colors.primary
        : $completed
          ? theme.colors.primary
          : theme.colors.border};
  background-color: ${({ $active, $completed, theme }) =>
    $active
      ? theme.colors.primary
      : $completed
        ? theme.colors.primaryLight
        : theme.colors.surface};
  color: ${({ $active, $completed, theme }) =>
    $active
      ? '#ffffff'
      : $completed
        ? theme.colors.text
        : theme.colors.textSecondary};
  transition: all 0.2s ease;
  white-space: nowrap;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

export const StepBadge = styled.span<{ $active: boolean; $completed: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  background-color: ${({ $active, $completed, theme }) =>
    $active
      ? 'rgba(255, 255, 255, 0.25)'
      : $completed
        ? theme.colors.primary
        : theme.colors.background};
  color: ${({ $active, $completed, theme }) =>
    $active
      ? '#ffffff'
      : $completed
        ? '#ffffff'
        : theme.colors.textSecondary};
  border: 1px solid
    ${({ $active, $completed, theme }) =>
      $active || $completed ? 'transparent' : theme.colors.border};
`;

export const StepLabel = styled.span<{ $active: boolean; $completed: boolean }>`
  font-size: 13px;
  font-weight: ${({ $active, $completed }) => ($active || $completed ? '700' : '500')};
  color: ${({ $active, $completed, theme }) =>
    $active
      ? '#ffffff'
      : $completed
        ? theme.colors.text
        : theme.colors.textSecondary};
`;

export const StepConnector = styled.div<{ $completed: boolean }>`
  flex: 1;
  height: 2px;
  min-width: 30px;
  margin: 0 12px;
  background-color: ${({ $completed, theme }) =>
    $completed ? theme.colors.primary : theme.colors.border};
  transition: background-color 0.2s ease;

  @media (max-width: 640px) {
    display: none;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SectionTitle = styled.h2`
  font-size: 17px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SectionSubtext = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

export const CounsellorBadgeCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
`;

export const CounsellorAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const CounsellorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const CounsellorName = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const CounsellorMeta = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/* Date & Time Grids & Carousel Navigation */
export const DateCarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  width: 100%;
`;

export const DateCarouselContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 6px 2px;
  flex: 1;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const CarouselNavButton = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 12px;
`;

export const DateCard = styled.button<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 14px 16px;
  min-width: 110px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid
    ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ $selected, theme }) => ($selected ? theme.colors.primaryLight : theme.colors.surface)};
  color: ${({ $selected, theme }) => ($selected ? theme.colors.text : theme.colors.textSecondary)};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const DateDay = styled.span`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.8;
`;

export const DateNumber = styled.span`
  font-size: 16px;
  font-weight: 800;
`;

export const SlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
`;

export const SlotCard = styled.button<{ $selected: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 4px;
  border: 1px solid
    ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.surface)};
  color: ${({ $selected, theme }) => ($selected ? '#ffffff' : theme.colors.text)};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.primaryLight)};
    color: ${({ $selected, theme }) => ($selected ? '#ffffff' : theme.colors.primary)};
  }
`;

export const SelectionSummaryCard = styled.div`
  background-color: ${({ theme }) => theme.colors.successLight};
  border: 1px solid ${({ theme }) => ((theme.name as string) === 'dark' ? '#166534' : '#a7f3d0')};
  border-left: 4px solid ${({ theme }) => theme.colors.success};
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SummaryTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SummaryLabel = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => ((theme.name as string) === 'dark' ? '#4ADE80' : '#047857')};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const SummaryValue = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => ((theme.name as string) === 'dark' ? '#86EFAC' : '#065f46')};
`;

export const ConfirmationCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
`;

export const ConfirmationRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
`;

export const NotificationBadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

export const NotificationBadge = styled.div<{ $color: string; $bg: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 4px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  font-size: 12px;
  font-weight: 700;
`;

export const NavigationFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 28px;
  background-color: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;
