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
  SynthesisPanel,
  SynthesisPanelHeader,
  SynthesisRowList,
  SynthesisRow,
  SynthesisCodeLabel,
  SynthesisInput,
  TableActionButton,
} from '../StudentFormChartPage.styles';

interface Step2SectionBProps {
  data: CounsellorFormChartData['sectionB'];
  onChangeNotesPre: (code: string, value: string) => void;
  onChangeTraits: (traits: TraitAssessmentItem[]) => void;
  onChangeSummary: (summary: Partial<CounsellorFormChartData['sectionB']['summaryStrip']>) => void;
  onChangeDna: (field: keyof CounsellorFormChartData['sectionB']['careerDnaNarrative'], value: string) => void;
}

const synthesisRowsPreDef = [
  { code: 'B1', placeholder: 'B1 · Key strengths identified synthesis...' },
  { code: 'B2', placeholder: 'B2 · Key personality traits identified synthesis...' },
  { code: 'B3', placeholder: 'B3 · Areas for development / growth synthesis...' },
  { code: 'B4', placeholder: 'B4 · Emotional & work style observations...' },
  { code: 'B5', placeholder: 'B5 · Interpersonal & leadership development notes...' },
];

export const Step2SectionB: React.FC<Step2SectionBProps> = ({
  data,
  onChangeNotesPre,
  onChangeTraits,
  onChangeSummary,
  onChangeDna,
}) => {
  const handleTraitChange = (id: string, field: keyof TraitAssessmentItem, value: any) => {
    const updated = data.traitsTable.map(t => (t.id === id ? { ...t, [field]: value } : t));
    onChangeTraits(updated);
  };

  const handleAddTrait = () => {
    const newTrait: TraitAssessmentItem = {
      id: `t-${Date.now()}`,
      no: data.traitsTable.length + 1,
      layerTrait: 'Layer 1 — Aptitude',
      traitName: 'New Trait',
      whatItMeasures: 'Description of measure',
      grade: 'A',
      gradeMeaning: 'Strong Capacity',
    };
    onChangeTraits([...data.traitsTable, newTrait]);
  };

  const handleDeleteTrait = (id: string) => {
    onChangeTraits(data.traitsTable.filter(t => t.id !== id));
  };

  return (
    <>
      <StepHeaderCard>
        <StepHeaderTitle>Section B · Strengths & Personality</StepHeaderTitle>
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
        title="Pre-Counselling View — Counsellor Synthesis Notes (B1–B5)"
        rows={synthesisRowsPreDef}
        notes={data.synthesisNotesPre}
        onChangeNote={onChangeNotesPre}
      />

      {/* Sub-Block 2: Assessment Result View */}
      <SectionBlock>
        <SectionBlockTitle>Assessment Result View</SectionBlockTitle>
        <SectionBlockSubtitle>Records the 18 traits assessed layer-wise</SectionBlockSubtitle>

        <CompTableContainer style={{ overflowX: 'auto' }}>
          <CompTableHeaderRow style={{ gridTemplateColumns: '50px 180px 180px 1fr 100px 180px 60px', minWidth: '900px' }}>
            <CompTableHeaderCell>No</CompTableHeaderCell>
            <CompTableHeaderCell>Layer–Trait</CompTableHeaderCell>
            <CompTableHeaderCell>Trait Name</CompTableHeaderCell>
            <CompTableHeaderCell>What It Measures</CompTableHeaderCell>
            <CompTableHeaderCell>Grade</CompTableHeaderCell>
            <CompTableHeaderCell>Grade Meaning</CompTableHeaderCell>
            <CompTableHeaderCell style={{ textAlign: 'center' }}>Action</CompTableHeaderCell>
          </CompTableHeaderRow>

          {data.traitsTable.map((t, idx) => (
            <CompDataRow key={t.id} style={{ gridTemplateColumns: '50px 180px 180px 1fr 100px 180px 60px', minWidth: '900px' }}>
              <CompParamCell>{idx + 1}</CompParamCell>
              <CompResponseCell style={{ borderLeft: 'none' }}>
                <FormInput
                  value={t.layerTrait}
                  onChange={e => handleTraitChange(t.id, 'layerTrait', e.target.value)}
                  style={{ width: '100%' }}
                />
              </CompResponseCell>
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
          ))}
        </CompTableContainer>

        <div>
          <Button
            size="sm"
            variant="secondary"
            leftIcon={<RiAddLine size={16} />}
            onClick={handleAddTrait}
          >
            Add Assessed Trait Row
          </Button>
        </div>

        {/* 3-cell Summary Strip */}
        <SummaryCardStrip style={{ marginTop: '12px' }}>
          <SummaryCard>
            <SummaryCardLabel>Career Style</SummaryCardLabel>
            <FormInput
              value={data.summaryStrip.careerStyle}
              onChange={e => onChangeSummary({ careerStyle: e.target.value })}
              style={{ width: '100%', fontWeight: 700 }}
            />
          </SummaryCard>
          <SummaryCard>
            <SummaryCardLabel>Personal Signature</SummaryCardLabel>
            <FormInput
              value={data.summaryStrip.personalSignature}
              onChange={e => onChangeSummary({ personalSignature: e.target.value })}
              style={{ width: '100%', fontWeight: 700 }}
            />
          </SummaryCard>
          <SummaryCard>
            <SummaryCardLabel>Thinking Mode</SummaryCardLabel>
            <FormInput
              value={data.summaryStrip.thinkingMode}
              onChange={e => onChangeSummary({ thinkingMode: e.target.value })}
              style={{ width: '100%', fontWeight: 700 }}
            />
          </SummaryCard>
        </SummaryCardStrip>
      </SectionBlock>

      {/* Career DNA Narrative Block (C1–C8) */}
      <SynthesisPanel>
        <SynthesisPanelHeader>Career DNA Narrative Synthesis (C1–C8)</SynthesisPanelHeader>
        <SynthesisRowList>
          <SynthesisRow>
            <SynthesisCodeLabel>C1</SynthesisCodeLabel>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <SummaryCardLabel>Career DNA Definition</SummaryCardLabel>
              <SynthesisInput
                value={data.careerDnaNarrative.dnaDefinition}
                onChange={e => onChangeDna('dnaDefinition', e.target.value)}
                placeholder="Enter Career DNA definition narrative..."
              />
            </div>
          </SynthesisRow>

          <SynthesisRow>
            <SynthesisCodeLabel>C2</SynthesisCodeLabel>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <SummaryCardLabel>Career Style reveals…</SummaryCardLabel>
              <SynthesisInput
                value={data.careerDnaNarrative.careerStyleReveals}
                onChange={e => onChangeDna('careerStyleReveals', e.target.value)}
                placeholder="Enter what Career Style reveals..."
              />
            </div>
          </SynthesisRow>

          <SynthesisRow>
            <SynthesisCodeLabel>C3</SynthesisCodeLabel>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <SummaryCardLabel>Personality Style reveals…</SummaryCardLabel>
              <SynthesisInput
                value={data.careerDnaNarrative.personalityStyleReveals}
                onChange={e => onChangeDna('personalityStyleReveals', e.target.value)}
                placeholder="Enter what Personality Style reveals..."
              />
            </div>
          </SynthesisRow>

          <SynthesisRow>
            <SynthesisCodeLabel>C4</SynthesisCodeLabel>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <SummaryCardLabel>Thinking Mode reveals…</SummaryCardLabel>
              <SynthesisInput
                value={data.careerDnaNarrative.thinkingModeReveals}
                onChange={e => onChangeDna('thinkingModeReveals', e.target.value)}
                placeholder="Enter what Thinking Mode reveals..."
              />
            </div>
          </SynthesisRow>

          <SynthesisRow>
            <SynthesisCodeLabel>C5</SynthesisCodeLabel>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <SummaryCardLabel>Aptitude Profile reveals…</SummaryCardLabel>
              <SynthesisInput
                value={data.careerDnaNarrative.aptitudeProfileReveals}
                onChange={e => onChangeDna('aptitudeProfileReveals', e.target.value)}
                placeholder="Enter what Aptitude Profile reveals..."
              />
            </div>
          </SynthesisRow>

          <SynthesisRow>
            <SynthesisCodeLabel>C6</SynthesisCodeLabel>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <SummaryCardLabel>Reinforcement Activity 1</SummaryCardLabel>
              <SynthesisInput
                value={data.careerDnaNarrative.reinforcementAct1}
                onChange={e => onChangeDna('reinforcementAct1', e.target.value)}
                placeholder="Reinforcement activity 1..."
              />
            </div>
          </SynthesisRow>

          <SynthesisRow>
            <SynthesisCodeLabel>C7</SynthesisCodeLabel>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <SummaryCardLabel>Reinforcement Activity 2</SummaryCardLabel>
              <SynthesisInput
                value={data.careerDnaNarrative.reinforcementAct2}
                onChange={e => onChangeDna('reinforcementAct2', e.target.value)}
                placeholder="Reinforcement activity 2..."
              />
            </div>
          </SynthesisRow>

          <SynthesisRow>
            <SynthesisCodeLabel>C8</SynthesisCodeLabel>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <SummaryCardLabel>Reinforcement Activity 3</SummaryCardLabel>
              <SynthesisInput
                value={data.careerDnaNarrative.reinforcementAct3}
                onChange={e => onChangeDna('reinforcementAct3', e.target.value)}
                placeholder="Reinforcement activity 3..."
              />
            </div>
          </SynthesisRow>
        </SynthesisRowList>
      </SynthesisPanel>
    </>
  );
};
