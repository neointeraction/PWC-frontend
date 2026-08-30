import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Table, Column } from '@/components/Table';
import { Tooltip } from '@/components/Tooltip';
import { Loader } from '@/components/Loader';
import { careerService } from '@/services/career.service';
import { useNotificationStore } from '@/store';
import { getApiErrorMessage } from '@/utils';
import { PendingRatification } from '@/types';
import { JobRoleApprovalModal } from './components';
import {
  DashboardWrapper,
  ItemTitle,
  ActionButtonCell,
  ApproveButton,
} from './SuperAdminDashboard.styles';

export const SuperAdminDashboard: React.FC = () => {
  const addNotification = useNotificationStore(state => state.addNotification);
  const queryClient = useQueryClient();

  const [selectedRequest, setSelectedRequest] = useState<PendingRatification | null>(null);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);

  // Ratification requests raised by counsellors — pending first-class, plus the
  // already-reviewed ones the card title calls "recent".
  const { data: requestsList = [], isLoading } = useQuery({
    queryKey: ['career-ratification-requests'],
    queryFn: () => careerService.getRatificationRequests(),
  });

  const closeApprovalModal = () => {
    setIsApprovalModalOpen(false);
    setSelectedRequest(null);
  };

  const reviewMutation = useMutation({
    mutationFn: ({ id, decision }: { id: string; decision: 'approve' | 'reject' }) =>
      decision === 'approve' ? careerService.ratify(id) : careerService.rejectRatification(id),
    onSuccess: (_data, { decision }) => {
      queryClient.invalidateQueries({ queryKey: ['career-ratification-requests'] });
      addNotification({
        type: 'success',
        title: decision === 'approve' ? 'Request Approved' : 'Request Rejected',
        message:
          decision === 'approve'
            ? `"${selectedRequest?.careerName}" has been ratified and added to the career library.`
            : `"${selectedRequest?.careerName}" has been rejected.`,
      });
      closeApprovalModal();
    },
    onError: err => {
      addNotification({
        type: 'error',
        title: 'Review Failed',
        message: getApiErrorMessage(err, 'Could not update the request. Please try again.'),
      });
    },
  });

  const handleOpenApprovalModal = (req: PendingRatification) => {
    setSelectedRequest(req);
    setIsApprovalModalOpen(true);
  };

  const handleConfirmApproval = () => {
    if (!selectedRequest) return;
    reviewMutation.mutate({ id: selectedRequest.id, decision: 'approve' });
  };

  const handleReject = () => {
    if (!selectedRequest) return;
    reviewMutation.mutate({ id: selectedRequest.id, decision: 'reject' });
  };

  const columns: Column<PendingRatification>[] = [
    {
      key: 'itemRequested',
      header: 'Item Requested',
      render: row => <ItemTitle>{row.careerName}</ItemTitle>,
    },
    {
      key: 'type',
      header: 'Type',
      render: row => row.suggestedCategory,
    },
    {
      key: 'source',
      header: 'Counsellors',
      render: row => row.sourceTenant,
    },
    {
      key: 'date',
      header: 'Date',
      render: row => row.submittedAt,
    },
    {
      key: 'status',
      header: 'Status',
      render: row => (
        <ActionButtonCell style={{ justifyContent: 'flex-end' }}>
          {row.status === 'ratified' && <Badge variant="success">Approved</Badge>}
          {row.status === 'rejected' && <Badge variant="danger">Rejected</Badge>}
          {row.status === 'pending' && (
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
        onClose={closeApprovalModal}
        onApprove={handleConfirmApproval}
        onReject={handleReject}
        initialItemName={selectedRequest?.careerName || 'UI/UX Designer'}
        initialCategory={selectedRequest?.suggestedCategory}
      />
    </DashboardWrapper>
  );
};
