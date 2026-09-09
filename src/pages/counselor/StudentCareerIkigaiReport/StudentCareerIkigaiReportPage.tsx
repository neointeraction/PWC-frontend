import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  RiPrinterLine,
  RiUser3Line,
  RiTableLine,
  RiShieldCheckLine,
  RiGitBranchLine,
  RiGraduationCapLine,
  RiCompassLine,
  RiChat3Line,
  RiRefreshLine,
  RiCheckLine,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/Button';
import { Loader } from '@/components/Loader';
import { EmptyState } from '@/components/EmptyState';
import { ROUTES } from '@/constants';
import { sessionsService } from '@/services/sessions.service';
import { reportsService } from '@/services/reports.service';
import { counsellorChartService } from '@/services/counsellorChart.service';
import { getApiErrorMessage, getApiErrorStatus, formatFullName } from '@/utils';
import { useToast } from '@/hooks';

import { StudentProfileSection } from './sections/StudentProfileSection';
import { MyTraitMapSection } from './sections/MyTraitMapSection';
import { ReliabilityDashboardSection } from './sections/ReliabilityDashboardSection';
import { MyStreamFitSection } from './sections/MyStreamFitSection';
import { GraduationPathwaysSection } from './sections/GraduationPathwaysSection';
import { CareerCompassSection } from './sections/CareerCompassSection';
import { CounselorCommentsSection } from './sections/CounselorCommentsSection';
import { PrintReportContent } from './sections/print/PrintReportContent';

import { Badge } from '@/components/Badge';
import { Tooltip } from '@/components/Tooltip';
import {
  ReportContainer,
  ReportBodyLayout,
  TocSidebar,
  TocHeader,
  TocList,
  TocItemLink,
  ReportMainContent,
  StudentProfileSidebarCard,
  StudentAvatarCircle,
  StudentNameTitle,
  StudentDetailSubtext,
  ScreenOnlyHeader,
} from './StudentCareerIkigaiReportPage.styles';

const TOC_SECTIONS = [
  { id: 'student-profile', label: "Champion's Profile", icon: <RiUser3Line size={16} /> },
  { id: 'trait-map', label: 'My Trait Map', icon: <RiTableLine size={16} /> },
  { id: 'reliability-dashboard', label: 'Reliability Dashboard', icon: <RiShieldCheckLine size={16} /> },
  { id: 'stream-fit', label: 'My Stream Fit Class 11 & 12', icon: <RiGitBranchLine size={16} /> },
  { id: 'graduation-pathways', label: 'Graduation Pathways', icon: <RiGraduationCapLine size={16} /> },
  { id: 'career-compass', label: 'My Career Compass', icon: <RiCompassLine size={16} /> },
  { id: 'counselor-comments', label: "Counsellor's Comments", icon: <RiChat3Line size={16} /> },
];

export const StudentCareerIkigaiReportPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const [activeSectionId, setActiveSectionId] = useState('student-profile');
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  // The report is keyed on studentId server-side; the route only carries sessionId, so
  // resolve the session first (also gives us the counsellor's name for the header).
  const {
    data: session,
    isLoading: isSessionLoading,
    isError: isSessionError,
    error: sessionError,
    refetch: refetchSession,
    isFetching: isSessionFetching,
  } = useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => sessionsService.getById(sessionId!),
    enabled: !!sessionId,
  });

  const studentId = session?.studentId;
  const counselorName = session
    ? formatFullName(session.counsellor.user.firstName, session.counsellor.user.lastName)
    : '';

  const {
    data: reportData,
    isLoading: isReportLoading,
    isError: isReportError,
    error: reportError,
    refetch: refetchReport,
    isFetching: isReportFetching,
  } = useQuery({
    queryKey: ['student-assessment-report', studentId],
    queryFn: () => reportsService.getStudentAssessmentReport(studentId!, counselorName),
    enabled: !!studentId,
  });

  // Counsellor's synthesis notes from the Counsellor Chart — surfaced here as
  // "Counsellor's Comments" so the student/parent can see them alongside the report.
  const {
    data: counsellorChart,
    refetch: refetchChart,
    isFetching: isChartFetching,
  } = useQuery({
    queryKey: ['counsellor-chart', studentId],
    queryFn: () => counsellorChartService.getChart(studentId!),
    enabled: !!studentId,
  });

  const acceptReportMutation = useMutation({
    mutationFn: () => reportsService.acceptReport(studentId!),
    onSuccess: () => {
      setIsAccepted(true);
      toast.success('Report Accepted', 'The counsellor has been notified that you accepted this report.');
    },
    onError: err => {
      toast.error('Could Not Accept Report', getApiErrorMessage(err, 'Please try again.'));
    },
  });

  const isRefreshing = isSessionFetching || isReportFetching || isChartFetching;
  const handleRefresh = () => {
    refetchSession();
    refetchReport();
    refetchChart();
  };

  // Shown once the counsellor has finalized the chart after Session 2 — the student is
  // asked whether they're happy with the report before moving on to Feedback.
  const canAcceptReport = session?.sessionNumber === 'SESSION_2' && !!counsellorChart?.counsellor.finalizedAt;

  const isLoading = isSessionLoading || isReportLoading;
  const isError = isSessionError || isReportError;
  // A 401/403 here means the account isn't authorized to read this session/report — a
  // permissions problem, not an incomplete assessment — so it needs its own message
  // rather than falling through to the generic "not completed" copy below.
  const isForbidden =
    [sessionError, reportError].some(err => {
      const status = getApiErrorStatus(err);
      return status === 401 || status === 403;
    });

  const handleScrollToSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    setMobileTocOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  // IntersectionObserver to accurately track active section on window/page scroll
  useEffect(() => {
    if (!reportData) return undefined;

    const observerCallback: IntersectionObserverCallback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSectionId(entry.target.id);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null, // Track viewport scroll
      rootMargin: '-100px 0px -65% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    TOC_SECTIONS.forEach(section => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [reportData]);

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  if (isLoading) {
    return <Loader fullPage />;
  }

  if (isError || !reportData) {
    return (
      <ReportContainer>
        <PageHeader
          title="kREATE Compass Report"
          breadcrumbs={[{ label: 'Dashboard', href: ROUTES.DASHBOARD }]}
          onBack={() => navigate(-1)}
        />
        <EmptyState
          title={isForbidden ? "You don't have access to this report" : 'Report not available yet'}
          description={
            isForbidden
              ? "Your account doesn't have permission to view this session right now. This is usually a backend access issue rather than anything wrong with your assessment — please contact support if it persists."
              : getApiErrorMessage(
                  reportError,
                  "This student hasn't completed the assessment yet, so the report can't be generated."
                )
          }
        />
      </ReportContainer>
    );
  }

  return (
    <ReportContainer>
      <ScreenOnlyHeader>
      <PageHeader
        title="kREATE Compass Report"
        breadcrumbs={[
          { label: 'Dashboard', href: ROUTES.DASHBOARD },
          { label: `kREATE Compass (${reportData.studentInfo.studentName})` },
        ]}
        onBack={() => navigate(-1)}
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <Button
              variant="secondary"
              leftIcon={<RiRefreshLine size={18} />}
              onClick={handleRefresh}
              isLoading={isRefreshing}
              title="Fetch the latest report data and counsellor comments"
            >
              Refresh
            </Button>

            {canAcceptReport && (
              <Button
                variant="primary"
                leftIcon={<RiCheckLine size={18} />}
                onClick={() => acceptReportMutation.mutate()}
                isLoading={acceptReportMutation.isPending}
                disabled={isAccepted}
              >
                {isAccepted ? 'Report Accepted' : 'Accept the Report'}
              </Button>
            )}

            {localStorage.getItem('pwc_student_feedback_submitted') === 'true' ? (
              <Button
                variant="primary"
                leftIcon={<RiPrinterLine size={18} />}
                onClick={handleDownloadPdf}
              >
                Download as PDF
              </Button>
            ) : (
              <Tooltip content="Download is unlocked after completing the Feedback step">
                <div>
                  <Button
                    variant="secondary"
                    leftIcon={<RiPrinterLine size={18} />}
                    disabled
                    title="Download is unlocked after completing the Feedback step"
                  >
                    Download as PDF (Locked)
                  </Button>
                </div>
              </Tooltip>
            )}
          </div>
        }
      />
      </ScreenOnlyHeader>

      <ReportBodyLayout>
        {/* Persistent Left Sidebar Table of Contents */}
        <TocSidebar $isOpenOnMobile={mobileTocOpen}>
          {/* Prominent Student Profile Card above TOC */}
          <StudentProfileSidebarCard>
            <StudentAvatarCircle>
              {getInitials(reportData.studentInfo.studentName)}
            </StudentAvatarCircle>
            <div>
              <StudentNameTitle>{reportData.studentInfo.studentName}</StudentNameTitle>
              <StudentDetailSubtext>{reportData.studentInfo.gradeClass}</StudentDetailSubtext>
            </div>
            <StudentDetailSubtext style={{ fontWeight: 500 }}>
              {reportData.studentInfo.schoolName}
            </StudentDetailSubtext>
            <Badge variant="success" size="sm">
              IKIGAI Report Generated
            </Badge>
          </StudentProfileSidebarCard>

          <TocHeader>Table of Contents</TocHeader>
          <TocList>
            {TOC_SECTIONS.map(item => (
              <TocItemLink
                key={item.id}
                $active={activeSectionId === item.id}
                onClick={() => handleScrollToSection(item.id)}
                type="button"
              >
                {item.icon}
                <span>{item.label}</span>
              </TocItemLink>
            ))}
          </TocList>
        </TocSidebar>

        {/* Scrollable Right Main Content Area */}
        <ReportMainContent id="report-main-content">
          <StudentProfileSection data={reportData.studentProfile} />
          <MyTraitMapSection traits={reportData.traitMap} />
          <ReliabilityDashboardSection metrics={reportData.reliability} />
          <MyStreamFitSection data={reportData.streamFit} />
          <GraduationPathwaysSection data={reportData.graduation} />
          <CareerCompassSection cards={reportData.careerCompass} />
          <CounselorCommentsSection notes={counsellorChart?.counsellor.notes ?? {}} />
        </ReportMainContent>
      </ReportBodyLayout>

      {/* Print/"Download as PDF"-only view, styled to match the reference kREATE Compass
          PDF. Hidden on screen (see PrintRoot) — everything above stays exactly as-is. */}
      <PrintReportContent reportData={reportData} counsellorChart={counsellorChart} />
    </ReportContainer>
  );
};

export default StudentCareerIkigaiReportPage;
