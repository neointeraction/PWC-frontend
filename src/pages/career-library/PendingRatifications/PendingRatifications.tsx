import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { MdCheckCircle, MdCheck, MdClose, MdOutlineVisibility } from 'react-icons/md';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Table, Column } from '@/components/Table';
import { Modal } from '@/components/Modal';
import { EmptyState } from '@/components/EmptyState';
import { ActionsCell } from '@/components/Table/Table.styles';
import { careerService } from '@/services/career.service';
import { useToast } from '@/hooks';
import { PendingRatification } from '@/types';
import { ROUTES } from '@/constants';

const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const DetailRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span:first-child {
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.textSecondary};
    text-transform: uppercase;
  }

  p {
    font-size: ${({ theme }) => theme.fontSize.base};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const PendingRatificationsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [selectedPending, setSelectedPending] = useState<PendingRatification | null>(null);

  const { data: ratifications, isLoading } = useQuery({
    queryKey: ['pending-ratifications'],
    queryFn: careerService.getPendingRatifications,
  });

  const ratifyMutation = useMutation({
    mutationFn: careerService.ratify,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-ratifications'] });
      queryClient.invalidateQueries({ queryKey: ['careers'] });
      toast.success('Career Ratified!', 'The submission has been ratified and added to the Career Library.');
      setSelectedPending(null);
    },
    onError: () => toast.error('Ratification failed'),
  });

  const rejectMutation = useMutation({
    mutationFn: careerService.rejectRatification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-ratifications'] });
      toast.info('Career Submission Rejected', 'The submission has been rejected.');
      setSelectedPending(null);
    },
    onError: () => toast.error('Rejection failed'),
  });

  const columns: Column<PendingRatification>[] = [
    {
      key: 'careerName',
      header: 'Job Role (Proposed)',
      render: row => (
        <div>
          <span style={{ fontWeight: 700, fontSize: '14px' }}>{row.careerName}</span>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Submitted: {row.submittedAt}</div>
        </div>
      ),
    },
    {
      key: 'suggestedCategory',
      header: 'Career Cluster',
      render: row => <Badge variant="primary">{row.suggestedCategory}</Badge>,
    },
    {
      key: 'sourceTenant',
      header: 'Source Institution',
      render: row => <span style={{ fontWeight: 500, fontSize: '13px' }}>{row.sourceTenant}</span>,
    },
    {
      key: 'status',
      header: 'Ratification Status',
      render: row => (
        <Badge variant={row.status === 'ratified' ? 'success' : row.status === 'rejected' ? 'danger' : 'warning'} dot>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: row => (
        <ActionsCell>
          <Button
            size="sm"
            variant="secondary"
            leftIcon={<MdOutlineVisibility size={15} />}
            onClick={() => setSelectedPending(row)}
          >
            Audit Details
          </Button>
          {row.status === 'pending' && (
            <>
              <Button
                size="sm"
                variant="primary"
                leftIcon={<MdCheck size={15} />}
                isLoading={ratifyMutation.isPending}
                onClick={() => ratifyMutation.mutate(row.id)}
              >
                Ratify &amp; Publish
              </Button>
              <Button
                size="sm"
                variant="secondary"
                leftIcon={<MdClose size={15} />}
                isLoading={rejectMutation.isPending}
                onClick={() => rejectMutation.mutate(row.id)}
              >
                Reject
              </Button>
            </>
          )}
        </ActionsCell>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Pending Career Ratifications"
        subtitle="Review, audit, and ratify institution-submitted niche career pathways"
        breadcrumbs={[
          { label: 'Dashboard', href: ROUTES.DASHBOARD },
          { label: 'Career Library', href: ROUTES.CAREER_LIBRARY },
          { label: 'Pending Ratifications' },
        ]}
      />

      <Card>
        {!ratifications || ratifications.length === 0 ? (
          <EmptyState
            icon={<MdCheckCircle size={28} />}
            title="All caught up!"
            description="There are no pending career ratifications at this time."
          />
        ) : (
          <Table<PendingRatification>
            columns={columns}
            data={ratifications}
            isLoading={isLoading}
            keyExtractor={row => row.id}
          />
        )}
      </Card>

      {selectedPending && (
        <Modal
          isOpen={!!selectedPending}
          onClose={() => setSelectedPending(null)}
          title={`Ratification Review: ${selectedPending.careerName}`}
          subtitle="Audit proposed custom career details before publishing to platform library"
          size="md"
        >
          <DetailSection>
            <DetailRow>
              <span>Proposed Job Role (Primary Key)</span>
              <p>{selectedPending.careerName}</p>
            </DetailRow>

            <DetailRow>
              <span>Suggested Career Cluster</span>
              <p>{selectedPending.suggestedCategory}</p>
            </DetailRow>

            <DetailRow>
              <span>Source Institution</span>
              <p>{selectedPending.sourceTenant}</p>
            </DetailRow>

            <DetailRow>
              <span>Submitted Description</span>
              <p>{selectedPending.description}</p>
            </DetailRow>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
              <Button variant="secondary" onClick={() => setSelectedPending(null)}>
                Close
              </Button>
              {selectedPending.status === 'pending' && (
                <>
                  <Button
                    variant="secondary"
                    leftIcon={<MdClose size={16} />}
                    onClick={() => rejectMutation.mutate(selectedPending.id)}
                  >
                    Reject Submission
                  </Button>
                  <Button
                    variant="primary"
                    leftIcon={<MdCheck size={16} />}
                    onClick={() => ratifyMutation.mutate(selectedPending.id)}
                  >
                    Ratify &amp; Publish to Library
                  </Button>
                </>
              )}
            </div>
          </DetailSection>
        </Modal>
      )}
    </div>
  );
};
