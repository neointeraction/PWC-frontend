import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  RiQuestionLine,
  RiGridLine,
  RiTimerFlashLine,
  RiShieldCheckLine,
  RiVolumeMuteLine,
  RiUserHeartLine,
  RiEyeLine,
  RiInformationLine,
  RiStarLine,
  RiSparklingLine,
  RiPlayCircleLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckLine,
  RiHeartLine,
  RiTimeLine,
} from 'react-icons/ri';
import { Button } from '@/components/Button';
import { SuccessModal } from '@/components';
import { ROUTES } from '@/constants';
import { useToast } from '@/hooks';
import { formsService, FormAnswerItem, FormQuestion } from '@/services/forms.service';
import { getApiErrorMessage } from '@/utils';
import { QuestionRenderer, isAnswerEmpty } from '../PreCounsellingFormPage/QuestionRenderer';
import {
  FormPageContainer,
  HeroHeaderCard,
  DocumentHeaderRow,
  DocTitle,
  StatsGridBar,
  QuestionBox,
  QuestionTitle,
  RequiredMarker,
  QuestionErrorText,
  InlineLabelRow,
  ReasonLabel,
  OptionList,
  OptionLabel,
  OptionTextGroup,
  InlineOptionTextGroup,
  OptionTitle,
  CustomTextInput,
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
  StartCtaBox,
  CtaSubtext,
  WizardContainer,
  WizardProgressHeader,
  WizardStepInfoRow,
  ProgressTrack,
  ProgressBar,
  WizardStepBody,
  WizardFooterNav,
} from '../PreCounsellingFormPage/PreCounsellingFormPage.styles';

// ─────────────────────────────────────────────────────────────
// Every question, its section grouping (the wizard's 5 steps), and its options come from
// the real GET /forms/PRE_COUNSELLING_PARENT template — nothing here is hardcoded
// per-question. The generic questionType-driven renderer lives in
// ../PreCounsellingFormPage/QuestionRenderer, shared with the student pre-counselling form.
//
// Parents have no login — the link they're sent carries the studentId directly
// (/parent-pre-counselling-form/:studentId), and the form-write endpoints are public but
// project-window gated (403 once the student's project has closed/expired).
// ─────────────────────────────────────────────────────────────

// No public endpoint exists yet to look up a student's cohort from an unauthenticated
// parent link, and the org currently runs a single cohort — see CLAUDE.md.
const COHORT = 'CLASS_9_10';

// ---- Interim special-case for Q1/Q2 (strong/struggling subject + reason) ----
// The backend's MATRIX seed for these two questions only has 3 plain subject-name fields
// (no "why" reason picker), unlike the matching student-form questions (Q2/Q3) which do.
// We asked backend to add a `reason` field matching that pattern; until they do, we render
// the original single-subject + reason UI here and nest the reason answer under an extra,
// backend-undeclared key inside the MATRIX answer object — the backend only validates the
// top-level fieldKey (see forms.service.ts on PWC-backend), not what's nested inside a
// MATRIX answer, so this round-trips through the real API with nothing silently dropped.
// Once backend ships the real field, swap `reasonFieldKey`/`reasonOtherFieldKey` below for
// whatever key they use — no other change needed.
interface SubjectReasonConfig {
  subjectFieldKey: string;
  subjectLabel: string;
  reasonPrompt: string;
  reasonFieldKey: string;
  reasonOtherFieldKey: string;
  reasonOptions: { key: string; text: string }[];
  // Falls back to this when the backend question has no helpText of its own (Q2's seed
  // is missing one entirely) — remove once backend adds it.
  helpTextFallback?: string;
}

