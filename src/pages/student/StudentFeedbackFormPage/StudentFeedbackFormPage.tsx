import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { RiSaveLine } from 'react-icons/ri';
import {
  RiArrowLeftLine,
  RiCheckLine,
  RiUser3Line,
  RiUserHeartLine,
  RiEmotionHappyLine,
  RiCompass3Line,
  RiAwardLine,
  RiStarLine,
  RiChat3Line,
} from 'react-icons/ri';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import { ROUTES } from '@/constants';
import { SuccessModal } from '@/components';
import { useToast, useCurrentStudent } from '@/hooks';
import { formsService, FormAnswerItem, FormQuestion, McqOption } from '@/services/forms.service';
import { getApiErrorMessage } from '@/utils';
import { isAnswerEmpty } from '../PreCounsellingFormPage/QuestionRenderer';
import {
  FormPageContainer,
  SingleUnifiedCard,
  DocumentHeaderRow,
  HeaderTopNavRow,
  HeaderBackButton,
  DocTitle,
  DocNote,
  StudentMetaGrid,
  MetaItem,
  MetaLabel,
  MetaValue,
  SectionBlock,
  SectionHeader,
  SectionHeaderIcon,
  SectionTitleText,
  QuestionCard,
  QuestionTitle,
  RatingOptionsGroup,
  RatingOptionButton,
  OptionScoreBadge,
  OptionText,
  CustomTextArea,
  FormFooterActions,
} from './StudentFeedbackFormPage.styles';

// ─────────────────────────────────────────────────────────────
// Every question, its section grouping, and its rating-scale options come from the real
// GET /forms/FEEDBACK_STUDENT template — nothing here is hardcoded per-question. Section
// icons/order are a fixed 1:1 mapping onto the template's 5 sections (Session Experience,
// Clarity & Decision Confidence, Outcome Quality, Overall Satisfaction, Open Feedback), and
// the default ratings mirror what this page always pre-selected, keyed by position rather
// than a hardcoded fieldKey so the visual behaviour is unchanged.
// ─────────────────────────────────────────────────────────────

const COHORT = 'CLASS_9_10';

const SECTION_ICONS = [RiEmotionHappyLine, RiCompass3Line, RiAwardLine, RiStarLine, RiChat3Line];

// Defaults this page has always pre-selected, by section position then question position.
const SECTION_DEFAULTS: Array<Array<number | ''>> = [
  [5, 5, 5, 5],
  [4, 5, 4, 5],
  [5, 4, 5],
  [5, 5],
  ['', ''],
];

