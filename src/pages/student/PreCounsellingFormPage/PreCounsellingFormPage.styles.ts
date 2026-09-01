import styled from 'styled-components';

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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const HeaderBackButton = styled.button`
  position: absolute;
  left: 0;
  top: calc((100% - 24px) / 2);
  transform: translateY(-50%);
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
  padding: 4px 14px;
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
  line-height: 36px;
  text-align: center;
  letter-spacing: -0.3px;

  @media (max-width: 640px) {
    font-size: 20px;
    line-height: 36px;
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

/* Before You Fill This Form Numbered Cards */
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

/* What This Form Is About Box */
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

export const StatementList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StatementListItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;

  svg {
    margin-top: 2px;
    flex-shrink: 0;
    color: #5d2384;
  }
`;

export const GoldenRulesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
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

  @media (max-width: 640px) {
    width: 100%;

    button {
      min-width: 0 !important;
      width: 100% !important;
    }
  }
`;

export const CtaSubtext = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  text-align: center;
`;

/* Wizard Styles */
export const WizardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const HeaderProgressCard = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, #2563EB 100%);
  padding: 10px 16px;
  border-radius: 4px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 320px;
  box-shadow: 0 2px 8px rgba(93, 35, 132, 0.15);

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

export const HeaderProgressRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const HeaderStepTitle = styled.span`
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #ffffff;
  white-space: nowrap;
`;

export const HeaderStepCount = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  white-space: nowrap;
`;

export const HeaderProgressTrack = styled.div`
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 2px;
  overflow: hidden;
`;

export const HeaderProgressBar = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background-color: #ffffff;
  border-radius: 2px;
  transition: width 0.3s ease;
`;

export const WizardStepHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 14px 16px;
  }
`;

export const StepTitleText = styled.h2`
  font-size: 15px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.5px;
  margin: 0;
  text-transform: uppercase;
`;

export const WizardProgressHeader = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, #2563EB 100%);
  padding: 12px 20px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 640px) {
    padding: 8px 14px;
  }
`;

export const WizardStepInfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;

  @media (max-width: 640px) {
    font-size: 11px;
  }
`;

export const ProgressTrack = styled.div`
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 2px;
  overflow: hidden;
`;

export const ProgressBar = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background-color: #ffffff;
  border-radius: 2px;
  transition: width 0.3s ease;
`;

export const WizardStepBody = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media (max-width: 640px) {
    padding: 16px;
    gap: 18px;
  }
`;

export const QuestionBox = styled.div<{ $hasError?: boolean }>`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? '#DC2626' : theme.colors.border)};
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 640px) {
    padding: 16px;
    gap: 12px;
  }
`;

export const QuestionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  line-height: 1.45;
`;

export const RequiredMarker = styled.span`
  color: #dc2626;
  margin-left: 4px;
`;

export const QuestionErrorText = styled.p`
  font-size: 13px;
  color: #dc2626;
  margin: -8px 0 0;
`;

export const QuestionSubtext = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

export const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const OptionLabel = styled.label<{ $selected?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;

  @media (max-width: 640px) {
    padding: 12px;
    gap: 10px;

    &[style*="alignItems: 'center'"],
    &[style*='align-items: center'] {
      align-items: flex-start !important;
    }
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }

  input[type='radio'],
  input[type='checkbox'] {
    accent-color: ${({ theme }) => theme.colors.primary};
    margin-top: 3px;
    flex-shrink: 0;
  }
`;

export const OptionTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`;

export const InlineOptionTextGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    width: 100%;

    input {
      width: 100% !important;
      min-width: 0 !important;
    }
  }
`;

export const OptionTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  white-space: normal;
  word-break: break-word;
  flex-shrink: 0;
`;

export const CustomTextInput = styled.input`
  width: 100%;
  min-width: 0;
  padding: 10px 14px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.2s ease;

  @media (max-width: 640px) {
    min-width: 0 !important;
    width: 100% !important;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const DataTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th,
  td {
    padding: 12px 14px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    text-align: left;
  }

  th {
    background-color: ${({ theme }) => theme.colors.background};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const TableInput = styled.input`
  width: 100%;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ToggleButton = styled.button<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 8px;
  border-radius: 4px;
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primaryLight : theme.colors.surface};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.text)};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  min-width: 80px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const OptionScoreBadge = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.border};
  color: ${({ $active, theme }) => ($active ? '#ffffff' : theme.colors.text)};
  font-size: 13px;
  font-weight: 700;
`;

export const OptionText = styled.span`
  font-size: 13px;
  font-weight: 500;
  line-height: 1.2;
`;

export const MatrixGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MatrixRowCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const MatrixRowText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const MatrixOptionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const WizardFooterNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 640px) {
    padding: 16px;
    flex-direction: column-reverse;
    gap: 12px;

    button {
      width: 100% !important;
      margin-left: 0 !important;
      justify-content: center;
    }
  }
`;

export const ClosingNoteCard = styled.div`
  background-color: #fbf7ff;
  border: 1px solid #7e22ce;
  border-radius: 6px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ClosingNoteTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #581c87;
  margin: 0;
  line-height: 1.4;
`;

export const ClosingNoteText = styled.p`
  font-size: 14px;
  line-height: 1.55;
  color: #6b21a8;
  margin: 0;
`;

export const SuccessPortalButton = styled.button`
  background-color: #581c87;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #4c1d95;
  }
`;

export const MarksTableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-top: ${({ theme }) => theme.spacing.sm};
  border: 1px solid #cbd5e1;
  border-radius: 4px;
`;

export const MarksTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th,
  td {
    padding: 10px 14px;
    border: 1px solid #cbd5e1;

    @media (max-width: 640px) {
      padding: 8px 10px;
      font-size: 13px;
    }
  }

  th {
    background-color: #dce7f5;
    font-weight: 700;
    color: #1e293b;
  }

  tr:nth-child(even) {
    background-color: #f8fafc;
  }

  tr:nth-child(odd) {
    background-color: #ffffff;
  }
`;

export const SubjectCellText = styled.span`
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
`;

export const OtherSubjectInput = styled.input`
  padding: 5px 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  width: 150px;

  @media (max-width: 640px) {
    width: 100%;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SectionBannerBar = styled.div`
  background-color: #1e3a8a;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 8px 16px;
  border-radius: 4px;
  margin-bottom: 20px;
`;

export const InlineLabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;

    input {
      width: 100% !important;
      min-width: 0 !important;
    }
  }

  label {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    white-space: nowrap;
  }
`;

export const ReasonLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 12px;
  margin-bottom: 8px;
`;

export const InlineReasonInput = styled.input`
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  width: 320px;

  @media (max-width: 640px) {
    width: 100%;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
