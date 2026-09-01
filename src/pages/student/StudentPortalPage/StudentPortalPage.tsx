import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
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
  RiFileTextLine,
  RiPrinterLine,
  RiNotification3Line,
  RiCalendarLine,
  RiCloseCircleLine,
  RiRefreshLine,
  RiFileCopyLine,
  RiEyeLine,
} from 'react-icons/ri';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { AlertModal } from '@/components/AlertModal';
import { Tooltip } from '@/components/Tooltip';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/constants';
import { useToast, useCurrentStudent } from '@/hooks';
import { studentService, deriveStudentProgress } from '@/services/student.service';
import { sessionsService, Session, isWithinJoinWindow } from '@/services/sessions.service';
import { getApiErrorMessage } from '@/utils';
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
  TestWidgetCard,
  TestWidgetContent,
  TestWidgetInfo,
  TestWidgetTitle,
  TestWidgetDesc,
  SessionCardWrapper,
  SessionCardHeader,
  SessionCardTitle,
  SessionJoinButton,
  SessionDateTimeRow,
  SessionActionLinksRow,
  SessionActionLink,
  SessionLinkDivider,
} from './StudentPortalPage.styles';

const formatTime = (t: string): string => dayjs(`2000-01-01T${t}`).format('hh:mm A');
const formatSlotRange = (s?: Session): string =>
  s ? `${dayjs(s.scheduledDate).format('MMM D, YYYY')} • ${formatTime(s.startTime)} - ${formatTime(s.endTime)}` : '';

