import styled, { css } from 'styled-components';

export const SelectWrapper = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  position: relative;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const DropdownTrigger = styled.button<{
  $isOpen?: boolean;
  $hasError?: boolean;
  $isDisabled?: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 12px;
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1.5px solid
    ${({ theme, $hasError, $isOpen }) =>
      $hasError
        ? theme.colors.danger
        : $isOpen
        ? theme.colors.borderFocus
        : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  outline: none;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.6 : 1)};
  transition: all ${({ theme }) => theme.transition.fast};
  user-select: none;

  &:focus-visible {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.borderFocus};
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) =>
        $hasError ? `${theme.colors.danger}22` : `${theme.colors.primary}22`};
  }

  ${({ $isOpen, theme, $hasError }) =>
    $isOpen &&
    css`
      box-shadow: 0 0 0 3px
        ${$hasError ? `${theme.colors.danger}22` : `${theme.colors.primary}22`};
    `}
`;

export const TriggerText = styled.span<{ $isPlaceholder?: boolean }>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme, $isPlaceholder }) =>
    $isPlaceholder ? theme.colors.textMuted : theme.colors.text};
`;

export const ChevronIcon = styled.div<{ $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: transform ${({ theme }) => theme.transition.fast};
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const DropdownMenu = styled.ul`
  position: fixed;
  z-index: 99999;
  max-height: 240px;
  overflow-y: auto;
  margin: 0;
  padding: 4px;
  list-style: none;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  /* Scrollbar Styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 3px;
  }
`;

export const DropdownItem = styled.li<{ $isSelected?: boolean; $isDisabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme, $isSelected, $isDisabled }) =>
    $isDisabled
      ? theme.colors.textMuted
      : $isSelected
      ? theme.colors.primary
      : theme.colors.text};
  font-weight: ${({ theme, $isSelected }) =>
    $isSelected ? theme.fontWeight.semibold : theme.fontWeight.normal};
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? `${theme.colors.primary}12` : 'transparent'};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.55 : 1)};
  transition: background-color ${({ theme }) => theme.transition.fast};
  user-select: none;

  &:hover {
    background-color: ${({ theme, $isSelected, $isDisabled }) =>
      $isDisabled
        ? 'transparent'
        : $isSelected
        ? `${theme.colors.primary}20`
        : theme.colors.surfaceHover};
  }
`;

export const ComingSoonTag = styled.span`
  opacity: 0.65;
  font-size: 11px;
  margin-left: 6px;
`;

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.danger};
`;
