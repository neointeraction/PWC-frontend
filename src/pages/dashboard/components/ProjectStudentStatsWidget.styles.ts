import styled from 'styled-components';

export const WidgetHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const WidgetTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const WidgetTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const WidgetSubtitle = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

export const ProjectSelect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;

  &:focus,
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ModernStatCard = styled.div<{ $isFeatured?: boolean }>`
  background-color: ${({ $isFeatured, theme }) =>
    $isFeatured ? 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)' : theme.colors.surface};
  border: 1px solid
    ${({ $isFeatured, theme }) => ($isFeatured ? '#CBD5E1' : theme.colors.border)};
  border-radius: 4px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const CardTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CardIconBox = styled.div<{ $color?: string; $bg?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${({ $bg, theme }) => $bg || theme.colors.primaryLight};
  color: ${({ $color, theme }) => $color || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const CardTitleText = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const PercentBadge = styled.span<{ $color?: string; $bg?: string }>`
  font-size: 12px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  background-color: ${({ $bg }) => $bg || '#ECFDF5'};
  color: ${({ $color }) => $color || '#059669'};
`;

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 6px;
  border-radius: 4px;
  background-color: #E2E8F0;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $percent: number; $color?: string }>`
  height: 100%;
  width: ${({ $percent }) => Math.min(100, Math.max(0, $percent))}%;
  background-color: ${({ $color }) => $color || '#10B981'};
  border-radius: 4px;
  transition: width 0.4s ease;
`;

export const StatsValuesRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 4px;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DotIndicator = styled.span<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  flex-shrink: 0;
`;

export const StatItemContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatItemLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

export const StatItemNum = styled.span<{ $color?: string }>`
  font-size: 15px;
  font-weight: 800;
  color: ${({ $color, theme }) => $color || theme.colors.text};
`;