export const StudentPortalPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const user = useAuthStore(state => state.user);
  const queryClient = useQueryClient();

  // Real student record (Student id, cohort, workflow stage) + per-form submission flags.
  const { data: me } = useCurrentStudent();
  const { data: formsStatus } = useQuery({
    queryKey: ['student-forms-status', me?.id],
    queryFn: () => studentService.getFormsStatus(me!.id),
    enabled: !!me?.id,
    staleTime: 60_000,
  });
  const { data: sessions } = useQuery({
    queryKey: ['student-sessions', me?.id],
    queryFn: () => sessionsService.getStudentSessions(me!.id),
    enabled: !!me?.id,
    staleTime: 30_000,
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Cancel Session AlertModal State
  const [cancelModalSessionNum, setCancelModalSessionNum] = useState<number | null>(null);

  // The step tracker is driven entirely by real backend state now — workflowStatus (via
  // deriveStudentProgress), per-form submission flags, and the student's actual sessions.
  const wf = me ? deriveStudentProgress(me.workflowStatus) : null;
  const session1 = sessions?.find(s => s.sessionNumber === 'SESSION_1' && s.status !== 'CANCELLED');
  const session2 = sessions?.find(s => s.sessionNumber === 'SESSION_2' && s.status !== 'CANCELLED');

  const isProfileCompleted = wf?.profileCompleted ?? false;
  const isPreCounsellingSubmitted = formsStatus?.preCounsellingStudent ?? wf?.preCounsellingSubmitted ?? false;
  const isParentFormSubmitted = formsStatus?.preCounsellingParent ?? false;
  const isAssessmentSubmitted = wf?.assessmentSubmitted ?? false;
  const isBooked = wf?.booked ?? false;
  const isSession1Completed = wf?.session1Completed ?? false;
  const isSession2Completed = wf?.session2Completed ?? false;
  const isStudentFeedbackSubmitted = formsStatus?.feedbackStudent ?? false;
  const isParentFeedbackSubmitted = formsStatus?.feedbackParent ?? false;

  const s1SlotStr = formatSlotRange(session1);
  const s2SlotStr = formatSlotRange(session2);

  const refreshSessions = () => {
    queryClient.invalidateQueries({ queryKey: ['student-sessions', me?.id] });
    queryClient.invalidateQueries({ queryKey: ['student-me'] });
  };

  // POST /sessions/{id}/join — "Join Now". Records the join and hands back the
  // counsellor's meeting link; marking a session complete is a counsellor/staff action.
  const joinMutation = useMutation({
    mutationFn: (session: Session) => sessionsService.join(session.id, 'STUDENT'),
    onSuccess: ({ meetingLink }, session) => {
      refreshSessions();
      if (meetingLink) {
        window.open(meetingLink, '_blank');
        toast.success(
          `Joining Video Session ${session.sessionNumber === 'SESSION_1' ? '1' : '2'}`,
          `Connecting to your video counselling room with ${session.counsellor.user.firstName} ${session.counsellor.user.lastName}...`
        );
      } else {
        toast.warning(
          'No Meeting Link Yet',
          'Your counsellor hasn’t set up their meeting link yet — please contact them directly.'
        );
      }
    },
    onError: (err: unknown) => {
      toast.error('Cannot Join Yet', getApiErrorMessage(err, 'Unable to join this session right now.'));
    },
  });

  const handleStartSession = (sessionNum: number) => {
    const session = sessionNum === 1 ? session1 : session2;
    if (!session) return;
    joinMutation.mutate(session);
  };

  const handleBookWorkflow = () => {
    navigate(ROUTES.BOOK_SESSIONS);
  };

  // POST /sessions/{id}/reschedule-request/accept|decline — respond to a counsellor's
  // proposed alternative time.
  const acceptProposalMutation = useMutation({
    mutationFn: (session: Session) => sessionsService.acceptCounsellorReschedule(session.id),
    onSuccess: () => {
      refreshSessions();
      toast.success('Reschedule Accepted', 'Your session has been moved to the proposed time.');
    },
    onError: (err: unknown) => {
      toast.error('Error', getApiErrorMessage(err, 'Could not accept the proposed time.'));
    },
  });

  const declineProposalMutation = useMutation({
    mutationFn: (session: Session) => sessionsService.declineCounsellorReschedule(session.id),
    onSuccess: () => {
      refreshSessions();
      toast.info('Reschedule Declined', 'The proposed time was declined.');
    },
    onError: (err: unknown) => {
      toast.error('Error', getApiErrorMessage(err, 'Could not decline the proposed time.'));
    },
  });

  const handleCopyParentLink = () => {
    const parentLink = `${window.location.origin}${ROUTES.PARENT_PRE_COUNSELLING_FORM}/${me?.id ?? ''}`;
    navigator.clipboard.writeText(parentLink);
    toast.success(
      'Parent Form Link Copied!',
      'Pre-Counselling Form Parent link copied to clipboard.'
    );
  };

  const handleCopyParentFeedbackLink = () => {
    const parentFeedbackLink = `${window.location.origin}${ROUTES.PARENT_FEEDBACK_FORM}/${me?.id ?? ''}`;
    navigator.clipboard.writeText(parentFeedbackLink);
    toast.success('Parent Feedback Link Copied!', 'Parent Feedback Form link copied to clipboard.');
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

    return [
      {
        id: 1,
        title: 'Profile Form',
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
        title: 'Pre-Counselling Form',
        subtext: isPreCounsellingSubmitted
          ? 'Submitted'
          : isProfileCompleted
            ? 'Step 2 — Ready to start 20-min interest assessment'
            : 'Locked — Complete Profile Form first',
        status: s2Status,
        attachedStatus: !isParentFormSubmitted ? (
          <AttachedStatusBadge $variant="warning">
            <RiNotification3Line size={13} style={{ color: '#D97706' }} />
            <span>Waiting for Parent to fill Pre-Counselling Form</span>
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
            {isProfileCompleted && !isParentFormSubmitted && (
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<RiFileCopyLine size={16} />}
                onClick={handleCopyParentLink}
              >
                Copy Pre-Counselling Form Parent Link
              </Button>
            )}
          </div>
        ),
      },
      {
        id: 3,
        title: 'Career Profiling',
        subtext: isAssessmentSubmitted
          ? 'Completed'
          : isPreCounsellingSubmitted
            ? 'Step 3 — Psychometric abilities & career interest assessment'
            : 'Locked — Complete Pre-Counselling Form first',
        status: s3Status,
        attachedStatus: null,
        action:
          isPreCounsellingSubmitted && !isAssessmentSubmitted ? (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<RiFileTextLine size={16} />}
              onClick={() => navigate(ROUTES.ASSESSMENT_FORM)}
            >
              Start Career Profiling
            </Button>
          ) : null,
      },
      {
        id: 4,
        title: 'Booking : Session 1 & 2',
        subtext: isBooked
          ? 'Sessions Scheduled'
          : isAssessmentSubmitted
            ? 'Select dates and book 1-on-1 counseling video calls'
            : 'Locked — Complete Career Profiling first',
        status: s4Status,
        attachedStatus: null,
        action:
          isAssessmentSubmitted && !isBooked ? (
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
        // Rendered via the SessionCardWrapper layout below, not this generic timeline
        // row — subtext/action here are unused, kept only for the NodeDot/status column.
        id: 5,
        title: 'Video session 1',
        subtext: isSession1Completed ? 'Completed' : isBooked ? `Scheduled (${s1SlotStr})` : 'Initial Career Exploration Call',
        status: s5Status,
        attachedStatus: null,
        action: null,
      },
      {
        id: 6,
        title: 'Video session 2',
        subtext: isSession2Completed ? 'Completed' : isSession1Completed ? `Scheduled (${s2SlotStr})` : 'kREATE & Stream Review Call',
        status: s6Status,
        attachedStatus: null,
        action: null,
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
            <span>Waiting for Parent Feedback</span>
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
            {isSession2Completed && (
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<RiFileCopyLine size={16} />}
                onClick={handleCopyParentFeedbackLink}
              >
                Copy Parent Feedback Form Link
              </Button>
            )}
          </div>
        ),
      },
    ];
  };

  const steps = getTimelineSteps();
  const completedCount = steps.filter(s => s.status === 'completed').length;
  const overallPercent = Math.round((completedCount / steps.length) * 100);

  const handleRescheduleSession = (sessionNum: number) => {
    navigate(`${ROUTES.BOOK_SESSIONS}?session=${sessionNum}`);
    toast.info(
      `Reschedule Video Session ${sessionNum}`,
      'Select a new date and time slot for your counseling video session.'
    );
  };

  // POST /sessions/students/{id}/restart — cancels both sessions together and clears
  // the way to rebook from scratch. Only available before Session 1 has started.
  const restartMutation = useMutation({
    mutationFn: () => sessionsService.restart(me!.id),
    onSuccess: () => {
      refreshSessions();
      toast.warning(
        'Sessions Cancelled',
        'Your booked sessions have been cancelled. You can book new slots anytime.'
      );
      setCancelModalSessionNum(null);
    },
    onError: (err: unknown) => {
      toast.error('Could Not Cancel', getApiErrorMessage(err, 'Unable to cancel your sessions right now.'));
      setCancelModalSessionNum(null);
    },
  });

  const handleConfirmCancelSession = () => {
    restartMutation.mutate();
  };

  return (
    <PortalContainer>
      {/* Welcome Banner */}
      <WelcomeBanner>
        <BannerText>
          <BannerTitle>Hello, {me?.name || user?.name}!</BannerTitle>
          <BannerSubtitle>
            <RiGraduationCapLine size={16} />{' '}
            {me?.division?.className
              ? `${me.division.className}${me.division.name ? ` - ${me.division.name}` : ''}`
              : 'Grade 11 - Science'}
            {me?.project?.name && (
              <BadgePill>
                <RiBuilding4Line size={12} style={{ display: 'inline', marginRight: 4 }} />
                {me.project.name}
              </BadgePill>
            )}
          </BannerSubtitle>
        </BannerText>
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
                Follow the 7 milestone steps to complete your counseling journey.
              </TimelineSubtitle>
            </div>
          </TimelineTitleGroup>

          <Badge variant={completedCount === steps.length ? 'success' : 'primary'} size="md">
            {completedCount} of {steps.length} Steps Completed ({overallPercent}%)
          </Badge>
        </TimelineWidgetHeader>

        <TimelineList>
          {steps.map((step, idx) => {
            const isSessionCard = step.id === 5 || step.id === 6;
            const sessionNum = step.id === 5 ? 1 : 2;
            const sessionForCard = sessionNum === 1 ? session1 : session2;
            const hasPendingProposal = !!sessionForCard?.counsellorProposedDate;

            return (
              <TimelineItem key={step.id}>
                <NodeColumn>
                  <NodeDot $status={step.status}>
                    {step.status === 'completed' ? (
                      <RiCheckLine size={14} />
                    ) : step.status === 'current' ? (
                      <span
                        style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }}
                      />
                    ) : (
                      <span style={{ fontSize: 10 }}>{step.id}</span>
                    )}
                  </NodeDot>

                  {idx < steps.length - 1 && <LineStem $completed={step.status === 'completed'} />}
                </NodeColumn>

                <ItemContent>
                  {isSessionCard ? (
                    /* Render Card layout matching user hand-drawn wireframe */
                    <SessionCardWrapper $status={step.status}>
                      <SessionCardHeader>
                        <SessionCardTitle>
                          Session {sessionNum}
                          {step.status === 'completed' && (
                            <Badge variant="success" size="sm">
                              Completed
                            </Badge>
                          )}
                          {step.status === 'current' && (
                            <Badge variant="primary" size="sm">
                              In Progress
                            </Badge>
                          )}
                        </SessionCardTitle>

                        {step.status === 'current' ? (
                          sessionForCard && isWithinJoinWindow(sessionForCard) ? (
                            <SessionJoinButton
                              type="button"
                              onClick={() => handleStartSession(sessionNum)}
                            >
                              <RiVideoChatLine size={13} />
                              Join
                            </SessionJoinButton>
                          ) : (
                            <SessionJoinButton
                              type="button"
                              $disabled
                              title="Join opens 10 minutes before your session starts"
                            >
                              Join
                            </SessionJoinButton>
                          )
                        ) : step.status === 'upcoming' ? (
                          <SessionJoinButton
                            type="button"
                            $disabled
                            title="Locked — Reach this step to join video call"
                          >
                            Join
                          </SessionJoinButton>
                        ) : null}
                      </SessionCardHeader>

                      <SessionDateTimeRow>
                        <RiCalendarLine size={13} style={{ color: '#6B7280', flexShrink: 0 }} />
                        <span>
                          {(sessionNum === 1 ? s1SlotStr : s2SlotStr) ||
                            (sessionNum === 1
                              ? 'Initial Career Exploration Call'
                              : 'kREATE & Stream Review Call')}
                        </span>
                      </SessionDateTimeRow>

                      {step.status === 'current' && hasPendingProposal && sessionForCard && (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 6,
                            padding: '8px 10px',
                            marginTop: 4,
                            background: '#FEF3C7',
                            border: '1px solid #FDE68A',
                            borderRadius: 4,
                            fontSize: 12,
                          }}
                        >
                          <span style={{ color: '#92400E', fontWeight: 600 }}>
                            Your counsellor proposed a new time:{' '}
                            {dayjs(sessionForCard.counsellorProposedDate!).format('MMM D, YYYY')} •{' '}
                            {formatTime(sessionForCard.counsellorProposedStartTime!)} -{' '}
                            {formatTime(sessionForCard.counsellorProposedEndTime!)}
                            {sessionForCard.counsellorRescheduleReason
                              ? ` — ${sessionForCard.counsellorRescheduleReason}`
                              : ''}
                          </span>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <SessionActionLink
                              type="button"
                              onClick={() => acceptProposalMutation.mutate(sessionForCard)}
                              style={{ color: '#16A34A' }}
                            >
                              <RiCheckLine size={12} />
                              Accept
                            </SessionActionLink>
                            <SessionLinkDivider>|</SessionLinkDivider>
                            <SessionActionLink
                              type="button"
                              $danger
                              onClick={() => declineProposalMutation.mutate(sessionForCard)}
                            >
                              <RiCloseCircleLine size={12} />
                              Decline
                            </SessionActionLink>
                          </div>
                        </div>
                      )}

                      {step.status === 'current' && (
                        <SessionActionLinksRow>
                          {sessionNum !== 2 && (
                            <>
                              <SessionActionLink
                                type="button"
                                $danger
                                onClick={() => setCancelModalSessionNum(sessionNum)}
                              >
                                <RiCloseCircleLine size={12} />
                                Cancel
                              </SessionActionLink>
                              <SessionLinkDivider>|</SessionLinkDivider>
                            </>
                          )}
                          <SessionActionLink
                            type="button"
                            onClick={() => handleRescheduleSession(sessionNum)}
                          >
                            <RiRefreshLine size={12} />
                            Reschedule
                          </SessionActionLink>
                        </SessionActionLinksRow>
                      )}
                    </SessionCardWrapper>
                  ) : (
                    /* Regular timeline step layout */
                    <>
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
                    </>
                  )}
                </ItemContent>
              </TimelineItem>
            );
          })}
        </TimelineList>
      </TimelineWidgetCard>

      {/* SEPARATE kREATE COMPASS REPORT WIDGET BLOCK */}
      {(() => {
        const isViewable = isAssessmentSubmitted || isSession1Completed;
        const isDownloadable = isStudentFeedbackSubmitted;

        return (
          <TestWidgetCard style={{ borderLeftColor: isViewable ? '#16A34A' : '#9CA3AF' }}>
            <TestWidgetContent>
              <IconBox
                $color={isViewable ? '#16A34A' : '#6B7280'}
                $bg={isViewable ? '#DCFCE7' : '#F3F4F6'}
              >
                <RiCompass3Line size={24} />
              </IconBox>
              <TestWidgetInfo>
                <TestWidgetTitle>
                  kREATE Compass Report
                  {isViewable ? (
                    <Badge variant="success" size="sm">
                      Unlocked
                    </Badge>
                  ) : (
                    <Badge variant="default" size="sm">
                      Locked
                    </Badge>
                  )}
                </TestWidgetTitle>
                <TestWidgetDesc>
                  {!isViewable
                    ? 'Complete Career Profiling to unlock your kREATE Compass report.'
                    : !isDownloadable
                      ? 'Your kREATE Compass report is viewable online. Download will be unlocked after completing the Feedback step.'
                      : 'Your comprehensive kREATE Compass report is complete and ready to view or download.'}
                </TestWidgetDesc>
              </TestWidgetInfo>
            </TestWidgetContent>

            {isViewable ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <Button
                  variant="primary"
                  size="md"
                  leftIcon={<RiEyeLine size={18} />}
                  onClick={() =>
                    navigate(ROUTES.GENERATE_REPORT.replace(':sessionId', session1?.id ?? ''))
                  }
                >
                  View kREATE Compass Report
                </Button>
                {isDownloadable ? (
                  <Button
                    variant="secondary"
                    size="md"
                    leftIcon={<RiPrinterLine size={18} />}
                    onClick={() => {
                      navigate(ROUTES.GENERATE_REPORT.replace(':sessionId', session1?.id ?? ''));
                      setTimeout(() => window.print(), 600);
                    }}
                  >
                    Download PDF
                  </Button>
                ) : (
                  <Tooltip content="Download is unlocked after completing the Feedback step">
                    <div>
                      <Button
                        variant="secondary"
                        size="md"
                        leftIcon={<RiPrinterLine size={18} />}
                        disabled
                        title="Download is unlocked after completing the Feedback step"
                      >
                        Download (Locked)
                      </Button>
                    </div>
                  </Tooltip>
                )}
              </div>
            ) : (
              <Button
                variant="secondary"
                size="md"
                leftIcon={<RiPrinterLine size={18} />}
                disabled
                title="Complete Career Profiling to unlock report"
              >
                View kREATE Compass Report (Locked)
              </Button>
            )}
          </TestWidgetCard>
        );
      })()}

      {/* Student Profile Form Modal */}
      <StudentProfileFormModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        student={me}
        initialName={me?.name || user?.name || 'Alex Johnson'}
        initialEmail={me?.email || user?.email || 'student@pwc.com'}
        onSuccess={() => setIsProfileModalOpen(false)}
      />

      {/* Cancel Session AlertModal — cancelling before Session 1 starts restarts booking
          from scratch, so this cancels both sessions together, not just Session 1. */}
      <AlertModal
        isOpen={cancelModalSessionNum !== null}
        onClose={() => setCancelModalSessionNum(null)}
        onConfirm={handleConfirmCancelSession}
        title="Cancel Your Booked Sessions?"
        description="Are you sure you want to cancel? Since Session 1 hasn't started yet, this cancels both Session 1 and Session 2 together — you can book new slots anytime."
        variant="danger"
        confirmText="Cancel Sessions"
        cancelText="Keep Sessions"
        isLoading={restartMutation.isPending}
      />
    </PortalContainer>
  );
};

export default StudentPortalPage;
