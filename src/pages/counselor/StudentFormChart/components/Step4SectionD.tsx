import React from 'react';
import { CounsellorFormChartData, ReliabilityCardData } from '@/mocks/studentFormChart.mock';
import { SynthesisNotesPanel } from './SynthesisNotesPanel';
import {
  StepHeaderCard,
  StepHeaderTitle,
  SectionBlock,
  IndicatorBlock,
  ReliabilityCardHeader,
  IndicatorTitle,
  IndicatorQuestion,
  ReliabilityValueDisplay,
  ReliabilityExplanationBox,
} from '../StudentFormChartPage.styles';

interface Step4SectionDProps {
  data: CounsellorFormChartData['sectionD'];
  onChangeIndicator?: (code: string, updated: Partial<ReliabilityCardData>) => void;
  onChangeNotes: (code: string, value: string) => void;
}

// F1-F3 (not G1-G3 — those codes belong to the SCRI step's synthesis notes on the
// backend; reusing them here would silently collide with Step6SCRI's saved notes).
const synthesisRowsGDef = [
  { code: 'F1', placeholder: "EIM follow-up : If below 75%, plan to gently re-probe Mirror Pair items conversationally, rather than presenting the personality profile as fixed." },
  { code: 'F2', placeholder: "AAI / 'Don't Know' pattern : A high proportion of 'Don't Know' responses signals genuine uncertainty, low confidence, or disengagement, not necessarily low ability. Note which specific aptitude areas had the most 'Don't Know' responses and frame these as development opportunities if required in career planning or academics. Read this with ACI parameter also." },
  { code: 'F3', placeholder: "Re-assessment Call : Based on the reliability picture, note whether a full re-assessment is warranted, or whether a supplementary conversation in-session is sufficient to firm up the profile." },
];

export const Step4SectionD: React.FC<Step4SectionDProps> = ({
  data,
  onChangeNotes,
}) => {
  return (
    <>
      <StepHeaderCard>
        <StepHeaderTitle>Reliability of the Assessment</StepHeaderTitle>
      </StepHeaderCard>

      <SectionBlock>
        {data.indicators.map(item => {
          // Parse score (e.g. "76%") and label (e.g. "High reliability")
          const parts = item.valueStatus.split(' ');
          const firstPartIsPercent = parts[0]?.includes('%');
          const score = firstPartIsPercent ? parts[0] : '';
          const label = firstPartIsPercent ? parts.slice(1).join(' ') : item.valueStatus;

          return (
            <IndicatorBlock
              key={item.code}
              style={{
                border: '1px solid #E2E8F0',
                borderRadius: '4px',
                padding: '16px 18px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
              }}
            >
              <ReliabilityCardHeader>
                <div>
                  <IndicatorTitle>
                    {item.code} — {item.name}
                  </IndicatorTitle>
                  <IndicatorQuestion>{item.guidingQuestion}</IndicatorQuestion>
                </div>
                <ReliabilityValueDisplay>
                  {score && (
                    <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0F172A' }}>
                      {score}
                    </span>
                  )}
                  <span
                    style={{
                      fontWeight: 600,
                      fontStyle: 'italic',
                      color:
                        label.toLowerCase().includes('high') || label.toLowerCase().includes('optimal')
                          ? '#16A34A'
                          : '#0F172A',
                      fontSize: '0.95rem',
                    }}
                  >
                    {label}
                  </span>
                </ReliabilityValueDisplay>
              </ReliabilityCardHeader>

              <ReliabilityExplanationBox>
                {item.explanationText}
              </ReliabilityExplanationBox>
            </IndicatorBlock>
          );
        })}
      </SectionBlock>

      <SynthesisNotesPanel
        title="Counsellor Synthesis Notes"
        rows={synthesisRowsGDef}
        notes={data.synthesisNotes}
        onChangeNote={onChangeNotes}
      />
    </>
  );
};
