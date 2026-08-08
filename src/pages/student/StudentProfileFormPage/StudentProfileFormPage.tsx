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
import { ROUTES } from '@/constants';
import { useToast } from '@/hooks';
import {
  FormPageContainer,
  SingleUnifiedCard,
  DocumentHeaderRow,
  HeaderTopNavRow,
  HeaderBackButton,
  DocTitle,
  DocSubtitle,
  DocNote,
  SectionBlock,
  SectionHeader,
  SectionHeaderIcon,
  SectionBody,
  FormRow,
  FormFooterActions,
} from './StudentProfileFormPage.styles';

const studentProfileSchema = z.object({
  // Section A: Student Information
  studentFullName: z.string().optional(),
  studentMobile: z.string().optional(),
  studentWhatsapp: z.string().optional(),
  studentEmail: z.string().optional(),
  primaryMobile: z.string().optional(),
  primaryEmail: z.string().optional(),

  // Section B: Father's Details
  fatherFullName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherEmployer: z.string().optional(),

  // Section C: Mother's Details
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
      primaryMobile: '',
      primaryEmail: '',

      fatherFullName: '',
      fatherOccupation: '',
      fatherEmployer: '',

      motherFullName: '',
      motherOccupation: '',
      motherEmployer: '',
    },
  });

  const onSubmit = async (_data: StudentProfileFormData) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    localStorage.setItem('pwc_student_profile_completed', 'true');
    toast.success(
      'Student Profile Form Submitted Successfully!',
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
              <HeaderBackButton
                type="button"
                onClick={() => navigate(ROUTES.STUDENT_PORTAL)}
                aria-label="Back to Student Portal"
              >
                <RiArrowLeftLine size={18} />
              </HeaderBackButton>
            </HeaderTopNavRow>

            <DocTitle>STUDENT PROFILE FORM</DocTitle>
            <DocSubtitle>Career Counselling Programme — Class 9 & 10</DocSubtitle>
            <DocNote>Provide student and parent contact information to help senior counsellors customize your career guidance session.</DocNote>
          </DocumentHeaderRow>
          {/* SECTION A — STUDENT INFORMATION */}
          <SectionBlock>
            <SectionHeader>
              <SectionHeaderIcon>
                <RiUser3Line size={18} />
              </SectionHeaderIcon>
              <span>STUDENT INFORMATION</span>
            </SectionHeader>
            <SectionBody>
              <FormRow>
                <Input
                  label="Full Name"
                  placeholder="Enter student full name"
                  leftIcon={<RiUser3Line size={18} />}
                  error={errors.studentFullName?.message}
                  {...register('studentFullName')}
                />
                <Input
                  label="Mobile Number"
                  placeholder="Enter mobile number"
                  leftIcon={<RiPhoneLine size={18} />}
                  error={errors.studentMobile?.message}
                  {...register('studentMobile')}
                />
              </FormRow>

              <FormRow>
                <Input
                  label="WhatsApp Number (if different)"
                  placeholder="Enter WhatsApp number"
                  leftIcon={<RiPhoneLine size={18} />}
                  error={errors.studentWhatsapp?.message}
                  {...register('studentWhatsapp')}
                />
                <Input
                  label="Email ID"
                  type="email"
                  placeholder="Enter email ID"
                  leftIcon={<RiMailLine size={18} />}
                  error={errors.studentEmail?.message}
                  {...register('studentEmail')}
                />
              </FormRow>

              <FormRow>
                <Input
                  label="PRIMARY Mobile Number (WhatsApp Number)"
                  placeholder="Enter primary mobile number"
                  leftIcon={<RiPhoneLine size={18} />}
                  error={errors.primaryMobile?.message}
                  {...register('primaryMobile')}
                />
                <Input
                  label="PRIMARY Email ID"
                  type="email"
                  placeholder="Enter primary email ID"
                  leftIcon={<RiMailLine size={18} />}
                  error={errors.primaryEmail?.message}
                  {...register('primaryEmail')}
                />
              </FormRow>
            </SectionBody>
          </SectionBlock>

          {/* SECTION B — FATHER'S DETAILS */}
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
                  placeholder="Enter father's full name"
                  leftIcon={<RiUser3Line size={18} />}
                  error={errors.fatherFullName?.message}
                  {...register('fatherFullName')}
                />
                <Input
                  label="Occupation / Designation"
                  placeholder="Enter occupation or designation"
                  leftIcon={<RiBriefcaseLine size={18} />}
                  error={errors.fatherOccupation?.message}
                  {...register('fatherOccupation')}
                />
              </FormRow>

              <FormRow>
                <Input
                  label="Organisation / Employer (if applicable)"
                  placeholder="Enter organisation or employer name"
                  leftIcon={<RiBuilding4Line size={18} />}
                  error={errors.fatherEmployer?.message}
                  {...register('fatherEmployer')}
                />
              </FormRow>
            </SectionBody>
          </SectionBlock>

          {/* SECTION C — MOTHER'S DETAILS */}
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
                  placeholder="Enter mother's full name"
                  leftIcon={<RiUser3Line size={18} />}
                  error={errors.motherFullName?.message}
                  {...register('motherFullName')}
                />
                <Input
                  label="Occupation / Designation"
                  placeholder="Enter occupation or designation"
                  leftIcon={<RiBriefcaseLine size={18} />}
                  error={errors.motherOccupation?.message}
                  {...register('motherOccupation')}
                />
              </FormRow>

              <FormRow>
                <Input
                  label="Organisation / Employer (if applicable)"
                  placeholder="Enter organisation or employer name"
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
