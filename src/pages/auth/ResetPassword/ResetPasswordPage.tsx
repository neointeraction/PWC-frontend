import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RiLockLine, RiShieldKeyholeLine, RiCheckLine } from 'react-icons/ri';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useToast } from '@/hooks';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/constants';
import logoImg from '@/assets/logo.jpg';
import {
  ResetPasswordWrapper,
  ResetPasswordCard,
  LogoWrapper,
  LogoImage,
  TitleWrapper,
  Heading,
  SecurityAlertBox,
  SecurityAlertIcon,
  AlertText,
  Form,
  FormGroup,
} from './ResetPasswordPage.styles';

const resetPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(1, 'New password is required'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { role, setMustResetPassword } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (_data: ResetPasswordFormData) => {
    // Simulate API call for password update
    await new Promise(resolve => setTimeout(resolve, 600));
    setMustResetPassword(false);
    toast.success(
      'Password Changed Successfully',
      'Your account security details have been updated. Welcome to your portal.'
    );
    if (role === 'counselor') {
      navigate(ROUTES.UPCOMING_SESSIONS);
    } else if (role === 'student') {
      navigate(ROUTES.STUDENT_PORTAL);
    } else {
      navigate(ROUTES.DASHBOARD);
    }
  };

  return (
    <ResetPasswordWrapper>
      <ResetPasswordCard>
        <LogoWrapper>
          <LogoImage src={logoImg} alt="kREATE Logo" />
        </LogoWrapper>

        <TitleWrapper>
          <Heading>Mandatory Password Change</Heading>
        </TitleWrapper>

        <SecurityAlertBox>
          <SecurityAlertIcon>
            <RiShieldKeyholeLine size={20} />
          </SecurityAlertIcon>
          <AlertText>
            For privacy and security regulations, you are required to set a unique personal password upon first login.
          </AlertText>
        </SecurityAlertBox>

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormGroup>
            <Input
              label="Current / Temporary Password"
              type="password"
              placeholder="Enter current password"
              leftIcon={<RiLockLine size={18} />}
              error={errors.currentPassword?.message}
              {...register('currentPassword')}
            />

            <Input
              label="New Password"
              type="password"
              placeholder="Enter new password"
              leftIcon={<RiLockLine size={18} />}
              error={errors.newPassword?.message}
              {...register('newPassword')}
            />

            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Re-enter new password"
              leftIcon={<RiLockLine size={18} />}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </FormGroup>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            leftIcon={<RiCheckLine size={18} />}
            isLoading={isSubmitting}
          >
            UPDATE PASSWORD & CONTINUE
          </Button>
        </Form>
      </ResetPasswordCard>
    </ResetPasswordWrapper>
  );
};
export default ResetPasswordPage;
