import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckDoubleLine,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/Button';
import { Loader } from '@/components/Loader';
import { EmptyState } from '@/components/EmptyState';
import { ROUTES } from '@/constants';
import {
  CounsellorFormChartData,
  CollegesAfterItem,
  EntranceExamItem,
} from '@/mocks/studentFormChart.mock';
import { sessionsService } from '@/services/sessions.service';
import { scriBandGuidanceService } from '@/services/scriBandGuidance.service';
import {
  counsellorChartService,
  mapChartToFormData,
  buildSaveBody,
  emptyFormData,
} from '@/services/counsellorChart.service';
import { useToast, useCurrentCounselor } from '@/hooks';
import { getApiErrorMessage, formatFullName } from '@/utils';

import { SidebarTracker, StepDefinition } from './components/SidebarTracker';
import { Step0StudentInfo } from './components/Step0StudentInfo';
import { Step1SectionA } from './components/Step1SectionA';
import { Step2SectionB } from './components/Step2SectionB';
import { Step3SectionC } from './components/Step3SectionC';
import { Step4SectionD } from './components/Step4SectionD';
import { Step5SectionE } from './components/Step5SectionE';
import { Step6SCRI } from './components/Step6SCRI';
import { Step6SectionF } from './components/Step6SectionF';
import { ChartSuccessModal } from './components/ChartSuccessModal';

import {
  Container,
  LayoutWrapper,
  MainContentPanel,
  StickyFooterNav,
  ReadOnlyStepContent,
} from './StudentFormChartPage.styles';
import { ReadOnlyContext } from './ReadOnlyContext';

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
      { id: 'sec-c-target-roles', label: 'Target Roles & Compass' },
      { id: 'sec-c-stream-fit', label: 'Stream Fit & Pathways' },
      { id: 'sec-c-graduation-fit', label: 'Graduation Fit' },
      { id: 'sec-c-colleges', label: 'Colleges After Class 11&12' },
      { id: 'sec-c-entrance-exams', label: 'Entrance Exams' },
    ],
  },
  { index: 4, label: 'Reliability of Assessment', shortLabel: 'D' },
  { index: 5, label: 'Roadmap', shortLabel: 'E' },
  { index: 6, label: 'Student Career Readiness Index (SCRI)', shortLabel: 'SCRI' },
  { index: 7, label: 'Goals & Expectations', shortLabel: 'F' },
];

