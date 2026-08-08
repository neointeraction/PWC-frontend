import React from 'react';
import { RiAddLine, RiDeleteBinLine } from 'react-icons/ri';
import { CounsellorFormChartData, TraitAssessmentItem } from '@/mocks/studentFormChart.mock';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import { ComparisonTable } from './ComparisonTable';
import { SynthesisNotesPanel } from './SynthesisNotesPanel';
import {
  StepHeaderCard,
  StepHeaderTitle,
  StepHeaderDescription,
  SectionBlock,
  SectionBlockTitle,
  SectionBlockSubtitle,
  CompTableContainer,
  CompTableHeaderRow,
  CompTableHeaderCell,
  CompDataRow,
  CompParamCell,
  CompResponseCell,
  FormInput,
  SummaryCardStrip,
  SummaryCard,
  SummaryCardLabel,
  TableActionButton,
} from '../StudentFormChartPage.styles';

interface Step2SectionBProps {
  data: CounsellorFormChartData['sectionB'];
  onChangeNotesPre: (code: string, value: string) => void;
  onChangeTraits: (traits: TraitAssessmentItem[]) => void;
  onChangeSummary: (summary: Partial<CounsellorFormChartData['sectionB']['summaryStrip']>) => void;
  onChangeDna: (field: keyof CounsellorFormChartData['sectionB']['careerDnaNarrative'], value: string) => void;
  onChangeRedFlags: (key: string, value: string) => void;
}

const synthesisRowsPreDef = [
  { code: 'B1', placeholder: "Strength Alignment : Compare student self-rated strengths (B1.1–B1.2) with the parent's view and any special talent the parent alone noticed (B1.3); flag strengths the student may be underselling or overselling." },
  { code: 'B2', placeholder: "Personality Synthesis : Reconcile the student's perceived personality type (B2.1) with the parent's character description (B2.2/B2.3); note if the two paint a consistent or conflicting picture. Cross check with BIG Five scores." },
  { code: 'B3', placeholder: "Decision-making Style : Note whether the student's approach (B2.4) is independent, consultative, or impulsive, and whether the parent's account (B2.4 parent column) matches." },
  { code: 'B4', placeholder: "Resilience Pattern : From B3.1–B3.2, note how the student typically handles setbacks (reflective vs deflecting vs demotivated). This shapes how directly to deliver assessment feedback in-session." },
  { code: 'B5', placeholder: "Divergence Flag : Record any notable gap between student self-image and parent observation in this section that needs sensitive handling in the session." },
];

const dnaRowsDef = [
  { code: 'dnaDefinition', placeholder: 'Activity in or outside school which can reinforce CAREER STYLE' },
  { code: 'careerStyleReveals', placeholder: 'Activity or skill which can reinforce PERSONAL SIGNATURE' },
  { code: 'personalityStyleReveals', placeholder: 'Activity or skill which can reinforce THINKING MODE' },
  { code: 'thinkingModeReveals', placeholder: 'If either is flagged "No Strong RIASEC Preference Emerging" or "Highly Undifferentiated Profile", treat the Career Style output as a starting point for exploration, not a settled preference, and plan a qualitative follow-up conversation.' },
  { code: 'aptitudeProfileReveals', placeholder: 'If the Big Five profile triggered either flag: "Stress Vulnerability - Flag for Counsellor Attention" or "Balanced Personality Profile, Low Differentiation", then the first warrants a gentle, non-clinical check-in during the session; the second means the Personal Signature label should be held loosely' },
];

