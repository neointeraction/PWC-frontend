import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RiCalendarEventLine,
  RiCompass3Line,
  RiBuilding4Line,
  RiGraduationCapLine,
  RiVideoChatLine,
  RiUser3Line,
  RiPlayCircleLine,
  RiCheckLine,
  RiRouteLine,
  RiUserHeartLine,
  RiFileTextLine,
} from 'react-icons/ri';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/constants';
import { useToast } from '@/hooks';
import { StudentProfileFormModal } from './components/StudentProfileFormModal';
import {
  PortalContainer,
  WelcomeBanner,
  BannerText,
  BannerTitle,
  BannerSubtitle,
  BadgePill,
  TimelineWidgetCard,
  TimelineWidgetHeader,
  TimelineTitleGroup,
  TimelineTitle,
  TimelineSubtitle,
  TimelineList,
  TimelineItem,
  NodeColumn,
  NodeDot,
  LineStem,
  ItemContent,
  ItemTextGroup,
  ItemTitle,
  ItemSubtext,
  IconBox,
} from './StudentPortalPage.styles';

export const StudentPortalPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const user = useAuthStore(state => state.user);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isProfileCompleted, setIsProfileCompleted] = useState<boolean>(false);
  const [isPreCounsellingSubmitted, setIsPreCounsellingSubmitted] = useState<boolean>(false);
  const [isParentFormSubmitted, setIsParentFormSubmitted] = useState<boolean>(false);
  const [isAssessmentSubmitted, setIsAssessmentSubmitted] = useState<boolean>(false);
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [isSession1Completed, setIsSession1Completed] = useState<boolean>(false);
  const [isSession2Completed, setIsSession2Completed] = useState<boolean>(false);
  const [isSimulate10MinsBefore] = useState<boolean>(false);
  const [s1SlotStr, setS1SlotStr] = useState<string>('');
  const [s2SlotStr, setS2SlotStr] = useState<string>('');
  const [isStudentFeedbackSubmitted, setIsStudentFeedbackSubmitted] = useState<boolean>(false);
  const [isParentFeedbackSubmitted, setIsParentFeedbackSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const profileDone = localStorage.getItem('pwc_student_profile_completed') === 'true';
    const preCounsellingDone =
      localStorage.getItem('pwc_precounselling_submitted') === 'true' ||
      localStorage.getItem('pwc_student_precounseling_form_submitted') === 'true';
    const parentDone = localStorage.getItem('pwc_parent_form_submitted') === 'true';
    const assessmentDone = localStorage.getItem('pwc_assessment_form_submitted') === 'true';
    const bookedDone = localStorage.getItem('pwc_sessions_booked') === 'true';
    const s1Done = localStorage.getItem('pwc_session_1_completed') === 'true';
    const s2Done = localStorage.getItem('pwc_session_2_completed') === 'true';
    const slot1 = localStorage.getItem('pwc_session_1_slot') || 'May 12, 2026 • 05:00 PM - 06:00 PM';
    const slot2 = localStorage.getItem('pwc_session_2_slot') || 'May 15, 2026 • 05:00 PM - 06:00 PM';
    const studentFeedbackDone = localStorage.getItem('pwc_student_feedback_submitted') === 'true';
    const parentFeedbackDone = localStorage.getItem('pwc_parent_feedback_submitted') === 'true';

    setIsProfileCompleted(profileDone);
    setIsPreCounsellingSubmitted(preCounsellingDone);
    setIsParentFormSubmitted(parentDone);
    setIsAssessmentSubmitted(assessmentDone);
    setIsBooked(bookedDone);
    setIsSession1Completed(s1Done);
    setIsSession2Completed(s2Done);
    setS1SlotStr(slot1);
    setS2SlotStr(slot2);
    setIsStudentFeedbackSubmitted(studentFeedbackDone);
    setIsParentFeedbackSubmitted(parentFeedbackDone);
  }, []);

  const handleStartSession = (sessionNum: number) => {
    toast.info(
      `Launching Video Session ${sessionNum}`,
      `Connecting to video counseling room with Sarah Jenkins (M.Sc Psych)...`
    );
  };

  const handleBookWorkflow = () => {
    navigate(ROUTES.BOOK_SESSIONS);
  };

  const handleCompleteSession1 = () => {
    localStorage.setItem('pwc_session_1_completed', 'true');
    setIsSession1Completed(true);
    toast.success(
      'Session 1 Completed!',
      'Session 1 has been marked as completed. Session 2 card is now active on your dashboard.'
    );
  };

  const handleCompleteSession2 = () => {
    localStorage.setItem('pwc_session_2_completed', 'true');
    setIsSession2Completed(true);
    toast.success(
      'Session 2 Completed!',
      'Session 2 completed. Feedback & Ikigai Report unlocked!'
    );
  };

  const handleParentFormSubmit = () => {
    setIsParentFormSubmitted(true);
    localStorage.setItem('pwc_parent_form_submitted', 'true');
    toast.success(
      'Pre-Counselling Form Parent Completed!',
      "Parent form marked as completed (Form link sent via email to parent)."
    );
  };

  const handleParentFeedbackSubmit = () => {
    setIsParentFeedbackSubmitted(true);
    localStorage.setItem('pwc_parent_feedback_submitted', 'true');
    toast.success(
      'Parent Feedback Completed!',
      "Parent feedback form marked as completed."
    );
  };

  // Build the 12 timeline steps
  const getTimelineSteps = () => {
    // 1. Student Profile Form
    const s1Status: 'completed' | 'current' | 'upcoming' = isProfileCompleted
      ? 'completed'
      : 'current';

    // 2. Pre-Counselling Form Student
    const s2Status: 'completed' | 'current' | 'upcoming' = isPreCounsellingSubmitted
      ? 'completed'
      : isProfileCompleted
      ? 'current'
      : 'upcoming';

    // 3. Pre-Counselling Form Parent
    const s3Status: 'completed' | 'current' | 'upcoming' = isParentFormSubmitted
      ? 'completed'
      : isPreCounsellingSubmitted
      ? 'current'
      : 'upcoming';

    // 4. Assessment Form
    const s4Status: 'completed' | 'current' | 'upcoming' = isAssessmentSubmitted
      ? 'completed'
      : isParentFormSubmitted
      ? 'current'
      : 'upcoming';

    // 5. Booking session 1 & 2
    const s5Status: 'completed' | 'current' | 'upcoming' = isBooked
      ? 'completed'
      : isAssessmentSubmitted
      ? 'current'
      : 'upcoming';

    // 6. Video session 1 (12May 5pm-6pm)
    const s6Status: 'completed' | 'current' | 'upcoming' = isSession1Completed
      ? 'completed'
      : isBooked
      ? 'current'
      : 'upcoming';

    // 7. Counsellor adding notes
    const s7Status: 'completed' | 'current' | 'upcoming' = isSession1Completed ? 'completed' : 'upcoming';

    // 8. Video session 2 (15May 5pm-6pm)
    const s8Status: 'completed' | 'current' | 'upcoming' = isSession2Completed
      ? 'completed'
      : isSession1Completed
      ? 'current'
      : 'upcoming';

    // 9. Counsellor adding notes
    const s9Status: 'completed' | 'current' | 'upcoming' = isSession2Completed ? 'completed' : 'upcoming';

    // 10. Student Feedback Form
    const s10Status: 'completed' | 'current' | 'upcoming' = isStudentFeedbackSubmitted
      ? 'completed'
      : isSession2Completed
      ? 'current'
      : 'upcoming';

    // 11. Parent Feedback Form
    const s11Status: 'completed' | 'current' | 'upcoming' = isParentFeedbackSubmitted
      ? 'completed'
      : isStudentFeedbackSubmitted
      ? 'current'
      : 'upcoming';

    // 12. IKigai Report
    const s12Status: 'completed' | 'current' | 'upcoming' = isParentFeedbackSubmitted
      ? 'current'
      : 'upcoming';

    return [
      {
        id: 1,
        title: 'Student Profile Form',
        subtext: isProfileCompleted ? 'Completed' : 'Mandatory Step 1 — Personal & Parent Details',
        status: s1Status,
        action: !isProfileCompleted ? (
          <Button
            variant="primary"
            size="sm"
            leftIcon={<RiUser3Line size={16} />}
            onClick={() => navigate(ROUTES.STUDENT_PROFILE_FORM)}
          >
            Fill Profile Form
          </Button>
        ) : null,
      },
      {
        id: 2,
        title: 'Pre-Counselling Form Student',
        subtext: isPreCounsellingSubmitted
          ? 'Submitted'
          : isProfileCompleted
          ? 'Step 2 — Ready to start 20-min interest assessment'
          : 'Locked — Complete Student Profile Form first',
        status: s2Status,
        action: isProfileCompleted && !isPreCounsellingSubmitted ? (
          <Button
            variant="primary"
            size="sm"
            leftIcon={<RiPlayCircleLine size={16} />}
            onClick={() => navigate(ROUTES.PRE_COUNSELLING_FORM)}
          >
            Start Student Form
          </Button>
        ) : null,
      },
      {
        id: 3,
        title: 'Pre-Counselling Form Parent',
        subtext: isParentFormSubmitted
          ? 'Completed (Submitted via email link)'
          : isPreCounsellingSubmitted
          ? 'Step 3 — Form link sent via email to parent. Click to complete.'
          : 'Locked — Complete Student Form first',
        status: s3Status,
        action: isPreCounsellingSubmitted && !isParentFormSubmitted ? (
          <Button
            variant="primary"
            size="sm"
            leftIcon={<RiUserHeartLine size={16} />}
            onClick={handleParentFormSubmit}
          >
            Complete Parent Form
          </Button>
        ) : null,
      },
      {
        id: 4,
        title: 'Assessment Form',
        subtext: isAssessmentSubmitted
          ? 'Completed'
          : isParentFormSubmitted
          ? 'Step 4 — Psychometric abilities & career interest assessment'
          : 'Locked — Complete Pre-Counselling Form Parent first',
        status: s4Status,
        action: isParentFormSubmitted && !isAssessmentSubmitted ? (
          <Button
            variant="primary"
            size="sm"
            leftIcon={<RiFileTextLine size={16} />}
            onClick={() => navigate(ROUTES.ASSESSMENT_FORM)}
          >
            Start Assessment Form
          </Button>
        ) : null,
      },
      {
        id: 5,
        title: 'Booking session 1 & 2',
        subtext: isBooked
          ? 'Sessions Scheduled'
          : isAssessmentSubmitted
          ? 'Select dates and book 1-on-1 counseling video calls'
          : 'Locked — Complete Assessment Form first',
        status: s5Status,
        action: isAssessmentSubmitted && !isBooked ? (
          <Button
            variant="primary"
            size="sm"
            leftIcon={<RiCalendarEventLine size={16} />}
            onClick={handleBookWorkflow}
          >
            Book Sessions 1 & 2
          </Button>
        ) : null,
      },
      {
        id: 6,
        title: 'Video session 1',
        subtext: isSession1Completed
          ? `Completed (${s1SlotStr || 'May 12, 5pm-6pm'})`
          : isBooked
          ? `Scheduled (${s1SlotStr || 'May 12, 5pm-6pm'}) • Email & WA Reminders Dispatched`
          : 'Initial Career Exploration Call',
        status: s6Status,
        action: isBooked && !isSession1Completed ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<RiVideoChatLine size={16} />}
              onClick={() => handleStartSession(1)}
            >
              {isSimulate10MinsBefore ? 'Join Video Call (Active)' : 'Join Video Call'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<RiCheckLine size={16} />}
              onClick={handleCompleteSession1}
            >
              Mark Session 1 Completed
            </Button>
          </div>
        ) : null,
      },
      {
        id: 7,
        title: 'Counsellor adding notes',
        subtext: isSession1Completed ? 'Session 1 Notes Added by Sarah Jenkins' : 'Session 1 summary & counselor insights',
        status: s7Status,
      },
      {
        id: 8,
        title: 'Video session 2',
        subtext: isSession2Completed
          ? `Completed (${s2SlotStr || 'May 15, 5pm-6pm'})`
          : isSession1Completed
          ? `Active Session 2 (${s2SlotStr || 'May 15, 5pm-6pm'}) • Email & WA Reminders Dispatched`
          : 'Ikigai & Stream Review Call',
        status: s8Status,
        action: isSession1Completed && !isSession2Completed ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<RiVideoChatLine size={16} />}
              onClick={() => handleStartSession(2)}
            >
              {isSimulate10MinsBefore ? 'Join Video Call (Active)' : 'Join Video Call'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<RiCheckLine size={16} />}
              onClick={handleCompleteSession2}
            >
              Mark Session 2 Completed
            </Button>
          </div>
        ) : null,
      },
      {
        id: 9,
        title: 'Counsellor adding notes',
        subtext: 'Final stream recommendations & roadmap',
        status: s9Status,
      },
      {
        id: 10,
        title: 'Student Feedback Form',
        subtext: isStudentFeedbackSubmitted
          ? 'Completed'
          : isSession2Completed
          ? 'Share your feedback on the counseling experience'
          : 'Locked — Complete Session 2 first',
        status: s10Status,
        action: isSession2Completed && !isStudentFeedbackSubmitted ? (
          <Button
            variant="primary"
            size="sm"
            leftIcon={<RiFileTextLine size={16} />}
            onClick={() => navigate(ROUTES.STUDENT_FEEDBACK_FORM)}
          >
            Complete Student Feedback
          </Button>
        ) : null,
      },
      {
        id: 11,
        title: 'Parent Feedback Form',
        subtext: isParentFeedbackSubmitted
          ? 'Completed'
          : isStudentFeedbackSubmitted
          ? 'Share your feedback on the counseling experience'
          : 'Locked — Complete Student Feedback first',
        status: s11Status,
        action: isStudentFeedbackSubmitted && !isParentFeedbackSubmitted ? (
          <Button
            variant="primary"
            size="sm"
            leftIcon={<RiFileTextLine size={16} />}
            onClick={handleParentFeedbackSubmit}
          >
            Complete Parent Feedback
          </Button>
        ) : null,
      },
      {
        id: 12,
        title: 'IKigai Report',
        subtext: isParentFeedbackSubmitted
          ? 'Unlock your official Ikigai career roadmap report'
          : 'Locked — Complete Feedback Forms first',
        status: s12Status,
      },
    ];
  };

  const steps = getTimelineSteps();
  const completedCount = steps.filter(s => s.status === 'completed').length;
  const overallPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <PortalContainer>
      {/* Welcome Banner */}
      <WelcomeBanner>
        <BannerText>
          <BannerTitle>Welcome back, {user?.name || 'Alex Johnson'}!</BannerTitle>
          <BannerSubtitle>
            <RiGraduationCapLine size={16} /> Grade 11 - Science
            <BadgePill>
              <RiBuilding4Line size={12} style={{ display: 'inline', marginRight: 4 }} />
              St. Xavier&apos;s Senior Secondary School
            </BadgePill>
          </BannerSubtitle>
        </BannerText>
        <Button
          variant="secondary"
          size="md"
          leftIcon={<RiCompass3Line size={18} />}
          onClick={() => navigate(ROUTES.CAREER_LIBRARY)}
          style={{ background: 'rgba(255, 255, 255, 0.95)', color: '#5D2384', border: 'none' }}
        >
          Explore Careers
        </Button>
      </WelcomeBanner>

      {/* DYNAMIC VERTICAL TIMELINE PROGRESS WIDGET */}
      <TimelineWidgetCard>
        <TimelineWidgetHeader>
          <TimelineTitleGroup>
            <IconBox $color="#5D2384" $bg="#F4ECF8">
              <RiRouteLine size={24} />
            </IconBox>

            <div>
              <TimelineTitle>Your Counseling Journey Progress</TimelineTitle>
              <TimelineSubtitle>
                Follow the 12 milestone steps to complete your counseling and receive your Ikigai Report.
              </TimelineSubtitle>
            </div>
          </TimelineTitleGroup>

          <Badge variant={completedCount === steps.length ? 'success' : 'primary'} size="md">
            {completedCount} of {steps.length} Steps Completed ({overallPercent}%)
          </Badge>
        </TimelineWidgetHeader>

        <TimelineList>
          {steps.map((step, idx) => (
            <TimelineItem key={step.id}>
              <NodeColumn>
                <NodeDot $status={step.status}>
                  {step.status === 'completed' ? (
                    <RiCheckLine size={14} />
                  ) : step.status === 'current' ? (
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
                  ) : (
                    <span style={{ fontSize: 10 }}>{step.id}</span>
                  )}
                </NodeDot>

                {idx < steps.length - 1 && (
                  <LineStem $completed={step.status === 'completed'} />
                )}
              </NodeColumn>

              <ItemContent>
                <ItemTextGroup>
                  <ItemTitle $status={step.status}>
                    {step.title}
                    {step.status === 'completed' && (
                      <span style={{ marginLeft: 8 }}>
                        <Badge variant="success" size="sm">
                          Completed
                        </Badge>
                      </span>
                    )}
                    {step.status === 'current' && (
                      <span style={{ marginLeft: 8 }}>
                        <Badge variant="primary" size="sm">
                          In Progress
                        </Badge>
                      </span>
                    )}
                  </ItemTitle>
                  <ItemSubtext>{step.subtext}</ItemSubtext>
                </ItemTextGroup>

                {step.action && <div>{step.action}</div>}
              </ItemContent>
            </TimelineItem>
          ))}
        </TimelineList>
      </TimelineWidgetCard>

      {/* Student Profile Form Modal */}
      <StudentProfileFormModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        initialName={user?.name || 'Alex Johnson'}
        initialEmail={user?.email || 'student@pwc.com'}
        onSuccess={() => {
          setIsProfileCompleted(true);
          localStorage.setItem('pwc_student_profile_completed', 'true');
        }}
      />
    </PortalContainer>
  );
};

export default StudentPortalPage;
