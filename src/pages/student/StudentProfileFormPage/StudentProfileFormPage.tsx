import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  RiUser3Line,
  RiMailLine,
  RiPhoneLine,
  RiBriefcaseLine,
  RiBuilding4Line,
  RiCheckLine,
  RiUserHeartLine,
  RiArrowLeftLine,
} from 'react-icons/ri';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Tooltip } from '@/components/Tooltip';
import { ROUTES } from '@/constants';
import { useToast } from '@/hooks';
import {
  FormPageContainer,
  SingleUnifiedCard,
  DocumentHeaderRow,
  HeaderTopNavRow,
  HeaderBackButton,
  DocHeaderBadge,
  DocTitle,
  DocSubtitle,
  IntroGreetingNotice,
  GreetingHeadline,
  GreetingParagraph,
  GreetingHighlightParagraph,
  GreetingActionText,
  SectionBlock,
  SectionHeader,
  SectionHeaderIcon,
  SectionBody,
  FormRow,
  FooterNoteBlock,
  FooterNoteText,
  FormFooterActions,
} from './StudentProfileFormPage.styles';

const studentProfileSchema = z.object({
  // FEW DETAILS ABOUT YOU
  studentFullName: z.string().optional(),
  studentMobile: z.string().optional(),
  studentWhatsapp: z.string().optional(),
  studentEmail: z.string().optional(),
  alternateMobile: z.string().optional(),
  alternateEmail: z.string().optional(),

  // FATHER'S DETAILS
  fatherFullName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherEmployer: z.string().optional(),
  fatherWhatsapp: z.string().optional(),
  fatherEmail: z.string().optional(),

  // MOTHER'S DETAILS
  motherFullName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherEmployer: z.string().optional(),
});

type StudentProfileFormData = z.infer<typeof studentProfileSchema>;

