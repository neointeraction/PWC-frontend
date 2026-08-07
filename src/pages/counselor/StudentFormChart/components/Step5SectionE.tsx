import React from 'react';
import { CounsellorFormChartData, RoadmapGridData } from '@/mocks/studentFormChart.mock';
import { Select } from '@/components/Select';
import { SynthesisNotesPanel } from './SynthesisNotesPanel';
import {
  StepHeaderCard,
  StepHeaderTitle,
  StepHeaderDescription,
  SectionBlock,
  SectionBlockTitle,
  SectionBlockSubtitle,
  Roadmap3x3Grid,
  RoadmapColumnHeader,
  RoadmapCell,
  RoadmapCellLabel,
  FormInput,
  FormTextarea,
  ScriRow,
  ScriInfo,
  ScriName,
  ScriDesc,
  SegmentedButtonGroup,
  SegmentedButton,
  SummaryCardStrip,
  SummaryCard,
  SummaryCardLabel,
  SummaryCardValue,
  CompTableContainer,
  CompTableHeaderRow,
  CompTableHeaderCell,
  CompDataRow,
  CompParamCell,
  CompResponseCell,
} from '../StudentFormChartPage.styles';

interface Step5SectionEProps {
  data: CounsellorFormChartData['sectionE'];
  onChangeGrid: (grid: Partial<RoadmapGridData>) => void;
  onChangeScriRating: (code: string, rating: number) => void;
  onChangeAlignment: (alignment: CounsellorFormChartData['sectionE']['academicCareerAlignment']) => void;
  onChangeNotes: (code: string, value: string) => void;
}

const synthesisRowsHDef = [
  { code: 'H1', placeholder: 'H1 · Roadmap action plan synthesis...' },
  { code: 'H2', placeholder: 'H2 · Skill-building and extracurricular priority notes...' },
  { code: 'H3', placeholder: 'H3 · Entrance exam and academic timeline guidance...' },
  { code: 'H4', placeholder: 'H4 · Parental consultation and PTM action points...' },
  { code: 'H5', placeholder: 'H5 · Overall Section E roadmap conclusion...' },
];

const alignmentOptions = [
  { value: 'Strongly Aligned', label: 'Strongly Aligned' },
  { value: 'Partially Aligned', label: 'Partially Aligned' },
  { value: 'Misaligned', label: 'Misaligned' },
  { value: 'Not Yet Assessed', label: 'Not Yet Assessed' },
];

const alignmentGuidanceMap: Record<string, string> = {
  'Strongly Aligned': 'Use when student academic grades, aptitude scores, and target stream/career choice show total synergy.',
  'Partially Aligned': 'Use when student has strong interest but requires academic improvement in key foundational subjects.',
  'Misaligned': 'Use when target career choice conflicts with objective cognitive aptitude or current academic trend.',
  'Not Yet Assessed': 'Use when assessment data is insufficient for definitive alignment determination.',
};

const bandReferenceTable = [
  { range: '21 – 24', band: 'Band 1', label: 'High Readiness', guidance: 'Proceed immediately to specialized entrance exam & advanced track preparation.' },
  { range: '16 – 20', band: 'Band 2', label: 'Moderate Readiness', guidance: 'Focus on strengthening core subject foundations while maintaining target career direction.' },
  { range: '11 – 15', band: 'Band 3', label: 'Developing Readiness', guidance: 'Requires targeted counseling sessions to resolve career ambiguity and build study habits.' },
  { range: '6 – 10', band: 'Band 4', label: 'Initial Stage', guidance: 'Provide intensive academic support and fundamental career exposure before stream selection.' },
];

