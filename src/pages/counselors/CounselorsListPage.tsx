import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RiUserAddLine,
  RiFileUploadLine,
  RiSearchLine,
  RiEyeLine,
  RiEditLine,
  RiDeleteBinLine,
  RiFolderLine,
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
import { Counselor } from '@/types/counselor.types';
import { ROUTES } from '@/constants';
import {
  CounselorsContainer,
  StatsGrid,
  StatMetricValue,
  ProjectCountBox,
  FilterBar,
  SearchWrapper,
  FilterControls,
  FilterSelectWrapper,
  ActionIconButtonGroup,
  ActionIconButton,
} from './CounselorsList.styles';
import { AddCounselorModal } from './components/AddCounselorModal';
import { BulkUploadCounselorsModal } from './components/BulkUploadCounselorsModal';
import { EditCounselorModal } from './components/EditCounselorModal';
import { ViewCounselorModal } from './components/ViewCounselorModal';
import { CounselorDeploymentModal } from './components/CounselorDeploymentModal';

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
  const [counselorForDeployment, setCounselorForDeployment] = useState<Counselor | null>(null);

  // Query counselors for table with pagination
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

  // Query all counselors for stats calculation (without pagination)
  const { data: allCounselorsData } = useQuery({
    queryKey: ['counselors-stats'],
    queryFn: () => counselorService.getAll({}), // Get all without filters
  });

  // Calculate dynamic stats from all counselors
  const stats = useMemo(() => {
    if (!allCounselorsData?.data) {
      return {
        totalEmpanelled: 0,
        deployed: 0,
        onBench: 0,
        inactive: 0,
      };
    }

    const counselors = allCounselorsData.data;
    
    return {
      totalEmpanelled: counselors.length,
      deployed: counselors.filter(c => c.deploymentStatus === 'deployed').length,
      onBench: counselors.filter(c => c.deploymentStatus === 'bench').length,
      inactive: counselors.filter(c => c.deploymentStatus === 'inactive' || c.status === 'inactive').length,
    };
  }, [allCounselorsData]);

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: counselorService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['counselors'] });
      queryClient.invalidateQueries({ queryKey: ['counselors-stats'] });
      toast.success('Counselor Deleted', 'Successfully removed counselor record.');
      setCounselorToDelete(null);
    },
    onError: () => {
      toast.error('Error', 'Failed to delete counselor record.');
      setCounselorToDelete(null);
    },
  });

  const confirmDelete = () => {
    if (counselorToDelete) {
      deleteMutation.mutate(counselorToDelete.id);
    }
  };

  const getStatusBadge = (row: Counselor) => {
    const status = row.deploymentStatus || (row.status === 'active' ? 'deployed' : 'inactive');
    switch (status) {
      case 'deployed':
        return (
          <Badge variant="success" dot>
            Deployed
          </Badge>
        );
      case 'bench':
        return (
          <Badge variant="info" dot>
            Bench
          </Badge>
        );
      case 'inactive':
        return (
          <Badge variant="danger" dot>
            Inactive
          </Badge>
        );
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const columns: Column<Counselor>[] = [
    {
      key: 'counselorId',
      header: 'ID',
      width: '80px',
      render: row => <strong>{row.counselorId}</strong>,
    },
    {
      key: 'name',
      header: 'Counsellor',
      render: row => <strong>{row.name}</strong>,
    },
    {
      key: 'projectDeployed',
      header: 'Project Deployed',
      render: row => {
        const isInactive = row.deploymentStatus === 'inactive' || row.status === 'inactive';
        
        if (isInactive) {
          return (
            <ProjectCountBox as="div" $isInactive>
              inactive
            </ProjectCountBox>
          );
        }

        const count = row.projectsList?.length || 0;
        
        return (
          <Tooltip content="Click to view deployment & workload breakdown">
            <ProjectCountBox
              type="button"
              onClick={() => setCounselorForDeployment(row)}
            >
              <RiFolderLine /> {count} Projects
            </ProjectCountBox>
          </Tooltip>
        );
      },
    },

    {
      key: 'status',
      header: 'Status',
      width: '100px',
      render: row => getStatusBadge(row),
    },
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
  ];

  return (
    <CounselorsContainer>
      <PageHeader
        title="Counsellor Directory"
        subtitle="Deployment &amp; Workload overview for institution career counselors"
        breadcrumbs={[{ label: 'Dashboard', href: ROUTES.DASHBOARD }, { label: 'Counselors List' }]}
      />

      {/* Top Metric Stat Cards matching mockup */}
      <StatsGrid>
        <Card title="Total Empanelled">
          <StatMetricValue>{stats.totalEmpanelled}</StatMetricValue>
        </Card>

        <Card title="Deployed">
          <StatMetricValue $color="#16A34A">{stats.deployed}</StatMetricValue>
        </Card>

        <Card title="On Bench">
          <StatMetricValue $color="#0284C7">{stats.onBench}</StatMetricValue>
        </Card>

        <Card title="Inactive">
          <StatMetricValue $color="#DC2626">{stats.inactive}</StatMetricValue>
        </Card>
      </StatsGrid>

      <Card title="Deployment &amp; Workload">
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

            {!isViewOnlyUser && (
              <>
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
              </>
            )}
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

      <CounselorDeploymentModal
        isOpen={Boolean(counselorForDeployment)}
        onClose={() => setCounselorForDeployment(null)}
        counselor={counselorForDeployment}
      />

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
