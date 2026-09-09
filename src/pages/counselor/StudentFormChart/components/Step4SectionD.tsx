import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { RiAlertLine } from 'react-icons/ri';
import { CounsellorFormChartData, ReliabilityCardData, MirrorPairSummaryItem } from '@/mocks/studentFormChart.mock';
import { Badge } from '@/components/Badge';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { cohortsService } from '@/services/cohorts.service';
import { assessmentService } from '@/services/assessment.service';
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

const MIRROR_PAIR_GRID = '1.55fr 1.55fr 130px';

// 5-point scale used across RIASEC / Big Five / Cognitive & Decision Style
// (see RESPONSE VALIDITY SCORE section of the assessment construct doc).
const RESPONSE_LABELS: Record<number, string> = {
  1: 'Strongly Disagree',
  2: 'Disagree',
  3: 'Neutral',
  4: 'Agree',
  5: 'Strongly Agree',
};

// F1-F3 (not G1-G3 — those codes belong to the SCRI step's synthesis notes on the
// backend; reusing them here would silently collide with Step6SCRI's saved notes).
const synthesisRowsGDef = [
  { code: 'F1', placeholder: "EIM follow-up : If below 75%, plan to gently re-probe Mirror Pair items conversationally, rather than presenting the personality profile as fixed." },
  { code: 'F2', placeholder: "AAI / 'Don't Know' pattern : A high proportion of 'Don't Know' responses signals genuine uncertainty, low confidence, or disengagement, not necessarily low ability. Note which specific aptitude areas had the most 'Don't Know' responses and frame these as development opportunities if required in career planning or academics. Read this with ACI parameter also." },
  { code: 'F3', placeholder: "Re-assessment Call : Based on the reliability picture, note whether a full re-assessment is warranted, or whether a supplementary conversation in-session is sufficient to firm up the profile." },
];

// One side of a mirror pair: shows the question text + punched response, plus an
// inline "amend" select wired to the backend's mirror-pair amendment endpoint
// (POST .../mirror-pair-amendments). Amending overwrites the punched answer, so it's
// gated behind a confirm dialog — there's no undo once it's applied.
const QuestionAmendCell: React.FC<{
  questionCode: string;
  questionText?: string;
  response: number;
  disabled: boolean;
  onAmend?: (questionCode: string, amendedOption: number) => void;
}> = ({ questionCode, questionText, response, disabled, onAmend }) => {
  const [pendingValue, setPendingValue] = React.useState<number | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span>{questionText ?? questionCode}</span>
      <span style={{ color: '#475569' }}>{RESPONSE_LABELS[response] ?? `response ${response}`}</span>
      {onAmend && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <select
            key={`${questionCode}-${response}`}
            defaultValue=""
            disabled={disabled}
            onChange={e => {
              const value = Number(e.target.value);
              if (value) setPendingValue(value);
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
            {Object.entries(RESPONSE_LABELS).map(([value, label]) => (
              <option key={value} value={value} disabled={Number(value) === response}>
                {label}
              </option>
            ))}
          </select>
        </div>
      )}

      <ConfirmDialog
        isOpen={pendingValue !== null}
        onClose={() => setPendingValue(null)}
        onConfirm={() => {
          if (pendingValue != null) onAmend?.(questionCode, pendingValue);
          setPendingValue(null);
        }}
        title="Amend Response"
        description={`Change this response to "${pendingValue != null ? RESPONSE_LABELS[pendingValue] : ''}" and re-score the assessment? This cannot be undone.`}
        confirmLabel="Amend"
        isDangerous
      />
    </div>
  );
};

