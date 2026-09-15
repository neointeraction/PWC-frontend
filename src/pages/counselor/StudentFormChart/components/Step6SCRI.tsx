import React from 'react';
import { CounsellorFormChartData } from '@/mocks/studentFormChart.mock';
import { ScriBandGuidance } from '@/types';
import { ALIGNMENT_MEANING } from '@/utils/academicAlignmentGuidance';
import { Select } from '@/components/Select';
import { SynthesisNotesPanel } from './SynthesisNotesPanel';
import {
  StepHeaderCard,
  StepHeaderTitle,
  SectionBlock,
  SectionBlockTitle,
  ScriRow,
  ScriInfo,
  ScriName,
  ScriDesc,
  RadioGroup,
  RadioLabel,
  RadioInput,
  RadioCustom,
  ScriResultCard,
  ScriResultHeader,
  ScriScoreLabel,
  ScriScoreNumber,
  ScriBandBadge,
  ScriGuidanceText,
  TraitTableContainer,
  TraitTableHeaderRow,
  TraitTableHeaderCell,
  TraitDataRow,
  TraitCell,
} from '../StudentFormChartPage.styles';

const SCRI_GUIDANCE_GRID = '1fr 1fr 1fr';

interface Step6SCRIProps {
  data: CounsellorFormChartData['sectionE'];
  bandGuidance?: ScriBandGuidance[];
  onChangeScriRating: (code: string, rating: number) => void;
  onChangeAlignment: (
    alignment: CounsellorFormChartData['sectionE']['academicCareerAlignment']
  ) => void;
  onChangeNotes: (code: string, value: string) => void;
}

const synthesisRowsGDef = [
  {
    code: 'G1',
    placeholder:
      'Behavioural Evidence : Note the specific behaviours or statements observed in-session that justify each S1–S6 score (e.g. "asked three follow-up questions unprompted" → strong S5).',
  },
  {
    code: 'G2',
    placeholder:
      'Pacing Decision : If the SCRI Band is 1 or 2 (Pre-/Early Exploration), soften the roadmap pacing: prioritise trust-building and low-pressure exploration over firm stream/degree decisions.',
  },
  {
    code: 'G3',
    placeholder:
      'Momentum Plan : If the SCRI Band is 3 or 4 (Active Exploration / Career Ready), proceed with concrete next steps in Section E and share the pathway confidently with parents at the PTM.',
  },
  {
    code: 'G4',
    placeholder:
      "Cross-check : Read the SCRI Band alongside the Academic × Career Alignment rating; a low Band combined with 'Misaligned' means the stream/career recommendation should be treated as provisional, not final.",
  },
];

const alignmentOptions = [
  { value: 'Strongly Aligned', label: 'Strongly Aligned' },
  { value: 'Partially Aligned', label: 'Partially Aligned' },
  { value: 'Misaligned', label: 'Misaligned' },
  { value: 'Not Yet Assessed', label: 'Not Yet Assessed' },
];

// Maps this component's display-string alignment values to the shared ALIGNMENT_MEANING
// lookup (keyed by the API's AlignmentRating enum), so the guidance text shown here always
// matches the student report exactly.
const alignmentDisplayToApiKey: Record<string, keyof typeof ALIGNMENT_MEANING> = {
  'Strongly Aligned': 'STRONGLY_ALIGNED',
  'Partially Aligned': 'PARTIALLY_ALIGNED',
  'Misaligned': 'MISALIGNED',
  'Not Yet Assessed': 'NOT_YET_ASSESSED',
};

const alignmentDescriptionMap: Record<string, string> = Object.fromEntries(
  Object.entries(alignmentDisplayToApiKey).map(([display, apiKey]) => [display, ALIGNMENT_MEANING[apiKey]])
);

const scriDescriptors: Record<string, Record<number, string>> = {
  S1: {
    1: 'Hesitant, avoids the topic, monosyllabic answers',
    2: 'Engages only when prompted; visible hesitance',
    3: 'Generally comfortable; occasional hesitation',
    4: 'Calm, clear, self-assured across the session',
  },
  S2: {
    1: 'Answers driven entirely by parent/peer opinion, no personal reasoning',
    2: 'Mostly borrowed reasoning with occasional personal input',
    3: 'Balances own view with external input; some justification given',
    4: 'Consistently justifies choices with own reasoning',
  },
  S3: {
    1: 'Visibly anxious, avoids ambiguity, seeks certainty urgently',
    2: 'Some discomfort with open-ended questions; needs reassurance',
    3: 'Manages uncertainty with mild support from counsellor',
    4: 'Explores calmly and curiously, comfortable not having all answers',
  },
  S4: {
    1: "Unclear about own interests; largely echoes others' expectations",
    2: 'Partial self-awareness; some confusion with external pressure',
    3: 'Fairly clear about self, with occasional external influence',
    4: 'Clear self-narrative of interests, strengths, and values',
  },
  S5: {
    1: 'No independent exploration; entirely passive',
    2: 'Minimal exploration, only when directed to',
    3: 'Occasional independent exploration between sessions',
    4: 'Active researcher; brings new questions and findings',
  },
  S6: {
    1: 'Decision fully driven by parents/others',
    2: 'Student has some voice, but parents largely decide',
    3: 'Shared ownership between student and parents',
    4: 'Fully owns the decision; counsellor is a guide',
  },
};

