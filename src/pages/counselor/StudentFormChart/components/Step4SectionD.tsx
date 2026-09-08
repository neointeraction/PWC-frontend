import React from 'react';
import { RiAlertLine } from 'react-icons/ri';
import { CounsellorFormChartData, ReliabilityCardData, MirrorPairSummaryItem } from '@/mocks/studentFormChart.mock';
import { Badge } from '@/components/Badge';
import { SynthesisNotesPanel } from './SynthesisNotesPanel';
import {
  StepHeaderCard,
  StepHeaderTitle,
  SectionBlock,
  SectionBlockTitle,
  SectionBlockSubtitle,
  IndicatorBlock,
  ReliabilityCardHeader,
  IndicatorTitle,
  IndicatorQuestion,
  ReliabilityValueDisplay,
  ReliabilityExplanationBox,
  TraitTableContainer,
  TraitTableHeaderRow,
  TraitTableHeaderCell,
  TraitDataRow,
  TraitCell,
  CategoryBlockHeader,
  CategoryBlockTitle,
  RedFlagNotice,
} from '../StudentFormChartPage.styles';

interface Step4SectionDProps {
  data: CounsellorFormChartData['sectionD'];
  onChangeIndicator?: (code: string, updated: Partial<ReliabilityCardData>) => void;
  onChangeNotes: (code: string, value: string) => void;
  onAmendMirrorPair?: (questionCode: string, amendedOption: number) => void;
  onRevertMirrorPair?: (questionCode: string) => void;
  mirrorPairActionPending?: boolean;
}

const SEVERITY_BADGE_VARIANT: Record<MirrorPairSummaryItem['severity'], 'success' | 'default' | 'warning' | 'danger'> = {
  good: 'success',
  acceptable: 'default',
  mild: 'warning',
  strong: 'danger',
};

const MIRROR_PAIR_GRID = '80px 1.55fr 1.55fr 70px 130px 1.5fr';

// F1-F3 (not G1-G3 — those codes belong to the SCRI step's synthesis notes on the
// backend; reusing them here would silently collide with Step6SCRI's saved notes).
const synthesisRowsGDef = [
  { code: 'F1', placeholder: "EIM follow-up : If below 75%, plan to gently re-probe Mirror Pair items conversationally, rather than presenting the personality profile as fixed." },
  { code: 'F2', placeholder: "AAI / 'Don't Know' pattern : A high proportion of 'Don't Know' responses signals genuine uncertainty, low confidence, or disengagement, not necessarily low ability. Note which specific aptitude areas had the most 'Don't Know' responses and frame these as development opportunities if required in career planning or academics. Read this with ACI parameter also." },
  { code: 'F3', placeholder: "Re-assessment Call : Based on the reliability picture, note whether a full re-assessment is warranted, or whether a supplementary conversation in-session is sufficient to firm up the profile." },
];

// One side of a mirror pair: shows the question code + punched response, plus an
// inline "amend" select and a "Revert" action wired to the backend's mirror-pair
// amendment endpoints (POST/DELETE .../mirror-pair-amendments).
const QuestionAmendCell: React.FC<{
  questionCode: string;
  response: number;
  disabled: boolean;
  onAmend?: (questionCode: string, amendedOption: number) => void;
  onRevert?: (questionCode: string) => void;
}> = ({ questionCode, response, disabled, onAmend, onRevert }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
    <span>
      <strong>{questionCode}</strong> — response {response}
    </span>
    {(onAmend || onRevert) && (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {onAmend && (
          <select
            key={`${questionCode}-${response}`}
            defaultValue=""
            disabled={disabled}
            onChange={e => {
              const value = Number(e.target.value);
              if (value) onAmend(questionCode, value);
              e.target.value = '';
            }}
            style={{
              fontSize: '0.78rem',
              padding: '2px 4px',
              borderRadius: '4px',
              border: '1px solid #CBD5E1',
            }}
          >
            <option value="">Amend to…</option>
            {[1, 2, 3, 4, 5].map(v => (
              <option key={v} value={v} disabled={v === response}>
                {v}
              </option>
            ))}
          </select>
        )}
        {onRevert && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => onRevert(questionCode)}
            style={{
              fontSize: '0.78rem',
              color: '#2563EB',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: disabled ? 'default' : 'pointer',
              textDecoration: 'underline',
            }}
          >
            Revert
          </button>
        )}
      </div>
    )}
  </div>
);

