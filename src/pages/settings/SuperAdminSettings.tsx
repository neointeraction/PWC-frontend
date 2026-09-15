import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  RiShieldLine,
  RiPaletteLine,
  RiSaveLine,
} from 'react-icons/ri';
import styled from 'styled-components';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useToast } from '@/hooks';
import { useAuthStore, useThemeStore } from '@/store';
import { authService } from '@/services/auth.service';
import { getApiErrorMessage } from '@/utils';
import { ROUTES } from '@/constants';

const TabsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  overflow-x: auto;
`;

const TabButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.fontWeight.semibold : theme.fontWeight.medium};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  border-bottom: 2px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary : 'transparent')};
  transition: all ${({ theme }) => theme.transition.fast};
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 640px;
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

const FormWrapper = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ToggleInfo = styled.div`
  h4 {
    font-size: ${({ theme }) => theme.fontSize.base};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text};
  }
  p {
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const SuperAdminSettings: React.FC = () => {
  const toast = useToast();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);

  const [superTab, setSuperTab] = useState<'security' | 'appearance'>('security');

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
        title="Super Admin Platform Settings"
        subtitle="Manage platform global configurations, master security policies, and system preferences"
        breadcrumbs={[{ label: 'Dashboard', href: ROUTES.DASHBOARD }, { label: 'Settings' }]}
      />

      <TabsContainer>
        <TabButton $active={superTab === 'security'} onClick={() => setSuperTab('security')}>
          <RiShieldLine size={18} /> Security
        </TabButton>
        <TabButton $active={superTab === 'appearance'} onClick={() => setSuperTab('appearance')}>
          <RiPaletteLine size={18} /> Appearance
        </TabButton>
      </TabsContainer>

      {superTab === 'security' && (
        <Card
          title="Security Settings"
          subtitle="Manage your password and security preferences"
        >
          <Form
            onSubmit={e => {
              e.preventDefault();
              if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                toast.error('Password Mismatch', 'New password and confirm password do not match.');
                return;
              }
              if (passwordForm.newPassword.length < 8) {
                toast.error('Weak Password', 'Password must be at least 8 characters long.');
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
              onChange={e => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
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
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Confirm new password"
              value={passwordForm.confirmPassword}
              onChange={e => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
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

      {superTab === 'appearance' && (
        <Card
          title="Appearance & Theme Preferences"
          subtitle="Customize interface mode and visual styling"
        >
          <FormWrapper>
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
          </FormWrapper>
        </Card>
      )}
    </div>
  );
};
