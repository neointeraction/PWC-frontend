import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RiEditLine,
  RiEyeLine,
  RiSaveLine,
  RiCheckLine,
  RiCloseLine,
  RiAddLine,
  RiFileUploadLine,
} from 'react-icons/ri';
import styled from 'styled-components';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge, BadgeVariant } from '@/components/Badge';
import { Table, Column } from '@/components/Table';
import { SearchBox } from '@/components/SearchBox';
import { Select } from '@/components/Select';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { Tooltip } from '@/components/Tooltip';
import { ActionsCell, IconButton } from '@/components/Table/Table.styles';
import { careerService } from '@/services/career.service';
import { useToast, useDebounce } from '@/hooks';
import { Career } from '@/types';
import { ROUTES, CAREER_STATUS, CAREER_CATEGORIES } from '@/constants';
import { AddCareerModal } from './AddCareerModal';
import { BulkUploadModal } from './BulkUploadModal';

const HeaderActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ReviewDetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ReviewRow = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  grid-column: ${({ $fullWidth }) => ($fullWidth ? '1 / -1' : 'span 1')};
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};

  span:first-child {
    font-size: 11px;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.primary};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  p {
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
  }
`;

const SectionHeader = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${({ theme }) => theme.spacing.xs};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primaryLight};
  padding-bottom: 4px;
`;

const TagGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: nowrap;
  white-space: nowrap;
`;

const CompanyTag = styled.span`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  white-space: nowrap;
`;

const MoreTag = styled.span`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const statusVariantMap: Record<string, BadgeVariant> = {
  active: 'success',
  inactive: 'default',
  pending: 'warning',
};

const aiResilienceVariantMap: Record<string, BadgeVariant> = {
  High: 'success',
  Medium: 'warning',
  Low: 'danger',
};

