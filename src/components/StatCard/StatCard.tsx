import React from 'react';
import styled from 'styled-components';

const StatCardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  transition: box-shadow ${({ theme }) => theme.transition.base};

  &:hover {
    box-shadow: ${({ theme }) => theme.colors.shadowMd};
  }
`;

const IconWrapper = styled.div<{ $bgColor: string }>`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ $bgColor }) => $bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.fontSize.display};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StatChange = styled.div<{ $positive: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme, $positive }) => ($positive ? theme.colors.success : theme.colors.danger)};
  margin-top: 2px;
`;

const ChangeLabelText = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.normal};
`;

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  iconBgColor?: string;
  change?: number;
  changeLabel?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  iconBgColor = '#EFF6FF',
  change,
  changeLabel,
}) => (
  <StatCardContainer>
    <IconWrapper $bgColor={iconBgColor}>{icon}</IconWrapper>
    <StatValue>{value}</StatValue>
    <StatLabel>{label}</StatLabel>
    {change !== undefined && (
      <StatChange $positive={change >= 0}>
        {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        {changeLabel && <ChangeLabelText> {changeLabel}</ChangeLabelText>}
      </StatChange>
    )}
  </StatCardContainer>
);
