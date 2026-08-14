import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RiUserAddLine,
  RiFileUploadLine,
  RiSearchLine,
  RiEyeLine,
  RiEditLine,
  RiDeleteBinLine,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Table, Column } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { AlertModal, Tooltip } from '@/components';
import { counselorService } from '@/services/counselor.service';
import { useCounselorStore } from '@/store/counselor.store';
import { useAuthStore } from '@/store';
import { useToast } from '@/hooks';
import { getApiErrorMessage } from '@/utils';
import { Counselor } from '@/types/counselor.types';
import { ROUTES } from '@/constants';
import {
  CounselorsContainer,
  FilterBar,
  SearchWrapper,
  FilterControls,
  FilterSelectWrapper,
  HeaderActions,
  ActionIconButtonGroup,
  ActionIconButton,
  CounselorCell,
  CounselorNameText,
  CounselorEmailSubtext,
} from './CounselorsList.styles';
import { AddCounselorModal } from './components/AddCounselorModal';
import { BulkUploadCounselorsModal } from './components/BulkUploadCounselorsModal';
import { EditCounselorModal } from './components/EditCounselorModal';
import { ViewCounselorModal } from './components/ViewCounselorModal';

export const CounselorsListPage: React.FC = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { user } = useAuthStore();
  const isViewOnlyUser = Boolean(user?.isViewOnly);

  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    openAddModal,
    openBulkUploadModal,
    openEditModal,
    openViewModal,
  } = useCounselorStore();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [counselorToDelete, setCounselorToDelete] = useState<Counselor | null>(null);

  // Query counselors
  const { data, isLoading } = useQuery({
    queryKey: ['counselors', searchQuery, statusFilter, page, limit],
    queryFn: () =>
      counselorService.getAll({
        search: searchQuery,
        status: statusFilter,
        page,
        limit,
      }),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: counselorService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['counselors'] });
      toast.success('Counselor Deleted', 'Successfully removed counselor record.');
      setCounselorToDelete(null);
    },
    onError: err => {
      toast.error('Error', getApiErrorMessage(err, 'Failed to delete counselor record.'));
      setCounselorToDelete(null);
    },
  });

  const confirmDelete = () => {
    if (counselorToDelete) {
      deleteMutation.mutate(counselorToDelete.id);
    }
  };

  const columns: Column<Counselor>[] = [
    {
      key: 'actions',
      header: 'Actions',
      width: '120px',
      render: (row: Counselor) => (
        <ActionIconButtonGroup>
          <Tooltip content="View Details">
            <ActionIconButton aria-label="View Details" onClick={() => openViewModal(row)}>
              <RiEyeLine size={16} />
            </ActionIconButton>
          </Tooltip>

          {!isViewOnlyUser && (
            <>
              <Tooltip content="Edit Counselor">
                <ActionIconButton aria-label="Edit Counselor" onClick={() => openEditModal(row)}>
                  <RiEditLine size={16} />
                </ActionIconButton>
              </Tooltip>

              <Tooltip content="Delete Counselor">
                <ActionIconButton aria-label="Delete Counselor" onClick={() => setCounselorToDelete(row)}>
                  <RiDeleteBinLine size={16} />
                </ActionIconButton>
              </Tooltip>
            </>
          )}
        </ActionIconButtonGroup>
      ),
    },
    {
      key: 'counselorId',
      header: 'Counsellor ID',
      width: '120px',
      render: row => <strong>{row.counselorId}</strong>,
    },
    {
      key: 'name',
      header: 'Counsellor Name & Email',
      render: row => (
        <CounselorCell>
          <CounselorNameText>{row.name}</CounselorNameText>
          <CounselorEmailSubtext>{row.email}</CounselorEmailSubtext>
        </CounselorCell>
      ),
    },
    {
      key: 'mobile',
      header: 'Mobile No.',
      width: '140px',
      render: row => row.mobile || 'N/A',
    },
    {
      key: 'instituteName',
      header: 'Institute',
      width: '200px',
      render: row => row.instituteName || '—',
    },
    {
      key: 'status',
      header: 'Status',
      width: '100px',
      render: row => (
        <Badge variant={row.status === 'active' ? 'success' : 'default'} dot>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      ),
    },
  ];

  return (
    <CounselorsContainer>
      <PageHeader
        title="Counselors List"
        subtitle="Manage institution career counselors, single registration, and bulk CSV imports"
        breadcrumbs={[{ label: 'Dashboard', href: ROUTES.DASHBOARD }, { label: 'Counselors List' }]}
        actions={
          isViewOnlyUser ? undefined : (
            <HeaderActions>
              <Button
                variant="secondary"
                leftIcon={<RiFileUploadLine size={16} />}
                onClick={openBulkUploadModal}
              >
                Bulk Upload
              </Button>
              <Button
                variant="primary"
                leftIcon={<RiUserAddLine size={16} />}
                onClick={openAddModal}
              >
                Add Counselor
              </Button>
            </HeaderActions>
          )
        }
      />

      <Card>
        <FilterBar>
          <SearchWrapper>
            <Input
              placeholder="Search by ID, name, email, or mobile..."
              leftIcon={<RiSearchLine size={16} />}
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
            />
          </SearchWrapper>

          <FilterControls>
            <FilterSelectWrapper>
              <Select
                options={[
                  { value: 'all', label: 'All Statuses' },
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                ]}
                value={statusFilter}
                onChange={e => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
              />
            </FilterSelectWrapper>
          </FilterControls>
        </FilterBar>

        <Table
          columns={columns}
          data={data?.data ?? []}
          isLoading={isLoading}
          keyExtractor={row => row.id}
          pagination={
            data
              ? {
                  page: data.page,
                  totalPages: data.totalPages,
                  total: data.total,
                  limit: data.limit,
                  onPageChange: p => setPage(p),
                  onLimitChange: l => {
                    setLimit(l);
                    setPage(1);
                  },
                }
              : undefined
          }
        />
      </Card>

      <AddCounselorModal />
      <BulkUploadCounselorsModal />
      <EditCounselorModal />
      <ViewCounselorModal />

      <AlertModal
        isOpen={Boolean(counselorToDelete)}
        onClose={() => setCounselorToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Counselor Record"
        description={`Are you sure you want to delete ${counselorToDelete?.name} (${counselorToDelete?.counselorId})? This action cannot be undone.`}
        variant="danger"
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteMutation.isPending}
      />
    </CounselorsContainer>
  );
};
