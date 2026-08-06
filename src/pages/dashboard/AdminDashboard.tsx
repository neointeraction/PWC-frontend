import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { useTheme } from 'styled-components';
import { DASHBOARD_MOCKS } from '@/mocks/dashboard.mock';
import {
  DashboardContainer,
  StatsGrid,
  StatMetricValue,
  MetaText,
  ChartsGrid,
  ChartContainer,
  MainContentGrid,
  ListContainer,
  ListItem,
  ListItemTitle,
  ListItemMeta,
} from './AdminDashboard.styles';

export const AdminDashboard: React.FC = () => {
  const theme = useTheme();

  return (
    <DashboardContainer>
      <PageHeader
        title="Admin Dashboard"
        subtitle="Overview of platform administration, projects, and sessions"
        breadcrumbs={[{ label: 'Dashboard' }]}
      />

      {/* Top Stats Grid */}
      <StatsGrid style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <Card title="Total Projects">
          <StatMetricValue>{DASHBOARD_MOCKS.stats.totalProjects}</StatMetricValue>
          <MetaText>Active projects</MetaText>
        </Card>
        <Card title="Total Counselors">
          <StatMetricValue>{DASHBOARD_MOCKS.stats.totalCounselors}</StatMetricValue>
          <MetaText>Assigned counselors</MetaText>
        </Card>
      </StatsGrid>

      {/* Charts Grid */}
      <ChartsGrid>
        <Card title="Student Session Progress" subtitle="Completed vs Pending sessions">
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DASHBOARD_MOCKS.studentSessionProgress}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.colors.border} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: theme.colors.textSecondary, fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: theme.colors.textSecondary, fontSize: 12 }}
                />
                <RechartsTooltip
                  cursor={{ fill: theme.colors.surfaceHover }}
                  contentStyle={{
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                    borderRadius: '4px',
                    boxShadow: theme.colors.shadowLg,
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {DASHBOARD_MOCKS.studentSessionProgress.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>

        <Card title="Counselor Report Status" subtitle="Overview of pending vs submitted reports">
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DASHBOARD_MOCKS.counselorReportStatuses}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DASHBOARD_MOCKS.counselorReportStatuses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                    borderRadius: '4px',
                    boxShadow: theme.colors.shadowLg,
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>
      </ChartsGrid>

      {/* Main Content Grid: Upcoming Counseling Sessions */}
      <MainContentGrid style={{ gridTemplateColumns: '1fr' }}>
        <Card title="Upcoming Counseling Sessions">
          <ListContainer>
            {DASHBOARD_MOCKS.upcomingSessions.map((session) => (
              <ListItem key={session.id}>
                <ListItemTitle>{session.title}</ListItemTitle>
                <ListItemMeta>
                  {session.counselor} • {new Date(session.date).toLocaleDateString()}
                </ListItemMeta>
              </ListItem>
            ))}
          </ListContainer>
        </Card>
      </MainContentGrid>
    </DashboardContainer>
  );
};

export default AdminDashboard;