export const StudentFormChartPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [searchParams] = useSearchParams();
  // Admins browse a student's chart read-only from Project Students — the page's save
  // and mirror-pair mutations assume a counselor identity (see useCurrentCounselor),
  // so this just blocks input interaction rather than reusing the counselor flow.
  const isReadOnly = searchParams.get('readOnly') === '1';
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data: counselor } = useCurrentCounselor();

  const [activeStep, setActiveStep] = useState(0);
  const [activeSublinkId, setActiveSublinkId] = useState<string | undefined>();
  const [visitedSteps, setVisitedSteps] = useState<number[]>([0]);

  // The chart is keyed on studentId server-side; the route only carries sessionId, so
  // resolve the session first.
  const {
    data: session,
    isLoading: isSessionLoading,
    isError: isSessionError,
  } = useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => sessionsService.getById(sessionId!),
    enabled: !!sessionId,
  });

  const studentId = session?.studentId;

  const {
    data: chart,
    isLoading: isChartLoading,
    isError: isChartError,
    error: chartError,
  } = useQuery({
    queryKey: ['counsellor-chart', studentId],
    queryFn: () => counsellorChartService.getChart(studentId!),
    enabled: !!studentId,
  });

  const { data: scriBandGuidance } = useQuery({
    queryKey: ['scri-band-guidance'],
    queryFn: () => scriBandGuidanceService.list(),
    staleTime: Infinity,
  });

  const [formData, setFormData] = useState<CounsellorFormChartData>(() =>
    emptyFormData(sessionId || '', '')
  );
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  // Re-seed local editable state whenever a fresh chart is fetched (initial load, or
  // after a save round-trips the server's merged copy back).
  useEffect(() => {
    if (chart && studentId) {
      setFormData(mapChartToFormData(chart, sessionId || studentId));
      setHasLoadedOnce(true);
    }
  }, [chart, studentId, sessionId]);

  const saveMutation = useMutation({
    mutationFn: (overrideData?: CounsellorFormChartData) => {
      const lastEditedBy = counselor
        ? formatFullName(counselor.user.firstName, counselor.user.lastName)
        : undefined;
      return counsellorChartService.saveChart(
        studentId!,
        buildSaveBody(overrideData ?? formData, lastEditedBy)
      );
    },
    onSuccess: updated => {
      queryClient.setQueryData(['counsellor-chart', studentId], updated);
    },
    onError: err => {
      toast.error('Save Failed', getApiErrorMessage(err, 'Could not save the counsellor chart.'));
    },
  });

  // Amending/reverting a mirror-pair answer re-scores the whole attempt server-side and
  // returns just the AssessmentResultRow (not the full chart shape), so refetch the
  // chart itself rather than trying to patch it — the existing effect above then
  // re-seeds formData from the recomputed report.
  const mirrorPairMutation = useMutation({
    mutationFn: (action: { type: 'amend'; questionCode: string; amendedOption: number } | { type: 'revert'; questionCode: string }) =>
      action.type === 'amend'
        ? counsellorChartService.amendMirrorPair(studentId!, {
            questionCode: action.questionCode,
            amendedOption: action.amendedOption,
            counsellorId: counselor?.id,
          })
        : counsellorChartService.revertMirrorPairAmendment(studentId!, action.questionCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['counsellor-chart', studentId] });
      toast.success('Updated', 'Mirror pair response updated and the assessment re-scored.');
    },
    onError: err => {
      toast.error('Update Failed', getApiErrorMessage(err, 'Could not update the mirror pair response.'));
    },
  });

  const isLoading = isSessionLoading || isChartLoading;
  const isError = isSessionError || isChartError;

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
    } else {
      // The page scrolls inside DashboardLayout's <main> (overflow-y: auto), not the
      // window, so window.scrollTo is a no-op here — scroll that container instead.
      const scrollContainer = document.getElementById('dashboard-content-area');
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Deep link from Super Admin's manual-entry "View" action (?section=sec-c-...) —
  // jump straight to Step 3 / Section C and scroll to that table, once, after the
  // chart has loaded (handleStepChange's scroll relies on the section being rendered).
  useEffect(() => {
    if (!hasLoadedOnce) return;
    const sectionId = searchParams.get('section');
    if (sectionId) {
      handleStepChange(3, sectionId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasLoadedOnce]);

  const handleNextStep = () => {
    if (activeStep < STEP_LABELS.length - 1) {
      handleStepChange(activeStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      handleStepChange(activeStep - 1);
    } else if (isReadOnly) {
      navigate(-1);
    } else {
      navigate(ROUTES.UPCOMING_SESSIONS);
    }
  };

  const handleSaveFormChart = () => {
    saveMutation.mutate(undefined, { onSuccess: () => setIsSuccessModalOpen(true) });
  };

  const handleSaveChanges = () => {
    saveMutation.mutate(undefined, {
      onSuccess: () => toast.success('Saved', 'Your changes have been saved.'),
    });
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

  if (isLoading || !hasLoadedOnce) {
    return <Loader fullPage />;
  }

  if (isError || !studentId) {
    return (
      <Container>
        <PageHeader
          title="Counsellor Form Chart"
          breadcrumbs={
            isReadOnly ? undefined : [{ label: 'Upcoming Sessions', href: ROUTES.UPCOMING_SESSIONS }]
          }
          onBack={() => (isReadOnly ? navigate(-1) : navigate(ROUTES.UPCOMING_SESSIONS))}
        />
        <EmptyState
          title="Couldn't load this chart"
          description={getApiErrorMessage(chartError, 'This student or session could not be found.')}
        />
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader
        title={`Counsellor Form Chart — ${formData.studentInfo.studentName}${isReadOnly ? ' (Read-only)' : ''}`}
        breadcrumbs={
          isReadOnly
            ? [{ label: `Chart (${formData.studentInfo.studentName})` }]
            : [
                { label: 'Upcoming Sessions', href: ROUTES.UPCOMING_SESSIONS },
                { label: `Chart (${formData.studentInfo.studentName})` },
              ]
        }
        onBack={() => (isReadOnly ? navigate(-1) : navigate(ROUTES.UPCOMING_SESSIONS))}
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
        <ReadOnlyStepContent $readOnly={isReadOnly}>
        <ReadOnlyContext.Provider value={isReadOnly}>
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
              studentId={formData.studentId}
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
              onChangeStreamTable={table => {
                const next = {
                  ...formData,
                  sectionC: { ...formData.sectionC, streamFitTable: table },
                };
                setFormData(next);
                saveMutation.mutate(next);
              }}
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
              onChangeGraduationTable={table => {
                const next = {
                  ...formData,
                  sectionC: { ...formData.sectionC, graduationTable: table },
                };
                setFormData(next);
                saveMutation.mutate(next);
              }}
              onChangeNotesF={(code, val) =>
                setFormData(prev => ({
                  ...prev,
                  sectionC: {
                    ...prev.sectionC,
                    synthesisNotesF: { ...prev.sectionC.synthesisNotesF, [code]: val },
                  },
                }))
              }
              onChangeCompassTable={table => {
                const next = {
                  ...formData,
                  sectionC: { ...formData.sectionC, careerCompassTable: table },
                };
                setFormData(next);
                saveMutation.mutate(next);
              }}
              onChangeEntranceExamsTable={table => {
                const next = {
                  ...formData,
                  sectionC: { ...formData.sectionC, entranceExamsTable: table },
                };
                setFormData(next);
                saveMutation.mutate(next);
              }}
              onChangeCollegesTable={table => {
                const next = {
                  ...formData,
                  sectionC: { ...formData.sectionC, collegesTable: table },
                };
                setFormData(next);
                saveMutation.mutate(next);
              }}
              onChangeCollegesAndExamsTable={(colleges: CollegesAfterItem[], exams: EntranceExamItem[]) => {
                // Both tables in one state update + one save — calling the two setters
                // above back-to-back here would race (each captures the same stale
                // `formData` closure, so the second call's save silently reverts the
                // first's field back to its old value).
                const next = {
                  ...formData,
                  sectionC: { ...formData.sectionC, collegesTable: colleges, entranceExamsTable: exams },
                };
                setFormData(next);
                saveMutation.mutate(next);
              }}
              onChangeCompassClusterTable={table => {
                const next = {
                  ...formData,
                  sectionC: { ...formData.sectionC, careerCompassClusterTable: table },
                };
                setFormData(next);
                saveMutation.mutate(next);
              }}
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
              onAmendMirrorPair={(questionCode, amendedOption) =>
                mirrorPairMutation.mutate({ type: 'amend', questionCode, amendedOption })
              }
              onRevertMirrorPair={questionCode =>
                mirrorPairMutation.mutate({ type: 'revert', questionCode })
              }
              mirrorPairActionPending={mirrorPairMutation.isPending}
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
              bandGuidance={scriBandGuidance}
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
        </ReadOnlyContext.Provider>
        </ReadOnlyStepContent>

          {/* Sticky Bottom Navigation Footer */}
          <StickyFooterNav>
            <Button
              variant="secondary"
              leftIcon={<RiArrowLeftLine size={16} />}
              onClick={handlePrevStep}
            >
              {activeStep === 0 ? (isReadOnly ? 'Back' : 'Back to Sessions') : 'Back'}
            </Button>

            <span style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 500 }}>
              Step {activeStep + 1} of {STEP_LABELS.length} — {STEP_LABELS[activeStep].label}
            </span>

            {activeStep < STEP_LABELS.length - 1 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {!isReadOnly && (
                  <Button
                    variant="secondary"
                    onClick={handleSaveChanges}
                    isLoading={saveMutation.isPending}
                  >
                    Save Changes
                  </Button>
                )}
                <Button
                  variant="primary"
                  rightIcon={<RiArrowRightLine size={16} />}
                  onClick={handleNextStep}
                >
                  Next Step
                </Button>
              </div>
            ) : isReadOnly ? (
              <Button variant="secondary" leftIcon={<RiCheckDoubleLine size={16} />} disabled>
                Read-only
              </Button>
            ) : (
              <Button
                variant="primary"
                leftIcon={<RiCheckDoubleLine size={16} />}
                onClick={handleSaveFormChart}
                isLoading={saveMutation.isPending}
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
