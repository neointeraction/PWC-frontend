import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { RiUser3Line, RiLockLine } from 'react-icons/ri';
import styled from 'styled-components';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/constants';
import { LoginPayload } from '@/types';

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primaryLight} 0%,
    ${({ theme }) => theme.colors.background} 100%
  );
  padding: ${({ theme }) => theme.spacing.lg};
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 440px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.colors.shadowLg};
  padding: ${({ theme }) => theme.spacing.xxl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const LogoIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primaryHover} 100%
  );
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 22px;
  box-shadow: 0 4px 12px ${({ theme }) => `${theme.colors.primary}33`};
`;

const LogoText = styled.div`
  h1 {
    font-size: 20px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
  }
  p {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const LoginTitle = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  h2 {
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 4px;
  }
  p {
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ForgotPasswordLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSize.xs};
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing.md};
  text-align: center;
  width: 100%;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
    text-decoration: underline;
  }
`;

const HintBox = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.primaryMuted};

  .title {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 8px;
    text-align: center;
  }

  .demo-buttons {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;

const ErrorAlert = styled.div`
  background-color: ${({ theme }) => theme.colors.dangerLight};
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.danger};
`;

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
      navigate(ROUTES.DASHBOARD);
    },
  });

  const fillPwcUser = () => {
    setValue('email', 'sarah.connor@pwc-global.com');
    setValue('password', 'PWC@User2026!');
  };

  const fillSuperAdmin = () => {
    setValue('email', 'admin@pwc.com');
    setValue('password', 'admin123');
  };

  return (
    <LoginWrapper>
      <LoginCard>
        <LogoWrapper>
          <LogoIcon>k</LogoIcon>
          <LogoText>
            <h1>kREATE Portal</h1>
            <p>Career Counselling Platform</p>
          </LogoText>
        </LogoWrapper>

        <LoginTitle>
          <h2>Sign In</h2>
          <p>Enter your user credentials to access your portal</p>
        </LoginTitle>

        <form onSubmit={handleSubmit(data => mutation.mutate(data))} noValidate>
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
        </form>

        <HintBox>
          <p className="title">Quick Demo Login Shortcuts</p>
          <div className="demo-buttons">
            <Button size="sm" variant="secondary" onClick={fillSuperAdmin}>
              Super Admin (admin@pwc.com)
            </Button>
            <Button size="sm" variant="secondary" onClick={fillPwcUser}>
              kREATE User / Admin (sarah.connor@pwc-global.com)
            </Button>
          </div>
        </HintBox>
      </LoginCard>
    </LoginWrapper>
  );
};
