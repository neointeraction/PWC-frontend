import React, { useState, useMemo } from 'react';
import {
  RiUserHeartLine,
  RiUserFollowLine,
  RiVideoChatLine,
  RiCalendarEventLine,
  RiFileWarningLine,
  RiCloseCircleLine,
} from 'react-icons/ri';
import { Card } from '@/components/Card';
import { Select } from '@/components/Select';
import { DASHBOARD_MOCKS } from '@/mocks/dashboard.mock';
import {
  WidgetHeaderRow,
  WidgetTitleGroup,
  WidgetTitle,
  WidgetSubtitle,
  CounselorGrid,
  MetricCard,
  MetricCardHeader,
  MetricLabelGroup,
  MetricIconBadge,
  MetricTitleText,
  MetricVal,
  MetricSubtext,
} from './ProjectCounselorStatsWidget.styles';

export const ProjectCounselorStatsWidget: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('all');

  const projectOptions = useMemo(
    () => [
      { value: 'all', label: 'All Projects Combined' },
      ...DASHBOARD_MOCKS.projectCounselorStats.map(p => ({
        value: p.projectId,
        label: p.projectName,
      })),
    ],
    []
  );

  const aggregatedStats = useMemo(() => {
    const statsList = DASHBOARD_MOCKS.projectCounselorStats;

    if (selectedProjectId !== 'all') {
      const match = statsList.find(p => p.projectId === selectedProjectId);
      return match ? [match] : statsList;
    }

    return statsList;
  }, [selectedProjectId]);

  const totals = useMemo(() => {
    return aggregatedStats.reduce(
      (acc, curr) => ({
        totalCounselors: acc.totalCounselors + curr.totalCounselors,
        available: acc.available + curr.available,
        sessionsCompleted: acc.sessionsCompleted + curr.sessionsCompleted,
        upcomingSessions: acc.upcomingSessions + curr.upcomingSessions,
        pendingReports: acc.pendingReports + curr.pendingReports,
        sessionsMissed: acc.sessionsMissed + curr.sessionsMissed,
      }),
      {
        totalCounselors: 0,
        available: 0,
        sessionsCompleted: 0,
        upcomingSessions: 0,
        pendingReports: 0,
        sessionsMissed: 0,
      }
    );
  }, [aggregatedStats]);

  const metrics = [
    {
      id: 'total',
      title: 'Total Counsellors',
      value: totals.totalCounselors,
      subtext: 'Assigned to selected project',
      icon: <RiUserHeartLine size={18} />,
      iconBg: '#EEF2FF',
      iconColor: '#4F46E5',
      valColor: '#4F46E5',
    },
    {
      id: 'available',
      title: 'Available Counsellors',
      value: totals.available,
      subtext: 'Ready to accept new bookings',
      icon: <RiUserFollowLine size={18} />,
      iconBg: '#ECFDF5',
      iconColor: '#059669',
      valColor: '#059669',
    },
    {
      id: 'completed',
      title: 'Sessions Completed',
      value: totals.sessionsCompleted,
      subtext: 'Successfully conducted',
      icon: <RiVideoChatLine size={18} />,
      iconBg: '#EFF6FF',
      iconColor: '#2563EB',
      valColor: '#2563EB',
    },
    {
      id: 'upcoming',
      title: 'Upcoming Sessions',
      value: totals.upcomingSessions,
      subtext: 'Scheduled in calendar',
      icon: <RiCalendarEventLine size={18} />,
      iconBg: '#FAF5FF',
      iconColor: '#9333EA',
      valColor: '#9333EA',
    },
    {
      id: 'pendingReports',
      title: 'Pending Reports',
      value: totals.pendingReports,
      subtext: 'Awaiting report submission',
      icon: <RiFileWarningLine size={18} />,
      iconBg: '#FEF3C7',
      iconColor: '#D97706',
      valColor: '#D97706',
    },
    {
      id: 'missed',
      title: 'Sessions Missed',
      value: totals.sessionsMissed,
      subtext: 'Missed or no-show sessions',
      icon: <RiCloseCircleLine size={18} />,
      iconBg: '#FEF2F2',
      iconColor: '#DC2626',
      valColor: '#DC2626',
    },
  ];

  return (
    <Card>
      <WidgetHeaderRow>
        <WidgetTitleGroup>
          <WidgetTitle>Counsellor Stats (Project Wise)</WidgetTitle>
          <WidgetSubtitle>Counsellor deployment, availability, and session metrics</WidgetSubtitle>
        </WidgetTitleGroup>
        <Select
          value={selectedProjectId}
          onChange={e => setSelectedProjectId(e.target.value)}
          options={projectOptions}
          fullWidth={false}
          style={{ minWidth: 220 }}
        />
      </WidgetHeaderRow>

      <CounselorGrid>
        {metrics.map(m => (
          <MetricCard key={m.id}>
            <MetricCardHeader>
              <MetricLabelGroup>
                <MetricIconBadge $bg={m.iconBg} $color={m.iconColor}>
                  {m.icon}
                </MetricIconBadge>
                <MetricTitleText>{m.title}</MetricTitleText>
              </MetricLabelGroup>
            </MetricCardHeader>
            <MetricVal $color={m.valColor}>{m.value}</MetricVal>
            <MetricSubtext>{m.subtext}</MetricSubtext>
          </MetricCard>
        ))}
      </CounselorGrid>
    </Card>
  );
};
