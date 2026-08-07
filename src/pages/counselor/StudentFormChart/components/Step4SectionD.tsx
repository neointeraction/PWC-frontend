import React from 'react';
import { CounsellorFormChartData, ReliabilityCardData } from '@/mocks/studentFormChart.mock';
import { SynthesisNotesPanel } from './SynthesisNotesPanel';
import {
  StepHeaderCard,
  StepHeaderTitle,
  StepHeaderDescription,
  ReliabilityCard,
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
  { code: 'G1', placeholder: 'G1 · Assessment validity and integrity observation...' },
  { code: 'G2', placeholder: 'G2 · Consistency across test modules note...' },
  { code: 'G3', placeholder: 'G3 · Self-awareness vs test alignment note...' },
  { code: 'G4', placeholder: 'G4 · Diagnostic confidence for parent communication...' },
  { code: 'G5', placeholder: 'G5 · Overall assessment reliability conclusion...' },
];

export const Step4SectionD: React.FC<Step4SectionDProps> = ({
  data,
  onChangeIndicator,
  onChangeNotes,
}) => {
  return (
    <>
      <StepHeaderCard>
        <StepHeaderTitle>Section D · Reliability of the Assessment</StepHeaderTitle>
        <StepHeaderDescription>
          Validates the integrity, consistency, and diagnostic reliability of the student psychometric test responses across 4 core indicators.
        </StepHeaderDescription>
      </StepHeaderCard>

      {data.indicators.map(item => (
        <ReliabilityCard key={item.code}>
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
        </ReliabilityCard>
      ))}

      <SynthesisNotesPanel
        title="Section D — Counsellor Synthesis Notes (G1–G5)"
        rows={synthesisRowsGDef}
        notes={data.synthesisNotes}
        onChangeNote={onChangeNotes}
      />
    </>
  );
};