export const Step4SectionD: React.FC<Step4SectionDProps> = ({
  data,
  onChangeNotes,
  onAmendMirrorPair,
  mirrorPairActionPending,
}) => {
  const strongPairs = data.mirrorPairs.filter(p => p.severity === 'strong');
  const flaggedCount = strongPairs.filter(p => p.flagged).length;
  // Good/acceptable pairs are consistent by definition — only mild and strong
  // contradictions need a counsellor's eyes.
  const visiblePairs = data.mirrorPairs.filter(p => p.severity === 'mild' || p.severity === 'strong');

  // Mirror-pair codes (e.g. "Q33") only ever come back from the RVS scoring result —
  // the full question wording lives in the assessment question bank, keyed by cohort.
  // There's currently a single system-wide active cohort (see backend
  // students.service.ts getStudentByUserId), so the first entry from /cohorts is it.
  const { data: cohorts } = useQuery({
    queryKey: ['cohorts'],
    queryFn: cohortsService.list,
    staleTime: Infinity,
  });
  const cohortCode = cohorts?.[0]?.code;

  const { data: questionBank } = useQuery({
    queryKey: ['assessment-question-bank', cohortCode],
    queryFn: () => assessmentService.getQuestions(cohortCode!),
    enabled: !!cohortCode,
    staleTime: Infinity,
  });

  const questionTextByCode = React.useMemo(() => {
    const map = new Map<string, string>();
    questionBank?.forEach(q => {
      if (q.questionCode) map.set(q.questionCode, q.questionText);
    });
    return map;
  }, [questionBank]);
  const eimIndicator = data.indicators.find(item => item.code === 'EIM');
  const eimParts = eimIndicator?.valueStatus.split(' ') ?? [];
  const eimScore = eimParts[0]?.includes('%') ? eimParts[0] : '';
  const eimLevel = eimParts[0]?.includes('%') ? eimParts.slice(1).join(' ') : eimIndicator?.valueStatus ?? '';

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
          The 10 opposite-construct question pairs behind the Response Validity Score (RVS). A
          consistent responder rates each pair far apart; strong contradictions (gap = 0) are the
          ones that need a counsellor's attention.
        </SectionBlockSubtitle>

        {eimIndicator && (
          <IndicatorBlock
            style={{
              marginTop: '12px',
              border: '1px solid #E2E8F0',
              borderRadius: '4px',
              padding: '16px 18px',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
            }}
          >
            <ReliabilityCardHeader>
              <div>
                <IndicatorTitle>Response Validity Score (RVS)</IndicatorTitle>
                <IndicatorQuestion>{eimIndicator.guidingQuestion}</IndicatorQuestion>
              </div>
              <ReliabilityValueDisplay>
                {eimScore && (
                  <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0F172A' }}>
                    {eimScore}
                  </span>
                )}
                <span
                  style={{
                    fontWeight: 600,
                    fontStyle: 'italic',
                    color: eimLevel.toLowerCase().includes('highly consistent') ? '#16A34A' : '#0F172A',
                    fontSize: '0.95rem',
                  }}
                >
                  {eimLevel}
                </span>
              </ReliabilityValueDisplay>
            </ReliabilityCardHeader>

            <ReliabilityExplanationBox>{eimIndicator.explanationText}</ReliabilityExplanationBox>
          </IndicatorBlock>
        )}

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
          ) : visiblePairs.length === 0 ? (
            <div style={{ padding: '16px', textAlign: 'center', color: '#64748B', fontSize: '0.85rem' }}>
              No mild or strong contradictions detected — all mirror pairs are consistent.
            </div>
          ) : (
            <TraitTableContainer>
              <TraitTableHeaderRow style={{ gridTemplateColumns: MIRROR_PAIR_GRID }}>
                <TraitTableHeaderCell>Question A</TraitTableHeaderCell>
                <TraitTableHeaderCell>Question B</TraitTableHeaderCell>
                <TraitTableHeaderCell $align="center">Severity</TraitTableHeaderCell>
              </TraitTableHeaderRow>

              {visiblePairs.map(pair => (
                <TraitDataRow
                  key={pair.code}
                  $highlight={pair.flagged}
                  style={{ gridTemplateColumns: MIRROR_PAIR_GRID }}
                >
                  <TraitCell>
                    <QuestionAmendCell
                      questionCode={pair.questionA}
                      questionText={questionTextByCode.get(pair.questionA)}
                      response={pair.responseA}
                      disabled={!!mirrorPairActionPending}
                      onAmend={onAmendMirrorPair}
                    />
                  </TraitCell>
                  <TraitCell>
                    <QuestionAmendCell
                      questionCode={pair.questionB}
                      questionText={questionTextByCode.get(pair.questionB)}
                      response={pair.responseB}
                      disabled={!!mirrorPairActionPending}
                      onAmend={onAmendMirrorPair}
                    />
                  </TraitCell>
                  <TraitCell $align="center">
                    <Badge variant={SEVERITY_BADGE_VARIANT[pair.severity]}>{pair.severity}</Badge>
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
