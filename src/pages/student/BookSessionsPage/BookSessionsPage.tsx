import React, { useState, useEffect } from 'react';
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
  RiWhatsappLine,
  RiArrowRightLine,
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
  CounsellorBadgeCard,
  CounsellorAvatar,
  CounsellorInfo,
  CounsellorName,
  CounsellorMeta,
  DateGrid,
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
  NotificationBadgeRow,
  NotificationBadge,
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
  const [step, setStep] = useState<number>(1); // 1 = Session 1, 2 = Session 2, 3 = Confirmation

  // Session 1 Selection
  const [s1Date, setS1Date] = useState<string>('2026-05-12');
  const [s1Time, setS1Time] = useState<string>('05:00 PM - 06:00 PM');

  // Session 2 Selection
  const [s2Date, setS2Date] = useState<string>('2026-05-15');
  const [s2Time, setS2Time] = useState<string>('05:00 PM - 06:00 PM');

  useEffect(() => {
    const parentDone = localStorage.getItem('pwc_parent_form_submitted') === 'true';
    setIsParentCompleted(parentDone);
  }, []);

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

  const handleConfirmS1 = () => {
    if (!s1Date || !s1Time) {
      toast.warning('Select Time Slot', 'Please choose a date and time slot for Session 1.');
      return;
    }
    toast.success('Session 1 Slot Saved', `Selected: ${s1Date} at ${s1Time}`);
    setStep(2);
  };

  const handleConfirmS2 = () => {
    if (!s2Date || !s2Time) {
      toast.warning('Select Time Slot', 'Please choose a date and time slot for Session 2.');
      return;
    }
    toast.success('Session 2 Slot Saved', `Selected: ${s2Date} at ${s2Time}`);
    setStep(3);
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
          /* WIZARD STEPS 1 - 3 WHEN PARENT FORM IS COMPLETED */
          <WizardBody>
            {/* Steps Indicator Bar */}
            <StepIndicatorBar>
              <StepItem $active={step === 1} $completed={step > 1}>
                <StepBadge $active={step === 1} $completed={step > 1}>
                  {step > 1 ? <RiCheckLine size={14} /> : '1'}
                </StepBadge>
                <StepLabel $active={step === 1} $completed={step > 1}>
                  Session 1 Slot
                </StepLabel>
              </StepItem>

              <StepConnector $completed={step > 1} />

              <StepItem $active={step === 2} $completed={step > 2}>
                <StepBadge $active={step === 2} $completed={step > 2}>
                  {step > 2 ? <RiCheckLine size={14} /> : '2'}
                </StepBadge>
                <StepLabel $active={step === 2} $completed={step > 2}>
                  Session 2 Slot
                </StepLabel>
              </StepItem>

              <StepConnector $completed={step > 2} />

              <StepItem $active={step === 3} $completed={step > 3}>
                <StepBadge $active={step === 3} $completed={step > 3}>
                  3
                </StepBadge>
                <StepLabel $active={step === 3} $completed={step > 3}>
                  Final Confirmation
                </StepLabel>
              </StepItem>
            </StepIndicatorBar>

            {/* Counsellor Allotment Badge */}
            <CounsellorBadgeCard>
              <CounsellorAvatar>SJ</CounsellorAvatar>
              <CounsellorInfo>
                <CounsellorName>Sarah Jenkins, M.Sc Psych</CounsellorName>
                <CounsellorMeta>
                  Senior Career Counsellor • Assigned to your profile for Session 1 & 2 continuity
                </CounsellorMeta>
              </CounsellorInfo>
            </CounsellorBadgeCard>

            {/* STEP 1: SELECT SESSION 1 SLOT */}
            {step === 1 && (
              <>
                <SectionHeader>
                  <SectionTitle>
                    <RiCalendarEventLine size={20} style={{ color: '#2563EB' }} />
                    <span>
                      Select Date & Time Slot for Session 1 (Discovery & Assessment Review)
                    </span>
                  </SectionTitle>
                  <SectionSubtext>
                    Choose an available date and 1-hour time slot for your initial 1-on-1 video
                    call.
                  </SectionSubtext>
                </SectionHeader>

                <div>
                  <SectionSubtext style={{ fontWeight: 700, marginBottom: 8, color: '#1E293B' }}>
                    Available Dates:
                  </SectionSubtext>
                  <DateGrid>
                    {AVAILABLE_DATES.map(d => (
                      <DateCard
                        key={d.fullDate}
                        $selected={s1Date === d.fullDate}
                        onClick={() => setS1Date(d.fullDate)}
                      >
                        <DateDay>{d.day}</DateDay>
                        <DateNumber>{d.number}</DateNumber>
                      </DateCard>
                    ))}
                  </DateGrid>
                </div>

                <div>
                  <SectionSubtext style={{ fontWeight: 700, marginBottom: 8, color: '#1E293B' }}>
                    Available Time Slots for {s1Date}:
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

                {s1Date && s1Time && (
                  <SelectionSummaryCard>
                    <SummaryTextGroup>
                      <SummaryLabel>Selected Session 1 Slot</SummaryLabel>
                      <SummaryValue>
                        {s1Date} • {s1Time}
                      </SummaryValue>
                    </SummaryTextGroup>
                    <Button
                      variant="primary"
                      size="md"
                      rightIcon={<RiArrowRightLine size={16} />}
                      onClick={handleConfirmS1}
                    >
                      Confirm Session 1 Slot
                    </Button>
                  </SelectionSummaryCard>
                )}
              </>
            )}

            {/* STEP 2: SELECT SESSION 2 SLOT */}
            {step === 2 && (
              <>
                <SectionHeader>
                  <SectionTitle>
                    <RiCalendarEventLine size={20} style={{ color: '#2563EB' }} />
                    <span>Select Date & Time Slot for Session 2 (Roadmap & Recommendations)</span>
                  </SectionTitle>
                  <SectionSubtext>
                    Choose a date for your second session with Sarah Jenkins (Recommended 3–5 days
                    after Session 1).
                  </SectionSubtext>
                </SectionHeader>

                <div>
                  <SectionSubtext style={{ fontWeight: 700, marginBottom: 8, color: '#1E293B' }}>
                    Available Dates for Session 2:
                  </SectionSubtext>
                  <DateGrid>
                    {AVAILABLE_DATES.filter(d => d.fullDate > s1Date).map(d => (
                      <DateCard
                        key={d.fullDate}
                        $selected={s2Date === d.fullDate}
                        onClick={() => setS2Date(d.fullDate)}
                      >
                        <DateDay>{d.day}</DateDay>
                        <DateNumber>{d.number}</DateNumber>
                      </DateCard>
                    ))}
                  </DateGrid>
                </div>

                <div>
                  <SectionSubtext style={{ fontWeight: 700, marginBottom: 8, color: '#1E293B' }}>
                    Available Time Slots for {s2Date}:
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

                {s2Date && s2Time && (
                  <SelectionSummaryCard>
                    <SummaryTextGroup>
                      <SummaryLabel>Selected Session 2 Slot</SummaryLabel>
                      <SummaryValue>
                        {s2Date} • {s2Time}
                      </SummaryValue>
                    </SummaryTextGroup>
                    <Button
                      variant="primary"
                      size="md"
                      rightIcon={<RiArrowRightLine size={16} />}
                      onClick={handleConfirmS2}
                    >
                      Proceed to Final Confirmation
                    </Button>
                  </SelectionSummaryCard>
                )}
              </>
            )}

            {/* STEP 3: CONFIRMATION SUMMARY & NOTIFICATIONS */}
            {step === 3 && (
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
                    <br />
                    <span style={{ fontSize: 13, color: '#64748B' }}>
                      Counsellor: Sarah Jenkins, M.Sc Psych
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
                    <br />
                    <span style={{ fontSize: 13, color: '#64748B' }}>
                      Counsellor: Sarah Jenkins, M.Sc Psych
                    </span>
                  </div>
                </ConfirmationRow>

                <div>
                  <strong style={{ fontSize: 14, color: '#1E293B' }}>
                    Automated Notification Dispatch:
                  </strong>
                  <NotificationBadgeRow>
                    <NotificationBadge $bg="#DBEAFE" $color="#1E40AF">
                      <RiMailSendLine size={14} /> Student Email Invite
                    </NotificationBadge>
                    <NotificationBadge $bg="#F3E8FF" $color="#6B21A8">
                      <RiMailSendLine size={14} /> Parent Email Invite
                    </NotificationBadge>
                    <NotificationBadge $bg="#D1FAE5" $color="#047857">
                      <RiWhatsappLine size={14} /> WhatsApp Confirmation
                    </NotificationBadge>
                  </NotificationBadgeRow>
                </div>

                <NavigationFooter>
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    leftIcon={<RiArrowLeftLine size={16} />}
                    onClick={() => setStep(2)}
                  >
                    Back to Session 2 Slot
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
