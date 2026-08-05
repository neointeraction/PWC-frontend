import React, { useState } from 'react';
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
import { Checkbox } from '@/components/Checkbox';
import { useToast } from '@/hooks';
import { useThemeStore } from '@/store';
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

const SpacingTop = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
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

  const [superTab, setSuperTab] = useState<'security' | 'appearance'>('security');

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
              toast.success('Password Updated', 'Your password has been changed successfully.');
            }}
          >
            <Input label="Current Password" type="password" placeholder="Enter current password" />
            <Input label="New Password" type="password" placeholder="Enter new password" />
            <Input label="Confirm New Password" type="password" placeholder="Confirm new password" />
            <div>
              <Button type="submit" leftIcon={<RiSaveLine size={18} />}>
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
