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

const UserNameText = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

const UserEmailSubtext = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 600px;
`;

const PlanBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const PlanLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
`;

const PlanTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 4px;
`;

const ProgressBarCard = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ProgressTitle = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

const ProgressBarTrack = styled.div`
  height: 8px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 9999px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const BillingInfo = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TableHeaderAction = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SpacingTop = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ModalFooterRight = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.md};
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
          <UserNameText>{row.name}</UserNameText>
          <UserEmailSubtext>{row.email}</UserEmailSubtext>
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
          {row.status.toUpperCase()}
        </Badge>
      ),
    },
    {
      key: 'lastActive',
      header: 'Last Active',
      render: row => row.lastActive || 'N/A',
    },
  ];

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Manage your institution preferences and profile settings."
        breadcrumbs={[{ label: 'Dashboard', href: ROUTES.DASHBOARD }, { label: 'Settings' }]}
      />

      <TabsContainer>
        <TabButton $active={instTab === 'institution'} onClick={() => setInstTab('institution')}>
          <RiBuilding4Line size={18} /> Institution
        </TabButton>
        <TabButton
          $active={instTab === 'subscription'}
          onClick={() => setInstTab('subscription')}
        >
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

      {/* Tab 1: Institution */}
      {instTab === 'institution' && (
        <Card
          title="Institution Details"
          subtitle="Update public contact info and institution metadata"
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
          <FormContainer>
            <PlanBanner>
              <div>
                <PlanLabel>Current Plan</PlanLabel>
                <PlanTitle>{subscription?.plan.toUpperCase()} PLAN</PlanTitle>
              </div>
              <Badge variant="success">Active</Badge>
            </PlanBanner>

            <ProgressBarCard>
              <ProgressHeader>
                <ProgressTitle>Student Seats Allocated</ProgressTitle>
                <span>
                  {subscription?.seatsUsed} / {subscription?.seatsAllocated} Used
                </span>
              </ProgressHeader>
              <ProgressBarTrack>
                <ProgressBarFill
                  $percent={
                    ((subscription?.seatsUsed || 50) / (subscription?.seatsAllocated || 100)) *
                    100
                  }
                />
              </ProgressBarTrack>
            </ProgressBarCard>

            <BillingInfo>
              <p>
                Renews On: <strong>{subscription?.renewsOn}</strong>
              </p>
              <p>
                Billing Email: <strong>{subscription?.billingEmail}</strong>
              </p>
            </BillingInfo>

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
          </FormContainer>
        </Card>
      )}

      {/* Tab 3: Admin Users */}
      {instTab === 'admins' && (
        <Card
          title="Institution Administrator Users"
          subtitle="Manage staff access levels and permissions"
        >
          <TableHeaderAction>
            <Button
              leftIcon={<RiAddLine size={18} />}
              onClick={() => setIsAddAdminModalOpen(true)}
            >
              Add Admin User
            </Button>
          </TableHeaderAction>
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
          <FormContainer>
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
          </FormContainer>
        </Card>
      )}

      {/* Tab 5: Security */}
      {instTab === 'security' && (
        <Card
          title="Security & Authentication"
          subtitle="Configure 2FA policies and session security controls"
        >
          <FormContainer>
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

            <SpacingTop>
              <Input
                label="Session Timeout (Minutes)"
                type="number"
                defaultValue={securitySettings?.sessionTimeoutMinutes}
                onChange={() => toast.success('Security Saved', 'Updated session timeout.')}
              />
            </SpacingTop>
          </FormContainer>
        </Card>
      )}

      {/* Tab 6: Appearance */}
      {instTab === 'appearance' && (
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
          <ModalFooterRight>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsAddAdminModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={addAdminMutation.isPending}>
              Create Admin
            </Button>
          </ModalFooterRight>
        </Form>
      </Modal>
    </div>
  );
};