export const Step5SectionE: React.FC<Step5SectionEProps> = ({
  data,
  onChangeGrid,
  onChangeScriRating,
  onChangeAlignment,
  onChangeNotes,
}) => {
  const { roadmapGrid, scriItems, academicCareerAlignment, synthesisNotes } = data;

  // Auto-calculate SCRI Total
  const scriTotal = scriItems.reduce((acc, item) => acc + item.rating, 0);

  const getScriBandInfo = (total: number) => {
    if (total >= 21) return { band: 'Band 1', label: 'High Readiness' };
    if (total >= 16) return { band: 'Band 2', label: 'Moderate Readiness' };
    if (total >= 11) return { band: 'Band 3', label: 'Developing Readiness' };
    return { band: 'Band 4', label: 'Initial Stage' };
  };

  const currentBandInfo = getScriBandInfo(scriTotal);

  return (
    <>
      <StepHeaderCard>
        <StepHeaderTitle>Section E · Roadmap & Readiness</StepHeaderTitle>
        <StepHeaderDescription>
          Construct a 3-phase strategic roadmap (Now, Class 11-12, After Class 12), evaluate the Student Career Readiness Index (SCRI), and record alignment notes.
        </StepHeaderDescription>
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
            <FormTextarea
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
            <FormTextarea
              value={roadmapGrid.afterDegrees}
              onChange={e => onChangeGrid({ afterDegrees: e.target.value })}
              placeholder="e.g. B.Tech CS / AI..."
            />
          </RoadmapCell>

          {/* Row 2 */}
          <RoadmapCell>
            <RoadmapCellLabel>Activities to Join</RoadmapCellLabel>
            <FormTextarea
              value={roadmapGrid.nowActivities}
              onChange={e => onChangeGrid({ nowActivities: e.target.value })}
              placeholder="e.g. Robotics Club, Olympiad..."
            />
          </RoadmapCell>
          <RoadmapCell>
            <RoadmapCellLabel>Exams to Watch</RoadmapCellLabel>
            <FormTextarea
              value={roadmapGrid.c11Exams}
              onChange={e => onChangeGrid({ c11Exams: e.target.value })}
              placeholder="e.g. JEE Main, BITSAT..."
            />
          </RoadmapCell>
          <RoadmapCell>
            <RoadmapCellLabel>Certifications</RoadmapCellLabel>
            <FormTextarea
              value={roadmapGrid.afterCertifications}
              onChange={e => onChangeGrid({ afterCertifications: e.target.value })}
              placeholder="e.g. AWS ML, TensorFlow..."
            />
          </RoadmapCell>

          {/* Row 3 */}
          <RoadmapCell>
            <RoadmapCellLabel>Habits to Develop</RoadmapCellLabel>
            <FormTextarea
              value={roadmapGrid.nowHabits}
              onChange={e => onChangeGrid({ nowHabits: e.target.value })}
              placeholder="e.g. Time blocking, logic puzzles..."
            />
          </RoadmapCell>
          <RoadmapCell>
            <RoadmapCellLabel>Electives to Pick</RoadmapCellLabel>
            <FormTextarea
              value={roadmapGrid.c11Electives}
              onChange={e => onChangeGrid({ c11Electives: e.target.value })}
              placeholder="e.g. Computer Science, Economics..."
            />
          </RoadmapCell>
          <RoadmapCell>
            <RoadmapCellLabel>Study Abroad Options</RoadmapCellLabel>
            <FormTextarea
              value={roadmapGrid.afterAbroad}
              onChange={e => onChangeGrid({ afterAbroad: e.target.value })}
              placeholder="e.g. US MS Programs, GRE/TOEFL..."
            />
          </RoadmapCell>
        </Roadmap3x3Grid>
      </SectionBlock>

      {/* SCRI Block */}
      <SectionBlock>
        <SectionBlockTitle>SCRI · Student Career Readiness Index</SectionBlockTitle>
        <SectionBlockSubtitle>Rate the 6 indicators (1 to 4 scale) to compute overall readiness score</SectionBlockSubtitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {scriItems.map(item => (
            <ScriRow key={item.code}>
              <ScriInfo>
                <ScriName>
                  {item.code} · {item.name}
                </ScriName>
                <ScriDesc>{item.description}</ScriDesc>
              </ScriInfo>
              <SegmentedButtonGroup>
                {[1, 2, 3, 4].map(val => (
                  <SegmentedButton
                    key={val}
                    type="button"
                    $selected={item.rating === val}
                    onClick={() => onChangeScriRating(item.code, val)}
                  >
                    Rating {val}
                  </SegmentedButton>
                ))}
              </SegmentedButtonGroup>
            </ScriRow>
          ))}
        </div>

        {/* Result Strip */}
        <SummaryCardStrip style={{ marginTop: '16px' }}>
          <SummaryCard>
            <SummaryCardLabel>SCRI Total Score</SummaryCardLabel>
            <SummaryCardValue>{scriTotal} / 24</SummaryCardValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryCardLabel>SCRI Band</SummaryCardLabel>
            <SummaryCardValue>{currentBandInfo.band}</SummaryCardValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryCardLabel>SCRI Band Label</SummaryCardLabel>
            <SummaryCardValue>{currentBandInfo.label}</SummaryCardValue>
          </SummaryCard>
        </SummaryCardStrip>

        {/* Static Reference Table */}
        <div style={{ marginTop: '16px' }}>
          <SectionBlockSubtitle style={{ marginBottom: '8px' }}>SCRI Band Reference Benchmark</SectionBlockSubtitle>
          <CompTableContainer>
            <CompTableHeaderRow style={{ gridTemplateColumns: '120px 120px 160px 1fr' }}>
              <CompTableHeaderCell>Total Score</CompTableHeaderCell>
              <CompTableHeaderCell>Band</CompTableHeaderCell>
              <CompTableHeaderCell>Label</CompTableHeaderCell>
              <CompTableHeaderCell>PTM Guidance</CompTableHeaderCell>
            </CompTableHeaderRow>

            {bandReferenceTable.map(ref => {
              const isMatch = ref.band === currentBandInfo.band;
              return (
                <CompDataRow
                  key={ref.band}
                  style={{
                    gridTemplateColumns: '120px 120px 160px 1fr',
                    backgroundColor: isMatch ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
                    fontWeight: isMatch ? 700 : 400,
                  }}
                >
                  <CompParamCell>{ref.range}</CompParamCell>
                  <CompResponseCell style={{ borderLeft: 'none' }}>{ref.band}</CompResponseCell>
                  <CompResponseCell style={{ borderLeft: 'none' }}>{ref.label}</CompResponseCell>
                  <CompResponseCell style={{ borderLeft: 'none' }}>{ref.guidance}</CompResponseCell>
                </CompDataRow>
              );
            })}
          </CompTableContainer>
        </div>

        {/* Academic x Career Alignment */}
        <div style={{ marginTop: '20px' }}>
          <SectionBlockTitle style={{ marginBottom: '8px' }}>Academic × Career Alignment</SectionBlockTitle>
          <Select
            options={alignmentOptions}
            value={academicCareerAlignment}
            onChange={e => onChangeAlignment(e.target.value as any)}
          />
          <SectionBlockSubtitle style={{ marginTop: '8px' }}>
            {alignmentGuidanceMap[academicCareerAlignment] || ''}
          </SectionBlockSubtitle>
        </div>
      </SectionBlock>

      <SynthesisNotesPanel
        title="Section E — Counsellor Synthesis Notes (H1–H5)"
        rows={synthesisRowsHDef}
        notes={synthesisNotes}
        onChangeNote={onChangeNotes}
      />
    </>
  );
};
