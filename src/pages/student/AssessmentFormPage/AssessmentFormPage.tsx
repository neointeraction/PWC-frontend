import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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

// Step 1: RIASEC Questions (Q1 to Q24)
const RIASEC_QUESTIONS = [
  {
    id: 'Q1',
    text: 'I enjoy building or fixing things with my hands like putting together models eg Lego, rubiks cube, etc or playing with gadgets, or figuring out how everyday objects work.',
  },
  { id: 'Q2', text: 'I like working outdoors with plants, animals, or nature.' },
  { id: 'Q3', text: 'I enjoy operating tools, machinery, or technical equipment.' },
  { id: 'Q4', text: 'I like physical activities and working with tangible materials.' },
  {
    id: 'Q5',
    text: "I love asking 'why' and trying to understand the science or logic behind things I observe.",
  },
  { id: 'Q6', text: 'I enjoy solving complex mathematical equations or scientific puzzles.' },
  { id: 'Q7', text: 'I like reading research papers, scientific articles, or analyzing data.' },
  { id: 'Q8', text: 'I prefer working independently to investigate and solve technical problems.' },
  { id: 'Q9', text: 'I love creative writing, painting, graphic design, or performing arts.' },
  { id: 'Q10', text: 'I enjoy designing original visual layouts, music, or digital artwork.' },
  {
    id: 'Q11',
    text: 'I prefer unstructured environments where I can express my imagination freely.',
  },
  {
    id: 'Q12',
    text: 'I like expressing my emotions and ideas through literature, drama, or media.',
  },
  { id: 'Q13', text: 'I enjoy helping, teaching, or mentoring other students with their studies.' },
  {
    id: 'Q14',
    text: "I like listening to people's personal problems and offering supportive advice.",
  },
  {
    id: 'Q15',
    text: 'I enjoy participating in community service, volunteering, or social causes.',
  },
  { id: 'Q16', text: 'I prefer working in team settings focused on human welfare and education.' },
  { id: 'Q17', text: 'I enjoy taking charge of team projects and leading group discussions.' },
  { id: 'Q18', text: 'I like pitching ideas, persuading others, or debating competitive topics.' },
  {
    id: 'Q19',
    text: 'I am interested in entrepreneurship, business management, and marketing strategy.',
  },
  { id: 'Q20', text: 'I enjoy setting goals, taking calculated risks, and driving team success.' },
  {
    id: 'Q21',
    text: 'I like organizing spreadsheets, keeping accurate records, and filing documents.',
  },
  {
    id: 'Q22',
    text: 'I prefer clear step-by-step guidelines and established rules when doing tasks.',
  },
  {
    id: 'Q23',
    text: 'I enjoy working with financial calculations, budgets, or administrative data.',
  },
  {
    id: 'Q24',
    text: 'I take pride in attention to detail, precision, and systematic record-keeping.',
  },
];

// Step 2: BIG FIVE Personality Questions (Q25 to Q44)
const BIG_FIVE_QUESTIONS = [
  {
    id: 'Q25',
    text: 'I enjoy exploring new ideas, topics or areas of knowledge even when they are not related to my studies.',
  },
  {
    id: 'Q26',
    text: 'I am open to trying unfamiliar approaches and thinking outside traditional boundaries.',
  },
  {
    id: 'Q27',
    text: 'I enjoy abstract thinking, philosophy, and discussing big-picture concepts.',
  },
  {
    id: 'Q28',
    text: 'I am deeply curious about how different cultures, technology, and art evolve.',
  },
  { id: 'Q29', text: 'I keep my study space neat, organized, and well-structured.' },
  { id: 'Q30', text: 'I prepare thoroughly for tests and follow a strict study plan.' },
  {
    id: 'Q31',
    text: 'I pay close attention to minor details and take responsibility for my work.',
  },
  {
    id: 'Q32',
    text: 'I often leave tasks till the last minute and find it hard to stick to a schedule or plan.',
  },
  {
    id: 'Q33',
    text: 'I feel energized when interacting in large groups, clubs, or social events.',
  },
  {
    id: 'Q34',
    text: 'I speak up confidently in class discussions and express my thoughts easily.',
  },
  { id: 'Q35', text: 'I initiate conversations easily when meeting new people.' },
  { id: 'Q36', text: 'I prefer quiet individual work over high-energy social gatherings.' },
  { id: 'Q37', text: 'I am considerate, empathetic, and polite toward classmates and teachers.' },
  { id: 'Q38', text: 'I value cooperation and try to avoid unnecessary arguments with others.' },
  {
    id: 'Q39',
    text: 'I willingly help peers when they are struggling without expecting anything in return.',
  },
  { id: 'Q40', text: 'I trust that most people have good intentions.' },
  { id: 'Q41', text: 'I often feel anxious or worried when facing upcoming exams or deadlines.' },
  { id: 'Q42', text: 'My mood changes quickly depending on my surroundings or academic results.' },
  { id: 'Q43', text: 'I find it difficult to calm down when unexpected disruptions occur.' },
  { id: 'Q44', text: 'I stay calm and steady even under intense time pressure.' },
];

