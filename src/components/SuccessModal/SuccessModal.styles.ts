import styled, { keyframes } from 'styled-components';

const popIn = keyframes`
  0% {
    transform: scale(0.4);
    opacity: 0;
  }
  65% {
    transform: scale(1.15);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const pulseRing = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.4);
  }
  70% {
    box-shadow: 0 0 0 16px rgba(22, 163, 74, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(22, 163, 74, 0);
  }
`;

export const SuccessModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.sm} 0;
`;

export const SuccessIconBadge = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%);
  color: #15803D;
  border: 3px solid #86EFAC;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.md} auto;
  animation: ${popIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards,
             ${pulseRing} 2s infinite 0.5s;
  box-shadow: 0 4px 14px rgba(22, 163, 74, 0.18);
  flex-shrink: 0;
`;

export const SuccessModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`;

export const SuccessModalDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  line-height: 1.5;
  max-width: 440px;
`;

export const SuccessModalFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.md};
`;
