import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
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

export const ToolbarIconButton = styled.button<{
  $active?: boolean;
  $variant?: 'flag' | 'excel' | 'default';
}>`
  width: 38px;
  height: 38px;
  border: 1px solid ${({ theme, $active }) =>
    $active
      ? '#EF4444'
      : theme.colors.border};
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

export const SearchWrapper = styled.div`
  max-width: 320px;
  width: 100%;
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

export const SessionCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SessionHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
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
