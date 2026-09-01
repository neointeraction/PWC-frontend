import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  RiCheckLine,
  RiEmotionHappyLine,
  RiUserHeartLine,
  RiCompass3Line,
  RiAwardLine,
  RiStarLine,
  RiChat3Line,
  RiTimeLine,
  RiInformationLine,
} from 'react-icons/ri';
import { Button } from '@/components/Button';
import { ROUTES } from '@/constants';
import { SuccessModal } from '@/components';
import { useToast } from '@/hooks';
import { formsService, FormAnswerItem, FormQuestion, McqOption } from '@/services/forms.service';
import { getApiErrorMessage } from '@/utils';
import { isAnswerEmpty } from '../PreCounsellingFormPage/QuestionRenderer';
import {
  FormPageContainer,
  SingleUnifiedCard,
  DocumentHeaderRow,
  DocTitle,
  DocNote,
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
} from '../StudentFeedbackFormPage/StudentFeedbackFormPage.styles';
import {
  HeroHeaderCard,
  StatementParagraphCard,
  StatementList,
  StatementListItem,
} from '../PreCounsellingFormPage/PreCounsellingFormPage.styles';

// ─────────────────────────────────────────────────────────────
// Every question, its section grouping, and its rating-scale options come from the real
// GET /forms/FEEDBACK_PARENT template — nothing here is hardcoded per-question. Section
// icons/order are a fixed 1:1 mapping onto the template's 6 sections, and the default
// ratings mirror what this page always pre-selected, keyed by position.
//
// Parents have no login — the link they're sent carries the studentId directly
// (/parent-feedback-form/:studentId), and the form-write endpoints are public but
// project-window gated (403 once the student's project has closed/expired), same as
// ../ParentPreCounsellingFormPage.
// ─────────────────────────────────────────────────────────────

// No public endpoint exists yet to look up a student's cohort from an unauthenticated
// parent link, and the org currently runs a single cohort — see CLAUDE.md.
const COHORT = 'CLASS_9_10';

const SECTION_ICONS = [
  RiEmotionHappyLine,
  RiUserHeartLine,
  RiCompass3Line,
  RiAwardLine,
  RiStarLine,
  RiChat3Line,
];

// Defaults this page has always pre-selected, by section position then question position.
const SECTION_DEFAULTS: Array<Array<number | ''>> = [
  [5, 5, 5],
  [5, 5, 5, 5],
  [4, 5, 5],
  [5, 5],
  [5],
  ['', ''],
];

const cleanSectionLabel = (label: string): string =>
  label
    .replace(/^Section\s*\d+\s*[—-]\s*/i, '')
    .replace(/\s*[[(].*$/, '')
    .trim();

const scaleOptions = (q: FormQuestion): McqOption[] =>
  Array.isArray(q.options) ? (q.options.filter(o => typeof o !== 'string') as McqOption[]) : [];

export const ParentFeedbackFormPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { studentId } = useParams<{ studentId: string }>();

  const { data: template, isLoading: isTemplateLoading } = useQuery({
    queryKey: ['form-template', 'FEEDBACK_PARENT', COHORT],
    queryFn: () => formsService.getTemplate('FEEDBACK_PARENT', COHORT),
    staleTime: 5 * 60_000,
  });

  const { data: existingSubmission } = useQuery({
    queryKey: ['form-submission', 'FEEDBACK_PARENT', studentId, COHORT],
    queryFn: () => formsService.getSubmission('FEEDBACK_PARENT', studentId!, COHORT),
    enabled: !!studentId,
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
  const [linkExpiredMessage, setLinkExpiredMessage] = useState<string | null>(null);

  const submitMutation = useMutation({
    mutationFn: () =>
      formsService.submitForm('FEEDBACK_PARENT', studentId!, { cohort: COHORT, answers: buildAnswers() }),
    onSuccess: () => {
      setIsCompletionModalOpen(true);
    },
    onError: (err: unknown) => {
      if (err instanceof AxiosError && err.response?.status === 403) {
        setLinkExpiredMessage(getApiErrorMessage(err, 'This link has expired — submissions are closed.'));
        return;
      }
      if (err instanceof AxiosError && err.response?.status === 400) {
        toast.error('Some answers are missing', 'Please answer every question before submitting.');
        return;
      }
      toast.error('Error', getApiErrorMessage(err, 'Failed to submit your feedback.'));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  const handleConfirmCompletion = useCallback(() => {
    setIsCompletionModalOpen(false);
    navigate(ROUTES.LOGIN);
  }, [navigate]);

  if (!studentId) {
    return (
      <FormPageContainer>
        <HeroHeaderCard>
          <StatementParagraphCard style={{ borderLeftColor: '#DC2626' }}>
            <StatementList>
              <StatementListItem>
                <RiInformationLine size={20} style={{ color: '#DC2626' }} />
                <span>This link is missing student information and can&apos;t be opened. Please ask for a new link.</span>
              </StatementListItem>
            </StatementList>
          </StatementParagraphCard>
        </HeroHeaderCard>
      </FormPageContainer>
    );
  }

  if (linkExpiredMessage) {
    return (
      <FormPageContainer>
        <HeroHeaderCard>
          <StatementParagraphCard style={{ borderLeftColor: '#DC2626' }}>
            <StatementList>
              <StatementListItem>
                <RiTimeLine size={20} style={{ color: '#DC2626' }} />
                <span>{linkExpiredMessage}</span>
              </StatementListItem>
            </StatementList>
          </StatementParagraphCard>
        </HeroHeaderCard>
      </FormPageContainer>
    );
  }

  return (
    <>
      <FormPageContainer>
        <form onSubmit={handleSubmit} noValidate>
          <SingleUnifiedCard>
            {/* Header */}
            <DocumentHeaderRow>
              <DocTitle>FEEDBACK QUESTIONNAIRE</DocTitle>
              <DocNote>
                Thank you for partnering with us in your child&apos;s career discovery journey. Please provide your candid feedback to help us refine our guidance services.
              </DocNote>
            </DocumentHeaderRow>

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
                          q.fieldKey === 'most_appreciated'
                            ? 'Share what worked best for you and your child...'
                            : 'Let us know how we can enhance the experience for parents...'
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
            <FormFooterActions style={{ justifyContent: 'flex-end' }}>
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
        message="Thank you for your valuable feedback."
        confirmText="Back to Home"
        onConfirm={handleConfirmCompletion}
      />
    </>
  );
};

export default ParentFeedbackFormPage;
