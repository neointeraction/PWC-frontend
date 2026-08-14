import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 70px);
  background-color: ${({ theme }) => theme.colors.background};
`;

export const TopHeaderContainer = styled.div`
  padding: 20px 24px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const LayoutWrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 24px;
  position: relative;
  align-items: flex-start;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

// Left Sidebar
export const SidebarWrapper = styled.aside<{ $collapsed?: boolean }>`
  width: 280px;
  min-width: 280px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  position: sticky;
  top: 24px;
  align-self: flex-start;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  z-index: 10;

  @media (max-width: 900px) {
    width: 100%;
    min-width: 100%;
    height: auto;
    max-height: none;
    position: relative;
    top: 0;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding: 12px;
  }
`;

export const OverallProgressContainer = styled.div`
  padding: 12px 14px;
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const ProgressTitle = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ProgressValue = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ProgressBarBg = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  transition: width 0.3s ease;
`;

export const StepNavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
`;

export const StepNavItem = styled.button<{ $active?: boolean; $completed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid transparent;
  background-color: transparent;
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.text)};
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  font-size: 0.85rem;
  text-align: left;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }
`;

export const SublinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 2px;
  margin-bottom: 6px;
  padding-left: 24px;
  margin-left: 12px;
  border-left: 1.5px solid ${({ theme }) => theme.colors.border};
`;

export const SublinkItem = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  padding: 5px 8px;
  font-size: 0.78rem;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  text-align: left;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight || '#F3F4F6'};
  }

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
    opacity: ${({ $active }) => ($active ? 1 : 0.5)};
    flex-shrink: 0;
  }
`;

export const StatusIconWrapper = styled.span<{ $completed?: boolean; $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  min-width: 22px;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 700;
  transition: all 0.2s ease;

  ${({ $completed, $active, theme }) => {
    if ($completed) {
      return `
        background-color: transparent;
        color: ${theme.colors.success || '#10B981'};
        border: 1.5px solid ${theme.colors.success || '#10B981'};
      `;
    }
    if ($active) {
      return `
        background-color: ${theme.colors.primary};
        color: #fff;
        border: 1.5px solid ${theme.colors.primary};
      `;
    }
    return `
      background-color: transparent;
      color: ${theme.colors.textSecondary};
      border: 1.5px solid ${theme.colors.textSecondary};
    `;
  }}
`;

export const StepLabelText = styled.span`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Main Content Panel
export const MainContentPanel = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

export const StepHeaderCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 20px 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

export const StepHeaderTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 6px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StepHeaderDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`;

export const SectionBlock = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SectionBlockTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SectionBlockSubtitle = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: -8px 0 8px 0;
  font-style: italic;
`;

// Form Grid
export const FormGrid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols || 2}, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FormLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

export const FormInput = styled.input`
  padding: 9px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const FormTextarea = styled.textarea`
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

// Comparison Table Styling
export const CompTableContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const CompTableHeaderRow = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr 1fr;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (max-width: 768px) {
    display: none;
  }
`;

export const CompTableHeaderCell = styled.div<{ $tint?: 'student' | 'parent' }>`
  padding: 10px 14px;

  ${({ $tint, theme }) =>
    $tint === 'student'
      ? `background-color: ${theme.colors.primaryLight || 'rgba(79, 70, 229, 0.05)'}; border-left: 1px solid ${theme.colors.border};`
      : $tint === 'parent'
        ? `background-color: rgba(16, 185, 129, 0.05); border-left: 1px solid ${theme.colors.border};`
        : ''}
`;

export const CompSubHeaderRow = styled.div`
  padding: 10px 14px;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export const CompDataRow = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr 1fr;
  align-items: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 12px;
    gap: 8px;
  }
`;

export const CompParamCell = styled.div`
  padding: 12px 14px;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: flex-start;
`;

export const CompResponseCell = styled.div<{ $type?: 'student' | 'parent' }>`
  padding: 12px 14px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ $type }) =>
    $type === 'student'
      ? 'rgba(79, 70, 229, 0.02)'
      : $type === 'parent'
        ? 'rgba(16, 185, 129, 0.02)'
        : 'transparent'};

  @media (max-width: 768px) {
    border-left: none;
    border-radius: 4px;
    padding: 8px 10px;

    &::before {
      content: '${({ $type }) => ($type === 'student' ? 'Student Response: ' : 'Parent Response: ')}';
      font-weight: 700;
      font-size: 0.75rem;
      color: ${({ theme }) => theme.colors.textSecondary};
      display: block;
      margin-bottom: 2px;
    }
  }
`;

export const NaBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.75rem;
  font-weight: 600;
`;

// Full-Width Synthesis Notes Panel
export const SynthesisPanel = styled.div`
  background-color: ${({ theme }) => theme.colors.noteBackground};
  border: 1px solid ${({ theme }) => theme.colors.warning};
  border-left: 4px solid ${({ theme }) => theme.colors.warning};
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  margin-top: 16px;
`;

export const SynthesisPanelHeader = styled.div`
  padding: 10px 16px;
  background-color: ${({ theme }) => theme.colors.warningLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.warning}40;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.warning};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SynthesisRowList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 12px;
`;

export const SynthesisRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const SynthesisCodeLabel = styled.div`
  width: 42px;
  min-width: 42px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.colors.warning};
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 26px;
  }
`;

export const SynthesisInput = styled.textarea<{ $minHeight?: number }>`
  flex: 1;
  width: 100%;
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  min-height: ${({ $minHeight }) => ($minHeight ? `${$minHeight}px` : '48px')};
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

// Summary Cards Strip (Step 2 B)
export const SummaryCardStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 14px 16px;
`;

export const SummaryCardLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 4px;
`;

export const SummaryCardValue = styled.div`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

// Reliability Card (Step 4 D)
export const ReliabilityCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const IndicatorBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ReliabilityCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const IndicatorTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const IndicatorQuestion = styled.div`
  font-size: 0.85rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// 3x3 Grid (Step 5 E)
export const Roadmap3x3Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export const RoadmapColumnHeader = styled.div`
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.primaryLight || 'rgba(79, 70, 229, 0.08)'};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

export const RoadmapCell = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const RoadmapCellLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// SCRI Rating Rows (Step 5 E)
export const ScriRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const ScriInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ScriName = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const ScriDesc = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 8px;
`;

export const RadioLabel = styled.label<{ $checked?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  font-size: 0.85rem;
  color: ${({ theme, $checked }) => ($checked ? theme.colors.primary : theme.colors.text)};
  font-weight: ${({ $checked }) => ($checked ? 600 : 400)};
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme, $checked }) => ($checked ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme, $checked }) => ($checked ? `${theme.colors.primary}0D` : theme.colors.surface)};
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme, $checked }) => ($checked ? `${theme.colors.primary}12` : `${theme.colors.primary}08`)};
  }
`;

export const RadioInput = styled.input`
  display: none;

  &:checked + span {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:checked + span::after {
    transform: scale(1);
    opacity: 1;
  }
`;

export const RadioCustom = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  background-color: ${({ theme }) => theme.colors.surface};

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary};
    transform: scale(0);
    opacity: 0;
    transition: all 0.2s ease;
  }
`;

// Sticky Footer Navigation
export const StickyFooterNav = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
`;

export const TableActionButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight || 'rgba(79, 70, 229, 0.05)'};
  }
`;
