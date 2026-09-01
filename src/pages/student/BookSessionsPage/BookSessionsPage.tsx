import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import {
  RiArrowLeftLine,
  RiCalendarEventLine,
  RiTimeLine,
  RiCheckLine,
  RiLockLine,
  RiMailSendLine,
  RiSparklingLine,
  RiVideoChatLine,
  RiArrowRightLine,
  RiFileCopyLine,
} from 'react-icons/ri';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import { ROUTES } from '@/constants';
import { useToast, useCurrentStudent } from '@/hooks';
import { deriveStudentProgress } from '@/services/student.service';
import { sessionsService, BookingSlotOption, SessionNumber, Session } from '@/services/sessions.service';
import { getApiErrorMessage } from '@/utils';
import {
  PageWrapper,
  MainCard,
  HeaderRow,
  HeaderTitleGroup,
  HeaderBackButton,
  TitleText,
  SubtitleText,
  LockWarningContainer,
  WarningBox,
  WarningTitleRow,
  WarningDesc,
  ActionsButtonGroup,
  WizardBody,
  StepIndicatorBar,
  StepItem,
  StepBadge,
  StepLabel,
  StepConnector,
  SectionHeader,
  SectionTitle,
  SectionSubtext,
  DateCarouselWrapper,
  DateCarouselContainer,
  CarouselNavButton,
  DateCard,
  DateDay,
  DateNumber,
  SlotGrid,
  SlotCard,
  SelectionSummaryCard,
  SummaryTextGroup,
  SummaryLabel,
  SummaryValue,
  ConfirmationCard,
  ConfirmationRow,
  NavigationFooter,
} from './BookSessionsPage.styles';

const groupByDate = (options: BookingSlotOption[]): Map<string, BookingSlotOption[]> => {
  const map = new Map<string, BookingSlotOption[]>();
  options.forEach(o => {
    if (!map.has(o.date)) map.set(o.date, []);
    map.get(o.date)!.push(o);
  });
  return map;
};