export const Step4SectionD: React.FC<Step4SectionDProps> = ({
  data,
  onChangeNotes,
  onAmendMirrorPair,
  onRevertMirrorPair,
  mirrorPairActionPending,
}) => {
  const flaggedCount = data.mirrorPairs.filter(p => p.flagged).length;

  return (
    <>
      <StepHeaderCard>
        <StepHeaderTitle>Reliability of the Assessment</StepHeaderTitle>
      </StepHeaderCard>

      <SectionBlock>
        {data.indicators.map(item => {
          // Parse score (e.g. "76%") and label (e.g. "High reliability")
          const parts = item.valueStatus.split(' ');
          const firstPartIsPercent = parts[0]?.includes('%');
          const score = firstPartIsPercent ? parts[0] : '';
          const label = firstPartIsPercent ? parts.slice(1).join(' ') : item.valueStatus;

          return (
            <IndicatorBlock
              key={item.code}
              style={{
                border: '1px solid #E2E8F0',
                borderRadius: '4px',
                padding: '16px 18px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
              }}
            >
              <ReliabilityCardHeader>
                <div>
                  <IndicatorTitle>
                    {item.code} — {item.name}
                  </IndicatorTitle>
                  <IndicatorQuestion>{item.guidingQuestion}</IndicatorQuestion>
                </div>
                <ReliabilityValueDisplay>
                  {score && (
                    <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0F172A' }}>
                      {score}
                    </span>
                  )}
                  <span
                    style={{
                      fontWeight: 600,
                      fontStyle: 'italic',
                      color:
                        label.toLowerCase().includes('high') || label.toLowerCase().includes('optimal')
                          ? '#16A34A'
                          : '#0F172A',
                      fontSize: '0.95rem',
                    }}
                  >
                    {label}
                  </span>
                </ReliabilityValueDisplay>
              </ReliabilityCardHeader>

              <ReliabilityExplanationBox>
                {item.explanationText}
              </ReliabilityExplanationBox>
            </IndicatorBlock>
          );
        })}
      </SectionBlock>

      <SectionBlock>
        <SectionBlockTitle>Mirror Pair Consistency Check</SectionBlockTitle>
        <SectionBlockSubtitle>
          The 10 opposite-construct question pairs behind the EIM score above. A consistent
          responder rates each pair far apart; contradictions (gap ≤ 1) are flagged.
        </SectionBlockSubtitle>

        <div
          style={{
            marginTop: '16px',
            border: '1px solid #E2E8F0',
            borderRadius: '4px',
            padding: '16px',
            backgroundColor: '#FFFFFF',
          }}
        >
          <CategoryBlockHeader>
            <CategoryBlockTitle>Mirror Pairs</CategoryBlockTitle>
          </CategoryBlockHeader>

          {data.mirrorPairs.length === 0 ? (
            <div style={{ padding: '16px', textAlign: 'center', color: '#64748B', fontSize: '0.85rem' }}>
              No mirror-pair data available — assessment not yet submitted.
            </div>
          ) : (
            <TraitTableContainer>
              <TraitTableHeaderRow style={{ gridTemplateColumns: MIRROR_PAIR_GRID }}>
                <TraitTableHeaderCell>Pair</TraitTableHeaderCell>
                <TraitTableHeaderCell>Question A</TraitTableHeaderCell>
                <TraitTableHeaderCell>Question B</TraitTableHeaderCell>
                <TraitTableHeaderCell $align="center">Gap</TraitTableHeaderCell>
                <TraitTableHeaderCell $align="center">Severity</TraitTableHeaderCell>
                <TraitTableHeaderCell>Status</TraitTableHeaderCell>
              </TraitTableHeaderRow>

              {data.mirrorPairs.map(pair => (
                <TraitDataRow
                  key={pair.code}
                  $highlight={pair.flagged}
                  style={{ gridTemplateColumns: MIRROR_PAIR_GRID }}
                >
                  <TraitCell $bold>{pair.code}</TraitCell>
                  <TraitCell>
                    <QuestionAmendCell
                      questionCode={pair.questionA}
                      response={pair.responseA}
                      disabled={!!mirrorPairActionPending}
                      onAmend={onAmendMirrorPair}
                      onRevert={onRevertMirrorPair}
                    />
                  </TraitCell>
                  <TraitCell>
                    <QuestionAmendCell
                      questionCode={pair.questionB}
                      response={pair.responseB}
                      disabled={!!mirrorPairActionPending}
                      onAmend={onAmendMirrorPair}
                      onRevert={onRevertMirrorPair}
                    />
                  </TraitCell>
                  <TraitCell $align="center" $bold>
                    {pair.gap}
                  </TraitCell>
                  <TraitCell $align="center">
                    <Badge variant={SEVERITY_BADGE_VARIANT[pair.severity]}>{pair.severity}</Badge>
                  </TraitCell>
                  <TraitCell $secondary>
                    {pair.flagged
                      ? 'Needs counsellor review'
                      : pair.severity === 'mild'
                        ? 'Minor — monitor'
                        : 'Consistent'}
                  </TraitCell>
                </TraitDataRow>
              ))}
            </TraitTableContainer>
          )}

          {flaggedCount > 0 && (
            <RedFlagNotice>
              <RiAlertLine size={15} style={{ flexShrink: 0 }} />
              <span>
                {flaggedCount} mirror pair{flaggedCount > 1 ? 's' : ''} flagged as strong
                contradictions — review with the student before treating the personality profile
                as fixed, or amend the response above if it was a punching error.
              </span>
            </RedFlagNotice>
          )}
        </div>
      </SectionBlock>

      <SynthesisNotesPanel
        title="Counsellor Synthesis Notes"
        rows={synthesisRowsGDef}
        notes={data.synthesisNotes}
        onChangeNote={onChangeNotes}
      />
    </>
  );
};
