import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckDoubleLine,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/Button';
import { ROUTES } from '@/constants';
import {
  getMockStudentFormChartData,
  CounsellorFormChartData,
} from '@/mocks/studentFormChart.mock';

import { SidebarTracker, StepDefinition } from './components/SidebarTracker';
import { Step0StudentInfo } from './components/Step0StudentInfo';
import { Step1SectionA } from './components/Step1SectionA';
import { Step2SectionB } from './components/Step2SectionB';
import { Step3SectionC } from './components/Step3SectionC';
import { Step4SectionD } from './components/Step4SectionD';
import { Step5SectionE } from './components/Step5SectionE';
import { Step6SCRI } from './components/Step6SCRI';
import { Step6SectionF } from './components/Step6SectionF';
import { Step7SummaryDashboard } from './components/Step7SummaryDashboard';
import { ChartSuccessModal } from './components/ChartSuccessModal';

import {
  Container,
  LayoutWrapper,
  MainContentPanel,
  StickyFooterNav,
} from './StudentFormChartPage.styles';

const STEP_LABELS = [
  { index: 0, label: 'Our Champion', shortLabel: 'Info' },
  { index: 1, label: 'Academics & Non-Academics', shortLabel: 'A' },
  { index: 2, label: 'Strengths & Personality View', shortLabel: 'B' },
  {
    index: 3,
    label: 'Setting the Compass – Career Direction',
    shortLabel: 'C',
    sublinks: [
      { id: 'sec-c-pre-counselling', label: 'Pre-Counselling View' },
      { id: 'sec-c-stream-fit', label: 'Stream Fit & Pathways' },
      { id: 'sec-c-graduation-fit', label: 'Graduation Fit' },
      { id: 'sec-c-colleges', label: 'Colleges After Class 11&12' },
      { id: 'sec-c-entrance-exams', label: 'Entrance Exams' },
      { id: 'sec-c-target-roles', label: 'Target Roles & Compass' },
    ],
  },
  { index: 4, label: 'Reliability of Assessment', shortLabel: 'D' },
  { index: 5, label: 'Roadmap', shortLabel: 'E' },
  { index: 6, label: 'Student Career Readiness Index (SCRI) — Counsellor Rating', shortLabel: 'SCRI' },
  { index: 7, label: 'Goals & Expectations', shortLabel: 'F' },
  { index: 8, label: 'Summary Dashboard', shortLabel: 'Summary' },
];

