import styled, { keyframes, css } from 'styled-components';

export const PortalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const WelcomeBanner = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, #3B82F6 100%);
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.xl};
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const BannerText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const BannerTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin: 0;
  color: #ffffff;
`;

export const BannerSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

export const BadgePill = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 10px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  backdrop-filter: blur(4px);
`;

export const ProfileWidgetCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid rgba(2, 132, 199, 0.2);
  border-left: 4px solid #0284C7;
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: 0 4px 14px rgba(2, 132, 199, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TestWidgetCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: 0 4px 14px rgba(93, 35, 132, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TestWidgetContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const TestWidgetInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const TestWidgetTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TestWidgetDesc = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`;

export const TestMetaDataRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
`;

export const MetaBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.background};
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

// Vertical Timeline Stepper Progress Widget Styles
const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(93, 35, 132, 0.4);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(93, 35, 132, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(93, 35, 132, 0);
  }
`;

export const TimelineWidgetCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const TimelineWidgetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TimelineTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const TimelineTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const TimelineSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 2px 0 0 0;
`;

export const TimelineList = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: ${({ theme }) => theme.spacing.xs};
`;

export const TimelineItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.lg};
  position: relative;
  min-height: 54px;

  &:last-child {
    min-height: auto;
  }
`;

export const NodeColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 24px;
  flex-shrink: 0;
`;

export const NodeDot = styled.div<{ $status: 'completed' | 'current' | 'upcoming' }>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  z-index: 2;
  transition: all 0.3s ease;

  ${({ $status }) =>
    $status === 'completed' &&
    css`
      background-color: #16a34a;
      color: #ffffff;
      border: 2px solid #16a34a;
    `}

  ${({ $status, theme }) =>
    $status === 'current' &&
    css`
      background-color: ${theme.colors.primary};
      color: #ffffff;
      border: 2px solid ${theme.colors.primary};
      animation: ${pulseAnimation} 2s infinite;
    `}

  ${({ $status, theme }) =>
    $status === 'upcoming' &&
    css`
      background-color: ${theme.colors.surface};
      color: ${theme.colors.textSecondary};
      border: 2px solid ${theme.colors.border};
    `}
`;

export const LineStem = styled.div<{ $completed?: boolean }>`
  width: 2px;
  flex: 1;
  min-height: 28px;
  background-color: ${({ $completed, theme }) =>
    $completed ? '#16A34A' : theme.colors.border};
  margin-top: 2px;
  margin-bottom: 2px;
`;

export const ItemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ItemTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ItemTitle = styled.h4<{ $status: 'completed' | 'current' | 'upcoming' }>`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ $status, theme }) =>
    $status === 'current'
      ? theme.fontWeight.bold
      : $status === 'completed'
      ? theme.fontWeight.semibold
      : theme.fontWeight.medium};
  color: ${({ $status, theme }) =>
    $status === 'upcoming' ? theme.colors.textSecondary : theme.colors.text};
  margin: 0;
`;

export const ItemSubtext = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const WaitingParentNotification = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: 8px;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.warningLight};
  color: #B45309;
  border: 1px solid #FCD34D;
`;

export const AttachedStatusBadge = styled.div<{ $variant?: 'warning' | 'success' | 'info' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: 8px;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${({ $variant, theme }) =>
    $variant === 'success'
      ? '#DCFCE7'
      : $variant === 'warning'
      ? theme.colors.warningLight
      : theme.colors.primaryLight};
  color: ${({ $variant, theme }) =>
    $variant === 'success'
      ? '#15803D'
      : $variant === 'warning'
      ? '#B45309'
      : theme.colors.primary};
  border: 1px solid
    ${({ $variant }) =>
      $variant === 'success' ? '#86EFAC' : $variant === 'warning' ? '#FCD34D' : '#DDD6FE'};
`;

export const SessionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CardTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const IconBox = styled.div<{ $color?: string; $bg?: string }>`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: ${({ $bg, theme }) => $bg || theme.colors.primaryLight};
  color: ${({ $color, theme }) => $color || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  line-height: 1.5;
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
  padding: ${({ theme }) => theme.spacing.xs} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const InfoValue = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;
