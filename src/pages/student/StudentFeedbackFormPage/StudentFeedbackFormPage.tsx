import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  RiArrowLeftLine,
  RiCheckLine,
  RiUser3Line,
  RiUserHeartLine,
  RiEmotionHappyLine,
  RiCompass3Line,
  RiAwardLine,
  RiStarLine,
  RiChat3Line,
} from 'react-icons/ri';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import { ROUTES } from '@/constants';
import { SuccessModal } from '@/components';
import {
  FormPageContainer,
  SingleUnifiedCard,
  DocumentHeaderRow,
  HeaderTopNavRow,
  HeaderBackButton,
  DocTitle,
  DocNote,
  StudentMetaGrid,
  MetaItem,
  MetaLabel,
  MetaValue,
  SectionBlock,
  SectionHeader,
  SectionHeaderIcon,
  SectionTitleText,
  QuestionCard,
  QuestionTitle,
  RatingOptionsGroup,
  RatingOptionButton,
  OptionScoreBadge,
  OptionText,
  CustomTextArea,
  FormFooterActions,
} from './StudentFeedbackFormPage.styles';

const EFFECTIVENESS_SCALE = [
  { score: 1, label: 'Very poor, not helpful' },
  { score: 2, label: 'Below expectations' },
  { score: 3, label: 'Acceptable but not impressive' },
  { score: 4, label: 'Good & met expectations' },
  { score: 5, label: 'Excellent & beyond expectations' },
];

const CLARITY_SCALE = [
  { score: 1, label: 'Very unclear, not decided' },
  { score: 2, label: 'Somewhat unclear with doubts' },
  { score: 3, label: 'Partly clear with some understanding' },
  { score: 4, label: 'Clear & good understanding' },
  { score: 5, label: 'Very clear & confident' },
];

const RECOMMENDATION_OPTIONS = [
  { score: 1, label: '(1) Definitely will not recommend' },
  { score: 2, label: '(2) Unlikely to recommend' },
  { score: 3, label: '(3) May or may not recommend' },
  { score: 4, label: '(4) Likely to recommend' },
  { score: 5, label: '(5) Definitely will recommend' },
];

const studentFeedbackSchema = z.object({
  // Section 1: Session Experience [S-SE]
  se_q1: z.number().min(1, 'Please rate question 1'),
  se_q2: z.number().min(1, 'Please rate question 2'),
  se_q3: z.number().min(1, 'Please rate question 3'),
  se_q4: z.number().min(1, 'Please rate question 4'),

  // Section 2: Clarity & Decision Confidence [S-CD]
  cd_q1: z.number().min(1, 'Please rate question 1'),
  cd_q2: z.number().min(1, 'Please rate question 2'),
  cd_q3: z.number().min(1, 'Please rate question 3'),
  cd_q4: z.number().min(1, 'Please rate question 4'),

  // Section 3: Outcome Quality [S-OQ]
  oq_q1: z.number().min(1, 'Please rate question 1'),
  oq_q2: z.number().min(1, 'Please rate question 2'),
  oq_q3: z.number().min(1, 'Please rate question 3'),

  // Section 4: Overall Satisfaction [S-OS]
  os_q1: z.number().min(1, 'Please rate question 1'),
  os_q2: z.number().min(1, 'Please rate question 2'),

  // Section 5: Open Feedback
  helpful_part: z.string().optional(),
  improvement_part: z.string().optional(),
});

type StudentFeedbackFormData = z.infer<typeof studentFeedbackSchema>;