const SUBJECT_REASON_CONFIG: Record<string, SubjectReasonConfig> = {
  strong_subjects_block: {
    subjectFieldKey: 'strong_subject_1',
    subjectLabel: 'Strong Subject',
    reasonPrompt: 'I believe my child enjoys this subject because :',
    reasonFieldKey: 'strong_subject_reason',
    reasonOtherFieldKey: 'strong_subject_reason_other',
    reasonOptions: [
      { key: 'a', text: 'My child love solving problems and puzzles in this subject' },
      { key: 'b', text: 'It allows my child to be creative and come up with new ideas' },
      { key: 'c', text: 'It connects to real life, my child can see how it is actually used' },
      { key: 'd', text: 'It just feels easy and natural to my child who simply enjoys it' },
    ],
  },
  struggle_subjects_block: {
    subjectFieldKey: 'struggle_subject_1',
    subjectLabel: 'Struggling Subject',
    reasonPrompt: 'It is difficult because :',
    reasonFieldKey: 'struggle_subject_reason',
    reasonOtherFieldKey: 'struggle_subject_reason_other',
    reasonOptions: [
      { key: 'a', text: "My child don't understand the concepts, it feels like just memorising" },
      { key: 'b', text: 'My child get anxious during exams or tests for this subject' },
      { key: 'c', text: 'The way it is taught is too theoretical and boring' },
      { key: 'd', text: 'My child is simply not interested in this topic' },
    ],
    helpTextFallback:
      'Difficulty does not mean your child is bad at it (not based on scores), it just means your child enjoy the least or do not enjoy at all.',
  },
};

const SubjectReasonQuestion: React.FC<{
  question: FormQuestion;
  config: SubjectReasonConfig;
  value: Record<string, unknown> | undefined;
  onChange: (v: Record<string, unknown>) => void;
  hasError?: boolean;
}> = ({ question, config, value, onChange, hasError }) => {
  const data = value ?? {};
  const subject = (data[config.subjectFieldKey] as string) ?? '';
  const reason = (data[config.reasonFieldKey] as string) ?? '';
  const reasonOther = (data[config.reasonOtherFieldKey] as string) ?? '';

  const setField = (key: string, val: string) => onChange({ ...data, [key]: val });
  const helpText = question.helpText || config.helpTextFallback;

  return (
    <QuestionBox $hasError={hasError}>
      <QuestionTitle>
        {question.questionCode.replace(/^Q/i, '')}. {question.questionText}
        {question.isRequired && <RequiredMarker>*</RequiredMarker>}
      </QuestionTitle>
      {helpText && (
        <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: 13, marginTop: 4, marginBottom: 16 }}>
          {helpText}
        </p>
      )}
      {hasError && <QuestionErrorText>This question is required.</QuestionErrorText>}

      <InlineLabelRow>
        <label>{config.subjectLabel} :</label>
        <CustomTextInput
          placeholder="Enter subject name..."
          style={{ flex: 1, minWidth: 260 }}
          value={subject}
          onChange={e => setField(config.subjectFieldKey, e.target.value)}
        />
      </InlineLabelRow>

      <ReasonLabel>{config.reasonPrompt}</ReasonLabel>
      <OptionList>
        {config.reasonOptions.map(opt => (
          <OptionLabel key={opt.key} $selected={reason === opt.key}>
            <input type="radio" checked={reason === opt.key} onChange={() => setField(config.reasonFieldKey, opt.key)} />
            <OptionTextGroup>
              <OptionTitle>{opt.text}</OptionTitle>
            </OptionTextGroup>
          </OptionLabel>
        ))}
        <OptionLabel $selected={reason === 'other'}>
          <input type="radio" checked={reason === 'other'} onChange={() => setField(config.reasonFieldKey, 'other')} />
          <InlineOptionTextGroup>
            <OptionTitle>Any Other Reason :</OptionTitle>
            <CustomTextInput
              placeholder="Please specify..."
              value={reasonOther}
              onChange={e => setField(config.reasonOtherFieldKey, e.target.value)}
            />
          </InlineOptionTextGroup>
        </OptionLabel>
      </OptionList>
    </QuestionBox>
  );
};

export const ParentPreCounsellingFormPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { studentId } = useParams<{ studentId: string }>();

  const { data: template, isLoading: isTemplateLoading } = useQuery({
    queryKey: ['form-template', 'PRE_COUNSELLING_PARENT', COHORT],
    queryFn: () => formsService.getTemplate('PRE_COUNSELLING_PARENT', COHORT),
    staleTime: 5 * 60_000,
  });

  // Load any existing draft/submission so the form prefills what was saved before.
  const { data: existingSubmission } = useQuery({
    queryKey: ['form-submission', 'PRE_COUNSELLING_PARENT', studentId, COHORT],
    queryFn: () => formsService.getSubmission('PRE_COUNSELLING_PARENT', studentId!, COHORT),
    enabled: !!studentId,
    staleTime: 30_000,
  });

  const sections = useMemo(() => {
    const questions = [...(template?.questions ?? [])].sort((a, b) => a.order - b.order);
    // Display-order override: product wants Q3 (strengths table) on the same page as
    // Q1/Q2, but the backend seed still files it under Section 2. Re-home it under
    // whatever label Q1 actually uses, so this survives the section wording changing —
    // remove once backend moves p_strengths_table's sectionLabel to Section 1.
    const section1Label = questions.find(q => q.fieldKey === 'strong_subjects_block')?.sectionLabel;
    const bySection = new Map<string, FormQuestion[]>();
    const sectionOrder: string[] = [];
    questions.forEach(q => {
      const key = (q.fieldKey === 'p_strengths_table' && section1Label) || q.sectionLabel || 'Questions';
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
    }, 100);
  };

  // Answers keyed by fieldKey — a MATRIX question's value is a nested object
  // (per-row/per-field), everything else is a plain value.
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

  const currentSection = sections[currentStep - 1];

  const goNext = () => {
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

  const goPrev = () => {
    setErrorFieldKeys(new Set());
    setCurrentStep(prev => Math.max(1, prev - 1));
    scrollToTop();
  };

  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState<boolean>(false);
  // The project-window gate (docs: "Show an 'this link has expired' screen — don't retry")
  // — set once, blocks the wizard permanently rather than letting the parent retry.
  const [linkExpiredMessage, setLinkExpiredMessage] = useState<string | null>(null);

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
      formsService.submitForm('PRE_COUNSELLING_PARENT', studentId!, {
        cohort: COHORT,
        answers: buildAnswers(),
      }),
    onSuccess: () => {
      localStorage.setItem('pwc_parent_pre_counselling_submitted', 'true');
      toast.success(
        'Pre-Counselling Form Submitted!',
        'Thank you for completing the form. Your responses will only be seen by the career counsellor.'
      );
      setIsCompletionModalOpen(false);
      navigate(ROUTES.LOGIN);
    },
    onError: (err: unknown) => {
      setIsCompletionModalOpen(false);
      if (err instanceof AxiosError && err.response?.status === 403) {
        setLinkExpiredMessage(getApiErrorMessage(err, 'This link has expired — submissions are closed.'));
        return;
      }
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

  const progressPercent = totalSteps ? Math.round((currentStep / totalSteps) * 100) : 0;

  if (!studentId) {
    return (
      <FormPageContainer ref={topRef}>
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
      <FormPageContainer ref={topRef}>
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
    <FormPageContainer ref={topRef}>
      {/* STAGE 1: INSTRUCTIONS VIEW */}
      {!isFormStarted ? (
        <HeroHeaderCard>
          <DocumentHeaderRow>
            <DocTitle>PRE-COUNSELLING FORM</DocTitle>
          </DocumentHeaderRow>

          {/* 4 Floating Metric Cards */}
          <StatsGridBar>
            <StatBlock $gradient="linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)" $borderColor="#DBEAFE">
              <StatIconBox $bg="#DBEAFE" $color="#1E40AF">
                <RiQuestionLine size={24} />
              </StatIconBox>
              <StatInfoBox>
                <StatNumber $color="#1E40AF">{totalQuestions || '22'}</StatNumber>
                <StatLabel>Questions</StatLabel>
              </StatInfoBox>
            </StatBlock>

            <StatBlock $gradient="linear-gradient(135deg, #F8FAFC 0%, #FAF5FF 100%)" $borderColor="#E9D5FF">
              <StatIconBox $bg="#F3E8FF" $color="#6B21A8">
                <RiGridLine size={24} />
              </StatIconBox>
              <StatInfoBox>
                <StatNumber $color="#6B21A8">{sections.length || '5'}</StatNumber>
                <StatLabel>Sections</StatLabel>
              </StatInfoBox>
            </StatBlock>

            <StatBlock $gradient="linear-gradient(135deg, #F8FAFC 0%, #FEF3C7 100%)" $borderColor="#FDE68A">
              <StatIconBox $bg="#FEF3C7" $color="#B45309">
                <RiTimerFlashLine size={24} />
              </StatIconBox>
              <StatInfoBox>
                <StatNumber $color="#B45309">12–15</StatNumber>
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

          {/* Before You Fill This Form */}
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
                  <NumberCardTitle>1. Find a quiet moment away from your child.</NumberCardTitle>
                </NumberBadgeHeader>
                <NumberCardDesc>
                  Choose a time when you are relaxed and undisturbed, not between tasks or during a busy hour. These questions deserve your unhurried attention.
                </NumberCardDesc>
              </NumberCardItem>

              <NumberCardItem>
                <NumberBadgeHeader>
                  <NumberBadgeIcon $bg="#D1FAE5" $color="#047857">
                    <RiUserHeartLine size={20} />
                  </NumberBadgeIcon>
                  <NumberCardTitle>2. Fill this independently or along with your spouse.</NumberCardTitle>
                </NumberBadgeHeader>
                <NumberCardDesc>
                  Your perspective is most valuable when it is uninfluenced. Please do not discuss your responses with your child at all, and do not try to align your answers with theirs.
                </NumberCardDesc>
              </NumberCardItem>

              <NumberCardItem>
                <NumberBadgeHeader>
                  <NumberBadgeIcon $bg="#F3E8FF" $color="#6B21A8">
                    <RiEyeLine size={20} />
                  </NumberBadgeIcon>
                  <NumberCardTitle>3. Answer based on what you genuinely observe, not what you hope for.</NumberCardTitle>
                </NumberBadgeHeader>
                <NumberCardDesc>
                  There is a natural temptation to present your child in the best light. Please resist it. Accurate observations including doubts, concerns, or gaps, give the counsellor the clearest picture to work from. Your responses will only be seen by the career counsellor, not your child.
                </NumberCardDesc>
              </NumberCardItem>
            </NumberedCardsStack>
          </div>

          {/* What This Form Is About */}
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
                  <span>This is not a report card and it is not about evaluating your child.</span>
                </StatementListItem>
                <StatementListItem>
                  <RiInformationLine size={20} />
                  <span>As a parent, you observe your child in contexts that no teacher or counsellor ever sees at home, in unguarded moments. That perspective is irreplaceable, and this form is how you share it.</span>
                </StatementListItem>
                <StatementListItem>
                  <RiInformationLine size={20} />
                  <span>The counsellor will read both this form and your child&apos;s form together, looking for patterns, alignments, and gaps between how your child sees themselves and how you see them. That comparison is often where the most useful insights emerge.</span>
                </StatementListItem>
              </StatementList>
            </StatementParagraphCard>
          </div>

          {/* Why Your Form Matters */}
          <div>
            <SectionTitleHeader>
              <SectionHeaderIcon $color="#047857">
                <RiHeartLine size={18} />
              </SectionHeaderIcon>
              <SectionTitleText>Why Your Form Matters</SectionTitleText>
            </SectionTitleHeader>

            <StatementParagraphCard style={{ marginTop: 16, borderLeftColor: '#047857' }}>
              <StatementList>
                <StatementListItem>
                  <RiInformationLine size={20} style={{ color: '#047857' }} />
                  <span>
                    <strong>Two perspectives are always better than one.</strong><br />
                    Students often have blind spots about their own strengths or overestimate abilities they wish they had. Parents see patterns that students cannot see in themselves. When both views are read together, the counsellor can offer guidance that is grounded in reality, not just self-perception.
                  </span>
                </StatementListItem>
                <StatementListItem>
                  <RiInformationLine size={20} style={{ color: '#047857' }} />
                  <span>
                    <strong>The gap between parent and child responses is informative not a problem.</strong><br />
                    If your answers differ significantly from your child&apos;s, that is not a cause for concern. It is valuable data. The counsellor is trained to work with these differences and they often point to the most important conversations to have in the session.
                  </span>
                </StatementListItem>
              </StatementList>
            </StatementParagraphCard>
          </div>

          {/* The Golden Rules */}
          <div>
            <SectionTitleHeader>
              <SectionHeaderIcon $color="#D97706">
                <RiStarLine size={18} />
              </SectionHeaderIcon>
              <SectionTitleText>The Golden Rules — Read These Carefully</SectionTitleText>
            </SectionTitleHeader>

            <GoldenRulesGrid style={{ marginTop: 16, gridTemplateColumns: '1fr' }}>
              <GoldenRuleCard>
                <GoldenRuleIconBox>
                  <RiStarLine size={20} />
                </GoldenRuleIconBox>
                <GoldenRuleContent>
                  <GoldenRuleTitle>Be honest not aspirational.</GoldenRuleTitle>
                  <GoldenRuleDesc>
                    Answer based on what you actually observe in your child not what you hope for them, not what you think a good parent should say, and not what sounds most impressive. The more accurate your responses, the more useful the session will be.
                  </GoldenRuleDesc>
                </GoldenRuleContent>
              </GoldenRuleCard>

              <GoldenRuleCard>
                <GoldenRuleIconBox>
                  <RiStarLine size={20} />
                </GoldenRuleIconBox>
                <GoldenRuleContent>
                  <GoldenRuleTitle>Tick what you have genuinely seen not what you believe is true or wish your child to be.</GoldenRuleTitle>
                  <GoldenRuleDesc>
                    For the strengths table in Section 2, only tick &apos;Clearly See This&apos; if you have concrete, real examples in mind. &apos;Sometimes&apos; and &apos;Rarely / Never&apos; are equally valuable, they help build an honest picture.
                  </GoldenRuleDesc>
                </GoldenRuleContent>
              </GoldenRuleCard>

              <GoldenRuleCard>
                <GoldenRuleIconBox>
                  <RiStarLine size={20} />
                </GoldenRuleIconBox>
                <GoldenRuleContent>
                  <GoldenRuleTitle>Separate what your child wants from what you want.</GoldenRuleTitle>
                  <GoldenRuleDesc>
                    Some questions ask about your preferences; others ask about your child&apos;s. Read each question carefully and answer from the perspective it is asking for. Both your voice and your child&apos;s voice matter.
                  </GoldenRuleDesc>
                </GoldenRuleContent>
              </GoldenRuleCard>

              <GoldenRuleCard>
                <GoldenRuleIconBox>
                  <RiStarLine size={20} />
                </GoldenRuleIconBox>
                <GoldenRuleContent>
                  <GoldenRuleTitle>It is okay not to know.</GoldenRuleTitle>
                  <GoldenRuleDesc>
                    If you are unsure how your child handles a particular situation, or if you have never observed a particular behaviour, say so. &apos;I am not sure&apos; or leaving a field blank is more useful than guessing. Do not fill gaps with assumptions.
                  </GoldenRuleDesc>
                </GoldenRuleContent>
              </GoldenRuleCard>

              <GoldenRuleCard>
                <GoldenRuleIconBox>
                  <RiStarLine size={20} />
                </GoldenRuleIconBox>
                <GoldenRuleContent>
                  <GoldenRuleTitle>Your responses are completely confidential.</GoldenRuleTitle>
                  <GoldenRuleDesc>
                    Only the counsellor will see your form. Your child will not have access to it. Please use this as a safe space to share concerns, observations, or context that you might not say directly to your child, it is genuinely helpful.
                  </GoldenRuleDesc>
                </GoldenRuleContent>
              </GoldenRuleCard>
            </GoldenRulesGrid>
          </div>

          {/* Encouragement Banner */}
          <ReadyEncouragementBanner>
            <ReadyBannerTitle>Thank you for taking the time to do this thoughtfully.</ReadyBannerTitle>
          </ReadyEncouragementBanner>

          <StartCtaBox>
            <Button
              variant="primary"
              size="lg"
              rightIcon={<RiPlayCircleLine size={20} />}
              isLoading={isTemplateLoading}
              onClick={() => {
                setIsFormStarted(true);
                scrollToTop();
              }}
              style={{ minWidth: '320px' }}
            >
              Start Pre-Counselling Form
            </Button>
            <CtaSubtext>Answers saved automatically as you navigate</CtaSubtext>
          </StartCtaBox>
        </HeroHeaderCard>
      ) : (
        /* WIZARD VIEW — driven entirely by the fetched template's sections/questions */
        <WizardContainer>
          <WizardProgressHeader>
            <WizardStepInfoRow>
              <span>{sections[currentStep - 1]?.label?.replace(/^Section\s*\d+\s*[—-]\s*/i, '').toUpperCase()}</span>
              <span>Step {currentStep} of {totalSteps} ({progressPercent}%)</span>
            </WizardStepInfoRow>

            <ProgressTrack>
              <ProgressBar $percent={progressPercent} />
            </ProgressTrack>
          </WizardProgressHeader>

          <WizardStepBody>
            {currentSection?.questions.map(q => {
              const subjectReasonConfig = SUBJECT_REASON_CONFIG[q.fieldKey];
              return subjectReasonConfig ? (
                <SubjectReasonQuestion
                  key={q.id}
                  question={q}
                  config={subjectReasonConfig}
                  value={answers[q.fieldKey] as Record<string, unknown> | undefined}
                  onChange={v => setAnswer(q.fieldKey, v)}
                  hasError={errorFieldKeys.has(q.fieldKey)}
                />
              ) : (
                <QuestionRenderer
                  key={q.id}
                  question={q}
                  value={answers[q.fieldKey]}
                  onChange={v => setAnswer(q.fieldKey, v)}
                  hasError={errorFieldKeys.has(q.fieldKey)}
                />
              );
            })}
          </WizardStepBody>

          {/* FOOTER NAV */}
          <WizardFooterNav>
            {currentStep > 1 && (
              <Button type="button" variant="secondary" leftIcon={<RiArrowLeftLine size={18} />} onClick={goPrev}>
                Previous
              </Button>
            )}
            {currentStep < totalSteps ? (
              <Button type="button" variant="primary" rightIcon={<RiArrowRightLine size={18} />} onClick={goNext} style={{ marginLeft: 'auto' }}>
                Next
              </Button>
            ) : (
              <Button type="button" variant="primary" leftIcon={<RiCheckLine size={18} />} onClick={handleSubmitForm} style={{ marginLeft: 'auto' }}>
                Submit Form
              </Button>
            )}
          </WizardFooterNav>
        </WizardContainer>
      )}

      {/* Completion Modal */}
      <SuccessModal
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        title="Thank you for completing your Pre-Counselling Form!"
        confirmText="Back to Home"
        onConfirm={handleConfirmCompletion}
      />
    </FormPageContainer>
  );
};

export default ParentPreCounsellingFormPage;
