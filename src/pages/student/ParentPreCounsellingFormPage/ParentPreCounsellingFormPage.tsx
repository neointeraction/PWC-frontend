import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from 'react-icons/ri';
import { Button } from '@/components/Button';
import { SuccessModal } from '@/components';
import { ROUTES } from '@/constants';
import {
  FormPageContainer,
  HeroHeaderCard,
  DocumentHeaderRow,
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
  InlineOptionTextGroup,
  OptionTitle,
  CustomTextInput,
  WizardFooterNav,
  MarksTableContainer,
  MarksTable,
  InlineLabelRow,
  ReasonLabel,
} from '../PreCounsellingFormPage/PreCounsellingFormPage.styles';

/* ──────────────────────────────────────────────
   STRENGTHS TABLE DATA
   ────────────────────────────────────────────── */
const STRENGTHS_LIST = [
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
];

const STRENGTHS_COLUMNS = ['Clearly See This', 'Sometimes', 'Rarely / Never', 'Not Sure'];

/* ──────────────────────────────────────────────
   ANSWER STATE INTERFACE
   ────────────────────────────────────────────── */
interface ParentFormAnswers {
  [key: string]: string | string[] | Record<string, string> | undefined;
}

export const ParentPreCounsellingFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [isFormStarted, setIsFormStarted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 5;

  const topRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    setTimeout(() => {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const [answers, setAnswers] = useState<ParentFormAnswers>({});
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

  const handleSingleSelect = (field: string, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field: string, value: string) => {
    setAnswers(prev => {
      const current = (prev[field] as string[]) || [];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(v => v !== value) };
      }
      return { ...prev, [field]: [...current, value] };
    });
  };

  const handleStrengthSelect = (strength: string, column: string) => {
    setAnswers(prev => {
      const strengthsMap = (prev.q3_strengths as Record<string, string>) || {};
      return { ...prev, q3_strengths: { ...strengthsMap, [strength]: column } };
    });
  };

  const goNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      scrollToTop();
    }
  };

  const goPrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      scrollToTop();
    }
  };

  const handleSubmitForm = () => {
    localStorage.setItem('pwc_parent_pre_counselling_submitted', 'true');
    setIsCompletionModalOpen(true);
  };

  const handleConfirmCompletion = useCallback(() => {
    setIsCompletionModalOpen(false);
    navigate(ROUTES.LOGIN);
  }, [navigate]);

  const progressPercent = Math.round((currentStep / totalSteps) * 100);

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
                <StatNumber $color="#1E40AF">22</StatNumber>
                <StatLabel>Questions</StatLabel>
              </StatInfoBox>
            </StatBlock>

            <StatBlock $gradient="linear-gradient(135deg, #F8FAFC 0%, #FAF5FF 100%)" $borderColor="#E9D5FF">
              <StatIconBox $bg="#F3E8FF" $color="#6B21A8">
                <RiGridLine size={24} />
              </StatIconBox>
              <StatInfoBox>
                <StatNumber $color="#6B21A8">5</StatNumber>
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
        /* WIZARD VIEW */
        <WizardContainer>
          <WizardProgressHeader>
            <WizardStepInfoRow>
              <span>
                {currentStep === 1 && 'HOW I SEE MY CHILD\'S ACADEMIC STRENGTHS'}
                {currentStep === 2 && 'MY CHILD\'S INTERESTS & FREE TIME'}
                {currentStep === 3 && 'MY CHILD\'S PERSONALITY'}
                {currentStep === 4 && 'CAREER DIRECTION & EXPECTATIONS'}
                {currentStep === 5 && 'WHAT YOU EXPECT FROM THIS PROGRAMME'}
              </span>
              <span>Step {currentStep} of {totalSteps} ({progressPercent}%)</span>
            </WizardStepInfoRow>

            <ProgressTrack>
              <ProgressBar $percent={progressPercent} />
            </ProgressTrack>
          </WizardProgressHeader>

          <WizardStepBody>
            {/* ═══════════════════════════════════════════
                STEP 1: HOW I SEE MY CHILD'S ACADEMIC STRENGTHS (Q1–Q3)
               ═══════════════════════════════════════════ */}
            {currentStep === 1 && (
              <>
                {/* Q1 */}
                <QuestionBox>
                  <QuestionTitle>1. Which subjects do you consider your child genuinely strong in?</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Strong means they understand it well, perform consistently, or show real interest in that subject (not based on scores).
                  </p>

                  <InlineLabelRow>
                    <label htmlFor="q1_strongSubject">Strong Subject :</label>
                    <CustomTextInput
                      id="q1_strongSubject"
                      placeholder="Enter subject name..."
                      style={{ flex: 1, minWidth: 260 }}
                      value={(answers.q1_strongSubject as string) || ''}
                      onChange={e => setAnswers(prev => ({ ...prev, q1_strongSubject: e.target.value }))}
                    />
                  </InlineLabelRow>

                  <ReasonLabel>I believe my child enjoys this subject because :</ReasonLabel>
                  <OptionList>
                    {[
                      { key: 'a', text: 'My child love solving problems and puzzles in this subject' },
                      { key: 'b', text: 'It allows my child to be creative and come up with new ideas' },
                      { key: 'c', text: 'It connects to real life, my child can see how it is actually used' },
                      { key: 'd', text: 'It just feels easy and natural to my child who simply enjoys it' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q1_enjoyReason === opt.key}>
                        <input
                          type="radio"
                          name="q1_enjoyReason"
                          checked={answers.q1_enjoyReason === opt.key}
                          onChange={() => handleSingleSelect('q1_enjoyReason', opt.key)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{opt.text}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel $selected={answers.q1_enjoyReason === 'other'}>
                      <input
                        type="radio"
                        name="q1_enjoyReason"
                        checked={answers.q1_enjoyReason === 'other'}
                        onChange={() => handleSingleSelect('q1_enjoyReason', 'other')}
                      />
                      <InlineOptionTextGroup>
                        <OptionTitle>Any Other Reason :</OptionTitle>
                        <CustomTextInput
                          placeholder="Please specify..."
                          value={(answers.q1_enjoyOther as string) || ''}
                          onChange={e => setAnswers(prev => ({ ...prev, q1_enjoyOther: e.target.value }))}
                        />
                      </InlineOptionTextGroup>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>

                {/* Q2 */}
                <QuestionBox>
                  <QuestionTitle>2. Which subjects do you feel your child struggles with the most?</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Difficulty does not mean your child is bad at it (not based on scores), it just means your child enjoy the least or do not enjoy at all.
                  </p>

                  <InlineLabelRow>
                    <label htmlFor="q2_strugglingSubject">Struggling Subject :</label>
                    <CustomTextInput
                      id="q2_strugglingSubject"
                      placeholder="Enter subject name..."
                      style={{ flex: 1, minWidth: 260 }}
                      value={(answers.q2_strugglingSubject as string) || ''}
                      onChange={e => setAnswers(prev => ({ ...prev, q2_strugglingSubject: e.target.value }))}
                    />
                  </InlineLabelRow>

                  <ReasonLabel>It is difficult because :</ReasonLabel>
                  <OptionList>
                    {[
                      { key: 'a', text: 'My child don\'t understand the concepts, it feels like just memorising' },
                      { key: 'b', text: 'My child get anxious during exams or tests for this subject' },
                      { key: 'c', text: 'The way it is taught is too theoretical and boring' },
                      { key: 'd', text: 'My child is simply not interested in this topic' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q2_difficultReason === opt.key}>
                        <input
                          type="radio"
                          name="q2_difficultReason"
                          checked={answers.q2_difficultReason === opt.key}
                          onChange={() => handleSingleSelect('q2_difficultReason', opt.key)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{opt.text}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel $selected={answers.q2_difficultReason === 'other'}>
                      <input
                        type="radio"
                        name="q2_difficultReason"
                        checked={answers.q2_difficultReason === 'other'}
                        onChange={() => handleSingleSelect('q2_difficultReason', 'other')}
                      />
                      <InlineOptionTextGroup>
                        <OptionTitle>Any Other Reason :</OptionTitle>
                        <CustomTextInput
                          placeholder="Please specify..."
                          value={(answers.q2_difficultOther as string) || ''}
                          onChange={e => setAnswers(prev => ({ ...prev, q2_difficultOther: e.target.value }))}
                        />
                      </InlineOptionTextGroup>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>

                {/* Q3 — Strengths Table */}
                <QuestionBox>
                  <QuestionTitle>3. Read each strength below. Tick what you clearly observe, sometimes notice, or rarely see in your child.</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    As a parent, you observe your child in situations that others don&apos;t see. Your observations here are very valuable. Please tick based on what you have genuinely seen not what you hope for.
                  </p>

                  <MarksTableContainer>
                    <MarksTable>
                      <thead>
                        <tr>
                          <th style={{ width: '34%', textAlign: 'left' }}>Strength / Ability / Quality</th>
                          {STRENGTHS_COLUMNS.map(col => (
                            <th key={col} style={{ width: '16.5%', textAlign: 'center', fontSize: '12px' }}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {STRENGTHS_LIST.map(strength => {
                          const strengthsMap = (answers.q3_strengths as Record<string, string>) || {};
                          return (
                            <tr key={strength}>
                              <td style={{ fontSize: '13px', color: '#334155' }}>{strength}</td>
                              {STRENGTHS_COLUMNS.map(col => (
                                <td key={col} style={{ textAlign: 'center' }}>
                                  <input
                                    type="radio"
                                    name={`strength_${strength}`}
                                    checked={strengthsMap[strength] === col}
                                    onChange={() => handleStrengthSelect(strength, col)}
                                    style={{ cursor: 'pointer', width: 16, height: 16 }}
                                  />
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </MarksTable>
                  </MarksTableContainer>
                </QuestionBox>
              </>
            )}

            {/* ═══════════════════════════════════════════
                STEP 2: MY CHILD'S INTERESTS & FREE TIME (Q4–Q6)
               ═══════════════════════════════════════════ */}
            {currentStep === 2 && (
              <>
                {/* Q4 */}
                <QuestionBox>
                  <QuestionTitle>4. What does your child enjoy doing most in their free time? (Tick all that apply)</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Free time includes evenings, weekends, school holidays, any time that is not class or homework time.
                  </p>

                  <OptionList>
                    {[
                      { key: 'sports', text: 'Sports or physical activities' },
                      { key: 'gaming', text: 'Gaming — mobile, PC or console' },
                      { key: 'creative', text: 'Creative hobbies — drawing, music, writing, crafts, etc' },
                      { key: 'socialising', text: 'Socialising with friends or on social media' },
                      { key: 'skills', text: 'Skill-building activities — coding, video editing, public speaking, etc' },
                      { key: 'reading', text: 'Reading — books, articles, news, etc' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={((answers.q4_freeTime as string[]) || []).includes(opt.key)}>
                        <input
                          type="checkbox"
                          checked={((answers.q4_freeTime as string[]) || []).includes(opt.key)}
                          onChange={() => handleMultiSelect('q4_freeTime', opt.key)}
                        />
                        <OptionTextGroup>
                          <OptionTitle>{opt.text}</OptionTitle>
                        </OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel $selected={((answers.q4_freeTime as string[]) || []).includes('other')}>
                      <input
                        type="checkbox"
                        checked={((answers.q4_freeTime as string[]) || []).includes('other')}
                        onChange={() => handleMultiSelect('q4_freeTime', 'other')}
                      />
                      <InlineOptionTextGroup>
                        <OptionTitle>Any Other :</OptionTitle>
                        <CustomTextInput
                          placeholder="Please specify..."
                          value={(answers.q4_freeTimeOther as string) || ''}
                          onChange={e => setAnswers(prev => ({ ...prev, q4_freeTimeOther: e.target.value }))}
                        />
                      </InlineOptionTextGroup>
                    </OptionLabel>
                    <OptionLabel $selected={((answers.q4_freeTime as string[]) || []).includes('notSure')}>
                      <input
                        type="checkbox"
                        checked={((answers.q4_freeTime as string[]) || []).includes('notSure')}
                        onChange={() => handleMultiSelect('q4_freeTime', 'notSure')}
                      />
                      <OptionTextGroup>
                        <OptionTitle>Not Sure</OptionTitle>
                      </OptionTextGroup>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>

                {/* Q5 */}
                <QuestionBox>
                  <QuestionTitle>5. Have you noticed any one special talent or unique ability in your child?</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    This could be anything a way of thinking, a skill, a habit, or something others have also noticed or commented on.
                  </p>
                  <CustomTextInput
                    placeholder="Write your observation here..."
                    style={{ width: '100%' }}
                    value={(answers.q5_specialTalent as string) || ''}
                    onChange={e => setAnswers(prev => ({ ...prev, q5_specialTalent: e.target.value }))}
                  />
                </QuestionBox>

                {/* Q6 */}
                <QuestionBox>
                  <QuestionTitle>6. How consistent are your child&apos;s interests over time?</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Even casual things like watching YouTube or playing with pets count as interests / hobbies.
                  </p>

                  <OptionList>
                    {[
                      { key: 'very', text: 'Very consistent — the same interests have continued for a long time' },
                      { key: 'mostly', text: 'Mostly consistent — with some natural variation' },
                      { key: 'frequently', text: 'Frequently changing — new interests appear often and old ones fade quickly' },
                      { key: 'notSure', text: 'Not Sure' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q6_consistency === opt.key}>
                        <input
                          type="radio"
                          name="q6_consistency"
                          checked={answers.q6_consistency === opt.key}
                          onChange={() => handleSingleSelect('q6_consistency', opt.key)}
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

            {/* ═══════════════════════════════════════════
                STEP 3: MY CHILD'S PERSONALITY (Q7–Q11)
               ═══════════════════════════════════════════ */}
            {currentStep === 3 && (
              <>
                {/* Q7 */}
                <QuestionBox>
                  <QuestionTitle>7. Which of these best describes your child&apos;s general personality? (Choose ONE)</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    This just helps us understand how your child gets his energy.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'Confident and a natural leader — takes charge in situations' },
                      { key: 'b', text: 'Reserved and reflective — prefers to observe before acting' },
                      { key: 'c', text: 'Social and outgoing — energised by people and interactions' },
                      { key: 'd', text: 'Independent — prefers working alone and self-directed' },
                      { key: 'e', text: 'Practical and hands-on — prefers doing over discussing' },
                      { key: 'f', text: 'Creative and imaginative — always thinking of new things' },
                      { key: 'g', text: 'Not Sure' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q7_personality === opt.key}>
                        <input type="radio" name="q7_personality" checked={answers.q7_personality === opt.key} onChange={() => handleSingleSelect('q7_personality', opt.key)} />
                        <OptionTextGroup><OptionTitle>{opt.text}</OptionTitle></OptionTextGroup>
                      </OptionLabel>
                    ))}
                  </OptionList>
                </QuestionBox>

                {/* Q8 */}
                <QuestionBox>
                  <QuestionTitle>8. How does your child generally interact with others — friends, classmates, teachers?</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    This simply helps us understand how your child relates to people around them.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'Collaborative and friendly, gets along with most people easily' },
                      { key: 'b', text: 'Reserved or formal, keeps appropriate distance with teachers and seniors' },
                      { key: 'c', text: 'Easily influenced by peer pressure — tends to follow the group' },
                      { key: 'd', text: 'More confident online than in person' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q8_interaction === opt.key}>
                        <input type="radio" name="q8_interaction" checked={answers.q8_interaction === opt.key} onChange={() => handleSingleSelect('q8_interaction', opt.key)} />
                        <OptionTextGroup><OptionTitle>{opt.text}</OptionTitle></OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel $selected={answers.q8_interaction === 'other'}>
                      <input type="radio" name="q8_interaction" checked={answers.q8_interaction === 'other'} onChange={() => handleSingleSelect('q8_interaction', 'other')} />
                      <InlineOptionTextGroup>
                        <OptionTitle>Any Other :</OptionTitle>
                        <CustomTextInput placeholder="Please specify..." value={(answers.q8_interactionOther as string) || ''} onChange={e => setAnswers(prev => ({ ...prev, q8_interactionOther: e.target.value }))} />
                      </InlineOptionTextGroup>
                    </OptionLabel>
                    <OptionLabel $selected={answers.q8_interaction === 'notSure'}>
                      <input type="radio" name="q8_interaction" checked={answers.q8_interaction === 'notSure'} onChange={() => handleSingleSelect('q8_interaction', 'notSure')} />
                      <OptionTextGroup><OptionTitle>Not Sure</OptionTitle></OptionTextGroup>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>

                {/* Q9 */}
                <QuestionBox>
                  <QuestionTitle>9. How does your child typically make important decisions?</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Example: Deciding which book to read, which tuition/course to take, which activity to join.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'Thinks carefully about pros and cons before deciding' },
                      { key: 'b', text: 'Goes with what feels right and is practical' },
                      { key: 'c', text: 'Seeks guidance from a trusted person' },
                      { key: 'd', text: 'Thinks about long-term consequences' },
                      { key: 'e', text: 'Just tries it out and learns from what happens' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q9_decisions === opt.key}>
                        <input type="radio" name="q9_decisions" checked={answers.q9_decisions === opt.key} onChange={() => handleSingleSelect('q9_decisions', opt.key)} />
                        <OptionTextGroup><OptionTitle>{opt.text}</OptionTitle></OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel $selected={answers.q9_decisions === 'other'}>
                      <input type="radio" name="q9_decisions" checked={answers.q9_decisions === 'other'} onChange={() => handleSingleSelect('q9_decisions', 'other')} />
                      <InlineOptionTextGroup>
                        <OptionTitle>Any Other :</OptionTitle>
                        <CustomTextInput placeholder="Please specify..." value={(answers.q9_decisionsOther as string) || ''} onChange={e => setAnswers(prev => ({ ...prev, q9_decisionsOther: e.target.value }))} />
                      </InlineOptionTextGroup>
                    </OptionLabel>
                    <OptionLabel $selected={answers.q9_decisions === 'notSure'}>
                      <input type="radio" name="q9_decisions" checked={answers.q9_decisions === 'notSure'} onChange={() => handleSingleSelect('q9_decisions', 'notSure')} />
                      <OptionTextGroup><OptionTitle>Not Sure</OptionTitle></OptionTextGroup>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>

                {/* Q10 */}
                <QuestionBox>
                  <QuestionTitle>10. How does your child usually handle failure or critical feedback?</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Think of a time they got a low mark, lost a competition, or were told they did something wrong.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'Gives justifications or reasons, deflects responsibility' },
                      { key: 'b', text: 'Becomes visibly demotivated or loses confidence for some time' },
                      { key: 'c', text: 'Brushes it off and moves on without reflecting' },
                      { key: 'd', text: 'Compares with others, becomes competitive or envious' },
                      { key: 'e', text: 'Accepts it, reflects, and genuinely tries to improve' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q10_failure === opt.key}>
                        <input type="radio" name="q10_failure" checked={answers.q10_failure === opt.key} onChange={() => handleSingleSelect('q10_failure', opt.key)} />
                        <OptionTextGroup><OptionTitle>{opt.text}</OptionTitle></OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel $selected={answers.q10_failure === 'other'}>
                      <input type="radio" name="q10_failure" checked={answers.q10_failure === 'other'} onChange={() => handleSingleSelect('q10_failure', 'other')} />
                      <InlineOptionTextGroup>
                        <OptionTitle>Any Other :</OptionTitle>
                        <CustomTextInput placeholder="Please specify..." value={(answers.q10_failureOther as string) || ''} onChange={e => setAnswers(prev => ({ ...prev, q10_failureOther: e.target.value }))} />
                      </InlineOptionTextGroup>
                    </OptionLabel>
                    <OptionLabel $selected={answers.q10_failure === 'notSure'}>
                      <input type="radio" name="q10_failure" checked={answers.q10_failure === 'notSure'} onChange={() => handleSingleSelect('q10_failure', 'notSure')} />
                      <OptionTextGroup><OptionTitle>Not Sure</OptionTitle></OptionTextGroup>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>

                {/* Q11 */}
                <QuestionBox>
                  <QuestionTitle>11. What is the biggest obstacle your child faces in studying or performing academically?</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Being honest here helps the counsellor give your child practical tips.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'Distraction phone, TV, other activities pull attention away' },
                      { key: 'b', text: 'No clear study strategy or method' },
                      { key: 'c', text: 'Exam anxiety or fear of failure' },
                      { key: 'd', text: 'Pressure from peers or from us as parents' },
                      { key: 'e', text: 'Procrastination, putting off studying' },
                      { key: 'f', text: 'Difficulty understanding concepts, relies on memorisation' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q11_obstacle === opt.key}>
                        <input type="radio" name="q11_obstacle" checked={answers.q11_obstacle === opt.key} onChange={() => handleSingleSelect('q11_obstacle', opt.key)} />
                        <OptionTextGroup><OptionTitle>{opt.text}</OptionTitle></OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel $selected={answers.q11_obstacle === 'other'}>
                      <input type="radio" name="q11_obstacle" checked={answers.q11_obstacle === 'other'} onChange={() => handleSingleSelect('q11_obstacle', 'other')} />
                      <InlineOptionTextGroup>
                        <OptionTitle>Any Other :</OptionTitle>
                        <CustomTextInput placeholder="Please specify..." value={(answers.q11_obstacleOther as string) || ''} onChange={e => setAnswers(prev => ({ ...prev, q11_obstacleOther: e.target.value }))} />
                      </InlineOptionTextGroup>
                    </OptionLabel>
                    <OptionLabel $selected={answers.q11_obstacle === 'notSure'}>
                      <input type="radio" name="q11_obstacle" checked={answers.q11_obstacle === 'notSure'} onChange={() => handleSingleSelect('q11_obstacle', 'notSure')} />
                      <OptionTextGroup><OptionTitle>Not Sure</OptionTitle></OptionTextGroup>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>
              </>
            )}

            {/* ═══════════════════════════════════════════
                STEP 4: CAREER DIRECTION & EXPECTATIONS (Q12–Q13)
               ═══════════════════════════════════════════ */}
            {currentStep === 4 && (
              <>
                {/* Q12 */}
                <QuestionBox>
                  <QuestionTitle>12. Do you currently have a preferred career path or stream in mind for your child? If yes, please write it.</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    This can be anything related to education like any particular course as well as related to career like any profession.
                  </p>
                  <CustomTextInput
                    placeholder="Write your preferred career / stream here... (Write 'Nil' if none)"
                    style={{ width: '100%' }}
                    value={(answers.q12_careerPath as string) || ''}
                    onChange={e => setAnswers(prev => ({ ...prev, q12_careerPath: e.target.value }))}
                  />
                </QuestionBox>

                {/* Q13 */}
                <QuestionBox>
                  <QuestionTitle>13. If you have a preference, what is the main reason behind it? (Choose ONE)</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Being honest here helps your counsellor guide better.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'I believe my child is genuinely passionate about this field' },
                      { key: 'b', text: 'It offers strong earning potential' },
                      { key: 'c', text: 'It is a stable and respected career path' },
                      { key: 'd', text: 'It brings recognition or social prestige' },
                      { key: 'e', text: 'It offers independence and flexibility in work' },
                      { key: 'f', text: 'It allows my child to contribute to society' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q13_reason === opt.key}>
                        <input type="radio" name="q13_reason" checked={answers.q13_reason === opt.key} onChange={() => handleSingleSelect('q13_reason', opt.key)} />
                        <OptionTextGroup><OptionTitle>{opt.text}</OptionTitle></OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel $selected={answers.q13_reason === 'other'}>
                      <input type="radio" name="q13_reason" checked={answers.q13_reason === 'other'} onChange={() => handleSingleSelect('q13_reason', 'other')} />
                      <InlineOptionTextGroup>
                        <OptionTitle>Any Other :</OptionTitle>
                        <CustomTextInput placeholder="Please specify..." value={(answers.q13_reasonOther as string) || ''} onChange={e => setAnswers(prev => ({ ...prev, q13_reasonOther: e.target.value }))} />
                      </InlineOptionTextGroup>
                    </OptionLabel>
                    <OptionLabel $selected={answers.q13_reason === 'nil'}>
                      <input type="radio" name="q13_reason" checked={answers.q13_reason === 'nil'} onChange={() => handleSingleSelect('q13_reason', 'nil')} />
                      <OptionTextGroup><OptionTitle>I have no specific preference — My answer to Q12 was &apos;Nil&apos;</OptionTitle></OptionTextGroup>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>

                {/* Q14 */}
                <QuestionBox>
                  <QuestionTitle>14. Are you open to your child exploring unconventional or emerging careers if the assessment strongly suggests suitability?</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Examples: UX design, environmental science, data analytics, sports psychology, content creation, etc or anything likewise in their liking.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'Yes. I am open to whatever the counsellor recommends' },
                      { key: 'b', text: 'Open but with reservations. I would want to understand it fully first' },
                      { key: 'c', text: 'No. I have a clear plan and prefer to stick to it' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q14_unconventional === opt.key}>
                        <input type="radio" name="q14_unconventional" checked={answers.q14_unconventional === opt.key} onChange={() => handleSingleSelect('q14_unconventional', opt.key)} />
                        <OptionTextGroup><OptionTitle>{opt.text}</OptionTitle></OptionTextGroup>
                      </OptionLabel>
                    ))}
                  </OptionList>
                </QuestionBox>

                {/* Q15 */}
                <QuestionBox>
                  <QuestionTitle>15. Are there financial or practical constraints that should be considered in planning your child&apos;s education?</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Being honest helps for defining the career path.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'No significant constraints, we are open to most options' },
                      { key: 'b', text: 'Moderate constraints, we prefer affordable domestic options' },
                      { key: 'c', text: 'Significant constraints, budget is a key decision factor' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q15_financial === opt.key}>
                        <input type="radio" name="q15_financial" checked={answers.q15_financial === opt.key} onChange={() => handleSingleSelect('q15_financial', opt.key)} />
                        <OptionTextGroup><OptionTitle>{opt.text}</OptionTitle></OptionTextGroup>
                      </OptionLabel>
                    ))}
                  </OptionList>
                </QuestionBox>

                {/* Q16 — Table */}
                <QuestionBox>
                  <QuestionTitle>16. How open are you to your child studying away from home for their higher education?</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Being honest here helps your counsellor give you practical tips.
                  </p>
                  <MarksTableContainer>
                    <MarksTable>
                      <thead>
                        <tr>
                          <th style={{ width: '50%', textAlign: 'left' }}>Option</th>
                          <th style={{ width: '25%', textAlign: 'center' }}>Open to it ✓</th>
                          <th style={{ width: '25%', textAlign: 'center' }}>Not Open ✗</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { key: 'withinIndia', text: 'Studying in another city (within India)' },
                          { key: 'abroad', text: 'Studying abroad (international)' },
                        ].map(row => (
                          <tr key={row.key}>
                            <td style={{ fontSize: '13px', color: '#334155' }}>{row.text}</td>
                            <td style={{ textAlign: 'center' }}>
                              <input type="radio" name={`q16_${row.key}`} checked={(answers as Record<string, string>)[`q16_${row.key}`] === 'open'} onChange={() => setAnswers(prev => ({ ...prev, [`q16_${row.key}`]: 'open' }))} style={{ cursor: 'pointer', width: 16, height: 16 }} />
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <input type="radio" name={`q16_${row.key}`} checked={(answers as Record<string, string>)[`q16_${row.key}`] === 'notOpen'} onChange={() => setAnswers(prev => ({ ...prev, [`q16_${row.key}`]: 'notOpen' }))} style={{ cursor: 'pointer', width: 16, height: 16 }} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </MarksTable>
                  </MarksTableContainer>
                </QuestionBox>

                {/* Q17 */}
                <QuestionBox>
                  <QuestionTitle>17. Who usually makes the final decisions about your child&apos;s education and future?</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Being honest here helps your counsellor understand your family&apos;s decision-making style.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'Primarily us as parents' },
                      { key: 'b', text: 'Primarily my child' },
                      { key: 'c', text: 'We decide together as a family' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q17_decisions === opt.key}>
                        <input type="radio" name="q17_decisions" checked={answers.q17_decisions === opt.key} onChange={() => handleSingleSelect('q17_decisions', opt.key)} />
                        <OptionTextGroup><OptionTitle>{opt.text}</OptionTitle></OptionTextGroup>
                      </OptionLabel>
                    ))}
                  </OptionList>
                </QuestionBox>

                {/* Q18 */}
                <QuestionBox>
                  <QuestionTitle>18. How actively is your child involved in these major education decisions?</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Being honest here helps your counsellor understand how involved your child is in decisions about their own future.
                  </p>
                  <OptionList>
                    {[
                      { key: 'a', text: 'Always — every major decision is discussed with them' },
                      { key: 'b', text: 'Sometimes — for some decisions' },
                      { key: 'c', text: 'Rarely — we prefer to decide on their behalf' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={answers.q18_involvement === opt.key}>
                        <input type="radio" name="q18_involvement" checked={answers.q18_involvement === opt.key} onChange={() => handleSingleSelect('q18_involvement', opt.key)} />
                        <OptionTextGroup><OptionTitle>{opt.text}</OptionTitle></OptionTextGroup>
                      </OptionLabel>
                    ))}
                  </OptionList>
                </QuestionBox>

                {/* Q19 */}
                <QuestionBox>
                  <QuestionTitle>19. What is your biggest concern about your child&apos;s academic and career future? (Tick all that apply)</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Being honest here helps your counsellor address what matters most to you.
                  </p>
                  <OptionList>
                    {[
                      { key: 'confused', text: 'My child is confused about what to do' },
                      { key: 'performance', text: 'Academic performance is below expectations' },
                      { key: 'focus', text: 'My child lacks focus and direction' },
                      { key: 'peer', text: 'Peer pressure is a negative influence' },
                      { key: 'wrongChoice', text: 'I am worried they will make a wrong career choice' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={((answers.q19_concerns as string[]) || []).includes(opt.key)}>
                        <input type="checkbox" checked={((answers.q19_concerns as string[]) || []).includes(opt.key)} onChange={() => handleMultiSelect('q19_concerns', opt.key)} />
                        <OptionTextGroup><OptionTitle>{opt.text}</OptionTitle></OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel $selected={((answers.q19_concerns as string[]) || []).includes('other')}>
                      <input type="checkbox" checked={((answers.q19_concerns as string[]) || []).includes('other')} onChange={() => handleMultiSelect('q19_concerns', 'other')} />
                      <InlineOptionTextGroup>
                        <OptionTitle>Any Other :</OptionTitle>
                        <CustomTextInput placeholder="Please specify..." value={(answers.q19_concernsOther as string) || ''} onChange={e => setAnswers(prev => ({ ...prev, q19_concernsOther: e.target.value }))} />
                      </InlineOptionTextGroup>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>

                {/* Q20 */}
                <QuestionBox>
                  <QuestionTitle>20. Is there any specific concern academic, behavioural or emotional, you would like the counsellor to address in the session?</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    This is confidential and will only be used to make the session more useful for your child.
                  </p>
                  <CustomTextInput
                    placeholder="Write your concern here..."
                    style={{ width: '100%' }}
                    value={(answers.q20_concern as string) || ''}
                    onChange={e => setAnswers(prev => ({ ...prev, q20_concern: e.target.value }))}
                  />
                </QuestionBox>
              </>
            )}

            {/* ═══════════════════════════════════════════
                STEP 5: WHAT YOU EXPECT FROM THIS PROGRAMME (Q21–Q22)
               ═══════════════════════════════════════════ */}
            {currentStep === 5 && (
              <>
                {/* Q21 */}
                <QuestionBox>
                  <QuestionTitle>21. What are you hoping your child will gain from this counselling programme? (Tick all that apply)</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    Look at this as a conversation with your best friend and hence choose an answer so that the discussion is meaningful.
                  </p>
                  <OptionList>
                    {[
                      { key: 'stream', text: 'Clarity on which stream to choose (Science / Commerce / Humanities)' },
                      { key: 'roadmap', text: 'A clear career direction with a roadmap' },
                      { key: 'confidence', text: 'More confidence in themselves and their choices' },
                      { key: 'selfAwareness', text: 'Better self-awareness — understanding their own personality and strengths' },
                      { key: 'alignment', text: 'Alignment between what my child wants and what we as parents expect' },
                    ].map(opt => (
                      <OptionLabel key={opt.key} $selected={((answers.q21_hopes as string[]) || []).includes(opt.key)}>
                        <input type="checkbox" checked={((answers.q21_hopes as string[]) || []).includes(opt.key)} onChange={() => handleMultiSelect('q21_hopes', opt.key)} />
                        <OptionTextGroup><OptionTitle>{opt.text}</OptionTitle></OptionTextGroup>
                      </OptionLabel>
                    ))}
                    <OptionLabel $selected={((answers.q21_hopes as string[]) || []).includes('other')}>
                      <input type="checkbox" checked={((answers.q21_hopes as string[]) || []).includes('other')} onChange={() => handleMultiSelect('q21_hopes', 'other')} />
                      <InlineOptionTextGroup>
                        <OptionTitle>Any Other :</OptionTitle>
                        <CustomTextInput placeholder="Please specify..." value={(answers.q21_hopesOther as string) || ''} onChange={e => setAnswers(prev => ({ ...prev, q21_hopesOther: e.target.value }))} />
                      </InlineOptionTextGroup>
                    </OptionLabel>
                  </OptionList>
                </QuestionBox>

                {/* Q22 */}
                <QuestionBox>
                  <QuestionTitle>22. Is there anything you want to personally share with the counsellor, something about your family context, your child&apos;s background, or anything that may be RELEVANT for our programme?</QuestionTitle>
                  <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: '13px', marginTop: 4, marginBottom: 16 }}>
                    This is confidential and will only be used to make the session more useful for your child.
                  </p>
                  <CustomTextInput
                    placeholder="Write your response here..."
                    style={{ width: '100%' }}
                    value={(answers.q22_personalShare as string) || ''}
                    onChange={e => setAnswers(prev => ({ ...prev, q22_personalShare: e.target.value }))}
                  />
                </QuestionBox>
              </>
            )}
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
