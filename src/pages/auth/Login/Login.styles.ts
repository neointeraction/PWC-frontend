import styled from 'styled-components';

export const LoginWrapper = styled.div`
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

export const LoginCard = styled.div`
  width: 100%;
  max-width: 440px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.colors.shadowLg};
  padding: ${({ theme }) => theme.spacing.xxl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const LogoIcon = styled.div`
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

export const LogoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LogoTitle = styled.h1`
  font-size: 20px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const LogoSubtitle = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

export const LoginTitleWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const LoginHeading = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 4px 0;
`;

export const LoginSubtext = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
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
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const ForgotPasswordLink = styled.button`
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

export const HintBox = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.primaryMuted};
`;

export const HintTitle = styled.p`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 8px 0;
  text-align: center;
`;

export const DemoButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ErrorAlert = styled.div`
  background-color: ${({ theme }) => theme.colors.dangerLight};
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.danger};
`;