export const Step6SCRI: React.FC<Step6SCRIProps> = ({
  data,
  bandGuidance,
  onChangeScriRating,
  onChangeAlignment,
  onChangeNotes,
}) => {
  const { scriItems, academicCareerAlignment, synthesisNotes } = data;

  // Auto-calculate SCRI Total
  const scriTotal = scriItems.reduce((acc, item) => acc + item.rating, 0);

  const getScriBandInfo = (total: number) => {
    if (total >= 21) {
      return {
        band: 'Band 4',
        label: 'Career Ready',
        guidance:
          'The student is confidently driving their own career conversations — self-aware, curious, comfortable with ambiguity, and ready to commit to concrete next steps with real ownership.',
      };
    }
    if (total >= 16) {
      return {
        band: 'Band 3',
        label: 'Active Exploration',
        guidance:
          'The student is engaging meaningfully — reasoning through options in their own words, showing curiosity beyond the session, and able to sit with some uncertainty without needing it resolved immediately.',
      };
    }
    if (total >= 11) {
      return {
        band: 'Band 2',
        label: 'Early Exploration',
        guidance:
          'The student is beginning to engage but is still tentative — occasional flashes of independent thinking or curiosity, but still largely reassurance-seeking and not yet driving the conversation.',
      };
    }
    return {
      band: 'Band 1',
      label: 'Pre-Exploration',
      guidance:
        "The student isn't yet engaging with career thinking — conversations feel abstract or externally driven, and most responses in-session leaned on parents/others rather than the student's own view. This is a normal starting point for many students, not a deficiency.",
    };
  };

  const currentBandInfo = getScriBandInfo(scriTotal);
  const currentBandNumber = Number(currentBandInfo.band.replace('Band ', ''));
  const currentBandDetail = bandGuidance?.find(b => b.band === currentBandNumber);

  return (
    <>
      <StepHeaderCard>
        <StepHeaderTitle>Student Career Readiness Index (SCRI)</StepHeaderTitle>
      </StepHeaderCard>

      {/* SCRI Block */}
      <SectionBlock>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {scriItems.map((item, index) => (
            <ScriRow
              key={item.code}
              style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}
            >
              <ScriInfo>
                <ScriName>
                  {index + 1} · {item.name}
                </ScriName>
                <ScriDesc>{item.description}</ScriDesc>
              </ScriInfo>
              <RadioGroup>
                {[1, 2, 3, 4].map(val => (
                  <RadioLabel key={val} $checked={item.rating === val}>
                    <RadioInput
                      type="radio"
                      name={`scri-${item.code}`}
                      value={val}
                      checked={item.rating === val}
                      onChange={() => onChangeScriRating(item.code, val)}
                    />
                    <RadioCustom style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>
                      <strong>{val}</strong> — {scriDescriptors[item.code][val]}
                    </span>
                  </RadioLabel>
                ))}
              </RadioGroup>
            </ScriRow>
          ))}
        </div>

        {/* Dynamic Auto-populated SCRI Summary Output */}
        <ScriResultCard>
          <ScriResultHeader>
            <ScriBandBadge $band={currentBandInfo.band}>
              <ScriScoreLabel>Score - </ScriScoreLabel>
              <ScriScoreNumber>{scriTotal}</ScriScoreNumber>
              <ScriScoreLabel> out of 24 </ScriScoreLabel>( {currentBandInfo.band} : {currentBandInfo.label} )
            </ScriBandBadge>
          </ScriResultHeader>
          <ScriGuidanceText>{currentBandDetail?.labelMeaning ?? currentBandInfo.guidance}</ScriGuidanceText>
          {currentBandDetail && (
            <TraitTableContainer style={{ marginTop: '12px', overflowX: 'auto' }}>
              <TraitTableHeaderRow style={{ gridTemplateColumns: SCRI_GUIDANCE_GRID, minWidth: '600px' }}>
                <TraitTableHeaderCell>For Students</TraitTableHeaderCell>
                <TraitTableHeaderCell>Tips for Students</TraitTableHeaderCell>
                <TraitTableHeaderCell>Tips for Parent</TraitTableHeaderCell>
              </TraitTableHeaderRow>
              <TraitDataRow style={{ gridTemplateColumns: SCRI_GUIDANCE_GRID, minWidth: '600px' }}>
                <TraitCell $secondary>{currentBandDetail.forStudents}</TraitCell>
                <TraitCell $secondary>{currentBandDetail.tipsForStudents}</TraitCell>
                <TraitCell $secondary>{currentBandDetail.tipsForParent}</TraitCell>
              </TraitDataRow>
            </TraitTableContainer>
          )}
        </ScriResultCard>
      </SectionBlock>

      {/* Academic × Career Alignment Block */}
      <SectionBlock>
        <SectionBlockTitle>Academic × Career Alignment</SectionBlockTitle>
        <div style={{ maxWidth: '320px', marginTop: '8px' }}>
          <Select
            value={academicCareerAlignment}
            onChange={e => onChangeAlignment(e.target.value as any)}
            options={alignmentOptions}
          />
        </div>
        {alignmentDescriptionMap[academicCareerAlignment] && (
          <div
            style={{
              fontSize: '0.875rem',
              color: '#334155',
              lineHeight: 1.55,
              marginTop: '12px',
              background: '#F8FAFC',
              padding: '14px 16px',
              borderRadius: '4px',
              border: '1px solid #E2E8F0',
            }}
          >
            {alignmentDescriptionMap[academicCareerAlignment]}
          </div>
        )}
      </SectionBlock>

      {/* Synthesis Notes G1–G4 */}
      <SynthesisNotesPanel
        title="Counsellor Synthesis Notes"
        rows={synthesisRowsGDef}
        notes={synthesisNotes}
        onChangeNote={onChangeNotes}
      />
    </>
  );
};
