import React from 'react';
import { RiShieldCheckLine } from 'react-icons/ri';
import { ReliabilityMetric } from '@/types/studentIkigaiReport.types';
import { CounsellorInsightsCard } from './CounsellorInsightsCard';
import {
  ReportSectionBlock,
  SectionHeaderGroup,
  SectionTitle,
  SectionSubtitle,
  TraitMapTableContainer,
  TraitMapHeaderRow,
  TraitMapDataRow,
  TraitCell,
  TextCardTitle,
  TextCardBody,
} from '../StudentCareerIkigaiReportPage.styles';

interface ReliabilityDashboardSectionProps {
  metrics: ReliabilityMetric[];
  notes?: Record<string, string>;
}

// "What this Tells Us" — F1 onwards, per the Design Destiny template's Reliability page.
const INSIGHT_GROUPS = [{ prefix: 'F', title: 'What this Tells Us' }] as const;

// Student-facing guiding question per code — the template deliberately hides the underlying
// percentage/score from students and shows only this plain-language question, the grading
// label, and what that grading means.
const METRIC_QUESTION: Record<string, string> = {
  EIM: 'How consistent were your personality answers?',
  ACI: 'How logically did aptitude answers progress?',
  AAI: "How many questions were marked 'Not Sure'?",
  HRS: 'Whether you moved through the assessment at a comfortable, thoughtful pace?',
};

const RELIABILITY_GRID_COLUMNS = '130px 1.8fr 2.2fr';

export const ReliabilityDashboardSection: React.FC<ReliabilityDashboardSectionProps> = ({
  metrics,
  notes = {},
}) => {
  return (
    <ReportSectionBlock id="reliability-dashboard">
      <SectionHeaderGroup>
        <SectionTitle>
          <RiShieldCheckLine size={24} />
          How Is My Assessment Reliability
        </SectionTitle>
        <SectionSubtitle>Assessment Integrity Check</SectionSubtitle>
      </SectionHeaderGroup>

      <TextCardBody>
        This isn&rsquo;t a score on you. It&rsquo;s a check on how steady, confident and natural
        your responses were.
      </TextCardBody>

      {metrics.map(item => (
        <div key={item.code} style={{ marginBottom: '16px' }}>
          <TextCardTitle style={{ fontSize: '0.95rem', marginBottom: '6px' }}>{item.name}</TextCardTitle>
          <TraitMapTableContainer>
            <TraitMapHeaderRow style={{ gridTemplateColumns: RELIABILITY_GRID_COLUMNS, minWidth: 0 }}>
              <TraitCell>Status</TraitCell>
              <TraitCell>Measure</TraitCell>
              <TraitCell>Explanation</TraitCell>
            </TraitMapHeaderRow>
            <TraitMapDataRow style={{ gridTemplateColumns: RELIABILITY_GRID_COLUMNS, minWidth: 0 }}>
              <TraitCell style={{ alignItems: 'flex-start', fontWeight: 700 }}>{item.status}</TraitCell>
              <TraitCell style={{ alignItems: 'flex-start', fontStyle: 'italic' }}>
                {METRIC_QUESTION[item.code] ?? item.name}
              </TraitCell>
              <TraitCell style={{ alignItems: 'flex-start' }}>{item.guidance}</TraitCell>
            </TraitMapDataRow>
          </TraitMapTableContainer>
        </div>
      ))}

      <CounsellorInsightsCard notes={notes} groups={INSIGHT_GROUPS} />
    </ReportSectionBlock>
  );
};
