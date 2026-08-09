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
  QuestionSubtext,
  OptionList,
  OptionLabel,
  OptionTextGroup,
  OptionTitle,
  CustomTextInput,
  DataTableWrapper,
  StyledTable,
  TableInput,
  ToggleButton,
  MatrixGrid,
  MatrixRowCard,
  MatrixRowText,
  MatrixOptionsGroup,
  OptionScoreBadge,
  OptionText,
  WizardFooterNav,
  ClosingNoteCard,
} from './PreCounsellingFormPage.styles';

// 17 Strengths for Q9
const STRENGTH_ITEMS = [
  'Speaking or presenting in front of others',
  'Writing clearly and creatively',
  'Drawing, designing, or visual arts',
  'Solving logical and mathematical puzzles',
  'Working effectively in teams',
  'Organizing events, schedules, or groups',
  'Helping others solve personal or academic problems',
  'Analyzing data, statistics, or charts',
  'Building, repairing, or crafting physical objects',
  'Remembering facts, dates, and information quickly',
  'Creative thinking and generating new ideas',
  'Time management and planning ahead',
  'Public speaking and debating',
  'Technical and digital skills (coding, tech tools)',
  'Leadership and motivating others',
  'Problem-solving under pressure',
  'Taking initiative without being told what to do',
];

