import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/Button';
import { AlertModal } from '@/components/AlertModal';
import { ROUTES } from '@/constants';
import { CareerCluster, CareerIndustry, CareerDomain, Career } from '@/types';
import { careerService } from '@/services/career.service';
import { useAuthStore } from '@/store/auth.store';
import { useToast } from '@/hooks';
import { getApiErrorMessage } from '@/utils';
import { BreadcrumbHeader, BreadcrumbStep } from '../components/BreadcrumbHeader';
import { TaxonomyFormModal, TaxonomyLevel } from '../components/TaxonomyFormModal';
import { JobRoleFormModal } from '../components/JobRoleFormModal';
import { ClustersView } from '../views/ClustersView';
import { IndustriesView } from '../views/IndustriesView';
import { DomainsView } from '../views/DomainsView';
import { JobRolesView } from '../views/JobRolesView';
import { JobRoleDetailView } from '../views/JobRoleDetailView';
import { SimpleView } from '../views/SimpleView';
import { RiLayoutGridLine, RiListCheck2, RiAddLine } from 'react-icons/ri';

type TaxonomyModalState = {
  level: TaxonomyLevel;
  mode: 'add' | 'edit';
  entity?: { id: string; name: string };
  parentId?: string;
  parentLabel?: string;
};

type DeleteTarget = { kind: TaxonomyLevel | 'role'; id: string; name: string };

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
  const [viewMode, setViewMode] = useState<'card' | 'simple'>('card');
  const [level, setLevel] = useState<LevelType>('clusters');
  const [selectedCluster, setSelectedCluster] = useState<CareerCluster | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<CareerIndustry | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<CareerDomain | null>(null);
  const [selectedRole, setSelectedRole] = useState<Career | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const queryClient = useQueryClient();
  const toast = useToast();
  const { role } = useAuthStore();
  // Career Library is managed by the Super Admin only — everyone else (admin,
  // counsellor, student) gets read-only browsing.
  const canWrite = role === 'super_admin';

  const [taxonomyModal, setTaxonomyModal] = useState<TaxonomyModalState | null>(null);
  const [roleModal, setRoleModal] = useState<{ mode: 'add' | 'edit'; entity?: Career } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  // A taxonomy/entry write can change any level, so refresh every career query.
  // `refetchType: 'all'` matters: most of these queries are gated by `enabled` (level /
  // viewMode), and the default `'active'` only refetches the ones currently switched on —
  // the rest stay marked stale but keep serving their old data the moment they come back.
  const invalidateCareer = () =>
    Promise.all(
      [
        'clusters',
        'clusters-all',
        'industries',
        'industries-all',
        'domains',
        'domains-all',
        'jobRoles',
        'jobRoles-all',
        'careerDetail',
        // The edit modal's own link-list fetch — without this a save is followed by a
        // stale re-seed, and re-saving would restore links the user just removed.
        'career-entry-detail',
      ].map(key => queryClient.invalidateQueries({ queryKey: [key], refetchType: 'all' }))
    );

  // Put a newly-created role on screen straight away rather than waiting on the refetch
  // that follows — the POST response is the assembled entry, so it is already everything
  // the list row needs. The invalidation right after reconciles it with the server.
  const handleRoleSaved = (saved: Career, savedMode: 'add' | 'edit') => {
    if (savedMode === 'add' && selectedDomain) {
      queryClient.setQueryData<Career[]>(['jobRoles', selectedDomain.id, searchQuery], prev =>
        prev ? (prev.some(r => r.id === saved.id) ? prev : [...prev, saved]) : [saved]
      );
    }
    invalidateCareer();
  };

  const deleteMutation = useMutation({
    mutationFn: (target: DeleteTarget) => {
      switch (target.kind) {
        case 'cluster':
          return careerService.deleteCluster(target.id);
        case 'industry':
          return careerService.deleteIndustry(target.id);
        case 'domain':
          return careerService.deleteDomain(target.id);
        default:
          return careerService.deleteEntry(target.id);
      }
    },
    onSuccess: (_data, target) => {
      invalidateCareer();
      toast.success('Deleted', `"${target.name}" was removed.`);
      // If the currently-open role was deleted, step back to the roles list.
      if (target.kind === 'role' && selectedRole?.id === target.id) {
        setLevel('roles');
        setSelectedRole(null);
      }
      setDeleteTarget(null);
    },
    onError: (err: unknown) => {
      toast.error('Error', getApiErrorMessage(err, 'Failed to delete. It may be in use.'));
      setDeleteTarget(null);
    },
  });

  // Queries — all real reads against GET /api/v1/career-library (read-only API;
  // there's no create/edit/delete/bulk-upload/ratification endpoint yet).
  const { data: clusters = [] } = useQuery({
    queryKey: ['clusters', searchQuery],
    queryFn: () => careerService.getClusters(searchQuery),
    enabled: viewMode === 'card',
  });

  const { data: allClusters = [] } = useQuery({
    queryKey: ['clusters-all'],
    queryFn: () => careerService.getClusters(),
    enabled: viewMode === 'simple',
  });

  const { data: industries = [] } = useQuery({
    queryKey: ['industries', selectedCluster?.id, searchQuery],
    queryFn: () => careerService.getIndustries(selectedCluster?.id, searchQuery),
    enabled: level === 'industries',
  });

  const { data: domains = [] } = useQuery({
    queryKey: ['domains', selectedIndustry?.id, searchQuery],
    queryFn: () => careerService.getDomains(selectedIndustry?.id, searchQuery),
    enabled: level === 'domains',
  });

  const { data: roles = [] } = useQuery({
    queryKey: ['jobRoles', selectedDomain?.id, searchQuery],
    queryFn: () => careerService.getJobRoles(selectedDomain?.id, searchQuery),
    enabled: level === 'roles',
  });

  // Simple View browses the full hierarchy independently of the Card View's
  // drill-down state, so it needs its own unfiltered queries.
  const { data: allIndustries = [] } = useQuery({
    queryKey: ['industries-all'],
    queryFn: () => careerService.getIndustries(),
    enabled: viewMode === 'simple',
  });

  const { data: allDomains = [] } = useQuery({
    queryKey: ['domains-all'],
    queryFn: () => careerService.getDomains(),
    enabled: viewMode === 'simple',
  });

  const { data: allRoles = [] } = useQuery({
    queryKey: ['jobRoles-all'],
    queryFn: () => careerService.getJobRoles(),
    enabled: viewMode === 'simple',
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
    return '';
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

  // Keep the same job role when switching to Card View: rebuild the drill-down path
  // from the shared selected role and jump straight to its detail.
  const switchToCard = () => {
    if (selectedRole) {
      const cluster =
        allClusters.find(c => c.name === selectedRole.careerCluster) || selectedCluster;
      const industry =
        allIndustries.find(i => i.name === selectedRole.industry) || selectedIndustry;
      const domain = allDomains.find(d => d.name === selectedRole.domain) || selectedDomain;
      if (cluster) setSelectedCluster(cluster);
      if (industry) setSelectedIndustry(industry);
      if (domain) setSelectedDomain(domain);
      setLevel('detail');
    }
    setViewMode('card');
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
          <ViewToggleContainer>
            <ViewToggleButton $active={viewMode === 'card'} onClick={switchToCard}>
              <RiLayoutGridLine size={16} /> Card View
            </ViewToggleButton>
            <ViewToggleButton
              $active={viewMode === 'simple'}
              onClick={() => setViewMode('simple')}
            >
              <RiListCheck2 size={16} /> Simple View
            </ViewToggleButton>
          </ViewToggleContainer>
        }
      />

      {viewMode === 'simple' ? (
        <SimpleView
          clusters={allClusters}
          industries={allIndustries}
          domains={allDomains}
          selectedRole={selectedRole}
          onSelectRole={setSelectedRole}
          onEditRole={canWrite ? role => setRoleModal({ mode: 'edit', entity: role }) : undefined}
          roles={allRoles}
        />
      ) : (
        <ContentCard>
          <BreadcrumbHeader
            steps={getBreadcrumbs()}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            actions={
              canWrite && level !== 'detail' ? (
                <>
                  {level === 'clusters' && (
                    <Button
                      size="sm"
                      leftIcon={<RiAddLine size={16} />}
                      onClick={() => setTaxonomyModal({ level: 'cluster', mode: 'add' })}
                    >
                      Add Cluster
                    </Button>
                  )}
                  {level === 'industries' && selectedCluster && (
                    <Button
                      size="sm"
                      leftIcon={<RiAddLine size={16} />}
                      onClick={() =>
                        setTaxonomyModal({
                          level: 'industry',
                          mode: 'add',
                          parentId: selectedCluster.id,
                          parentLabel: selectedCluster.name,
                        })
                      }
                    >
                      Add Industry
                    </Button>
                  )}
                  {level === 'domains' && selectedIndustry && (
                    <Button
                      size="sm"
                      leftIcon={<RiAddLine size={16} />}
                      onClick={() =>
                        setTaxonomyModal({
                          level: 'domain',
                          mode: 'add',
                          parentId: selectedIndustry.id,
                          parentLabel: selectedIndustry.name,
                        })
                      }
                    >
                      Add Domain
                    </Button>
                  )}
                  {level === 'roles' && selectedDomain && (
                    <Button
                      size="sm"
                      leftIcon={<RiAddLine size={16} />}
                      onClick={() => setRoleModal({ mode: 'add' })}
                    >
                      Add Job Role
                    </Button>
                  )}
                </>
              ) : undefined
            }
          />

          {level === 'clusters' && (
            <ClustersView
              clusters={clusters}
              selectedClusterName={selectedCluster?.name}
              onSelectCluster={cluster => {
                setSelectedCluster(cluster);
                setLevel('industries');
              }}
              onEditCluster={
                canWrite
                  ? cluster =>
                      setTaxonomyModal({
                        level: 'cluster',
                        mode: 'edit',
                        entity: { id: cluster.id, name: cluster.name },
                      })
                  : undefined
              }
              onDeleteCluster={
                canWrite
                  ? cluster =>
                      setDeleteTarget({ kind: 'cluster', id: cluster.id, name: cluster.name })
                  : undefined
              }
            />
          )}

          {level === 'industries' && (
            <IndustriesView
              industries={industries}
              selectedIndustryName={selectedIndustry?.name}
              onSelectIndustry={ind => {
                setSelectedIndustry(ind);
                setLevel('domains');
              }}
              onEditIndustry={
                canWrite
                  ? ind =>
                      setTaxonomyModal({
                        level: 'industry',
                        mode: 'edit',
                        entity: { id: ind.id, name: ind.name },
                      })
                  : undefined
              }
              onDeleteIndustry={
                canWrite
                  ? ind => setDeleteTarget({ kind: 'industry', id: ind.id, name: ind.name })
                  : undefined
              }
            />
          )}

          {level === 'domains' && (
            <DomainsView
              domains={domains}
              selectedDomainName={selectedDomain?.name}
              onSelectDomain={dom => {
                setSelectedDomain(dom);
                setLevel('roles');
              }}
              onEditDomain={
                canWrite
                  ? dom =>
                      setTaxonomyModal({
                        level: 'domain',
                        mode: 'edit',
                        entity: { id: dom.id, name: dom.name },
                      })
                  : undefined
              }
              onDeleteDomain={
                canWrite
                  ? dom => setDeleteTarget({ kind: 'domain', id: dom.id, name: dom.name })
                  : undefined
              }
            />
          )}

          {level === 'roles' && (
            <JobRolesView
              roles={roles}
              selectedRoleId={selectedRole?.id}
              onSelectRole={role => {
                setSelectedRole(role);
                setLevel('detail');
              }}
              onEditRole={canWrite ? role => setRoleModal({ mode: 'edit', entity: role }) : undefined}
              onDeleteRole={
                canWrite
                  ? role => setDeleteTarget({ kind: 'role', id: role.id, name: role.jobRole })
                  : undefined
              }
            />
          )}

          {level === 'detail' && selectedRole && roleDetail && (
            <JobRoleDetailView
              role={roleDetail.career}
              entranceExams={roleDetail.entranceExams}
              courses={roleDetail.courses}
              institutions={roleDetail.institutions}
              onEditRole={canWrite ? role => setRoleModal({ mode: 'edit', entity: role }) : undefined}
            />
          )}
        </ContentCard>
      )}

      <TaxonomyFormModal
        isOpen={Boolean(taxonomyModal)}
        onClose={() => setTaxonomyModal(null)}
        onSaved={invalidateCareer}
        level={taxonomyModal?.level ?? 'cluster'}
        mode={taxonomyModal?.mode ?? 'add'}
        entity={taxonomyModal?.entity}
        parentId={taxonomyModal?.parentId}
        parentLabel={taxonomyModal?.parentLabel}
      />

      <JobRoleFormModal
        isOpen={Boolean(roleModal)}
        onClose={() => setRoleModal(null)}
        onSaved={handleRoleSaved}
        mode={roleModal?.mode ?? 'add'}
        entity={roleModal?.entity}
        domainId={selectedDomain?.id}
        domainLabel={selectedDomain?.name}
        clusterLabel={selectedCluster?.name}
        industryLabel={selectedIndustry?.name}
      />

      <AlertModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget)}
        title={`Delete ${deleteTarget?.kind === 'role' ? 'Job Role' : deleteTarget?.kind ?? ''}`}
        description={`Are you sure you want to delete "${deleteTarget?.name}"?${
          deleteTarget && deleteTarget.kind !== 'role'
            ? ' Its child items may be affected.'
            : ''
        }`}
        variant="danger"
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteMutation.isPending}
      />
    </Container>
  );
};
