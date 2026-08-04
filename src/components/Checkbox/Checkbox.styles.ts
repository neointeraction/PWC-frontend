import styled, { css } from 'styled-components';

export const CheckboxWrapper = styled.label<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  user-select: none;
`;

export const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  pointer-events: none;
`;

export const StyledBox = styled.div<{
  $checked?: boolean;
  $indeterminate?: boolean;
  $hasError?: boolean;
  $disabled?: boolean;
}>`
  width: 18px;
  height: 18px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transition.fast};
  flex-shrink: 0;

  ${({ theme, $checked, $indeterminate, $hasError }) =>
    $checked || $indeterminate
      ? css`
          background-color: ${$hasError ? theme.colors.danger : theme.colors.primary};
          border: 1.5px solid ${$hasError ? theme.colors.danger : theme.colors.primary};
          color: #ffffff;
        `
      : css`
          background-color: ${theme.colors.surface};
          border: 1.5px solid ${$hasError ? theme.colors.danger : theme.colors.border};
          color: transparent;

          &:hover {
            border-color: ${$hasError ? theme.colors.danger : theme.colors.primary};
            background-color: ${theme.colors.surfaceHover};
          }
        `}

  ${HiddenInput}:focus-visible + & {
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) =>
        $hasError ? `${theme.colors.danger}22` : `${theme.colors.primary}22`};
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.primary};
  }
`;

export const LabelText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
`;

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.danger};
`;
