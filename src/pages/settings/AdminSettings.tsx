import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RiBuilding4Line,
  RiBankCardLine,
  RiTeamLine,
  RiNotification3Line,
  RiShieldLine,
  RiPaletteLine,
  RiSaveLine,
  RiAddLine,
} from 'react-icons/ri';
import styled from 'styled-components';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Badge } from '@/components/Badge';
import { Table, Column } from '@/components/Table';
import { Modal } from '@/components/Modal';
import { Checkbox } from '@/components/Checkbox';
import { settingsService } from '@/services/settings.service';
import { useToast } from '@/hooks';
import { useThemeStore } from '@/store';
import { AdminUser } from '@/types';
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

export const AdminSettings: React.FC = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { theme, toggleTheme } = useThemeStore();

  const [instTab, setInstTab] = useState<
    'institution' | 'subscription' | 'admins' | 'notifications' | 'security' | 'appearance'
  >('institution');
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);

  const [institutionForm, setInstitutionForm] = useState({
    name: 'Phoenix Water Club Career Institute',
    email: 'sarah.connor@pwc-global.com',
    phone: '+1 (555) 234-5678',
    address: '750 Academic Parkway, San Francisco, CA 94107',
    website: 'https://careers.phoenixwaterclub.edu',
  });

  const [newAdminForm, setNewAdminForm] = useState({
    name: '',
    email: '',
    role: 'counselor' as const,
  });

  const { data: subscription } = useQuery({
    queryKey: ['subscription-info'],
    queryFn: settingsService.getSubscriptionInfo,
  });

  const { data: adminUsers, isLoading: isAdminsLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: settingsService.getAdminUsers,
  });

  const { data: notifPrefs } = useQuery({
    queryKey: ['notification-prefs'],
    queryFn: settingsService.getNotificationPreferences,
  });

  const { data: securitySettings } = useQuery({
    queryKey: ['security-settings'],
    queryFn: settingsService.getSecuritySettings,
  });

  const updateProfileMutation = useMutation({
    mutationFn: settingsService.updateInstitutionProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['institution-profile'] });
      toast.success('Profile Saved', 'Updated institution profile information.');
    },
  });

  const addAdminMutation = useMutation({
    mutationFn: settingsService.addAdminUser,
    onSuccess: newUser => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('Admin Added', `Sent invitation to ${newUser.email}`);
      setIsAddAdminModalOpen(false);
      setNewAdminForm({ name: '', email: '', role: 'counselor' });
    },
  });

  const adminColumns: Column<AdminUser>[] = [
    {
      key: 'name',
      header: 'Name',
      render: row => (
        <div>
          <span style={{ fontWeight: 600 }}>{row.name}</span>
          <div style={{ fontSize: '12px', color: '#64748b' }}>{row.email}</div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: row => (
        <Badge variant={row.role === 'super_admin' ? 'primary' : 'info'}>
          {row.role.replace('_', ' ').toUpperCase()}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: row => (
        <Badge variant={row.status === 'active' ? 'success' : 'default'} dot>
          {row.status}
        </Badge>
      ),
    },
    { key: 'lastActive', header: 'Last Active' },
  ];

  return (
    <div>
      <PageHeader
        title="Admin Settings & Configuration"
        subtitle="Manage institution profile, subscription plans, admin users, notifications, security, and appearance"
        breadcrumbs={[{ label: 'Dashboard', href: ROUTES.DASHBOARD }, { label: 'Settings' }]}
      />

      <TabsContainer>
        <TabButton $active={instTab === 'institution'} onClick={() => setInstTab('institution')}>
          <RiBuilding4Line size={18} /> Institution
        </TabButton>
        <TabButton $active={instTab === 'subscription'} onClick={() => setInstTab('subscription')}>
          <RiBankCardLine size={18} /> Subscription
        </TabButton>
        <TabButton $active={instTab === 'admins'} onClick={() => setInstTab('admins')}>
          <RiTeamLine size={18} /> Admin Users
        </TabButton>
        <TabButton
          $active={instTab === 'notifications'}
          onClick={() => setInstTab('notifications')}
        >
          <RiNotification3Line size={18} /> Notifications
        </TabButton>
        <TabButton $active={instTab === 'security'} onClick={() => setInstTab('security')}>
          <RiShieldLine size={18} /> Security
        </TabButton>
        <TabButton $active={instTab === 'appearance'} onClick={() => setInstTab('appearance')}>
          <RiPaletteLine size={18} /> Appearance
        </TabButton>
      </TabsContainer>

      {/* Tab 1: Institution Profile */}
      {instTab === 'institution' && (
        <Card
          title="Institution Profile"
          subtitle="General details and contact information for your institution"
        >
          <Form
            onSubmit={e => {
              e.preventDefault();
              updateProfileMutation.mutate(institutionForm);
            }}
          >
            <Input
              label="Institution Name"
              value={institutionForm.name}
              onChange={e => setInstitutionForm(prev => ({ ...prev, name: e.target.value }))}
            />
            <Input
              label="Primary Email"
              type="email"
              value={institutionForm.email}
              onChange={e => setInstitutionForm(prev => ({ ...prev, email: e.target.value }))}
            />
            <Input
              label="Phone Number"
              value={institutionForm.phone}
              onChange={e => setInstitutionForm(prev => ({ ...prev, phone: e.target.value }))}
            />
            <Input
              label="Physical Address"
              value={institutionForm.address}
              onChange={e => setInstitutionForm(prev => ({ ...prev, address: e.target.value }))}
            />
            <Input
              label="Website URL"
              value={institutionForm.website}
              onChange={e => setInstitutionForm(prev => ({ ...prev, website: e.target.value }))}
            />
            <div>
              <Button
                type="submit"
                leftIcon={<RiSaveLine size={18} />}
                isLoading={updateProfileMutation.isPending}
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </Card>
      )}

      {/* Tab 2: Subscription */}
      {instTab === 'subscription' && (
        <Card
          title="Subscription Plan & Seats"
          subtitle="Current billing plan and student seat allocation"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                backgroundColor: '#eff6ff',
                borderRadius: '8px',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#1e3a8a',
                    textTransform: 'uppercase',
                  }}
                >
                  Current Plan
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e3a8a', marginTop: 4 }}>
                  {subscription?.plan.toUpperCase()} PLAN
                </h3>
              </div>
              <Badge variant="success">Active</Badge>
            </div>

            <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}
              >
                <span style={{ fontWeight: 600 }}>Student Seats Allocated</span>
                <span>
                  {subscription?.seatsUsed} / {subscription?.seatsAllocated} Used
                </span>
              </div>
              <div
                style={{
                  height: '8px',
                  width: '100%',
                  backgroundColor: '#e2e8f0',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${
                      ((subscription?.seatsUsed || 50) / (subscription?.seatsAllocated || 100)) *
                      100
                    }%`,
                    backgroundColor: '#1e3a8a',
                  }}
                />
              </div>
            </div>

            <div style={{ fontSize: '14px', color: '#64748b' }}>
              <p>
                Renews On: <strong>{subscription?.renewsOn}</strong>
              </p>
              <p style={{ marginTop: 4 }}>
                Billing Email: <strong>{subscription?.billingEmail}</strong>
              </p>
            </div>

            <div>
              <Button
                variant="primary"
                onClick={() =>
                  toast.info('Subscription Upgrade', 'Contact sales to upgrade seat limit.')
                }
              >
                Upgrade Subscription
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Tab 3: Admin Users */}
      {instTab === 'admins' && (
        <Card
          title="Institution Administrator Users"
          subtitle="Manage staff access levels and permissions"
        >
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
            <Button
              leftIcon={<RiAddLine size={18} />}
              onClick={() => setIsAddAdminModalOpen(true)}
            >
              Add Admin User
            </Button>
          </div>
          <Table
            columns={adminColumns}
            data={adminUsers ?? []}
            isLoading={isAdminsLoading}
            keyExtractor={row => row.id}
          />
        </Card>
      )}

      {/* Tab 4: Notifications */}
      {instTab === 'notifications' && (
        <Card
          title="Notification Preferences"
          subtitle="Configure automated email and system notification alerts"
        >
          <div style={{ maxWidth: '600px' }}>
            <ToggleRow>
              <ToggleInfo>
                <h4>Email Alerts</h4>
                <p>Receive email notifications for important system events</p>
              </ToggleInfo>
              <Checkbox
                defaultChecked={notifPrefs?.emailAlerts ?? true}
                onChange={() =>
                  toast.success('Preference Saved', 'Updated email alert preference.')
                }
              />
            </ToggleRow>

            <ToggleRow>
              <ToggleInfo>
                <h4>SMS Notifications</h4>
                <p>Send text message reminders for counseling appointments</p>
              </ToggleInfo>
              <Checkbox
                defaultChecked={notifPrefs?.smsNotifications ?? true}
                onChange={() => toast.success('Preference Saved', 'Updated SMS notification preference.')}
              />
            </ToggleRow>

            <ToggleRow>
              <ToggleInfo>
                <h4>Weekly Analytics Digest</h4>
                <p>Receive weekly summary reports of student assessment completion</p>
              </ToggleInfo>
              <Checkbox
                defaultChecked={notifPrefs?.weeklyDigests ?? true}
                onChange={() =>
                  toast.success('Preference Saved', 'Updated weekly digest preference.')
                }
              />
            </ToggleRow>

            <ToggleRow>
              <ToggleInfo>
                <h4>Pending Approvals Reminders</h4>
                <p>Alert when career submissions require institution review</p>
              </ToggleInfo>
              <Checkbox
                defaultChecked={notifPrefs?.pendingApprovals ?? true}
                onChange={() =>
                  toast.success('Preference Saved', 'Updated pending approvals preference.')
                }
              />
            </ToggleRow>
          </div>
        </Card>
      )}

      {/* Tab 5: Security */}
      {instTab === 'security' && (
        <Card
          title="Security & Authentication"
          subtitle="Configure 2FA policies and session security controls"
        >
          <div style={{ maxWidth: '600px' }}>
            <ToggleRow>
              <ToggleInfo>
                <h4>Enforce Two-Factor Authentication (2FA)</h4>
                <p>Require 2FA for all administrative staff logins</p>
              </ToggleInfo>
              <Checkbox
                defaultChecked={securitySettings?.enforce2FA ?? true}
                onChange={() =>
                  toast.success('Security Saved', 'Updated 2FA enforcement policy.')
                }
              />
            </ToggleRow>

            <ToggleRow>
              <ToggleInfo>
                <h4>IP Whitelist Restrictions</h4>
                <p>Restrict admin access strictly to institution IP addresses</p>
              </ToggleInfo>
              <Checkbox
                defaultChecked={securitySettings?.ipWhitelistEnabled ?? false}
                onChange={() =>
                  toast.success('Security Saved', 'Updated IP whitelist settings.')
                }
              />
            </ToggleRow>

            <div style={{ marginTop: '20px' }}>
              <Input
                label="Session Timeout (Minutes)"
                type="number"
                defaultValue={securitySettings?.sessionTimeoutMinutes}
                onChange={() => toast.success('Security Saved', 'Updated session timeout.')}
              />
            </div>
          </div>
        </Card>
      )}

      {/* Tab 6: Appearance */}
      {instTab === 'appearance' && (
        <Card
          title="Appearance & Theme Preferences"
          subtitle="Customize interface mode and visual styling"
        >
          <div
            style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
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
          </div>
        </Card>
      )}

      {/* Add Admin Modal */}
      <Modal
        isOpen={isAddAdminModalOpen}
        onClose={() => setIsAddAdminModalOpen(false)}
        title="Add Institution Administrator"
        subtitle="Grant administrative or counseling permissions to a staff member"
        size="md"
      >
        <Form
          onSubmit={e => {
            e.preventDefault();
            addAdminMutation.mutate({ ...newAdminForm, status: 'active' });
          }}
        >
          <Input
            label="Full Name"
            value={newAdminForm.name}
            onChange={e => setNewAdminForm(prev => ({ ...prev, name: e.target.value }))}
            required
          />
          <Input
            label="Email Address"
            type="email"
            value={newAdminForm.email}
            onChange={e => setNewAdminForm(prev => ({ ...prev, email: e.target.value }))}
            required
          />
          <div
            style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}
          >
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsAddAdminModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={addAdminMutation.isPending}>
              Send Invitation
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