// Step 3: APTITUDE Questions (Q45 to Q64)
const APTITUDE_QUESTIONS = [
  {
    id: 'Q45',
    text: 'A shopkeeper sells a pen for ₹30, making a profit of 20%. What is the cost price of the pen?',
    options: [
      { label: 'A', text: '₹22' },
      { label: 'B', text: '₹24' },
      { label: 'C', text: '₹25' },
      { label: 'D', text: '₹26' },
      { label: 'E', text: 'Not Sure' },
    ],
  },
  {
    id: 'Q46',
    text: 'If 3x + 7 = 22, what is the value of x?',
    options: [
      { label: 'A', text: '4' },
      { label: 'B', text: '5' },
      { label: 'C', text: '6' },
      { label: 'D', text: '7' },
      { label: 'E', text: 'Not Sure' },
    ],
  },
  {
    id: 'Q47',
    text: 'If 5 workers complete a project in 12 days, how many days will 6 workers take to complete the same project at the same rate?',
    options: [
      { label: 'A', text: '8 days' },
      { label: 'B', text: '10 days' },
      { label: 'C', text: '11 days' },
      { label: 'D', text: '14 days' },
      { label: 'E', text: 'Not Sure' },
    ],
  },
  {
    id: 'Q48',
    text: 'Find the median of the set of numbers: 12, 7, 19, 4, 15, 9, 21.',
    options: [
      { label: 'A', text: '9' },
      { label: 'B', text: '12' },
      { label: 'C', text: '14' },
      { label: 'D', text: '15' },
      { label: 'E', text: 'Not Sure' },
    ],
  },
  {
    id: 'Q49',
    text: 'A train running at 72 km/h crosses a pole in 10 seconds. What is the length of the train?',
    options: [
      { label: 'A', text: '150m' },
      { label: 'B', text: '180m' },
      { label: 'C', text: '200m' },
      { label: 'D', text: '220m' },
      { label: 'E', text: 'Not Sure' },
    ],
  },
  {
    id: 'Q50',
    text: 'What is 15% of 240?',
    options: [
      { label: 'A', text: '32' },
      { label: 'B', text: '36' },
      { label: 'C', text: '40' },
      { label: 'D', text: '42' },
      { label: 'E', text: 'Not Sure' },
    ],
  },
  {
    id: 'Q51',
    text: 'Select the odd one out among the given options.',
    options: [
      { label: 'A', text: 'Circle' },
      { label: 'B', text: 'Square' },
      { label: 'C', text: 'Cube' },
      { label: 'D', text: 'Triangle' },
      { label: 'E', text: 'Not Sure' },
    ],
  },
  {
    id: 'Q52',
    text: 'If ALL Pencils are Pens, and SOME Pens are Markers, which statement is DEFINITELY true?',
    options: [
      { label: 'A', text: 'All Pencils are Markers' },
      { label: 'B', text: 'Some Pencils may be Markers' },
      { label: 'C', text: 'No Pencils are Markers' },
      { label: 'D', text: 'All Markers are Pens' },
      { label: 'E', text: 'Not Sure' },
    ],
  },
  {
    id: 'Q53',
    text: 'Complete the number series: 2, 6, 12, 20, 30, ___?',
    options: [
      { label: 'A', text: '36' },
      { label: 'B', text: '40' },
      { label: 'C', text: '42' },
      { label: 'D', text: '48' },
      { label: 'E', text: 'Not Sure' },
    ],
  },
  {
    id: 'Q54',
    text: 'Complete the letter series: B, D, G, K, P, ___?',
    options: [
      { label: 'A', text: 'U' },
      { label: 'B', text: 'V' },
      { label: 'C', text: 'W' },
      { label: 'D', text: 'X' },
      { label: 'E', text: 'Not Sure' },
    ],
  },
  {
    id: 'Q55',
    text: "Pointing to a photograph, Riya said 'He is the son of the only son of my grandfather'. How is the man related to Riya?",
    options: [
      { label: 'A', text: 'Father' },
      { label: 'B', text: 'Brother' },
      { label: 'C', text: 'Uncle' },
      { label: 'D', text: 'Cousin' },
      { label: 'E', text: 'Not Sure' },
    ],
  },
  {
    id: 'Q56',
    text: 'If North becomes South-East, what does West become?',
    options: [
      { label: 'A', text: 'North-East' },
      { label: 'B', text: 'North-West' },
      { label: 'C', text: 'South-East' },
      { label: 'D', text: 'South-West' },
      { label: 'E', text: 'Not Sure' },
    ],
  },
  {
    id: 'Q57',
    text: 'Which fraction is the largest: 3/4, 5/6, 7/9, 11/12?',
    options: [
      { label: 'A', text: '3/4' },
      { label: 'B', text: '5/6' },
      { label: 'C', text: '7/9' },
      { label: 'D', text: '11/12' },
      { label: 'E', text: 'Not Sure' },
    ],
  },
  {
    id: 'Q58',
    text: 'A pattern alternates between a filled shape and an empty shape of the same type, rotating 90° clockwise each step. The sequence so far is: Filled Circle -> Empty Square -> Filled Triangle -> Empty Circle. What comes next?',
    options: [
      { label: 'A', text: 'Filled Square' },
      { label: 'B', text: 'Empty Square' },
      { label: 'C', text: 'Filled Triangle' },
      { label: 'D', text: 'Empty Triangle' },
      { label: 'E', text: 'Not Sure' },
    ],
  },
  {
    id: 'Q59',
    text: 'In a coding language: DOG = 26, CAT = 24, BAT = 23. Following the same logic, what does FISH equal?',
    options: [
      { label: 'A', text: '38' },
      { label: 'B', text: '42' },
      { label: 'C', text: '45' },
      { label: 'D', text: '50' },
      { label: 'E', text: 'Not Sure' },
    ],
  },
  {
    id: 'Q60',
    text: 'An analog clock shows 3:15. What is the angle between the hour hand and the minute hand?',
    options: [
      { label: 'A', text: '0°' },
      { label: 'B', text: '7.5°' },
      { label: 'C', text: '15°' },
      { label: 'D', text: '22.5°' },
      { label: 'E', text: 'Not Sure' },
    ],
  },
  {
    id: 'Q61',
    text: 'If A is taller than B, B is taller than C, and C is shorter than D, who is DEFINITELY the shortest?',
    options: [
      { label: 'A', text: 'A' },
      { label: 'B', text: 'B' },
      { label: 'C', text: 'C' },
      { label: 'D', text: 'D' },
      { label: 'E', text: 'Not Sure' },
    ],
  },
  {
    id: 'Q62',
    text: 'A 3×3×3 cube is painted red on all 6 faces and then cut into 27 equal smaller cubes. How many of the smaller cubes have exactly 2 faces painted red?',
    options: [
      { label: 'A', text: '6' },
      { label: 'B', text: '8' },
      { label: 'C', text: '12' },
      { label: 'D', text: '18' },
      { label: 'E', text: 'Not Sure' },
    ],
  },
  {
    id: 'Q63',
    text: 'What is the average of the first 5 prime numbers (2, 3, 5, 7, 11)?',
    options: [
      { label: 'A', text: '5.2' },
      { label: 'B', text: '5.6' },
      { label: 'C', text: '6.0' },
      { label: 'D', text: '6.4' },
      { label: 'E', text: 'Not Sure' },
    ],
  },
  {
    id: 'Q64',
    text: 'If a circle has a radius of 7 cm, what is its approximate area? (Use π = 22/7)',
    options: [
      { label: 'A', text: '144 cm²' },
      { label: 'B', text: '154 cm²' },
      { label: 'C', text: '164 cm²' },
      { label: 'D', text: '176 cm²' },
      { label: 'E', text: 'Not Sure' },
    ],
  },
];

