import styled from 'styled-components';
import { motion } from 'framer-motion';

export const TabsContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  overflow-x: auto;
  overflow-y: hidden;
`;

export const TabButton = styled.button<{ $active: boolean; $disabled?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.fontWeight.semibold : theme.fontWeight.medium};
  color: ${({ theme, $active, $disabled }) =>
    $disabled
      ? theme.colors.textMuted
      : $active
      ? theme.colors.primary
      : theme.colors.textSecondary};
  border: none;
  background: transparent;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.7 : 1)};
  white-space: nowrap;
  box-sizing: border-box;
  transition: color ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme, $disabled }) =>
      $disabled ? theme.colors.textMuted : theme.colors.primary};
  }
`;

export const ComingSoonBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.warningLight};
  color: ${({ theme }) => theme.colors.warning};
  font-size: 10px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-left: 4px;
  line-height: 1;
`;


export const ActiveTabIndicator = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 4px 4px 0 0;
`;

export const TabBadge = styled.span<{ $active: boolean }>`
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primaryLight : theme.colors.surfaceHover};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textMuted)};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  padding: 2px 8px;
  border-radius: 4px;
`;
