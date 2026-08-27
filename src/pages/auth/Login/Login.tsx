import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { RiUser3Line, RiLockLine } from 'react-icons/ri';
// import { RiMailLine } from 'react-icons/ri'; // used by the commented-out demo shortcuts below
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/constants';
import { LoginPayload } from '@/types';
import designDestinyLogo from '@/assets/design-destiny.png';
import kreateLogo from '@/assets/logo.jpg';
import {
  LoginWrapper,
  LeftBannerSection,
  BannerHeader,
  BannerSubtext,
  DesignDestinyLogo,
  RightFormSection,
  CenterContent,
  KreateLogo,
  LoginCard,
  CardHeader,
  CardTitle,
  CardSubtext,
  LoginForm,
  FormGroup,
  ForgotPasswordLink,
  // DemoAccordion,
  // DemoButtons,
  ErrorAlert,
  FooterText,
} from './Login.styles';

const loginSchema = z.object({
  email: z.string().min(1, 'Username or Email is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: data => {
      login(data.user, data.token);
      // Only force the change-password step when the backend actually requires it
      // (first login / temp password). Otherwise land on the role's home — a returning
      // student goes straight to their portal instead of being re-prompted to reset.
      if (useAuthStore.getState().mustResetPassword) {
        navigate(ROUTES.RESET_PASSWORD);
        return;
      }
      switch (data.user.role) {
        case 'student':
          navigate(ROUTES.STUDENT_PORTAL);
          break;
        case 'counselor':
          navigate(ROUTES.UPCOMING_SESSIONS);
          break;
        case 'admin':
          navigate(ROUTES.PROJECTS);
          break;
        default:
          navigate(ROUTES.DASHBOARD);
      }
    },
  });

  // Demo quick-login shortcuts — kept alongside the commented-out <DemoAccordion> block below.
  // const fillPwcUser = () => {
  //   setValue('email', 'sunita.sharma@pwc-global.com');
  //   setValue('password', 'PWC@User2026!');
  // };

  // const fillSuperAdmin = () => {
  //   setValue('email', 'admin@pwc.com');
  //   setValue('password', 'admin123');
  // };

  // const fillViewOnlyUser = () => {
  //   setValue('email', 'viewer@pwc.com');
  //   setValue('password', 'viewer123');
  // };

  // const fillCounselor = () => {
  //   setValue('email', 'counselor@pwc.com');
  //   setValue('password', 'counselor123');
  // };

  // const fillStudent = () => {
  //   setValue('email', 'student@pwc.com');
  //   setValue('password', 'student123');
  // };

  return (
    <LoginWrapper>
      <LeftBannerSection>
        <BannerHeader>
          <BannerSubtext>A Career Infrastructure Platform by</BannerSubtext>
          <DesignDestinyLogo src={designDestinyLogo} alt="Design Destiny" />
        </BannerHeader>
      </LeftBannerSection>

      <RightFormSection>
        <CenterContent>
          <KreateLogo src={kreateLogo} alt="Kreate Logo" />

          <LoginCard>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardSubtext>Enter your user credentials to access your portal</CardSubtext>
            </CardHeader>

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
                  type="text"
                  placeholder="Enter your username or email"
                  leftIcon={<RiUser3Line size={18} />}
                  autoComplete="username"
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

              <ForgotPasswordLink type="button" onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}>Forgot Password?</ForgotPasswordLink>
            </LoginForm>

            {/* <DemoAccordion>
              <summary>Quick Demo Login Shortcuts & Mail Form Links</summary>
              <DemoButtons>
                <Button size="sm" variant="secondary" onClick={fillSuperAdmin}>
                  Super Admin (admin@pwc.com)
                </Button>
                <Button size="sm" variant="secondary" onClick={fillPwcUser}>
                  kREATE User / Admin (sunita.sharma@pwc-global.com)
                </Button>
                <Button size="sm" variant="secondary" onClick={fillViewOnlyUser}>
                  kREATE View-Only Account (viewer@pwc.com)
                </Button>
                <Button size="sm" variant="secondary" onClick={fillCounselor}>
                  Counselor (counselor@pwc.com)
                </Button>
                <Button size="sm" variant="secondary" onClick={fillStudent}>
                  Student (student@pwc.com)
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  leftIcon={<RiMailLine size={14} />}
                  onClick={() => navigate(ROUTES.PARENT_PRE_COUNSELLING_FORM)}
                >
                  Mail 1 (Pre-Counselling Form)
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  leftIcon={<RiMailLine size={14} />}
                  onClick={() => navigate(ROUTES.PARENT_FEEDBACK_FORM)}
                >
                  Mail 2 (Parent Feedback Form)
                </Button>
              </DemoButtons>
            </DemoAccordion> */}
          </LoginCard>
        </CenterContent>

        <FooterText>©Design Destiny. All Rights Reserved.</FooterText>
      </RightFormSection>
    </LoginWrapper>
  );
};
