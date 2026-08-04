import React from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiAlertLine,
  RiInformationLine,
  RiCloseLine,
} from 'react-icons/ri';
import styled from 'styled-components';
import { useNotificationStore, NotificationType } from '@/store';

const ToastStack = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: ${({ theme }) => theme.zIndex.toast};
  max-width: 380px;
  width: calc(100% - 48px);
`;

const ToastItem = styled.div<{ $type: NotificationType }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.colors.shadowLg};

  border-left: 4px solid
    ${({ theme, $type }) => {
      if ($type === 'success') return theme.colors.success;
      if ($type === 'error') return theme.colors.danger;
      if ($type === 'warning') return theme.colors.warning;
      return theme.colors.info;
    }};
`;

const IconWrapper = styled.div<{ $type: NotificationType }>`
  color: ${({ theme, $type }) => {
    if ($type === 'success') return theme.colors.success;
    if ($type === 'error') return theme.colors.danger;
    if ($type === 'warning') return theme.colors.warning;
    return theme.colors.info;
  }};
  flex-shrink: 0;
  margin-top: 1px;
`;

const ToastContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ToastTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

const ToastMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 2px;
`;

const CloseBtn = styled.button`
  color: ${({ theme }) => theme.colors.textMuted};
  flex-shrink: 0;
  padding: 2px;
  border-radius: 4px;
  transition: color ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const icons: Record<NotificationType, React.ReactNode> = {
  success: <RiCheckboxCircleLine size={20} />,
  error: <RiErrorWarningLine size={20} />,
  warning: <RiAlertLine size={20} />,
  info: <RiInformationLine size={20} />,
};

export const ToastContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotificationStore();

  return createPortal(
    <ToastStack>
      <AnimatePresence>
        {notifications.map(n => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <ToastItem $type={n.type} role="alert" aria-live="polite">
              <IconWrapper $type={n.type}>{icons[n.type]}</IconWrapper>
              <ToastContent>
                <ToastTitle>{n.title}</ToastTitle>
                {n.message && <ToastMessage>{n.message}</ToastMessage>}
              </ToastContent>
              <CloseBtn onClick={() => removeNotification(n.id)} aria-label="Dismiss notification">
                <RiCloseLine size={16} />
              </CloseBtn>
            </ToastItem>
          </motion.div>
        ))}
      </AnimatePresence>
    </ToastStack>,
    document.body
  );
};
