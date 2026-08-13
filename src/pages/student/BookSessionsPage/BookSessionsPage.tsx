import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { ROUTES } from '@/constants';
import { useToast } from '@/hooks';
import {
  PageWrapper,
  MainCard,
  HeaderRow,
  HeaderTopNavRow,
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

const AVAILABLE_DATES = [
  { fullDate: '2026-05-12', day: 'Tue', number: 'May 12' },
  { fullDate: '2026-05-13', day: 'Wed', number: 'May 13' },
  { fullDate: '2026-05-14', day: 'Thu', number: 'May 14' },
  { fullDate: '2026-05-15', day: 'Fri', number: 'May 15' },
  { fullDate: '2026-05-16', day: 'Sat', number: 'May 16' },
  { fullDate: '2026-05-18', day: 'Mon', number: 'May 18' },
  { fullDate: '2026-05-19', day: 'Tue', number: 'May 19' },
  { fullDate: '2026-05-20', day: 'Wed', number: 'May 20' },
  { fullDate: '2026-05-21', day: 'Thu', number: 'May 21' },
  { fullDate: '2026-05-22', day: 'Fri', number: 'May 22' },
  { fullDate: '2026-05-23', day: 'Sat', number: 'May 23' },
  { fullDate: '2026-05-25', day: 'Mon', number: 'May 25' },
  { fullDate: '2026-05-26', day: 'Tue', number: 'May 26' },
  { fullDate: '2026-05-27', day: 'Wed', number: 'May 27' },
  { fullDate: '2026-05-28', day: 'Thu', number: 'May 28' },
  { fullDate: '2026-05-29', day: 'Fri', number: 'May 29' },
  { fullDate: '2026-05-30', day: 'Sat', number: 'May 30' },
  { fullDate: '2026-06-01', day: 'Mon', number: 'Jun 01' },
  { fullDate: '2026-06-02', day: 'Tue', number: 'Jun 02' },
  { fullDate: '2026-06-03', day: 'Wed', number: 'Jun 03' },
  { fullDate: '2026-06-04', day: 'Thu', number: 'Jun 04' },
  { fullDate: '2026-06-05', day: 'Fri', number: 'Jun 05' },
];

const AVAILABLE_SLOTS = [
  '10:00 AM - 11:00 AM',
  '11:30 AM - 12:30 PM',
  '02:00 PM - 03:00 PM',
  '03:30 PM - 04:30 PM',
  '05:00 PM - 06:00 PM',
  '06:30 PM - 07:30 PM',
];

export const BookSessionsPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [isParentCompleted, setIsParentCompleted] = useState<boolean>(false);
  // State step: 1 = Dual Session Slot Selection, 2 = Final Confirmation
  const [step, setStep] = useState<number>(1);

  // Session 1 Selection
  const [s1Date, setS1Date] = useState<string>('2026-05-12');
  const [s1Time, setS1Time] = useState<string>('05:00 PM - 06:00 PM');

  // Session 2 Selection
  const [s2Date, setS2Date] = useState<string>('2026-05-15');
  const [s2Time, setS2Time] = useState<string>('05:00 PM - 06:00 PM');

  const s1DateRef = useRef<HTMLDivElement>(null);
  const s2DateRef = useRef<HTMLDivElement>(null);

  const scrollDates = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const parentDone = localStorage.getItem('pwc_parent_form_submitted') === 'true';
    setIsParentCompleted(parentDone);
  }, []);

  const handleSelectS1Date = (dateStr: string) => {
    setS1Date(dateStr);
    if (s2Date <= dateStr) {
      const nextAvailable = AVAILABLE_DATES.find(d => d.fullDate > dateStr);
      if (nextAvailable) {
        setS2Date(nextAvailable.fullDate);
      }
    }
  };

  const handleSimulateParentForm = () => {
    localStorage.setItem('pwc_parent_form_submitted', 'true');
    setIsParentCompleted(true);
    toast.success(
      'Parent Assessment Completed!',
      'Parent form marked as submitted. Session booking unlocked!'
    );
  };

  const handleResendParentLink = () => {
    toast.info('Parent Assessment Link Sent', 'Form link sent to parent email & WhatsApp number.');
  };

  const handleCopyParentLink = () => {
    const parentLink = `${window.location.origin}${ROUTES.PARENT_PRE_COUNSELLING_FORM}`;
    navigator.clipboard.writeText(parentLink);
    toast.success(
      'Parent Form Link Copied!',
      'Pre-Counselling Form Parent link copied to clipboard.'
    );
  };

  const handleProceedToConfirmation = () => {
    if (!s1Date || !s1Time) {
      toast.warning('Select Session 1 Slot', 'Please choose a date and time slot for Session 1.');
      return;
    }
    if (!s2Date || !s2Time) {
      toast.warning('Select Session 2 Slot', 'Please choose a date and time slot for Session 2.');
      return;
    }
    toast.success('Session Slots Saved', `Session 1: ${s1Date} • Session 2: ${s2Date}`);
    setStep(2);
  };

  const handleFinalBooking = () => {
    localStorage.setItem('pwc_sessions_booked', 'true');
    localStorage.setItem('pwc_session_1_slot', `${s1Date} ${s1Time}`);
    localStorage.setItem('pwc_session_2_slot', `${s2Date} ${s2Time}`);

    toast.success(
      'Sessions 1 & 2 Booked Successfully!',
      'Confirmation notifications dispatched to Student, Parent, and Counsellor.'
    );

    navigate(ROUTES.STUDENT_PORTAL);
  };

  return (
    <PageWrapper>
      <MainCard>
        {/* Header */}
        <HeaderRow>
          <HeaderTopNavRow>
            <HeaderBackButton
              type="button"
              onClick={() => navigate(ROUTES.STUDENT_PORTAL)}
              aria-label="Back to Student Portal"
            >
              <RiArrowLeftLine size={18} />
            </HeaderBackButton>
          </HeaderTopNavRow>

          <TitleText>BOOK YOUR COUNSELLING SESSIONS</TitleText>
          <SubtitleText>
            Schedule 1-on-1 Guidance Calls (Session 1 & Session 2) with Senior Counsellor Sarah
            Jenkins (M.Sc Psych)
          </SubtitleText>
        </HeaderRow>

        {/* STEP 1 LOCK: IF PARENT FORM NOT COMPLETED */}
        {!isParentCompleted ? (
          <LockWarningContainer>
            <WarningBox>
              <WarningTitleRow>
                <RiLockLine size={24} style={{ color: '#D97706' }} />
                <span>Parent Pre-Counselling Assessment Pending</span>
              </WarningTitleRow>
              <WarningDesc>
                Session booking can only be done after your parent submits their pre-counselling
                assessment form. Once your parent completes the assessment, this scheduling
                workspace will unlock automatically.
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
                <Button
                  variant="primary"
                  size="md"
                  leftIcon={<RiCheckLine size={16} />}
                  onClick={handleSimulateParentForm}
                >
                  Simulate Parent Form Completion
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
                  Select Session Slots (Session 1 & 2)
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

            {/* STEP 1: UNIFIED SESSION 1 AND SESSION 2 SLOT SELECTION */}
            {step === 1 && (
              <>
                {/* SECTION 1: SESSION 1 SLOT */}
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
                      {AVAILABLE_DATES.map(d => (
                        <DateCard
                          key={d.fullDate}
                          $selected={s1Date === d.fullDate}
                          onClick={() => handleSelectS1Date(d.fullDate)}
                          style={{ minWidth: 120, flexShrink: 0 }}
                        >
                          <DateDay>{d.day}</DateDay>
                          <DateNumber>{d.number}</DateNumber>
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
                    {AVAILABLE_SLOTS.map(s => (
                      <SlotCard key={s} $selected={s1Time === s} onClick={() => setS1Time(s)}>
                        <RiTimeLine size={16} />
                        <span>{s}</span>
                      </SlotCard>
                    ))}
                  </SlotGrid>
                </div>

                {/* SECTION 2: SESSION 2 SLOT */}
                <SectionHeader style={{ marginTop: 32 }}>
                  <SectionTitle>
                    <RiCalendarEventLine size={20} style={{ color: '#5D2384' }} />
                    <span>
                      Select Date & Time Slot for Session 2 (Roadmap & Recommendations)
                    </span>
                  </SectionTitle>
                  <SectionSubtext>
                    Choose a date for your second session (Recommended 3–5 days after Session 1).
                  </SectionSubtext>
                </SectionHeader>

                <div>
                  <SectionSubtext style={{ fontWeight: 700, marginBottom: 8, color: '#1E293B' }}>
                    Available Dates for Session 2:
                  </SectionSubtext>
                  <DateCarouselWrapper>
                    <CarouselNavButton
                      type="button"
                      aria-label="Scroll dates left"
                      onClick={() => scrollDates(s2DateRef, 'left')}
                    >
                      <RiArrowLeftLine size={18} />
                    </CarouselNavButton>
                    <DateCarouselContainer ref={s2DateRef}>
                      {AVAILABLE_DATES.filter(d => d.fullDate > s1Date).map(d => (
                        <DateCard
                          key={d.fullDate}
                          $selected={s2Date === d.fullDate}
                          onClick={() => setS2Date(d.fullDate)}
                          style={{ minWidth: 120, flexShrink: 0 }}
                        >
                          <DateDay>{d.day}</DateDay>
                          <DateNumber>{d.number}</DateNumber>
                        </DateCard>
                      ))}
                    </DateCarouselContainer>
                    <CarouselNavButton
                      type="button"
                      aria-label="Scroll dates right"
                      onClick={() => scrollDates(s2DateRef, 'right')}
                    >
                      <RiArrowRightLine size={18} />
                    </CarouselNavButton>
                  </DateCarouselWrapper>
                </div>

                <div>
                  <SectionSubtext style={{ fontWeight: 700, marginBottom: 8, color: '#1E293B' }}>
                    Available Time Slots for Session 2 ({s2Date}):
                  </SectionSubtext>
                  <SlotGrid>
                    {AVAILABLE_SLOTS.map(s => (
                      <SlotCard key={s} $selected={s2Time === s} onClick={() => setS2Time(s)}>
                        <RiTimeLine size={16} />
                        <span>{s}</span>
                      </SlotCard>
                    ))}
                  </SlotGrid>
                </div>

                {/* UNIFIED SELECTION SUMMARY CARD FOR S1 & S2 */}
                {s1Date && s1Time && s2Date && s2Time && (
                  <SelectionSummaryCard>
                    <SummaryTextGroup>
                      <SummaryLabel>Selected Counselling Sessions</SummaryLabel>
                      <SummaryValue style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                        <strong>Session 1:</strong> {s1Date} • {s1Time}
                        <br />
                        <strong>Session 2:</strong> {s2Date} • {s2Time}
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
                )}
              </>
            )}

            {/* STEP 2: FINAL CONFIRMATION SUMMARY */}
            {step === 2 && (
              <ConfirmationCard>
                <SectionHeader>
                  <SectionTitle>
                    <RiSparklingLine size={20} style={{ color: '#5D2384' }} />
                    <span>Review & Confirm Session Booking</span>
                  </SectionTitle>
                  <SectionSubtext>
                    Please double check your scheduled 1-on-1 sessions below.
                  </SectionSubtext>
                </SectionHeader>

                <ConfirmationRow>
                  <RiVideoChatLine
                    size={24}
                    style={{ color: '#2563EB', flexShrink: 0, marginTop: 2 }}
                  />
                  <div>
                    <strong>Session 1 (Discovery & Assessment)</strong>
                    <br />
                    <span>
                      Date: {s1Date} • Time: {s1Time}
                    </span>
                  </div>
                </ConfirmationRow>

                <ConfirmationRow>
                  <RiVideoChatLine
                    size={24}
                    style={{ color: '#5D2384', flexShrink: 0, marginTop: 2 }}
                  />
                  <div>
                    <strong>Session 2 (Roadmap & Recommendations)</strong>
                    <br />
                    <span>
                      Date: {s2Date} • Time: {s2Time}
                    </span>
                  </div>
                </ConfirmationRow>

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
                    onClick={handleFinalBooking}
                  >
                    Confirm Both Sessions & Book Now
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
