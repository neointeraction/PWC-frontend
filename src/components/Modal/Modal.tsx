import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { RiCloseLine } from 'react-icons/ri';
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalSubtitle,
  CloseButton,
  ModalBody,
  ModalBodyContent,
  ModalFooter,
} from './Modal.styles';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  footer?: React.ReactNode;
  children: React.ReactNode;
  closeOnBackdrop?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  size = 'md',
  footer,
  children,
  closeOnBackdrop = true,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <Overlay
          onClick={closeOnBackdrop ? onClose : undefined}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            onClick={e => e.stopPropagation()}
          >
            <ModalContainer $size={size}>
              {(title || subtitle) && (
                <ModalHeader>
                  <div>
                    {title && <ModalTitle id="modal-title">{title}</ModalTitle>}
                    {subtitle && <ModalSubtitle>{subtitle}</ModalSubtitle>}
                  </div>
                  <CloseButton onClick={onClose} aria-label="Close modal">
                    <RiCloseLine size={20} />
                  </CloseButton>
                </ModalHeader>
              )}
              <ModalBody>
                <ModalBodyContent>{children}</ModalBodyContent>
              </ModalBody>
              {footer && <ModalFooter>{footer}</ModalFooter>}
            </ModalContainer>
          </motion.div>
        </Overlay>
      )}
    </AnimatePresence>,
    document.body
  );
};
