import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  RiQuestionLine,
  RiGridLine,
  RiTimerFlashLine,
  RiShieldCheckLine,
  RiVolumeMuteLine,
  RiTimerLine,
  RiSmartphoneLine,
  RiInformationLine,
  RiStarLine,
  RiSparklingLine,
  RiPlayCircleLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckLine,
  // RiSaveLine, // unused while the "Save Draft" button is commented out
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import { SuccessModal } from '@/components';
import { ROUTES } from '@/constants';
import { useToast, useCurrentStudent } from '@/hooks';
import {
  formsService,
  FormAnswerItem,
  FormQuestion,
  McqOption,
  MatrixOptions,
} from '@/services/forms.service';
import { getApiErrorMessage } from '@/utils';
import {
  FormPageContainer,
  HeroHeaderCard,
  DocumentHeaderRow,
  HeaderBackButton,
  DocTitle,
  StatsGridBar,
  StatBlock,
  StatIconBox,
  StatInfoBox,
  StatNumber,
  StatLabel,
  SectionTitleHeader,
  SectionHeaderIcon,
  SectionTitleText,
  NumberedCardsStack,
  NumberCardItem,
  NumberBadgeHeader,
  NumberBadgeIcon,
  NumberCardTitle,
  NumberCardDesc,
  StatementParagraphCard,
  StatementList,
  StatementListItem,
  GoldenRulesGrid,
  GoldenRuleCard,
  GoldenRuleIconBox,
  GoldenRuleContent,
  GoldenRuleTitle,
  GoldenRuleDesc,
  ReadyEncouragementBanner,
  ReadyBannerTitle,
  ReadyBannerSubtext,
  StartCtaBox,
  HeaderProgressCard,
  HeaderProgressRow,
  HeaderStepTitle,
  HeaderStepCount,
  HeaderProgressTrack,
  HeaderProgressBar,
  WizardContainer,
  WizardStepBody,
  QuestionBox,
  QuestionTitle,
  OptionList,
  OptionLabel,
  OptionTextGroup,
  OptionTitle,
  CustomTextInput,
  TableInput,
  WizardFooterNav,
  MarksTableContainer,
  MarksTable,
  SubjectCellText,
  OtherSubjectInput,
  InlineLabelRow,
  ReasonLabel,
  InlineReasonInput,
  RequiredMarker,
  QuestionErrorText,
} from './PreCounsellingFormPage.styles';

// ─────────────────────────────────────────────────────────────
// Generic, questionType-driven renderer. Every question, its section
// grouping (the wizard's 6 steps), and its options come from the real
// GET /forms/PRE_COUNSELLING_STUDENT template — nothing here is hardcoded
// per-question. See docs/db-design.md "Forms" section for the schema.
// ─────────────────────────────────────────────────────────────

const HELP_TEXT_STYLE: React.CSSProperties = {
  fontStyle: 'italic',
  color: '#64748B',
  fontSize: '13px',
  marginTop: 4,
  marginBottom: 16,
};

// By convention the seeded "Any Other" MCQ choice is identified by its label, not a flag
// on the option itself — allowOtherText/otherTextFieldKey just say the question *has* one.
const isOtherOption = (label: string): boolean => /any other|^other$/i.test(label.trim());

const normalizeOptions = (options: unknown): McqOption[] => {
  if (!Array.isArray(options)) return [];
  return options.map(o => (typeof o === 'string' ? { value: o, label: o } : o));
};

const MAX_SELECT_WORDS: Record<string, number> = { one: 1, two: 2, three: 3, four: 4, five: 5 };
// Soft UX cap only ("Choose up to TWO") — not enforced by the backend, so best-effort parse.
const extractMaxSelections = (questionText: string): number => {
  const m = questionText.match(/up to (\w+)/i);
  if (!m) return Infinity;
  const word = m[1].toLowerCase();
  if (MAX_SELECT_WORDS[word]) return MAX_SELECT_WORDS[word];
  const n = parseInt(word, 10);
  return Number.isFinite(n) ? n : Infinity;
};

const sectionHeading = (label: string | null | undefined): string =>
  (label || '').replace(/^Section\s*\d+\s*[—-]\s*/i, '').toUpperCase();

// Mirrors the backend's isAnswerEmpty (forms.service.ts) exactly, so a question flagged
// as missing here is guaranteed to also be flagged in the 400 { missingFieldKeys } response.
const isAnswerEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value as object).length === 0;
  return false;
};

