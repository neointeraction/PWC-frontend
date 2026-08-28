import React from 'react';
import { RiAlertLine } from 'react-icons/ri';
import { CounsellorFormChartData, TraitAssessmentItem } from '@/mocks/studentFormChart.mock';
import { ComparisonTable } from './ComparisonTable';
import { SynthesisNotesPanel } from './SynthesisNotesPanel';
import {
  StepHeaderCard,
  StepHeaderTitle,
  StepHeaderDescription,
  SectionBlock,
  SectionBlockTitle,
  SectionBlockSubtitle,
  FormInput,
  SummaryCardStrip,
  SummaryCard,
  SummaryCardLabel,
  TraitTableContainer,
  TraitTableHeaderRow,
  TraitTableHeaderCell,
  TraitDataRow,
  TraitCell,
  TraitGradeTag,
  CategoryBlockHeader,
  CategoryBlockTitle,
  CategoryCountBadge,
  RedFlagNotice,
} from '../StudentFormChartPage.styles';

interface Step2SectionBProps {
  data: CounsellorFormChartData['sectionB'];
  onChangeNotesPre: (code: string, value: string) => void;
  onChangeTraits?: (traits: TraitAssessmentItem[]) => void;
  onChangeSummary: (summary: Partial<CounsellorFormChartData['sectionB']['summaryStrip']>) => void;
  onChangeDna: (
    field: keyof CounsellorFormChartData['sectionB']['careerDnaNarrative'],
    value: string
  ) => void;
  onChangeRedFlags?: (key: string, value: string) => void;
}

const synthesisRowsPreDef = [
  {
    code: 'B1',
    placeholder:
      "Strength Alignment : Compare student self-rated strengths (1.1–1.2) with the parent's view and any special talent the parent alone noticed (1.3); flag strengths the student may be underselling or overselling.",
  },
  {
    code: 'B2',
    placeholder:
      "Personality Synthesis : Reconcile the student's perceived personality type (2.1) with the parent's character description (2.2/2.3); note if the two paint a consistent or conflicting picture. Cross check with BIG Five scores.",
  },
  {
    code: 'B3',
    placeholder:
      "Decision-making Style : Note whether the student's approach (2.4) is independent, consultative, or impulsive, and whether the parent's account (2.4 parent column) matches.",
  },
  {
    code: 'B4',
    placeholder:
      'Resilience Pattern : From 3.1–3.2, note how the student typically handles setbacks (reflective vs deflecting vs demotivated). This shapes how directly to deliver assessment feedback in-session.',
  },
  {
    code: 'B5',
    placeholder:
      'Divergence Flag : Record any notable gap between student self-image and parent observation in this section that needs sensitive handling in the session.',
  },
];

const dnaRowsDef = [
  {
    code: 'dnaDefinition',
    placeholder: 'Activity in or outside school which can reinforce CAREER STYLE',
  },
  {
    code: 'careerStyleReveals',
    placeholder: 'Activity or skill which can reinforce PERSONAL SIGNATURE',
  },
  {
    code: 'personalityStyleReveals',
    placeholder: 'Activity or skill which can reinforce THINKING MODE',
  },
  {
    code: 'thinkingModeReveals',
    placeholder:
      'If either is flagged "No Strong RIASEC Preference Emerging" or "Highly Undifferentiated Profile", treat the Career Style output as a starting point for exploration, not a settled preference, and plan a qualitative follow-up conversation.',
  },
  {
    code: 'aptitudeProfileReveals',
    placeholder:
      'If the Big Five profile triggered either flag: "Stress Vulnerability - Flag for Counsellor Attention" or "Balanced Personality Profile, Low Differentiation", then the first warrants a gentle, non-clinical check-in during the session; the second means the Personal Signature label should be held loosely',
  },
];

