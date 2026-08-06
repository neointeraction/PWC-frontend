import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  RiBellLine,
  RiCheckboxCircleLine,
  RiSettings4Line,
  RiShieldLine,
  RiTeamLine,
  RiBookOpenLine,
} from 'react-icons/ri';
import styled from 'styled-components';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Loader } from '@/components/Loader';
import { dashboardService } from '@/services/dashboard.service';
import { DASHBOARD_MOCKS } from '@/mocks/dashboard.mock';
import { ROUTES } from '@/constants';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ListItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
`;

const ListItemTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 4px 0;
`;

const ListItemMeta = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const StatMetricValue = styled.div<{ $variant?: 'success' | 'warning' | 'info' | 'default' }>`
  font-size: ${({ theme }) => theme.fontSize.display};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme, $variant }) => {
    if ($variant === 'success') return theme.colors.success;
    if ($variant === 'warning') return theme.colors.warning;
    if ($variant === 'info') return theme.colors.info;
    return theme.colors.text;
  }};
  margin-top: 4px;
`;

const MetaText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 4px;
`;

const WelcomeBanner = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.surface} 0%,
    ${({ theme }) => theme.colors.primaryLight} 100%
  );
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const WelcomeText = styled.div`
  h2 {
    font-size: ${({ theme }) => theme.fontSize.xxl};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 4px;
  }

  p {
    font-size: ${({ theme }) => theme.fontSize.base};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const StatBadgeRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const PillStat = styled.span`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.primary};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const ActionCardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  p {
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const QuickActionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const QuickActionItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    transform: translateY(-1px);
  }
`;

const QuickActionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const QuickActionLabel = styled.p`
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

const QuickActionDesc = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const NotificationCardItem = styled.div<{ $type?: string }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme, $type }) =>
    $type === 'approval'
      ? theme.colors.warningLight
      : $type === 'reminder'
        ? theme.colors.infoLight
        : theme.colors.surfaceHover};
  border-left: 4px solid
    ${({ theme, $type }) =>
      $type === 'approval'
        ? theme.colors.warning
        : $type === 'reminder'
          ? theme.colors.info
          : theme.colors.primary};
`;

const NotifTitle = styled.p`
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-size: ${({ theme }) => theme.fontSize.base};
`;

const NotifTime = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const NotifMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 4px;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const ActivityDesc = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ActivityTime = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const SectionHeading = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  margin-bottom: 12px;
`;

const SuccessIconWrapper = styled.span`
  color: ${({ theme }) => theme.colors.success};
  display: flex;
  align-items: center;
`;

const NotifHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NotifBellIcon = styled(RiBellLine)`
  flex-shrink: 0;
  margin-top: 2px;
`;

const ActivitySectionWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SuperAdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const { data: summary, isLoading } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: dashboardService.getSummary,
  });

  if (isLoading) return <Loader />;

  return (
    <div>
      <PageHeader
        title="Super Admin Dashboard"
        subtitle="Global governance of user management, career library, and system settings"
        breadcrumbs={[{ label: 'Dashboard' }]}
      />

      <WelcomeBanner>
        <WelcomeText>
          <h2>kREATE Global Super Admin Engine</h2>
          <p>Welcome back, Super Admin! Live status of platform users and career ratifications.</p>
          <StatBadgeRow>
            <PillStat>Plan: ENTERPRISE GLOBAL</PillStat>
            <PillStat>System Status: Active</PillStat>
          </StatBadgeRow>
        </WelcomeText>
      </WelcomeBanner>

      <StatsGrid>
        <Card title="Active Users">
          <StatMetricValue
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(ROUTES.TENANT_MANAGEMENT)}
          >
            {summary?.activeStudentsCount ?? 45}
          </StatMetricValue>
          <MetaText>Registered platform users</MetaText>
        </Card>

        <Card title="Career Pathways">
          <StatMetricValue
            $variant="info"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(ROUTES.CAREER_LIBRARY)}
          >
            54
          </StatMetricValue>
          <MetaText>Published career specs</MetaText>
        </Card>

        <Card title="Daily Sessions">
          <StatMetricValue $variant="success">{summary?.sessionsTodayCount ?? 8}</StatMetricValue>
          <MetaText>System activity today</MetaText>
        </Card>

        <Card title="System Settings">
          <ActionCardContent>
            <p>Configure global platform preferences, security, and options.</p>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<RiSettings4Line size={16} />}
              onClick={() => navigate(ROUTES.SETTINGS)}
            >
              Manage Settings
            </Button>
          </ActionCardContent>
        </Card>
      </StatsGrid>

      <ContentGrid>
        <Card title="Super Admin Quick Actions" subtitle="Administrative tasks and system management">
          <QuickActionsList>
            <QuickActionItem onClick={() => navigate(ROUTES.TENANT_MANAGEMENT)}>
              <QuickActionIcon>
                <RiTeamLine size={20} />
              </QuickActionIcon>
              <div>
                <QuickActionLabel>Tenant Management</QuickActionLabel>
                <QuickActionDesc>
                  Register and manage kREATE Super Admins &amp; system users
                </QuickActionDesc>
              </div>
            </QuickActionItem>

            <QuickActionItem onClick={() => navigate(ROUTES.CAREER_LIBRARY)}>
              <QuickActionIcon>
                <RiBookOpenLine size={20} />
              </QuickActionIcon>
              <div>
                <QuickActionLabel>Career Library &amp; Pathways</QuickActionLabel>
                <QuickActionDesc>
                  Manage career pathways and bulk upload entries
                </QuickActionDesc>
              </div>
            </QuickActionItem>

            <QuickActionItem onClick={() => navigate(ROUTES.SETTINGS)}>
              <QuickActionIcon>
                <RiSettings4Line size={20} />
              </QuickActionIcon>
              <div>
                <QuickActionLabel>Super Admin Platform Settings</QuickActionLabel>
                <QuickActionDesc>
                  Configure system options, notifications, and security policies
                </QuickActionDesc>
              </div>
            </QuickActionItem>

            <QuickActionItem onClick={() => navigate(ROUTES.SETTINGS)}>
              <QuickActionIcon>
                <RiShieldLine size={20} />
              </QuickActionIcon>
              <div>
                <QuickActionLabel>Security &amp; Access Controls</QuickActionLabel>
                <QuickActionDesc>
                  Manage administrative security policies and master API keys
                </QuickActionDesc>
              </div>
            </QuickActionItem>
          </QuickActionsList>

          <div style={{ marginTop: '24px' }}>
            <Card title="Career Library Requests" subtitle="Pending requests for new career pathways">
              <ListContainer>
                {DASHBOARD_MOCKS.careerRequests.map(req => (
                  <ListItem key={req.id}>
                    <ListItemTitle>{req.title}</ListItemTitle>
                    <ListItemMeta>
                      Requested by: {req.requestedBy} • {req.date}
                    </ListItemMeta>
                  </ListItem>
                ))}
              </ListContainer>
            </Card>
          </div>
        </Card>

        <Card title="Notifications & Reminders" subtitle="System notifications and activity log">
          <NotificationList>
            {summary?.notifications.map(item => (
              <NotificationCardItem key={item.id} $type={item.type}>
                <NotifBellIcon size={20} />
                <div>
                  <NotifHeaderRow>
                    <NotifTitle>{item.title}</NotifTitle>
                    <NotifTime>{item.time}</NotifTime>
                  </NotifHeaderRow>
                  <NotifMessage>{item.message}</NotifMessage>
                </div>
              </NotificationCardItem>
            ))}
          </NotificationList>

          <ActivitySectionWrapper>
            <SectionHeading>Recent Activity</SectionHeading>
            <ActivityList>
              {summary?.recentActivities.map(act => (
                <ActivityItem key={act.id}>
                  <SuccessIconWrapper>
                    <RiCheckboxCircleLine size={18} />
                  </SuccessIconWrapper>
                  <ActivityContent>
                    <ActivityHeaderRow>
                      <ActivityTitle>{act.title}</ActivityTitle>
                      <ActivityTime>{act.time}</ActivityTime>
                    </ActivityHeaderRow>
                    <ActivityDesc>{act.description}</ActivityDesc>
                  </ActivityContent>
                </ActivityItem>
              ))}
            </ActivityList>
          </ActivitySectionWrapper>
        </Card>
      </ContentGrid>
    </div>
  );
};
