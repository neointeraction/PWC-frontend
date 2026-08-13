import React from 'react';
import { ConfirmDialog } from '../ConfirmDialog';
import { SuccessModal } from '../SuccessModal';

export interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  description?: string;
  variant?: 'info' | 'warning' | 'danger' | 'success';
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  variant = 'info',
  confirmText = 'OK',
  cancelText = 'Cancel',
  isLoading = false,
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  if (variant === 'success') {
    return (
      <SuccessModal
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        message={description}
        confirmText={confirmText || 'OK'}
        onConfirm={handleConfirm}
      />
    );
  }

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={title}
      description={description}
      confirmLabel={confirmText}
      cancelLabel={onConfirm ? cancelText : undefined}
      isLoading={isLoading}
      isDangerous={variant === 'danger'}
    />
  );
};
