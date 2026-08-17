import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  RiPrinterLine,
  RiCompass3Line,
  RiUser3Line,
  RiTableLine,
  RiShieldCheckLine,
  RiGitBranchLine,
  RiGraduationCapLine,
  RiCompassLine,
  RiRoadMapLine,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/Button';
import { ROUTES } from '@/constants';
import {
  getMockStudentIkigaiReportData,
  StudentCareerIkigaiReportData,
} from '@/mocks/studentIkigaiReport.mock';

import { IntroductionSection } from './sections/IntroductionSection';
import { StudentProfileSection } from './sections/StudentProfileSection';
import { MyTraitMapSection } from './sections/MyTraitMapSection';
import { ReliabilityDashboardSection } from './sections/ReliabilityDashboardSection';
import { MyStreamFitSection } from './sections/MyStreamFitSection';
import { GraduationPathwaysSection } from './sections/GraduationPathwaysSection';
import { CareerCompassSection } from './sections/CareerCompassSection';
import { RoadmapSection } from './sections/RoadmapSection';

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
} from './StudentCareerIkigaiReportPage.styles';

const TOC_SECTIONS = [
  { id: 'introduction', label: 'Introduction', icon: <RiCompass3Line size={16} /> },
  { id: 'student-profile', label: 'Student Profile', icon: <RiUser3Line size={16} /> },
  { id: 'trait-map', label: 'My Trait Map', icon: <RiTableLine size={16} /> },
  { id: 'reliability-dashboard', label: 'Reliability Dashboard', icon: <RiShieldCheckLine size={16} /> },
  { id: 'stream-fit', label: 'My Stream Fit Class 11 & 12', icon: <RiGitBranchLine size={16} /> },
  { id: 'graduation-pathways', label: 'Graduation Pathways', icon: <RiGraduationCapLine size={16} /> },
  { id: 'career-compass', label: 'My Career Compass', icon: <RiCompassLine size={16} /> },
  { id: 'roadmap', label: 'My Roadmap - Next Steps', icon: <RiRoadMapLine size={16} /> },
];

export const StudentCareerIkigaiReportPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  const [activeSectionId, setActiveSectionId] = useState('introduction');
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  const [reportData] = useState<StudentCareerIkigaiReportData>(() =>
    getMockStudentIkigaiReportData(sessionId || 'sess-counselor-1')
  );

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
  }, []);

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <ReportContainer>
      <PageHeader
        title="PHOENIX WATER CLUB | kREATE Compass Report"
        subtitle={`Student: ${reportData.studentInfo.studentName} (${reportData.studentInfo.gradeClass}) • ${reportData.studentInfo.schoolName}`}
        breadcrumbs={[
          { label: 'Dashboard', href: ROUTES.DASHBOARD },
          { label: 'Upcoming Sessions', href: ROUTES.UPCOMING_SESSIONS },
          { label: `kREATE Compass (${reportData.studentInfo.studentName})` },
        ]}
        onBack={() => navigate(-1)}
        actions={
          localStorage.getItem('pwc_student_feedback_submitted') === 'true' ? (
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
          )
        }
      />

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
          <IntroductionSection data={reportData.introduction} />
          <StudentProfileSection data={reportData.studentProfile} />
          <MyTraitMapSection traits={reportData.traitMap} />
          <ReliabilityDashboardSection metrics={reportData.reliability} />
          <MyStreamFitSection data={reportData.streamFit} />
          <GraduationPathwaysSection data={reportData.graduation} />
          <CareerCompassSection cards={reportData.careerCompass} />
          <RoadmapSection roadmapData={reportData.roadmap} />
        </ReportMainContent>
      </ReportBodyLayout>
    </ReportContainer>
  );
};

export default StudentCareerIkigaiReportPage;
