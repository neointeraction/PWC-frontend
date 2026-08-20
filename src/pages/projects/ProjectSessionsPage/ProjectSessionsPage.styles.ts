import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const TopMetricCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 240px);
  gap: 16px;
  width: 100%;

  @media (max-width: 840px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const MetricFilterCard = styled.button<{ $isActive?: boolean }>`
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primaryLight : theme.colors.surface};
  border: 1px solid
    ${({ theme, $isActive }) => ($isActive ? theme.colors.primary : theme.colors.border)};
  border-radius: 4px;
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.06);
  }
`;

export const MetricCardLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const MetricCardValue = styled.span<{ $color?: string }>`
  font-size: 24px;
  font-weight: 800;
  color: ${({ $color, theme }) => $color || theme.colors.text};
`;

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchWrapper = styled.div`
  max-width: 380px;
  width: 100%;
`;

export const CounselorsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CounselorCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

export const CounselorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 14px;
  flex-wrap: wrap;
`;

export const CounselorIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`;

export const CounselorAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #F3E8FF;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 15px;
  flex-shrink: 0;
`;

export const CounselorDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const CounselorNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CounselorName = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const CounselorSubtext = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const CounselorCode = styled.span`
  font-size: 15px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.5px;
  margin-left: 8px;
`;

export const NoteIconButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const CounselorHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

export const CounselorMetricsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const MetricChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 12px;
`;

export const MetricChipLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

export const MetricChipValue = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
`;

export const MissedMetricChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  background-color: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 4px;
  font-size: 12px;
  color: #DC2626;
  font-weight: 700;

  svg {
    color: #DC2626;
    flex-shrink: 0;
  }
`;

export const StudentsSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StudentsTableWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
`;

export const StudentNameButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  text-align: left;
  transition: color 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const NBStudentText = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  font-style: italic;
`;

export const SessionBadgeWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export const SessionPill = styled.span<{ $type: 'S1' | 'S2' | 'NB'; $isMissed?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  background-color: ${({ $type, $isMissed }) =>
    $isMissed ? '#FEE2E2' : $type === 'S1' ? '#EDE9FE' : $type === 'S2' ? '#E0F2FE' : '#F1F5F9'};
  color: ${({ $type, $isMissed }) =>
    $isMissed ? '#DC2626' : $type === 'S1' ? '#6B21A8' : $type === 'S2' ? '#0369A1' : '#64748B'};
`;

export const ActionCellWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RescheduleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    border-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const ActionIconButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ActionIconButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
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
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;