// ---- Single-select (radio) control — used for top-level MCQ_SINGLE and MATRIX sub-fields ----
const McqSingleControl: React.FC<{
  options: McqOption[];
  allowOtherText?: boolean;
  value: unknown;
  onChange: (v: unknown) => void;
}> = ({ options, allowOtherText, value, onChange }) => {
  const current = allowOtherText ? (value as { value?: string; other?: string } | undefined) : undefined;
  const selected = allowOtherText ? current?.value : (value as string | undefined);
  const otherText = current?.other ?? '';

  const selectValue = (val: string) => {
    if (allowOtherText) onChange({ value: val, other: otherText });
    else onChange(val);
  };
  const setOther = (text: string) => {
    const otherOpt = options.find(o => isOtherOption(o.label));
    onChange({ value: otherOpt?.value ?? selected ?? '', other: text });
  };

  return (
    <OptionList>
      {options.map(o => {
        const isOther = Boolean(allowOtherText) && isOtherOption(o.label);
        return (
          <OptionLabel key={o.value} $selected={selected === o.value} style={isOther ? { alignItems: 'center' } : undefined}>
            <input type="radio" checked={selected === o.value} onChange={() => selectValue(o.value)} />
            {isOther ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <OptionTitle>{o.label} :</OptionTitle>
                <InlineReasonInput placeholder="Specify..." value={otherText} onChange={e => setOther(e.target.value)} />
              </div>
            ) : (
              <OptionTextGroup>
                <OptionTitle>{o.label}</OptionTitle>
              </OptionTextGroup>
            )}
          </OptionLabel>
        );
      })}
    </OptionList>
  );
};

// ---- Multi-select (checkbox) control — used for top-level MCQ_MULTI and MATRIX sub-fields ----
const McqMultiControl: React.FC<{
  options: McqOption[];
  allowOtherText?: boolean;
  maxSelections?: number;
  value: unknown;
  onChange: (v: unknown) => void;
}> = ({ options, allowOtherText, maxSelections, value, onChange }) => {
  const current = allowOtherText ? (value as { selected?: string[]; other?: string } | undefined) : undefined;
  const selectedList: string[] = allowOtherText ? current?.selected ?? [] : (value as string[]) ?? [];
  const otherText = current?.other ?? '';
  const cap = maxSelections ?? Infinity;

  const toggle = (val: string) => {
    let next: string[];
    if (selectedList.includes(val)) {
      next = selectedList.filter(v => v !== val);
    } else {
      if (selectedList.length >= cap) return;
      next = [...selectedList, val];
    }
    if (allowOtherText) onChange({ selected: next, other: otherText });
    else onChange(next);
  };
  const setOther = (text: string) => {
    const otherOpt = options.find(o => isOtherOption(o.label));
    let next = selectedList;
    if (otherOpt && text && !next.includes(otherOpt.value) && next.length < cap) {
      next = [...next, otherOpt.value];
    }
    onChange({ selected: next, other: text });
  };

  return (
    <OptionList>
      {options.map(o => {
        const isOther = Boolean(allowOtherText) && isOtherOption(o.label);
        const checked = selectedList.includes(o.value);
        return (
          <OptionLabel key={o.value} $selected={checked} style={isOther ? { alignItems: 'center' } : undefined}>
            <input type="checkbox" checked={checked} onChange={() => toggle(o.value)} />
            {isOther ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <OptionTitle>{o.label} :</OptionTitle>
                <InlineReasonInput placeholder="Specify..." value={otherText} onChange={e => setOther(e.target.value)} />
              </div>
            ) : (
              <OptionTextGroup>
                <OptionTitle>{o.label}</OptionTitle>
              </OptionTextGroup>
            )}
          </OptionLabel>
        );
      })}
    </OptionList>
  );
};

// Compact MCQ control for a MATRIX table cell alongside other columns (e.g. a Y/N field).
const CompactMcqSelect: React.FC<{
  options: McqOption[];
  multi?: boolean;
  value: unknown;
  onChange: (v: unknown) => void;
}> = ({ options, multi, value, onChange }) => {
  if (multi) {
    const selectedList = (value as string[]) ?? [];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {options.map(o => (
          <label key={o.value} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
            <input
              type="checkbox"
              checked={selectedList.includes(o.value)}
              onChange={() =>
                onChange(
                  selectedList.includes(o.value)
                    ? selectedList.filter(v => v !== o.value)
                    : [...selectedList, o.value]
                )
              }
            />
            {o.label}
          </label>
        ))}
      </div>
    );
  }
  return (
    <select
      value={(value as string) ?? ''}
      onChange={e => onChange(e.target.value)}
      style={{ width: '100%', padding: '6px 8px', borderRadius: 4, border: '1px solid #E2E8F0', fontSize: 13 }}
    >
      <option value="">—</option>
      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
};