export const PreCounsellingFormPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isFormStarted, setIsFormStarted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 6;

  // Focus ref for custom text inputs
  const customInputRef = useRef<HTMLInputElement>(null);
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
    q1_academicStanding?: string;
    q1_academicStandingOther?: string;
    q2_favoriteSubjects?: string[];
    q2_favoriteSubjectsOther?: string;
    q3_leastFavoriteSubjects?: string[];
    q3_leastFavoriteSubjectsOther?: string;
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
    q4_streamChoices: {},
    q8_workActivityRatings: {},
    q12_studyHabitRatings: {},
    q13_coCurricularEntries: [
      { activity: '', role: '', years: '' },
      { activity: '', role: '', years: '' },
    ],
  });

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

  const handleNestedSelect = (groupKey: 'q4_streamChoices' | 'q8_workActivityRatings' | 'q12_studyHabitRatings', itemKey: string, val: string) => {
    setAnswers(prev => ({
      ...prev,
      [groupKey]: {
        ...(prev[groupKey] || {}),
        [itemKey]: val,
      },
    }));
  };

  const handleTableInputChange = (index: number, field: 'activity' | 'role' | 'years', value: string) => {
    setAnswers(prev => {
      const entries = [...(prev.q13_coCurricularEntries || [])];
      entries[index] = { ...entries[index], [field]: value };
      return { ...prev, q13_coCurricularEntries: entries };
    });
  };

  const handleAddTableRow = () => {
    setAnswers(prev => ({
      ...prev,
      q13_coCurricularEntries: [
        ...(prev.q13_coCurricularEntries || []),
        { activity: '', role: '', years: '' },
      ],
    }));
  };

  const handleSubmitForm = () => {
    localStorage.setItem('pwc_precounselling_submitted', 'true');
    localStorage.setItem('pwc_student_precounseling_form_submitted', 'true');
    toast.success(
      'Pre-Counselling Form Submitted!',
      'Thank you for completing the form. Your counsellor will review your responses before Session 1.'
    );
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
                {currentStep === 1 && 'SECTION 1 — ACADEMIC SUBJECT PREFERENCES (Q1 to Q3)'}
                {currentStep === 2 && 'SECTION 2 — STREAM & CAREER EXPLORATION (Q4 to Q7)'}
                {currentStep === 3 && 'SECTION 3 — WORK ACTIVITIES & STRENGTHS (Q8 to Q10)'}
                {currentStep === 4 && 'SECTION 4 — STUDY HABITS & LEARNING STYLE (Q11 & Q12)'}
                {currentStep === 5 && 'SECTION 5 — CO-CURRICULAR & PERSONALITY (Q13 & Q14)'}
                {currentStep === 6 && 'SECTION 6 — COUNSELLING GOALS & FINAL QUESTIONS (Q15 & Q16)'}
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
                <QuestionBox>
                  <QuestionTitle>Q1. Which statement best describes your overall academic standing?</QuestionTitle>
                  <OptionList>
                    {[
                      'Top performer — consistently among the highest scorers in class',
                      'Above average — perform well across most subjects with good grades',
                      'Average — maintain steady passing grades with occasional highlights',
                      'Struggling in a few key subjects — need targeted academic support',
                    ].map(opt => (
                      <OptionLabel key={opt} $selected={answers.q1_academicStanding === opt}>
                        <input
                          type="radio"
                          name="q1"
                          checked={answers.q1_academicStanding === opt}
                          onChange={() => handleSingleSelect('q1_academicStanding', opt)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{opt}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel $selected={answers.q1_academicStanding === 'other'}>
                      <input
                        type="radio"
                        name="q1"
                        checked={answers.q1_academicStanding === 'other'}
                        onChange={() => {
                          handleSingleSelect('q1_academicStanding', 'other');
                          setTimeout(() => customInputRef.current?.focus(), 50);
                        }}
                      />
                      <OptionTextGroup style={{ width: '100%' }}>
                        <OptionTitle>Other (Specify)</OptionTitle>
                        {answers.q1_academicStanding === 'other' && (
                          <CustomTextInput
                            ref={customInputRef}
                            placeholder="Please specify your academic standing..."
                            value={answers.q1_academicStandingOther || ''}
                            onChange={e => setAnswers(prev => ({ ...prev, q1_academicStandingOther: e.target.value }))}
                          />
                        )}
                      </OptionTextGroup>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>

                <QuestionBox>
                  <QuestionTitle>Q2. Which subjects do you genuinely ENJOY studying the most? (Select up to 3)</QuestionTitle>
                  <OptionList>
                    {[
                      'Mathematics',
                      'Physics',
                      'Chemistry',
                      'Biology / Life Sciences',
                      'Computer Science / IT',
                      'English Literature / Languages',
                      'Social Sciences (History, Geography, Civics)',
                      'Economics / Commerce / Business Studies',
                      'Visual Arts / Design / Performing Arts',
                    ].map(subj => (
                      <OptionLabel key={subj} $selected={answers.q2_favoriteSubjects?.includes(subj)}>
                        <input
                          type="checkbox"
                          checked={answers.q2_favoriteSubjects?.includes(subj) || false}
                          onChange={() => handleMultiSelectToggle('q2_favoriteSubjects', subj)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{subj}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel $selected={answers.q2_favoriteSubjects?.includes('other')}>
                      <input
                        type="checkbox"
                        checked={answers.q2_favoriteSubjects?.includes('other') || false}
                        onChange={() => handleMultiSelectToggle('q2_favoriteSubjects', 'other')}
                      />
                      <OptionTextGroup style={{ width: '100%' }}>
                        <OptionTitle>Other Subject (Specify)</OptionTitle>
                        {answers.q2_favoriteSubjects?.includes('other') && (
                          <CustomTextInput
                            placeholder="Enter other favorite subject..."
                            value={answers.q2_favoriteSubjectsOther || ''}
                            onChange={e => setAnswers(prev => ({ ...prev, q2_favoriteSubjectsOther: e.target.value }))}
                          />
                        )}
                      </OptionTextGroup>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>

                <QuestionBox>
                  <QuestionTitle>Q3. Which subjects do you find MOST CHALLENGING or least interesting? (Select up to 3)</QuestionTitle>
                  <OptionList>
                    {[
                      'Mathematics',
                      'Physics',
                      'Chemistry',
                      'Biology / Life Sciences',
                      'Computer Science / IT',
                      'English Literature / Languages',
                      'Social Sciences (History, Geography, Civics)',
                      'Economics / Commerce / Business Studies',
                      'Visual Arts / Design / Performing Arts',
                    ].map(subj => (
                      <OptionLabel key={subj} $selected={answers.q3_leastFavoriteSubjects?.includes(subj)}>
                        <input
                          type="checkbox"
                          checked={answers.q3_leastFavoriteSubjects?.includes(subj) || false}
                          onChange={() => handleMultiSelectToggle('q3_leastFavoriteSubjects', subj)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{subj}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                  </OptionList>
                </QuestionBox>
              </>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <>
                <QuestionBox>
                  <QuestionTitle>Q4. Rank your preference for Class 11 & 12 Academic Streams:</QuestionTitle>
                  <QuestionSubtext>Rate your interest level for each stream option below.</QuestionSubtext>
                  <MatrixGrid>
                    {[
                      { key: 'pcm', title: 'Science (PCM) — Physics, Chemistry, Mathematics' },
                      { key: 'pcb', title: 'Science (PCB) — Physics, Chemistry, Biology' },
                      { key: 'pcmb', title: 'Science (PCMB) — Physics, Chemistry, Mathematics, Biology' },
                      { key: 'commerce_math', title: 'Commerce with Mathematics' },
                      { key: 'commerce_no_math', title: 'Commerce without Mathematics' },
                      { key: 'humanities', title: 'Humanities / Arts' },
                    ].map(stream => (
                      <MatrixRowCard key={stream.key}>
                        <MatrixRowText>{stream.title}</MatrixRowText>
                        <MatrixOptionsGroup>
                          {['High Interest', 'Moderate', 'Low', 'Not Interested'].map((opt, index) => (
                            <ToggleButton
                              key={opt}
                              type="button"
                              $active={answers.q4_streamChoices?.[stream.key] === opt}
                              onClick={() => handleNestedSelect('q4_streamChoices', stream.key, opt)}
                            >
                              <OptionScoreBadge $active={answers.q4_streamChoices?.[stream.key] === opt}>{index + 1}</OptionScoreBadge>
                              <OptionText>{opt}</OptionText>
                            </ToggleButton>
                          ))}
                        </MatrixOptionsGroup>
                      </MatrixRowCard>
                    ))}
                  </MatrixGrid>
                </QuestionBox>

                <QuestionBox>
                  <QuestionTitle>Q5. How confident do you feel about your stream choice for Class 11?</QuestionTitle>
                  <OptionList>
                    {[
                      'Very Confident — I know exactly which stream I want and why',
                      'Somewhat Confident — I have a primary choice but want to validate it',
                      'Confused / Undecided — I am torn between two or more streams',
                      'Completely Unsure — I need complete guidance from ground up',
                    ].map(conf => (
                      <OptionLabel key={conf} $selected={answers.q5_streamConfidence === conf}>
                        <input
                          type="radio"
                          name="q5"
                          checked={answers.q5_streamConfidence === conf}
                          onChange={() => handleSingleSelect('q5_streamConfidence', conf)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{conf}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                  </OptionList>
                </QuestionBox>

                <QuestionBox>
                  <QuestionTitle>Q6. Which Career Clusters interest you the most? (Select up to 3)</QuestionTitle>
                  <OptionList>
                    {[
                      'Engineering, Technology & AI',
                      'Medicine, Healthcare & Biotechnology',
                      'Business, Finance & Entrepreneurship',
                      'Law, Public Policy & Civil Services',
                      'Design, Architecture & Fine Arts',
                      'Media, Journalism & Communications',
                      'Aviation, Defense & Logistics',
                      'Pure Sciences, Research & Astronomy',
                      'Psychology, Humanities & Social Work',
                    ].map(cluster => (
                      <OptionLabel key={cluster} $selected={answers.q6_careerClusterPicks?.includes(cluster)}>
                        <input
                          type="checkbox"
                          checked={answers.q6_careerClusterPicks?.includes(cluster) || false}
                          onChange={() => handleMultiSelectToggle('q6_careerClusterPicks', cluster)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{cluster}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                  </OptionList>
                </QuestionBox>

                <QuestionBox>
                  <QuestionTitle>Q7. Do you have any specific dream careers or professions in mind?</QuestionTitle>
                  <QuestionSubtext>Write any specific roles or occupations you currently aspire to pursue (e.g. Aeronautical Engineer, Neurosurgeon, Corporate Lawyer, Graphic Designer).</QuestionSubtext>
                  <CustomTextInput
                    placeholder="Enter your dream careers or professions (or write 'Still Exploring')..."
                    value={answers.q7_dreamCareersInput || ''}
                    onChange={e => setAnswers(prev => ({ ...prev, q7_dreamCareersInput: e.target.value }))}
                  />
                </QuestionBox>
              </>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <>
                <QuestionBox>
                  <QuestionTitle>Q8. Rate your enjoyment for the following work activities:</QuestionTitle>
                  <MatrixGrid>
                    {[
                      { key: 'act1', title: 'Solving complex mathematical or logical problems' },
                      { key: 'act2', title: 'Designing graphics, UI, or artistic visuals' },
                      { key: 'act3', title: 'Leading team discussions and pitching business ideas' },
                      { key: 'act4', title: 'Conducting scientific experiments in laboratories' },
                      { key: 'act5', title: 'Writing essays, reports, or creative stories' },
                      { key: 'act6', title: 'Helping individuals navigate personal or social challenges' },
                    ].map(item => (
                      <MatrixRowCard key={item.key}>
                        <MatrixRowText>{item.title}</MatrixRowText>
                        <MatrixOptionsGroup>
                          {['Love It', 'Like It', 'Neutral', 'Dislike'].map((opt, index) => (
                            <ToggleButton
                              key={opt}
                              type="button"
                              $active={answers.q8_workActivityRatings?.[item.key] === opt}
                              onClick={() => handleNestedSelect('q8_workActivityRatings', item.key, opt)}
                            >
                              <OptionScoreBadge $active={answers.q8_workActivityRatings?.[item.key] === opt}>{index + 1}</OptionScoreBadge>
                              <OptionText>{opt}</OptionText>
                            </ToggleButton>
                          ))}
                        </MatrixOptionsGroup>
                      </MatrixRowCard>
                    ))}
                  </MatrixGrid>
                </QuestionBox>

                <QuestionBox>
                  <QuestionTitle>Q9. Select your TOP STRENGTHS & SKILLS (Select up to 5 items from the list below):</QuestionTitle>
                  <OptionList style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {STRENGTH_ITEMS.map(str => (
                      <OptionLabel key={str} $selected={answers.q9_strengthSelections?.includes(str)}>
                        <input
                          type="checkbox"
                          checked={answers.q9_strengthSelections?.includes(str) || false}
                          onChange={() => handleMultiSelectToggle('q9_strengthSelections', str)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{str}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                  </OptionList>
                </QuestionBox>

                <QuestionBox>
                  <QuestionTitle>Q10. In your own words, what are your 3 biggest personal strengths?</QuestionTitle>
                  <CustomTextInput
                    placeholder="Describe your top 3 personal strengths..."
                    value={answers.q10_top3StrengthsInput || ''}
                    onChange={e => setAnswers(prev => ({ ...prev, q10_top3StrengthsInput: e.target.value }))}
                  />
                </QuestionBox>
              </>
            )}

            {/* STEP 4 */}
            {currentStep === 4 && (
              <>
                <QuestionBox>
                  <QuestionTitle>Q11. What areas would you like to improve or develop further?</QuestionTitle>
                  <CustomTextInput
                    placeholder="Describe areas you want to improve (e.g. time management, exam anxiety, focus)..."
                    value={answers.q11_growthAreasInput || ''}
                    onChange={e => setAnswers(prev => ({ ...prev, q11_growthAreasInput: e.target.value }))}
                  />
                </QuestionBox>

                <QuestionBox>
                  <QuestionTitle>Q12. Rate your agreement with the following study habit statements:</QuestionTitle>
                  <MatrixGrid>
                    {[
                      { key: 'h1', title: 'I follow a daily study schedule consistently' },
                      { key: 'h2', title: 'I prefer understanding underlying concepts over rote memorization' },
                      { key: 'h3', title: 'I tend to procrastinate on challenging assignments' },
                      { key: 'h4', title: 'I revise study material regularly before exam dates' },
                    ].map(habit => (
                      <MatrixRowCard key={habit.key}>
                        <MatrixRowText>{habit.title}</MatrixRowText>
                        <MatrixOptionsGroup>
                          {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((opt, index) => (
                            <ToggleButton
                              key={opt}
                              type="button"
                              $active={answers.q12_studyHabitRatings?.[habit.key] === opt}
                              onClick={() => handleNestedSelect('q12_studyHabitRatings', habit.key, opt)}
                            >
                              <OptionScoreBadge $active={answers.q12_studyHabitRatings?.[habit.key] === opt}>{index + 1}</OptionScoreBadge>
                              <OptionText>{opt}</OptionText>
                            </ToggleButton>
                          ))}
                        </MatrixOptionsGroup>
                      </MatrixRowCard>
                    ))}
                  </MatrixGrid>
                </QuestionBox>
              </>
            )}

            {/* STEP 5 */}
            {currentStep === 5 && (
              <>
                <QuestionBox>
                  <QuestionTitle>Q13. List your key Co-Curricular & Extracurricular Activities:</QuestionTitle>
                  <DataTableWrapper>
                    <StyledTable>
                      <thead>
                        <tr>
                          <th>Activity / Sport / Club</th>
                          <th>Role / Achievement / Level</th>
                          <th>Years Involved</th>
                        </tr>
                      </thead>
                      <tbody>
                        {answers.q13_coCurricularEntries?.map((entry, idx) => (
                          <tr key={idx}>
                            <td>
                              <TableInput
                                placeholder="e.g. School Basketball Team, Robotics Club"
                                value={entry.activity}
                                onChange={e => handleTableInputChange(idx, 'activity', e.target.value)}
                              />
                            </td>
                            <td>
                              <TableInput
                                placeholder="e.g. Captain / District Level Winner"
                                value={entry.role}
                                onChange={e => handleTableInputChange(idx, 'role', e.target.value)}
                              />
                            </td>
                            <td>
                              <TableInput
                                placeholder="e.g. 2 Years"
                                value={entry.years}
                                onChange={e => handleTableInputChange(idx, 'years', e.target.value)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </StyledTable>
                  </DataTableWrapper>
                  <Button type="button" variant="secondary" size="sm" onClick={handleAddTableRow} style={{ alignSelf: 'flex-start' }}>
                    + Add Another Activity Row
                  </Button>
                </QuestionBox>

                <QuestionBox>
                  <QuestionTitle>Q14. How do you spend your free time outside academics? (Select all that apply)</QuestionTitle>
                  <OptionList>
                    {[
                      'Reading books, novels, or articles',
                      'Gaming, esports, or digital puzzle solving',
                      'Playing sports, fitness, or outdoor activities',
                      'Listening to music, playing instruments, or singing',
                      'Coding, website building, or exploring new tech tools',
                      'Volunteering, social service, or community work',
                    ].map(act => (
                      <OptionLabel key={act} $selected={answers.q14_freetimeActivities?.includes(act)}>
                        <input
                          type="checkbox"
                          checked={answers.q14_freetimeActivities?.includes(act) || false}
                          onChange={() => handleMultiSelectToggle('q14_freetimeActivities', act)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{act}</OptionTitle>
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
                <QuestionBox>
                  <QuestionTitle>Q15. What are your primary goals for this Career Counselling Session? (Select up to 3)</QuestionTitle>
                  <OptionList>
                    {[
                      'Clear guidance on selecting Class 11 & 12 Academic Stream',
                      'Understanding specific career options suitable for my profile',
                      'Learning about competitive entrance exams and preparation timelines',
                      'Identifying my core strengths, interests, and potential skill gaps',
                      'Creating an actionable step-by-step academic & career roadmap',
                    ].map(goal => (
                      <OptionLabel key={goal} $selected={answers.q15_counsellingGoals?.includes(goal)}>
                        <input
                          type="checkbox"
                          checked={answers.q15_counsellingGoals?.includes(goal) || false}
                          onChange={() => handleMultiSelectToggle('q15_counsellingGoals', goal)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{goal}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                  </OptionList>
                </QuestionBox>

                <QuestionBox>
                  <QuestionTitle>Q16. Do you have any specific questions or concerns for your senior career counsellor?</QuestionTitle>
                  <QuestionSubtext>Write any specific questions you would like addressed during your 1-on-1 video call session.</QuestionSubtext>
                  <CustomTextInput
                    placeholder="Enter any specific questions or topics for your counsellor..."
                    value={answers.q16_specificQuestionsInput || ''}
                    onChange={e => setAnswers(prev => ({ ...prev, q16_specificQuestionsInput: e.target.value }))}
                  />
                </QuestionBox>

                <ClosingNoteCard>
                  <strong>Thank you for completing your Student Pre-Counselling Form!</strong>
                  <span>Your responses will be thoroughly analyzed by your senior career counsellor before your 1-on-1 video session. Click &apos;Submit Form&apos; below to finish.</span>
                </ClosingNoteCard>
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
    </FormPageContainer>
  );
};

export default PreCounsellingFormPage;
