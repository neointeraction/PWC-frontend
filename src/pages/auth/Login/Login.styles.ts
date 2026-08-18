import styled from 'styled-components';
import loginBgImg from '@/assets/login-bg.jpg';

export const LoginWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surface};

  @media (max-width: 959px) {
    flex-direction: column;
  }
`;

export const LeftBannerSection = styled.div`
  flex: 1;
  min-height: 100vh;
  background-image: url(${loginBgImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 24px 24px 24px;
  position: relative;

  @media (max-width: 959px) {
    min-height: 320px;
    flex: none;
    padding: 40px 20px 20px 20px;
  }
`;

export const BannerHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 400px;
  margin-top: 60px;
`;

export const BannerSubtext = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #64748b;
  margin-bottom: 12px;
  letter-spacing: -0.01em;
`;

export const DesignDestinyLogo = styled.img`
  height: 100px;
  width: auto;
  object-fit: contain;

  @media (max-width: 959px) {
    height: 48px;
  }
`;

export const RightFormSection = styled.div`
  flex: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 24px 24px 24px;
  background-color: ${({ theme }) => theme.colors.surface};
  overflow-y: auto;

  @media (max-width: 959px) {
    min-height: auto;
    padding: 32px 16px 24px 16px;
  }
`;

export const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 450px;
  margin: auto 0;
`;

export const KreateLogo = styled.img`
  height: 56px;
  width: auto;
  object-fit: contain;
  margin-bottom: 36px;

  @media (max-width: 959px) {
    height: 46px;
    margin-bottom: 24px;
  }
`;

export const LoginCard = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 36px 32px 28px 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);

  @media (max-width: 480px) {
    padding: 24px 20px 20px 20px;
  }
`;

export const CardHeader = styled.div`
  margin-bottom: 24px;
`;

export const CardTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 6px 0;
`;

export const CardSubtext = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

export const ForgotPasswordLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
  margin-top: 16px;
  text-align: center;
  width: 100%;
  transition: opacity ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
    text-decoration: underline;
  }
`;

export const DemoAccordion = styled.details`
  width: 100%;
  margin-top: 24px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  border: 1px solid ${({ theme }) => theme.colors.primaryMuted};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 12px;

  summary {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    user-select: none;
    outline: none;
  }
`;

export const DemoButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 10px;
`;

export const ErrorAlert = styled.div`
  background-color: ${({ theme }) => theme.colors.dangerLight};
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 12px;
  margin-bottom: 16px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.danger};
`;

export const FooterText = styled.footer`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  padding-top: 24px;
  margin-top: 16px;
`;
