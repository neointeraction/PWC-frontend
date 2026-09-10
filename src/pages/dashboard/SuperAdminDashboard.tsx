import React, { useState } from 'react';
import { useQuery, useQueries, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Table, Column } from '@/components/Table';
import { Tooltip } from '@/components/Tooltip';
import { Loader } from '@/components/Loader';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { careerService } from '@/services/career.service';
import { counsellorChartService } from '@/services/counsellorChart.service';
import { useNotificationStore } from '@/store';
import { formatDateTime, getApiErrorMessage } from '@/utils';
import { PendingRatification, Career } from '@/types';
import { ManualEntryRow } from '@/types/counsellorChart.types';
import { StudentWorkflowStatus } from '@/types/student.types';
import { ROUTES } from '@/constants';
import { JobRoleFormModal } from '../career-library/components/JobRoleFormModal';
import { AddRowModal } from '../counselor/StudentFormChart/components/AddRowModal';
import { MANUAL_ENTRY_VIEW_FIELDS } from '../counselor/StudentFormChart/components/manualEntryViewFields';
import {
  DashboardWrapper,
  ActionButtonCell,
  ApproveButton,
  CloseButton,
  IdentityCell,
  IdLine,
} from './SuperAdminDashboard.styles';

// The "Pending & Recent Requests" table shows two different kinds of rows side by
// side: career-ratification proposals from counsellors, and counsellor-typed "Manual
// Entry" rows on a student's Career Compass tables that need Super Admin review.
type DashboardRow =
  | { rowType: 'ratification'; id: string; data: PendingRatification }
  | { rowType: 'manual-entry'; id: string; data: ManualEntryRow };

// GET /counsellor-chart/manual-entries doesn't return sessionId/counsellorCode/
// studentCode/projectName yet (see docs/compass-tables-manual-entry-backend-prompt.md)
// — resolve them client-side from already-live endpoints, cached per studentId.
const useManualEntryContext = (studentId: string) =>
  useQuery({
    queryKey: ['student-chart-context', studentId],
    queryFn: () => counsellorChartService.resolveStudentChartContext(studentId),
    staleTime: 5 * 60 * 1000,
  });

// A manual entry stays hidden from Super Admin until the student it belongs to has
// wrapped up Session 2 — before that the chart is still being actively worked on by
// the counsellor, and the entry may still change. Ordinal comparison against the
// backend's WorkflowStatus enum (types/student.types.ts) — any stage from
// SESSION_2_COMPLETED onward counts as "done".
const WORKFLOW_ORDER: StudentWorkflowStatus[] = [
  'DRAFT',
  'PROFILE_COMPLETED',
  'PRE_COUNSELLING_FORMS_SUBMITTED',
  'ASSESSMENT_PENDING',
  'ASSESSMENT_COMPLETED',
  'SESSION_SCHEDULED',
  'SESSION_1_COMPLETED',
  'COUNSELLOR_FEEDBACK_REPORT',
  'SESSION_2_COMPLETED',
  'COUNSELLOR_FEEDBACK',
  'STUDENT_PARENT_FEEDBACK',
  'CLOSED',
];
const SESSION_2_COMPLETED_INDEX = WORKFLOW_ORDER.indexOf('SESSION_2_COMPLETED');
const hasFinishedSession2 = (status: StudentWorkflowStatus | null | undefined): boolean =>
  status != null && WORKFLOW_ORDER.indexOf(status) >= SESSION_2_COMPLETED_INDEX;

const ManualEntryProjectCell: React.FC<{ studentId: string }> = ({ studentId }) => {
  const { data } = useManualEntryContext(studentId);
  return <>{data?.projectName || '—'}</>;
};

const ManualEntryCounsellorCell: React.FC<{ entry: ManualEntryRow }> = ({ entry }) => {
  const { data } = useManualEntryContext(entry.studentId);
  return (
    <IdentityCell>
      <span>{entry.addedBy || '—'}</span>
      {data?.counsellorCode && <IdLine>Code: {data.counsellorCode}</IdLine>}
    </IdentityCell>
  );
};

const ManualEntryStudentCell: React.FC<{ entry: ManualEntryRow }> = ({ entry }) => {
  const { data } = useManualEntryContext(entry.studentId);
  return (
    <IdentityCell>
      <span>{entry.studentName || '—'}</span>
      {data?.studentCode && <IdLine>Code: {data.studentCode}</IdLine>}
    </IdentityCell>
  );
};

const ManualEntryViewButton: React.FC<{ entry: ManualEntryRow; onView: (entry: ManualEntryRow) => void }> = ({
  entry,
  onView,
}) => (
  <Tooltip content="View this manual entry's details (read-only)">
    <ApproveButton onClick={() => onView(entry)}>View</ApproveButton>
  </Tooltip>
);

