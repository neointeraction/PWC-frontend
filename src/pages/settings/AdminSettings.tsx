import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  RiShieldLine,
  RiPaletteLine,
  RiSaveLine,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { PasswordRequirements } from '@/components/PasswordRequirements';
import { useToast } from '@/hooks';
import { useAuthStore, useThemeStore } from '@/store';
import { authService } from '@/services/auth.service';
import { getApiErrorMessage, isValidPassword } from '@/utils';
import { ROUTES } from '@/constants';

const TabsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
`;

const TabButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  border-bottom: 2px solid
    ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.textSecondary};
  font-weight: ${({ $active, theme }) =>
    $active ? theme.fontWeight.bold : theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSize.sm};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 600px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const ToggleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  h4 {
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    font-size: ${({ theme }) => theme.fontSize.xs};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const AdminSettings: React.FC = () => {
  const toast = useToast();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);

  const [activeTab, setActiveTab] = useState<'security' | 'appearance'>('security');

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const changePasswordMutation = useMutation({
    mutationFn: authService.changePassword,
    onSuccess: () => {
      // The backend revokes every refresh session on a successful change, so the
      // current session is already dead server-side — sign out and send the user
      // back to login rather than letting the next token refresh fail mid-task.
      toast.success('Password Updated', 'Your password has been changed. Please sign in again.');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      logout();
      navigate(ROUTES.LOGIN, { replace: true });
    },
    onError: err => {
      toast.error('Error', getApiErrorMessage(err, 'Failed to change password.'));
    },
  });

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Manage your security policies and appearance preferences."
        breadcrumbs={[{ label: 'Dashboard', href: ROUTES.DASHBOARD }, { label: 'Settings' }]}
      />

      <TabsContainer>
        <TabButton $active={activeTab === 'security'} onClick={() => setActiveTab('security')}>
          <RiShieldLine size={18} /> Security
        </TabButton>
        <TabButton $active={activeTab === 'appearance'} onClick={() => setActiveTab('appearance')}>
          <RiPaletteLine size={18} /> Appearance
        </TabButton>
      </TabsContainer>

      {/* Tab 1: Security */}
      {activeTab === 'security' && (
        <Card
          title="Change Password"
          subtitle="Update your account password to maintain account security"
        >
          <Form
            onSubmit={e => {
              e.preventDefault();
              if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                toast.error('Password Mismatch', 'New password and confirm password do not match.');
                return;
              }
              if (!isValidPassword(passwordForm.newPassword)) {
                toast.error('Weak Password', 'New password does not meet all the requirements listed below the field.');
                return;
              }
              if (passwordForm.newPassword === passwordForm.currentPassword) {
                toast.error('Same Password', 'New password must be different from the current password.');
                return;
              }
              changePasswordMutation.mutate({
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword,
              });
            }}
          >
            <Input
              label="Current Password"
              type="password"
              placeholder="Enter current password"
              value={passwordForm.currentPassword}
              onChange={e =>
                setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))
              }
              required
            />
            <Input
              label="New Password"
              type="password"
              placeholder="Enter new password"
              value={passwordForm.newPassword}
              onChange={e => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
              required
            />
            <PasswordRequirements password={passwordForm.newPassword} />
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Re-enter new password"
              value={passwordForm.confirmPassword}
              onChange={e =>
                setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))
              }
              required
            />
            <div>
              <Button
                type="submit"
                leftIcon={<RiSaveLine size={18} />}
                isLoading={changePasswordMutation.isPending}
              >
                Update Password
              </Button>
            </div>
          </Form>
        </Card>
      )}

      {/* Tab 2: Appearance */}
      {activeTab === 'appearance' && (
        <Card
          title="Appearance & Theme Preferences"
          subtitle="Customize interface mode and visual styling"
        >
          <FormContainer>
            <ToggleRow>
              <ToggleInfo>
                <h4>Interface Theme Mode</h4>
                <p>
                  Current theme mode: <strong>{theme.toUpperCase()}</strong>
                </p>
              </ToggleInfo>
              <Button variant="secondary" onClick={toggleTheme}>
                Toggle {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </Button>
            </ToggleRow>
          </FormContainer>
        </Card>
      )}
    </div>
  );
};

export default AdminSettings;
