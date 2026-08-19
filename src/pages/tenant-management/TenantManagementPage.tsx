import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RiUserAddLine,
  RiSearchLine,
  RiEyeLine,
  RiEditLine,
  RiDeleteBinLine,
  RiUserStarLine,
  RiBuilding4Line,
  RiGraduationCapLine,
  RiKeyLine,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Table, Column } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { tenantManagementService } from '@/services/tenant-management.service';
import { useTenantManagementStore } from '@/store/tenant-management.store';
import { useAuthStore } from '@/store/auth.store';
import { useToast } from '@/hooks';
import { UserRecord, UserCategory } from '@/types/tenant-management.types';
import {
  TenantManagementContainer,
  FilterBar,
  SearchWrapper,
  ActionIconButtonGroup,
  ActionIconButton,
  BadgeIconMargin,
  TenantCell,
  TenantNameText,
  TenantEmailSubtext,
} from './TenantManagement.styles';
import { AlertModal, Tooltip, Tabs, TabItem } from '@/components';
import { AddTenantModal } from './components/AddTenantModal';
import { EditTenantModal } from './components/EditTenantModal';
import { ViewTenantModal } from './components/ViewTenantModal';
import { CredentialsModal } from './components/CredentialsModal';

export const TenantManagementPage: React.FC = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { user } = useAuthStore();
  const isViewOnlyUser = Boolean(user?.isViewOnly);

  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    openAddModal,
    openEditModal,
    openViewModal,
    openCredentialsModal,
  } = useTenantManagementStore();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [userToDelete, setUserToDelete] = useState<UserRecord | null>(null);

  // Fetch tenant users query
  const { data, isLoading } = useQuery({
    queryKey: ['tenant-records', activeCategory, searchQuery, page, limit],
    queryFn: () =>
      tenantManagementService.getAll({
        category: activeCategory,
        search: searchQuery,
        page,
        limit,
      }),
  });

  // Delete tenant mutation
  const deleteMutation = useMutation({
    mutationFn: tenantManagementService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenant-records'] });
      toast.success('Tenant User Deleted', 'Successfully removed tenant user record.');
      setUserToDelete(null);
    },
    onError: () => {
      toast.error('Error', 'Failed to delete tenant user record.');
      setUserToDelete(null);
    },
  });

  const handleDeleteClick = (userRecord: UserRecord) => {
    setUserToDelete(userRecord);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteMutation.mutate(userToDelete.id);
    }
  };

  const getCategoryBadge = (category: UserCategory) => {
    switch (category) {
      case 'pwc':
        return (
          <Badge variant="primary">
            <BadgeIconMargin>
              <RiUserStarLine size={14} />
            </BadgeIconMargin>
            kREATE
          </Badge>
        );
      case 'institution':
        return (
          <Badge variant="info">
            <BadgeIconMargin>
              <RiBuilding4Line size={14} />
            </BadgeIconMargin>
            Institution
          </Badge>
        );
      case 'counselor':
        return (
          <Badge variant="success">
            <BadgeIconMargin>
              <RiGraduationCapLine size={14} />
            </BadgeIconMargin>
            Counselor
          </Badge>
        );
    }
  };

  const columns: Column<UserRecord>[] = [
    {
      key: 'name',
      header: 'Tenant Name & Contact',
      render: row => (
        <TenantCell>
          <TenantNameText>{row.name}</TenantNameText>
          <TenantEmailSubtext>{row.email}</TenantEmailSubtext>
        </TenantCell>
      ),
    },
    {
      key: 'userCategory',
      header: 'User Type',
      render: row => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {getCategoryBadge(row.userCategory)}
          {row.isViewOnly && (
            <Badge variant="warning">
              <BadgeIconMargin>
                <RiEyeLine size={14} />
              </BadgeIconMargin>
              View Only
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: 'organizationName',
      header: 'Organization / Institution',
      render: row => row.organizationName || 'kREATE Global Engine',
    },
    {
      key: 'status',
      header: 'Status',
      render: row => (
        <Badge
          variant={
            row.status === 'active' ? 'success' : row.status === 'pending' ? 'warning' : 'default'
          }
          dot
        >
          {row.status}
        </Badge>
      ),
    },
    {
      key: 'lastActive',
      header: 'Last Active',
      render: row => row.lastActive || 'N/A',
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row: UserRecord) => (
        <ActionIconButtonGroup>
          {isViewOnlyUser ? (
            <Tooltip content="View Profile">
              <ActionIconButton aria-label="View Profile" onClick={() => openViewModal(row)}>
                <RiEyeLine size={16} />
              </ActionIconButton>
            </Tooltip>
          ) : (
            <>
              <Tooltip content="View Credentials">
                <ActionIconButton
                  aria-label="View Credentials"
                  onClick={() => openCredentialsModal(row)}
                >
                  <RiKeyLine size={16} />
                </ActionIconButton>
              </Tooltip>
              <Tooltip content="View Profile">
                <ActionIconButton aria-label="View Profile" onClick={() => openViewModal(row)}>
                  <RiEyeLine size={16} />
                </ActionIconButton>
              </Tooltip>
              <Tooltip content="Edit Tenant">
                <ActionIconButton aria-label="Edit Tenant" onClick={() => openEditModal(row)}>
                  <RiEditLine size={16} />
                </ActionIconButton>
              </Tooltip>
              <Tooltip
                content={
                  (data?.total ?? data?.data?.length ?? 0) <= 1
                    ? 'Cannot delete the only tenant'
                    : 'Delete Tenant'
                }
              >
                <ActionIconButton
                  aria-label="Delete Tenant"
                  disabled={(data?.total ?? data?.data?.length ?? 0) <= 1}
                  onClick={() => handleDeleteClick(row)}
                >
                  <RiDeleteBinLine size={16} />
                </ActionIconButton>
              </Tooltip>
            </>
          )}
        </ActionIconButtonGroup>
      ),
    },
  ];

  const categoryTabs: TabItem<UserCategory | 'all'>[] = [
    { id: 'pwc', label: 'kREATE', icon: <RiUserStarLine size={18} /> },
    {
      id: 'institution',
      label: 'Institution',
      icon: <RiBuilding4Line size={18} />,
      disabled: true,
      comingSoon: true,
    },
    {
      id: 'counselor',
      label: 'Counselor',
      icon: <RiGraduationCapLine size={18} />,
      disabled: true,
      comingSoon: true,
    },
  ];

  return (
    <TenantManagementContainer>
      <PageHeader
        title="Tenant Management"
        breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Tenant Management' }]}
      />

      <Card>
        {isViewOnlyUser && (
          <div
            style={{
              padding: '12px 16px',
              marginBottom: '16px',
              borderRadius: '4px',
              backgroundColor: '#fffbeb',
              border: '1px solid #fde68a',
              color: '#78350f',
              fontSize: '14px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <RiEyeLine size={20} style={{ color: '#d97706', flexShrink: 0 }} />
            <span>
              <strong>View-Only Mode Active:</strong> You are logged in with read-only permissions. Adding, editing, and deleting tenants is restricted.
            </span>
          </div>
        )}
        <Tabs
          tabs={categoryTabs}
          activeTab={activeCategory === 'all' ? 'pwc' : activeCategory}
          onChange={cat => {
            setActiveCategory(cat);
            setPage(1);
          }}
          layoutId="tenantManagementTabs"
        />

        <FilterBar>
          <SearchWrapper>
            <Input
              placeholder="Search tenants by name, email, role, or institution..."
              leftIcon={<RiSearchLine size={18} />}
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
            />
          </SearchWrapper>
          {!isViewOnlyUser && (
            <Button leftIcon={<RiUserAddLine size={18} />} onClick={openAddModal}>
              Add New Tenant
            </Button>
          )}
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
                  onPageChange: (p: number) => setPage(p),
                  onLimitChange: (l: number) => {
                    setLimit(l);
                    setPage(1);
                  },
                }
              : undefined
          }
        />
      </Card>

      <AddTenantModal />
      <EditTenantModal />
      <ViewTenantModal />
      <CredentialsModal />

      <AlertModal
        isOpen={Boolean(userToDelete)}
        onClose={() => setUserToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Tenant User"
        description={`Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone.`}
        variant="danger"
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteMutation.isPending}
      />
    </TenantManagementContainer>
  );
};
