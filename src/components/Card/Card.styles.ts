import styled from 'styled-components';

export const CardContainer = styled.div<{
  $padding?: string;
  $hoverable?: boolean;
}>`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ $padding, theme }) => {
    if (!$padding) return theme.spacing.xl;
    if ($padding === 'none') return '0';
    if ($padding in theme.spacing) return theme.spacing[$padding as keyof typeof theme.spacing];
    return $padding;
  }};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  transition:
    box-shadow ${({ theme }) => theme.transition.base},
    border-color ${({ theme }) => theme.transition.base};

  ${({ $hoverable, theme }) =>
    $hoverable &&
    `
    cursor: pointer;
    &:hover {
      box-shadow: ${theme.colors.shadowMd};
      border-color: ${theme.colors.textMuted};
    }
  `}
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.md};
`;

export const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

export const CardSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 2px;
`;

export const CardBody = styled.div``;

export const CardFooter = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`;
