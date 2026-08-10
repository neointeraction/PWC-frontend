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
  RiPrinterLine,
  RiNotification3Line,
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
  AttachedStatusBadge,
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
    const meetUrl =
      sessionNum === 1
        ? 'https://meet.google.com/abc-defg-hij'
        : 'https://meet.google.com/xyz-uvwx-rst';
    window.open(meetUrl, '_blank');
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

  // Build the 8 primary student timeline steps
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

    // 3. Assessment Form
    const s3Status: 'completed' | 'current' | 'upcoming' = isAssessmentSubmitted
      ? 'completed'
      : isPreCounsellingSubmitted
      ? 'current'
      : 'upcoming';

    // 4. Booking session 1 & 2
    const s4Status: 'completed' | 'current' | 'upcoming' = isBooked
      ? 'completed'
      : isAssessmentSubmitted
      ? 'current'
      : 'upcoming';

    // 5. Video session 1 (12May 5pm-6pm)
    const s5Status: 'completed' | 'current' | 'upcoming' = isSession1Completed
      ? 'completed'
      : isBooked
      ? 'current'
      : 'upcoming';

    // 6. Video session 2 (15May 5pm-6pm)
    const s6Status: 'completed' | 'current' | 'upcoming' = isSession2Completed
      ? 'completed'
      : isSession1Completed
      ? 'current'
      : 'upcoming';

    // 7. Student Feedback Form
    const s7Status: 'completed' | 'current' | 'upcoming' = isStudentFeedbackSubmitted
      ? 'completed'
      : isSession2Completed
      ? 'current'
      : 'upcoming';

    // 8. IKigai Report
    const s8Status: 'completed' | 'current' | 'upcoming' = isStudentFeedbackSubmitted
      ? 'current'
      : 'upcoming';

    return [
      {
        id: 1,
        title: 'Student Profile Form',
        subtext: isProfileCompleted ? 'Completed' : 'Mandatory Step 1 — Personal & Parent Details',
        status: s1Status,
        attachedStatus: null,
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
        attachedStatus: !isParentFormSubmitted ? (
          <AttachedStatusBadge $variant="warning">
            <RiNotification3Line size={13} style={{ color: '#D97706' }} />
            <span>waiting for parent to fill the pre counselling form</span>
          </AttachedStatusBadge>
        ) : (
          <AttachedStatusBadge $variant="success">
            <RiCheckLine size={13} />
            <span>Parent Form Completed</span>
          </AttachedStatusBadge>
        ),
        action: (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {isProfileCompleted && !isPreCounsellingSubmitted && (
              <Button
                variant="primary"
                size="sm"
                leftIcon={<RiPlayCircleLine size={16} />}
                onClick={() => navigate(ROUTES.PRE_COUNSELLING_FORM)}
              >
                Start Student Form
              </Button>
            )}
            {isPreCounsellingSubmitted && !isParentFormSubmitted && (
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<RiUserHeartLine size={16} />}
                onClick={handleParentFormSubmit}
              >
                Complete Parent Form
              </Button>
            )}
          </div>
        ),
      },
      {
        id: 3,
        title: 'Assessment Form',
        subtext: isAssessmentSubmitted
          ? 'Completed'
          : isPreCounsellingSubmitted
          ? 'Step 3 — Psychometric abilities & career interest assessment'
          : 'Locked — Complete Pre-Counselling Form first',
        status: s3Status,
        attachedStatus: null,
        action: isPreCounsellingSubmitted && !isAssessmentSubmitted ? (
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
        id: 4,
        title: 'Booking session 1 & 2',
        subtext: isBooked
          ? 'Sessions Scheduled'
          : isAssessmentSubmitted
          ? 'Select dates and book 1-on-1 counseling video calls'
          : 'Locked — Complete Assessment Form first',
        status: s4Status,
        attachedStatus: null,
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
        id: 5,
        title: 'Video session 1',
        subtext: isSession1Completed
          ? `Completed (${s1SlotStr || 'May 12, 5pm-6pm'}) • Counsellor Notes Added by Sarah Jenkins`
          : isBooked
          ? `Scheduled (${s1SlotStr || 'May 12, 5pm-6pm'}) • Email & WA Reminders Dispatched`
          : 'Initial Career Exploration Call',
        status: s5Status,
        attachedStatus: null,
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
        id: 6,
        title: 'Video session 2',
        subtext: isSession2Completed
          ? `Completed (${s2SlotStr || 'May 15, 5pm-6pm'}) • Final Stream & Roadmap Notes Added`
          : isSession1Completed
          ? `Active Session 2 (${s2SlotStr || 'May 15, 5pm-6pm'}) • Email & WA Reminders Dispatched`
          : 'Ikigai & Stream Review Call',
        status: s6Status,
        attachedStatus: null,
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
        id: 7,
        title: 'Student Feedback Form',
        subtext: isStudentFeedbackSubmitted
          ? 'Completed'
          : isSession2Completed
          ? 'Share your feedback on the counseling experience'
          : 'Locked — Complete Session 2 first',
        status: s7Status,
        attachedStatus: !isParentFeedbackSubmitted ? (
          <AttachedStatusBadge $variant="warning">
            <RiNotification3Line size={13} style={{ color: '#D97706' }} />
            <span>waiting for parent feedback</span>
          </AttachedStatusBadge>
        ) : (
          <AttachedStatusBadge $variant="success">
            <RiCheckLine size={13} />
            <span>Parent Feedback Completed</span>
          </AttachedStatusBadge>
        ),
        action: (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {isSession2Completed && !isStudentFeedbackSubmitted && (
              <Button
                variant="primary"
                size="sm"
                leftIcon={<RiFileTextLine size={16} />}
                onClick={() => navigate(ROUTES.STUDENT_FEEDBACK_FORM)}
              >
                Complete Student Feedback
              </Button>
            )}
            {isStudentFeedbackSubmitted && !isParentFeedbackSubmitted && (
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<RiFileTextLine size={16} />}
                onClick={handleParentFeedbackSubmit}
              >
                Complete Parent Feedback
              </Button>
            )}
          </div>
        ),
      },
      {
        id: 8,
        title: 'IKigai Report',
        subtext: isStudentFeedbackSubmitted
          ? 'Your official Ikigai career roadmap report is ready to view'
          : 'Unlock your official Ikigai career roadmap report',
        status: s8Status,
        attachedStatus: null,
        action:
          s8Status !== 'upcoming' ? (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<RiPrinterLine size={16} />}
              onClick={() =>
                navigate(ROUTES.GENERATE_REPORT.replace(':sessionId', 'sess-counselor-1'))
              }
            >
              View Ikigai Report
            </Button>
          ) : null,
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
                Follow the 8 milestone steps to complete your counseling and receive your Ikigai Report.
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
                    {step.attachedStatus}
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
