import React from 'react';
import { CounsellorFormChartData } from '@/mocks/studentFormChart.mock';
import { ComparisonTable } from './ComparisonTable';
import { SynthesisNotesPanel } from './SynthesisNotesPanel';
import {
  StepHeaderCard,
  StepHeaderTitle,
  SectionBlock,
} from '../StudentFormChartPage.styles';

interface Step6SectionFProps {
  data: CounsellorFormChartData['sectionF'];
  onChangeNotes: (code: string, value: string) => void;
}

const synthesisRowsHDef = [
  {
    code: 'H1',
    placeholder:
      "Shared vs. Distinct Priorities : Compare the student's and parent's primary objectives (1.1); note what is shared and what is unique to each, so the session can address both.",
  },
  {
    code: 'H2',
    placeholder:
      'Sensitive Flags : Note any specific pre-session flag raised by either party (1.2) that needs careful, private handling during the session.',
  },
  {
    code: 'H3',
    placeholder:
      'Session Plan Mapping : Translate the stated expectations into a concrete session focus (e.g. stream clarity vs. full roadmap vs. confidence-building) so time is allocated correctly.',
  },
  {
    code: 'H4',
    placeholder:
      'Expectation Gap : If student and parent expectations diverge significantly, note how the session will work to align both before the roadmap is finalised.',
  },
];

export const Step6SectionF: React.FC<Step6SectionFProps> = ({ data, onChangeNotes }) => {
  return (
    <>
      <StepHeaderCard>
        <StepHeaderTitle>COUNSELLING GOALS & PROGRAMME EXPECTATIONS</StepHeaderTitle>
      </StepHeaderCard>

      <SectionBlock>
        <ComparisonTable groups={data.comparisonGroups} />
      </SectionBlock>

      <SynthesisNotesPanel
        title="Counsellor Synthesis Notes"
        rows={synthesisRowsHDef}
        notes={data.synthesisNotes}
        onChangeNote={onChangeNotes}
      />
    </>
  );
};
