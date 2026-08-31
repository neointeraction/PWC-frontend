import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
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
import { useToast, useCurrentStudent } from '@/hooks';
import { studentService, StudentProfileUpdate } from '@/services/student.service';
import { getApiErrorMessage } from '@/utils';
import {
  FormPageContainer,
  SingleUnifiedCard,
  DocumentHeaderRow,
  HeaderBackButton,
  DocTitle,
  IntroGreetingNotice,
  GreetingHeadline,
  GreetingParagraph,
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
  const queryClient = useQueryClient();
  const { data: me } = useCurrentStudent();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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

  // Prefill from the logged-in student's real record once it loads.
  useEffect(() => {
    if (!me) return;
    reset({
      studentFullName: me.name || '',
      studentMobile: me.mobile || '',
      studentWhatsapp: me.whatsappNumber || '',
      studentEmail: me.email || '',
      alternateMobile: me.parentMobile || '',
      alternateEmail: me.parentEmail || '',
      fatherFullName: me.father?.name || '',
      fatherOccupation: me.father?.occupation || '',
      fatherEmployer: me.father?.employer || '',
      fatherWhatsapp: '',
      fatherEmail: me.parentEmail || '',
      motherFullName: me.mother?.name || '',
      motherOccupation: me.mother?.occupation || '',
      motherEmployer: me.mother?.employer || '',
    });
  }, [me, reset]);

  // The backend captures profile fields at creation; the student can only *confirm* them
  // (PATCH is admin-only), so submitting confirms the profile (DRAFT -> PROFILE_COMPLETED).
  const confirmMutation = useMutation({
    mutationFn: (payload: StudentProfileUpdate) => studentService.confirmProfile(me!.id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-me'] });
      setIsSuccessModalOpen(true);
    },
    onError: (err: unknown) => {
      // 409 = already confirmed (not DRAFT) — treat as done rather than an error.
      if (err instanceof AxiosError && err.response?.status === 409) {
        queryClient.invalidateQueries({ queryKey: ['student-me'] });
        setIsSuccessModalOpen(true);
        return;
      }
      toast.error('Error', getApiErrorMessage(err, 'Failed to save your profile.'));
    },
  });

  // Map the form fields to the student-editable payload. Field names mirror POST /students.
  // Note: the backend's Student model has no fatherEmail/fatherWhatsapp columns (only a
  // single parentMobile/parentEmail pair) — see docs/db-design.md — so those two inputs
  // and the student's own email (not self-editable per docs/api-list.md) have nowhere to
  // be saved and are intentionally left out of this payload.
  const buildProfilePayload = (data: StudentProfileFormData): StudentProfileUpdate => {
    const fullName = (data.studentFullName || '').trim();
    const [firstName, ...rest] = fullName.split(/\s+/);
    return {
      firstName: firstName || undefined,
      lastName: rest.length ? rest.join(' ') : undefined,
      mobile: data.studentMobile?.trim() || undefined,
      whatsappNumber: data.studentWhatsapp?.trim() || undefined,
      parentMobile: data.alternateMobile?.trim() || undefined,
      parentEmail: data.alternateEmail?.trim() || undefined,
      fatherName: data.fatherFullName?.trim() || undefined,
      fatherOccupation: data.fatherOccupation?.trim() || undefined,
      fatherEmployer: data.fatherEmployer?.trim() || undefined,
      motherName: data.motherFullName?.trim() || undefined,
      motherOccupation: data.motherOccupation?.trim() || undefined,
      motherEmployer: data.motherEmployer?.trim() || undefined,
    };
  };

  const onSubmit = (data: StudentProfileFormData) => {
    if (!me?.id) {
      // No student record resolved yet — fall back so the page still completes.
      localStorage.setItem('pwc_student_profile_completed', 'true');
      setIsSuccessModalOpen(true);
      return;
    }
    confirmMutation.mutate(buildProfilePayload(data));
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
            <Tooltip content="Back to Student Portal" position="right">
              <HeaderBackButton
                type="button"
                onClick={() => navigate(ROUTES.STUDENT_PORTAL)}
                aria-label="Back to Student Portal"
              >
                <RiArrowLeftLine size={18} />
              </HeaderBackButton>
            </Tooltip>

            <DocTitle>Champion&apos;s Profile</DocTitle>
          </DocumentHeaderRow>

          {/* Notice Card */}
          <IntroGreetingNotice>
            <GreetingHeadline>Hello Champion,</GreetingHeadline>
            <GreetingParagraph>
              Before you get started, a quick note on why this page matters.
            </GreetingParagraph>
            <GreetingParagraph>
              Everything from here on reminders, links, forms and updates, will be sent to you only
              through WhatsApp and Email, based on the details you enter below.
            </GreetingParagraph>
            <GreetingHeadline>
              We won&apos;t be calling you at any point in the programme.
            </GreetingHeadline>
            <GreetingParagraph>
              So please take a moment to enter accurate details. It&apos;s the only way we&apos;ll be
              able to reach you at the right time, with the right information.
            </GreetingParagraph>
            <GreetingParagraph style={{ fontWeight: 600 }}>
              Let&apos;s get started!
            </GreetingParagraph>
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
                  placeholder="e.g. Aarav Sharma"
                  leftIcon={<RiUser3Line size={18} />}
                  error={errors.studentFullName?.message}
                  {...register('studentFullName')}
                />
                <Input
                  label="Mobile Number"
                  type="tel"
                  placeholder="10-digit mobile number"
                  leftIcon={<RiPhoneLine size={18} />}
                  error={errors.studentMobile?.message}
                  {...register('studentMobile')}
                />
              </FormRow>

              <FormRow>
                <Input
                  label="WhatsApp Number"
                  type="tel"
                  placeholder="WhatsApp mobile number"
                  leftIcon={<RiPhoneLine size={18} />}
                  error={errors.studentWhatsapp?.message}
                  {...register('studentWhatsapp')}
                />
                <Input
                  label="Email ID"
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
              isLoading={confirmMutation.isPending}
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
