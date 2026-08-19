import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { RiSettings4Line, RiCheckLine } from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Table, Column } from '@/components/Table';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Tooltip } from '@/components/Tooltip';
import { Loader } from '@/components/Loader';
import { dashboardService } from '@/services/dashboard.service';
import { DASHBOARD_MOCKS } from '@/mocks/dashboard.mock';
import { useNotificationStore } from '@/store';
import { ROUTES } from '@/constants';
import {
  DashboardWrapper,
  WelcomeBanner,
  WelcomeText,
  StatBadgeRow,
  PillStat,
  StatsGrid,
  StatMetricValue,
  MetaText,
  ActionCardContent,
  SectionHeader,
  SectionTitle,
  ItemTitle,
  ActionButtonCell,
  ApproveButton,
  ModalDetailCard,
  ModalDetailRow,
  ModalDetailLabel,
  ModalDetailValue,
} from './SuperAdminDashboard.styles';

export const SuperAdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const addNotification = useNotificationStore(state => state.addNotification);

  const [requestsList, setRequestsList] = useState(DASHBOARD_MOCKS.careerRequests);
  const [selectedRequest, setSelectedRequest] = useState<(typeof DASHBOARD_MOCKS.careerRequests)[0] | null>(null);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  // Career-creation fields shown when ratifying a request into the library.
  const [careerCluster, setCareerCluster] = useState('');
  const [industry, setIndustry] = useState('');
  const [domain, setDomain] = useState('');
  const [jobRoleTitle, setJobRoleTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');

  const { data: summary, isLoading } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: dashboardService.getSummary,
  });

  const handleOpenApprovalModal = (req: (typeof DASHBOARD_MOCKS.careerRequests)[0]) => {
    setSelectedRequest(req);
    setCareerCluster('');
    setIndustry('');
    setDomain('');
    setJobRoleTitle(req.itemRequested); // Pre-fill with the requested item
    setShortDescription('');
    setIsApprovalModalOpen(true);
  };

  const handleConfirmApproval = () => {
    if (!selectedRequest) return;

    setRequestsList(prev =>
      prev.map(item =>
        item.id === selectedRequest.id ? { ...item, status: 'Approved' as const } : item
      )
    );

    addNotification({
      type: 'success',
      title: 'Request Approved',
      message: `"${selectedRequest.itemRequested}" has been ratified and added to the career library.`,
    });

    setIsApprovalModalOpen(false);
    setSelectedRequest(null);
  };

  const handleReject = () => {
    if (!selectedRequest) return;

    setRequestsList(prev =>
      prev.map(item =>
        item.id === selectedRequest.id ? { ...item, status: 'Rejected' as const } : item
      )
    );

    addNotification({
      type: 'success',
      title: 'Request Rejected',
      message: `"${selectedRequest.itemRequested}" has been rejected.`,
    });

    setIsApprovalModalOpen(false);
    setSelectedRequest(null);
  };

  const columns: Column<(typeof DASHBOARD_MOCKS.careerRequests)[0]>[] = [
    {
      key: 'itemRequested',
      header: 'Item Requested',
      render: row => <ItemTitle>{row.itemRequested}</ItemTitle>,
    },
    {
      key: 'type',
      header: 'Type',
      render: row => row.type,
    },
    {
      key: 'source',
      header: 'Source',
      render: row => row.source,
    },
    {
      key: 'date',
      header: 'Date',
      render: row => row.date,
    },
    {
      key: 'status',
      header: 'Status',
      render: row => (
        <ActionButtonCell style={{ justifyContent: 'flex-end' }}>
          {row.status === 'Approved' && <Badge variant="success">Approved</Badge>}
          {row.status === 'Rejected' && <Badge variant="danger">Rejected</Badge>}
          {row.status === 'Pending' && (
            <>
              <Badge variant="warning">Pending</Badge>
              <Tooltip content="Approve request and publish to global library">
                <ApproveButton onClick={() => handleOpenApprovalModal(row)}>
                  APPROVE
                </ApproveButton>
              </Tooltip>
            </>
          )}
        </ActionButtonCell>
      ),
    },
  ];

  if (isLoading) return <Loader />;

  return (
    <DashboardWrapper>
      <PageHeader
        title="Super Admin Dashboard"
        subtitle="Global governance of user management, career library, and system settings"
        breadcrumbs={[{ label: 'Dashboard' }]}
      />

      <WelcomeBanner>
        <WelcomeText>
          <h2>kREATE Global Super Admin Engine</h2>
          <p>Welcome back, Super Admin! Live status of platform users and career ratifications.</p>
          <StatBadgeRow>
            <PillStat>Plan: ENTERPRISE GLOBAL</PillStat>
            <PillStat>System Status: Active</PillStat>
          </StatBadgeRow>
        </WelcomeText>
      </WelcomeBanner>

      <StatsGrid>
        <Card title="Active Users">
          <StatMetricValue
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(ROUTES.TENANT_MANAGEMENT)}
          >
            {summary?.activeStudentsCount ?? 45}
          </StatMetricValue>
          <MetaText>Registered platform users</MetaText>
        </Card>

        <Card title="Career Pathways">
          <StatMetricValue
            $variant="info"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(ROUTES.CAREER_LIBRARY)}
          >
            {summary?.careerPathwaysCount ?? '—'}
          </StatMetricValue>
          <MetaText>Published career specs</MetaText>
        </Card>

        <Card title="System Settings">
          <ActionCardContent>
            <p>Configure global platform preferences, security, and options.</p>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<RiSettings4Line size={16} />}
              onClick={() => navigate(ROUTES.SETTINGS)}
            >
              Manage Settings
            </Button>
          </ActionCardContent>
        </Card>
      </StatsGrid>

      <SectionHeader>
        <SectionTitle>Pending &amp; Recent Requests</SectionTitle>
      </SectionHeader>

      <Table
        columns={columns}
        data={requestsList}
        keyExtractor={row => row.id}
        emptyMessage="No pending requests found."
      />

      {/* Approval Confirmation Modal */}
      <Modal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        title="Confirm Request Approval"
        subtitle="Review item details before ratifying and publishing to global library"
        size="md"
        footer={
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', width: '100%' }}>
            <Button variant="secondary" onClick={() => setIsApprovalModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleReject}>
              Reject
            </Button>
            <Button
              variant="primary"
              leftIcon={<RiCheckLine size={18} />}
              onClick={handleConfirmApproval}
            >
              Approve
            </Button>
          </div>
        }
      >
        {selectedRequest && (
          <div>
            <ModalDetailCard>
              <ModalDetailRow>
                <ModalDetailLabel>Item Requested:</ModalDetailLabel>
                <ModalDetailValue>{selectedRequest.itemRequested}</ModalDetailValue>
              </ModalDetailRow>
              <ModalDetailRow>
                <ModalDetailLabel>Type / Category:</ModalDetailLabel>
                <ModalDetailValue>{selectedRequest.type}</ModalDetailValue>
              </ModalDetailRow>
              <ModalDetailRow>
                <ModalDetailLabel>Source / Origin:</ModalDetailLabel>
                <ModalDetailValue>{selectedRequest.source}</ModalDetailValue>
              </ModalDetailRow>
              <ModalDetailRow>
                <ModalDetailLabel>Submission Date:</ModalDetailLabel>
                <ModalDetailValue>{selectedRequest.date}</ModalDetailValue>
              </ModalDetailRow>
            </ModalDetailCard>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Select
                label="Career Cluster *"
                options={[{ value: '', label: 'Select a cluster...' }]}
                value={careerCluster}
                onChange={e => setCareerCluster(e.target.value)}
              />
              <Select
                label="Industry *"
                options={[{ value: '', label: 'Select an industry within the chosen cluster...' }]}
                value={industry}
                onChange={e => setIndustry(e.target.value)}
                disabled={!careerCluster}
              />
              <Select
                label="Domain *"
                options={[{ value: '', label: 'Select a domain within the chosen industry...' }]}
                value={domain}
                onChange={e => setDomain(e.target.value)}
                disabled={!industry}
              />
              <Input
                label="Job Role (Title / Name *)"
                placeholder="Enter Job role..."
                value={jobRoleTitle}
                onChange={e => setJobRoleTitle(e.target.value)}
              />
              <Input
                label="Short description *"
                placeholder="Enter short description..."
                value={shortDescription}
                onChange={e => setShortDescription(e.target.value)}
              />
            </div>
          </div>
        )}
      </Modal>
    </DashboardWrapper>
  );
};
