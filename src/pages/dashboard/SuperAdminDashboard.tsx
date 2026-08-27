import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Table, Column } from '@/components/Table';
import { Tooltip } from '@/components/Tooltip';
import { Loader } from '@/components/Loader';
import { dashboardService } from '@/services/dashboard.service';
import { useNotificationStore } from '@/store';
import { JobRoleApprovalModal } from './components';
import {
  DashboardWrapper,
  ItemTitle,
  ActionButtonCell,
  ApproveButton,
} from './SuperAdminDashboard.styles';

// Ratification requests raised by counsellors. No data is shown until this is wired
// to the backend (`/career-library/requests`) — the table renders its empty state.
interface CareerRequest {
  id: string;
  itemRequested: string;
  type: string;
  source: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const SuperAdminDashboard: React.FC = () => {
  const addNotification = useNotificationStore(state => state.addNotification);

  const [requestsList, setRequestsList] = useState<CareerRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<CareerRequest | null>(null);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);

  const { isLoading } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: dashboardService.getSummary,
  });

  const handleOpenApprovalModal = (req: CareerRequest) => {
    setSelectedRequest(req);
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

  const columns: Column<CareerRequest>[] = [
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
      header: 'Counsellors',
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
        title="Dashboard"
      />





      <Card title="Pending & Recent Requests">
        <Table
          columns={columns}
          data={requestsList}
          keyExtractor={row => row.id}
          emptyMessage="No pending requests found."
        />
      </Card>


      {/* Approval Confirmation Modal */}
      <JobRoleApprovalModal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        onApprove={handleConfirmApproval}
        onReject={handleReject}
        initialItemName={selectedRequest?.itemRequested || 'UI/UX Designer'}
        initialCategory={selectedRequest?.type}
      />
    </DashboardWrapper>
  );
};
