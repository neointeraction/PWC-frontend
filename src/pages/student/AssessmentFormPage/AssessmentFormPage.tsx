import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckLine,
  RiPlayCircleLine,
  RiQuestionLine,
  RiGridLine,
  RiTimerFlashLine,
  RiShieldCheckLine,
  RiVolumeMuteLine,
  RiSmartphoneLine,
  RiInformationLine,
  RiStarLine,
  RiSparklingLine,
  RiThumbUpLine,
  RiCheckDoubleLine,
  RiSubtractLine,
  RiThumbDownLine,
  RiCloseCircleLine,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import { SuccessModal } from '@/components';
import { ROUTES } from '@/constants';
import { useToast, useCurrentStudent } from '@/hooks';
import {
  assessmentService,
  AssessmentSection,
  AssessmentQuestion,
  SaveAnswerInput,
} from '@/services/assessment.service';
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
  StatementParagraphTitle,
  StatementParagraphBody,
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
  HeaderStepCount,
  HeaderProgressTrack,
  HeaderProgressBar,
  WizardContainer,
  WizardStepBody,
  QuestionBox,
  QuestionTitle,
  QuestionSubtext,
  LikertScaleContainer,
  LikertButton,
  LikertOptionHeader,
  LikertOptionDesc,
  AptitudeOptionsGrid,
  AptitudeOptionLabel,
  WizardFooterNav,
} from './AssessmentFormPage.styles';

// 5-point Likert Options with detailed descriptions & icons for Type A questions
const DETAILED_LIKERT_OPTIONS = [
  {
    val: 1,
    label: 'Strongly Disagree',
    desc: 'You are certain it does not apply to you at all.',
    icon: RiCloseCircleLine,
  },
  {
    val: 2,
    label: 'Disagree',
    desc: 'You generally do not feel this way.',
    icon: RiThumbDownLine,
  },
  {
    val: 3,
    label: 'Neutral',
    desc: 'You cannot say yes or no. If you even slightly agree or slightly disagree, choose that.',
    icon: RiSubtractLine,
  },
  {
    val: 4,
    label: 'Agree',
    desc: 'It does describe you but not as strongly.',
    icon: RiCheckDoubleLine,
  },
  {
    val: 5,
    label: 'Strongly Agree',
    desc: 'You really feel this describes you.',
    icon: RiThumbUpLine,
  },
];


// Shape the wizard renders — now populated from the backend question bank rather than a
// hardcoded list, so the questions/options match what the scoring engine expects.
interface QuestionItem {
  id: string; // the backend fieldKey — the answer key
  num: number;
  text: string;
  type: 'likert' | 'aptitude';
  options?: { label: string; text: string }[];
  sectionNum: number;
  sectionTitle: string;
  sectionInstruction: string;
}

// Per-section titles + instructions (unchanged copy) keyed by the backend section enum.
const SECTION_META: Record<
  AssessmentSection,
  { num: number; title: string; instruction: string }
> = {
  RIASEC: {
    num: 1,
    title: 'RIASEC INTEREST INVENTORY',
    instruction:
      'Instructions: Rate how much you agree with each statement on a scale of 1 (Strongly Disagree) to 5 (Strongly Agree).',
  },
  BIG_FIVE: {
    num: 2,
    title: 'BIG FIVE PERSONALITY TRAITS',
    instruction:
      'Instructions: Rate your agreement with each personality statement from 1 (Strongly Disagree) to 5 (Strongly Agree).',
  },
  APTITUDE: {
    num: 3,
    title: 'APTITUDE & REASONING',
    instruction:
      "Instructions: Multiple choice aptitude questions. Select the single best answer, or select 'Not Sure' if genuinely unsure.",
  },
  COGNITIVE: {
    num: 4,
    title: 'COGNITIVE & DECISION STYLE',
    instruction:
      'Instructions: Reverting to 1 to 5 scale (Strongly Disagree to Strongly Agree) for cognitive & decision-making style.',
  },
};

// Map a backend question into the wizard's QuestionItem. Likert => the 1–5 scale UI
// (answer is the number); MCQ_SINGLE => the option list (answer is the option value/letter).
const toQuestionItem = (q: AssessmentQuestion, idx: number): QuestionItem => {
  const meta = SECTION_META[q.section] ?? SECTION_META.RIASEC;
  const isMcq = q.format === 'MCQ_SINGLE';
  return {
    id: q.fieldKey,
    num: idx + 1,
    text: q.questionText,
    type: isMcq ? 'aptitude' : 'likert',
    options: isMcq
      ? (q.options ?? []).map(o => ({ label: o.value, text: o.label.replace(/^[A-Za-z]\.\s*/, '') }))
      : undefined,
    sectionNum: meta.num,
    sectionTitle: meta.title,
    sectionInstruction: meta.instruction,
  };
};

