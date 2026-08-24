import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { RiUser3Line, RiMailLine, RiBuilding4Line, RiPhoneLine, RiCheckLine } from 'react-icons/ri';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Select } from '@/components/Select';
import { useToast } from '@/hooks';
import { studentService, StudentProfileUpdate } from '@/services/student.service';
import { CurrentStudent } from '@/types';
import { getApiErrorMessage } from '@/utils';

const profileSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Enter a valid email'),
  schoolName: z.string().min(1, 'School name is required'),
  grade: z.string().min(1, 'Grade is required'),
  guardianName: z.string().min(1, 'Guardian name is required'),
  guardianPhone: z.string().min(1, 'Guardian phone is required'),
  targetStream: z.string().min(1, 'Select target stream'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface StudentProfileFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  student?: CurrentStudent | null;
  initialName?: string;
  initialEmail?: string;
  onSuccess?: () => void;
}

const FormGrid = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const SectionHeader = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StudentProfileFormModal: React.FC<StudentProfileFormModalProps> = ({
  isOpen,
  onClose,
  student,
  initialName = 'Alex Johnson',
  initialEmail = 'student@pwc.com',
  onSuccess,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: initialName,
      email: initialEmail,
      schoolName: "St. Xavier's Senior Secondary School",
      grade: '11th Grade (Science)',
      guardianName: 'Robert Johnson',
      guardianPhone: '+91 98765 43210',
      targetStream: 'Engineering & Technology',
    },
  });

  // Prefill from the real student record once it loads.
  useEffect(() => {
    if (!isOpen || !student) return;
    reset({
      fullName: student.name || initialName,
      email: student.email || initialEmail,
      schoolName: "St. Xavier's Senior Secondary School",
      grade: '11th Grade (Science)',
      guardianName: student.father?.name || 'Robert Johnson',
      guardianPhone: student.parentMobile || '+91 98765 43210',
      targetStream: 'Engineering & Technology',
    });
  }, [isOpen, student, reset, initialName, initialEmail]);

  const confirmMutation = useMutation({
    mutationFn: (payload: StudentProfileUpdate) => studentService.confirmProfile(student!.id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-me'] });
      toast.success(
        'Profile Confirmed!',
        'Your profile has been confirmed. You can now move on to the pre-counselling form.'
      );
      onSuccess?.();
      onClose();
    },
    onError: (err: unknown) => {
      // 409 = already confirmed (not DRAFT) — treat as done rather than an error.
      if (err instanceof AxiosError && err.response?.status === 409) {
        queryClient.invalidateQueries({ queryKey: ['student-me'] });
        onSuccess?.();
        onClose();
        return;
      }
      toast.error('Error', getApiErrorMessage(err, 'Failed to confirm your profile.'));
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    if (!student?.id) {
      toast.success('Student Profile Completed!', `Profile details for ${data.fullName} saved.`);
      onSuccess?.();
      onClose();
      return;
    }
    // Send the editable fields this modal exposes (contract mirrors POST /students).
    const fullName = data.fullName.trim();
    const [firstName, ...rest] = fullName.split(/\s+/);
    confirmMutation.mutate({
      firstName: firstName || undefined,
      lastName: rest.length ? rest.join(' ') : undefined,
      fatherName: data.guardianName?.trim() || undefined,
      parentMobile: data.guardianPhone?.trim() || undefined,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Student Profile Form (Step 1 - Mandatory)"
      subtitle="Fill out your personal information, school details, and guardian contacts."
      size="lg"
    >
      <FormGrid onSubmit={handleSubmit(onSubmit)} noValidate>
        <SectionHeader>Personal Details</SectionHeader>
        <FormRow>
          <Input
            label="Full Name"
            placeholder="Enter full name"
            leftIcon={<RiUser3Line size={18} />}
            error={errors.fullName?.message}
            {...register('fullName')}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter email"
            leftIcon={<RiMailLine size={18} />}
            error={errors.email?.message}
            {...register('email')}
          />
        </FormRow>

        <SectionHeader>Academic Information</SectionHeader>
        <FormRow>
          <Input
            label="School / Institution Name"
            placeholder="Enter school name"
            leftIcon={<RiBuilding4Line size={18} />}
            error={errors.schoolName?.message}
            {...register('schoolName')}
          />
          <Select
            label="Current Grade / Class"
            value={watch('grade')}
            onChange={e => setValue('grade', e.target.value)}
            options={[
              { value: '9th Grade', label: '9th Grade' },
              { value: '10th Grade', label: '10th Grade' },
              { value: '11th Grade (Science)', label: '11th Grade (Science)' },
              { value: '11th Grade (Commerce)', label: '11th Grade (Commerce)' },
              { value: '11th Grade (Arts)', label: '11th Grade (Arts)' },
              { value: '12th Grade (Science)', label: '12th Grade (Science)' },
              { value: '12th Grade (Commerce)', label: '12th Grade (Commerce)' },
            ]}
          />
        </FormRow>

        <FormRow>
          <Select
            label="Primary Career Stream Focus"
            value={watch('targetStream')}
            onChange={e => setValue('targetStream', e.target.value)}
            options={[
              { value: 'Engineering & Technology', label: 'Engineering & Technology' },
              { value: 'Medical & Healthcare', label: 'Medical & Healthcare' },
              { value: 'Finance & Commerce', label: 'Finance & Commerce' },
              { value: 'Arts & Design', label: 'Arts & Design' },
              { value: 'Law & Management', label: 'Law & Management' },
            ]}
          />
        </FormRow>

        <SectionHeader>Parent / Guardian Contact</SectionHeader>
        <FormRow>
          <Input
            label="Guardian Name"
            placeholder="Enter guardian name"
            leftIcon={<RiUser3Line size={18} />}
            error={errors.guardianName?.message}
            {...register('guardianName')}
          />
          <Input
            label="Guardian Mobile Number"
            placeholder="Enter phone number"
            leftIcon={<RiPhoneLine size={18} />}
            error={errors.guardianPhone?.message}
            {...register('guardianPhone')}
          />
        </FormRow>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            leftIcon={<RiCheckLine size={18} />}
            isLoading={confirmMutation.isPending}
          >
            Save &amp; Complete Profile
          </Button>
        </div>
      </FormGrid>
    </Modal>
  );
};