export const Step2SectionB: React.FC<Step2SectionBProps> = ({
  data,
  onChangeNotesPre,
  onChangeSummary,
  onChangeDna,
}) => {
  const riasecTraits = data.traitsTable.filter(t => t.layerTrait.toLowerCase().includes('riasec'));
  const bigFiveTraits = data.traitsTable.filter(t =>
    t.layerTrait.toLowerCase().includes('big five')
  );
  const cogDecTraits = data.traitsTable.filter(
    t =>
      t.layerTrait.toLowerCase().includes('cognitive') || t.layerTrait.toLowerCase().includes('cog')
  );
  const aptitudeTraits = data.traitsTable.filter(t =>
    t.layerTrait.toLowerCase().includes('aptitude')
  );

  const renderCategoryBlock = (
    categoryTitle: string,
    categoryKey: string,
    traits: TraitAssessmentItem[],
    redFlagPlaceholder: string
  ) => (
    <div
      style={{
        marginTop: '20px',
        border: '1px solid #E2E8F0',
        borderRadius: '4px',
        padding: '16px',
        backgroundColor: '#FFFFFF',
      }}
    >
      <CategoryBlockHeader>
        <CategoryBlockTitle>{categoryTitle}</CategoryBlockTitle>
        <CategoryCountBadge>{traits.length} {traits.length === 1 ? 'Trait' : 'Traits'}</CategoryCountBadge>
      </CategoryBlockHeader>

      <TraitTableContainer>
        <TraitTableHeaderRow>
          <TraitTableHeaderCell $align="center">No</TraitTableHeaderCell>
          <TraitTableHeaderCell>Trait Name</TraitTableHeaderCell>
          <TraitTableHeaderCell>What It Means</TraitTableHeaderCell>
          <TraitTableHeaderCell $align="center">Current Level</TraitTableHeaderCell>
          <TraitTableHeaderCell>What It Means</TraitTableHeaderCell>
        </TraitTableHeaderRow>

        {traits.length === 0 ? (
          <div
            style={{ padding: '16px', textAlign: 'center', color: '#64748B', fontSize: '0.85rem' }}
          >
            No traits available in this assessment category.
          </div>
        ) : (
          traits.map((t, idx) => (
            <TraitDataRow key={t.id}>
              <TraitCell $align="center" $bold style={{ color: '#64748B' }}>
                {idx + 1}
              </TraitCell>
              <TraitCell $bold>{t.traitName}</TraitCell>
              <TraitCell $secondary>{t.whatItMeasures}</TraitCell>
              <TraitCell $align="center">
                <TraitGradeTag $type={t.grade}>{t.grade}</TraitGradeTag>
              </TraitCell>
              <TraitCell $secondary>{t.gradeMeaning}</TraitCell>
            </TraitDataRow>
          ))
        )}
      </TraitTableContainer>

      <RedFlagNotice>
        <RiAlertLine size={15} style={{ flexShrink: 0 }} />
        <span>{data.redFlags?.[categoryKey] || redFlagPlaceholder}</span>
      </RedFlagNotice>
    </div>
  );

  return (
    <>
      <StepHeaderCard>
        <StepHeaderTitle>Strengths & Personality View</StepHeaderTitle>
        <StepHeaderDescription>
          Analyzes student self-perception vs parent feedback, psychometric layer-wise trait
          results, summary cards, and Career DNA narrative synthesis.
        </StepHeaderDescription>
      </StepHeaderCard>

      {/* Sub-Block 1: Pre-Counselling View */}
      <SectionBlock>
        <SectionBlockTitle>Pre-Counselling View — Strengths & Personality</SectionBlockTitle>
        <ComparisonTable groups={data.comparisonGroups} />
      </SectionBlock>

      <SynthesisNotesPanel
        title="Counsellor Synthesis Notes"
        rows={synthesisRowsPreDef}
        notes={data.synthesisNotesPre}
        onChangeNote={onChangeNotesPre}
      />

      {/* Sub-Block 2: Assessment Result View */}
      <SectionBlock>
        <SectionBlockTitle>Assessment Result View</SectionBlockTitle>
        <SectionBlockSubtitle>
          Records the 18 traits assessed layer-wise under each respective heads.
        </SectionBlockSubtitle>

        {renderCategoryBlock(
          'RIASEC',
          'riasec',
          riasecTraits,
          'RED FLAG if any — explained in Tie-break & Edge case Rules under RIASEC of Assessment Construct file'
        )}

        {renderCategoryBlock(
          'BIG Five',
          'bigFive',
          bigFiveTraits,
          'RED FLAG if any — explained in Tie-break & Edge case Rules under BIG Five of Assessment Construct file'
        )}

        {renderCategoryBlock(
          'Cognitive & Decision',
          'cogDec',
          cogDecTraits,
          'RED FLAG if any — explained in Tie-break & Edge case Rules under Cognitive & Decision of Assessment Construct file'
        )}

        {renderCategoryBlock(
          'Aptitude',
          'aptitude',
          aptitudeTraits,
          'RED FLAG if any — explained in Tie-break & Edge case Rules under Aptitude of Assessment Construct file'
        )}

        {/* 3-cell Summary Strip */}
        <SummaryCardStrip style={{ marginTop: '20px' }}>
          <SummaryCard>
            <SummaryCardLabel>CAREER STYLE (Top Trait of RIASEC 120)</SummaryCardLabel>
            <FormInput
              value={data.summaryStrip.careerStyle}
              onChange={e => onChangeSummary({ careerStyle: e.target.value })}
              style={{ width: '100%', fontWeight: 700 }}
            />
          </SummaryCard>
          <SummaryCard>
            <SummaryCardLabel>PERSONAL SIGNATURE (Top Trait of BIG FIVE 20)</SummaryCardLabel>
            <FormInput
              value={data.summaryStrip.personalSignature}
              onChange={e => onChangeSummary({ personalSignature: e.target.value })}
              style={{ width: '100%', fontWeight: 700 }}
            />
          </SummaryCard>
          <SummaryCard>
            <SummaryCardLabel>THINKING MODE (Top Trait of COG&DEC)</SummaryCardLabel>
            <FormInput
              value={data.summaryStrip.thinkingMode}
              onChange={e => onChangeSummary({ thinkingMode: e.target.value })}
              style={{ width: '100%', fontWeight: 700 }}
            />
          </SummaryCard>
        </SummaryCardStrip>
      </SectionBlock>

      {/* Career DNA Narrative Block */}
      <SynthesisNotesPanel
        title="Counsellor Synthesis Notes"
        rows={dnaRowsDef}
        notes={data.careerDnaNarrative as any}
        onChangeNote={(code, value) => onChangeDna(code as any, value)}
      />
    </>
  );
};