export const AssessmentFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [isFormStarted, setIsFormStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const toast = useToast();
  const queryClient = useQueryClient();
  const { data: me } = useCurrentStudent();
  const cohort = me?.cohort?.code;

  // Authoritative question bank from the backend, mapped into the wizard shape.
  const { data: backendQuestions } = useQuery({
    queryKey: ['assessment-questions', cohort],
    queryFn: () => assessmentService.getQuestions(cohort!),
    enabled: !!cohort,
    staleTime: 5 * 60_000,
  });
  const questions = useMemo<QuestionItem[]>(
    () => (backendQuestions ?? []).map(toQuestionItem),
    [backendQuestions]
  );
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  // Start or resume the student's attempt; its saved answers prefill the form.
  const { data: attempt } = useQuery({
    queryKey: ['assessment-attempt', me?.id, cohort],
    queryFn: () => assessmentService.startAttempt(me!.id, cohort!),
    enabled: !!me?.id && !!cohort,
    staleTime: 60_000,
  });
  const attemptId = attempt?.id;

  // Answers keyed by fieldKey. Likert = number 1–5; MCQ = the option letter.
  const [answers, setAnswers] = useState<Record<string, number | string>>({});

  useEffect(() => {
    if (!attempt) return;
    const prefilled: Record<string, number | string> = {};
    for (const a of attempt.answers) {
      if (a.selectedOption !== null && a.fieldKey) prefilled[a.fieldKey] = a.selectedOption;
    }
    if (Object.keys(prefilled).length) setAnswers(prev => ({ ...prefilled, ...prev }));
  }, [attempt]);

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

  // Persist one answer in the background (best-effort; submit re-saves the full set).
  const persistAnswer = (fieldKey: string, value: number | string) => {
    if (!attemptId) return;
    assessmentService.saveAnswers(attemptId, [{ fieldKey, selectedOption: value }]).catch(() => {});
  };

  const handleSelectAnswer = (qId: string, value: number | string) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
    persistAnswer(qId, value);
  };

  const handleNextQuestion = () => {
    if (!currentQuestion || answers[currentQuestion.id] === undefined) return;
    setCurrentQuestionIndex(prev => Math.min(totalQuestions - 1, prev + 1));
    scrollToTop();
  };

  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

  const buildAllAnswers = (): SaveAnswerInput[] =>
    questions
      .filter(q => answers[q.id] !== undefined)
      .map(q => ({ fieldKey: q.id, selectedOption: answers[q.id] }));

  const submitMutation = useMutation({
    mutationFn: async () => {
      await assessmentService.saveAnswers(attemptId!, buildAllAnswers());
      return assessmentService.submitAttempt(attemptId!);
    },
    onSuccess: () => {
      localStorage.setItem('pwc_assessment_form_submitted', 'true');
      queryClient.invalidateQueries({ queryKey: ['student-me'] });
      setIsCompletionModalOpen(true);
    },
    onError: (err: unknown) => {
      // 400 { missingFieldKeys } — jump to the first unanswered question.
      if (err instanceof AxiosError && err.response?.status === 400) {
        const missing = (
          err.response.data as { error?: { details?: { missingFieldKeys?: string[] } } }
        )?.error?.details?.missingFieldKeys;
        if (missing?.length) {
          const idx = questions.findIndex(q => missing.includes(q.id));
          if (idx >= 0) setCurrentQuestionIndex(idx);
        }
        toast.error('Some questions are unanswered', 'Please answer every question before submitting.');
        return;
      }
      toast.error('Error', getApiErrorMessage(err, 'Failed to submit the assessment.'));
    },
  });

  const handleSubmitAssessment = () => {
    if (!attemptId) {
      localStorage.setItem('pwc_assessment_form_submitted', 'true');
      setIsCompletionModalOpen(true);
      return;
    }
    submitMutation.mutate();
  };

  const handleConfirmCompletion = useCallback(() => {
    setIsCompletionModalOpen(false);
    navigate(ROUTES.STUDENT_PORTAL);
  }, [navigate]);

  const progressPercent = totalQuestions
    ? Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)
    : 0;

  return (
    <FormPageContainer ref={topRef}>
      {isFormStarted && (
        <PageHeader
          title="CAREER PROFILING"
          breadcrumbs={[
            { label: 'Student Portal', href: ROUTES.STUDENT_PORTAL },
            { label: 'Career Assessment' },
          ]}
          onBack={() => navigate(ROUTES.STUDENT_PORTAL)}
          actions={
            <HeaderProgressCard>
              <HeaderProgressRow style={{ justifyContent: 'flex-end' }}>
                <HeaderStepCount style={{ fontWeight: 700, letterSpacing: '0.4px', color: '#ffffff' }}>
                  QUESTION {currentQuestionIndex + 1} OF {totalQuestions} ({progressPercent}%)
                </HeaderStepCount>
              </HeaderProgressRow>
              <HeaderProgressTrack>
                <HeaderProgressBar $percent={progressPercent} />
              </HeaderProgressTrack>
            </HeaderProgressCard>
          }
        />
      )}

      {/* LANDING VIEW: MODERN REDESIGNED INSTRUCTIONS VIEW */}
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

            <DocTitle>Career Profiling Form</DocTitle>
          </DocumentHeaderRow>

          {/* 4 Floating Metric Cards Bar */}
          <StatsGridBar>
            <StatBlock
              $gradient="linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)"
              $borderColor="#DBEAFE"
            >
              <StatIconBox $bg="#DBEAFE" $color="#1E40AF">
                <RiQuestionLine size={24} />
              </StatIconBox>
              <StatInfoBox>
                <StatNumber $color="#1E40AF">{totalQuestions || 73}</StatNumber>
                <StatLabel>Questions</StatLabel>
              </StatInfoBox>
            </StatBlock>

            <StatBlock
              $gradient="linear-gradient(135deg, #F8FAFC 0%, #FAF5FF 100%)"
              $borderColor="#E9D5FF"
            >
              <StatIconBox $bg="#F3E8FF" $color="#6B21A8">
                <RiGridLine size={24} />
              </StatIconBox>
              <StatInfoBox>
                <StatNumber $color="#6B21A8">4</StatNumber>
                <StatLabel>Sections</StatLabel>
              </StatInfoBox>
            </StatBlock>

            <StatBlock
              $gradient="linear-gradient(135deg, #F8FAFC 0%, #FEF3C7 100%)"
              $borderColor="#FDE68A"
            >
              <StatIconBox $bg="#FEF3C7" $color="#B45309">
                <RiTimerFlashLine size={24} />
              </StatIconBox>
              <StatInfoBox>
                <StatNumber $color="#B45309">30–35</StatNumber>
                <StatLabel>Minutes</StatLabel>
              </StatInfoBox>
            </StatBlock>

            <StatBlock
              $gradient="linear-gradient(135deg, #F8FAFC 0%, #ECFDF5 100%)"
              $borderColor="#A7F3D0"
            >
              <StatIconBox $bg="#D1FAE5" $color="#047857">
                <RiShieldCheckLine size={24} />
              </StatIconBox>
              <StatInfoBox>
                <StatNumber $color="#047857">100%</StatNumber>
                <StatLabel>Confidential</StatLabel>
              </StatInfoBox>
            </StatBlock>
          </StatsGridBar>

          {/* Section 1: Before You Begin */}
          <div>
            <SectionTitleHeader>
              <SectionHeaderIcon $color="#2563EB">
                <RiInformationLine size={18} />
              </SectionHeaderIcon>
              <SectionTitleText>Before You Begin</SectionTitleText>
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
                  <NumberBadgeIcon $bg="#FEF3C7" $color="#D97706">
                    <RiTimerFlashLine size={20} />
                  </NumberBadgeIcon>
                  <NumberCardTitle>2. Set aside 30-35 minutes</NumberCardTitle>
                </NumberBadgeHeader>
                <NumberCardDesc>
                  Treat this time as an investment in your own career clarity, not a task which you
                  just need to finish of in any manner.
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

          {/* Section 2: What This Assessment Is About */}
          <div>
            <SectionTitleHeader>
              <SectionHeaderIcon $color="#5D2384">
                <RiSparklingLine size={18} />
              </SectionHeaderIcon>
              <SectionTitleText>What This Assessment Is About</SectionTitleText>
            </SectionTitleHeader>

            <StatementParagraphCard style={{ marginTop: 16 }}>
              <StatementParagraphTitle>
                <RiInformationLine size={20} style={{ color: '#5D2384' }} />
                <span>This is not a test. There are no right or wrong answers.</span>
              </StatementParagraphTitle>
              <StatementParagraphBody>
                This assessment is simply about YOU — your interests, your personality, how you
                think, and what you are naturally good at. What kinds of activities and environments
                you genuinely enjoy? How you naturally behave — your energy, discipline, empathy,
                and more? Your natural reasoning ability — numbers, words, logic, and visuals. How
                you learn, handle uncertainty, and prefer to work. The results will help you
                understand which careers and streams are the best fit for you. Nobody is judging
                your answers. Your responses are completely confidential and will only be used for
                your career guidance.
              </StatementParagraphBody>
            </StatementParagraphCard>
          </div>

          {/* Section 4: The Golden Rules — Read These Carefully */}
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
                    Answer based on how you actually are, not how you want to appear, not what
                    sounds impressive.
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
                  <GoldenRuleTitle>Your responses are private.</GoldenRuleTitle>
                  <GoldenRuleDesc>
                    Only you and your career counsellor will see your answers, not even your parent.
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
              onClick={() => {
                setIsFormStarted(true);
                setCurrentQuestionIndex(0);
                scrollToTop();
              }}
              style={{ minWidth: '300px' }}
            >
              Start Career Assessment
            </Button>
          </StartCtaBox>
        </HeroHeaderCard>
      ) : (
        /* WIZARD VIEW: 1 QUESTION AT A TIME */
        <WizardContainer>
          {currentQuestion ? (
          <>
          <WizardStepBody>
            <QuestionSubtext style={{ fontSize: '14px', fontWeight: 500, color: '#334155' }}>
              {currentQuestion.sectionInstruction}
            </QuestionSubtext>

            <QuestionBox key={currentQuestion.id}>
              <QuestionTitle>{currentQuestion.text}</QuestionTitle>

              {currentQuestion.type === 'likert' && (
                <LikertScaleContainer>
                  {DETAILED_LIKERT_OPTIONS.map(opt => {
                    const IconComp = opt.icon;
                    const isSelected = answers[currentQuestion.id] === opt.val;
                    return (
                      <LikertButton
                        key={opt.val}
                        type="button"
                        $selected={isSelected}
                        onClick={() => handleSelectAnswer(currentQuestion.id, opt.val)}
                      >
                        <LikertOptionHeader $selected={isSelected}>
                          <IconComp size={16} />
                          <span>{opt.label}</span>
                        </LikertOptionHeader>
                        <LikertOptionDesc $selected={isSelected}>{opt.desc}</LikertOptionDesc>
                      </LikertButton>
                    );
                  })}
                </LikertScaleContainer>
              )}

              {currentQuestion.type === 'aptitude' && currentQuestion.options && (
                <AptitudeOptionsGrid>
                  {currentQuestion.options.map(opt => (
                    <AptitudeOptionLabel
                      key={opt.label}
                      $selected={answers[currentQuestion.id] === opt.label}
                    >
                      <input
                        type="radio"
                        name={`q_${currentQuestion.id}`}
                        value={opt.label}
                        checked={answers[currentQuestion.id] === opt.label}
                        onChange={() => handleSelectAnswer(currentQuestion.id, opt.label)}
                      />
                      <span>{opt.text}</span>
                    </AptitudeOptionLabel>
                  ))}
                </AptitudeOptionsGrid>
              )}
            </QuestionBox>
          </WizardStepBody>

          {/* Wizard Footer Navigation — Forward only, no back button */}
          <WizardFooterNav style={{ justifyContent: 'flex-end' }}>
            {currentQuestionIndex < totalQuestions - 1 ? (
              <Button
                type="button"
                variant="primary"
                size="md"
                rightIcon={<RiArrowRightLine size={18} />}
                disabled={answers[currentQuestion.id] === undefined}
                onClick={handleNextQuestion}
              >
                Next Question
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                size="md"
                leftIcon={<RiCheckLine size={18} />}
                disabled={answers[currentQuestion.id] === undefined}
                isLoading={submitMutation.isPending}
                onClick={handleSubmitAssessment}
              >
                Submit Assessment
              </Button>
            )}
          </WizardFooterNav>
          </>
          ) : (
            <WizardStepBody>
              <QuestionSubtext style={{ fontSize: '14px', fontWeight: 500, color: '#334155' }}>
                Loading questions…
              </QuestionSubtext>
            </WizardStepBody>
          )}
        </WizardContainer>
      )}
      {/* Completion Confirmation Popup Modal */}
      <SuccessModal
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        title="Thank you for completing your Career Profiling!"
        message="Your kREATE Compass Report is generating."
        confirmText="Go to Student Portal"
        onConfirm={handleConfirmCompletion}
      />
    </FormPageContainer>
  );
};

export default AssessmentFormPage;