// Step 4: COGNITIVE & DECISION STYLE Questions (Q65 to Q73)
const COGNITIVE_QUESTIONS = [
  {
    id: 'Q65',
    text: 'When I encounter a new subject or skill, I pick it up quickly and enjoy the challenge of learning something unfamiliar.',
  },
  {
    id: 'Q66',
    text: 'I break complex problems down into smaller manageable components before deciding on a solution.',
  },
  {
    id: 'Q67',
    text: 'I evaluate multiple perspectives and gather evidence before drawing conclusions.',
  },
  {
    id: 'Q68',
    text: 'I am comfortable adapting my plans when new information contradicts my initial assumptions.',
  },
  {
    id: 'Q69',
    text: 'I make decisions based on logical reasoning rather than impulse or emotional pressure.',
  },
  {
    id: 'Q70',
    text: 'When there is no clear plan or I cannot predict what will happen next, I feel very unsettled and find it difficult to take any action.',
  },
  {
    id: 'Q71',
    text: 'I reflect on past mistakes to refine my strategy and decision-making approach.',
  },
  {
    id: 'Q72',
    text: 'I enjoy brainstorming creative solutions to open-ended problems with no single right answer.',
  },
  {
    id: 'Q73',
    text: 'I stay focused on long-term career goals even when faced with immediate minor setbacks.',
  },
];

