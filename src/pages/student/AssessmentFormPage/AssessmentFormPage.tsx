import React, { useState, useRef } from 'react';
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
  RiWifiLine,
  RiSmartphoneLine,
  RiInformationLine,
  RiQuestionnaireLine,
  RiStarLine,
  RiSparklingLine,
  RiThumbUpLine,
  RiCheckDoubleLine,
  RiSubtractLine,
  RiThumbDownLine,
  RiCloseCircleLine,
  RiLightbulbLine,
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
  StatementParagraphTitle,
  StatementParagraphBody,
  ScaleBarRow,
  ScaleCell,
  ScaleCellNumber,
  ScaleCellLabel,
  TypeABreakdownStack,
  TypeABreakdownRow,
  TypeABadge,
  TypeADescText,
  TypeBStack,
  TypeBRow,
  TypeBBadge,
  TypeBDescText,
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
  LikertScaleContainer,
  LikertButton,
  LikertOptionScoreBadge,
  LikertOptionText,
  AptitudeOptionsGrid,
  AptitudeOptionLabel,
  WizardFooterNav,
} from './AssessmentFormPage.styles';

// 5-point Likert Options for Type A
const LIKERT_OPTIONS = [
  { val: 1, label: 'Strongly Disagree' },
  { val: 2, label: 'Disagree' },
  { val: 3, label: 'Neutral' },
  { val: 4, label: 'Agree' },
  { val: 5, label: 'Strongly Agree' },
];

// Step 1: RIASEC Questions (Q1 to Q24)
const RIASEC_QUESTIONS = [
  { id: 'Q1', text: 'I enjoy building or fixing things with my hands like putting together models eg Lego, rubiks cube, etc or playing with gadgets, or figuring out how everyday objects work.' },
  { id: 'Q2', text: 'I like working outdoors with plants, animals, or nature.' },
  { id: 'Q3', text: 'I enjoy operating tools, machinery, or technical equipment.' },
  { id: 'Q4', text: 'I like physical activities and working with tangible materials.' },
  { id: 'Q5', text: "I love asking 'why' and trying to understand the science or logic behind things I observe." },
  { id: 'Q6', text: 'I enjoy solving complex mathematical equations or scientific puzzles.' },
  { id: 'Q7', text: 'I like reading research papers, scientific articles, or analyzing data.' },
  { id: 'Q8', text: 'I prefer working independently to investigate and solve technical problems.' },
  { id: 'Q9', text: 'I love creative writing, painting, graphic design, or performing arts.' },
  { id: 'Q10', text: 'I enjoy designing original visual layouts, music, or digital artwork.' },
  { id: 'Q11', text: 'I prefer unstructured environments where I can express my imagination freely.' },
  { id: 'Q12', text: 'I like expressing my emotions and ideas through literature, drama, or media.' },
  { id: 'Q13', text: 'I enjoy helping, teaching, or mentoring other students with their studies.' },
  { id: 'Q14', text: "I like listening to people's personal problems and offering supportive advice." },
  { id: 'Q15', text: 'I enjoy participating in community service, volunteering, or social causes.' },
  { id: 'Q16', text: 'I prefer working in team settings focused on human welfare and education.' },
  { id: 'Q17', text: 'I enjoy taking charge of team projects and leading group discussions.' },
  { id: 'Q18', text: 'I like pitching ideas, persuading others, or debating competitive topics.' },
  { id: 'Q19', text: 'I am interested in entrepreneurship, business management, and marketing strategy.' },
  { id: 'Q20', text: 'I enjoy setting goals, taking calculated risks, and driving team success.' },
  { id: 'Q21', text: 'I like organizing spreadsheets, keeping accurate records, and filing documents.' },
  { id: 'Q22', text: 'I prefer clear step-by-step guidelines and established rules when doing tasks.' },
  { id: 'Q23', text: 'I enjoy working with financial calculations, budgets, or administrative data.' },
  { id: 'Q24', text: 'I take pride in attention to detail, precision, and systematic record-keeping.' },
];

