import React from 'react';
import { CounsellorFormChartData } from '@/mocks/studentFormChart.mock';
import { ComparisonTable } from './ComparisonTable';
import { SynthesisNotesPanel } from './SynthesisNotesPanel';
import {
  StepHeaderCard,
  StepHeaderTitle,
  StepHeaderDescription,
  SectionBlock,
} from '../StudentFormChartPage.styles';

interface Step1SectionAProps {
  data: CounsellorFormChartData['sectionA'];
  onChangeNotes: (code: string, value: string) => void;
}

const synthesisRowsDef = [
  { code: 'A1', placeholder: 'A1 · Subject Preferences & Academic Performance synthesis...' },
  { code: 'A2', placeholder: 'A2 · Non-Academic Activities, Hobbies & Learning Mode synthesis...' },
  { code: 'A3', placeholder: 'A3 · Academic vs Non-Academic Balance synthesis...' },
  { code: 'A4', placeholder: 'A4 · Preferred Learning Style alignment notes...' },
  { code: 'A5', placeholder: 'A5 · Overall Section A conclusion & observation...' },
];

export const Step1SectionA: React.FC<Step1SectionAProps> = ({ data, onChangeNotes }) => {
  return (
    <>
      <StepHeaderCard>
        <StepHeaderTitle>Section A · Academics & Non-Academics</StepHeaderTitle>
        <StepHeaderDescription>
          Side-by-side comparison of pre-counselling questionnaires regarding favourite subjects, extracurricular achievements, hobbies, and learning modes, followed by counsellor synthesis notes.
        </StepHeaderDescription>
      </StepHeaderCard>

      <SectionBlock>
        <ComparisonTable groups={data.comparisonGroups} />
      </SectionBlock>

      <SynthesisNotesPanel
        title="Section A — Counsellor Synthesis Notes (A1–A5)"
        rows={synthesisRowsDef}
        notes={data.synthesisNotes}
        onChangeNote={onChangeNotes}
      />
    </>
  );
};
