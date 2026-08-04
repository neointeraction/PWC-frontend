import styled, { css } from 'styled-components';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary';
type BadgeSize = 'sm' | 'md';

const variantMap: Record<BadgeVariant, ReturnType<typeof css>> = {
  default: css`
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.textSecondary};
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.successLight};
    color: ${({ theme }) => theme.colors.success};
  `,
  warning: css`
    background-color: ${({ theme }) => theme.colors.warningLight};
    color: ${({ theme }) => theme.colors.warning};
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.dangerLight};
    color: ${({ theme }) => theme.colors.danger};
  `,
  info: css`
    background-color: ${({ theme }) => theme.colors.infoLight};
    color: ${({ theme }) => theme.colors.info};
  `,
  primary: css`
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
  `,
};

export const StyledBadge = styled.span<{
  $variant: BadgeVariant;
  $size: BadgeSize;
}>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  white-space: nowrap;

  ${({ $size }) =>
    $size === 'sm'
      ? css`
          font-size: 11px;
          padding: 2px 8px;
        `
      : css`
          font-size: ${({ theme }) => theme.fontSize.sm};
          padding: 3px 10px;
        `}

  ${({ $variant }) => variantMap[$variant]}
`;
