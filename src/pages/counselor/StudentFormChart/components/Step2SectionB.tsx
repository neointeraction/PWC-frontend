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
  TraitTableContainer,
  TraitTableHeaderRow,
  TraitTableHeaderCell,
  TraitDataRow,
  TraitCell,
  TraitGradeTag,
  TraitScoreBadge,
  CategoryBlockHeader,
  CategoryBlockTitle,
  CategoryCountBadge,
  RedFlagNotice,
} from '../StudentFormChartPage.styles';

interface Step2SectionBProps {
  data: CounsellorFormChartData['sectionB'];
  onChangeNotesPre: (code: string, value: string) => void;
  onChangeTraits?: (traits: TraitAssessmentItem[]) => void;
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
    traits: TraitAssessmentItem[]
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
          traits.map((t, idx) => {
            const traitCode = t.layerTrait.split(' - ')[1] ?? '';
            return (
              <TraitDataRow key={t.id}>
                <TraitCell $align="center" $bold style={{ color: '#64748B' }}>
                  {idx + 1}
                </TraitCell>
                <TraitCell style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ fontWeight: 600 }}>{t.traitName}</span>
                  {traitCode && (
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{traitCode}</span>
                  )}
                </TraitCell>
                <TraitCell $secondary>{t.whatItMeasures}</TraitCell>
                <TraitCell
                  $align="center"
                  style={{ flexDirection: 'column', gap: '4px' }}
                >
                  <TraitGradeTag $type={t.grade}>{t.grade}</TraitGradeTag>
                  {t.percentage && <TraitScoreBadge>{t.percentage}%</TraitScoreBadge>}
                </TraitCell>
                <TraitCell $secondary>{t.gradeMeaning}</TraitCell>
              </TraitDataRow>
            );
          })
        )}
      </TraitTableContainer>

      {data.redFlags?.[categoryKey] && (
        <RedFlagNotice>
          <RiAlertLine size={15} style={{ flexShrink: 0 }} />
          <span>{data.redFlags[categoryKey]}</span>
        </RedFlagNotice>
      )}
    </div>
  );

  const renderDominantTable = (
    title: string,
    gridTemplate: string,
    headers: string[],
    cells: React.ReactNode[]
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
        <CategoryBlockTitle>{title}</CategoryBlockTitle>
      </CategoryBlockHeader>

      <TraitTableContainer>
        <TraitTableHeaderRow style={{ gridTemplateColumns: gridTemplate }}>
          {headers.map(h => (
            <TraitTableHeaderCell key={h}>{h}</TraitTableHeaderCell>
          ))}
        </TraitTableHeaderRow>
        <TraitDataRow style={{ gridTemplateColumns: gridTemplate }}>
          {cells.map((c, idx) => (
            <TraitCell key={idx} $secondary={idx > 0}>
              {c}
            </TraitCell>
          ))}
        </TraitDataRow>
      </TraitTableContainer>
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

        {renderCategoryBlock('RIASEC', 'riasec', riasecTraits)}

        {renderCategoryBlock('BIG Five', 'bigFive', bigFiveTraits)}

        {renderCategoryBlock('Cognitive & Decision', 'cogDec', cogDecTraits)}

        {renderCategoryBlock('Aptitude', 'aptitude', aptitudeTraits)}

        {/* Dominant Style Result Tables — one row each, looked up from the RIASEC 120 /
            BIG FIVE 20 / COG&DEC combination tables computed by the assessment engine. */}
        {renderDominantTable(
          'CAREER STYLE (Top Trait of RIASEC 120)',
          '90px 1.6fr 1.4fr 2.4fr 2.6fr',
          ['Code', 'Rank Traits (1 → 2 → 3)', 'Dominant Career Style', 'Description', 'Explanation'],
          [
            data.summaryStrip.careerStyle.code,
            data.summaryStrip.careerStyle.traits.join(' → '),
            <span style={{ fontWeight: 600 }}>{data.summaryStrip.careerStyle.style}</span>,
            data.summaryStrip.careerStyle.description,
            data.summaryStrip.careerStyle.explanation,
          ]
        )}

        {renderDominantTable(
          'PERSONAL SIGNATURE (Top Trait of BIG FIVE 20)',
          '90px 1.4fr 2.4fr 2.6fr',
          ['Code', 'Personality Style', 'Description', 'Explanation'],
          [
            data.summaryStrip.personalSignature.code,
            <span style={{ fontWeight: 600 }}>{data.summaryStrip.personalSignature.style}</span>,
            data.summaryStrip.personalSignature.description,
            data.summaryStrip.personalSignature.explanation,
          ]
        )}

        {renderDominantTable(
          'THINKING MODE (Top Trait of COG&DEC)',
          '1.4fr 2.4fr 130px 2.6fr',
          ['Trait Name', 'What It Means', 'Current Level', 'What It Means'],
          [
            <span style={{ fontWeight: 600 }}>{data.summaryStrip.thinkingMode.traitName}</span>,
            data.summaryStrip.thinkingMode.whatItMeasures,
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <TraitGradeTag $type={data.summaryStrip.thinkingMode.level}>
                {data.summaryStrip.thinkingMode.level}
              </TraitGradeTag>
              {data.summaryStrip.thinkingMode.percentage && (
                <TraitScoreBadge>{data.summaryStrip.thinkingMode.percentage}%</TraitScoreBadge>
              )}
            </div>,
            data.summaryStrip.thinkingMode.levelMeaning,
          ]
        )}
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