export const StudentFeedbackFormPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<StudentFeedbackFormData>({
    resolver: zodResolver(studentFeedbackSchema),
    defaultValues: {
      se_q1: 5,
      se_q2: 5,
      se_q3: 5,
      se_q4: 5,
      cd_q1: 4,
      cd_q2: 5,
      cd_q3: 4,
      cd_q4: 5,
      oq_q1: 5,
      oq_q2: 4,
      oq_q3: 5,
      os_q1: 5,
      os_q2: 5,
      helpful_part: '',
      improvement_part: '',
    },
  });

  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

  const onSubmit = async (_data: StudentFeedbackFormData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.setItem('pwc_student_feedback_submitted', 'true');
    setIsCompletionModalOpen(true);
  };

  const handleConfirmCompletion = useCallback(() => {
    setIsCompletionModalOpen(false);
    navigate(ROUTES.STUDENT_PORTAL);
  }, [navigate]);

  return (
    <>
      <FormPageContainer>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <SingleUnifiedCard>
            {/* Header */}
            <DocumentHeaderRow>
              <HeaderTopNavRow>
                <Tooltip content="Back to Student Dashboard" position="right">
                  <HeaderBackButton
                    type="button"
                    onClick={() => navigate(ROUTES.STUDENT_PORTAL)}
                    aria-label="Back to Dashboard"
                  >
                    <RiArrowLeftLine size={18} />
                  </HeaderBackButton>
                </Tooltip>
              </HeaderTopNavRow>
              <DocTitle>FEEDBACK QUESTIONNAIRE</DocTitle>
              <DocNote>
                Please share your feedback regarding your experience. Your responses help us
                enhance our programme. Your honesty is genuinely valued — there are no right or
                wrong answers.
              </DocNote>
            </DocumentHeaderRow>

            {/* Student Meta Details */}
            <StudentMetaGrid>
              <MetaItem>
                <MetaLabel>Student Name / Code</MetaLabel>
                <MetaValue style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <RiUser3Line size={16} /> Aarav Sharma (STU-2026-89)
                </MetaValue>
              </MetaItem>
              <MetaItem>
                <MetaLabel>Counsellor</MetaLabel>
                <MetaValue style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <RiUserHeartLine size={16} /> Dr. Rajeshwari Menon (M.Sc Psych)
                </MetaValue>
              </MetaItem>
            </StudentMetaGrid>

            {/* Section 1: Session Experience */}
            <SectionBlock>
              <SectionHeader>
                <SectionHeaderIcon>
                  <RiEmotionHappyLine size={20} />
                </SectionHeaderIcon>
                <SectionTitleText>Session Experience</SectionTitleText>
              </SectionHeader>

              {[
                {
                  name: 'se_q1' as const,
                  title:
                    '1. The counsellor explained my assessment results in a way I clearly understood.',
                },
                {
                  name: 'se_q2' as const,
                  title:
                    '2. I felt comfortable, safe, and genuinely heard throughout the sessions.',
                },
                {
                  name: 'se_q3' as const,
                  title:
                    '3. The counsellor asked meaningful questions to understand me as an individual, not just my marks.',
                },
                {
                  name: 'se_q4' as const,
                  title:
                    '4. The session felt personalised to my specific stream, strengths, and career interests, and not generic.',
                },
              ].map(q => (
                <QuestionCard key={q.name}>
                  <QuestionTitle>{q.title}</QuestionTitle>
                  <Controller
                    name={q.name}
                    control={control}
                    render={({ field }) => (
                      <RatingOptionsGroup>
                        {EFFECTIVENESS_SCALE.map(option => (
                          <RatingOptionButton
                            key={option.score}
                            type="button"
                            $isSelected={field.value === option.score}
                            onClick={() => field.onChange(option.score)}
                          >
                            <OptionScoreBadge $isSelected={field.value === option.score}>
                              {option.score}
                            </OptionScoreBadge>
                            <OptionText>{option.label}</OptionText>
                          </RatingOptionButton>
                        ))}
                      </RatingOptionsGroup>
                    )}
                  />
                </QuestionCard>
              ))}
            </SectionBlock>

            {/* Section 2: Clarity & Decision Confidence */}
            <SectionBlock>
              <SectionHeader>
                <SectionHeaderIcon>
                  <RiCompass3Line size={20} />
                </SectionHeaderIcon>
                <SectionTitleText>Clarity & Decision Confidence</SectionTitleText>
              </SectionHeader>

              {[
                {
                  name: 'cd_q1' as const,
                  title: '1. I clearly understand my top 2 career options.',
                },
                {
                  name: 'cd_q2' as const,
                  title:
                    '2. I understand why these career options suit my personality, strengths, and aptitude.',
                },
                {
                  name: 'cd_q3' as const,
                  title: '3. I feel confident about the career direction I am now heading in.',
                },
                {
                  name: 'cd_q4' as const,
                  title: '4. I know the next steps (subjects, exams, colleges).',
                },
              ].map(q => (
                <QuestionCard key={q.name}>
                  <QuestionTitle>{q.title}</QuestionTitle>
                  <Controller
                    name={q.name}
                    control={control}
                    render={({ field }) => (
                      <RatingOptionsGroup>
                        {CLARITY_SCALE.map(option => (
                          <RatingOptionButton
                            key={option.score}
                            type="button"
                            $isSelected={field.value === option.score}
                            onClick={() => field.onChange(option.score)}
                          >
                            <OptionScoreBadge $isSelected={field.value === option.score}>
                              {option.score}
                            </OptionScoreBadge>
                            <OptionText>{option.label}</OptionText>
                          </RatingOptionButton>
                        ))}
                      </RatingOptionsGroup>
                    )}
                  />
                </QuestionCard>
              ))}
            </SectionBlock>

            {/* Section 3: Outcome Quality */}
            <SectionBlock>
              <SectionHeader>
                <SectionHeaderIcon>
                  <RiAwardLine size={20} />
                </SectionHeaderIcon>
                <SectionTitleText>Outcome Quality</SectionTitleText>
              </SectionHeader>

              {[
                {
                  name: 'oq_q1' as const,
                  title: '1. The career options suggested felt relevant to me.',
                },
                {
                  name: 'oq_q2' as const,
                  title: '2. The roadmap (Plan A & Plan B) is practical and achievable.',
                },
                {
                  name: 'oq_q3' as const,
                  title: '3. My doubts were resolved during the sessions.',
                },
              ].map(q => (
                <QuestionCard key={q.name}>
                  <QuestionTitle>{q.title}</QuestionTitle>
                  <Controller
                    name={q.name}
                    control={control}
                    render={({ field }) => (
                      <RatingOptionsGroup>
                        {CLARITY_SCALE.map(option => (
                          <RatingOptionButton
                            key={option.score}
                            type="button"
                            $isSelected={field.value === option.score}
                            onClick={() => field.onChange(option.score)}
                          >
                            <OptionScoreBadge $isSelected={field.value === option.score}>
                              {option.score}
                            </OptionScoreBadge>
                            <OptionText>{option.label}</OptionText>
                          </RatingOptionButton>
                        ))}
                      </RatingOptionsGroup>
                    )}
                  />
                </QuestionCard>
              ))}
            </SectionBlock>

            {/* Section 4: Overall Satisfaction */}
            <SectionBlock>
              <SectionHeader>
                <SectionHeaderIcon>
                  <RiStarLine size={20} />
                </SectionHeaderIcon>
                <SectionTitleText>Overall Satisfaction</SectionTitleText>
              </SectionHeader>

              <QuestionCard>
                <QuestionTitle>
                  1. This programme reduced my confusion about the future.
                </QuestionTitle>
                <Controller
                  name="os_q1"
                  control={control}
                  render={({ field }) => (
                    <RatingOptionsGroup>
                      {EFFECTIVENESS_SCALE.map(option => (
                        <RatingOptionButton
                          key={option.score}
                          type="button"
                          $isSelected={field.value === option.score}
                          onClick={() => field.onChange(option.score)}
                        >
                          <OptionScoreBadge $isSelected={field.value === option.score}>
                            {option.score}
                          </OptionScoreBadge>
                          <OptionText>{option.label}</OptionText>
                        </RatingOptionButton>
                      ))}
                    </RatingOptionsGroup>
                  )}
                />
              </QuestionCard>

              <QuestionCard>
                <QuestionTitle>2. I would recommend this programme to my friends.</QuestionTitle>
                <Controller
                  name="os_q2"
                  control={control}
                  render={({ field }) => (
                    <RatingOptionsGroup>
                      {RECOMMENDATION_OPTIONS.map(option => (
                        <RatingOptionButton
                          key={option.score}
                          type="button"
                          $isSelected={field.value === option.score}
                          onClick={() => field.onChange(option.score)}
                        >
                          <OptionScoreBadge $isSelected={field.value === option.score}>
                            {option.score}
                          </OptionScoreBadge>
                          <OptionText>{option.label}</OptionText>
                        </RatingOptionButton>
                      ))}
                    </RatingOptionsGroup>
                  )}
                />
              </QuestionCard>
            </SectionBlock>

            {/* Section 5: Open Feedback */}
            <SectionBlock>
              <SectionHeader>
                <SectionHeaderIcon>
                  <RiChat3Line size={20} />
                </SectionHeaderIcon>
                <SectionTitleText>Open Feedback</SectionTitleText>
              </SectionHeader>

              <QuestionCard>
                <QuestionTitle>1. What was the most helpful part?</QuestionTitle>
                <CustomTextArea
                  placeholder="Share what worked best for you during the counselling sessions..."
                  {...register('helpful_part')}
                />
              </QuestionCard>

              <QuestionCard>
                <QuestionTitle>2. What could be improved?</QuestionTitle>
                <CustomTextArea
                  placeholder="Let us know how we can make the experience even better..."
                  {...register('improvement_part')}
                />
              </QuestionCard>
            </SectionBlock>

            {/* Form Actions */}
            <FormFooterActions>
              <Button
                type="button"
                variant="secondary"
                leftIcon={<RiArrowLeftLine size={16} />}
                onClick={() => navigate(ROUTES.STUDENT_PORTAL)}
              >
                Back to Dashboard
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                leftIcon={<RiCheckLine size={18} />}
              >
                Submit Feedback
              </Button>
            </FormFooterActions>
          </SingleUnifiedCard>
        </form>
      </FormPageContainer>

      {/* Completion Confirmation Popup Modal */}
      <SuccessModal
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        title="Feedback Submitted Successfully!"
        confirmText="Go to Student Portal"
        onConfirm={handleConfirmCompletion}
      />
    </>
  );
};

export default StudentFeedbackFormPage;
