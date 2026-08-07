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

interface Step6SectionFProps {
  data: CounsellorFormChartData['sectionF'];
  onChangeNotes: (code: string, value: string) => void;
}

const synthesisRowsIDef = [
  { code: 'I1', placeholder: 'I1 · Counselling primary objective resolution notes...' },
  { code: 'I2', placeholder: 'I2 · Pre-session specific context resolution...' },
  { code: 'I3', placeholder: 'I3 · Parent & student expectation alignment...' },
  { code: 'I4', placeholder: 'I4 · PTM session follow-up commitment...' },
  { code: 'I5', placeholder: 'I5 · Overall Section F & programme conclusion...' },
];

export const Step6SectionF: React.FC<Step6SectionFProps> = ({ data, onChangeNotes }) => {
  return (
    <>
      <StepHeaderCard>
        <StepHeaderTitle>Section F · Counselling Goals & Expectations</StepHeaderTitle>
        <StepHeaderDescription>
          Side-by-side review of primary counselling session objectives and pre-session context from student and parent, followed by final counsellor synthesis notes.
        </StepHeaderDescription>
      </StepHeaderCard>

      <SectionBlock>
        <ComparisonTable groups={data.comparisonGroups} />
      </SectionBlock>

      <SynthesisNotesPanel
        title="Section F — Counsellor Synthesis Notes (I1–I5)"
        rows={synthesisRowsIDef}
        notes={data.synthesisNotes}
        onChangeNote={onChangeNotes}
      />
    </>
  );
};
