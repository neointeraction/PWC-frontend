import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Table, Column } from '@/components/Table';
import { Tooltip } from '@/components/Tooltip';
import { Loader } from '@/components/Loader';
import { careerService } from '@/services/career.service';
import { useNotificationStore } from '@/store';
import { formatDateTime, getApiErrorMessage } from '@/utils';
import { PendingRatification, Career } from '@/types';
import { ROUTES } from '@/constants';
import { JobRoleFormModal } from '../career-library/components/JobRoleFormModal';
import {
  DashboardWrapper,
  ItemTitle,
  ActionButtonCell,
  ApproveButton,
} from './SuperAdminDashboard.styles';

export const SuperAdminDashboard: React.FC = () => {
  const addNotification = useNotificationStore(state => state.addNotification);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [selectedRequest, setSelectedRequest] = useState<PendingRatification | null>(null);
  const [isJobRoleModalOpen, setIsJobRoleModalOpen] = useState(false);

  // Ratification requests raised by counsellors — pending first-class, plus the
  // already-reviewed ones the card title calls "recent".
  const { data: requestsList = [], isLoading } = useQuery({
    queryKey: ['career-ratification-requests'],
    queryFn: () => careerService.getRatificationRequests(),
  });

  const closeJobRoleModal = () => {
    setIsJobRoleModalOpen(false);
    setSelectedRequest(null);
  };

  const reviewMutation = useMutation({
    mutationFn: ({ id, decision }: { id: string; decision: 'approve' | 'reject' }) =>
      decision === 'approve' ? careerService.ratify(id) : careerService.rejectRatification(id),
    onSuccess: (_data, variables) => {
      const { decision } = variables;
      queryClient.invalidateQueries({ queryKey: ['career-ratification-requests'] });
      addNotification({
        type: 'success',
        title: decision === 'approve' ? 'Request Approved' : 'Request Rejected',
        message:
          decision === 'approve'
            ? `"${selectedRequest?.careerName}" has been ratified and added to the career library.`
            : `"${selectedRequest?.careerName}" has been rejected.`,
      });
      closeJobRoleModal();
      
      // Navigate to career library after successful approval
      if (decision === 'approve') {
        navigate(ROUTES.CAREER_LIBRARY);
      }
    },
    onError: err => {
      addNotification({
        type: 'error',
        title: 'Review Failed',
        message: getApiErrorMessage(err, 'Could not update the request. Please try again.'),
      });
    },
  });

  const handleOpenJobRoleModal = (req: PendingRatification) => {
    setSelectedRequest(req);
    setIsJobRoleModalOpen(true);
  };

  const handleJobRoleSaved = (saved: any, savedMode: 'add' | 'edit') => {
    // Handle the successful save - this would be equivalent to approval
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
      key: 'domain',
      header: 'Domain',
      render: row => row.suggestedDomain || row.suggestedCategory,
    },
    {
      key: 'source',
      header: 'Counsellor',
      render: row => {
        const name = row.sourceTenant;
        // Show em dash (—) as a proper dash for better readability
        if (name === '\u2014' || !name) {
          return '—';
        }
        return name;
      },
    },
    {
      key: 'project',
      header: 'Project',
      render: row => row.projectName || '—',
    },
    {
      key: 'date',
      header: 'Date',
      render: row => formatDateTime(row.submittedAt),
    },
    {
      key: 'actions',
      header: '',
      render: row => (
        <ActionButtonCell style={{ justifyContent: 'flex-end' }}>
          <Tooltip content="Review and confirm request to publish to global library">
            <ApproveButton onClick={() => handleOpenJobRoleModal(row)}>
              Review/Confirm
            </ApproveButton>
          </Tooltip>
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


      {/* Job Role Detail Modal */}
      <JobRoleFormModal
        isOpen={isJobRoleModalOpen}
        onClose={closeJobRoleModal}
        onSaved={handleJobRoleSaved}
        mode="edit"
        entity={selectedRequest ? {
          id: selectedRequest.id,
          jobRole: selectedRequest.careerName,
          careerCluster: selectedRequest.suggestedCategory || '',
          industry: selectedRequest.suggestedIndustry || '',
          domain: selectedRequest.suggestedDomain || '',
          domainId: '',
          aiResilienceGrading: 'Medium' as const,
          aiResilienceComment: '',
          oneLineDescription: selectedRequest.description,
          topCompaniesRecruiting: [],
          approxSalaryRangeIndia: '',
          globalSalaryRange: '',
          minQual10th12thRecommendedSubjects: '',
          minQualGradRecommendedSubjects: '',
          entranceExamsUG: '',
          minQualPGRecommendedSubjects: '',
          entranceExamsPG: '',
          certificationsStudents: '',
          certificationsUG: '',
          topCoursesToStudy: '',
          status: 'pending' as const,
          lastUpdated: selectedRequest.submittedAt,
        } : undefined}
        domainId={selectedRequest?.suggestedDomain}
        domainLabel={selectedRequest?.suggestedDomain}
        clusterLabel={selectedRequest?.suggestedCategory}
        industryLabel={selectedRequest?.suggestedIndustry}
        entityKind="proposal"
      />
    </DashboardWrapper>
  );
};
