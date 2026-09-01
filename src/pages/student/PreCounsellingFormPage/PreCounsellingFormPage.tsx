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
import { formsService, FormAnswerItem, FormQuestion } from '@/services/forms.service';
import { getApiErrorMessage } from '@/utils';
import { QuestionRenderer, sectionHeading, isAnswerEmpty } from './QuestionRenderer';
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
  WizardFooterNav,
} from './PreCounsellingFormPage.styles';

// ─────────────────────────────────────────────────────────────
// Every question, its section grouping (the wizard's 6 steps), and its options come
// from the real GET /forms/PRE_COUNSELLING_STUDENT template — nothing here is hardcoded
// per-question. The generic questionType-driven renderer lives in ./QuestionRenderer,
// shared with the parent pre-counselling form. See docs/db-design.md "Forms" section.
// ─────────────────────────────────────────────────────────────

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
