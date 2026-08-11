import React, { useState } from 'react';
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
import { SuccessModal } from '@/components/SuccessModal';
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

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const onSubmit = async (_data: StudentProfileFormData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    localStorage.setItem('pwc_student_profile_completed', 'true');
    setIsSuccessModalOpen(true);
  };

  const handleProceedToDashboard = () => {
    setIsSuccessModalOpen(false);
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

            <DocTitle>Student Profile Form</DocTitle>
            <DocSubtitle>
              Please complete all section details accurately. Information collected here will be used
              for your personalized counseling sessions.
            </DocSubtitle>
          </DocumentHeaderRow>

          {/* Notice Card */}
          <IntroGreetingNotice>
            <GreetingHeadline>Dear Student,</GreetingHeadline>
            <GreetingParagraph>
              Welcome to the Phoenix Water Club Career Counselling program! To help us serve you
              better, please fill in your details carefully.
            </GreetingParagraph>
            <GreetingHighlightParagraph>
              <GreetingActionText>
                It will take only 5–7 minutes to complete this profile form.
              </GreetingActionText>
            </GreetingHighlightParagraph>
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
                  label="Full Name of the Student"
                  placeholder="e.g. Alex Johnson"
                  leftIcon={<RiUser3Line size={18} />}
                  error={errors.studentFullName?.message}
                  {...register('studentFullName')}
                />
                <Input
                  label="Student Mobile Number"
                  type="tel"
                  placeholder="10-digit mobile number"
                  leftIcon={<RiPhoneLine size={18} />}
                  error={errors.studentMobile?.message}
                  {...register('studentMobile')}
                />
              </FormRow>

              <FormRow>
                <Input
                  label="Student WhatsApp Number"
                  type="tel"
                  placeholder="WhatsApp mobile number"
                  leftIcon={<RiPhoneLine size={18} />}
                  error={errors.studentWhatsapp?.message}
                  {...register('studentWhatsapp')}
                />
                <Input
                  label="Student Email ID"
                  type="email"
                  placeholder="For session links & updates"
                  leftIcon={<RiMailLine size={18} />}
                  error={errors.studentEmail?.message}
                  {...register('studentEmail')}
                />
              </FormRow>

              <FormRow>
                <Input
                  label="Alternate Mobile Number (Optional)"
                  type="tel"
                  placeholder="Backup contact number"
                  leftIcon={<RiPhoneLine size={18} />}
                  error={errors.alternateMobile?.message}
                  {...register('alternateMobile')}
                />
                <Input
                  label="Alternate Email ID (Optional)"
                  type="email"
                  placeholder="Backup email address"
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
                  label="Organisation / Employer"
                  placeholder="Name of the company or organisation"
                  leftIcon={<RiBuilding4Line size={18} />}
                  error={errors.fatherEmployer?.message}
                  {...register('fatherEmployer')}
                />
                <Input
                  label="WhatsApp Mobile Number"
                  type="tel"
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

      {/* Submission Success Modal with Animated Icon Treatment */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleProceedToDashboard}
        title="Profile Submitted Successfully"
        message="Thank you for taking the time to fill this form carefully. Let’s move on to the next step."
        confirmText="Proceed to Dashboard"
        onConfirm={handleProceedToDashboard}
        size="md"
      />
    </FormPageContainer>
  );
};

export default StudentProfileFormPage;
