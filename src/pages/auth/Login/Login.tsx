import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { RiUser3Line, RiLockLine, RiMailLine } from 'react-icons/ri';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/constants';
import { LoginPayload } from '@/types';
import logoImg from '@/assets/logo.png';
import {
  LoginWrapper,
  LoginCard,
  LogoWrapper,
  LogoTextWrapper,
  LogoTitle,
  LogoSubtitle,
  LoginTitleWrapper,
  LoginHeading,
  LoginSubtext,
  LoginForm,
  FormGroup,
  ForgotPasswordLink,
  HintBox,
  HintTitle,
  DemoButtons,
  ErrorAlert,
} from './Login.styles';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: data => {
      login(data.user, data.token);
      if (data.user.mustChangePassword) {
        navigate(ROUTES.RESET_PASSWORD);
      } else {
        navigate(ROUTES.DASHBOARD);
      }
    },
  });

  // Only the Super Admin account is seeded automatically (pnpm db:seed, backend
  // SEED_SUPER_ADMIN_EMAIL/SEED_SUPER_ADMIN_PASSWORD, default shown below).
  // Counsellor/Student accounts only exist once created via the app (no
  // self-register), so there's nothing real to shortcut for them yet.
  const fillSuperAdmin = () => {
    setValue('email', 'superadmin@kreate.local');
    setValue('password', 'ChangeMe123!');
  };

  return (
    <LoginWrapper>
      <LoginCard>
        <LogoWrapper>
          <img src={logoImg} alt="kREATE Logo" style={{ width: 40, height: 40, objectFit: 'contain' }} />
          <LogoTextWrapper>
            <LogoTitle>kREATE Portal</LogoTitle>
            <LogoSubtitle>Career Counselling Platform</LogoSubtitle>
          </LogoTextWrapper>
        </LogoWrapper>

        <LoginTitleWrapper>
          <LoginHeading>Sign In</LoginHeading>
          <LoginSubtext>Enter your user credentials to access your portal</LoginSubtext>
        </LoginTitleWrapper>

        <LoginForm onSubmit={handleSubmit(data => mutation.mutate(data))} noValidate>
          {mutation.isError && (
            <ErrorAlert role="alert">
              {mutation.error instanceof Error
                ? mutation.error.message
                : 'An error occurred. Please try again.'}
            </ErrorAlert>
          )}

          <FormGroup>
            <Input
              label="Username / Email"
              type="email"
              placeholder="Enter your username or email"
              leftIcon={<RiUser3Line size={18} />}
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              leftIcon={<RiLockLine size={18} />}
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password')}
            />
          </FormGroup>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            isLoading={mutation.isPending}
          >
            LOG IN
          </Button>

          <ForgotPasswordLink type="button">Forgot Password?</ForgotPasswordLink>
        </LoginForm>

        <HintBox>
          <HintTitle>Quick Demo Login Shortcuts</HintTitle>
          <DemoButtons>
            <Button size="sm" variant="secondary" onClick={fillSuperAdmin}>
              Super Admin (superadmin@kreate.local)
            </Button>
          </DemoButtons>
        </HintBox>

        <HintBox>
          <HintTitle>Mail Shortcuts</HintTitle>
          <DemoButtons>
            <Button size="sm" variant="primary" leftIcon={<RiMailLine size={16} />} onClick={() => navigate(ROUTES.PARENT_PRE_COUNSELLING_FORM)}>
              Mail 1
            </Button>
            <Button size="sm" variant="primary" leftIcon={<RiMailLine size={16} />} onClick={() => navigate(ROUTES.PARENT_FEEDBACK_FORM)}>
              Mail 2
            </Button>
          </DemoButtons>
        </HintBox>
      </LoginCard>
    </LoginWrapper>
  );
};
