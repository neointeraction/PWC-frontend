import React, { useState, useMemo } from 'react';
import { RiSearchLine, RiAddLine } from 'react-icons/ri';
import styled from 'styled-components';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Badge } from '@/components/Badge';
import { Checkbox } from '@/components/Checkbox';
import { mockCareers, mockClusters } from '@/mocks/careers.mock';
import { CareerCompassItem } from '@/mocks/studentFormChart.mock';

interface CareerLibraryPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRoles: (roles: CareerCompassItem[]) => void;
}

const FilterHeaderRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  align-items: center;
  flex-wrap: wrap;
`;

const SearchInputWrapper = styled.div`
  flex: 1;
  min-width: 240px;
`;

const RoleListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 380px;
  overflow-y: auto;
  padding-right: 4px;
`;

const RoleCard = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ $selected, theme }) => ($selected ? theme.colors.primaryLight || '#F3F4F6' : theme.colors.surface)};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const RoleCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const RoleTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const RoleTitle = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const RoleDescription = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  line-height: 1.4;
`;

const RoleMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const FooterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const CareerLibraryPickerModal: React.FC<CareerLibraryPickerModalProps> = ({
  isOpen,
  onClose,
  onAddRoles,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCluster, setSelectedCluster] = useState('ALL');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const clusterOptions = useMemo(() => {
    return [
      { label: 'All Career Clusters', value: 'ALL' },
      ...mockClusters.map(c => ({ label: c.name, value: c.name })),
    ];
  }, []);

  const filteredCareers = useMemo(() => {
    return mockCareers.filter(c => {
      const searchLower = search.toLowerCase();
      const roleText = c.jobRole || c.title || '';
      const domainText = c.domain || '';
      const clusterText = c.careerCluster || '';

      const matchesSearch =
        roleText.toLowerCase().includes(searchLower) ||
        domainText.toLowerCase().includes(searchLower) ||
        clusterText.toLowerCase().includes(searchLower);

      const matchesCluster = selectedCluster === 'ALL' || c.careerCluster === selectedCluster;

      return matchesSearch && matchesCluster;
    });
  }, [search, selectedCluster]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredCareers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCareers.map(c => c.id));
    }
  };

  const handleAddSubmit = () => {
    const selectedCareers = mockCareers.filter(c => selectedIds.includes(c.id));
    const itemsToAdd: CareerCompassItem[] = selectedCareers.map(career => ({
      id: `cc-cl-${career.id}-${Date.now()}`,
      domain: career.domain || career.careerCluster || 'General Domain',
      role: career.jobRole || career.title || 'Career Specialist',
      whyItFits: career.oneLineDescription || career.aiResilienceComment || 'Selected from Career Library',
      topEmployers: Array.isArray(career.topCompaniesRecruiting)
        ? career.topCompaniesRecruiting.join(', ')
        : career.topCompaniesRecruiting || 'Top Enterprises',
      aiResilience: career.aiResilienceGrading || 'High',
      salaryIndia: career.approxSalaryRangeIndia || '₹6–15 LPA',
      salaryAbroad: career.globalSalaryRange || '$70k–120k',
      approvalStatus: 'Approved',
    }));

    onAddRoles(itemsToAdd);
    setSelectedIds([]);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Load Job Roles from Career Library (CL)"
      size="lg"
      footer={
        <FooterBar>
          <span style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 500 }}>
            {selectedIds.length} role(s) shortlisted
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={selectedIds.length === 0}
              leftIcon={<RiAddLine size={16} />}
              onClick={handleAddSubmit}
            >
              Add {selectedIds.length > 0 ? `(${selectedIds.length})` : ''} Selected Roles to Chart
            </Button>
          </div>
        </FooterBar>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <FilterHeaderRow>
          <SearchInputWrapper>
            <Input
              placeholder="Search job roles, domains, or clusters..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              leftIcon={<RiSearchLine size={16} />}
            />
          </SearchInputWrapper>
          <div style={{ width: 240 }}>
            <Select
              options={clusterOptions}
              value={selectedCluster}
              onChange={e => setSelectedCluster(e.target.value)}
            />
          </div>
          <Button variant="ghost" size="sm" onClick={handleSelectAll}>
            {selectedIds.length === filteredCareers.length && filteredCareers.length > 0
              ? 'Deselect All'
              : 'Select All Filtered'}
          </Button>
        </FilterHeaderRow>

        <RoleListContainer>
          {filteredCareers.length === 0 ? (
            <div style={{ padding: 24, textAlign: 'center', color: '#6B7280', fontSize: '0.85rem' }}>
              No matching job roles found in the Career Library. Try adjusting your search query or cluster filter.
            </div>
          ) : (
            filteredCareers.map(career => {
              const isSelected = selectedIds.includes(career.id);
              return (
                <RoleCard
                  key={career.id}
                  $selected={isSelected}
                  onClick={() => toggleSelect(career.id)}
                >
                  <div style={{ marginTop: 2 }}>
                    <Checkbox checked={isSelected} onChange={() => toggleSelect(career.id)} />
                  </div>
                  <RoleCardContent>
                    <RoleTitleRow>
                      <RoleTitle>{career.jobRole || career.title}</RoleTitle>
                      <Badge variant="primary" size="sm">
                        {career.domain || career.careerCluster}
                      </Badge>
                    </RoleTitleRow>
                    <RoleDescription>
                      {career.oneLineDescription || career.aiResilienceComment}
                    </RoleDescription>
                    <RoleMetaRow>
                      <span>Cluster: <strong>{career.careerCluster}</strong></span>
                      <span>•</span>
                      <span>Est. India: <strong>{career.approxSalaryRangeIndia}</strong></span>
                      <span>•</span>
                      <span>Top Employers: {Array.isArray(career.topCompaniesRecruiting) ? career.topCompaniesRecruiting.slice(0, 2).join(', ') : career.topCompaniesRecruiting}</span>
                    </RoleMetaRow>
                  </RoleCardContent>
                </RoleCard>
              );
            })
          )}
        </RoleListContainer>
      </div>
    </Modal>
  );
};