// Step 2: BIG FIVE Personality Questions (Q25 to Q44)
const BIG_FIVE_QUESTIONS = [
  { id: 'Q25', text: 'I enjoy exploring new ideas, topics or areas of knowledge even when they are not related to my studies.' },
  { id: 'Q26', text: 'I am open to trying unfamiliar approaches and thinking outside traditional boundaries.' },
  { id: 'Q27', text: 'I enjoy abstract thinking, philosophy, and discussing big-picture concepts.' },
  { id: 'Q28', text: 'I am deeply curious about how different cultures, technology, and art evolve.' },
  { id: 'Q29', text: 'I keep my study space neat, organized, and well-structured.' },
  { id: 'Q30', text: 'I prepare thoroughly for tests and follow a strict study plan.' },
  { id: 'Q31', text: 'I pay close attention to minor details and take responsibility for my work.' },
  { id: 'Q32', text: 'I often leave tasks till the last minute and find it hard to stick to a schedule or plan.' },
  { id: 'Q33', text: 'I feel energized when interacting in large groups, clubs, or social events.' },
  { id: 'Q34', text: 'I speak up confidently in class discussions and express my thoughts easily.' },
  { id: 'Q35', text: 'I initiate conversations easily when meeting new people.' },
  { id: 'Q36', text: 'I prefer quiet individual work over high-energy social gatherings.' },
  { id: 'Q37', text: 'I am considerate, empathetic, and polite toward classmates and teachers.' },
  { id: 'Q38', text: 'I value cooperation and try to avoid unnecessary arguments with others.' },
  { id: 'Q39', text: 'I willingly help peers when they are struggling without expecting anything in return.' },
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
  { id: 'Q65', text: 'When I encounter a new subject or skill, I pick it up quickly and enjoy the challenge of learning something unfamiliar.' },
  { id: 'Q66', text: 'I break complex problems down into smaller manageable components before deciding on a solution.' },
  { id: 'Q67', text: 'I evaluate multiple perspectives and gather evidence before drawing conclusions.' },
  { id: 'Q68', text: 'I am comfortable adapting my plans when new information contradicts my initial assumptions.' },
  { id: 'Q69', text: 'I make decisions based on logical reasoning rather than impulse or emotional pressure.' },
  { id: 'Q70', text: 'When there is no clear plan or I cannot predict what will happen next, I feel very unsettled and find it difficult to take any action.' },
  { id: 'Q71', text: 'I reflect on past mistakes to refine my strategy and decision-making approach.' },
  { id: 'Q72', text: 'I enjoy brainstorming creative solutions to open-ended problems with no single right answer.' },
  { id: 'Q73', text: 'I stay focused on long-term career goals even when faced with immediate minor setbacks.' },
];

