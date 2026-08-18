import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  RiFilter3Line,
  RiSearchLine,
  RiBriefcaseLine,
} from 'react-icons/ri';
import { Select } from '@/components/Select';
import { Input } from '@/components/Input';
import { CareerCluster, CareerIndustry, CareerDomain, Career } from '@/types';
import { careerService } from '@/services/career.service';
import { JobRoleDetailView } from './JobRoleDetailView';
import {
  SimpleViewContainer,
  LeftPanel,
  PanelTitle,
  SelectGroup,
  RolesListContainer,
  RolesListTitle,
  RoleItemCard,
  RoleItemHeader,
  RoleItemName,
  RightPanel,
  EmptyDetailCard,
} from './SimpleView.styles';

export interface SimpleViewProps {
  clusters: CareerCluster[];
  industries: CareerIndustry[];
  domains: CareerDomain[];
  roles: Career[];
  // Shared with Card View so the same job role stays selected across a view switch.
  selectedRole?: Career | null;
  onSelectRole?: (role: Career) => void;
}

export const SimpleView: React.FC<SimpleViewProps> = ({
  clusters,
  industries,
  domains,
  roles,
  selectedRole,
  onSelectRole,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Explicit selection IDs
  const [selectedClusterId, setSelectedClusterId] = useState<string>('');
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>('');
  const [selectedDomainId, setSelectedDomainId] = useState<string>('');
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');

  // Adopt the role selected in Card View: map its cluster/industry/domain names to the
  // matching taxonomy ids so the dropdowns + detail panel land on the same role. Re-runs
  // when the data arrives (parents resolve once loaded). Does not call onSelectRole, so
  // no feedback loop with the parent.
  useEffect(() => {
    if (!selectedRole) return;
    const cluster = clusters.find(c => c.name === selectedRole.careerCluster);
    const industry = industries.find(i => i.name === selectedRole.industry);
    const domain = domains.find(d => d.name === selectedRole.domain);
    if (cluster) setSelectedClusterId(cluster.id);
    if (industry) setSelectedIndustryId(industry.id);
    if (domain) setSelectedDomainId(domain.id);
    setSelectedRoleId(selectedRole.id);
  }, [selectedRole, clusters, industries, domains]);

  // 2. Purely Derived Active Cluster
  const activeCluster = useMemo(() => {
    return clusters.find(c => c.id === selectedClusterId) || clusters[0] || null;
  }, [clusters, selectedClusterId]);

  // 3. Purely Derived Available Industries for active Cluster
  const availableIndustries = useMemo(() => {
    if (!activeCluster) return industries;
    const filtered = industries.filter(
      i =>
        i.clusterId === activeCluster.id ||
        i.clusterName.toLowerCase() === activeCluster.name.toLowerCase()
    );
    return filtered.length > 0 ? filtered : industries;
  }, [industries, activeCluster]);

  // Purely Derived Active Industry
  const activeIndustry = useMemo(() => {
    return (
      availableIndustries.find(i => i.id === selectedIndustryId) ||
      availableIndustries[0] ||
      null
    );
  }, [availableIndustries, selectedIndustryId]);

  // 4. Purely Derived Available Domains for active Industry
  const availableDomains = useMemo(() => {
    if (!activeIndustry) return domains;
    const filtered = domains.filter(
      d =>
        d.industryId === activeIndustry.id ||
        d.industryName.toLowerCase() === activeIndustry.name.toLowerCase()
    );
    return filtered.length > 0 ? filtered : domains;
  }, [domains, activeIndustry]);

  // Purely Derived Active Domain
  const activeDomain = useMemo(() => {
    return (
      availableDomains.find(d => d.id === selectedDomainId) ||
      availableDomains[0] ||
      null
    );
  }, [availableDomains, selectedDomainId]);

  // 5. Purely Derived Available Roles for active Domain
  const availableRoles = useMemo(() => {
    if (!activeDomain) return roles;
    const filtered = roles.filter(
      r => r.domain.toLowerCase() === activeDomain.name.toLowerCase()
    );
    return filtered.length > 0 ? filtered : roles;
  }, [roles, activeDomain]);

  // Purely Derived Active Role
  const activeRole = useMemo(() => {
    return (
      availableRoles.find(r => r.id === selectedRoleId) ||
      availableRoles[0] ||
      null
    );
  }, [availableRoles, selectedRoleId]);

  // Dropdown options
  const clusterOptions = useMemo(
    () => clusters.map(c => ({ value: c.id, label: c.name })),
    [clusters]
  );

  const industryOptions = useMemo(
    () => availableIndustries.map(i => ({ value: i.id, label: i.name })),
    [availableIndustries]
  );

  const domainOptions = useMemo(
    () => availableDomains.map(d => ({ value: d.id, label: d.name })),
    [availableDomains]
  );

  // Search filter applied on top of available roles
  const displayedRoles = useMemo(() => {
    if (!searchQuery.trim()) return availableRoles;
    const query = searchQuery.toLowerCase();
    return availableRoles.filter(
      r =>
        r.jobRole.toLowerCase().includes(query) ||
        r.oneLineDescription.toLowerCase().includes(query)
    );
  }, [availableRoles, searchQuery]);

  // Clean event handlers that update selection state without triggering conflicting effects
  const handleClusterChange = (newClusterId: string) => {
    setSelectedClusterId(newClusterId);
    setSelectedIndustryId('');
    setSelectedDomainId('');
    setSelectedRoleId('');
  };

  const handleIndustryChange = (newIndustryId: string) => {
    setSelectedIndustryId(newIndustryId);
    setSelectedDomainId('');
    setSelectedRoleId('');
  };

  const handleDomainChange = (newDomainId: string) => {
    setSelectedDomainId(newDomainId);
    setSelectedRoleId('');
  };

  const { data: roleDetail } = useQuery({
    queryKey: ['careerDetail', activeRole?.id],
    queryFn: () => careerService.getById(activeRole!.id),
    enabled: !!activeRole,
  });

  return (
    <SimpleViewContainer>
      {/* Left Control Panel */}
      <LeftPanel>
        <PanelTitle>
          <RiFilter3Line size={18} /> Career Hierarchy Filters
        </PanelTitle>

        <SelectGroup>
          <Select
            label="Career Cluster"
            options={clusterOptions}
            value={activeCluster?.id || ''}
            onChange={e => handleClusterChange(e.target.value)}
            placeholder="Select Cluster"
          />

          <Select
            label="Industry"
            options={industryOptions}
            value={activeIndustry?.id || ''}
            onChange={e => handleIndustryChange(e.target.value)}
            placeholder="Select Industry"
          />

          <Select
            label="Domain"
            options={domainOptions}
            value={activeDomain?.id || ''}
            onChange={e => handleDomainChange(e.target.value)}
            placeholder="Select Domain"
          />
        </SelectGroup>

        <Input
          placeholder="Filter job roles..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          leftIcon={<RiSearchLine size={16} />}
        />

        <RolesListContainer>
          <RolesListTitle>Job Roles ({displayedRoles.length})</RolesListTitle>
          {displayedRoles.map(roleItem => {
            const isSelected = activeRole?.id === roleItem.id;
            return (
              <RoleItemCard
                key={roleItem.id}
                $active={isSelected}
                onClick={() => {
                  setSelectedRoleId(roleItem.id);
                  onSelectRole?.(roleItem);
                }}
              >
                <RoleItemHeader>
                  <RoleItemName $active={isSelected}>{roleItem.jobRole}</RoleItemName>
                </RoleItemHeader>
              </RoleItemCard>
            );
          })}
          {displayedRoles.length === 0 && (
            <p style={{ fontSize: '13px', color: '#64748b', margin: '8px 0' }}>
              No job roles match the current filter.
            </p>
          )}
        </RolesListContainer>
      </LeftPanel>

      {/* Right Detail Panel */}
      <RightPanel>
        {activeRole && roleDetail ? (
          <JobRoleDetailView
            role={roleDetail.career}
            entranceExams={roleDetail.entranceExams}
            courses={roleDetail.courses}
            institutions={roleDetail.institutions}
          />
        ) : (
          <EmptyDetailCard>
            <RiBriefcaseLine size={48} color="#94A3B8" />
            <h3>No Job Role Selected</h3>
            <p>
              Select a Career Cluster, Industry, Domain, and Job Role from the left panel to inspect full career pathway specs, salary metrics, entrance exams, and courses.
            </p>
          </EmptyDetailCard>
        )}
      </RightPanel>
    </SimpleViewContainer>
  );
};

export default SimpleView;
