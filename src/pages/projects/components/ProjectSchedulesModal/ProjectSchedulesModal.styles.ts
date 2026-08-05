import styled from 'styled-components';

export const CalendarLayout = styled.div`
  display: flex;
  height: 65vh;
  min-height: 500px;
  margin-top: -${({ theme }) => theme.spacing.lg};
`;

export const Sidebar = styled.div`
  width: 240px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SidebarTitle = styled.h4`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const CounselorFilterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const CounselorFilterItem = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.text};
`;

export const CounselorColorBadge = styled.div<{ $color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: ${({ $color }) => $color};
`;

export const CalendarMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const CalendarHeaderRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surfaceHover};
`;

export const DayName = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-transform: uppercase;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  &:last-child {
    border-right: none;
  }
`;

export const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(100px, 1fr);
  flex: 1;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.border};
  gap: 1px;
`;

export const DayCell = styled.div<{ $isCurrentMonth: boolean; $isToday: boolean }>`
  background-color: ${({ theme, $isCurrentMonth }) => 
    $isCurrentMonth ? theme.colors.surface : theme.colors.background};
  padding: ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DateNumber = styled.div<{ $isToday: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme, $isToday }) => $isToday ? theme.fontWeight.bold : theme.fontWeight.medium};
  color: ${({ theme, $isToday }) => $isToday ? theme.colors.surface : theme.colors.textSecondary};
  background-color: ${({ theme, $isToday }) => $isToday ? theme.colors.primary : 'transparent'};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: 4px;
`;

export const SlotPillLabel = styled.label`
  display: block;
  cursor: pointer;
  margin: 0;
`;

export const SlotRadioInput = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const SlotPill = styled.div<{ $color: string; $isSelected: boolean }>`
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ $color, $isSelected }) => $isSelected ? $color : 'transparent'};
  color: ${({ $color, $isSelected, theme }) => $isSelected ? theme.colors.surface : $color};
  border: 1px solid ${({ $color }) => $color};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $color, $isSelected }) => $isSelected ? $color : `${$color}22`};
  }
`;

export const SlotPillTime = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const CalendarControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
`;

export const MonthTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const IconButton = styled.button`
  background: transparent;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.textMuted};
  }
`;
