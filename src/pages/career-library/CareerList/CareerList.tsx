import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { PageHeader } from '@/components/PageHeader';
import { ROUTES } from '@/constants';
import { CareerCluster, CareerIndustry, CareerDomain, Career } from '@/types';
import { careerService } from '@/services/career.service';
import { BreadcrumbHeader, BreadcrumbStep } from '../components/BreadcrumbHeader';
import { ClustersView } from '../views/ClustersView';
import { IndustriesView } from '../views/IndustriesView';
import { DomainsView } from '../views/DomainsView';
import { JobRolesView } from '../views/JobRolesView';
import { JobRoleDetailView } from '../views/JobRoleDetailView';
import { SimpleView } from '../views/SimpleView';
import { AddEditModal, AddEditFormData } from '../modals/AddEditModal';
import { BulkUploadModal } from './BulkUploadModal';
import { RiAddLine, RiUploadCloudLine, RiLayoutGridLine, RiListCheck2 } from 'react-icons/ri';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ViewToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 3px;
`;

const ViewToggleButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? '#ffffff' : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ $active }) => ($active ? '#ffffff' : '#5D2384')};
  }
`;

const ContentCard = styled.div`
  background-color: #f7f5fc;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.xl};
`;

type LevelType = 'clusters' | 'industries' | 'domains' | 'roles' | 'detail';

