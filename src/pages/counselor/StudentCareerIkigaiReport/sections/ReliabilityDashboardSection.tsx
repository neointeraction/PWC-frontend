import React from 'react';
import { RiShieldCheckLine } from 'react-icons/ri';
import { ReliabilityMetric } from '@/mocks/studentIkigaiReport.mock';
import {
  ReportSectionBlock,
  SectionHeaderGroup,
  SectionTitle,
  SectionSubtitle,
  ReliabilityGrid,
  ReliabilityMetricCard,
  MetricCode,
  MetricValue,
  MetricName,
  MetricGuidance,
} from '../StudentCareerIkigaiReportPage.styles';

interface ReliabilityDashboardSectionProps {
  metrics: ReliabilityMetric[];
}

export const ReliabilityDashboardSection: React.FC<ReliabilityDashboardSectionProps> = ({
  metrics,
}) => {
  return (
    <ReportSectionBlock id="reliability-dashboard">
      <SectionHeaderGroup>
        <SectionTitle>
          <RiShieldCheckLine size={24} />
          4. Reliability Dashboard — Assessment Integrity Check
        </SectionTitle>
        <SectionSubtitle>
          Diagnostic verification measures confirming engagement integrity, testing consistency, self-awareness accuracy, and overall score reliability.
        </SectionSubtitle>
      </SectionHeaderGroup>

      <ReliabilityGrid>
        {metrics.map(item => (
          <ReliabilityMetricCard key={item.code}>
            <MetricCode>{item.code}</MetricCode>
            <MetricValue>{item.score}</MetricValue>
            <MetricName>{item.name}</MetricName>
            <MetricGuidance>{item.guidance}</MetricGuidance>
          </ReliabilityMetricCard>
        ))}
      </ReliabilityGrid>
    </ReportSectionBlock>
  );
};
