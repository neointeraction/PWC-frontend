import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { RiLockLine, RiShieldKeyholeLine, RiCheckLine } from 'react-icons/ri';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useToast } from '@/hooks';
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
} from '../ResetPassword/ResetPasswordPage.styles';

const resetPasswordConfirmSchema = z
  .object({
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordConfirmFormData = z.infer<typeof resetPasswordConfirmSchema>;

export const ResetPasswordConfirmPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordConfirmFormData>({
    resolver: zodResolver(resetPasswordConfirmSchema),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      toast.success('Password Reset', 'Your password has been reset. Please sign in with your new password.');
      navigate(ROUTES.LOGIN, { replace: true });
    },
    onError: err => {
      toast.error('Error', getApiErrorMessage(err, 'This reset link is invalid or has expired.'));
    },
  });

  const onSubmit = (data: ResetPasswordConfirmFormData) => {
    if (!token) return;
    resetPasswordMutation.mutate({ token, newPassword: data.newPassword });
  };

  return (
    <ResetPasswordWrapper>
      <ResetPasswordCard>
        <LogoWrapper>
          <LogoImage src={logoImg} alt="kREATE Logo" />
        </LogoWrapper>

        <TitleWrapper>
          <Heading>Reset Password</Heading>
        </TitleWrapper>

        {!token ? (
          <>
            <SecurityAlertBox>
              <SecurityAlertIcon>
                <RiShieldKeyholeLine size={20} />
              </SecurityAlertIcon>
              <AlertText>
                This reset link is missing or invalid. Please request a new one from the forgot password page.
              </AlertText>
            </SecurityAlertBox>

            <Button
              type="button"
              variant="primary"
              fullWidth
              size="lg"
              onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
            >
              REQUEST NEW LINK
            </Button>
          </>
        ) : (
          <>
            <SecurityAlertBox>
              <SecurityAlertIcon>
                <RiShieldKeyholeLine size={20} />
              </SecurityAlertIcon>
              <AlertText>Enter a new password for your account.</AlertText>
            </SecurityAlertBox>

            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FormGroup>
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
                isLoading={resetPasswordMutation.isPending}
              >
                RESET PASSWORD
              </Button>
            </Form>
          </>
        )}
      </ResetPasswordCard>
    </ResetPasswordWrapper>
  );
};

export default ResetPasswordConfirmPage;