export const AssessmentFormPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isFormStarted, setIsFormStarted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 4;

  // Global answers state (Q1 - Q73 preserved across steps)
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

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(totalSteps, prev + 1));
    scrollToTop();
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    scrollToTop();
  };

  const handleSelectAnswer = (qId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleSubmitAssessment = () => {
    localStorage.setItem('pwc_assessment_form_submitted', 'true');
    toast.success(
      'Career Assessment Submitted!',
      'Thank you! Your 73 answers have been saved and your Ikigai profile report is generating.'
    );
    navigate(ROUTES.STUDENT_PORTAL);
  };

  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <FormPageContainer ref={topRef}>
      {isFormStarted && (
        <PageHeader
          title="CLASS 9 & 10 CAREER ASSESSMENT"
          subtitle="Career Counselling Programme — Instructions for Students"
          breadcrumbs={[
            { label: 'Student Portal', href: ROUTES.STUDENT_PORTAL },
            { label: 'Career Assessment' },
          ]}
          onBack={() => navigate(ROUTES.STUDENT_PORTAL)}
          actions={
            <Badge variant="primary" size="md">
              Step {currentStep} of {totalSteps}
            </Badge>
          }
        />
      )}

      {/* LANDING VIEW: MODERN REDESIGNED INSTRUCTIONS VIEW */}
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

            <DocTitle>CLASS 9 & 10 CAREER ASSESSMENT</DocTitle>
            <DocSubtitle>Instructions for Students</DocSubtitle>
            <DocNote>Read this carefully before you begin.</DocNote>
          </DocumentHeaderRow>

          {/* 4 Floating Metric Cards Bar */}
          <StatsGridBar>
            <StatBlock $gradient="linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)" $borderColor="#DBEAFE">
              <StatIconBox $bg="#DBEAFE" $color="#1E40AF">
                <RiQuestionLine size={24} />
              </StatIconBox>
              <StatInfoBox>
                <StatNumber $color="#1E40AF">73</StatNumber>
                <StatLabel>Questions</StatLabel>
              </StatInfoBox>
            </StatBlock>

            <StatBlock $gradient="linear-gradient(135deg, #F8FAFC 0%, #FAF5FF 100%)" $borderColor="#E9D5FF">
              <StatIconBox $bg="#F3E8FF" $color="#6B21A8">
                <RiGridLine size={24} />
              </StatIconBox>
              <StatInfoBox>
                <StatNumber $color="#6B21A8">4</StatNumber>
                <StatLabel>Sections</StatLabel>
              </StatInfoBox>
            </StatBlock>

            <StatBlock $gradient="linear-gradient(135deg, #F8FAFC 0%, #FEF3C7 100%)" $borderColor="#FDE68A">
              <StatIconBox $bg="#FEF3C7" $color="#B45309">
                <RiTimerFlashLine size={24} />
              </StatIconBox>
              <StatInfoBox>
                <StatNumber $color="#B45309">30–35</StatNumber>
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
                  Sit somewhere with no distractions — no noise, no interruptions. This is your time.
                </NumberCardDesc>
              </NumberCardItem>

              <NumberCardItem>
                <NumberBadgeHeader>
                  <NumberBadgeIcon $bg="#D1FAE5" $color="#047857">
                    <RiWifiLine size={20} />
                  </NumberBadgeIcon>
                  <NumberCardTitle>2. Check your Internet.</NumberCardTitle>
                </NumberBadgeHeader>
                <NumberCardDesc>
                  You will need a stable connection throughout. Make sure you are connected before you start. In case your connection drops, you can resume from where you have left.
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
                  Avoid distractions. The assessment takes only 30–35 minutes — give it your full attention.
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
                This assessment is simply about YOU — your interests, your personality, how you think, and what you are naturally good at. What kinds of activities and environments you genuinely enjoy? How you naturally behave — your energy, discipline, empathy, and more? Your natural reasoning ability — numbers, words, logic, and visuals. How you learn, handle uncertainty, and prefer to work. The results will help you understand which careers and streams are the best fit for you. Nobody is judging your answers. Your responses are completely confidential and will only be used for your career guidance.
              </StatementParagraphBody>
            </StatementParagraphCard>
          </div>

          {/* Section 3: How to Answer — Two Types of Questions */}
          <div>
            <SectionTitleHeader>
              <SectionHeaderIcon $color="#0284C7">
                <RiQuestionnaireLine size={18} />
              </SectionHeaderIcon>
              <SectionTitleText>How to Answer — Two Types of Questions</SectionTitleText>
            </SectionTitleHeader>

            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* TYPE A */}
              <div>
                <strong style={{ fontSize: 15, color: '#0F172A', display: 'block', marginBottom: 4 }}>
                  TYPE A · Agreement Questions
                </strong>
                <p style={{ margin: 0, fontSize: 14, color: '#64748B' }}>
                  You will see a statement and choose how much it describes you, on a scale of 1 to 5.
                </p>

                {/* 5-Color Rating Scale Bar */}
                <ScaleBarRow>
                  <ScaleCell $bg="#DC2626">
                    <ScaleCellNumber>1</ScaleCellNumber>
                    <ScaleCellLabel>Strongly Disagree</ScaleCellLabel>
                  </ScaleCell>
                  <ScaleCell $bg="#EA580C">
                    <ScaleCellNumber>2</ScaleCellNumber>
                    <ScaleCellLabel>Disagree</ScaleCellLabel>
                  </ScaleCell>
                  <ScaleCell $bg="#64748B">
                    <ScaleCellNumber>3</ScaleCellNumber>
                    <ScaleCellLabel>Neutral</ScaleCellLabel>
                  </ScaleCell>
                  <ScaleCell $bg="#0D9488">
                    <ScaleCellNumber>4</ScaleCellNumber>
                    <ScaleCellLabel>Agree</ScaleCellLabel>
                  </ScaleCell>
                  <ScaleCell $bg="#059669">
                    <ScaleCellNumber>5</ScaleCellNumber>
                    <ScaleCellLabel>Strongly Agree</ScaleCellLabel>
                  </ScaleCell>
                </ScaleBarRow>

                {/* Breakdown Rows with Icons */}
                <TypeABreakdownStack>
                  <TypeABreakdownRow $bg="#ECFDF5">
                    <TypeABadge $bg="#059669">
                      <RiThumbUpLine size={16} /> Strongly Agree (5)
                    </TypeABadge>
                    <TypeADescText>You really feel this describes you. You are sure about it.</TypeADescText>
                  </TypeABreakdownRow>

                  <TypeABreakdownRow $bg="#F0FDF4">
                    <TypeABadge $bg="#0D9488">
                      <RiCheckDoubleLine size={16} /> Agree (4)
                    </TypeABadge>
                    <TypeADescText>It does describe you — but not as strongly. You generally feel this way.</TypeADescText>
                  </TypeABreakdownRow>

                  <TypeABreakdownRow $bg="#F8FAFC">
                    <TypeABadge $bg="#64748B">
                      <RiSubtractLine size={16} /> Neutral (3)
                    </TypeABadge>
                    <TypeADescText>
                      You are genuinely unsure — you cannot say yes or no. Overuse of Neutral flattens your profile and reduces the accuracy of your results. If you even slightly agree or slightly disagree, choose that.
                    </TypeADescText>
                  </TypeABreakdownRow>

                  <TypeABreakdownRow $bg="#FFF7ED">
                    <TypeABadge $bg="#EA580C">
                      <RiThumbDownLine size={16} /> Disagree (2)
                    </TypeABadge>
                    <TypeADescText>This does not describe you — but not strongly. You generally do not feel this way.</TypeADescText>
                  </TypeABreakdownRow>

                  <TypeABreakdownRow $bg="#FEF2F2">
                    <TypeABadge $bg="#DC2626">
                      <RiCloseCircleLine size={16} /> Strongly Disagree (1)
                    </TypeABadge>
                    <TypeADescText>This really does not describe you. You are certain it does not apply.</TypeADescText>
                  </TypeABreakdownRow>
                </TypeABreakdownStack>
              </div>

              {/* TYPE B */}
              <div>
                <strong style={{ fontSize: 15, color: '#0F172A', display: 'block', marginBottom: 4 }}>
                  TYPE B · Aptitude Questions
                </strong>
                <p style={{ margin: 0, fontSize: 14, color: '#64748B' }}>
                  These are multiple-choice questions with one correct answer.
                </p>

                <TypeBStack>
                  <TypeBRow>
                    <TypeBBadge>A</TypeBBadge>
                    <TypeBDescText>
                      <RiLightbulbLine size={18} style={{ marginRight: 8, color: '#D97706', flexShrink: 0 }} />
                      <span>Choose the answer you think is correct. Trust your reasoning.</span>
                    </TypeBDescText>
                  </TypeBRow>

                  <TypeBRow>
                    <TypeBBadge>B</TypeBBadge>
                    <TypeBDescText>
                      <RiLightbulbLine size={18} style={{ marginRight: 8, color: '#D97706', flexShrink: 0 }} />
                      <span>If you are genuinely unsure, select &apos;Not Sure&apos; — this is honest and it actually helps your profile. Do not guess randomly.</span>
                    </TypeBDescText>
                  </TypeBRow>
                </TypeBStack>
              </div>
            </div>
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
                    Answer based on how YOU actually are — not how you want to be seen, not what sounds impressive, not what you think a counsellor wants to hear. The more honest you are, the more useful your results will be.
                  </GoldenRuleDesc>
                </GoldenRuleContent>
              </GoldenRuleCard>

              <GoldenRuleCard>
                <GoldenRuleIconBox>
                  <RiStarLine size={20} />
                </GoldenRuleIconBox>
                <GoldenRuleContent>
                  <GoldenRuleTitle>Go with your first instinct.</GoldenRuleTitle>
                  <GoldenRuleDesc>
                    Do not overthink. Your first reaction to a statement is usually the most accurate reflection of who you are. If you sit on a question too long, you start second-guessing yourself.
                  </GoldenRuleDesc>
                </GoldenRuleContent>
              </GoldenRuleCard>

              <GoldenRuleCard>
                <GoldenRuleIconBox>
                  <RiStarLine size={20} />
                </GoldenRuleIconBox>
                <GoldenRuleContent>
                  <GoldenRuleTitle>Do not skip or rush.</GoldenRuleTitle>
                  <GoldenRuleDesc>
                    Every question contributes to your profile. At the same time, do not spend more than a few seconds on any single question — keep moving.
                  </GoldenRuleDesc>
                </GoldenRuleContent>
              </GoldenRuleCard>

              <GoldenRuleCard>
                <GoldenRuleIconBox>
                  <RiStarLine size={20} />
                </GoldenRuleIconBox>
                <GoldenRuleContent>
                  <GoldenRuleTitle>Your results are private.</GoldenRuleTitle>
                  <GoldenRuleDesc>
                    Only you and your career counsellor will see them. This is a safe space — be real.
                  </GoldenRuleDesc>
                </GoldenRuleContent>
              </GoldenRuleCard>
            </GoldenRulesGrid>
          </div>

          {/* Encouragement Hero Banner & CTA Button */}
          <ReadyEncouragementBanner>
            <ReadyBannerTitle>You are ready. Take a deep breath.</ReadyBannerTitle>
            <ReadyBannerSubtext>
              There is nothing to prepare for. Just be yourself — and let the results do the rest.
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
              style={{ minWidth: '300px' }}
            >
              Start Career Assessment
            </Button>
            <CtaSubtext>Estimated time: 30-35 minutes • Answers saved automatically as you navigate</CtaSubtext>
          </StartCtaBox>
        </HeroHeaderCard>
      ) : (
        /* WIZARD VIEW: STEPS 1 - 4 */
        <WizardContainer>
          <WizardProgressHeader>
            <WizardStepInfoRow>
              <span>
                {currentStep === 1 && 'SECTION 1 — RIASEC INTEREST INVENTORY (Q1 to Q24)'}
                {currentStep === 2 && 'SECTION 2 — BIG FIVE PERSONALITY TRAITS (Q25 to Q44)'}
                {currentStep === 3 && 'SECTION 3 — APTITUDE & REASONING (Q45 to Q64)'}
                {currentStep === 4 && 'SECTION 4 — COGNITIVE & DECISION STYLE (Q65 to Q73)'}
              </span>
              <span>Step {currentStep} of {totalSteps} ({progressPercent}%)</span>
            </WizardStepInfoRow>

            <ProgressTrack>
              <ProgressBar $percent={progressPercent} />
            </ProgressTrack>
          </WizardProgressHeader>

          <WizardStepBody>
            {/* STEP 1: RIASEC */}
            {currentStep === 1 && (
              <>
                <QuestionSubtext style={{ fontSize: '14px', fontWeight: 500, color: '#334155' }}>
                  Instructions: Rate how much you agree with each statement on a scale of 1 (Strongly Disagree) to 5 (Strongly Agree).
                </QuestionSubtext>

                {RIASEC_QUESTIONS.map(q => (
                  <QuestionBox key={q.id}>
                    <QuestionTitle>{q.id}. {q.text}</QuestionTitle>

                    <LikertScaleContainer>
                      {LIKERT_OPTIONS.map(opt => (
                        <LikertButton
                          key={opt.val}
                          type="button"
                          $ratingValue={opt.val}
                          $selected={answers[q.id] === opt.val}
                          onClick={() => handleSelectAnswer(q.id, opt.val)}
                        >
                          <LikertOptionScoreBadge $selected={answers[q.id] === opt.val}>{opt.val}</LikertOptionScoreBadge>
                          <LikertOptionText>{opt.label}</LikertOptionText>
                        </LikertButton>
                      ))}
                    </LikertScaleContainer>
                  </QuestionBox>
                ))}
              </>
            )}

            {/* STEP 2: BIG FIVE */}
            {currentStep === 2 && (
              <>
                <QuestionSubtext style={{ fontSize: '14px', fontWeight: 500, color: '#334155' }}>
                  Instructions: Rate your agreement with each personality statement from 1 (Strongly Disagree) to 5 (Strongly Agree).
                </QuestionSubtext>

                {BIG_FIVE_QUESTIONS.map(q => (
                  <QuestionBox key={q.id}>
                    <QuestionTitle>{q.id}. {q.text}</QuestionTitle>

                    <LikertScaleContainer>
                      {LIKERT_OPTIONS.map(opt => (
                        <LikertButton
                          key={opt.val}
                          type="button"
                          $ratingValue={opt.val}
                          $selected={answers[q.id] === opt.val}
                          onClick={() => handleSelectAnswer(q.id, opt.val)}
                        >
                          <LikertOptionScoreBadge $selected={answers[q.id] === opt.val}>{opt.val}</LikertOptionScoreBadge>
                          <LikertOptionText>{opt.label}</LikertOptionText>
                        </LikertButton>
                      ))}
                    </LikertScaleContainer>
                  </QuestionBox>
                ))}
              </>
            )}

            {/* STEP 3: APTITUDE */}
            {currentStep === 3 && (
              <>
                <QuestionSubtext style={{ fontSize: '14px', fontWeight: 500, color: '#334155' }}>
                  Instructions: Multiple choice aptitude questions. Select the single best answer, or select &apos;Not Sure&apos; if genuinely unsure.
                </QuestionSubtext>

                {APTITUDE_QUESTIONS.map(q => (
                  <QuestionBox key={q.id}>
                    <QuestionTitle>{q.id}. {q.text}</QuestionTitle>

                    <AptitudeOptionsGrid>
                      {q.options.map(opt => (
                        <AptitudeOptionLabel key={opt.label} $selected={answers[q.id] === opt.label}>
                          <input
                            type="radio"
                            name={`q_${q.id}`}
                            value={opt.label}
                            checked={answers[q.id] === opt.label}
                            onChange={() => handleSelectAnswer(q.id, opt.label)}
                          />
                          <span><strong>{opt.label})</strong> {opt.text}</span>
                        </AptitudeOptionLabel>
                      ))}
                    </AptitudeOptionsGrid>
                  </QuestionBox>
                ))}
              </>
            )}

            {/* STEP 4: COGNITIVE & DECISION STYLE */}
            {currentStep === 4 && (
              <>
                <QuestionSubtext style={{ fontSize: '14px', fontWeight: 500, color: '#334155' }}>
                  Instructions: Reverting to 1 to 5 scale (Strongly Disagree to Strongly Agree) for cognitive & decision-making style.
                </QuestionSubtext>

                {COGNITIVE_QUESTIONS.map(q => (
                  <QuestionBox key={q.id}>
                    <QuestionTitle>{q.id}. {q.text}</QuestionTitle>

                    <LikertScaleContainer>
                      {LIKERT_OPTIONS.map(opt => (
                        <LikertButton
                          key={opt.val}
                          type="button"
                          $ratingValue={opt.val}
                          $selected={answers[q.id] === opt.val}
                          onClick={() => handleSelectAnswer(q.id, opt.val)}
                        >
                          <LikertOptionScoreBadge $selected={answers[q.id] === opt.val}>{opt.val}</LikertOptionScoreBadge>
                          <LikertOptionText>{opt.label}</LikertOptionText>
                        </LikertButton>
                      ))}
                    </LikertScaleContainer>
                  </QuestionBox>
                ))}
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
                onClick={handleSubmitAssessment}
                style={{ backgroundColor: '#16A34A', borderColor: '#16A34A' }}
              >
                Submit Assessment
              </Button>
            )}
          </WizardFooterNav>
        </WizardContainer>
      )}
    </FormPageContainer>
  );
};

export default AssessmentFormPage;
