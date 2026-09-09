import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  RiCheckLine,
  RiEmotionHappyLine,
  RiUser3Line,
  RiUserHeartLine,
  RiCompass3Line,
  RiAwardLine,
  RiStarLine,
  RiChat3Line,
  RiTimeLine,
  RiInformationLine,
} from 'react-icons/ri';
import { Button } from '@/components/Button';
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
  QuestionErrorText,
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
// icons/order are a fixed 1:1 mapping onto the template's 6 sections.
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

const cleanSectionLabel = (label: string): string =>
  label
    .replace(/^Section\s*\d+\s*[—-]\s*/i, '')
    .replace(/\s*[[(].*$/, '')
    .trim();

const scaleOptions = (q: FormQuestion): McqOption[] =>
  Array.isArray(q.options) ? (q.options.filter(o => typeof o !== 'string') as McqOption[]) : [];

export const ParentFeedbackFormPage: React.FC = () => {
  const toast = useToast();
  const { studentId } = useParams<{ studentId: string }>();
  // Carried on the link itself — this page has no login, so it can't look these up
  // (there's no public GET /students/{id}); the student generates the link with them
  // already filled in (see StudentPortalPage's handleCopyParentFeedbackLink).
  const [searchParams] = useSearchParams();
  const studentName = searchParams.get('student');
  const counsellorName = searchParams.get('counsellor');

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
  const [errorFieldKeys, setErrorFieldKeys] = useState<Set<string>>(new Set());
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Prefill from a previously saved submission, if one exists.
  useEffect(() => {
    if (!existingSubmission) return;
    setAnswers(prev => ({
      ...prev,
      ...Object.fromEntries(existingSubmission.answers.map(a => [a.fieldKey, a.answer])),
    }));
  }, [existingSubmission]);

  const setAnswer = (fieldKey: string, value: unknown) => {
    setAnswers(prev => ({ ...prev, [fieldKey]: value }));
    setSubmitErrorMessage(null);
    setErrorFieldKeys(prev => {
      if (!prev.has(fieldKey)) return prev;
      const next = new Set(prev);
      next.delete(fieldKey);
      return next;
    });
  };

  const buildAnswers = (): FormAnswerItem[] =>
    (template?.questions ?? []).map(q => ({ fieldKey: q.fieldKey, answer: answers[q.fieldKey] ?? null }));

  const questionTextByFieldKey = useMemo(
    () => new Map((template?.questions ?? []).map(q => [q.fieldKey, q.questionText])),
    [template]
  );

  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [linkExpiredMessage, setLinkExpiredMessage] = useState<string | null>(null);
  // A failed submit shown as a prominent centered banner (not just a corner toast, which a
  // parent on an unfamiliar public form can easily miss) — cleared as soon as they edit an answer.
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);

  const submitMutation = useMutation({
    mutationFn: () =>
      formsService.submitForm('FEEDBACK_PARENT', studentId!, { cohort: COHORT, answers: buildAnswers() }),
    onSuccess: () => {
      setSubmitErrorMessage(null);
      setIsCompletionModalOpen(true);
    },
    onError: (err: unknown) => {
      if (err instanceof AxiosError && err.response?.status === 403) {
        setLinkExpiredMessage(getApiErrorMessage(err, 'This link has expired — submissions are closed.'));
        return;
      }
      if (err instanceof AxiosError && err.response?.status === 400) {
        // The backend names exactly which fieldKeys are missing — surface those question
        // texts instead of a vague "something's wrong", in case a required question here
        // slips past our own client-side check (e.g. isRequired metadata drift).
        const missing = (err.response.data as { error?: { details?: { missingFieldKeys?: string[] } } })
          ?.error?.details?.missingFieldKeys ?? [];
        const missingLabels = missing.map(key => questionTextByFieldKey.get(key) || key);
        const message =
          missingLabels.length > 0
            ? `Please answer the following before submitting: ${missingLabels.join(', ')}`
            : 'Please answer every question before submitting.';
        setSubmitErrorMessage(message);
        toast.error('Some answers are missing', message);
        return;
      }
      const message = getApiErrorMessage(err, 'Failed to submit your feedback. Please try again.');
      setSubmitErrorMessage(message);
      toast.error('Submission failed', message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const missing = (template?.questions ?? []).filter(
      q => q.isRequired && isAnswerEmpty(answers[q.fieldKey])
    );
    if (missing.length > 0) {
      const message = `Please answer the following before submitting: ${missing
        .map(q => q.questionText)
        .join(', ')}`;
      setErrorFieldKeys(new Set(missing.map(q => q.fieldKey)));
      setSubmitErrorMessage(message);
      toast.error('Some answers are missing', message);
      questionRefs.current[missing[0].fieldKey]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setErrorFieldKeys(new Set());
    setSubmitErrorMessage(null);
    submitMutation.mutate();
  };

  // Parents have no login/portal to return to. `window.close()` only works if the browser
  // opened this tab via script — for a link tapped from WhatsApp/email/SMS (the normal
  // case here) it's silently blocked, so relying on it alone leaves the modal looking
  // stuck. Try it as a best effort, but always also dismiss the modal in favour of the
  // "already submitted" screen below, which tells them it's safe to close the tab
  // themselves — that way Close always visibly does something.
  const handleConfirmCompletion = useCallback(() => {
    window.close();
    setIsCompletionModalOpen(false);
    setHasSubmitted(true);
  }, []);

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

  // The parent already submitted this feedback — either just now (hasSubmitted) or on a
  // previous visit (existingSubmission) — don't let them resubmit.
  if (hasSubmitted || existingSubmission?.submittedAt) {
    return (
      <FormPageContainer>
        <HeroHeaderCard>
          <StatementParagraphCard style={{ borderLeftColor: '#047857' }}>
            <StatementList>
              <StatementListItem>
                <RiCheckLine size={20} style={{ color: '#047857' }} />
                <span>You have already submitted this feedback. Thank you for sharing your thoughts with us.</span>
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

            {(studentName || counsellorName) && (
              <StudentMetaGrid>
                <MetaItem>
                  <MetaLabel>Counsellor Name</MetaLabel>
                  <MetaValue style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <RiUserHeartLine size={16} /> {counsellorName || '—'}
                  </MetaValue>
                </MetaItem>
                <MetaItem>
                  <MetaLabel>Student Name</MetaLabel>
                  <MetaValue style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <RiUser3Line size={16} /> {studentName || '—'}
                  </MetaValue>
                </MetaItem>
              </StudentMetaGrid>
            )}

            {submitErrorMessage && (
              <p
                role="alert"
                style={{
                  textAlign: 'center',
                  color: '#DC2626',
                  fontWeight: 600,
                  fontSize: 14,
                  background: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  borderRadius: 8,
                  padding: '12px 16px',
                  margin: '0 0 16px',
                }}
              >
                {submitErrorMessage}
              </p>
            )}

            {/* Sections — driven entirely by the fetched template */}
            {sections.map(section => (
              <SectionBlock key={section.label}>
                <SectionHeader>
                  <SectionHeaderIcon>
                    <section.icon size={20} />
                  </SectionHeaderIcon>
                  <SectionTitleText>{section.label}</SectionTitleText>
                </SectionHeader>

                {section.questions.map((q, idx) => {
                  const hasError = errorFieldKeys.has(q.fieldKey);
                  return q.questionType === 'OPEN_TEXT' ? (
                    <QuestionCard
                      key={q.id}
                      ref={el => {
                        questionRefs.current[q.fieldKey] = el;
                      }}
                      $hasError={hasError}
                    >
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
                      {hasError && <QuestionErrorText>This question is required.</QuestionErrorText>}
                    </QuestionCard>
                  ) : (
                    <QuestionCard
                      key={q.id}
                      ref={el => {
                        questionRefs.current[q.fieldKey] = el;
                      }}
                      $hasError={hasError}
                    >
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
                      {hasError && <QuestionErrorText>This question is required.</QuestionErrorText>}
                    </QuestionCard>
                  );
                })}
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
        onClose={handleConfirmCompletion}
        title="Feedback Submitted Successfully!"
        message="Thank you for your valuable feedback. You may now close this tab."
        confirmText="Close"
        onConfirm={handleConfirmCompletion}
      />
    </>
  );
};

export default ParentFeedbackFormPage;