export const StudentFormChartPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [activeSublinkId, setActiveSublinkId] = useState<string | undefined>();
  const [visitedSteps, setVisitedSteps] = useState<number[]>([0]);

  const [formData, setFormData] = useState<CounsellorFormChartData>(() =>
    getMockStudentFormChartData(sessionId || 'sess-counselor-1')
  );

  const handleStepChange = (stepIndex: number, sublinkId?: string) => {
    setActiveStep(stepIndex);
    setActiveSublinkId(sublinkId);
    if (!visitedSteps.includes(stepIndex)) {
      setVisitedSteps(prev => [...prev, stepIndex]);
    }
    if (sublinkId) {
      setTimeout(() => {
        const el = document.getElementById(sublinkId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const handleNextStep = () => {
    if (activeStep < STEP_LABELS.length - 1) {
      handleStepChange(activeStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      handleStepChange(activeStep - 1);
    } else {
      navigate(ROUTES.UPCOMING_SESSIONS);
    }
  };

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSaveFormChart = () => {
    setIsSuccessModalOpen(true);
  };

  // Construct step definitions for sidebar
  const stepDefs: StepDefinition[] = STEP_LABELS.map(s => ({
    index: s.index,
    label: s.label,
    shortLabel: s.shortLabel,
    completed: visitedSteps.includes(s.index) && s.index < activeStep,
    inProgress: visitedSteps.includes(s.index),
    sublinks: s.sublinks,
  }));

  return (
    <Container>
      <PageHeader
        title={`Counsellor Form Chart — ${formData.studentInfo.studentName}`}
        subtitle="Digitized Class 9 & 10 Counsellor Form Chart recording side-by-side student/parent questionnaires, assessment results, and synthesis notes."
        breadcrumbs={[
          { label: 'Upcoming Sessions', href: ROUTES.UPCOMING_SESSIONS },
          { label: `Chart (${formData.studentInfo.studentName})` },
        ]}
        onBack={() => navigate(ROUTES.UPCOMING_SESSIONS)}
      />

      <LayoutWrapper>
        {/* Left Persistent Sidebar Tracker */}
        <SidebarTracker
          steps={stepDefs}
          activeStep={activeStep}
          activeSublinkId={activeSublinkId}
          onSelectStep={handleStepChange}
        />

        {/* Main Step Content Panel */}
        <MainContentPanel>
          {activeStep === 0 && (
            <Step0StudentInfo
              data={formData.studentInfo}
              onChange={updated =>
                setFormData(prev => ({
                  ...prev,
                  studentInfo: { ...prev.studentInfo, ...updated },
                }))
              }
            />
          )}

          {activeStep === 1 && (
            <Step1SectionA
              data={formData.sectionA}
              studentInfo={formData.studentInfo}
              onChangeNotes={(code, val) =>
                setFormData(prev => ({
                  ...prev,
                  sectionA: {
                    ...prev.sectionA,
                    synthesisNotes: { ...prev.sectionA.synthesisNotes, [code]: val },
                  },
                }))
              }
            />
          )}


          {activeStep === 2 && (
            <Step2SectionB
              data={formData.sectionB}
              onChangeNotesPre={(code, val) =>
                setFormData(prev => ({
                  ...prev,
                  sectionB: {
                    ...prev.sectionB,
                    synthesisNotesPre: { ...prev.sectionB.synthesisNotesPre, [code]: val },
                  },
                }))
              }
              onChangeTraits={traits =>
                setFormData(prev => ({
                  ...prev,
                  sectionB: { ...prev.sectionB, traitsTable: traits },
                }))
              }
              onChangeSummary={summary =>
                setFormData(prev => ({
                  ...prev,
                  sectionB: {
                    ...prev.sectionB,
                    summaryStrip: { ...prev.sectionB.summaryStrip, ...summary },
                  },
                }))
              }
              onChangeDna={(field, val) =>
                setFormData(prev => ({
                  ...prev,
                  sectionB: {
                    ...prev.sectionB,
                    careerDnaNarrative: {
                      ...prev.sectionB.careerDnaNarrative,
                      [field]: val,
                    },
                  },
                }))
              }
              onChangeRedFlags={(key, val) =>
                setFormData(prev => ({
                  ...prev,
                  sectionB: {
                    ...prev.sectionB,
                    redFlags: {
                      ...prev.sectionB.redFlags,
                      [key]: val,
                    },
                  },
                }))
              }
            />
          )}

          {activeStep === 3 && (
            <Step3SectionC
              data={formData.sectionC}
              onChangeNotesPre={(code, val) =>
                setFormData(prev => ({
                  ...prev,
                  sectionC: {
                    ...prev.sectionC,
                    synthesisNotesPre: { ...prev.sectionC.synthesisNotesPre, [code]: val },
                  },
                }))
              }
              onChangeStreamTable={table =>
                setFormData(prev => ({
                  ...prev,
                  sectionC: { ...prev.sectionC, streamFitTable: table },
                }))
              }
              onChangeWhyStream1={val =>
                setFormData(prev => ({
                  ...prev,
                  sectionC: { ...prev.sectionC, whyThisStream1: val },
                }))
              }
              onChangeNotesE={(code, val) =>
                setFormData(prev => ({
                  ...prev,
                  sectionC: {
                    ...prev.sectionC,
                    synthesisNotesE: { ...prev.sectionC.synthesisNotesE, [code]: val },
                  },
                }))
              }
              onChangeGraduationTable={table =>
                setFormData(prev => ({
                  ...prev,
                  sectionC: { ...prev.sectionC, graduationTable: table },
                }))
              }
              onChangeWhyStream2={val =>
                setFormData(prev => ({
                  ...prev,
                  sectionC: { ...prev.sectionC, whyThisStream2: val },
                }))
              }
              onChangeNotesF={(code, val) =>
                setFormData(prev => ({
                  ...prev,
                  sectionC: {
                    ...prev.sectionC,
                    synthesisNotesF: { ...prev.sectionC.synthesisNotesF, [code]: val },
                  },
                }))
              }
              onChangeCompassTable={table =>
                setFormData(prev => ({
                  ...prev,
                  sectionC: { ...prev.sectionC, careerCompassTable: table },
                }))
              }
              onChangeEntranceExamsTable={table =>
                setFormData(prev => ({
                  ...prev,
                  sectionC: { ...prev.sectionC, entranceExamsTable: table },
                }))
              }
              onChangeCollegesTable={table =>
                setFormData(prev => ({
                  ...prev,
                  sectionC: { ...prev.sectionC, collegesTable: table },
                }))
              }
              onChangeCompassClusterTable={table =>
                setFormData(prev => ({
                  ...prev,
                  sectionC: { ...prev.sectionC, careerCompassClusterTable: table },
                }))
              }
            />
          )}

          {activeStep === 4 && (
            <Step4SectionD
              data={formData.sectionD}
              onChangeIndicator={(code, updated) =>
                setFormData(prev => ({
                  ...prev,
                  sectionD: {
                    ...prev.sectionD,
                    indicators: prev.sectionD.indicators.map(ind =>
                      ind.code === code ? { ...ind, ...updated } : ind
                    ),
                  },
                }))
              }
              onChangeNotes={(code, val) =>
                setFormData(prev => ({
                  ...prev,
                  sectionD: {
                    ...prev.sectionD,
                    synthesisNotes: { ...prev.sectionD.synthesisNotes, [code]: val },
                  },
                }))
              }
            />
          )}

          {activeStep === 5 && (
            <Step5SectionE
              data={formData.sectionE}
              onChangeGrid={grid =>
                setFormData(prev => ({
                  ...prev,
                  sectionE: {
                    ...prev.sectionE,
                    roadmapGrid: { ...prev.sectionE.roadmapGrid, ...grid },
                  },
                }))
              }
            />
          )}

          {activeStep === 6 && (
            <Step6SCRI
              data={formData.sectionE}
              onChangeScriRating={(code, rating) =>
                setFormData(prev => ({
                  ...prev,
                  sectionE: {
                    ...prev.sectionE,
                    scriItems: prev.sectionE.scriItems.map(item =>
                      item.code === code ? { ...item, rating } : item
                    ),
                  },
                }))
              }
              onChangeAlignment={alignment =>
                setFormData(prev => ({
                  ...prev,
                  sectionE: { ...prev.sectionE, academicCareerAlignment: alignment },
                }))
              }
              onChangeNotes={(code, val) =>
                setFormData(prev => ({
                  ...prev,
                  sectionE: {
                    ...prev.sectionE,
                    synthesisNotes: { ...prev.sectionE.synthesisNotes, [code]: val },
                  },
                }))
              }
            />
          )}

          {activeStep === 7 && (
            <Step6SectionF
              data={formData.sectionF}
              onChangeNotes={(code, val) =>
                setFormData(prev => ({
                  ...prev,
                  sectionF: {
                    ...prev.sectionF,
                    synthesisNotes: { ...prev.sectionF.synthesisNotes, [code]: val },
                  },
                }))
              }
            />
          )}

          {activeStep === 8 && (
            <Step7SummaryDashboard
              formData={formData}
            />
          )}

          {/* Sticky Bottom Navigation Footer */}
          <StickyFooterNav>
            <Button
              variant="secondary"
              leftIcon={<RiArrowLeftLine size={16} />}
              onClick={handlePrevStep}
            >
              {activeStep === 0 ? 'Back to Sessions' : 'Back'}
            </Button>

            <span style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 500 }}>
              Step {activeStep + 1} of 9 — {STEP_LABELS[activeStep].label}
            </span>

            {activeStep < STEP_LABELS.length - 1 ? (
              <Button
                variant="primary"
                rightIcon={<RiArrowRightLine size={16} />}
                onClick={handleNextStep}
              >
                Next Step
              </Button>
            ) : (
              <Button
                variant="primary"
                leftIcon={<RiCheckDoubleLine size={16} />}
                onClick={handleSaveFormChart}
              >
                Finalize Chart
              </Button>
            )}
          </StickyFooterNav>
        </MainContentPanel>
      </LayoutWrapper>
      <ChartSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        studentName={formData.studentInfo.studentName}
        sessionId={formData.sessionId}
      />
    </Container>
  );
};

export default StudentFormChartPage;
