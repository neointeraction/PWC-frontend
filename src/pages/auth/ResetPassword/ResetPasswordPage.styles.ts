import styled from 'styled-components';

export const ResetPasswordWrapper = styled.div`
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

export const ResetPasswordCard = styled.div`
  width: 100%;
  max-width: 480px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 4px;
  box-shadow: ${({ theme }) => theme.colors.shadowLg};
  padding: ${({ theme }) => theme.spacing.xxl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const LogoImage = styled.img`
  height: 48px;
  width: auto;
  object-fit: contain;
`;

export const TitleWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Heading = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const SecurityAlertBox = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  border: 1px solid ${({ theme }) => `${theme.colors.primary}33`};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SecurityAlertIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  margin-top: 2px;
`;

export const AlertText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1.4;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const PasswordRequirementsList = styled.ul`
  margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
  padding-left: ${({ theme }) => theme.spacing.lg};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};

  li {
    margin-bottom: 2px;
  }
`;
