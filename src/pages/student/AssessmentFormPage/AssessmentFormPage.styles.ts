import styled, { css } from 'styled-components';

export const FormPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`;

export const HeroHeaderCard = styled.div`
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surface} 0%, #fafaff 100%);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  @media (max-width: 768px) {
    padding: 20px;
    gap: 24px;
  }
`;

export const DocumentHeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const HeaderTopNavRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
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

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const DocHeaderBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const DocTitle = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  letter-spacing: -0.3px;

  @media (max-width: 640px) {
    font-size: 20px;
  }
`;

export const DocSubtitle = styled.h2`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

export const DocNote = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

/* Floating Stats Grid */
export const StatsGridBar = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const StatBlock = styled.div<{ $gradient: string; $borderColor: string }>`
  background: ${({ $gradient }) => $gradient};
  border: 1px solid ${({ $borderColor }) => $borderColor};
  border-radius: 4px;
  padding: 20px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  }
`;

export const StatIconBox = styled.div<{ $color: string; $bg: string }>`
  width: 46px;
  height: 46px;
  border-radius: 4px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const StatInfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatNumber = styled.span<{ $color: string }>`
  font-size: 24px;
  font-weight: 800;
  line-height: 1.1;
  color: ${({ $color }) => $color};
`;

export const StatLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 2px;
`;

/* Modern Section Headers */
export const SectionTitleHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SectionHeaderIcon = styled.div<{ $color?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ $color, theme }) => $color || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const SectionTitleText = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

/* Before You Begin Numbered Cards */
export const NumberedCardsStack = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
  }
`;

export const NumberCardItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 4px 16px rgba(93, 35, 132, 0.06);
    transform: translateY(-2px);
  }
`;

export const NumberBadgeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const NumberBadgeIcon = styled.div<{ $bg: string; $color: string }>`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
  flex-shrink: 0;
`;

export const NumberCardTitle = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const NumberCardDesc = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.55;
`;

/* What This Assessment Is About Box */
export const StatementParagraphCard = styled.div`
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`;

export const StatementParagraphTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const StatementParagraphBody = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.65;
  margin: 0;
`;

/* Combined Type A Rating Scale Guide */
export const CombinedScaleGuideGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-top: 14px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const CombinedScaleCard = styled.div<{ $borderTopColor: string; $bg: string }>`
  background-color: ${({ $bg }) => $bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-top: 4px solid ${({ $borderTopColor }) => $borderTopColor};
  border-radius: 4px;
  padding: 14px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CombinedScaleHeader = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ $color }) => $color};
`;

export const CombinedScaleDesc = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.45;
`;

/* Type B Guidance */
export const TypeBStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
`;

export const TypeBRow = styled.div`
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  background-color: #fffbeb;
  border: 1px solid #fde68a;
`;

export const TypeBBadge = styled.div`
  width: 48px;
  background-color: #d97706;
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const TypeBDescText = styled.div`
  padding: 14px 18px;
  font-size: 13px;
  color: #78350f;
  line-height: 1.5;
  display: flex;
  align-items: center;
`;

/* The Golden Rules Gold Accent Cards */
export const GoldenRulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const GoldenRuleCard = styled.div`
  display: flex;
  gap: 14px;
  padding: 18px 20px;
  border: 1px solid #fde68a;
  border-left: 4px solid #d97706;
  border-radius: 4px;
  background-color: #fffbeb;
  box-shadow: 0 2px 8px rgba(217, 119, 6, 0.04);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(217, 119, 6, 0.08);
  }
`;

export const GoldenRuleIconBox = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: #fef3c7;
  color: #d97706;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const GoldenRuleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const GoldenRuleTitle = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #78350f;
`;

export const GoldenRuleDesc = styled.span`
  font-size: 13px;
  color: #92400e;
  line-height: 1.5;
`;

/* Ready Encouragement Hero Banner */
export const ReadyEncouragementBanner = styled.div`
  background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
  border: 1px solid #e9d5ff;
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  padding: 24px;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`;

export const ReadyBannerTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  letter-spacing: -0.2px;
`;

export const ReadyBannerSubtext = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`;

export const StartCtaBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-top: 12px;
`;

export const CtaSubtext = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

/* Wizard Container & Step Styles */
export const WizardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const WizardProgressHeader = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, #2563eb 100%);
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const WizardStepInfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const ProgressTrack = styled.div`
  width: 100%;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressBar = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background-color: #ffffff;
  border-radius: 4px;
  transition: width 0.3s ease;
`;

export const WizardStepBody = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const QuestionBox = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const QuestionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  line-height: 1.45;
`;

export const QuestionSubtext = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

export const LikertScaleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-top: 10px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const LikertButton = styled.button<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 8px;
  padding: 14px 12px;
  border-radius: 4px;
  border: 1px solid
    ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.primaryLight : theme.colors.surface};
  color: ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.text)};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const LikertOptionHeader = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.text)};
`;

export const LikertOptionDesc = styled.span<{ $selected: boolean }>`
  font-size: 12px;
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.primary : theme.colors.textSecondary};
  line-height: 1.45;
`;


export const AptitudeOptionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AptitudeOptionLabel = styled.label<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }

  input[type='radio'] {
    accent-color: ${({ theme }) => theme.colors.primary};
  }

  ${({ $selected, theme }) =>
    $selected &&
    css`
      border-color: ${theme.colors.primary};
      background-color: ${theme.colors.primaryLight};
      font-weight: 600;
    `}
`;

export const WizardFooterNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;
