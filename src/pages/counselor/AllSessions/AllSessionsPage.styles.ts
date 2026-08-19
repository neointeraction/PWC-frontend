import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InstitutionSelectorCard = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: fit-content;
  max-width: 100%;
`;

export const InstitutionTriggerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 12px 18px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const InstitutionInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InstitutionTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const InstitutionName = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const CodeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  background-color: rgba(245, 158, 11, 0.12);
  color: #D97706;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

export const StatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.successLight};
  color: ${({ theme }) => theme.colors.success};
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`;

export const LocationText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const InstitutionDropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 50;
  min-width: 320px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const DropdownItem = styled.button<{ $isSelected?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  border: none;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primaryLight : 'transparent'};
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
  cursor: pointer;
  transition: background-color 0.15s ease;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

export const SummaryCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const MetricCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
`;

export const MetricCardHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  border-bottom: 1px solid rgba(93, 35, 132, 0.08);
`;

export const MetricCardBody = styled.div`
  padding: 16px;
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

export const TableFilterToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const DateFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ClearDateButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TimeText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const SessionStatusIndicator = styled.span<{ $canJoin?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ $canJoin, theme }) => ($canJoin ? theme.colors.success : theme.colors.textSecondary)};
`;

export const StudentCellWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
`;

export const StudentGradeText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SortHeaderButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  font-weight: 700;
  color: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;
