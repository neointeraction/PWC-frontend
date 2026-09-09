import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Table, Column } from '@/components/Table';
import { Tooltip } from '@/components/Tooltip';
import { Loader } from '@/components/Loader';
import { careerService } from '@/services/career.service';
import { counsellorChartService } from '@/services/counsellorChart.service';
import { useNotificationStore } from '@/store';
import { formatDateTime, getApiErrorMessage } from '@/utils';
import { PendingRatification, Career } from '@/types';
import { ManualEntryRow } from '@/types/counsellorChart.types';
import { ROUTES } from '@/constants';
import { JobRoleFormModal } from '../career-library/components/JobRoleFormModal';
import {
  DashboardWrapper,
  ActionButtonCell,
  ApproveButton,
  CloseButton,
} from './SuperAdminDashboard.styles';

export const SuperAdminDashboard: React.FC = () => {
  const addNotification = useNotificationStore(state => state.addNotification);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [selectedRequest, setSelectedRequest] = useState<PendingRatification | null>(null);
  const [isJobRoleModalOpen, setIsJobRoleModalOpen] = useState(false);
  // Rows the admin has dismissed with "Close" — the backend has no dismiss endpoint for
  // proposals (approve/reject are the only resolutions), so this only hides the row
  // locally until the next refetch brings it back.
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  // Ratification requests raised by counsellors — pending first-class, plus the
  // already-reviewed ones the card title calls "recent".
  const { data: requestsList = [], isLoading } = useQuery({
    queryKey: ['career-ratification-requests'],
    queryFn: () => careerService.getRatificationRequests(),
  });

  const visibleRequests = requestsList.filter(req => !dismissedIds.has(req.id));

  // Counsellor-typed "Manual Entry" rows across every student's Career Compass tables
  // (Step 3 of the counsellor chart) — backend endpoint not live yet, see
  // docs/compass-tables-manual-entry-backend-prompt.md. Fails soft to an empty list
  // until it ships, rather than surfacing a query error banner.
  const { data: manualEntries = [] } = useQuery({
    queryKey: ['counsellor-chart-manual-entries'],
    queryFn: () => counsellorChartService.listManualEntries(),
    retry: false,
    throwOnError: false,
  });

  const handleCloseRow = (id: string) => {
    setDismissedIds(prev => new Set(prev).add(id));
  };

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
      key: 'project',
      header: 'Project',
      render: row => row.projectName || '—',
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
      key: 'student',
      header: 'Student',
      // Not yet returned by GET /career-library/proposals — placeholder until the
      // backend adds a student field to the response.
      render: () => '—',
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
            <ApproveButton onClick={() => handleOpenJobRoleModal(row)}>View</ApproveButton>
          </Tooltip>
          <Tooltip content="Dismiss this request from the list">
            <CloseButton onClick={() => handleCloseRow(row.id)}>Close</CloseButton>
          </Tooltip>
        </ActionButtonCell>
      ),
    },
  ];

  const manualEntryColumns: Column<ManualEntryRow>[] = [
    { key: 'studentName', header: 'Student', render: row => row.studentName || '—' },
    { key: 'tableLabel', header: 'Table', render: row => row.tableLabel },
    {
      key: 'fields',
      header: 'Entry',
      render: row => Object.values(row.fields).filter(Boolean).join(' · ') || '—',
    },
    { key: 'addedBy', header: 'Added By', render: row => row.addedBy || '—' },
    { key: 'addedAt', header: 'Date', render: row => formatDateTime(row.addedAt) },
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
          data={visibleRequests}
          keyExtractor={row => row.id}
          emptyMessage="No pending requests found."
        />
      </Card>

      <Card title="Manual Entries — Career Compass Tables">
        <Table
          columns={manualEntryColumns}
          data={manualEntries}
          keyExtractor={row => row.id}
          emptyMessage="No manual entries flagged for review."
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