export const Step2SectionB: React.FC<Step2SectionBProps> = ({
  data,
  onChangeNotesPre,
  onChangeTraits,
  onChangeSummary,
  onChangeDna,
  onChangeRedFlags,
}) => {
  const handleTraitChange = (id: string, field: keyof TraitAssessmentItem, value: any) => {
    const updated = data.traitsTable.map(t => (t.id === id ? { ...t, [field]: value } : t));
    onChangeTraits(updated);
  };

  const handleAddTrait = (category: string) => {
    const newTrait: TraitAssessmentItem = {
      id: `t-${Date.now()}`,
      no: data.traitsTable.length + 1,
      layerTrait: category,
      traitName: 'New Trait',
      whatItMeasures: 'Description of measure',
      percentage: '0.00',
      grade: 'A',
      gradeMeaning: 'Strong Capacity',
    };
    onChangeTraits([...data.traitsTable, newTrait]);
  };

  const handleDeleteTrait = (id: string) => {
    onChangeTraits(data.traitsTable.filter(t => t.id !== id));
  };

  const riasecTraits = data.traitsTable.filter(t => t.layerTrait.toLowerCase().includes('riasec'));
  const bigFiveTraits = data.traitsTable.filter(t => t.layerTrait.toLowerCase().includes('big five'));
  const cogDecTraits = data.traitsTable.filter(t => t.layerTrait.toLowerCase().includes('cognitive') || t.layerTrait.toLowerCase().includes('cog'));
  const aptitudeTraits = data.traitsTable.filter(t => t.layerTrait.toLowerCase().includes('aptitude'));

  const renderCategoryBlock = (
    categoryTitle: string,
    categoryKey: string,
    traits: TraitAssessmentItem[],
    redFlagPlaceholder: string
  ) => (
    <div style={{ marginTop: '20px', border: '1px solid #E5E7EB', borderRadius: '4px', padding: '16px', backgroundColor: '#F9FAFB' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827' }}>{categoryTitle}</h4>
        <Button
          size="sm"
          variant="secondary"
          leftIcon={<RiAddLine size={16} />}
          onClick={() => handleAddTrait(categoryKey)}
        >
          Add Row
        </Button>
      </div>

      <CompTableContainer style={{ overflowX: 'auto', marginBottom: '12px' }}>
        <CompTableHeaderRow style={{ gridTemplateColumns: '50px 180px 1fr 100px 140px 200px 60px', minWidth: '900px' }}>
          <CompTableHeaderCell>No</CompTableHeaderCell>
          <CompTableHeaderCell>Trait Name</CompTableHeaderCell>
          <CompTableHeaderCell>What It Measures</CompTableHeaderCell>
          <CompTableHeaderCell>%</CompTableHeaderCell>
          <CompTableHeaderCell>Grade</CompTableHeaderCell>
          <CompTableHeaderCell>Grade Meaning</CompTableHeaderCell>
          <CompTableHeaderCell style={{ textAlign: 'center' }}>Action</CompTableHeaderCell>
        </CompTableHeaderRow>

        {traits.length === 0 ? (
          <div style={{ padding: '12px', textAlign: 'center', color: '#6B7280', fontSize: '0.875rem' }}>
            No traits added in this category. Click "Add Row" to add one.
          </div>
        ) : (
          traits.map((t, idx) => (
            <CompDataRow key={t.id} style={{ gridTemplateColumns: '50px 180px 1fr 100px 140px 200px 60px', minWidth: '900px' }}>
              <CompParamCell>{idx + 1}</CompParamCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>
                <FormInput
                  value={t.traitName}
                  onChange={e => handleTraitChange(t.id, 'traitName', e.target.value)}
                  style={{ width: '100%' }}
                />
              </CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>
                <FormInput
                  value={t.whatItMeasures}
                  onChange={e => handleTraitChange(t.id, 'whatItMeasures', e.target.value)}
                  style={{ width: '100%' }}
                />
              </CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>
                <FormInput
                  value={t.percentage || ''}
                  onChange={e => handleTraitChange(t.id, 'percentage', e.target.value)}
                  placeholder="e.g. 83.36"
                  style={{ width: '100%' }}
                />
              </CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>
                <FormInput
                  value={t.grade}
                  onChange={e => handleTraitChange(t.id, 'grade', e.target.value)}
                  style={{ width: '100%' }}
                />
              </CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>
                <FormInput
                  value={t.gradeMeaning}
                  onChange={e => handleTraitChange(t.id, 'gradeMeaning', e.target.value)}
                  style={{ width: '100%' }}
                />
              </CompResponseCell>
              <CompResponseCell style={{ borderLeft: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Tooltip content="Delete Trait">
                  <TableActionButton type="button" onClick={() => handleDeleteTrait(t.id)}>
                    <RiDeleteBinLine size={16} />
                  </TableActionButton>
                </Tooltip>
              </CompResponseCell>
            </CompDataRow>
          ))
        )}
      </CompTableContainer>

      <div>
        <FormInput
          value={data.redFlags?.[categoryKey] || ''}
          onChange={e => onChangeRedFlags(categoryKey, e.target.value)}
          placeholder={redFlagPlaceholder}
          style={{ width: '100%', fontStyle: 'italic', color: '#DC2626', borderColor: '#FCA5A5', backgroundColor: '#FEF2F2' }}
        />
      </div>
    </div>
  );

  return (
    <>
      <StepHeaderCard>
        <StepHeaderTitle>Strengths & Personality View</StepHeaderTitle>
        <StepHeaderDescription>
          Analyzes student self-perception vs parent feedback, psychometric layer-wise trait results, summary cards, and Career DNA narrative synthesis.
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
        <SectionBlockSubtitle>Records the 18 traits assessed layer-wise under each respective heads.</SectionBlockSubtitle>

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