export const BookSessionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data: me, isLoading: isMeLoading } = useCurrentStudent();
  const studentId = me?.id;

  const sessionParam = searchParams.get('session') || searchParams.get('reschedule');

  // The real booking gate — matches the backend's `workflowStatus >= ASSESSMENT_COMPLETED`
  // check on POST /sessions/students/{id}/book.
  const isReadyToBook = me ? deriveStudentProgress(me.workflowStatus).assessmentSubmitted : false;

  const { data: existingSessions, isLoading: isSessionsLoading } = useQuery({
    queryKey: ['student-sessions', studentId],
    queryFn: () => sessionsService.getStudentSessions(studentId!),
    enabled: !!studentId,
    staleTime: 30_000,
  });

  const existingSession1 = existingSessions?.find(
    s => s.sessionNumber === 'SESSION_1' && s.status !== 'CANCELLED'
  );
  const existingSession2 = existingSessions?.find(
    s => s.sessionNumber === 'SESSION_2' && s.status !== 'CANCELLED'
  );
  const hasExistingBooking = !!existingSession1 && !!existingSession2;

  // Both sessions are booked atomically and can't be re-booked via POST /book (409), so once
  // a booking exists this page only ever reschedules one session — whichever the portal
  // linked to via ?session=1|2 (defaulting to Session 2, matching the pre-existing behaviour).
  const rescheduleTarget: SessionNumber | null = hasExistingBooking
    ? sessionParam === '1'
      ? 'SESSION_1'
      : 'SESSION_2'
    : null;
  const targetSession: Session | undefined =
    rescheduleTarget === 'SESSION_1' ? existingSession1 : rescheduleTarget === 'SESSION_2' ? existingSession2 : undefined;

  const showSession1Section = rescheduleTarget === null || rescheduleTarget === 'SESSION_1';
  const showSession2Section = rescheduleTarget === null || rescheduleTarget === 'SESSION_2';

  const [step, setStep] = useState<number>(1);

  const s1DateRef = useRef<HTMLDivElement>(null);
  const scrollDates = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Session 1 selection — only meaningful when showSession1Section is true.
  const { data: s1Options } = useQuery({
    queryKey: ['session-booking-options', studentId, 'SESSION_1'],
    queryFn: () => sessionsService.getBookingOptions(studentId!, 'SESSION_1'),
    enabled: !!studentId && showSession1Section && (isReadyToBook || hasExistingBooking),
    staleTime: 30_000,
  });
  const s1OptionsByDate = useMemo(() => groupByDate(s1Options ?? []), [s1Options]);
  const s1Dates = useMemo(() => Array.from(s1OptionsByDate.keys()).sort(), [s1OptionsByDate]);

  const [s1Date, setS1Date] = useState<string>('');
  const [s1StartTime, setS1StartTime] = useState<string>('');

  useEffect(() => {
    if (s1Dates.length === 0) return;
    if (s1Dates.includes(s1Date)) return;
    const firstDate = s1Dates[0];
    setS1Date(firstDate);
    setS1StartTime(s1OptionsByDate.get(firstDate)?.[0]?.startTime ?? '');
  }, [s1Dates, s1Date, s1OptionsByDate]);

  const handleSelectS1Date = (dateStr: string) => {
    setS1Date(dateStr);
    setS1StartTime(s1OptionsByDate.get(dateStr)?.[0]?.startTime ?? '');
  };

  // Session 2 selection — locked to whichever counsellor Session 1 resolves to. In
  // reschedule mode that's the already-booked Session 1; otherwise it's the user's pick above.
  const session1Ref =
    rescheduleTarget === 'SESSION_2'
      ? { date: existingSession1?.scheduledDate, startTime: existingSession1?.startTime }
      : { date: s1Date, startTime: s1StartTime };

  const { data: s2Options } = useQuery({
    queryKey: ['session-booking-options', studentId, 'SESSION_2', session1Ref.date, session1Ref.startTime],
    queryFn: () =>
      sessionsService.getBookingOptions(studentId!, 'SESSION_2', {
        date: session1Ref.date!,
        startTime: session1Ref.startTime!,
      }),
    enabled: !!studentId && showSession2Section && !!session1Ref.date && !!session1Ref.startTime,
    staleTime: 30_000,
  });
  const s2OptionsByDate = useMemo(() => groupByDate(s2Options ?? []), [s2Options]);
  const s2Dates = useMemo(() => Array.from(s2OptionsByDate.keys()).sort(), [s2OptionsByDate]);

  const [s2Date, setS2Date] = useState<string>('');
  const [s2StartTime, setS2StartTime] = useState<string>('');

  useEffect(() => {
    if (s2Dates.length === 0) return;
    if (s2Dates.includes(s2Date)) return;
    const firstDate = s2Dates[0];
    setS2Date(firstDate);
    setS2StartTime(s2OptionsByDate.get(firstDate)?.[0]?.startTime ?? '');
  }, [s2Dates, s2Date, s2OptionsByDate]);

  const handleSelectS2Date = (dateStr: string) => {
    setS2Date(dateStr);
    setS2StartTime(s2OptionsByDate.get(dateStr)?.[0]?.startTime ?? '');
  };

  const handleCopyParentLink = () => {
    const parentLink = `${window.location.origin}${ROUTES.PARENT_PRE_COUNSELLING_FORM}/${me?.id ?? ''}`;
    navigator.clipboard.writeText(parentLink);
    toast.success(
      'Parent Form Link Copied!',
      'Pre-Counselling Form Parent link copied to clipboard.'
    );
  };

  const handleResendParentLink = () => {
    toast.info('Parent Assessment Link Sent', 'Form link sent to parent email & WhatsApp number.');
  };

  const handleProceedToConfirmation = () => {
    if (showSession1Section && (!s1Date || !s1StartTime)) {
      toast.warning('Select Session 1 Slot', 'Please choose a date and time slot for Session 1.');
      return;
    }
    if (showSession2Section && (!s2Date || !s2StartTime)) {
      toast.warning('Select Session 2 Slot', 'Please choose a date and time slot for Session 2.');
      return;
    }
    setStep(2);
  };

  const submitMutation = useMutation({
    mutationFn: async () => {
      if (rescheduleTarget && targetSession) {
        const date = rescheduleTarget === 'SESSION_1' ? s1Date : s2Date;
        const startTime = rescheduleTarget === 'SESSION_1' ? s1StartTime : s2StartTime;
        return sessionsService.reschedule(targetSession.id, { date, startTime, initiatedBy: 'STUDENT' });
      }
      return sessionsService.bookSessions(studentId!, {
        session1: { date: s1Date, startTime: s1StartTime },
        session2: { date: s2Date, startTime: s2StartTime },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-sessions', studentId] });
      queryClient.invalidateQueries({ queryKey: ['student-me'] });

      if (rescheduleTarget) {
        toast.success(
          `Session ${rescheduleTarget === 'SESSION_1' ? '1' : '2'} Rescheduled Successfully!`,
          rescheduleTarget === 'SESSION_1'
            ? `New Slot: ${s1Date} • ${s1StartTime}`
            : `New Slot: ${s2Date} • ${s2StartTime}`
        );
      } else {
        toast.success(
          'Sessions 1 & 2 Booked Successfully!',
          'Confirmation notifications dispatched to Student, Parent, and Counsellor.'
        );
      }
      navigate(ROUTES.STUDENT_PORTAL);
    },
    onError: (err: unknown) => {
      if (err instanceof AxiosError && err.response?.status === 409) {
        toast.error(
          'Slot no longer available',
          getApiErrorMessage(err, 'That slot was just booked by someone else — please pick another.')
        );
        queryClient.invalidateQueries({ queryKey: ['session-booking-options', studentId] });
        setStep(1);
        return;
      }
      toast.error('Error', getApiErrorMessage(err, 'Failed to save your session slot.'));
    },
  });

  const handleFinalBooking = () => {
    submitMutation.mutate();
  };

  const isLoading = isMeLoading || isSessionsLoading;

  return (
    <PageWrapper>
      <MainCard>
        {/* Header */}
        <HeaderRow>
          <Tooltip content="Back to Student Portal" position="right">
            <HeaderBackButton
              type="button"
              onClick={() => navigate(ROUTES.STUDENT_PORTAL)}
              aria-label="Back to Student Portal"
            >
              <RiArrowLeftLine size={18} />
            </HeaderBackButton>
          </Tooltip>

          <HeaderTitleGroup>
            <TitleText>
              {rescheduleTarget
                ? `RESCHEDULE SESSION ${rescheduleTarget === 'SESSION_1' ? '1' : '2'}`
                : 'BOOK YOUR COUNSELLING SESSIONS'}
            </TitleText>
            <SubtitleText>
              {rescheduleTarget
                ? `Select a new date & time slot for Session ${rescheduleTarget === 'SESSION_1' ? '1 (Discovery & Assessment Review)' : '2 (Roadmap & Recommendations)'}`
                : 'Schedule 1-on-1 Guidance Calls (Session 1 & Session 2)'}
            </SubtitleText>
          </HeaderTitleGroup>
        </HeaderRow>

        {isLoading ? (
          <WizardBody>
            <SectionSubtext>Loading your session details…</SectionSubtext>
          </WizardBody>
        ) : !rescheduleTarget && !isReadyToBook ? (
          <LockWarningContainer>
            <WarningBox>
              <WarningTitleRow>
                <RiLockLine size={24} style={{ color: '#D97706' }} />
                <span>Pre-Counselling Assessment Pending</span>
              </WarningTitleRow>
              <WarningDesc>
                Session booking unlocks after your student and parent pre-counselling forms and
                your career assessment are all submitted. Once those are complete, this
                scheduling workspace will unlock automatically.
              </WarningDesc>
              <ActionsButtonGroup>
                <Button
                  variant="secondary"
                  size="md"
                  leftIcon={<RiFileCopyLine size={16} />}
                  onClick={handleCopyParentLink}
                >
                  Copy Pre-Counselling Form Parent Link
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  leftIcon={<RiMailSendLine size={16} />}
                  onClick={handleResendParentLink}
                >
                  Resend Parent Link
                </Button>
              </ActionsButtonGroup>
            </WarningBox>
          </LockWarningContainer>
        ) : (
          /* UNIFIED DUAL SLOT SELECTION & CONFIRMATION */
          <WizardBody>
            {/* Steps Indicator Bar */}
            <StepIndicatorBar>
              <StepItem $active={step === 1} $completed={step > 1}>
                <StepBadge $active={step === 1} $completed={step > 1}>
                  {step > 1 ? <RiCheckLine size={14} /> : '1'}
                </StepBadge>
                <StepLabel $active={step === 1} $completed={step > 1}>
                  {rescheduleTarget
                    ? `Select Session ${rescheduleTarget === 'SESSION_1' ? '1' : '2'} Slot`
                    : 'Select Session Slots (Session 1 & 2)'}
                </StepLabel>
              </StepItem>

              <StepConnector $completed={step > 1} />

              <StepItem $active={step === 2} $completed={step > 2}>
                <StepBadge $active={step === 2} $completed={step > 2}>
                  2
                </StepBadge>
                <StepLabel $active={step === 2} $completed={step > 2}>
                  Final Confirmation
                </StepLabel>
              </StepItem>
            </StepIndicatorBar>

            {/* STEP 1: SLOT SELECTION */}
            {step === 1 && (
              <>
                {/* SECTION 1: SESSION 1 SLOT */}
                {showSession1Section && (
                  <>
                    <SectionHeader>
                      <SectionTitle>
                        <RiCalendarEventLine size={20} style={{ color: '#2563EB' }} />
                        <span>
                          Select Date & Time Slot for Session 1 (Discovery & Assessment Review)
                        </span>
                      </SectionTitle>
                      <SectionSubtext>
                        Choose an available date and 1-hour time slot for your initial 1-on-1 video call.
                      </SectionSubtext>
                    </SectionHeader>

                    {s1Dates.length === 0 ? (
                      <SectionSubtext>No open slots are available right now — please check back soon.</SectionSubtext>
                    ) : (
                      <>
                        <div>
                          <SectionSubtext style={{ fontWeight: 700, marginBottom: 8, color: '#1E293B' }}>
                            Available Dates for Session 1:
                          </SectionSubtext>
                          <DateCarouselWrapper>
                            <CarouselNavButton
                              type="button"
                              aria-label="Scroll dates left"
                              onClick={() => scrollDates(s1DateRef, 'left')}
                            >
                              <RiArrowLeftLine size={18} />
                            </CarouselNavButton>
                            <DateCarouselContainer ref={s1DateRef}>
                              {s1Dates.map(d => (
                                <DateCard
                                  key={d}
                                  $selected={s1Date === d}
                                  onClick={() => handleSelectS1Date(d)}
                                  style={{ minWidth: 120, flexShrink: 0 }}
                                >
                                  <DateDay>{dayjs(d).format('ddd')}</DateDay>
                                  <DateNumber>{dayjs(d).format('MMM DD')}</DateNumber>
                                </DateCard>
                              ))}
                            </DateCarouselContainer>
                            <CarouselNavButton
                              type="button"
                              aria-label="Scroll dates right"
                              onClick={() => scrollDates(s1DateRef, 'right')}
                            >
                              <RiArrowRightLine size={18} />
                            </CarouselNavButton>
                          </DateCarouselWrapper>
                        </div>

                        <div>
                          <SectionSubtext style={{ fontWeight: 700, marginBottom: 8, color: '#1E293B' }}>
                            Available Time Slots for Session 1 ({s1Date}):
                          </SectionSubtext>
                          <SlotGrid>
                            {(s1OptionsByDate.get(s1Date) ?? []).map(o => (
                              <SlotCard
                                key={o.startTime}
                                $selected={s1StartTime === o.startTime}
                                onClick={() => setS1StartTime(o.startTime)}
                              >
                                <RiTimeLine size={16} />
                                <span>{o.startTime} - {o.endTime}</span>
                              </SlotCard>
                            ))}
                          </SlotGrid>
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* SECTION 2: SESSION 2 SLOT */}
                {showSession2Section && (
                  <>
                    <SectionHeader style={{ marginTop: rescheduleTarget ? 0 : 32 }}>
                      <SectionTitle>
                        <RiCalendarEventLine size={20} style={{ color: '#5D2384' }} />
                        <span>
                          Select Date & Time Slot for Session 2 (Roadmap & Recommendations)
                        </span>
                      </SectionTitle>
                      <SectionSubtext>
                        Choose a date for your second session.
                      </SectionSubtext>
                    </SectionHeader>

                    {s2Dates.length === 0 ? (
                      <SectionSubtext>
                        {session1Ref.date
                          ? 'No open slots are available with your assigned counsellor right now — please check back soon.'
                          : 'Pick a Session 1 slot first to see available Session 2 dates.'}
                      </SectionSubtext>
                    ) : (
                      <>
                        <div>
                          <SectionSubtext style={{ fontWeight: 700, marginBottom: 8, color: '#1E293B' }}>
                            Available Dates for Session 2:
                          </SectionSubtext>
                          <DateCarouselWrapper>
                            <DateCarouselContainer style={{ justifyContent: 'flex-start' }}>
                              {s2Dates.map(d => (
                                <DateCard
                                  key={d}
                                  $selected={s2Date === d}
                                  onClick={() => handleSelectS2Date(d)}
                                  style={{ minWidth: 120, flexShrink: 0 }}
                                >
                                  <DateDay>{dayjs(d).format('ddd')}</DateDay>
                                  <DateNumber>{dayjs(d).format('MMM DD')}</DateNumber>
                                </DateCard>
                              ))}
                            </DateCarouselContainer>
                          </DateCarouselWrapper>
                        </div>

                        <div>
                          <SectionSubtext style={{ fontWeight: 700, marginBottom: 8, color: '#1E293B' }}>
                            Available Time Slots for Session 2 ({s2Date}):
                          </SectionSubtext>
                          <SlotGrid>
                            {(s2OptionsByDate.get(s2Date) ?? []).map(o => (
                              <SlotCard
                                key={o.startTime}
                                $selected={s2StartTime === o.startTime}
                                onClick={() => setS2StartTime(o.startTime)}
                              >
                                <RiTimeLine size={16} />
                                <span>{o.startTime} - {o.endTime}</span>
                              </SlotCard>
                            ))}
                          </SlotGrid>
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* UNIFIED SELECTION SUMMARY CARD */}
                {rescheduleTarget === 'SESSION_1' ? (
                  s1Date &&
                  s1StartTime && (
                    <SelectionSummaryCard>
                      <SummaryTextGroup>
                        <SummaryLabel>Selected Session 1 Slot</SummaryLabel>
                        <SummaryValue style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                          <strong>Session 1:</strong> {s1Date} • {s1StartTime}
                        </SummaryValue>
                      </SummaryTextGroup>
                      <Button
                        variant="primary"
                        size="md"
                        rightIcon={<RiArrowRightLine size={16} />}
                        onClick={handleProceedToConfirmation}
                      >
                        Proceed to Final Confirmation
                      </Button>
                    </SelectionSummaryCard>
                  )
                ) : rescheduleTarget === 'SESSION_2' ? (
                  s2Date &&
                  s2StartTime && (
                    <SelectionSummaryCard>
                      <SummaryTextGroup>
                        <SummaryLabel>Selected Session 2 Slot</SummaryLabel>
                        <SummaryValue style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                          <strong>Session 2:</strong> {s2Date} • {s2StartTime}
                        </SummaryValue>
                      </SummaryTextGroup>
                      <Button
                        variant="primary"
                        size="md"
                        rightIcon={<RiArrowRightLine size={16} />}
                        onClick={handleProceedToConfirmation}
                      >
                        Proceed to Final Confirmation
                      </Button>
                    </SelectionSummaryCard>
                  )
                ) : (
                  s1Date &&
                  s1StartTime &&
                  s2Date &&
                  s2StartTime && (
                    <SelectionSummaryCard>
                      <SummaryTextGroup>
                        <SummaryLabel>Selected Counselling Sessions</SummaryLabel>
                        <SummaryValue style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                          <strong>Session 1:</strong> {s1Date} • {s1StartTime}
                          <br />
                          <strong>Session 2:</strong> {s2Date} • {s2StartTime}
                        </SummaryValue>
                      </SummaryTextGroup>
                      <Button
                        variant="primary"
                        size="md"
                        rightIcon={<RiArrowRightLine size={16} />}
                        onClick={handleProceedToConfirmation}
                      >
                        Proceed to Final Confirmation
                      </Button>
                    </SelectionSummaryCard>
                  )
                )}
              </>
            )}

            {/* STEP 2: FINAL CONFIRMATION SUMMARY */}
            {step === 2 && (
              <ConfirmationCard>
                <SectionHeader>
                  <SectionTitle>
                    <RiSparklingLine size={20} style={{ color: '#5D2384' }} />
                    <span>
                      {rescheduleTarget
                        ? `Review & Confirm Session ${rescheduleTarget === 'SESSION_1' ? '1' : '2'} Reschedule`
                        : 'Review & Confirm Session Booking'}
                    </span>
                  </SectionTitle>
                  <SectionSubtext>
                    {rescheduleTarget
                      ? 'Please double check your updated session slot below.'
                      : 'Please double check your scheduled 1-on-1 sessions below.'}
                  </SectionSubtext>
                </SectionHeader>

                {showSession1Section && (
                  <ConfirmationRow>
                    <RiVideoChatLine
                      size={24}
                      style={{ color: '#2563EB', flexShrink: 0, marginTop: 2 }}
                    />
                    <div>
                      <strong>Session 1 (Discovery & Assessment)</strong>
                      <br />
                      <span>
                        Date: {s1Date} • Time: {s1StartTime}
                      </span>
                    </div>
                  </ConfirmationRow>
                )}

                {showSession2Section && (
                  <ConfirmationRow>
                    <RiVideoChatLine
                      size={24}
                      style={{ color: '#5D2384', flexShrink: 0, marginTop: 2 }}
                    />
                    <div>
                      <strong>Session 2 (Roadmap & Recommendations)</strong>
                      <br />
                      <span>
                        Date: {s2Date} • Time: {s2StartTime}
                      </span>
                    </div>
                  </ConfirmationRow>
                )}

                <NavigationFooter>
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    leftIcon={<RiArrowLeftLine size={16} />}
                    onClick={() => setStep(1)}
                  >
                    Back to Slot Selection
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    leftIcon={<RiCheckLine size={16} />}
                    isLoading={submitMutation.isPending}
                    onClick={handleFinalBooking}
                  >
                    {rescheduleTarget
                      ? `Confirm & Reschedule Session ${rescheduleTarget === 'SESSION_1' ? '1' : '2'}`
                      : 'Confirm Both Sessions & Book Now'}
                  </Button>
                </NavigationFooter>
              </ConfirmationCard>
            )}
          </WizardBody>
        )}
      </MainCard>
    </PageWrapper>
  );
};

export default BookSessionsPage;
