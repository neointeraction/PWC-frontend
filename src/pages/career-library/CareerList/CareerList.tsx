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
import { RiLayoutGridLine, RiListCheck2 } from 'react-icons/ri';

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
          <ViewToggleContainer>
            <ViewToggleButton $active={viewMode === 'card'} onClick={() => setViewMode('card')}>
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
          roles={allRoles}
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
              selectedClusterName={selectedCluster?.name}
              onSelectCluster={cluster => {
                setSelectedCluster(cluster);
                setLevel('industries');
              }}
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
            />
          )}

          {level === 'detail' && selectedRole && roleDetail && (
            <JobRoleDetailView
              role={roleDetail.career}
              entranceExams={roleDetail.entranceExams}
              courses={roleDetail.courses}
              institutions={roleDetail.institutions}
            />
          )}
        </ContentCard>
      )}
    </Container>
  );
};