export const StudentProfileFormPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentProfileFormData>({
    resolver: zodResolver(studentProfileSchema),
    defaultValues: {
      studentFullName: '',
      studentMobile: '',
      studentWhatsapp: '',
      studentEmail: '',
      alternateMobile: '',
      alternateEmail: '',

      fatherFullName: '',
      fatherOccupation: '',
      fatherEmployer: '',
      fatherWhatsapp: '',
      fatherEmail: '',

      motherFullName: '',
      motherOccupation: '',
      motherEmployer: '',
    },
  });

  const onSubmit = async (_data: StudentProfileFormData) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    localStorage.setItem('pwc_student_profile_completed', 'true');
    toast.success(
      'Profile Saved Successfully!',
      'Your profile details have been saved. You can now proceed to the Pre-Counselling Form.'
    );
    navigate(ROUTES.STUDENT_PORTAL);
  };

  return (
    <FormPageContainer>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <SingleUnifiedCard>
          {/* Header */}
          <DocumentHeaderRow>
            <HeaderTopNavRow>
              <Tooltip content="Back to Student Portal" position="right">
                <HeaderBackButton
                  type="button"
                  onClick={() => navigate(ROUTES.STUDENT_PORTAL)}
                  aria-label="Back to Student Portal"
                >
                  <RiArrowLeftLine size={18} />
                </HeaderBackButton>
              </Tooltip>
              <DocHeaderBadge>Student Onboarding · Class 9 & 10</DocHeaderBadge>
            </HeaderTopNavRow>

            <DocTitle>CHAMPION&apos;S PROFILE</DocTitle>
            <DocSubtitle>Career Counselling Programme — Class 9 & 10</DocSubtitle>
          </DocumentHeaderRow>

          {/* Intro Greeting Notice */}
          <IntroGreetingNotice>
            <GreetingHeadline>Hello Champion,</GreetingHeadline>
            <GreetingParagraph>
              Before you get started, a quick note on why this page matters.
            </GreetingParagraph>
            <GreetingParagraph>
              Everything from here on reminders, links, forms and updates, will be sent to you only through WhatsApp and Email, based on the details you enter below.
            </GreetingParagraph>
            <GreetingHighlightParagraph>
              We won&apos;t be calling you at any point in the programme.
            </GreetingHighlightParagraph>
            <GreetingParagraph>
              So please take a moment to enter accurate details. It&apos;s the only way we&apos;ll be able to reach you at the right time, with the right information.
            </GreetingParagraph>
            <GreetingActionText>Let&apos;s get started!</GreetingActionText>
          </IntroGreetingNotice>

          {/* SECTION 1 — FEW DETAILS ABOUT YOU */}
          <SectionBlock>
            <SectionHeader>
              <SectionHeaderIcon>
                <RiUser3Line size={18} />
              </SectionHeaderIcon>
              <span>FEW DETAILS ABOUT YOU</span>
            </SectionHeader>
            <SectionBody>
              <FormRow>
                <Input
                  label="Full Name"
                  placeholder="Name in full, this is how the name will appear in the final report"
                  leftIcon={<RiUser3Line size={18} />}
                  error={errors.studentFullName?.message}
                  {...register('studentFullName')}
                />
                <Input
                  label="Mobile Number"
                  placeholder="Contact number for calling in case we require"
                  leftIcon={<RiPhoneLine size={18} />}
                  error={errors.studentMobile?.message}
                  {...register('studentMobile')}
                />
              </FormRow>

              <FormRow>
                <Input
                  label="WhatsApp Number (if different)"
                  placeholder="All communication and reminders will be sent here only"
                  leftIcon={<RiPhoneLine size={18} />}
                  error={errors.studentWhatsapp?.message}
                  {...register('studentWhatsapp')}
                />
                <Input
                  label="Email ID"
                  type="email"
                  placeholder="All communication and reminders will be sent here only"
                  leftIcon={<RiMailLine size={18} />}
                  error={errors.studentEmail?.message}
                  {...register('studentEmail')}
                />
              </FormRow>

              <FormRow>
                <Input
                  label="Alternate Mobile Number (WhatsApp Number)"
                  placeholder="Used only if credentials need to be reset. Information will be sent here only. It should be of your parent in case your number is lost."
                  leftIcon={<RiPhoneLine size={18} />}
                  error={errors.alternateMobile?.message}
                  {...register('alternateMobile')}
                />
                <Input
                  label="Alternate Email ID"
                  type="email"
                  placeholder="Used only if credentials need to be reset. Information will be sent here only. It should be of your parent in case your number is lost."
                  leftIcon={<RiMailLine size={18} />}
                  error={errors.alternateEmail?.message}
                  {...register('alternateEmail')}
                />
              </FormRow>
            </SectionBody>
          </SectionBlock>

          {/* SECTION 2 — FATHER'S DETAILS */}
          <SectionBlock>
            <SectionHeader>
              <SectionHeaderIcon>
                <RiUserHeartLine size={18} />
              </SectionHeaderIcon>
              <span>FATHER&apos;S DETAILS</span>
            </SectionHeader>
            <SectionBody>
              <FormRow>
                <Input
                  label="Full Name"
                  placeholder="Name in full"
                  leftIcon={<RiUser3Line size={18} />}
                  error={errors.fatherFullName?.message}
                  {...register('fatherFullName')}
                />
                <Input
                  label="Occupation / Designation"
                  placeholder="Current occupation or job title"
                  leftIcon={<RiBriefcaseLine size={18} />}
                  error={errors.fatherOccupation?.message}
                  {...register('fatherOccupation')}
                />
              </FormRow>

              <FormRow>
                <Input
                  label="Organisation / Employer (if applicable)"
                  placeholder="Name of the company or organisation"
                  leftIcon={<RiBuilding4Line size={18} />}
                  error={errors.fatherEmployer?.message}
                  {...register('fatherEmployer')}
                />
                <Input
                  label="WhatsApp Number"
                  placeholder="For communication to be sent for Pre-counselling form & Feedback form"
                  leftIcon={<RiPhoneLine size={18} />}
                  error={errors.fatherWhatsapp?.message}
                  {...register('fatherWhatsapp')}
                />
              </FormRow>

              <FormRow>
                <Input
                  label="Email ID"
                  type="email"
                  placeholder="For sending Pre-counselling form & Feedback form"
                  leftIcon={<RiMailLine size={18} />}
                  error={errors.fatherEmail?.message}
                  {...register('fatherEmail')}
                />
              </FormRow>
            </SectionBody>
          </SectionBlock>

          {/* SECTION 3 — MOTHER'S DETAILS */}
          <SectionBlock>
            <SectionHeader>
              <SectionHeaderIcon>
                <RiUserHeartLine size={18} />
              </SectionHeaderIcon>
              <span>MOTHER&apos;S DETAILS</span>
            </SectionHeader>
            <SectionBody>
              <FormRow>
                <Input
                  label="Full Name"
                  placeholder="Name in full"
                  leftIcon={<RiUser3Line size={18} />}
                  error={errors.motherFullName?.message}
                  {...register('motherFullName')}
                />
                <Input
                  label="Occupation / Designation"
                  placeholder="Current occupation or job title"
                  leftIcon={<RiBriefcaseLine size={18} />}
                  error={errors.motherOccupation?.message}
                  {...register('motherOccupation')}
                />
              </FormRow>

              <FormRow>
                <Input
                  label="Organisation / Employer (if applicable)"
                  placeholder="Name of the company or organisation"
                  leftIcon={<RiBuilding4Line size={18} />}
                  error={errors.motherEmployer?.message}
                  {...register('motherEmployer')}
                />
              </FormRow>
            </SectionBody>
          </SectionBlock>

          {/* Footer Note */}
          <FooterNoteBlock>
            <FooterNoteText>
              Thank you for taking the time to fill this form carefully. Let’s move on to the next step.
            </FooterNoteText>
          </FooterNoteBlock>

          {/* Card Footer Actions */}
          <FormFooterActions>
            <Button
              type="button"
              variant="secondary"
              size="md"
              leftIcon={<RiArrowLeftLine size={18} />}
              onClick={() => navigate(ROUTES.STUDENT_PORTAL)}
            >
              Cancel & Return
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              leftIcon={<RiCheckLine size={18} />}
              isLoading={isSubmitting}
            >
              Save & Submit Profile
            </Button>
          </FormFooterActions>
        </SingleUnifiedCard>
      </form>
    </FormPageContainer>
  );
};

export default StudentProfileFormPage;