// Consolidated 73 Questions List
interface QuestionItem {
  id: string;
  num: number;
  text: string;
  type: 'likert' | 'aptitude';
  options?: { label: string; text: string }[];
  sectionNum: number;
  sectionTitle: string;
  sectionInstruction: string;
}

const ALL_QUESTIONS: QuestionItem[] = [
  ...RIASEC_QUESTIONS.map((q, idx) => ({
    id: q.id,
    num: idx + 1,
    text: q.text,
    type: 'likert' as const,
    sectionNum: 1,
    sectionTitle: 'RIASEC INTEREST INVENTORY',
    sectionInstruction:
      'Instructions: Rate how much you agree with each statement on a scale of 1 (Strongly Disagree) to 5 (Strongly Agree).',
  })),
  ...BIG_FIVE_QUESTIONS.map((q, idx) => ({
    id: q.id,
    num: RIASEC_QUESTIONS.length + idx + 1,
    text: q.text,
    type: 'likert' as const,
    sectionNum: 2,
    sectionTitle: 'BIG FIVE PERSONALITY TRAITS',
    sectionInstruction:
      'Instructions: Rate your agreement with each personality statement from 1 (Strongly Disagree) to 5 (Strongly Agree).',
  })),
  ...APTITUDE_QUESTIONS.map((q, idx) => ({
    id: q.id,
    num: RIASEC_QUESTIONS.length + BIG_FIVE_QUESTIONS.length + idx + 1,
    text: q.text,
    type: 'aptitude' as const,
    options: q.options,
    sectionNum: 3,
    sectionTitle: 'APTITUDE & REASONING',
    sectionInstruction:
      "Instructions: Multiple choice aptitude questions. Select the single best answer, or select 'Not Sure' if genuinely unsure.",
  })),
  ...COGNITIVE_QUESTIONS.map((q, idx) => ({
    id: q.id,
    num: RIASEC_QUESTIONS.length + BIG_FIVE_QUESTIONS.length + APTITUDE_QUESTIONS.length + idx + 1,
    text: q.text,
    type: 'likert' as const,
    sectionNum: 4,
    sectionTitle: 'COGNITIVE & DECISION STYLE',
    sectionInstruction:
      'Instructions: Reverting to 1 to 5 scale (Strongly Disagree to Strongly Agree) for cognitive & decision-making style.',
  })),
];

export const AssessmentFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [isFormStarted, setIsFormStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const totalQuestions = ALL_QUESTIONS.length;
  const currentQuestion = ALL_QUESTIONS[currentQuestionIndex];

  // Global answers state (Q1 - Q73 preserved across questions)
  const [answers, setAnswers] = useState<Record<string, any>>({});

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

  const handleNextQuestion = () => {
    if (answers[currentQuestion.id] === undefined) return;
    setCurrentQuestionIndex(prev => Math.min(totalQuestions - 1, prev + 1));
    scrollToTop();
  };

  const handleSelectAnswer = (qId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

  const handleSubmitAssessment = () => {
    localStorage.setItem('pwc_assessment_form_submitted', 'true');
    setIsCompletionModalOpen(true);
  };

  const handleConfirmCompletion = useCallback(() => {
    setIsCompletionModalOpen(false);
    navigate(ROUTES.STUDENT_PORTAL);
  }, [navigate]);

  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

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
                <StatNumber $color="#1E40AF">73</StatNumber>
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
                onClick={handleSubmitAssessment}
              >
                Submit Assessment
              </Button>
            )}
          </WizardFooterNav>
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