const cleanSectionLabel = (label: string): string =>
  label
    .replace(/^Section\s*\d+\s*[—-]\s*/i, '')
    .replace(/\s*[[(].*$/, '')
    .trim();

const scaleOptions = (q: FormQuestion): McqOption[] =>
  Array.isArray(q.options) ? (q.options.filter(o => typeof o !== 'string') as McqOption[]) : [];

export const StudentFeedbackFormPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data: me } = useCurrentStudent();
  const cohort = me?.cohort?.code ?? COHORT;

  const { data: template, isLoading: isTemplateLoading } = useQuery({
    queryKey: ['form-template', 'FEEDBACK_STUDENT', cohort],
    queryFn: () => formsService.getTemplate('FEEDBACK_STUDENT', cohort),
    staleTime: 5 * 60_000,
  });

  const { data: existingSubmission } = useQuery({
    queryKey: ['form-submission', 'FEEDBACK_STUDENT', me?.id, cohort],
    queryFn: () => formsService.getSubmission('FEEDBACK_STUDENT', me!.id, cohort),
    enabled: !!me?.id,
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
    return sectionOrder.map((label, i) => ({
      label: cleanSectionLabel(label),
      icon: SECTION_ICONS[i] ?? SECTION_ICONS[SECTION_ICONS.length - 1],
      questions: bySection.get(label)!,
    }));
  }, [template]);

  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const defaultsAppliedRef = useRef(false);

  // Pre-select the same defaults this page always opened with (by position), once.
  useEffect(() => {
    if (defaultsAppliedRef.current || sections.length === 0) return;
    defaultsAppliedRef.current = true;
    const defaults: Record<string, unknown> = {};
    sections.forEach((section, sIdx) => {
      section.questions.forEach((q, qIdx) => {
        const value = SECTION_DEFAULTS[sIdx]?.[qIdx];
        if (value !== undefined) defaults[q.fieldKey] = value === '' ? '' : value;
      });
    });
    setAnswers(prev => ({ ...defaults, ...prev }));
  }, [sections]);

  // Prefill from a previously saved submission (overrides the defaults above).
  useEffect(() => {
    if (!existingSubmission) return;
    setAnswers(prev => ({
      ...prev,
      ...Object.fromEntries(existingSubmission.answers.map(a => [a.fieldKey, a.answer])),
    }));
  }, [existingSubmission]);

  const setAnswer = (fieldKey: string, value: unknown) => {
    setAnswers(prev => ({ ...prev, [fieldKey]: value }));
  };

  const buildAnswers = (): FormAnswerItem[] =>
    (template?.questions ?? []).map(q => ({ fieldKey: q.fieldKey, answer: answers[q.fieldKey] ?? null }));

  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

  const submitMutation = useMutation({
    mutationFn: () => formsService.submitForm('FEEDBACK_STUDENT', me!.id, { cohort, answers: buildAnswers() }),
    onSuccess: () => {
      localStorage.setItem('pwc_student_feedback_submitted', 'true');
      queryClient.invalidateQueries({ queryKey: ['student-me'] });
      queryClient.invalidateQueries({ queryKey: ['student-forms-status'] });
      setIsCompletionModalOpen(true);
    },
    onError: (err: unknown) => {
      if (err instanceof AxiosError && err.response?.status === 400) {
        toast.error('Some answers are missing', 'Please answer every question before submitting.');
        return;
      }
      toast.error('Error', getApiErrorMessage(err, 'Failed to submit your feedback.'));
    },
  });

  const saveDraftMutation = useMutation({
    mutationFn: () => formsService.saveDraft('FEEDBACK_STUDENT', me!.id, { cohort, answers: buildAnswers() }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['form-submission', 'FEEDBACK_STUDENT', me?.id, cohort] });
      toast.success('Draft Saved', 'Your feedback has been saved — you can come back and finish later.');
    },
    onError: (err: unknown) => toast.error('Error', getApiErrorMessage(err, 'Failed to save your draft.')),
  });

  const onSubmit = () => {
    if (!me?.id) {
      localStorage.setItem('pwc_student_feedback_submitted', 'true');
      setIsCompletionModalOpen(true);
      return;
    }
    const missing = (template?.questions ?? []).filter(
      q => q.isRequired && isAnswerEmpty(answers[q.fieldKey])
    );
    if (missing.length > 0) {
      toast.error(
        'Some answers are missing',
        `Please answer all required questions before submitting (${missing.length} remaining).`
      );
      return;
    }
    submitMutation.mutate();
  };

  const handleSaveDraft = () => {
    if (!me?.id) {
      toast.info('Please wait', 'Your student record is still loading — try again in a moment.');
      return;
    }
    saveDraftMutation.mutate();
  };

  const handleConfirmCompletion = useCallback(() => {
    setIsCompletionModalOpen(false);
    navigate(ROUTES.STUDENT_PORTAL);
  }, [navigate]);

  return (
    <>
      <FormPageContainer>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit();
          }}
          noValidate
        >
          <SingleUnifiedCard>
            {/* Header */}
            <DocumentHeaderRow>
              <HeaderTopNavRow>
                <Tooltip content="Back to Student Dashboard" position="right">
                  <HeaderBackButton
                    type="button"
                    onClick={() => navigate(ROUTES.STUDENT_PORTAL)}
                    aria-label="Back to Dashboard"
                  >
                    <RiArrowLeftLine size={18} />
                  </HeaderBackButton>
                </Tooltip>
              </HeaderTopNavRow>
              <DocTitle>FEEDBACK QUESTIONNAIRE</DocTitle>
              <DocNote>
                Please share your feedback regarding your experience. Your responses help us
                enhance our programme. Your honesty is genuinely valued — there are no right or
                wrong answers.
              </DocNote>
            </DocumentHeaderRow>

            {/* Student Meta Details */}
            <StudentMetaGrid>
              <MetaItem>
                <MetaLabel>Student Name / Code</MetaLabel>
                <MetaValue style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <RiUser3Line size={16} />{' '}
                  {me ? `${me.name}${me.studentCode ? ` (${me.studentCode})` : ''}` : '—'}
                </MetaValue>
              </MetaItem>
              <MetaItem>
                <MetaLabel>Counsellor</MetaLabel>
                <MetaValue style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <RiUserHeartLine size={16} /> Dr. Rajeshwari Menon (M.Sc Psych)
                </MetaValue>
              </MetaItem>
            </StudentMetaGrid>

            {/* Sections — driven entirely by the fetched template */}
            {sections.map(section => (
              <SectionBlock key={section.label}>
                <SectionHeader>
                  <SectionHeaderIcon>
                    <section.icon size={20} />
                  </SectionHeaderIcon>
                  <SectionTitleText>{section.label}</SectionTitleText>
                </SectionHeader>

                {section.questions.map((q, idx) =>
                  q.questionType === 'OPEN_TEXT' ? (
                    <QuestionCard key={q.id}>
                      <QuestionTitle>
                        {idx + 1}. {q.questionText}
                      </QuestionTitle>
                      <CustomTextArea
                        placeholder={
                          q.fieldKey === 'most_helpful_part'
                            ? 'Share what worked best for you during the counselling sessions...'
                            : 'Let us know how we can make the experience even better...'
                        }
                        value={(answers[q.fieldKey] as string) ?? ''}
                        onChange={e => setAnswer(q.fieldKey, e.target.value)}
                      />
                    </QuestionCard>
                  ) : (
                    <QuestionCard key={q.id}>
                      <QuestionTitle>
                        {idx + 1}. {q.questionText}
                      </QuestionTitle>
                      <RatingOptionsGroup>
                        {scaleOptions(q).map(option => {
                          const optionValue = Number(option.value);
                          const isSelected = answers[q.fieldKey] === optionValue;
                          return (
                            <RatingOptionButton
                              key={option.value}
                              type="button"
                              $isSelected={isSelected}
                              onClick={() => setAnswer(q.fieldKey, optionValue)}
                            >
                              <OptionScoreBadge $isSelected={isSelected}>{option.value}</OptionScoreBadge>
                              <OptionText>{option.label}</OptionText>
                            </RatingOptionButton>
                          );
                        })}
                      </RatingOptionsGroup>
                    </QuestionCard>
                  )
                )}
              </SectionBlock>
            ))}

            {/* Form Actions */}
            <FormFooterActions>
              <Button
                type="button"
                variant="secondary"
                leftIcon={<RiArrowLeftLine size={16} />}
                onClick={() => navigate(ROUTES.STUDENT_PORTAL)}
              >
                Back to Dashboard
              </Button>
              <Button
                type="button"
                variant="secondary"
                leftIcon={<RiSaveLine size={16} />}
                isLoading={saveDraftMutation.isPending}
                onClick={handleSaveDraft}
              >
                Save Draft
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={submitMutation.isPending || isTemplateLoading}
                leftIcon={<RiCheckLine size={18} />}
              >
                Submit Feedback
              </Button>
            </FormFooterActions>
          </SingleUnifiedCard>
        </form>
      </FormPageContainer>

      {/* Completion Confirmation Popup Modal */}
      <SuccessModal
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        title="Feedback Submitted Successfully!"
        confirmText="Go to Student Portal"
        onConfirm={handleConfirmCompletion}
      />
    </>
  );
};

export default StudentFeedbackFormPage;