export const SuperAdminDashboard: React.FC = () => {
  const addNotification = useNotificationStore(state => state.addNotification);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [selectedRequest, setSelectedRequest] = useState<PendingRatification | null>(null);
  const [isJobRoleModalOpen, setIsJobRoleModalOpen] = useState(false);
  // Rows the admin has dismissed with "Close" — for ratification proposals the backend
  // has no dismiss endpoint (approve/reject are the only resolutions), so this only
  // hides the row locally until the next refetch brings it back. Manual-entry rows are
  // actually deleted server-side (see deleteManualEntryMutation below).
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  // Row awaiting confirmation from the "Close" button.
  const [rowPendingClose, setRowPendingClose] = useState<DashboardRow | null>(null);
  // Manual-entry row currently shown in the read-only view modal.
  const [viewingEntry, setViewingEntry] = useState<ManualEntryRow | null>(null);

  // Ratification requests raised by counsellors — pending first-class, plus the
  // already-reviewed ones the card title calls "recent".
  const { data: requestsList = [], isLoading } = useQuery({
    queryKey: ['career-ratification-requests'],
    queryFn: () => careerService.getRatificationRequests(),
  });

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

  // Shares its cache key with useManualEntryContext (used by the table cells below) —
  // resolves each distinct student's workflowStatus so entries can be gated on
  // Session 2 completion before they're ever added to `rows`.
  const distinctStudentIds = Array.from(new Set(manualEntries.map(entry => entry.studentId)));
  const studentContextQueries = useQueries({
    queries: distinctStudentIds.map(studentId => ({
      queryKey: ['student-chart-context', studentId],
      queryFn: () => counsellorChartService.resolveStudentChartContext(studentId),
      staleTime: 5 * 60 * 1000,
    })),
  });
  const workflowStatusByStudentId = new Map(
    distinctStudentIds.map((studentId, i) => [studentId, studentContextQueries[i]?.data?.workflowStatus])
  );
  const visibleManualEntries = manualEntries.filter(entry =>
    hasFinishedSession2(workflowStatusByStudentId.get(entry.studentId))
  );

  const rows: DashboardRow[] = [
    ...requestsList.map(
      (req): DashboardRow => ({ rowType: 'ratification', id: `ratification:${req.id}`, data: req })
    ),
    ...visibleManualEntries.map(
      (entry): DashboardRow => ({ rowType: 'manual-entry', id: `manual-entry:${entry.id}`, data: entry })
    ),
  ];

  const visibleRequests = rows.filter(row => !dismissedIds.has(row.id));

  const deleteManualEntryMutation = useMutation({
    mutationFn: (entryId: string) => counsellorChartService.deleteManualEntry(entryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['counsellor-chart-manual-entries'] });
      addNotification({
        type: 'success',
        title: 'Entry Removed',
        message: 'The manual entry has been removed from the counsellor chart.',
      });
      setRowPendingClose(null);
    },
    onError: err => {
      addNotification({
        type: 'error',
        title: 'Delete Failed',
        message: getApiErrorMessage(err, 'Could not delete the manual entry. Please try again.'),
      });
    },
  });

  const handleConfirmClose = () => {
    if (!rowPendingClose) return;
    if (rowPendingClose.rowType === 'manual-entry') {
      deleteManualEntryMutation.mutate(rowPendingClose.data.id);
    } else {
      setDismissedIds(prev => new Set(prev).add(rowPendingClose.id));
      setRowPendingClose(null);
    }
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

  const columns: Column<DashboardRow>[] = [
    {
      key: 'project',
      header: 'Project',
      render: row =>
        row.rowType === 'manual-entry' ? (
          <ManualEntryProjectCell studentId={row.data.studentId} />
        ) : (
          row.data.projectName || '—'
        ),
    },
    {
      key: 'source',
      header: 'Counsellor',
      render: row => {
        if (row.rowType === 'manual-entry') {
          return <ManualEntryCounsellorCell entry={row.data} />;
        }
        const name = row.data.sourceTenant;
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
      render: row =>
        // Ratification proposals don't carry a student field yet — not yet returned
        // by GET /career-library/proposals — placeholder until the backend adds one.
        row.rowType === 'manual-entry' ? <ManualEntryStudentCell entry={row.data} /> : '—',
    },
    {
      key: 'date',
      header: 'Date',
      render: row =>
        formatDateTime(row.rowType === 'ratification' ? row.data.submittedAt : row.data.addedAt),
    },
    {
      key: 'actions',
      header: '',
      render: row => (
        <ActionButtonCell style={{ justifyContent: 'flex-end' }}>
          {row.rowType === 'ratification' ? (
            <Tooltip content="Review and confirm request to publish to global library">
              <ApproveButton onClick={() => handleOpenJobRoleModal(row.data)}>View</ApproveButton>
            </Tooltip>
          ) : (
            <ManualEntryViewButton entry={row.data} onView={setViewingEntry} />
          )}
          <Tooltip content="Dismiss this request from the list">
            <CloseButton onClick={() => setRowPendingClose(row)}>Clear</CloseButton>
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
          data={visibleRequests}
          keyExtractor={row => row.id}
          emptyMessage="No pending requests found."
        />
      </Card>

      <ConfirmDialog
        isOpen={rowPendingClose !== null}
        onClose={() => setRowPendingClose(null)}
        onConfirm={handleConfirmClose}
        title={rowPendingClose?.rowType === 'manual-entry' ? 'Remove Manual Entry?' : 'Dismiss Request?'}
        description={
          rowPendingClose?.rowType === 'manual-entry'
            ? `This permanently deletes "${rowPendingClose.data.tableLabel}" entry for ${rowPendingClose.data.studentName || 'this student'} from the counsellor chart. This cannot be undone.`
            : 'This dismisses the request from this list. It will reappear on the next refresh unless approved or rejected.'
        }
        confirmLabel={rowPendingClose?.rowType === 'manual-entry' ? 'Clear' : 'Dismiss'}
        isLoading={deleteManualEntryMutation.isPending}
        isDangerous={rowPendingClose?.rowType === 'manual-entry'}
      />

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

      <AddRowModal
        isOpen={viewingEntry !== null}
        onClose={() => setViewingEntry(null)}
        title={viewingEntry?.tableLabel ?? ''}
        fields={viewingEntry ? MANUAL_ENTRY_VIEW_FIELDS[viewingEntry.tableLabel] || [] : []}
        initialValues={viewingEntry?.fields}
        mode="view"
        onSubmit={() => {}}
      />
    </DashboardWrapper>
  );
};
