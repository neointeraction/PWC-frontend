import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const HeaderActionsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

export const UserProfileBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-left: ${({ theme }) => theme.spacing.md};
`;

export const UserAvatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
`;

export const UserInfoText = styled.div`
  display: flex;
  flex-direction: column;

  span:first-child {
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }

  span:last-child {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const ContractBannerCard = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.surface} 0%,
    ${({ theme }) => theme.colors.primaryLight} 100%
  );
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ContractBannerTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const ContractMetaGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ContractDatesText = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const DaysElapsedText = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $percent: number; $color?: string }>`
  width: ${({ $percent }) => Math.min(Math.max($percent, 0), 100)}%;
  height: 100%;
  background-color: ${({ theme, $color }) => $color || theme.colors.primary};
  border-radius: 4px;
  transition: width 0.4s ease;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

export const ProgressList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ProgressItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ProgressLabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProgressStageName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const ProgressCountText = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const TeamList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TeamMemberCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const TeamMemberLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TeamMemberAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const TeamMemberInfo = styled.div`
  display: flex;
  flex-direction: column;

  span:first-child {
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }

  span:last-child {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const SessionCountsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const SessionMetricCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 600;
  }

  span:last-child {
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }
`;
