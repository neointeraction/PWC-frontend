import React from 'react';
import { RiCheckLine } from 'react-icons/ri';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import {
  SuccessIconBadge,
  SuccessModalDescription,
  SuccessModalContent,
  SuccessModalTitle,
  SuccessModalFooter,
} from './SuccessModal.styles';

export interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  onConfirm?: () => void;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = 'Success!',
  message,
  confirmText = 'Proceed',
  onConfirm,
  size = 'md',
  children,
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <SuccessModalContent>
        <SuccessIconBadge>
          <RiCheckLine size={32} />
        </SuccessIconBadge>

        <SuccessModalTitle>{title}</SuccessModalTitle>

        {message && <SuccessModalDescription>{message}</SuccessModalDescription>}

        {children}

        <SuccessModalFooter>
          <Button
            variant="primary"
            size="md"
            leftIcon={<RiCheckLine size={18} />}
            onClick={handleConfirm}
          >
            {confirmText}
          </Button>
        </SuccessModalFooter>
      </SuccessModalContent>
    </Modal>
  );
};