export const CareerListPage: React.FC = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [viewMode, setViewMode] = useState<'card' | 'simple'>('card');
  const [level, setLevel] = useState<LevelType>('clusters');
  const [selectedCluster, setSelectedCluster] = useState<CareerCluster | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<CareerIndustry | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<CareerDomain | null>(null);
  const [selectedRole, setSelectedRole] = useState<Career | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Queries — all real reads against GET /api/v1/career-library (read-only API;
  // there's no create/edit/delete/bulk-upload/ratification endpoint yet).
  const { data: clusters = [] } = useQuery({
    queryKey: ['clusters', searchQuery],
    queryFn: () => careerService.getClusters(searchQuery),
  });

  const { data: industries = [] } = useQuery({
    queryKey: ['industries', selectedCluster?.name, searchQuery],
    queryFn: () => careerService.getIndustries(selectedCluster?.name, searchQuery),
    enabled: level === 'industries',
  });

  const { data: domains = [] } = useQuery({
    queryKey: ['domains', selectedIndustry?.name, searchQuery],
    queryFn: () => careerService.getDomains(selectedIndustry?.name, searchQuery),
    enabled: level === 'domains',
  });

  const { data: roles = [] } = useQuery({
    queryKey: ['jobRoles', selectedDomain?.name, searchQuery],
    queryFn: () => careerService.getJobRoles(selectedDomain?.name, searchQuery),
    enabled: level === 'roles',
  });

  const { data: roleDetail } = useQuery({
    queryKey: ['careerDetail', selectedRole?.id],
    queryFn: () => careerService.getById(selectedRole!.id),
    enabled: level === 'detail' && !!selectedRole,
  });

  // Breadcrumbs calculation
  const getBreadcrumbs = (): BreadcrumbStep[] => {
    const steps: BreadcrumbStep[] = [
      {
        label: 'Home',
        onClick: () => {
          setLevel('clusters');
          setSelectedCluster(null);
          setSelectedIndustry(null);
          setSelectedDomain(null);
          setSelectedRole(null);
        },
      },
    ];

    if (selectedCluster || level !== 'clusters') {
      steps.push({
        label: selectedCluster?.name || '',
        onClick: () => {
          setLevel('industries');
          setSelectedIndustry(null);
          setSelectedDomain(null);
          setSelectedRole(null);
        },
      });
    }

    if (selectedIndustry || level === 'domains' || level === 'roles' || level === 'detail') {
      steps.push({
        label: selectedIndustry?.name || '',
        onClick: () => {
          setLevel('domains');
          setSelectedDomain(null);
          setSelectedRole(null);
        },
      });
    }

    if (selectedDomain || level === 'roles' || level === 'detail') {
      steps.push({
        label: selectedDomain?.name || '',
        onClick: () => {
          setLevel('roles');
          setSelectedRole(null);
        },
      });
    }

    if (selectedRole || level === 'detail') {
      steps.push({ label: selectedRole?.jobRole || '' });
    }

    return steps;
  };

  // Dynamic Header Titles
  const getHeaderTitle = () => {
    if (level === 'clusters') return 'Choose a Career Cluster';
    if (level === 'industries') return 'Choose an Industry within the Career Cluster';
    if (level === 'domains') return 'Choose a Domain within the Industry';
    if (level === 'roles') return 'Choose a Job Role within the Domain';
    return selectedRole?.jobRole || '';
  };

  const getHeaderSubtitle = () => {
    if (level === 'clusters')
      return 'Select a career cluster to explore industries and specialization tracks';
    if (level === 'industries') return `Industries under ${selectedCluster?.name || ''}`;
    if (level === 'domains') return `Domains under ${selectedIndustry?.name || ''}`;
    if (level === 'roles') return `Job roles under ${selectedDomain?.name || ''}`;
    return selectedRole?.oneLineDescription || 'Role profile & career pathway details';
  };

  const handleBack = () => {
    if (level === 'industries') {
      setLevel('clusters');
      setSelectedCluster(null);
    } else if (level === 'domains') {
      setLevel('industries');
      setSelectedIndustry(null);
    } else if (level === 'roles') {
      setLevel('domains');
      setSelectedDomain(null);
    } else if (level === 'detail') {
      setLevel('roles');
      setSelectedRole(null);
    }
  };

  return (
    <Container>
      <PageHeader
        title={viewMode === 'simple' ? 'Career Library Spec Browser' : getHeaderTitle()}
        subtitle={
          viewMode === 'simple'
            ? 'Select hierarchy options on the left panel to inspect full job role specifications'
            : getHeaderSubtitle()
        }
        breadcrumbs={[{ label: 'Dashboard', href: ROUTES.DASHBOARD }, { label: 'Career Library' }]}
        onBack={viewMode === 'card' && level !== 'clusters' ? handleBack : undefined}
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ViewToggleContainer>
              <ViewToggleButton
                $active={viewMode === 'card'}
                onClick={() => setViewMode('card')}
              >
                <RiLayoutGridLine size={16} /> Card View
              </ViewToggleButton>
              <ViewToggleButton
                $active={viewMode === 'simple'}
                onClick={() => {
                  setViewMode('simple');
                  if (!selectedCluster && clusters.length > 0) {
                    setSelectedCluster(clusters[0]);
                  }
                }}
              >
                <RiListCheck2 size={16} /> Simple View
              </ViewToggleButton>
            </ViewToggleContainer>

            {isSuperAdmin && viewMode === 'card' && level !== 'detail' && (
              <>
                {level === 'clusters' && (
                  <Button
                    variant="secondary"
                    leftIcon={<RiUploadCloudLine size={18} />}
                    onClick={() => setIsBulkUploadOpen(true)}
                  >
                    Bulk Upload
                  </Button>
                )}
                {addLabel && (
                  <Button leftIcon={<RiAddLine size={18} />} onClick={handleOpenAddModal}>
                    {addLabel}
                  </Button>
                )}
              </>
            )}
          </div>
        }
      />

      {viewMode === 'simple' ? (
        <SimpleView
          clusters={clusters}
          industries={industries}
          domains={domains}
          roles={roles}
          entranceExams={entranceExams}
          courses={courses}
          institutions={institutions}
          onToggleShortlist={id => toggleShortlistMutation.mutate(id)}
          onToggleExamShortlist={id => toggleExamShortlistMutation.mutate(id)}
          onToggleInstitutionShortlist={id => toggleInstShortlistMutation.mutate(id)}
          onEditRole={
            isSuperAdmin ? roleItem => handleOpenEditModal('role', roleItem) : undefined
          }
        />
      ) : (
        <ContentCard>
          <BreadcrumbHeader
            steps={getBreadcrumbs()}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {level === 'clusters' && (
            <ClustersView
              clusters={clusters}
              selectedClusterName={selectedCluster?.name || 'Arts, Design & Creative'}
              onSelectCluster={cluster => {
                setSelectedCluster(cluster);
                setLevel('industries');
              }}
              onEditCluster={
                isSuperAdmin ? cluster => handleOpenEditModal('cluster', cluster) : undefined
              }
              onDeleteCluster={
                isSuperAdmin
                  ? cluster => setDeleteTarget({ type: 'cluster', id: cluster.id, name: cluster.name })
                  : undefined
              }
            />
          )}

          {level === 'industries' && (
            <IndustriesView
              industries={industries}
              selectedIndustryName={selectedIndustry?.name || 'Applied Arts'}
              onSelectIndustry={ind => {
                setSelectedIndustry(ind);
                setLevel('domains');
              }}
              onEditIndustry={
                isSuperAdmin ? ind => handleOpenEditModal('industry', ind) : undefined
              }
              onDeleteIndustry={
                isSuperAdmin
                  ? ind => setDeleteTarget({ type: 'industry', id: ind.id, name: ind.name })
                  : undefined
              }
            />
          )}

          {level === 'domains' && (
            <DomainsView
              domains={domains}
              selectedDomainName={selectedDomain?.name || 'Digital Arts'}
              onSelectDomain={dom => {
                setSelectedDomain(dom);
                setLevel('roles');
              }}
              onEditDomain={
                isSuperAdmin ? dom => handleOpenEditModal('domain', dom) : undefined
              }
              onDeleteDomain={
                isSuperAdmin
                  ? dom => setDeleteTarget({ type: 'domain', id: dom.id, name: dom.name })
                  : undefined
              }
            />
          )}

          {level === 'roles' && (
            <JobRolesView
              roles={roles}
              selectedRoleId={selectedRole?.id || 'role-ui-1'}
              onSelectRole={role => {
                setSelectedRole(role);
                setLevel('detail');
              }}
              onEditRole={
                isSuperAdmin ? role => handleOpenEditModal('role', role) : undefined
              }
              onDeleteRole={
                isSuperAdmin
                  ? role => setDeleteTarget({ type: 'role', id: role.id, name: role.jobRole })
                  : undefined
              }
            />
          )}

          {level === 'detail' && selectedRole && (
            <JobRoleDetailView
              role={selectedRole}
              entranceExams={entranceExams}
              courses={courses}
              institutions={institutions}
              onToggleShortlist={() => toggleShortlistMutation.mutate(selectedRole.id)}
              onToggleExamShortlist={id => toggleExamShortlistMutation.mutate(id)}
              onToggleInstitutionShortlist={id => toggleInstShortlistMutation.mutate(id)}
              onEditRole={
                isSuperAdmin ? role => handleOpenEditModal('role', role) : undefined
              }
            />
          )}
        </ContentCard>
      )}

      {/* Bulk Upload Modal */}
      <BulkUploadModal
        isOpen={isBulkUploadOpen}
        onClose={() => setIsBulkUploadOpen(false)}
      />

      {/* Add / Edit Modal */}
      <AddEditModal
        isOpen={isAddEditOpen}
        onClose={() => {
          setIsAddEditOpen(false);
          setEditingItem(null);
        }}
        title={
          editingItem?.item
            ? `Edit ${editingItem.type.toUpperCase()}: ${editingItem.item.name || editingItem.item.jobRole}`
            : `Add New ${editingItem?.type.toUpperCase()}`
        }
        isJobRole={editingItem?.type === 'role'}
        initialValues={
          editingItem?.item
            ? {
                name: editingItem.item.name || editingItem.item.jobRole,
                description: editingItem.item.description || editingItem.item.oneLineDescription,
                aiResilience: editingItem.item.aiResilienceGrading || 'High',
                salaryIndia: editingItem.item.approxSalaryRangeIndia || '₹4–15 LPA',
                salaryGlobal: editingItem.item.globalSalaryRange || '$70k–$120k',
                topRecruiters: Array.isArray(editingItem.item.topCompaniesRecruiting)
                  ? editingItem.item.topCompaniesRecruiting.join(', ')
                  : editingItem.item.topCompaniesRecruiting || 'Tech Firms, Startups',
              }
            : undefined
        }
        onSubmit={handleFormSubmit}
      />

      {/* Confirmation Modal */}
      <AlertModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title={`Delete ${deleteTarget?.type.toUpperCase()}`}
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        variant="danger"
        confirmText="Delete Item"
      />
    </Container>
  );
};