// ---- MATRIX (table/grid) question renderer ----
const MatrixQuestion: React.FC<{
  options: MatrixOptions;
  value: Record<string, unknown> | undefined;
  onChange: (v: Record<string, unknown>) => void;
}> = ({ options, value, onChange }) => {
  const data = value ?? {};
  const rows = options.rows;
  const fields = options.fields;

  const getCell = (rowKey: string | null, fieldKey: string): unknown =>
    rowKey ? (data[rowKey] as Record<string, unknown> | undefined)?.[fieldKey] : data[fieldKey];

  const setCell = (rowKey: string | null, fieldKey: string, val: unknown) => {
    if (rowKey) {
      const rowData = { ...((data[rowKey] as Record<string, unknown>) || {}), [fieldKey]: val };
      onChange({ ...data, [rowKey]: rowData });
    } else {
      onChange({ ...data, [fieldKey]: val });
    }
  };

  // No rows: a small block of standalone fields (e.g. "favourite subject" + "reason").
  if (!rows || rows.length === 0) {
    return (
      <>
        {fields.map(field => (
          <div key={field.key} style={{ marginBottom: 16 }}>
            {field.type === 'SHORT_TEXT' || field.type === 'NUMBER' ? (
              <InlineLabelRow>
                <label>{field.label} :</label>
                <CustomTextInput
                  style={{ flex: 1, minWidth: 260 }}
                  type={field.type === 'NUMBER' ? 'number' : 'text'}
                  value={(getCell(null, field.key) as string) ?? ''}
                  onChange={e => setCell(null, field.key, e.target.value)}
                />
              </InlineLabelRow>
            ) : (
              <>
                <ReasonLabel>{field.label} :</ReasonLabel>
                {field.type === 'MCQ_MULTI' ? (
                  <McqMultiControl
                    options={normalizeOptions(field.options)}
                    allowOtherText={field.allowOtherText}
                    value={getCell(null, field.key)}
                    onChange={v => setCell(null, field.key, v)}
                  />
                ) : (
                  <McqSingleControl
                    options={normalizeOptions(field.options)}
                    allowOtherText={field.allowOtherText}
                    value={getCell(null, field.key)}
                    onChange={v => setCell(null, field.key, v)}
                  />
                )}
              </>
            )}
          </div>
        ))}
      </>
    );
  }

  // A single MCQ_SINGLE field: render its options as grid columns (e.g. a rating scale).
  if (fields.length === 1 && fields[0].type === 'MCQ_SINGLE') {
    const field = fields[0];
    const opts = normalizeOptions(field.options);
    return (
      <MarksTableContainer>
        <MarksTable>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }} />
              {opts.map(o => (
                <th key={o.value} style={{ textAlign: 'center' }}>
                  {o.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.key}>
                <td>
                  <SubjectCellText>{row.label}</SubjectCellText>
                </td>
                {opts.map(o => (
                  <td key={o.value} style={{ textAlign: 'center' }}>
                    <input
                      type="radio"
                      name={row.key}
                      checked={getCell(row.key, field.key) === o.value}
                      onChange={() => setCell(row.key, field.key, o.value)}
                      style={{ accentColor: '#1E40AF', cursor: 'pointer', width: 16, height: 16 }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </MarksTable>
      </MarksTableContainer>
    );
  }

  // General case: one column per field.
  return (
    <MarksTableContainer>
      <MarksTable>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }} />
            {fields.map(f => (
              <th key={f.key} style={{ textAlign: 'center' }}>
                {f.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.key}>
              <td>
                {row.labelEditable ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <SubjectCellText>{row.label}:</SubjectCellText>
                    <OtherSubjectInput
                      placeholder="Specify..."
                      value={(getCell(row.key, '__label') as string) ?? ''}
                      onChange={e => setCell(row.key, '__label', e.target.value)}
                    />
                  </div>
                ) : (
                  <SubjectCellText>{row.label}</SubjectCellText>
                )}
              </td>
              {fields.map(field => (
                <td key={field.key}>
                  {field.type === 'MCQ_SINGLE' || field.type === 'MCQ_MULTI' ? (
                    <CompactMcqSelect
                      multi={field.type === 'MCQ_MULTI'}
                      options={normalizeOptions(field.options)}
                      value={getCell(row.key, field.key)}
                      onChange={v => setCell(row.key, field.key, v)}
                    />
                  ) : (
                    <TableInput
                      type={field.type === 'NUMBER' ? 'number' : 'text'}
                      placeholder={field.label}
                      value={(getCell(row.key, field.key) as string) ?? ''}
                      onChange={e => setCell(row.key, field.key, e.target.value)}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </MarksTable>
    </MarksTableContainer>
  );
};

// ---- One question box, dispatched by questionType ----
const QuestionRenderer: React.FC<{
  question: FormQuestion;
  value: unknown;
  onChange: (v: unknown) => void;
  hasError?: boolean;
}> = ({ question, value, onChange, hasError }) => {
  const opts = useMemo(
    () => normalizeOptions(question.options as McqOption[] | string[] | undefined),
    [question.options]
  );

  return (
    <QuestionBox $hasError={hasError}>
      <QuestionTitle>
        {question.questionCode.replace(/^Q/i, '')}. {question.questionText}
        {question.isRequired && <RequiredMarker>*</RequiredMarker>}
      </QuestionTitle>
      {question.helpText && <p style={HELP_TEXT_STYLE}>{question.helpText}</p>}
      {hasError && <QuestionErrorText>This question is required.</QuestionErrorText>}

      {question.questionType === 'MATRIX' ? (
        <MatrixQuestion
          options={question.options as MatrixOptions}
          value={value as Record<string, unknown> | undefined}
          onChange={onChange}
        />
      ) : question.questionType === 'MCQ_MULTI' ? (
        <McqMultiControl
          options={opts}
          allowOtherText={question.allowOtherText}
          maxSelections={extractMaxSelections(question.questionText)}
          value={value}
          onChange={onChange}
        />
      ) : question.questionType === 'MCQ_SINGLE' || question.questionType === 'SCALE' ? (
        <McqSingleControl options={opts} allowOtherText={question.allowOtherText} value={value} onChange={onChange} />
      ) : (
        <CustomTextInput
          type={question.questionType === 'NUMBER' ? 'number' : 'text'}
          placeholder="Type your answer..."
          value={(value as string) ?? ''}
          onChange={e => onChange(e.target.value)}
        />
      )}
    </QuestionBox>
  );
};

export const PreCounsellingFormPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data: me, isLoading: isMeLoading } = useCurrentStudent();
  const cohort = me?.cohort?.code;

  // The real question set, grouped/ordered — nothing about the 19 questions or their
  // 6-section grouping is hardcoded; both come straight from the template.
  const { data: template, isLoading: isTemplateLoading } = useQuery({
    queryKey: ['form-template', 'PRE_COUNSELLING_STUDENT', cohort],
    queryFn: () => formsService.getTemplate('PRE_COUNSELLING_STUDENT', cohort!),
    enabled: !!cohort,
    staleTime: 5 * 60_000,
  });

  // Load any existing draft/submission so the form prefills what was saved before.
  const { data: existingSubmission } = useQuery({
    queryKey: ['form-submission', 'PRE_COUNSELLING_STUDENT', me?.id, cohort],
    queryFn: () => formsService.getSubmission('PRE_COUNSELLING_STUDENT', me!.id, cohort!),
    enabled: !!me?.id && !!cohort,
    staleTime: 30_000,
  });

  const sections = useMemo(() => {
    const questions = [...(template?.questions ?? [])].sort((a, b) => a.order - b.order);
    const bySection = new Map<string, FormQuestion[]>();
    const sectionOrder: string[] = [];
    questions.forEach(q => {
      const key = q.sectionLabel || 'Questions';
      if (!bySection.has(key)) {
        bySection.set(key, []);
        sectionOrder.push(key);
      }
      bySection.get(key)!.push(q);
    });
    return sectionOrder.map(label => ({ label, questions: bySection.get(label)! }));
  }, [template]);

  const totalSteps = sections.length || 1;
  const totalQuestions = template?.questions.length ?? 0;

  const [isFormStarted, setIsFormStarted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const topRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () => {
    setTimeout(() => {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      const mainEl = document.querySelector('main');
      if (mainEl) {
        mainEl.scrollTo({ top: 0, behavior: 'smooth' });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  // Answers keyed by fieldKey — a MATRIX question's value is a nested object
  // (per-row/per-field), everything else is a plain value. This is a 1:1 mirror of
  // FormAnswerItem[], so build/prefill are trivial (no per-question parsing).
  const [answers, setAnswers] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (!existingSubmission) return;
    setAnswers(prev => ({
      ...prev,
      ...Object.fromEntries(existingSubmission.answers.map(a => [a.fieldKey, a.answer])),
    }));
  }, [existingSubmission]);

  // Required questions left blank, keyed by fieldKey — populated on a failed Next/Submit
  // attempt so QuestionRenderer can highlight them; cleared as soon as the step re-validates clean.
  const [errorFieldKeys, setErrorFieldKeys] = useState<Set<string>>(new Set());

  const setAnswer = (fieldKey: string, value: unknown) => {
    setAnswers(prev => ({ ...prev, [fieldKey]: value }));
    if (!isAnswerEmpty(value)) {
      setErrorFieldKeys(prev => {
        if (!prev.has(fieldKey)) return prev;
        const next = new Set(prev);
        next.delete(fieldKey);
        return next;
      });
    }
  };

  const buildAnswers = (): FormAnswerItem[] =>
    (template?.questions ?? []).map(q => ({ fieldKey: q.fieldKey, answer: answers[q.fieldKey] ?? null }));

  const missingRequiredIn = (questions: FormQuestion[]): string[] =>
    questions.filter(q => q.isRequired && isAnswerEmpty(answers[q.fieldKey])).map(q => q.fieldKey);

  const handleNextStep = () => {
    const missing = missingRequiredIn(currentSection?.questions ?? []);
    if (missing.length > 0) {
      setErrorFieldKeys(new Set(missing));
      toast.error(
        'Some answers are missing',
        `Please answer all required questions on this step (${missing.length} remaining).`
      );
      return;
    }
    setErrorFieldKeys(new Set());
    setCurrentStep(prev => Math.min(totalSteps, prev + 1));
    scrollToTop();
  };

  const handlePrevStep = () => {
    setErrorFieldKeys(new Set());
    setCurrentStep(prev => Math.max(1, prev - 1));
    scrollToTop();
  };

  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState<boolean>(false);

  const handleSubmitForm = () => {
    const missing = missingRequiredIn(template?.questions ?? []);
    if (missing.length > 0) {
      const missingSet = new Set(missing);
      setErrorFieldKeys(missingSet);
      const firstErrorStepIndex = sections.findIndex(s => s.questions.some(q => missingSet.has(q.fieldKey)));
      if (firstErrorStepIndex >= 0) setCurrentStep(firstErrorStepIndex + 1);
      scrollToTop();
      toast.error(
        'Some answers are missing',
        `Please complete all required questions before submitting (${missing.length} remaining).`
      );
      return;
    }
    setErrorFieldKeys(new Set());
    setIsCompletionModalOpen(true);
  };

  const submitMutation = useMutation({
    mutationFn: () =>
      formsService.submitForm('PRE_COUNSELLING_STUDENT', me!.id, {
        cohort: cohort!,
        answers: buildAnswers(),
      }),
    onSuccess: () => {
      localStorage.setItem('pwc_precounselling_submitted', 'true');
      localStorage.setItem('pwc_student_precounseling_form_submitted', 'true');
      queryClient.invalidateQueries({ queryKey: ['student-me'] });
      queryClient.invalidateQueries({ queryKey: ['student-forms-status'] });
      toast.success(
        'Pre-Counselling Form Submitted!',
        'Thank you for completing the form. Your counsellor will review your responses before Session 1.'
      );
      setIsCompletionModalOpen(false);
      navigate(ROUTES.STUDENT_PORTAL);
    },
    onError: (err: unknown) => {
      setIsCompletionModalOpen(false);
      // 400 with { missingFieldKeys } — a required question is still blank.
      if (err instanceof AxiosError && err.response?.status === 400) {
        const missing = (err.response.data as { error?: { details?: { missingFieldKeys?: string[] } } })
          ?.error?.details?.missingFieldKeys;
        toast.error(
          'Some answers are missing',
          missing?.length
            ? `Please complete all required questions before submitting (${missing.length} remaining).`
            : 'Please complete all required questions before submitting.'
        );
        return;
      }
      toast.error('Error', getApiErrorMessage(err, 'Failed to submit the form.'));
    },
  });

  const handleConfirmCompletion = () => {
    submitMutation.mutate();
  };

  // "Save Draft" — PUT the current answers without the required-field validation, so the
  // student can save partial progress and come back later. Commented out along with the
  // button while Save Draft is disabled.
  // const saveDraftMutation = useMutation({
  //   mutationFn: () =>
  //     formsService.saveDraft('PRE_COUNSELLING_STUDENT', me!.id, {
  //       cohort: cohort!,
  //       answers: buildAnswers(),
  //     }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ['form-submission', 'PRE_COUNSELLING_STUDENT', me?.id, cohort],
  //     });
  //     toast.success('Draft Saved', 'Your progress has been saved — you can come back and finish later.');
  //   },
  //   onError: (err: unknown) => {
  //     toast.error('Error', getApiErrorMessage(err, 'Failed to save your draft.'));
  //   },
  // });

  // const handleSaveDraft = () => {
  //   if (!me?.id || !cohort) {
  //     toast.info('Please wait', 'Your student record is still loading — try again in a moment.');
  //     return;
  //   }
  //   saveDraftMutation.mutate();
  // };

  const progressPercent = totalSteps ? Math.round((currentStep / totalSteps) * 100) : 0;
  const currentSection = sections[currentStep - 1];

  return (
    <FormPageContainer ref={topRef}>
      {isFormStarted && (
        <PageHeader
          title="PRE-COUNSELLING FORM"
          breadcrumbs={[
            { label: 'Student Portal', href: ROUTES.STUDENT_PORTAL },
            { label: 'Pre-Counselling Form' },
          ]}
          onBack={() => navigate(ROUTES.STUDENT_PORTAL)}
          actions={
            <HeaderProgressCard>
              <HeaderProgressRow>
                <HeaderStepTitle>{sectionHeading(currentSection?.label)}</HeaderStepTitle>
                <HeaderStepCount>
                  STEP {currentStep} OF {totalSteps} ({progressPercent}%)
                </HeaderStepCount>
              </HeaderProgressRow>
              <HeaderProgressTrack>
                <HeaderProgressBar $percent={progressPercent} />
              </HeaderProgressTrack>
            </HeaderProgressCard>
          }
        />
      )}

      {!isFormStarted ? (
        <HeroHeaderCard>
          {/* Header */}
          <DocumentHeaderRow>
            <Tooltip content="Back to Student Portal" position="right">
              <HeaderBackButton
                type="button"
                onClick={() => navigate(ROUTES.STUDENT_PORTAL)}
                aria-label="Back to Student Portal"
              >
                <RiArrowLeftLine size={18} />
              </HeaderBackButton>
            </Tooltip>

            <DocTitle>PRE-COUNSELLING FORM</DocTitle>
          </DocumentHeaderRow>

          {/* 4 Floating Metric Cards Bar */}
          <StatsGridBar>
            <StatBlock $gradient="linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)" $borderColor="#DBEAFE">
              <StatIconBox $bg="#DBEAFE" $color="#1E40AF">
                <RiQuestionLine size={24} />
              </StatIconBox>
              <StatInfoBox>
                <StatNumber $color="#1E40AF">{totalQuestions || '19'}</StatNumber>
                <StatLabel>Questions</StatLabel>
              </StatInfoBox>
            </StatBlock>

            <StatBlock $gradient="linear-gradient(135deg, #F8FAFC 0%, #FAF5FF 100%)" $borderColor="#E9D5FF">
              <StatIconBox $bg="#F3E8FF" $color="#6B21A8">
                <RiGridLine size={24} />
              </StatIconBox>
              <StatInfoBox>
                <StatNumber $color="#6B21A8">{sections.length || '6'}</StatNumber>
                <StatLabel>Sections</StatLabel>
              </StatInfoBox>
            </StatBlock>

            <StatBlock $gradient="linear-gradient(135deg, #F8FAFC 0%, #FEF3C7 100%)" $borderColor="#FDE68A">
              <StatIconBox $bg="#FEF3C7" $color="#B45309">
                <RiTimerFlashLine size={24} />
              </StatIconBox>
              <StatInfoBox>
                <StatNumber $color="#B45309">10–12</StatNumber>
                <StatLabel>Minutes</StatLabel>
              </StatInfoBox>
            </StatBlock>

            <StatBlock $gradient="linear-gradient(135deg, #F8FAFC 0%, #ECFDF5 100%)" $borderColor="#A7F3D0">
              <StatIconBox $bg="#D1FAE5" $color="#047857">
                <RiShieldCheckLine size={24} />
              </StatIconBox>
              <StatInfoBox>
                <StatNumber $color="#047857">100%</StatNumber>
                <StatLabel>Confidential</StatLabel>
              </StatInfoBox>
            </StatBlock>
          </StatsGridBar>

          {/* Section 1: Before You Fill This Form */}
          <div>
            <SectionTitleHeader>
              <SectionHeaderIcon $color="#2563EB">
                <RiInformationLine size={18} />
              </SectionHeaderIcon>
              <SectionTitleText>Before You Fill This Form</SectionTitleText>
            </SectionTitleHeader>

            <NumberedCardsStack style={{ marginTop: 16 }}>
              <NumberCardItem>
                <NumberBadgeHeader>
                  <NumberBadgeIcon $bg="#DBEAFE" $color="#1E40AF">
                    <RiVolumeMuteLine size={20} />
                  </NumberBadgeIcon>
                  <NumberCardTitle>1. Find a quiet spot.</NumberCardTitle>
                </NumberBadgeHeader>
                <NumberCardDesc>
                  These questions need your honest, unhurried attention.
                </NumberCardDesc>
              </NumberCardItem>

              <NumberCardItem>
                <NumberBadgeHeader>
                  <NumberBadgeIcon $bg="#D1FAE5" $color="#047857">
                    <RiTimerLine size={20} />
                  </NumberBadgeIcon>
                  <NumberCardTitle>2. Set aside 10–12 minutes.</NumberCardTitle>
                </NumberBadgeHeader>
                <NumberCardDesc>
                  Treat this time as an investment in your own career clarity, not a task which you just need to finish of in any manner.
                </NumberCardDesc>
              </NumberCardItem>

              <NumberCardItem>
                <NumberBadgeHeader>
                  <NumberBadgeIcon $bg="#F3E8FF" $color="#6B21A8">
                    <RiSmartphoneLine size={20} />
                  </NumberBadgeIcon>
                  <NumberCardTitle>3. Keep your phone away.</NumberCardTitle>
                </NumberBadgeHeader>
                <NumberCardDesc>
                  It breaks the flow of honest self-reflection, give it your full focus.
                </NumberCardDesc>
              </NumberCardItem>
            </NumberedCardsStack>
          </div>

          {/* Section 2: What This Form Is About */}
          <div>
            <SectionTitleHeader>
              <SectionHeaderIcon $color="#5D2384">
                <RiSparklingLine size={18} />
              </SectionHeaderIcon>
              <SectionTitleText>What This Form Is About</SectionTitleText>
            </SectionTitleHeader>

            <StatementParagraphCard style={{ marginTop: 16 }}>
              <StatementList>
                <StatementListItem>
                  <RiInformationLine size={20} />
                  <span>This is not a quiz and it is not being graded. There are no right answers and no wrong answers.</span>
                </StatementListItem>
                <StatementListItem>
                  <RiInformationLine size={20} />
                  <span>This form helps your counsellor get to know you before your session. The more honestly you fill it, the more personalised and useful your counselling session will be.</span>
                </StatementListItem>
                <StatementListItem>
                  <RiInformationLine size={20} />
                  <span>Think of it as a conversation starter, not an assessment. You are not being judged. Your responses are completely confidential and will only be seen by your counsellor.</span>
                </StatementListItem>
              </StatementList>
            </StatementParagraphCard>
          </div>

          {/* Section 3: The Golden Rules — Read These Carefully */}
          <div>
            <SectionTitleHeader>
              <SectionHeaderIcon $color="#D97706">
                <RiStarLine size={18} />
              </SectionHeaderIcon>
              <SectionTitleText>The Golden Rules — Read These Carefully</SectionTitleText>
            </SectionTitleHeader>

            <GoldenRulesGrid style={{ marginTop: 16 }}>
              <GoldenRuleCard>
                <GoldenRuleIconBox>
                  <RiStarLine size={20} />
                </GoldenRuleIconBox>
                <GoldenRuleContent>
                  <GoldenRuleTitle>Be honest. Be yourself.</GoldenRuleTitle>
                  <GoldenRuleDesc>
                    Answer based on how you actually are, not how you want to appear, not what sounds impressive.
                  </GoldenRuleDesc>
                </GoldenRuleContent>
              </GoldenRuleCard>

              <GoldenRuleCard>
                <GoldenRuleIconBox>
                  <RiStarLine size={20} />
                </GoldenRuleIconBox>
                <GoldenRuleContent>
                  <GoldenRuleTitle>Take your time, go with your first instinct.</GoldenRuleTitle>
                  <GoldenRuleDesc>
                    Write what naturally comes to mind &amp; go with your first instinct.
                  </GoldenRuleDesc>
                </GoldenRuleContent>
              </GoldenRuleCard>

              <GoldenRuleCard>
                <GoldenRuleIconBox>
                  <RiStarLine size={20} />
                </GoldenRuleIconBox>
                <GoldenRuleContent>
                  <GoldenRuleTitle>Do not skip questions.</GoldenRuleTitle>
                  <GoldenRuleDesc>
                    If something feels too personal, just write as much as you are comfortable.
                  </GoldenRuleDesc>
                </GoldenRuleContent>
              </GoldenRuleCard>

              <GoldenRuleCard>
                <GoldenRuleIconBox>
                  <RiStarLine size={20} />
                </GoldenRuleIconBox>
                <GoldenRuleContent>
                  <GoldenRuleTitle>Your responses are private.</GoldenRuleTitle>
                  <GoldenRuleDesc>
                    Only you and your career counsellor will see your answers, not even your parent.
                  </GoldenRuleDesc>
                </GoldenRuleContent>
              </GoldenRuleCard>

              <GoldenRuleCard>
                <GoldenRuleIconBox>
                  <RiStarLine size={20} />
                </GoldenRuleIconBox>
                <GoldenRuleContent>
                  <GoldenRuleTitle>It is okay to say &apos;I don&apos;t know&apos;.</GoldenRuleTitle>
                  <GoldenRuleDesc>
                    If you are unsure about your career direction, mention &apos;Still Exploring&apos;.
                  </GoldenRuleDesc>
                </GoldenRuleContent>
              </GoldenRuleCard>
            </GoldenRulesGrid>
          </div>

          {/* Encouragement Hero Banner & CTA Button */}
          <ReadyEncouragementBanner>
            <ReadyBannerTitle>You are ready. Take a deep breath.</ReadyBannerTitle>
            <ReadyBannerSubtext>
              There is nothing to prepare for. Just be yourself.
            </ReadyBannerSubtext>
          </ReadyEncouragementBanner>

          <StartCtaBox>
            <Button
              variant="primary"
              size="lg"
              rightIcon={<RiPlayCircleLine size={20} />}
              isLoading={isMeLoading || isTemplateLoading}
              disabled={!isMeLoading && !cohort}
              onClick={() => {
                setIsFormStarted(true);
                scrollToTop();
              }}
              style={{ minWidth: '320px' }}
            >
              Start Pre-Counselling Form
            </Button>
            {!isMeLoading && !cohort && (
              <p style={{ color: '#DC2626', fontSize: 13, marginTop: 8 }}>
                We couldn&apos;t find an active cohort on your student record, so this form can&apos;t load
                yet. Please contact your counsellor or admin.
              </p>
            )}
          </StartCtaBox>
        </HeroHeaderCard>
      ) : (
        /* WIZARD VIEW — driven entirely by the fetched template's sections/questions */
        <WizardContainer>
          <WizardStepBody>
            {currentSection?.questions.map(q => (
              <QuestionRenderer
                key={q.id}
                question={q}
                value={answers[q.fieldKey]}
                onChange={v => setAnswer(q.fieldKey, v)}
                hasError={errorFieldKeys.has(q.fieldKey)}
              />
            ))}
          </WizardStepBody>

          {/* Wizard Footer Navigation */}
          <WizardFooterNav>
            <Button
              type="button"
              variant="secondary"
              size="md"
              leftIcon={<RiArrowLeftLine size={18} />}
              disabled={currentStep === 1}
              onClick={handlePrevStep}
            >
              Previous Step
            </Button>

            {/* <Button
              type="button"
              variant="secondary"
              size="md"
              leftIcon={<RiSaveLine size={18} />}
              isLoading={saveDraftMutation.isPending}
              onClick={handleSaveDraft}
            >
              Save Draft
            </Button> */}

            {currentStep < totalSteps ? (
              <Button
                type="button"
                variant="primary"
                size="md"
                rightIcon={<RiArrowRightLine size={18} />}
                onClick={handleNextStep}
              >
                Next Step
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                size="md"
                leftIcon={<RiCheckLine size={18} />}
                onClick={handleSubmitForm}
              >
                Submit Form
              </Button>
            )}
          </WizardFooterNav>
        </WizardContainer>
      )}

      {/* Completion Confirmation Popup Modal */}
      <SuccessModal
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        title="Thank you for completing your Pre-Counselling Form!"
        confirmText="Go to Student Portal"
        onConfirm={handleConfirmCompletion}
      />
    </FormPageContainer>
  );
};

export default PreCounsellingFormPage;
