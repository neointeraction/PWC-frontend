import React from 'react';
import { CounsellorFormChartData, AcademicRecord } from '@/mocks/studentFormChart.mock';
import styled from 'styled-components';
import { ComparisonTable } from './ComparisonTable';
import { SynthesisNotesPanel } from './SynthesisNotesPanel';
import {
  StepHeaderCard,
  StepHeaderTitle,
  StepHeaderDescription,
  SectionBlock,
  SectionBlockTitle,
  CompTableContainer,
  CompTableHeaderRow,
  CompTableHeaderCell,
  CompDataRow,
  CompParamCell,
  CompResponseCell,
} from '../StudentFormChartPage.styles';

const ReadOnlyField = styled.div`
  padding: 4px 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  font-weight: 500;
`;

interface Step1SectionAProps {
  data: CounsellorFormChartData['sectionA'];
  studentInfo: CounsellorFormChartData['studentInfo'];
  onChangeNotes: (code: string, value: string) => void;
}

const synthesisRowsDef = [
  { code: 'A1', placeholder: "Compare student's favourite/least-liked subjects (A1.1–A1.2) against the parent's perception. If the favourite subject matches what the parent identifies as a strength, that's an ideal anchor for stream recommendation. If they diverge, probe the direction of the gap: a parent-identified strength the child doesn't enjoy may mean the child is performing under pressure rather than genuine interest; a child-enjoyed subject the parent doesn't recognise may be a hidden passion not yet visible in performance. For the least-liked subject, distinguish whether the dislike is interest-based (“I find it boring”) or difficulty-based (“I struggle but would try if taught differently”)." },
  { code: 'A2', placeholder: "Hobby & free-time pattern, look for early RIASEC signals in the non-academic activity and hobbies (e.g. creative hobby -> Artistic, tinkering/building -> Realistic, reading -> Investigative)." },
  { code: 'A3', placeholder: "Learning mode preference (A2.5), note how this may point toward a stream or career style that will suit the student best." },
  { code: 'A4', placeholder: "Engagement breadth is the student engaged in a wide range of school activities (A2.4) or narrowly focused? Note whether this reflects genuine interest or lack of exposure/opportunity and point toward a stream or career style." },
  { code: 'A5', placeholder: "Academic Trend : Improving/Stable/Declining/Not Assessed and point toward a stream or career style." },
];

export const Step1SectionA: React.FC<Step1SectionAProps> = ({ data, studentInfo, onChangeNotes }) => {
  return (
    <>
      <StepHeaderCard>
        <StepHeaderTitle>Academics &amp; Non-Academics</StepHeaderTitle>
        <StepHeaderDescription>
          Side-by-side comparison of pre-counselling questionnaires regarding favourite subjects, extracurricular achievements, hobbies, and learning modes, followed by counsellor synthesis notes.
        </StepHeaderDescription>
      </StepHeaderCard>

      <SectionBlock>
        <SectionBlockTitle>Academic Record (Class 7, 8 &amp; 9)</SectionBlockTitle>
        <CompTableContainer>
          <CompTableHeaderRow style={{ gridTemplateColumns: '220px 1fr 1fr 1fr' }}>
            <CompTableHeaderCell>Subject</CompTableHeaderCell>
            <CompTableHeaderCell>Class 7</CompTableHeaderCell>
            <CompTableHeaderCell>Class 8</CompTableHeaderCell>
            <CompTableHeaderCell>Class 9</CompTableHeaderCell>
          </CompTableHeaderRow>

          {studentInfo.academicRecords.map((rec: AcademicRecord) => (
            <CompDataRow key={rec.id} style={{ gridTemplateColumns: '220px 1fr 1fr 1fr' }}>
              <CompParamCell>
                {rec.isOther ? (
                  <>
                    <span>Other: </span>
                    <ReadOnlyField>{rec.subject}</ReadOnlyField>
                  </>
                ) : (
                  rec.subject
                )}
              </CompParamCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>
                <ReadOnlyField>{rec.class7}</ReadOnlyField>
              </CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>
                <ReadOnlyField>{rec.class8}</ReadOnlyField>
              </CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>
                <ReadOnlyField>{rec.class9}</ReadOnlyField>
              </CompResponseCell>
            </CompDataRow>
          ))}
        </CompTableContainer>
      </SectionBlock>

      <SectionBlock>
        <ComparisonTable groups={data.comparisonGroups} />
      </SectionBlock>

      <SynthesisNotesPanel
        title="Counsellor Synthesis Notes"
        rows={synthesisRowsDef}
        notes={data.synthesisNotes}
        onChangeNote={onChangeNotes}
      />
    </>
  );
};
