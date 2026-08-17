import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { RiFileCopyLine, RiEyeLine, RiEyeOffLine, RiMailSendLine, RiInformationLine } from 'react-icons/ri';
import styled from 'styled-components';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { tenantManagementService } from '@/services/tenant-management.service';
import { useTenantManagementStore } from '@/store/tenant-management.store';
import { useToast } from '@/hooks';
import { getApiErrorMessage } from '@/utils';
import {
  FlexColumnGap,
  FlexRowBetween,
  CredentialNameText,
} from '../TenantManagement.styles';

const CredentialsBox = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceHover};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FieldRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const InputValGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ReadonlyVal = styled.div`
  flex: 1;
  font-family: monospace;
  font-size: ${({ theme }) => theme.fontSize.sm};
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  user-select: all;
`;

const SmallIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const InfoNote = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1e40af;
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.4;
`;

const TempPasswordNote = styled(InfoNote)`
  background-color: #fffbeb;
  border-color: #fde68a;
  color: #78350f;
`;

export const CredentialsModal: React.FC = () => {
  const toast = useToast();
  const { isCredentialsModalOpen, closeCredentialsModal, selectedUser } =
    useTenantManagementStore();
  const [showPassword, setShowPassword] = useState(false);

  const resetMutation = useMutation({
    mutationFn: (email: string) => tenantManagementService.sendPasswordReset(email),
    onSuccess: () => {
      toast.success(
        'Reset Email Sent',
        `If ${selectedUser?.email} is a registered account, a password reset link has been emailed.`
      );
    },
    onError: (err: unknown) => {
      toast.error('Error', getApiErrorMessage(err, 'Failed to send reset email.'));
    },
  });

  if (!selectedUser) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.info('Copied to Clipboard', `${label} has been copied.`);
  };

  const usernameVal = selectedUser.username || selectedUser.email;
  const tempPassword = selectedUser.generatedPassword;

  return (
    <Modal
      isOpen={isCredentialsModalOpen}
      onClose={closeCredentialsModal}
      title="Admin Login Credentials"
      subtitle={`Login details for ${selectedUser.name}`}
      size="md"
    >
      <FlexColumnGap>
        <FlexRowBetween>
          <div>
            <CredentialNameText>{selectedUser.name}</CredentialNameText>
          </div>
          <Badge variant={selectedUser.isViewOnly ? 'warning' : 'primary'}>
            {selectedUser.roleLabel}
          </Badge>
        </FlexRowBetween>

        <CredentialsBox>
          <FieldRow>
            <label>Login Email</label>
            <InputValGroup>
              <ReadonlyVal>{usernameVal}</ReadonlyVal>
              <SmallIconButton
                title="Copy Email"
                onClick={() => handleCopy(usernameVal, 'Login Email')}
              >
                <RiFileCopyLine size={18} />
              </SmallIconButton>
            </InputValGroup>
          </FieldRow>

          {tempPassword ? (
            <FieldRow>
              <label>Temporary Password</label>
              <InputValGroup>
                <ReadonlyVal>{showPassword ? tempPassword : '••••••••••••'}</ReadonlyVal>
                <SmallIconButton
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
                </SmallIconButton>
                <SmallIconButton
                  title="Copy Password"
                  onClick={() => handleCopy(tempPassword, 'Temporary Password')}
                >
                  <RiFileCopyLine size={18} />
                </SmallIconButton>
              </InputValGroup>
            </FieldRow>
          ) : null}
        </CredentialsBox>

        {tempPassword ? (
          <TempPasswordNote>
            <RiInformationLine size={18} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>
              <strong>Copy this now — it won't be shown again.</strong> The admin will be asked to
              set a new password on first login. If it's lost, use "Send Password Reset Email".
            </span>
          </TempPasswordNote>
        ) : (
          <InfoNote>
            <RiInformationLine size={18} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>
              For security, an existing password can't be viewed. Send a reset link so the admin
              can set a new one.
            </span>
          </InfoNote>
        )}

        <FlexRowBetween>
          <div />
          <Button
            variant="primary"
            size="sm"
            leftIcon={<RiMailSendLine size={16} />}
            isLoading={resetMutation.isPending}
            onClick={() => resetMutation.mutate(selectedUser.email)}
          >
            Send Password Reset Email
          </Button>
        </FlexRowBetween>
      </FlexColumnGap>
    </Modal>
  );
};
