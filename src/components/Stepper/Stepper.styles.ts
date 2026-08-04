import styled, { css } from 'styled-components';

export const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
`;

export const StepItem = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  &:last-child {
    flex: 0;
  }
`;

interface StepCircleProps {
  $state: 'completed' | 'active' | 'upcoming';
}

export const StepCircle = styled.div<StepCircleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  flex-shrink: 0;
  transition: all ${({ theme }) => theme.transition.base};

  ${({ $state, theme }) =>
    $state === 'completed' &&
    css`
      background-color: ${theme.colors.success};
      color: ${theme.colors.textInverse};
      border: 1px solid ${theme.colors.success};
    `}

  ${({ $state, theme }) =>
    $state === 'active' &&
    css`
      background-color: ${theme.colors.primary};
      color: ${theme.colors.textInverse};
      border: 1px solid ${theme.colors.primary};
    `}

  ${({ $state, theme }) =>
    $state === 'upcoming' &&
    css`
      background-color: ${theme.colors.surface};
      color: ${theme.colors.textMuted};
      border: 1px solid ${theme.colors.border};
    `}
`;

export const StepInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${({ theme }) => theme.spacing.sm};
  min-width: 0;
`;

interface StepLabelProps {
  $active: boolean;
}

export const StepLabel = styled.span<StepLabelProps>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ $active, theme }) =>
    $active ? theme.fontWeight.semibold : theme.fontWeight.medium};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.text : theme.colors.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StepDescription = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface ConnectorProps {
  $completed: boolean;
}

export const Connector = styled.div<ConnectorProps>`
  flex: 1;
  height: 2px;
  margin: 0 ${({ theme }) => theme.spacing.md};
  background-color: ${({ $completed, theme }) =>
    $completed ? theme.colors.success : theme.colors.border};
  transition: background-color ${({ theme }) => theme.transition.base};
`;
