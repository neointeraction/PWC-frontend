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
  TextCardBody,
} from '../StudentCareerIkigaiReportPage.styles';

interface ReliabilityDashboardSectionProps {
  metrics: ReliabilityMetric[];
  notes?: Record<string, string>;
}

// "What this Tells Us" — F1 onwards, per the Design Destiny template's Reliability page.
const INSIGHT_GROUPS = [{ prefix: 'F', title: 'What this Tells Us' }] as const;

// Student-facing framing per code — the template deliberately hides the underlying
// percentage/score from students and shows only the plain-language question, the grading
// label, and what that grading means.
const METRIC_COPY: Record<string, { label: string; question: string }> = {
  EIM: { label: 'Consistency Score', question: 'How consistent were your personality answers?' },
  ACI: { label: 'Clear Thinking Score', question: 'How logically did aptitude answers progress?' },
  AAI: { label: 'Skill Confidence Score', question: "How many questions were marked 'Not Sure'?" },
  HRS: {
    label: 'Natural Pace Score',
    question: 'Whether you moved through the assessment at a comfortable, thoughtful pace?',
  },
};

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

      <TraitMapTableContainer>
        {metrics.map((item, idx) => {
          const copy = METRIC_COPY[item.code] ?? { label: item.name, question: item.name };
          return (
            <div
              key={item.code}
              style={{
                display: 'flex',
                borderBottom: idx < metrics.length - 1 ? '1px solid #E5E7EB' : 'none',
              }}
            >
              <div
                style={{
                  width: '180px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  padding: '12px',
                  borderRight: '1px solid #E5E7EB',
                }}
              >
                {copy.label.toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ padding: '10px 14px', fontStyle: 'italic', borderBottom: '1px solid #F1F1F4' }}>
                  {copy.question}
                </div>
                <div style={{ padding: '10px 14px', fontWeight: 700, borderBottom: '1px solid #F1F1F4' }}>
                  {item.status}
                </div>
                <div style={{ padding: '10px 14px' }}>{item.guidance}</div>
              </div>
            </div>
          );
        })}
      </TraitMapTableContainer>

      <CounsellorInsightsCard notes={notes} groups={INSIGHT_GROUPS} />
    </ReportSectionBlock>
  );
};
