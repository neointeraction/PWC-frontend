import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RiMailLine, RiArrowLeftLine } from 'react-icons/ri';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { ROUTES } from '@/constants';
import designDestinyLogo from '@/assets/design-destiny.png';
import kreateLogo from '@/assets/logo.jpg';
import { useToast } from '@/hooks';

// We reuse the login layout styles to maintain consistency
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
  FooterText,
} from '../Login/Login.styles';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (_data: ForgotPasswordFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSubmitted(true);
    toast.success(
      'Recovery Email Sent',
      'If an account matches that email, you will receive password reset instructions.'
    );
  };

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
              <CardTitle>Forgot Password</CardTitle>
              <CardSubtext>
                {isSubmitted
                  ? 'Check your email for reset instructions.'
                  : 'Enter your email address to receive a password reset link.'}
              </CardSubtext>
            </CardHeader>

            {!isSubmitted ? (
              <LoginForm onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormGroup>
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    leftIcon={<RiMailLine size={18} />}
                    error={errors.email?.message}
                    {...register('email')}
                  />
                </FormGroup>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="lg"
                  isLoading={isSubmitting}
                >
                  SEND RESET LINK
                </Button>
                
                <Button
                  type="button"
                  variant="ghost"
                  fullWidth
                  leftIcon={<RiArrowLeftLine size={16} />}
                  onClick={() => navigate(ROUTES.LOGIN)}
                  style={{ marginTop: '16px' }}
                >
                  Back to Login
                </Button>
              </LoginForm>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Button
                  type="button"
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={() => navigate(ROUTES.LOGIN)}
                >
                  RETURN TO LOGIN
                </Button>
              </div>
            )}
          </LoginCard>
        </CenterContent>

        <FooterText>©Design Destiny. All Rights Reserved.</FooterText>
      </RightFormSection>
    </LoginWrapper>
  );
};
