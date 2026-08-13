import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  RiCheckLine,
  RiUser3Line,
  RiUserHeartLine,
  RiCalendarEventLine,
  RiEmotionHappyLine,
  RiCompass3Line,
  RiAwardLine,
  RiStarLine,
  RiChat3Line,
} from 'react-icons/ri';
import { Button } from '@/components/Button';
import { ROUTES } from '@/constants';
import { SuccessModal } from '@/components';
import {
  FormPageContainer,
  SingleUnifiedCard,
  DocumentHeaderRow,
  HeaderTopNavRow,
  DocHeaderBadge,
  DocTitle,
  DocSubtitle,
  DocNote,
  StudentMetaGrid,
  MetaItem,
  MetaLabel,
  MetaValue,
  SectionBlock,
  SectionHeader,
  SectionHeaderIcon,
  SectionTitleText,
  SectionSubCode,
  QuestionCard,
  QuestionTitle,
  RatingOptionsGroup,
  RatingOptionButton,
  OptionScoreBadge,
  OptionText,
  CustomTextArea,
  FormFooterActions,
} from '../StudentFeedbackFormPage/StudentFeedbackFormPage.styles';

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

const parentFeedbackSchema = z.object({
  // Section 1: Programme Effectiveness [P-PE]
  pe_q1: z.number().min(1, 'Please rate question 1'),
  pe_q2: z.number().min(1, 'Please rate question 2'),
  pe_q3: z.number().min(1, 'Please rate question 3'),

  // Section 2: Counsellor Effectiveness [P-CE]
  ce_q1: z.number().min(1, 'Please rate question 1'),
  ce_q2: z.number().min(1, 'Please rate question 2'),
  ce_q3: z.number().min(1, 'Please rate question 3'),
  ce_q4: z.number().min(1, 'Please rate question 4'),

  // Section 3: Outcome & Alignment [P-OA]
  oa_q1: z.number().min(1, 'Please rate question 1'),
  oa_q2: z.number().min(1, 'Please rate question 2'),
  oa_q3: z.number().min(1, 'Please rate question 3'),

  // Section 4: Decision Confidence [P-DC]
  dc_q1: z.number().min(1, 'Please rate question 1'),
  dc_q2: z.number().min(1, 'Please rate question 2'),

  // Section 5: Recommendation [P-RC]
  rc_q1: z.number().min(1, 'Please rate question 1'),

  // Section 6: Open Feedback [Not scored]
  appreciated_part: z.string().optional(),
  improvement_part: z.string().optional(),
});

type ParentFeedbackFormData = z.infer<typeof parentFeedbackSchema>;

