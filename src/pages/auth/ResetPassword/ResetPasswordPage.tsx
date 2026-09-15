import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { RiLockLine, RiShieldKeyholeLine, RiCheckLine } from 'react-icons/ri';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useToast } from '@/hooks';
import { useAuthStore } from '@/store';
import { authService } from '@/services/auth.service';
import { ROUTES } from '@/constants';
import { getApiErrorMessage } from '@/utils';
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
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
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
  const logout = useAuthStore(state => state.logout);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const changePasswordMutation = useMutation({
    mutationFn: authService.changePassword,
    onSuccess: () => {
      // The backend revokes every refresh session on a successful change, so the
      // current session is already dead server-side — sign out and send the user
      // back to login rather than letting the next token refresh fail mid-task.
      toast.success('Password Changed Successfully', 'Please relogin with your new password.');
      logout();
      navigate(ROUTES.LOGIN, { replace: true });
    },
    onError: err => {
      toast.error('Error', getApiErrorMessage(err, 'Failed to change password.'));
    },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    changePasswordMutation.mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
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
            isLoading={changePasswordMutation.isPending}
          >
            UPDATE PASSWORD & CONTINUE
          </Button>
        </Form>
      </ResetPasswordCard>
    </ResetPasswordWrapper>
  );
};
export default ResetPasswordPage;
