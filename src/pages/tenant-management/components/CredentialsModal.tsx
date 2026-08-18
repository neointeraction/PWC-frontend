import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RiFileCopyLine, RiEyeLine, RiEyeOffLine, RiRefreshLine, RiLockPasswordLine } from 'react-icons/ri';
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
  min-height: 20px;
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const CredentialsModal: React.FC = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { isCredentialsModalOpen, closeCredentialsModal, selectedUser } =
    useTenantManagementStore();
  const [showPassword, setShowPassword] = useState(false);
  // Holds the plaintext password to display — the one-time value from creating the
  // admin, or a freshly regenerated one. An existing admin's password can't be read
  // back (it's hashed), so it stays masked until regenerated.
  const [password, setPassword] = useState<string | undefined>();

  useEffect(() => {
    if (isCredentialsModalOpen) {
      setPassword(selectedUser?.generatedPassword);
      setShowPassword(false);
    }
  }, [isCredentialsModalOpen, selectedUser]);

  const regenMutation = useMutation({
    mutationFn: (id: string) => tenantManagementService.regeneratePassword(id),
    onSuccess: record => {
      setPassword(record.generatedPassword);
      setShowPassword(true);
      queryClient.invalidateQueries({ queryKey: ['tenant-records'] });
      toast.success('Password Regenerated', `A new password was generated for ${record.name}.`);
    },
    onError: (err: unknown) => {
      toast.error('Error', getApiErrorMessage(err, 'Failed to regenerate password.'));
    },
  });

  if (!selectedUser) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.info('Copied to Clipboard', `${label} has been copied.`);
  };

  const usernameVal = selectedUser.username || selectedUser.email;
  const hasPassword = Boolean(password);
  const passwordDisplay = hasPassword && showPassword ? password : '••••••••••••';

  return (
    <Modal
      isOpen={isCredentialsModalOpen}
      onClose={closeCredentialsModal}
      title="Tenant Login Credentials"
      subtitle={`Security login details for ${selectedUser.name}`}
      size="md"
    >
      <FlexColumnGap>
        <FlexRowBetween>
          <div>
            <CredentialNameText>{selectedUser.name}</CredentialNameText>
          </div>
          <Badge variant={selectedUser.isViewOnly ? 'warning' : 'primary'}>
            {selectedUser.userCategory.toUpperCase()} USER
          </Badge>
        </FlexRowBetween>

        <CredentialsBox>
          <FieldRow>
            <label>Login Email / Username</label>
            <InputValGroup>
              <ReadonlyVal>{usernameVal}</ReadonlyVal>
              <SmallIconButton
                type="button"
                title="Copy Username"
                onClick={() => handleCopy(usernameVal, 'Username/Email')}
              >
                <RiFileCopyLine size={18} />
              </SmallIconButton>
            </InputValGroup>
          </FieldRow>

          <FieldRow>
            <label>Generated Password</label>
            <InputValGroup>
              <ReadonlyVal>{passwordDisplay}</ReadonlyVal>
              <SmallIconButton
                type="button"
                title={showPassword ? 'Hide Password' : 'Show Password'}
                disabled={!hasPassword}
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
              </SmallIconButton>
              <SmallIconButton
                type="button"
                title="Copy Password"
                disabled={!hasPassword}
                onClick={() => password && handleCopy(password, 'Password')}
              >
                <RiFileCopyLine size={18} />
              </SmallIconButton>
            </InputValGroup>
          </FieldRow>
        </CredentialsBox>

        <FlexRowBetween>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<RiRefreshLine size={16} />}
            isLoading={regenMutation.isPending}
            onClick={() => regenMutation.mutate(selectedUser.id)}
          >
            Regenerate Password
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<RiLockPasswordLine size={16} />}
            disabled={!hasPassword}
            onClick={() => {
              const fullText = `kREATE Platform Credentials:\nName: ${selectedUser.name}\nUsername: ${usernameVal}\nPassword: ${password}\nPortal: kREATE Career Counselling Platform`;
              handleCopy(fullText, 'Full Credentials Package');
            }}
          >
            Copy Full Credentials Package
          </Button>
        </FlexRowBetween>
      </FlexColumnGap>
    </Modal>
  );
};