export const ParentFeedbackFormPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<ParentFeedbackFormData>({
    resolver: zodResolver(parentFeedbackSchema),
    defaultValues: {
      pe_q1: 5,
      pe_q2: 5,
      pe_q3: 5,
      ce_q1: 5,
      ce_q2: 5,
      ce_q3: 5,
      ce_q4: 5,
      oa_q1: 4,
      oa_q2: 5,
      oa_q3: 5,
      dc_q1: 5,
      dc_q2: 5,
      rc_q1: 5,
      appreciated_part: '',
      improvement_part: '',
    },
  });

  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

  const onSubmit = async (_data: ParentFeedbackFormData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.setItem('pwc_parent_feedback_submitted', 'true');
    setIsCompletionModalOpen(true);
  };

  const handleConfirmCompletion = useCallback(() => {
    setIsCompletionModalOpen(false);
    navigate(ROUTES.LOGIN);
  }, [navigate]);

  return (
    <>
      <FormPageContainer>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <SingleUnifiedCard>
            {/* Header */}
            <DocumentHeaderRow>
              <HeaderTopNavRow style={{ justifyContent: 'flex-end' }}>
                <DocHeaderBadge>Post-Counselling · Class 9 & 10</DocHeaderBadge>
              </HeaderTopNavRow>
              <DocTitle>PARENT FEEDBACK QUESTIONNAIRE</DocTitle>
              <DocSubtitle>PHOENIX WATER CLUB — Design Destiny · kREATE Career Counselling Programme</DocSubtitle>
              <DocNote>
                Thank you for partnering with us in your child&apos;s career discovery journey. Please provide your candid feedback to help us refine our guidance services.
              </DocNote>
            </DocumentHeaderRow>

            {/* Parent Meta Details */}
            <StudentMetaGrid>
              <MetaItem>
                <MetaLabel>Parent Name</MetaLabel>
                <MetaValue style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <RiUser3Line size={16} /> Sunita Sharma (Parent)
                </MetaValue>
              </MetaItem>
              <MetaItem>
                <MetaLabel>Student Code</MetaLabel>
                <MetaValue style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <RiUserHeartLine size={16} /> STU-2026-89 (Alex Johnson)
                </MetaValue>
              </MetaItem>
              <MetaItem>
                <MetaLabel>Date</MetaLabel>
                <MetaValue style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <RiCalendarEventLine size={16} /> May 15, 2026
                </MetaValue>
              </MetaItem>
            </StudentMetaGrid>

            {/* Section 1: Programme Effectiveness */}
            <SectionBlock>
              <SectionHeader>
                <SectionHeaderIcon>
                  <RiEmotionHappyLine size={20} />
                </SectionHeaderIcon>
                <SectionTitleText>
                  Section 1: Programme Effectiveness <SectionSubCode>[P-PE]</SectionSubCode>
                </SectionTitleText>
              </SectionHeader>

              {[
                {
                  name: 'pe_q1' as const,
                  title: '1. The assessment results were explained to us clearly and in a way we could understand.',
                },
                {
                  name: 'pe_q2' as const,
                  title: '2. The career recommendations made were realistic and practical given my child\'s stream and strengths.',
                },
                {
                  name: 'pe_q3' as const,
                  title: '3. The career roadmap (Plan A and Plan B) was actionable and clearly laid out.',
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

            {/* Section 2: Counsellor Effectiveness */}
            <SectionBlock>
              <SectionHeader>
                <SectionHeaderIcon>
                  <RiUserHeartLine size={20} />
                </SectionHeaderIcon>
                <SectionTitleText>
                  Section 2: Counsellor Effectiveness <SectionSubCode>[P-CE]</SectionSubCode>
                </SectionTitleText>
              </SectionHeader>

              {[
                {
                  name: 'ce_q1' as const,
                  title: '1. The counsellor understood my child\'s individual strengths, personality, and career interests.',
                },
                {
                  name: 'ce_q2' as const,
                  title: '2. The counsellor balanced my concerns as a parent with my child\'s own aspirations effectively.',
                },
                {
                  name: 'ce_q3' as const,
                  title: '3. The counsellor communicated clearly, confidently, and with subject matter expertise.',
                },
                {
                  name: 'ce_q4' as const,
                  title: '4. The counsellor built trust and credibility with both me and my child during the sessions.',
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

            {/* Section 3: Outcome & Alignment */}
            <SectionBlock>
              <SectionHeader>
                <SectionHeaderIcon>
                  <RiCompass3Line size={20} />
                </SectionHeaderIcon>
                <SectionTitleText>
                  Section 3: Outcome & Alignment <SectionSubCode>[P-OA]</SectionSubCode>
                </SectionTitleText>
              </SectionHeader>

              {[
                {
                  name: 'oa_q1' as const,
                  title: '1. My child now has greater clarity about their career direction within their chosen stream.',
                },
                {
                  name: 'oa_q2' as const,
                  title: '2. The programme helped bring my expectations and my child\'s aspirations closer together.',
                },
                {
                  name: 'oa_q3' as const,
                  title: '3. My own understanding of my child\'s strengths, personality, and career options has improved.',
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

            {/* Section 4: Decision Confidence */}
            <SectionBlock>
              <SectionHeader>
                <SectionHeaderIcon>
                  <RiAwardLine size={20} />
                </SectionHeaderIcon>
                <SectionTitleText>
                  Section 4: Decision Confidence <SectionSubCode>[P-DC]</SectionSubCode>
                </SectionTitleText>
              </SectionHeader>

              {[
                {
                  name: 'dc_q1' as const,
                  title: '1. I feel confident in the career direction and final choices made for my child.',
                },
                {
                  name: 'dc_q2' as const,
                  title: '2. I believe the career plan and roadmap presented is achievable and appropriate for my child.',
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

            {/* Section 5: Recommendation */}
            <SectionBlock>
              <SectionHeader>
                <SectionHeaderIcon>
                  <RiStarLine size={20} />
                </SectionHeaderIcon>
                <SectionTitleText>
                  Section 5: Recommendation <SectionSubCode>[P-RC]</SectionSubCode>
                </SectionTitleText>
              </SectionHeader>

              <QuestionCard>
                <QuestionTitle>1. How likely are you to recommend this programme?</QuestionTitle>
                <Controller
                  name="rc_q1"
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

            {/* Section 6: Open Feedback */}
            <SectionBlock>
              <SectionHeader>
                <SectionHeaderIcon>
                  <RiChat3Line size={20} />
                </SectionHeaderIcon>
                <SectionTitleText>
                  Section 6: Open Feedback <SectionSubCode>[Not scored]</SectionSubCode>
                </SectionTitleText>
              </SectionHeader>

              <QuestionCard>
                <QuestionTitle>1. What did you appreciate most about this career counselling programme?</QuestionTitle>
                <CustomTextArea
                  placeholder="Share what worked best for you and your child..."
                  {...register('appreciated_part')}
                />
              </QuestionCard>

              <QuestionCard>
                <QuestionTitle>2. What should we improve to make this programme more valuable for parents?</QuestionTitle>
                <CustomTextArea
                  placeholder="Let us know how we can enhance the experience for parents..."
                  {...register('improvement_part')}
                />
              </QuestionCard>
            </SectionBlock>

            {/* Form Actions */}
            <FormFooterActions style={{ justifyContent: 'flex-end' }}>
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
        message="Thank you for your valuable feedback. Your inputs help us continuously refine and improve our guidance services for parents and students."
        confirmText="Back to Home"
        onConfirm={handleConfirmCompletion}
      />
    </>
  );
};

export default ParentFeedbackFormPage;
