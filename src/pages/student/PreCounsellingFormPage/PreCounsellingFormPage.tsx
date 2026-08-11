import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { SuccessModal } from '@/components';
import { ROUTES } from '@/constants';
import { useToast } from '@/hooks';
import {
  FormPageContainer,
  HeroHeaderCard,
  DocumentHeaderRow,
  HeaderTopNavRow,
  HeaderBackButton,
  DocTitle,
  DocSubtitle,
  DocNote,
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
  CtaSubtext,
  WizardContainer,
  WizardProgressHeader,
  WizardStepInfoRow,
  ProgressTrack,
  ProgressBar,
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
} from './PreCounsellingFormPage.styles';

export const PreCounsellingFormPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isFormStarted, setIsFormStarted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 6;

  // Focus ref for scroll to top
  const topRef = useRef<HTMLDivElement>(null);

  // Scroll to top helper
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

  // Form State
  const [answers, setAnswers] = useState<{
    q1_marksTable?: Record<string, { class7?: string; class8?: string; class9?: string }>;
    q1_otherSubjectName?: string;
    q2_favouriteSubject?: string;
    q2_enjoyReason?: string;
    q2_enjoyReasonOther?: string;
    q3_hardestSubject?: string;
    q3_difficultReason?: string;
    q3_difficultReasonOther?: string;
    q4_freeTimeActivities?: string[];
    q4_freeTimeOther?: string;
    q5_hobbiesTable?: Array<{ hobby: string; hours: string }>;
    q6_hobbyConsistency?: string;
    q7_schoolActivities?: string[];
    q7_schoolActivitiesOther?: string;
    q8_learningStyle?: string;
    q9_strengthsRatings?: Record<string, 'definitely' | 'somewhat' | 'not_really'>;
    q10_studyChallenges?: string[];
    q10_studyChallengesOther?: string;
    q11_personalityType?: string;
    q12_decisionStyle?: string;
    q12_decisionStyleOther?: string;
    q13_failureResponse?: string;
    q13_failureResponseOther?: string;
    q14_specificCareersInput?: string;
    q15_careerInterestReason?: string;
    q15_careerInterestReasonOther?: string;
    q16_careerInfluencer?: string;
    q16_careerInfluencerOther?: string;
    q17_parentalUnderstanding?: string;
    q18_programmeHopes?: string[];
    q18_programmeHopesOther?: string;
    q19_counsellorNotesInput?: string;
    q4_streamChoices?: Record<string, string>;
    q5_streamConfidence?: string;
    q6_careerClusterPicks?: string[];
    q7_dreamCareersInput?: string;
    q8_workActivityRatings?: Record<string, string>;
    q9_strengthSelections?: string[];
    q10_top3StrengthsInput?: string;
    q11_growthAreasInput?: string;
    q12_studyHabitRatings?: Record<string, string>;
    q13_coCurricularEntries?: Array<{ activity: string; role: string; years: string }>;
    q14_freetimeActivities?: string[];
    q14_freetimeOther?: string;
    q15_counsellingGoals?: string[];
    q15_counsellingGoalsOther?: string;
    q16_specificQuestionsInput?: string;
  }>({
    q1_marksTable: {
      English: { class7: '', class8: '', class9: '' },
      'Second Language': { class7: '', class8: '', class9: '' },
      Science: { class7: '', class8: '', class9: '' },
      Mathematics: { class7: '', class8: '', class9: '' },
      'Social Science': { class7: '', class8: '', class9: '' },
      'Computer Science': { class7: '', class8: '', class9: '' },
      Other: { class7: '', class8: '', class9: '' },
    },
    q1_otherSubjectName: '',
    q4_freeTimeActivities: [],
    q4_freeTimeOther: '',
    q5_hobbiesTable: [
      { hobby: '', hours: '' },
      { hobby: '', hours: '' },
    ],
    q6_hobbyConsistency: '',
    q7_schoolActivities: [],
    q7_schoolActivitiesOther: '',
    q8_learningStyle: '',
    q9_strengthsRatings: {},
    q10_studyChallenges: [],
    q10_studyChallengesOther: '',
    q4_streamChoices: {},
    q8_workActivityRatings: {},
    q12_studyHabitRatings: {},
    q13_coCurricularEntries: [
      { activity: '', role: '', years: '' },
      { activity: '', role: '', years: '' },
    ],
  });

  const handleQ10ChallengeToggle = (optKey: string) => {
    setAnswers(prev => {
      const current = prev.q10_studyChallenges || [];
      if (current.includes(optKey)) {
        return { ...prev, q10_studyChallenges: current.filter(k => k !== optKey) };
      }
      if (current.length >= 2) {
        return prev;
      }
      return { ...prev, q10_studyChallenges: [...current, optKey] };
    });
  };

  const handleHobbyRowChange = (index: number, field: 'hobby' | 'hours', val: string) => {
    setAnswers(prev => {
      const list = [...(prev.q5_hobbiesTable || [{ hobby: '', hours: '' }, { hobby: '', hours: '' }])];
      list[index] = { ...list[index], [field]: val };
      return { ...prev, q5_hobbiesTable: list };
    });
  };

  const handleMarksCellChange = (subject: string, col: 'class7' | 'class8' | 'class9', val: string) => {
    setAnswers(prev => ({
      ...prev,
      q1_marksTable: {
        ...prev.q1_marksTable,
        [subject]: {
          ...(prev.q1_marksTable?.[subject] || {}),
          [col]: val,
        },
      },
    }));
  };

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(totalSteps, prev + 1));
    scrollToTop();
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    scrollToTop();
  };

  const handleSingleSelect = (key: string, val: string) => {
    setAnswers(prev => ({ ...prev, [key]: val }));
  };

  const handleMultiSelectToggle = (key: string, val: string) => {
    setAnswers(prev => {
      const currentList = (prev[key as keyof typeof prev] as string[]) || [];
      const updated = currentList.includes(val)
        ? currentList.filter(item => item !== val)
        : [...currentList, val];
      return { ...prev, [key]: updated };
    });
  };

  const handleNestedSelect = (groupKey: 'q4_streamChoices' | 'q8_workActivityRatings' | 'q9_strengthsRatings' | 'q12_studyHabitRatings', itemKey: string, val: string) => {
    setAnswers(prev => ({
      ...prev,
      [groupKey]: {
        ...((prev[groupKey as keyof typeof prev] as Record<string, string>) || {}),
        [itemKey]: val,
      },
    }));
  };

  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState<boolean>(false);

  const handleSubmitForm = () => {
    setIsCompletionModalOpen(true);
  };

  const handleConfirmCompletion = () => {
    localStorage.setItem('pwc_precounselling_submitted', 'true');
    localStorage.setItem('pwc_student_precounseling_form_submitted', 'true');
    toast.success(
      'Pre-Counselling Form Submitted!',
      'Thank you for completing the form. Your counsellor will review your responses before Session 1.'
    );
    setIsCompletionModalOpen(false);
    navigate(ROUTES.STUDENT_PORTAL);
  };

  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <FormPageContainer ref={topRef}>
      {isFormStarted && (
        <PageHeader
          title="STUDENT PRE-COUNSELLING FORM"
          subtitle="Career Counselling Programme — Class 9 & 10"
          breadcrumbs={[
            { label: 'Student Portal', href: ROUTES.STUDENT_PORTAL },
            { label: 'Pre-Counselling Form' },
          ]}
          onBack={() => navigate(ROUTES.STUDENT_PORTAL)}
          actions={
            <Badge variant="primary" size="md">
              Step {currentStep} of {totalSteps}
            </Badge>
          }
        />
      )}

      {/* STAGE 1: REDESIGNED INSTRUCTIONS VIEW matching Student Pre-Counselling reference images */}
      {!isFormStarted ? (
        <HeroHeaderCard>
          {/* Header */}
          <DocumentHeaderRow>
            <HeaderTopNavRow>
              <HeaderBackButton
                type="button"
                onClick={() => navigate(ROUTES.STUDENT_PORTAL)}
                aria-label="Back to Student Portal"
              >
                <RiArrowLeftLine size={18} />
              </HeaderBackButton>
            </HeaderTopNavRow>

            <DocTitle>STUDENT PRE-COUNSELLING FORM</DocTitle>
            <DocSubtitle>Career Counselling Programme — Class 9 & 10</DocSubtitle>
            <DocNote>Instructions for Students • Read this carefully before you begin.</DocNote>
          </DocumentHeaderRow>

          {/* 4 Floating Metric Cards Bar */}
          <StatsGridBar>
            <StatBlock $gradient="linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)" $borderColor="#DBEAFE">
              <StatIconBox $bg="#DBEAFE" $color="#1E40AF">
                <RiQuestionLine size={24} />
              </StatIconBox>
              <StatInfoBox>
                <StatNumber $color="#1E40AF">19</StatNumber>
                <StatLabel>Questions</StatLabel>
              </StatInfoBox>
            </StatBlock>

            <StatBlock $gradient="linear-gradient(135deg, #F8FAFC 0%, #FAF5FF 100%)" $borderColor="#E9D5FF">
              <StatIconBox $bg="#F3E8FF" $color="#6B21A8">
                <RiGridLine size={24} />
              </StatIconBox>
              <StatInfoBox>
                <StatNumber $color="#6B21A8">6</StatNumber>
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
                  Sit somewhere with no distractions — no noise, no interruptions. These questions need your honest, unhurried attention. Treat this time as an investment in your own career clarity — not a task which you just need to finish of in any manner.
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
                  This is not something to rush through between classes. Choose a time when you are relaxed and can reflect properly. Quality of reflection matters more than speed.
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
                  Avoid the urge to check messages while filling the form. It breaks the flow of honest self-reflection — give it your full focus.
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
                  <span>This is not a psychometric test nor an aptitude exam. There are no right answers and no wrong answers — and nothing here will be graded.</span>
                </StatementListItem>
                <StatementListItem>
                  <RiInformationLine size={20} />
                  <span>This form helps your counsellor get to know you before your session. The more honestly you fill it, the more personalised and useful your counselling session will be.</span>
                </StatementListItem>
                <StatementListItem>
                  <RiInformationLine size={20} />
                  <span>Think of it as a conversation starter — not an assessment. You are not being judged. Your responses are completely confidential and will only be seen by your counsellor.</span>
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
                    Answer based on how you actually are — not how you want to appear, not what sounds impressive, not what you think a counsellor wants to hear. The more genuine your responses, the more your session will feel tailored to you.
                  </GoldenRuleDesc>
                </GoldenRuleContent>
              </GoldenRuleCard>

              <GoldenRuleCard>
                <GoldenRuleIconBox>
                  <RiStarLine size={20} />
                </GoldenRuleIconBox>
                <GoldenRuleContent>
                  <GoldenRuleTitle>Take your time — go with your first instinct.</GoldenRuleTitle>
                  <GoldenRuleDesc>
                    For open-ended questions, write what naturally comes to mind. For multiple-choice questions, go with your first instinct. Your gut reaction is usually the truest one. If you sit on a question too long, you start second-guessing yourself.
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
                    Every question gives your counsellor something useful. If something feels too personal, just write as much as you are comfortable with — but try not to leave anything blank.
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
                    Only you and your career counsellor will see your answers. This is a safe space — there is no audience, no judgment, no grades. Be real.
                  </GoldenRuleDesc>
                </GoldenRuleContent>
              </GoldenRuleCard>

              <GoldenRuleCard style={{ gridColumn: 'span 2' }}>
                <GoldenRuleIconBox>
                  <RiStarLine size={20} />
                </GoldenRuleIconBox>
                <GoldenRuleContent>
                  <GoldenRuleTitle>It is okay to say &apos;I don&apos;t know&apos;.</GoldenRuleTitle>
                  <GoldenRuleDesc>
                    If you are unsure about your career direction — that is perfectly normal at your age. Write &apos;Still Exploring&apos; wherever asked. Your uncertainty is valuable information too.
                  </GoldenRuleDesc>
                </GoldenRuleContent>
              </GoldenRuleCard>
            </GoldenRulesGrid>
          </div>

          {/* Encouragement Hero Banner & CTA Button */}
          <ReadyEncouragementBanner>
            <ReadyBannerTitle>You are ready. Take a deep breath.</ReadyBannerTitle>
            <ReadyBannerSubtext>
              There is nothing to prepare for. Just be yourself — and let your counsellor do the rest.
            </ReadyBannerSubtext>
          </ReadyEncouragementBanner>

          <StartCtaBox>
            <Button
              variant="primary"
              size="lg"
              rightIcon={<RiPlayCircleLine size={20} />}
              onClick={() => {
                setIsFormStarted(true);
                scrollToTop();
              }}
              style={{ minWidth: '320px' }}
            >
              Start Pre-Counselling Form
            </Button>
            <CtaSubtext>Estimated time: 10–12 minutes • Answers saved automatically as you navigate</CtaSubtext>
          </StartCtaBox>
        </HeroHeaderCard>
      ) : (
        /* WIZARD VIEW: STEPS 1 - 6 */
        <WizardContainer>
          <WizardProgressHeader>
            <WizardStepInfoRow>
              <span>
                {currentStep === 1 && 'MY ACADEMIC RECORD'}
                {currentStep === 2 && 'HOW I SPEND MY TIME'}
                {currentStep === 3 && 'WHAT I AM GOOD AT'}
                {currentStep === 4 && 'MY PERSONALITY & HOW I THINK'}
                {currentStep === 5 && 'MY CAREER THOUGHTS'}
                {currentStep === 6 && 'WHAT I WANT FROM THIS PROGRAMME'}
              </span>
              <span>Step {currentStep} of {totalSteps} ({progressPercent}%)</span>
            </WizardStepInfoRow>

            <ProgressTrack>
              <ProgressBar $percent={progressPercent} />
            </ProgressTrack>
          </WizardProgressHeader>

          <WizardStepBody>
            {/* STEP 1 */}
            {currentStep === 1 && (
              <>
                {/* QUESTION 1 */}
                <QuestionBox>
                  <QuestionTitle>1. Fill in your marks or grade for the last three years.</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    This is not to evaluate you based on marks, but more to know what you may like or dislike.
                  </p>

                  <MarksTableContainer>
                    <MarksTable>
                      <thead>
                        <tr>
                          <th style={{ width: '40%', textAlign: 'left' }}>Subject</th>
                          <th style={{ width: '20%', textAlign: 'center' }}>Class 7</th>
                          <th style={{ width: '20%', textAlign: 'center' }}>Class 8</th>
                          <th style={{ width: '20%', textAlign: 'center' }}>Class 9</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          'English',
                          'Second Language',
                          'Science',
                          'Mathematics',
                          'Social Science',
                          'Computer Science',
                        ].map(subj => (
                          <tr key={subj}>
                            <td>
                              <SubjectCellText>{subj}</SubjectCellText>
                            </td>
                            <td>
                              <TableInput
                                placeholder="Marks / Grade"
                                value={answers.q1_marksTable?.[subj]?.class7 || ''}
                                onChange={e => handleMarksCellChange(subj, 'class7', e.target.value)}
                              />
                            </td>
                            <td>
                              <TableInput
                                placeholder="Marks / Grade"
                                value={answers.q1_marksTable?.[subj]?.class8 || ''}
                                onChange={e => handleMarksCellChange(subj, 'class8', e.target.value)}
                              />
                            </td>
                            <td>
                              <TableInput
                                placeholder="Marks / Grade"
                                value={answers.q1_marksTable?.[subj]?.class9 || ''}
                                onChange={e => handleMarksCellChange(subj, 'class9', e.target.value)}
                              />
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <SubjectCellText>Other:</SubjectCellText>
                              <OtherSubjectInput
                                placeholder="Specify subject..."
                                value={answers.q1_otherSubjectName || ''}
                                onChange={e => setAnswers(prev => ({ ...prev, q1_otherSubjectName: e.target.value }))}
                              />
                            </div>
                          </td>
                          <td>
                            <TableInput
                              placeholder="Marks / Grade"
                              value={answers.q1_marksTable?.['Other']?.class7 || ''}
                              onChange={e => handleMarksCellChange('Other', 'class7', e.target.value)}
                            />
                          </td>
                          <td>
                            <TableInput
                              placeholder="Marks / Grade"
                              value={answers.q1_marksTable?.['Other']?.class8 || ''}
                              onChange={e => handleMarksCellChange('Other', 'class8', e.target.value)}
                            />
                          </td>
                          <td>
                            <TableInput
                              placeholder="Marks / Grade"
                              value={answers.q1_marksTable?.['Other']?.class9 || ''}
                              onChange={e => handleMarksCellChange('Other', 'class9', e.target.value)}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </MarksTable>
                  </MarksTableContainer>
                </QuestionBox>

                {/* QUESTION 2 */}
                <QuestionBox>
                  <QuestionTitle>2. Pick the ONE subject you enjoy the most and tell us WHY you enjoy it.</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Think about what subject makes time feel like it&apos;s flying by when you study or work on it, not just what you score well in.
                  </p>

                  <InlineLabelRow>
                    <label htmlFor="q2_favouriteSubject">My favourite subject :</label>
                    <CustomTextInput
                      id="q2_favouriteSubject"
                      placeholder="Enter subject name (e.g. Mathematics)..."
                      style={{ flex: 1, minWidth: 260 }}
                      value={answers.q2_favouriteSubject || ''}
                      onChange={e => setAnswers(prev => ({ ...prev, q2_favouriteSubject: e.target.value }))}
                    />
                  </InlineLabelRow>

                  <ReasonLabel>I enjoy it because :</ReasonLabel>
                  <OptionList>
                    {[
                      { key: 'a', text: 'I love solving problems and puzzles in this subject' },
                      { key: 'b', text: 'It allows me to be creative and come up with new ideas' },
                      { key: 'c', text: 'It connects to real life — I can see how it is actually used' },
                      { key: 'd', text: 'It just feels easy and natural to me — I simply enjoy it' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q2_enjoyReason === opt.key}>
                        <input
                          type="radio"
                          name="q2_enjoyReason"
                          checked={answers.q2_enjoyReason === opt.key}
                          onChange={() => handleSingleSelect('q2_enjoyReason', opt.key)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{opt.text}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel
                      $selected={answers.q2_enjoyReason === 'other'}
                      style={{ alignItems: 'center' }}
                    >
                      <input
                        type="radio"
                        name="q2_enjoyReason"
                        checked={answers.q2_enjoyReason === 'other'}
                        onChange={() => handleSingleSelect('q2_enjoyReason', 'other')}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <OptionTitle>Any Other Reason :</OptionTitle>
                        <InlineReasonInput
                          placeholder="Specify reason..."
                          value={answers.q2_enjoyReasonOther || ''}
                          onChange={e => {
                            setAnswers(prev => ({
                              ...prev,
                              q2_enjoyReason: 'other',
                              q2_enjoyReasonOther: e.target.value,
                            }));
                          }}
                        />
                      </div>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>

                {/* QUESTION 3 */}
                <QuestionBox>
                  <QuestionTitle>3. Pick the ONE subject you find most difficult and tell us WHY.</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Difficulty does not mean you are bad at it (not based on scores), it just means you enjoy the least or do not enjoy at all.
                  </p>

                  <InlineLabelRow>
                    <label htmlFor="q3_hardestSubject">My hardest subject :</label>
                    <CustomTextInput
                      id="q3_hardestSubject"
                      placeholder="Enter subject name (e.g. History)..."
                      style={{ flex: 1, minWidth: 260 }}
                      value={answers.q3_hardestSubject || ''}
                      onChange={e => setAnswers(prev => ({ ...prev, q3_hardestSubject: e.target.value }))}
                    />
                  </InlineLabelRow>

                  <ReasonLabel>It is difficult because :</ReasonLabel>
                  <OptionList>
                    {[
                      { key: 'a', text: "I don't understand the concepts, it feels like just memorising" },
                      { key: 'b', text: 'I get anxious during exams or tests for this subject' },
                      { key: 'c', text: 'The way it is taught is too theoretical and boring' },
                      { key: 'd', text: 'I am simply not interested in this topic' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q3_difficultReason === opt.key}>
                        <input
                          type="radio"
                          name="q3_difficultReason"
                          checked={answers.q3_difficultReason === opt.key}
                          onChange={() => handleSingleSelect('q3_difficultReason', opt.key)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{opt.text}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel
                      $selected={answers.q3_difficultReason === 'other'}
                      style={{ alignItems: 'center' }}
                    >
                      <input
                        type="radio"
                        name="q3_difficultReason"
                        checked={answers.q3_difficultReason === 'other'}
                        onChange={() => handleSingleSelect('q3_difficultReason', 'other')}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <OptionTitle>Any Other Reason :</OptionTitle>
                        <InlineReasonInput
                          placeholder="Specify reason..."
                          value={answers.q3_difficultReasonOther || ''}
                          onChange={e => {
                            setAnswers(prev => ({
                              ...prev,
                              q3_difficultReason: 'other',
                              q3_difficultReasonOther: e.target.value,
                            }));
                          }}
                        />
                      </div>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>
              </>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <>
                {/* QUESTION 4 */}
                <QuestionBox>
                  <QuestionTitle>4. What do you do most in your free time when you are NOT studying? (You may tick more than one)</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Free time includes evenings, weekends, school holidays, any time that is not class or homework time.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'Sports or physical activities (cricket, football, gym, dance, etc.)' },
                      { key: 'b', text: 'Gaming — mobile, PC or console' },
                      { key: 'c', text: 'Creative hobbies — drawing, painting, music, writing, etc.' },
                      { key: 'd', text: 'Socialising — meeting friends or spending time on social media (Facebook/Instagram/WhatsApp/etc)' },
                      { key: 'e', text: 'Skill-building — coding, video editing, public speaking, etc.' },
                      { key: 'f', text: 'Reading — books, articles, news, comics' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q4_freeTimeActivities?.includes(opt.key)}>
                        <input
                          type="checkbox"
                          checked={answers.q4_freeTimeActivities?.includes(opt.key) || false}
                          onChange={() => handleMultiSelectToggle('q4_freeTimeActivities', opt.key)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{opt.text}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel
                      $selected={answers.q4_freeTimeActivities?.includes('other')}
                      style={{ alignItems: 'center' }}
                    >
                      <input
                        type="checkbox"
                        checked={answers.q4_freeTimeActivities?.includes('other') || false}
                        onChange={() => handleMultiSelectToggle('q4_freeTimeActivities', 'other')}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <OptionTitle>Other :</OptionTitle>
                        <InlineReasonInput
                          placeholder="Specify other activity..."
                          value={answers.q4_freeTimeOther || ''}
                          onChange={e => {
                            setAnswers(prev => ({
                              ...prev,
                              q4_freeTimeOther: e.target.value,
                            }));
                            if (!answers.q4_freeTimeActivities?.includes('other')) {
                              handleMultiSelectToggle('q4_freeTimeActivities', 'other');
                            }
                          }}
                        />
                      </div>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>

                {/* QUESTION 5 */}
                <QuestionBox>
                  <QuestionTitle>5. Write your top two hobbies and how many hours per week you spend on them.</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Even casual things like watching YouTube or playing with pets count as hobbies.
                  </p>
                  <MarksTableContainer>
                    <MarksTable>
                      <thead>
                        <tr>
                          <th style={{ width: '10%', textAlign: 'center' }}>#</th>
                          <th style={{ width: '60%', textAlign: 'left' }}>My Hobby</th>
                          <th style={{ width: '30%', textAlign: 'center' }}>Hours per Week</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[0, 1].map(index => (
                          <tr key={index}>
                            <td style={{ textAlign: 'center' }}>
                              <SubjectCellText>{index + 1}</SubjectCellText>
                            </td>
                            <td>
                              <TableInput
                                placeholder={`Hobby ${index + 1}...`}
                                value={answers.q5_hobbiesTable?.[index]?.hobby || ''}
                                onChange={e => handleHobbyRowChange(index, 'hobby', e.target.value)}
                              />
                            </td>
                            <td>
                              <TableInput
                                placeholder="e.g. 5 hours"
                                value={answers.q5_hobbiesTable?.[index]?.hours || ''}
                                onChange={e => handleHobbyRowChange(index, 'hours', e.target.value)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </MarksTable>
                  </MarksTableContainer>
                </QuestionBox>

                {/* QUESTION 6 */}
                <QuestionBox>
                  <QuestionTitle>6. How consistent are your interests / hobbies over time?</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Even casual things like watching YouTube or playing with pets count as interests / hobbies.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'Very consistent — the same interests have continued for a long time' },
                      { key: 'b', text: 'Mostly consistent —mostly interested but at times bored' },
                      { key: 'c', text: 'Frequently changing — new interests appear often and old ones fade quickly' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q6_hobbyConsistency === opt.key}>
                        <input
                          type="radio"
                          name="q6_hobbyConsistency"
                          checked={answers.q6_hobbyConsistency === opt.key}
                          onChange={() => handleSingleSelect('q6_hobbyConsistency', opt.key)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{opt.text}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                  </OptionList>
                </QuestionBox>

                {/* QUESTION 7 */}
                <QuestionBox>
                  <QuestionTitle>7. Which school activities do you enjoy the most? (Tick all that apply)</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    These are activities that are not part of your routine academics or studies.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'Morning assembly — speeches, prayer, thought for the day' },
                      { key: 'b', text: 'Sports and physical education periods' },
                      { key: 'c', text: 'Art, music and creative periods' },
                      { key: 'd', text: 'Club activities — science club, quiz club, coding club, eco club, etc.' },
                      { key: 'e', text: 'Competitions — debates, elocutions, quizzes, house events' },
                      { key: 'f', text: 'Field trips — company visits, factory visits, nature outings' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q7_schoolActivities?.includes(opt.key)}>
                        <input
                          type="checkbox"
                          checked={answers.q7_schoolActivities?.includes(opt.key) || false}
                          onChange={() => handleMultiSelectToggle('q7_schoolActivities', opt.key)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{opt.text}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel
                      $selected={answers.q7_schoolActivities?.includes('other')}
                      style={{ alignItems: 'center' }}
                    >
                      <input
                        type="checkbox"
                        checked={answers.q7_schoolActivities?.includes('other') || false}
                        onChange={() => handleMultiSelectToggle('q7_schoolActivities', 'other')}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <OptionTitle>Any Other :</OptionTitle>
                        <InlineReasonInput
                          placeholder="Specify other activity..."
                          value={answers.q7_schoolActivitiesOther || ''}
                          onChange={e => {
                            setAnswers(prev => ({
                              ...prev,
                              q7_schoolActivitiesOther: e.target.value,
                            }));
                            if (!answers.q7_schoolActivities?.includes('other')) {
                              handleMultiSelectToggle('q7_schoolActivities', 'other');
                            }
                          }}
                        />
                      </div>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>

                {/* QUESTION 8 */}
                <QuestionBox>
                  <QuestionTitle>8. How do you learn best? Choose the ONE option that feels most like you.</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Think about which way of studying actually makes things stick in your mind and you get interested.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'Reading and understanding concepts from books or notes' },
                      { key: 'b', text: 'Doing experiments, projects or hands-on activities' },
                      { key: 'c', text: 'Drawing, designing or expressing ideas through creative work' },
                      { key: 'd', text: 'Solving exercises, case studies and working through problems' },
                      { key: 'e', text: 'Watching videos, listening to podcasts or visual content' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q8_learningStyle === opt.key}>
                        <input
                          type="radio"
                          name="q8_learningStyle"
                          checked={answers.q8_learningStyle === opt.key}
                          onChange={() => handleSingleSelect('q8_learningStyle', opt.key)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{opt.text}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                  </OptionList>
                </QuestionBox>
              </>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <>
                {/* QUESTION 9 */}
                <QuestionBox>
                  <QuestionTitle>
                    9. Read each strength below. For each one, tick whether it is a strong area for you, something average, or not really your strength.
                  </QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16, lineHeight: 1.5 }}>
                    How to think about your strengths : A strength is something you do noticeably well compared to others around you AND something that does not feel like hard work. Others might have complimented you on it. It could be a skill, a habit, or a personality quality. You may find it helpful to think of one example from your life for each row before ticking. Go with your gut instinct rather than what others would have said.
                  </p>

                  <MarksTableContainer>
                    <MarksTable>
                      <thead>
                        <tr>
                          <th style={{ width: '52%', textAlign: 'left' }}>Strength / Ability / Quality</th>
                          <th style={{ width: '16%', textAlign: 'center' }}>Definitely Me ✓✓</th>
                          <th style={{ width: '16%', textAlign: 'center' }}>Somewhat Me ✓</th>
                          <th style={{ width: '16%', textAlign: 'center' }}>Not Really Me ✗</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          'Speaking or presenting in front of others',
                          'Writing clearly (essays, stories, descriptions)',
                          'Drawing, designing or making creative things',
                          'Coming up with original or unusual ideas',
                          'Solving maths or logic problems quickly',
                          'Analysing and understanding complex topics',
                          'Fixing or building things with hands',
                          'Using computers, gadgets or digital tools',
                          'Making friends easily and working in teams',
                          'Understanding how others feel (empathy)',
                          'Playing sports or physical coordination',
                          'Remembering facts and details accurately',
                          'Persuading or motivating others to follow an idea',
                          'Organising work, notes and assignments neatly',
                          'Finding patterns and solving puzzles',
                          'Visualising shapes, maps, or objects in different positions',
                          'Being comfortable trying something new even when success is uncertain',
                          'Taking initiative without being told what to do',
                        ].map((strength, index) => (
                          <tr key={strength}>
                            <td>
                              <SubjectCellText>{strength}</SubjectCellText>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <input
                                type="radio"
                                name={`q9_${index}`}
                                checked={answers.q9_strengthsRatings?.[strength] === 'definitely'}
                                onChange={() => handleNestedSelect('q9_strengthsRatings', strength, 'definitely')}
                                style={{ accentColor: '#1E40AF', cursor: 'pointer', width: 16, height: 16 }}
                              />
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <input
                                type="radio"
                                name={`q9_${index}`}
                                checked={answers.q9_strengthsRatings?.[strength] === 'somewhat'}
                                onChange={() => handleNestedSelect('q9_strengthsRatings', strength, 'somewhat')}
                                style={{ accentColor: '#1E40AF', cursor: 'pointer', width: 16, height: 16 }}
                              />
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <input
                                type="radio"
                                name={`q9_${index}`}
                                checked={answers.q9_strengthsRatings?.[strength] === 'not_really'}
                                onChange={() => handleNestedSelect('q9_strengthsRatings', strength, 'not_really')}
                                style={{ accentColor: '#1E40AF', cursor: 'pointer', width: 16, height: 16 }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </MarksTable>
                  </MarksTableContainer>
                </QuestionBox>

                {/* QUESTION 10 */}
                <QuestionBox>
                  <QuestionTitle>10. What is your biggest challenge when studying? (Choose up to TWO)</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Being honest here helps your counsellor give you practical tips.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'Too many distractions — phone, TV, noise — I lose focus easily' },
                      { key: 'b', text: "I don't have a good study method or plan" },
                      { key: 'c', text: 'I get very anxious before exams or fear of failing' },
                      { key: 'd', text: 'Pressure from parents or peers makes it stressful' },
                      { key: 'e', text: 'I keep postponing studying — procrastination' },
                      { key: 'f', text: 'Concepts are hard to understand — it feels like just memorising' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q10_studyChallenges?.includes(opt.key)}>
                        <input
                          type="checkbox"
                          checked={answers.q10_studyChallenges?.includes(opt.key) || false}
                          onChange={() => handleQ10ChallengeToggle(opt.key)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{opt.text}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel
                      $selected={answers.q10_studyChallenges?.includes('other')}
                      style={{ alignItems: 'center' }}
                    >
                      <input
                        type="checkbox"
                        checked={answers.q10_studyChallenges?.includes('other') || false}
                        onChange={() => handleQ10ChallengeToggle('other')}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <OptionTitle>Any Other :</OptionTitle>
                        <InlineReasonInput
                          placeholder="Specify other challenge..."
                          value={answers.q10_studyChallengesOther || ''}
                          onChange={e => {
                            setAnswers(prev => ({
                              ...prev,
                              q10_studyChallengesOther: e.target.value,
                            }));
                            if (!answers.q10_studyChallenges?.includes('other')) {
                              handleQ10ChallengeToggle('other');
                            }
                          }}
                        />
                      </div>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>
              </>
            )}

            {/* STEP 4 */}
            {currentStep === 4 && (
              <>
                {/* QUESTION 11 */}
                <QuestionBox>
                  <QuestionTitle>11. Which of these best describes you? (Choose ONE)</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    There is no better or worse option, this just helps us understand how you get your energy or how you think you are.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'Introvert — I prefer working alone and feel recharged after time by myself' },
                      { key: 'b', text: 'Extrovert — I love being around people and feel energised in groups' },
                      { key: 'c', text: 'Ambivert — I am a mix of both depending on the situation' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q11_personalityType === opt.key}>
                        <input
                          type="radio"
                          name="q11_personalityType"
                          checked={answers.q11_personalityType === opt.key}
                          onChange={() => handleSingleSelect('q11_personalityType', opt.key)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{opt.text}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                  </OptionList>
                </QuestionBox>

                {/* QUESTION 12 */}
                <QuestionBox>
                  <QuestionTitle>12. How do you usually make an important decision? (Choose the ONE that feels most like you)</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Example : Deciding which book to read, which tuition/course to take, which activity to join.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'I list out the pros and cons and weigh them carefully' },
                      { key: 'b', text: 'I go with what feels right and is also practical' },
                      { key: 'c', text: 'I ask someone I trust — a parent, teacher or friend' },
                      { key: 'd', text: 'I think about how this choice will affect my future' },
                      { key: 'e', text: 'I just try it and see what happens — I learn by doing' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q12_decisionStyle === opt.key}>
                        <input
                          type="radio"
                          name="q12_decisionStyle"
                          checked={answers.q12_decisionStyle === opt.key}
                          onChange={() => handleSingleSelect('q12_decisionStyle', opt.key)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{opt.text}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel
                      $selected={answers.q12_decisionStyle === 'other'}
                      style={{ alignItems: 'center' }}
                    >
                      <input
                        type="radio"
                        name="q12_decisionStyle"
                        checked={answers.q12_decisionStyle === 'other'}
                        onChange={() => handleSingleSelect('q12_decisionStyle', 'other')}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <OptionTitle>Any Other :</OptionTitle>
                        <InlineReasonInput
                          placeholder="Specify other decision style..."
                          value={answers.q12_decisionStyleOther || ''}
                          onChange={e => {
                            setAnswers(prev => ({
                              ...prev,
                              q12_decisionStyle: 'other',
                              q12_decisionStyleOther: e.target.value,
                            }));
                          }}
                        />
                      </div>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>

                {/* QUESTION 13 */}
                <QuestionBox>
                  <QuestionTitle>13. When you fail at something or get negative feedback, what do you usually do? (Choose ONE)</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Think of the last time you got a bad mark, lost a competition or were told you did something wrong.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'I explain or justify why it happened — it was not entirely my fault' },
                      { key: 'b', text: 'I lose confidence and feel very demotivated for a while' },
                      { key: 'c', text: 'I ignore the feedback and move on' },
                      { key: 'd', text: 'I compare myself with others and feel bad about myself' },
                      { key: 'e', text: 'I accept it, think about what went wrong and try to improve' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q13_failureResponse === opt.key}>
                        <input
                          type="radio"
                          name="q13_failureResponse"
                          checked={answers.q13_failureResponse === opt.key}
                          onChange={() => handleSingleSelect('q13_failureResponse', opt.key)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{opt.text}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel
                      $selected={answers.q13_failureResponse === 'other'}
                      style={{ alignItems: 'center' }}
                    >
                      <input
                        type="radio"
                        name="q13_failureResponse"
                        checked={answers.q13_failureResponse === 'other'}
                        onChange={() => handleSingleSelect('q13_failureResponse', 'other')}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <OptionTitle>Any Other :</OptionTitle>
                        <InlineReasonInput
                          placeholder="Specify reason..."
                          value={answers.q13_failureResponseOther || ''}
                          onChange={e => {
                            setAnswers(prev => ({
                              ...prev,
                              q13_failureResponse: 'other',
                              q13_failureResponseOther: e.target.value,
                            }));
                          }}
                        />
                      </div>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>
              </>
            )}

            {/* STEP 5 */}
            {currentStep === 5 && (
              <>
                {/* QUESTION 14 */}
                <QuestionBox>
                  <QuestionTitle>
                    14. Do you have a specific career/s in mind? If yes, write it. If no, write &apos;Still Exploring&apos;.
                  </QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    It is perfectly fine if you are not sure about your career, most students at your age are not! Just answer honestly with what you think right now. Even if you&apos;re not sure, write what comes to mind or you might have thought of.
                  </p>
                  <CustomTextInput
                    placeholder="Enter specific career/s (e.g. Software Engineer, Doctor, Architect, or 'Still Exploring')..."
                    value={answers.q14_specificCareersInput || ''}
                    onChange={e => setAnswers(prev => ({ ...prev, q14_specificCareersInput: e.target.value }))}
                  />
                </QuestionBox>

                {/* QUESTION 15 */}
                <QuestionBox>
                  <QuestionTitle>
                    15. Why are you interested in that career/s? (Choose ONE, or select &apos;Not Applicable&apos; if Q14 was &apos;Still Exploring&apos;)
                  </QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    If you have mentioned some career in the previous question, there would be something that you like about it. Just mention that.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'I genuinely love and am passionate about this field' },
                      { key: 'b', text: 'It pays well. I want financial security' },
                      { key: 'c', text: 'It is a safe, stable and respected career' },
                      { key: 'd', text: 'I want recognition or fame in this field' },
                      { key: 'e', text: 'It gives me freedom and flexibility in how I work' },
                      { key: 'f', text: 'I want to help people or make a difference in society' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q15_careerInterestReason === opt.key}>
                        <input
                          type="radio"
                          name="q15_careerInterestReason"
                          checked={answers.q15_careerInterestReason === opt.key}
                          onChange={() => handleSingleSelect('q15_careerInterestReason', opt.key)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{opt.text}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel
                      $selected={answers.q15_careerInterestReason === 'other'}
                      style={{ alignItems: 'center' }}
                    >
                      <input
                        type="radio"
                        name="q15_careerInterestReason"
                        checked={answers.q15_careerInterestReason === 'other'}
                        onChange={() => handleSingleSelect('q15_careerInterestReason', 'other')}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <OptionTitle>Any Other :</OptionTitle>
                        <InlineReasonInput
                          placeholder="Specify reason..."
                          value={answers.q15_careerInterestReasonOther || ''}
                          onChange={e => {
                            setAnswers(prev => ({
                              ...prev,
                              q15_careerInterestReason: 'other',
                              q15_careerInterestReasonOther: e.target.value,
                            }));
                          }}
                        />
                      </div>
                    </OptionLabel>
                    <OptionLabel $selected={answers.q15_careerInterestReason === 'na'}>
                      <input
                        type="radio"
                        name="q15_careerInterestReason"
                        checked={answers.q15_careerInterestReason === 'na'}
                        onChange={() => handleSingleSelect('q15_careerInterestReason', 'na')}
                      />
                      <OptionTextGroup>
                        <OptionTitle>Not Applicable</OptionTitle>
                      </OptionTextGroup>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>

                {/* QUESTION 16 */}
                <QuestionBox>
                  <QuestionTitle>
                    16. Who or what has most influenced your thinking about your career? (Choose ONE)
                  </QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    It is perfectly fine if you are told about the career. We just want to know who or what shaped your thinking.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'My parent(s)' },
                      { key: 'b', text: 'A teacher or mentor' },
                      { key: 'c', text: 'Friends or classmates' },
                      { key: 'd', text: 'A relative or family friend' },
                      { key: 'e', text: 'A book, movie or documentary I watched' },
                      { key: 'f', text: 'Social media or the internet' },
                      { key: 'g', text: 'My own thinking and self-discovery' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q16_careerInfluencer === opt.key}>
                        <input
                          type="radio"
                          name="q16_careerInfluencer"
                          checked={answers.q16_careerInfluencer === opt.key}
                          onChange={() => handleSingleSelect('q16_careerInfluencer', opt.key)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{opt.text}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel
                      $selected={answers.q16_careerInfluencer === 'other'}
                      style={{ alignItems: 'center' }}
                    >
                      <input
                        type="radio"
                        name="q16_careerInfluencer"
                        checked={answers.q16_careerInfluencer === 'other'}
                        onChange={() => handleSingleSelect('q16_careerInfluencer', 'other')}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <OptionTitle>Any Other :</OptionTitle>
                        <InlineReasonInput
                          placeholder="Specify influencer..."
                          value={answers.q16_careerInfluencerOther || ''}
                          onChange={e => {
                            setAnswers(prev => ({
                              ...prev,
                              q16_careerInfluencer: 'other',
                              q16_careerInfluencerOther: e.target.value,
                            }));
                          }}
                        />
                      </div>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>

                {/* QUESTION 17 */}
                <QuestionBox>
                  <QuestionTitle>
                    17. How well do your parents understand what you want to do after school for Class 11&amp;12? (Choose ONE)
                  </QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    It can be about your career plans or stream selection.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'Very well — they fully understand and support my direction' },
                      { key: 'b', text: 'Fairly well — they get it but have some concerns or doubts' },
                      { key: 'c', text: 'Partially — they know what I like but push me towards something else' },
                      { key: 'd', text: 'Not well — there is a big gap between what I want and what they expect' },
                      { key: 'e', text: 'We have not really discussed it yet' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q17_parentalUnderstanding === opt.key}>
                        <input
                          type="radio"
                          name="q17_parentalUnderstanding"
                          checked={answers.q17_parentalUnderstanding === opt.key}
                          onChange={() => handleSingleSelect('q17_parentalUnderstanding', opt.key)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{opt.text}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                  </OptionList>
                </QuestionBox>
              </>
            )}

            {/* STEP 6 */}
            {currentStep === 6 && (
              <>
                {/* QUESTION 18 */}
                <QuestionBox>
                  <QuestionTitle>
                    18. What are you hoping to get from this career counselling programme? (Tick all that apply)
                  </QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Look at this as a conversation with your best friend and hence choose an answer so that the discussion is meaningful.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'Help in choosing the right stream (Science / Commerce / Humanities)' },
                      { key: 'b', text: 'Clarity on what career to aim for and a roadmap to get there' },
                      { key: 'c', text: 'More confidence in myself and my choices' },
                      { key: 'd', text: 'A better understanding of my own personality and strengths' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q18_programmeHopes?.includes(opt.key)}>
                        <input
                          type="checkbox"
                          checked={answers.q18_programmeHopes?.includes(opt.key) || false}
                          onChange={() => handleMultiSelectToggle('q18_programmeHopes', opt.key)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{opt.text}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel
                      $selected={answers.q18_programmeHopes?.includes('other')}
                      style={{ alignItems: 'center' }}
                    >
                      <input
                        type="checkbox"
                        checked={answers.q18_programmeHopes?.includes('other') || false}
                        onChange={() => handleMultiSelectToggle('q18_programmeHopes', 'other')}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <OptionTitle>Any Other :</OptionTitle>
                        <InlineReasonInput
                          placeholder="Specify what you are hoping to get..."
                          value={answers.q18_programmeHopesOther || ''}
                          onChange={e => {
                            setAnswers(prev => ({
                              ...prev,
                              q18_programmeHopesOther: e.target.value,
                            }));
                            if (!answers.q18_programmeHopes?.includes('other')) {
                              handleMultiSelectToggle('q18_programmeHopes', 'other');
                            }
                          }}
                        />
                      </div>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>

                {/* QUESTION 19 */}
                <QuestionBox>
                  <QuestionTitle>
                    19. Is there anything specific you want your counsellor to know before your session? (optional)
                  </QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    This could be a worry, a dream, a difficulty, or something about your situation at home or school. This is confidential and will only be used to make the session more useful.
                  </p>
                  <CustomTextInput
                    placeholder="Write anything specific you'd like your counsellor to know before your session..."
                    value={answers.q19_counsellorNotesInput || ''}
                    onChange={e => setAnswers(prev => ({ ...prev, q19_counsellorNotesInput: e.target.value }))}
                  />
                </QuestionBox>
              </>
            )}
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
        title="Thank you for completing your Student Pre-Counselling Form!"
        message="Your responses will be thoroughly analyzed by your senior career counsellor before your 1-on-1 video session."
        confirmText="Go to Student Portal"
        onConfirm={handleConfirmCompletion}
      />
    </FormPageContainer>
  );
};

export default PreCounsellingFormPage;