export const CareerListPage: React.FC = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [aiFilter, setAiFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editingRowData, setEditingRowData] = useState<Partial<Career>>({});

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = useQuery({
    queryKey: ['careers', page, limit, debouncedSearch, statusFilter, categoryFilter, aiFilter],
    queryFn: () =>
      careerService.getAll({
        page,
        limit,
        search: debouncedSearch || undefined,
        status: statusFilter || undefined,
        category: categoryFilter || undefined,
        aiResilience: aiFilter || undefined,
      }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'active' | 'inactive' | 'pending' }) =>
      careerService.update(id, { status }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['careers'] });
      toast.success(
        variables.status === 'active' ? 'Career Approved' : 'Career Rejected',
        `Updated career status to ${variables.status}.`
      );
      setSelectedCareer(null);
    },
  });

  const updateCareerMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Career> }) =>
      careerService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careers'] });
      toast.success('Inline Edit Saved', 'Successfully updated career specification.');
      setEditingRowId(null);
      setEditingRowData({});
    },
    onError: (err: Error) => {
      toast.error('Failed to save inline edit', err.message);
    },
  });

  const handleStartInlineEdit = (career: Career) => {
    setEditingRowId(career.id);
    setEditingRowData(career);
  };

  const handleSaveInlineEdit = (id: string) => {
    updateCareerMutation.mutate({ id, payload: editingRowData });
  };

  // Exact 18 Column Definitions with exact user titles & order
  const columns: Column<Career>[] = [
    {
      key: 'careerCluster',
      header: 'Career Cluster',
      sortable: true,
      width: '200px',
      render: row =>
        editingRowId === row.id ? (
          <Select
            options={CAREER_CATEGORIES.map(c => ({ value: c, label: c }))}
            value={editingRowData.careerCluster ?? row.careerCluster ?? row.category}
            onChange={e => setEditingRowData(prev => ({ ...prev, careerCluster: e.target.value }))}
          />
        ) : (
          <span>{row.careerCluster || row.category}</span>
        ),
    },
    {
      key: 'industry',
      header: 'Industry',
      sortable: true,
      width: '200px',
      render: row =>
        editingRowId === row.id ? (
          <Input
            value={editingRowData.industry ?? row.industry}
            onChange={e => setEditingRowData(prev => ({ ...prev, industry: e.target.value }))}
          />
        ) : (
          <span>{row.industry || 'Information Technology'}</span>
        ),
    },
    {
      key: 'domain',
      header: 'Domain',
      sortable: true,
      width: '220px',
      render: row =>
        editingRowId === row.id ? (
          <Input
            value={editingRowData.domain ?? row.domain}
            onChange={e => setEditingRowData(prev => ({ ...prev, domain: e.target.value }))}
          />
        ) : (
          <span>{row.domain || 'Software Engineering'}</span>
        ),
    },
    {
      key: 'jobRole',
      header: 'Job Role',
      sortable: true,
      sticky: 'left',
      stickyOffset: '0px',
      width: '260px',
      render: row =>
        editingRowId === row.id ? (
          <Input
            value={editingRowData.jobRole ?? row.jobRole ?? row.title}
            onChange={e => setEditingRowData(prev => ({ ...prev, jobRole: e.target.value }))}
          />
        ) : (
          <span style={{ fontWeight: 700, color: '#1e3a8a' }}>{row.jobRole || row.title}</span>
        ),
    },
    {
      key: 'aiResilienceGrading',
      header: 'AI Resilience Grading',
      sortable: true,
      width: '180px',
      render: row =>
        editingRowId === row.id ? (
          <Select
            options={[
              { value: 'High', label: 'High' },
              { value: 'Medium', label: 'Medium' },
              { value: 'Low', label: 'Low' },
            ]}
            value={editingRowData.aiResilienceGrading ?? row.aiResilienceGrading ?? 'High'}
            onChange={e =>
              setEditingRowData(prev => ({
                ...prev,
                aiResilienceGrading: e.target.value as 'High' | 'Medium' | 'Low',
              }))
            }
          />
        ) : (
          <Badge variant={aiResilienceVariantMap[row.aiResilienceGrading] || 'info'}>
            {row.aiResilienceGrading || 'High'}
          </Badge>
        ),
    },
    {
      key: 'aiResilienceComment',
      header: 'AI Resilience Comment',
      width: '320px',
      render: row =>
        editingRowId === row.id ? (
          <Input
            value={editingRowData.aiResilienceComment ?? row.aiResilienceComment}
            onChange={e => setEditingRowData(prev => ({ ...prev, aiResilienceComment: e.target.value }))}
          />
        ) : (
          <span style={{ fontSize: '13px', color: '#475569' }}>
            {row.aiResilienceComment || 'Architectural reasoning & human ethics validation.'}
          </span>
        ),
    },
    {
      key: 'oneLineDescription',
      header: 'One-line Description',
      width: '320px',
      render: row =>
        editingRowId === row.id ? (
          <Input
            value={editingRowData.oneLineDescription ?? row.oneLineDescription ?? row.description}
            onChange={e => setEditingRowData(prev => ({ ...prev, oneLineDescription: e.target.value }))}
          />
        ) : (
          <span style={{ fontSize: '13px' }}>
            {row.oneLineDescription || row.description || 'Design and deploy scalable intelligent platforms.'}
          </span>
        ),
    },
    {
      key: 'topCompaniesRecruiting',
      header: 'Top Companies Recruiting',
      width: '260px',
      render: row => {
        const companies = Array.isArray(row.topCompaniesRecruiting)
          ? row.topCompaniesRecruiting
          : typeof row.topCompaniesRecruiting === 'string' && row.topCompaniesRecruiting
          ? (row.topCompaniesRecruiting as string).split(',').map(s => s.trim()).filter(Boolean)
          : ['Google', 'Microsoft'];

        const visibleCompanies = companies.slice(0, 2);
        const remainingCount = companies.length - 2;
        const allCompaniesText = companies.join(', ');

        return (
          <Tooltip content={`Top Companies: ${allCompaniesText}`}>
            <TagGroup>
              {visibleCompanies.map((comp, i) => (
                <CompanyTag key={i}>{comp}</CompanyTag>
              ))}
              {remainingCount > 0 && <MoreTag>+{remainingCount}</MoreTag>}
            </TagGroup>
          </Tooltip>
        );
      },
    },
    {
      key: 'approxSalaryRangeIndia',
      header: 'Approx Salary Range (India)',
      sortable: true,
      width: '220px',
      render: row =>
        editingRowId === row.id ? (
          <Input
            value={editingRowData.approxSalaryRangeIndia ?? row.approxSalaryRangeIndia}
            onChange={e => setEditingRowData(prev => ({ ...prev, approxSalaryRangeIndia: e.target.value }))}
          />
        ) : (
          <span>{row.approxSalaryRangeIndia || '₹12,00,000 - ₹38,00,000 / yr'}</span>
        ),
    },
    {
      key: 'globalSalaryRange',
      header: 'Global Salary Range',
      sortable: true,
      width: '200px',
      render: row =>
        editingRowId === row.id ? (
          <Input
            value={editingRowData.globalSalaryRange ?? row.globalSalaryRange}
            onChange={e => setEditingRowData(prev => ({ ...prev, globalSalaryRange: e.target.value }))}
          />
        ) : (
          <span>{row.globalSalaryRange || '$115,000 - $190,000 / yr'}</span>
        ),
    },
    {
      key: 'minQual10th12thRecommendedSubjects',
      header: 'Minimum Qualification (10th/12th) + Recommended Subjects',
      width: '320px',
      render: row => <span>{row.minQual10th12thRecommendedSubjects || '12th Science Stream (PCM)'}</span>,
    },
    {
      key: 'minQualGradRecommendedSubjects',
      header: 'Minimum Qualification (Grad) + Recommended Subjects',
      width: '320px',
      render: row => <span>{row.minQualGradRecommendedSubjects || 'B.Tech / B.E. Computer Science'}</span>,
    },
    {
      key: 'entranceExamsUG',
      header: 'Entrance Exams (UG Level)',
      width: '220px',
      render: row => <span>{row.entranceExamsUG || 'JEE Main, BITSAT'}</span>,
    },
    {
      key: 'minQualPGRecommendedSubjects',
      header: 'Minimum Qualification (PG) + Recommended Subjects',
      width: '320px',
      render: row => <span>{row.minQualPGRecommendedSubjects || 'M.Tech / M.S. Data Science'}</span>,
    },
    {
      key: 'entranceExamsPG',
      header: 'Entrance Exams (PG Level)',
      width: '220px',
      render: row => <span>{row.entranceExamsPG || 'GATE, GRE'}</span>,
    },
    {
      key: 'certificationsStudents',
      header: 'Certifications - Students',
      width: '260px',
      render: row => <span>{row.certificationsStudents || 'Python Basics'}</span>,
    },
    {
      key: 'certificationsUG',
      header: 'Certifications - UG',
      width: '260px',
      render: row => <span>{row.certificationsUG || 'AWS Machine Learning Specialty'}</span>,
    },
    {
      key: 'topCoursesToStudy',
      header: 'Top Courses to Study (UG + PG + Certifications)',
      width: '340px',
      render: row => <span>{row.topCoursesToStudy || 'B.Tech AI & Data Science'}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      width: '140px',
      render: row => (
        <Badge variant={statusVariantMap[row.status] || 'default'} dot>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '120px',
      render: row => (
        <ActionsCell>
          {editingRowId === row.id ? (
            <Tooltip content="Save Inline Edit">
              <IconButton aria-label="Save Inline Edit" onClick={() => handleSaveInlineEdit(row.id)}>
                <RiSaveLine size={18} style={{ color: '#2563eb' }} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip content="Edit Career Profile">
              <IconButton aria-label="Edit Career Profile" onClick={() => handleStartInlineEdit(row)}>
                <RiEditLine size={18} />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip content="View Career Details">
            <IconButton aria-label="View Career Details" onClick={() => setSelectedCareer(row)}>
              <RiEyeLine size={18} />
            </IconButton>
          </Tooltip>

          {row.status === 'pending' && (
            <>
              <Tooltip content="Approve Career">
                <IconButton aria-label="Approve Career" onClick={() => updateStatusMutation.mutate({ id: row.id, status: 'active' })}>
                  <RiCheckLine size={18} style={{ color: '#16a34a' }} />
                </IconButton>
              </Tooltip>
              <Tooltip content="Reject Career">
                <IconButton aria-label="Reject Career" onClick={() => updateStatusMutation.mutate({ id: row.id, status: 'inactive' })}>
                  <RiCloseLine size={18} style={{ color: '#dc2626' }} />
                </IconButton>
              </Tooltip>
            </>
          )}
        </ActionsCell>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Career Library"
        subtitle="Manage career specifications, recruitment companies, qualifications, entrance exams, and AI resilience ratings"
        breadcrumbs={[{ label: 'Dashboard', href: ROUTES.DASHBOARD }, { label: 'Career Library' }]}
        actions={
          <HeaderActionsGroup>
            <Button
              variant="secondary"
              leftIcon={<RiFileUploadLine size={18} />}
              onClick={() => setIsBulkModalOpen(true)}
            >
              Bulk Import (CSV / XLSX)
            </Button>
            <Button
              variant="primary"
              leftIcon={<RiAddLine size={18} />}
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Career Profile
            </Button>
          </HeaderActionsGroup>
        }
      />

      <Card>
        <Toolbar>
          <SearchBox
            value={search}
            onChange={val => {
              setSearch(val);
              setPage(1);
            }}
            placeholder="Search job role, domain, cluster, or industry..."
          />
          <Select
            options={[{ value: '', label: 'All Clusters' }, ...CAREER_CATEGORIES.map(c => ({ value: c, label: c }))]}
            value={categoryFilter}
            onChange={e => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            fullWidth={false}
            style={{ width: '170px' }}
          />
          <Select
            options={[
              { value: '', label: 'All AI Resilience' },
              { value: 'High', label: 'AI Resilience: High' },
              { value: 'Medium', label: 'AI Resilience: Medium' },
              { value: 'Low', label: 'AI Resilience: Low' },
            ]}
            value={aiFilter}
            onChange={e => {
              setAiFilter(e.target.value);
              setPage(1);
            }}
            fullWidth={false}
            style={{ width: '180px' }}
          />
          <Select
            options={[{ value: '', label: 'All Statuses' }, ...CAREER_STATUS]}
            value={statusFilter}
            onChange={e => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            fullWidth={false}
            style={{ width: '150px' }}
          />
        </Toolbar>

        <Table
          columns={columns}
          data={data?.data ?? []}
          isLoading={isLoading}
          keyExtractor={row => row.id}
          emptyMessage="No career profiles found."
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

      {/* Career Detail Modal */}
      {selectedCareer && (
        <Modal
          isOpen={!!selectedCareer}
          onClose={() => setSelectedCareer(null)}
          title={`Career Profile: ${selectedCareer.jobRole || selectedCareer.title}`}
          subtitle="Comprehensive career specification details"
          size="lg"
        >
          <ReviewDetailSection>
            {/* Section 1: Overview & Categorization */}
            <SectionHeader>1. Categorization &amp; Identity</SectionHeader>
            <DetailGrid>
              <ReviewRow>
                <span>1. Career Cluster</span>
                <p>{selectedCareer.careerCluster || selectedCareer.category}</p>
              </ReviewRow>

              <ReviewRow>
                <span>2. Industry Sector</span>
                <p>{selectedCareer.industry}</p>
              </ReviewRow>

              <ReviewRow>
                <span>3. Specialization Domain</span>
                <p>{selectedCareer.domain}</p>
              </ReviewRow>

              <ReviewRow>
                <span>4. Job Role (Primary Key)</span>
                <p style={{ fontWeight: 700 }}>{selectedCareer.jobRole || selectedCareer.title}</p>
              </ReviewRow>

              <ReviewRow $fullWidth>
                <span>7. One-Line Description</span>
                <p>{selectedCareer.oneLineDescription || selectedCareer.description}</p>
              </ReviewRow>
            </DetailGrid>

            {/* Section 2: AI Resilience */}
            <SectionHeader>2. AI Resilience Assessment</SectionHeader>
            <DetailGrid>
              <ReviewRow>
                <span>5. AI Resilience Grading</span>
                <div style={{ marginTop: '4px' }}>
                  <Badge variant={aiResilienceVariantMap[selectedCareer.aiResilienceGrading] || 'info'}>
                    {selectedCareer.aiResilienceGrading || 'High'}
                  </Badge>
                </div>
              </ReviewRow>

              <ReviewRow>
                <span>9. Approx Salary Range (India)</span>
                <p>{selectedCareer.approxSalaryRangeIndia}</p>
              </ReviewRow>

              <ReviewRow>
                <span>10. Global Salary Range</span>
                <p>{selectedCareer.globalSalaryRange}</p>
              </ReviewRow>

              <ReviewRow $fullWidth>
                <span>6. AI Resilience Comment</span>
                <p>{selectedCareer.aiResilienceComment}</p>
              </ReviewRow>
            </DetailGrid>

            {/* Section 3: Recruitment & Employers */}
            <SectionHeader>3. Top Employers &amp; Recruitment</SectionHeader>
            <DetailGrid>
              <ReviewRow $fullWidth>
                <span>8. Top Companies Recruiting</span>
                <TagGroup>
                  {Array.isArray(selectedCareer.topCompaniesRecruiting) && selectedCareer.topCompaniesRecruiting.length > 0 ? (
                    selectedCareer.topCompaniesRecruiting.map((comp, i) => (
                      <CompanyTag key={i}>{comp}</CompanyTag>
                    ))
                  ) : (
                    <p>Google, Microsoft, IBM, Infosys</p>
                  )}
                </TagGroup>
              </ReviewRow>
            </DetailGrid>

            {/* Section 4: Academic Prerequisites */}
            <SectionHeader>4. Academic Prerequisites &amp; Qualifications</SectionHeader>
            <DetailGrid>
              <ReviewRow $fullWidth>
                <span>11. Minimum Qualification (10th/12th) + Recommended Subjects</span>
                <p>{selectedCareer.minQual10th12thRecommendedSubjects}</p>
              </ReviewRow>

              <ReviewRow $fullWidth>
                <span>12. Minimum Qualification (Grad) + Recommended Subjects</span>
                <p>{selectedCareer.minQualGradRecommendedSubjects}</p>
              </ReviewRow>

              <ReviewRow>
                <span>13. Entrance Exams (UG Level)</span>
                <p>{selectedCareer.entranceExamsUG}</p>
              </ReviewRow>

              <ReviewRow>
                <span>15. Entrance Exams (PG Level)</span>
                <p>{selectedCareer.entranceExamsPG}</p>
              </ReviewRow>

              <ReviewRow $fullWidth>
                <span>14. Minimum Qualification (PG) + Recommended Subjects</span>
                <p>{selectedCareer.minQualPGRecommendedSubjects}</p>
              </ReviewRow>
            </DetailGrid>

            {/* Section 5: Certifications & Recommended Courses */}
            <SectionHeader>5. Certifications &amp; Courses</SectionHeader>
            <DetailGrid>
              <ReviewRow $fullWidth>
                <span>16. Certifications - Students</span>
                <p>{selectedCareer.certificationsStudents}</p>
              </ReviewRow>

              <ReviewRow $fullWidth>
                <span>17. Certifications - UG</span>
                <p>{selectedCareer.certificationsUG}</p>
              </ReviewRow>

              <ReviewRow $fullWidth>
                <span>18. Top Courses to Study (UG + PG + Certifications)</span>
                <p>{selectedCareer.topCoursesToStudy}</p>
              </ReviewRow>
            </DetailGrid>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
              <Button variant="secondary" onClick={() => setSelectedCareer(null)}>
                Close
              </Button>
              {selectedCareer.status === 'pending' && (
                <>
                  <Button
                    variant="secondary"
                    leftIcon={<RiCloseLine size={16} />}
                    onClick={() => updateStatusMutation.mutate({ id: selectedCareer.id, status: 'inactive' })}
                  >
                    Reject Profile
                  </Button>
                  <Button
                    variant="primary"
                    leftIcon={<RiCheckLine size={16} />}
                    onClick={() => updateStatusMutation.mutate({ id: selectedCareer.id, status: 'active' })}
                  >
                    Approve Profile
                  </Button>
                </>
              )}
            </div>
          </ReviewDetailSection>
        </Modal>
      )}

      <AddCareerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <BulkUploadModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
      />
    </div>
  );
};
