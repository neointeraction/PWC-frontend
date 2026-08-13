import React from 'react';
import { CounsellorFormChartData, ReliabilityCardData } from '@/mocks/studentFormChart.mock';
import { SynthesisNotesPanel } from './SynthesisNotesPanel';
import {
  StepHeaderCard,
  StepHeaderTitle,
  StepHeaderDescription,
  SectionBlock,
  IndicatorBlock,
  ReliabilityCardHeader,
  IndicatorTitle,
  IndicatorQuestion,
  FormInput,
  FormTextarea,
} from '../StudentFormChartPage.styles';

interface Step4SectionDProps {
  data: CounsellorFormChartData['sectionD'];
  onChangeIndicator: (code: string, updated: Partial<ReliabilityCardData>) => void;
  onChangeNotes: (code: string, value: string) => void;
}

const synthesisRowsGDef = [
  { code: 'G1', placeholder: "EIM follow-up : If below 75%, plan to gently re-probe Mirror Pair items conversationally, rather than presenting the personality profile as fixed." },
  { code: 'G2', placeholder: "AAI / 'Don't Know' pattern : A high proportion of 'Don't Know' responses signals genuine uncertainty, low confidence, or disengagement, not necessarily low ability. Note which specific aptitude areas had the most 'Don't Know' responses and frame these as development opportunities if required in career planning or academics. Read this with ACI parameter also." },
  { code: 'G3', placeholder: "Re-assessment Call : Based on the reliability picture, note whether a full re-assessment is warranted, or whether a supplementary conversation in-session is sufficient to firm up the profile." },
];

export const Step4SectionD: React.FC<Step4SectionDProps> = ({
  data,
  onChangeIndicator,
  onChangeNotes,
}) => {
  return (
    <>
      <StepHeaderCard>
        <StepHeaderTitle>Reliability of the Assessment</StepHeaderTitle>
        <StepHeaderDescription>
          Validates the integrity, consistency, and diagnostic reliability of the student psychometric test responses across 4 core indicators.
        </StepHeaderDescription>
      </StepHeaderCard>

      <SectionBlock>
        {data.indicators.map(item => (
          <IndicatorBlock key={item.code}>
            <ReliabilityCardHeader>
              <div>
                <IndicatorTitle>
                  {item.code} — {item.name}
                </IndicatorTitle>
                <IndicatorQuestion>{item.guidingQuestion}</IndicatorQuestion>
              </div>
              <div style={{ minWidth: '220px' }}>
                <FormInput
                  value={item.valueStatus}
                  onChange={e => onChangeIndicator(item.code, { valueStatus: e.target.value })}
                  placeholder="e.g. 95% — High / Not Provided"
                  style={{ fontWeight: 700 }}
                />
              </div>
            </ReliabilityCardHeader>

            <FormTextarea
              value={item.explanationText}
              onChange={e => onChangeIndicator(item.code, { explanationText: e.target.value })}
              placeholder={`Explanatory analysis for ${item.name}...`}
              style={{ minHeight: '60px' }}
            />
          </IndicatorBlock>
        ))}
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
