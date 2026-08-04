import styled, { css } from 'styled-components';

interface InputWrapperProps {
  $hasError?: boolean;
  $fullWidth?: boolean;
}

export const InputWrapper = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const InputContainer = styled.div<InputWrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  border: 1.5px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.surface};
  transition:
    border-color ${({ theme }) => theme.transition.fast},
    box-shadow ${({ theme }) => theme.transition.fast};

  &:focus-within {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.borderFocus};
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) =>
        $hasError ? `${theme.colors.danger}22` : `${theme.colors.primary}22`};
  }

  ${({ $hasError }) =>
    $hasError &&
    css`
      background-color: ${({ theme }) => theme.colors.dangerLight};
    `}
`;

export const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text};
  padding: 9px 12px;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const IconSlot = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  color: ${({ theme }) => theme.colors.textMuted};
  flex-shrink: 0;
`;

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.danger};
`;

export const HintText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
