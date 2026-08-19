import React, { useState, useMemo } from 'react';
import {
  RiUser3Line,
  RiShieldCheckLine,
  RiFileTextLine,
  RiFileEditLine,
  RiCheckboxCircleLine,
  RiCalendarEventLine,
  RiVideoChatLine,
  RiFeedbackLine,
  RiFilePdfLine,
} from 'react-icons/ri';
import { Card } from '@/components/Card';
import { Select } from '@/components/Select';
import { DASHBOARD_MOCKS } from '@/mocks/dashboard.mock';
import {
  WidgetHeaderRow,
  WidgetTitleGroup,
  WidgetTitle,
  StatsGrid,
  ModernStatCard,
  CardHeader,
  CardTitleGroup,
  CardIconBox,
  CardTitleText,
  PercentBadge,
  ProgressBarTrack,
  ProgressBarFill,
  StatsValuesRow,
  StatItem,
  DotIndicator,
  StatItemContent,
  StatItemLabel,
  StatItemNum,
} from './ProjectStudentStatsWidget.styles';

export const ProjectStudentStatsWidget: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('all');

  const projectOptions = useMemo(
    () => [
      { value: 'all', label: 'All Projects Combined' },
      ...DASHBOARD_MOCKS.projectStudentStats.map(p => ({
        value: p.projectId,
        label: p.projectName,
      })),
    ],
    []
  );

  const aggregatedStats = useMemo(() => {
    const statsList = DASHBOARD_MOCKS.projectStudentStats;

    if (selectedProjectId !== 'all') {
      const match = statsList.find(p => p.projectId === selectedProjectId);
      return match ? [match] : statsList;
    }

    return statsList;
  }, [selectedProjectId]);

  const totals = useMemo(() => {
    return aggregatedStats.reduce(
      (acc, curr) => ({
        totalStudents: acc.totalStudents + curr.totalStudents,
        loginsActivated: acc.loginsActivated + curr.logins.activated,
        loginsNotActivated: acc.loginsNotActivated + curr.logins.notActivated,
        profileFormsCompleted: acc.profileFormsCompleted + curr.profileForms.completed,
        profileFormsPending: acc.profileFormsPending + curr.profileForms.pending,
        preCounsellingCompleted: acc.preCounsellingCompleted + curr.preCounsellingForms.completed,
        preCounsellingPending: acc.preCounsellingPending + curr.preCounsellingForms.pending,
        assessmentsCompleted: acc.assessmentsCompleted + curr.assessments.completed,
        assessmentsPending: acc.assessmentsPending + curr.assessments.pending,
        bookingDone: acc.bookingDone + curr.sessionBooking.done,
        bookingNotDone: acc.bookingNotDone + curr.sessionBooking.notDone,
        sessionsCompleted: acc.sessionsCompleted + curr.sessions.completed,
        sessionsPending: acc.sessionsPending + curr.sessions.pending,
        feedbackCompleted: acc.feedbackCompleted + curr.feedback.completed,
        feedbackPending: acc.feedbackPending + curr.feedback.pending,
        reportsGenerated: acc.reportsGenerated + curr.reports.generated,
        reportsPending: acc.reportsPending + curr.reports.pending,
      }),
      {
        totalStudents: 0,
        loginsActivated: 0,
        loginsNotActivated: 0,
        profileFormsCompleted: 0,
        profileFormsPending: 0,
        preCounsellingCompleted: 0,
        preCounsellingPending: 0,
        assessmentsCompleted: 0,
        assessmentsPending: 0,
        bookingDone: 0,
        bookingNotDone: 0,
        sessionsCompleted: 0,
        sessionsPending: 0,
        feedbackCompleted: 0,
        feedbackPending: 0,
        reportsGenerated: 0,
        reportsPending: 0,
      }
    );
  }, [aggregatedStats]);

  const calcPercent = (val: number, total: number) => {
    if (!total) return 0;
    return Math.round((val / total) * 100);
  };

  const stages = [
    {
      id: 'logins',
      title: 'Logins',
      icon: <RiShieldCheckLine size={18} />,
      iconBg: '#EEF2FF',
      iconColor: '#4F46E5',
      primaryLabel: 'Activated',
      primaryVal: totals.loginsActivated,
      primaryColor: '#059669',
      primaryDot: '#10B981',
      secondaryLabel: 'Not Activated',
      secondaryVal: totals.loginsNotActivated,
      secondaryColor: '#D97706',
      secondaryDot: '#F59E0B',
      percent: calcPercent(totals.loginsActivated, totals.totalStudents),
      fillColor: '#10B981',
    },
    {
      id: 'profileForms',
      title: 'Profile Forms',
      icon: <RiUser3Line size={18} />,
      iconBg: '#F0F9FF',
      iconColor: '#0284C7',
      primaryLabel: 'Completed',
      primaryVal: totals.profileFormsCompleted,
      primaryColor: '#059669',
      primaryDot: '#10B981',
      secondaryLabel: 'Pending',
      secondaryVal: totals.profileFormsPending,
      secondaryColor: '#D97706',
      secondaryDot: '#F59E0B',
      percent: calcPercent(totals.profileFormsCompleted, totals.totalStudents),
      fillColor: '#10B981',
    },
    {
      id: 'preCounselling',
      title: 'Pre-Counselling',
      icon: <RiFileTextLine size={18} />,
      iconBg: '#FAF5FF',
      iconColor: '#9333EA',
      primaryLabel: 'Completed',
      primaryVal: totals.preCounsellingCompleted,
      primaryColor: '#059669',
      primaryDot: '#10B981',
      secondaryLabel: 'Pending',
      secondaryVal: totals.preCounsellingPending,
      secondaryColor: '#D97706',
      secondaryDot: '#F59E0B',
      percent: calcPercent(totals.preCounsellingCompleted, totals.totalStudents),
      fillColor: '#10B981',
    },
    {
      id: 'assessments',
      title: 'Assessments',
      icon: <RiFileEditLine size={18} />,
      iconBg: '#FFF1F2',
      iconColor: '#E11D48',
      primaryLabel: 'Completed',
      primaryVal: totals.assessmentsCompleted,
      primaryColor: '#059669',
      primaryDot: '#10B981',
      secondaryLabel: 'Pending',
      secondaryVal: totals.assessmentsPending,
      secondaryColor: '#D97706',
      secondaryDot: '#F59E0B',
      percent: calcPercent(totals.assessmentsCompleted, totals.totalStudents),
      fillColor: '#10B981',
    },
    {
      id: 'sessionBooking',
      title: 'Session Booking',
      icon: <RiCalendarEventLine size={18} />,
      iconBg: '#F0FDF4',
      iconColor: '#16A34A',
      primaryLabel: 'Done',
      primaryVal: totals.bookingDone,
      primaryColor: '#059669',
      primaryDot: '#10B981',
      secondaryLabel: 'Not Done',
      secondaryVal: totals.bookingNotDone,
      secondaryColor: '#D97706',
      secondaryDot: '#F59E0B',
      percent: calcPercent(totals.bookingDone, totals.totalStudents),
      fillColor: '#10B981',
    },
    {
      id: 'sessions',
      title: 'Sessions',
      icon: <RiVideoChatLine size={18} />,
      iconBg: '#EFF6FF',
      iconColor: '#2563EB',
      primaryLabel: 'Completed',
      primaryVal: totals.sessionsCompleted,
      primaryColor: '#059669',
      primaryDot: '#10B981',
      secondaryLabel: 'Pending',
      secondaryVal: totals.sessionsPending,
      secondaryColor: '#D97706',
      secondaryDot: '#F59E0B',
      percent: calcPercent(totals.sessionsCompleted, totals.totalStudents),
      fillColor: '#10B981',
    },
    {
      id: 'feedback',
      title: 'Feedback',
      icon: <RiFeedbackLine size={18} />,
      iconBg: '#FDF4FF',
      iconColor: '#C026D3',
      primaryLabel: 'Completed',
      primaryVal: totals.feedbackCompleted,
      primaryColor: '#059669',
      primaryDot: '#10B981',
      secondaryLabel: 'Pending',
      secondaryVal: totals.feedbackPending,
      secondaryColor: '#D97706',
      secondaryDot: '#F59E0B',
      percent: calcPercent(totals.feedbackCompleted, totals.totalStudents),
      fillColor: '#10B981',
    },
    {
      id: 'reports',
      title: 'Reports',
      icon: <RiFilePdfLine size={18} />,
      iconBg: '#FEF3C7',
      iconColor: '#D97706',
      primaryLabel: 'Generated',
      primaryVal: totals.reportsGenerated,
      primaryColor: '#059669',
      primaryDot: '#10B981',
      secondaryLabel: 'Pending',
      secondaryVal: totals.reportsPending,
      secondaryColor: '#D97706',
      secondaryDot: '#F59E0B',
      percent: calcPercent(totals.reportsGenerated, totals.totalStudents),
      fillColor: '#10B981',
    },
  ];

  const overallCompletionRate = calcPercent(totals.reportsGenerated, totals.totalStudents);

  return (
    <Card>
      <WidgetHeaderRow>
        <WidgetTitleGroup>
          <WidgetTitle>Student Progress Stats (Project Wise)</WidgetTitle>
        </WidgetTitleGroup>
        <Select
          value={selectedProjectId}
          onChange={e => setSelectedProjectId(e.target.value)}
          options={projectOptions}
          fullWidth={false}
          style={{ minWidth: 220 }}
        />
      </WidgetHeaderRow>

      <StatsGrid>
        {stages.map(stage => (
          <ModernStatCard key={stage.id}>
            <CardHeader>
              <CardTitleGroup>
                <CardIconBox $bg={stage.iconBg} $color={stage.iconColor}>
                  {stage.icon}
                </CardIconBox>
                <CardTitleText>{stage.title}</CardTitleText>
              </CardTitleGroup>
              <PercentBadge>{stage.percent}%</PercentBadge>
            </CardHeader>

            <ProgressBarTrack>
              <ProgressBarFill $percent={stage.percent} $color={stage.fillColor} />
            </ProgressBarTrack>

            <StatsValuesRow>
              <StatItem>
                <DotIndicator $color={stage.primaryDot} />
                <StatItemContent>
                  <StatItemLabel>{stage.primaryLabel}</StatItemLabel>
                  <StatItemNum $color={stage.primaryColor}>{stage.primaryVal}</StatItemNum>
                </StatItemContent>
              </StatItem>

              <StatItem>
                <DotIndicator $color={stage.secondaryDot} />
                <StatItemContent>
                  <StatItemLabel>{stage.secondaryLabel}</StatItemLabel>
                  <StatItemNum $color={stage.secondaryColor}>{stage.secondaryVal}</StatItemNum>
                </StatItemContent>
              </StatItem>
            </StatsValuesRow>
          </ModernStatCard>
        ))}

        {/* Hero Overall Summary Card */}
        <ModernStatCard $isFeatured style={{ backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1' }}>
          <CardHeader>
            <CardTitleGroup>
              <CardIconBox $bg="#DCFCE7" $color="#059669">
                <RiCheckboxCircleLine size={18} />
              </CardIconBox>
              <CardTitleText style={{ color: '#0F172A' }}>Overall Completion</CardTitleText>
            </CardTitleGroup>
            <PercentBadge $bg="#059669" $color="#FFFFFF">
              {overallCompletionRate}% Rate
            </PercentBadge>
          </CardHeader>

          <ProgressBarTrack style={{ backgroundColor: '#CBD5E1' }}>
            <ProgressBarFill $percent={overallCompletionRate} $color="#059669" />
          </ProgressBarTrack>

          <StatsValuesRow>
            <StatItem>
              <DotIndicator $color="#2563EB" />
              <StatItemContent>
                <StatItemLabel>Total Students</StatItemLabel>
                <StatItemNum $color="#1E40AF">{totals.totalStudents}</StatItemNum>
              </StatItemContent>
            </StatItem>

            <StatItem>
              <DotIndicator $color="#10B981" />
              <StatItemContent>
                <StatItemLabel>Reports Done</StatItemLabel>
                <StatItemNum $color="#059669">{totals.reportsGenerated}</StatItemNum>
              </StatItemContent>
            </StatItem>
          </StatsValuesRow>
        </ModernStatCard>
      </StatsGrid>
    </Card>
  );
};
