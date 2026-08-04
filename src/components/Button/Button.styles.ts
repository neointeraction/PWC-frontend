import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth?: boolean;
  $isLoading?: boolean;
}

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textInverse};
    border: 1.5px solid ${({ theme }) => theme.colors.primary};
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primaryHover};
      border-color: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  secondary: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text};
    border: 1.5px solid ${({ theme }) => theme.colors.border};
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.surfaceHover};
      border-color: ${({ theme }) => theme.colors.textMuted};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.textSecondary};
    border: 1.5px solid transparent;
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.surfaceHover};
      color: ${({ theme }) => theme.colors.text};
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.danger};
    color: #fff;
    border: 1.5px solid ${({ theme }) => theme.colors.danger};
    &:hover:not(:disabled) {
      background-color: #b91c1c;
      border-color: #b91c1c;
    }
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.success};
    color: #fff;
    border: 1.5px solid ${({ theme }) => theme.colors.success};
    &:hover:not(:disabled) {
      background-color: #15803d;
      border-color: #15803d;
    }
  `,
};

const sizeStyles = {
  sm: css`
    padding: 6px 12px;
    font-size: ${({ theme }) => theme.fontSize.sm};
    height: 32px;
    gap: 6px;
  `,
  md: css`
    padding: 8px 16px;
    font-size: ${({ theme }) => theme.fontSize.base};
    height: 38px;
    gap: 8px;
  `,
  lg: css`
    padding: 10px 20px;
    font-size: ${({ theme }) => theme.fontSize.md};
    height: 44px;
    gap: 8px;
  `,
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transition.fast};
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  opacity: ${({ $isLoading }) => ($isLoading ? 0.75 : 1)};
  pointer-events: ${({ $isLoading }) => ($isLoading ? 'none' : 'auto')};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  ${({ $variant }) => variantStyles[$variant]};
  ${({ $size }) => sizeStyles[$size]};

  svg {
    flex-shrink: 0;
  }
`;

export const Spinner = styled.span`
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
