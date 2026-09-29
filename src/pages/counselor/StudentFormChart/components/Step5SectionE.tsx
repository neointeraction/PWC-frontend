import React from 'react';
import { CounsellorFormChartData, RoadmapGridData } from '@/mocks/studentFormChart.mock';
import {
  StepHeaderCard,
  StepHeaderTitle,
  SectionBlock,
  SectionBlockTitle,
  Roadmap3x3Grid,
  RoadmapColumnHeader,
  RoadmapCell,
  RoadmapCellLabel,
  FormInput,
  FormTextarea,
  PrintTextValue,
} from '../StudentFormChartPage.styles';

interface Step5SectionEProps {
  data: CounsellorFormChartData['sectionE'];
  onChangeGrid: (grid: Partial<RoadmapGridData>) => void;
}


// FormTextarea plus a print-only copy of its text, so long entries aren't clipped in the PDF.
const RoadmapTextarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = props => (
  <>
    <FormTextarea {...props} />
    <PrintTextValue>{props.value || '—'}</PrintTextValue>
  </>
);

export const Step5SectionE: React.FC<Step5SectionEProps> = ({
  data,
  onChangeGrid,
}) => {
  const { roadmapGrid } = data;

  return (
    <>
      <StepHeaderCard>
        <StepHeaderTitle>Roadmap</StepHeaderTitle>
      </StepHeaderCard>

      {/* 3x3 Roadmap Grid */}
      <SectionBlock>
        <SectionBlockTitle>3-Phase Strategic Roadmap</SectionBlockTitle>

        <Roadmap3x3Grid>
          {/* Column Headers */}
          <RoadmapColumnHeader>NOW (Class 9–10)</RoadmapColumnHeader>
          <RoadmapColumnHeader>Class 11–12</RoadmapColumnHeader>
          <RoadmapColumnHeader>After Class 12</RoadmapColumnHeader>

          {/* Row 1 */}
          <RoadmapCell>
            <RoadmapCellLabel>Skills to Build</RoadmapCellLabel>
            <RoadmapTextarea
              value={roadmapGrid.nowSkills}
              onChange={e => onChangeGrid({ nowSkills: e.target.value })}
              placeholder="e.g. Python, Speed Math..."
            />
          </RoadmapCell>
          <RoadmapCell>
            <RoadmapCellLabel>Stream to Choose</RoadmapCellLabel>
            <FormInput
              value={roadmapGrid.c11Stream}
              onChange={e => onChangeGrid({ c11Stream: e.target.value })}
              placeholder="e.g. Science (PCM + CS)"
            />
          </RoadmapCell>
          <RoadmapCell>
            <RoadmapCellLabel>Degrees to Target</RoadmapCellLabel>
            <RoadmapTextarea
              value={roadmapGrid.afterDegrees}
              onChange={e => onChangeGrid({ afterDegrees: e.target.value })}
              placeholder="e.g. B.Tech CS / AI..."
            />
          </RoadmapCell>

          {/* Row 2 */}
          <RoadmapCell>
            <RoadmapCellLabel>Activities to Join</RoadmapCellLabel>
            <RoadmapTextarea
              value={roadmapGrid.nowActivities}
              onChange={e => onChangeGrid({ nowActivities: e.target.value })}
              placeholder="e.g. Robotics Club, Olympiad..."
            />
          </RoadmapCell>
          <RoadmapCell>
            <RoadmapCellLabel>Exams to Watch</RoadmapCellLabel>
            <RoadmapTextarea
              value={roadmapGrid.c11Exams}
              onChange={e => onChangeGrid({ c11Exams: e.target.value })}
              placeholder="e.g. JEE Main, BITSAT..."
            />
          </RoadmapCell>
          <RoadmapCell>
            <RoadmapCellLabel>Certifications</RoadmapCellLabel>
            <RoadmapTextarea
              value={roadmapGrid.afterCertifications}
              onChange={e => onChangeGrid({ afterCertifications: e.target.value })}
              placeholder="e.g. AWS ML, TensorFlow..."
            />
          </RoadmapCell>

          {/* Row 3 */}
          <RoadmapCell>
            <RoadmapCellLabel>Habits to Develop</RoadmapCellLabel>
            <RoadmapTextarea
              value={roadmapGrid.nowHabits}
              onChange={e => onChangeGrid({ nowHabits: e.target.value })}
              placeholder="e.g. Time blocking, logic puzzles..."
            />
          </RoadmapCell>
          <RoadmapCell>
            <RoadmapCellLabel>Electives to Pick</RoadmapCellLabel>
            <RoadmapTextarea
              value={roadmapGrid.c11Electives}
              onChange={e => onChangeGrid({ c11Electives: e.target.value })}
              placeholder="e.g. Computer Science, Economics..."
            />
          </RoadmapCell>
          <RoadmapCell>
            <RoadmapCellLabel>Study Abroad Options</RoadmapCellLabel>
            <RoadmapTextarea
              value={roadmapGrid.afterAbroad}
              onChange={e => onChangeGrid({ afterAbroad: e.target.value })}
              placeholder="e.g. US MS Programs, GRE/TOEFL..."
            />
          </RoadmapCell>
        </Roadmap3x3Grid>
      </SectionBlock>


    </>
  );
};
