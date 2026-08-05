import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/Button';
import { AlertModal } from '@/components';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { CareerCluster, CareerIndustry, CareerDomain, Career } from '@/types';
import { careerService } from '@/services/career.service';
import { BreadcrumbHeader, BreadcrumbStep } from '../components/BreadcrumbHeader';
import { ClustersView } from '../views/ClustersView';
import { IndustriesView } from '../views/IndustriesView';
import { DomainsView } from '../views/DomainsView';
import { JobRolesView } from '../views/JobRolesView';
import { JobRoleDetailView } from '../views/JobRoleDetailView';
import { AddEditModal, AddEditFormData } from '../modals/AddEditModal';
import { BulkUploadModal } from './BulkUploadModal';
import { RiAddLine, RiUploadCloudLine } from 'react-icons/ri';

const Container = styled.div`
  display: flex;
  flex-direction: column;
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

  const [level, setLevel] = useState<LevelType>('clusters');
  const [selectedCluster, setSelectedCluster] = useState<CareerCluster | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<CareerIndustry | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<CareerDomain | null>(null);
  const [selectedRole, setSelectedRole] = useState<Career | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{
    type: 'cluster' | 'industry' | 'domain' | 'role';
    item?: any;
  } | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'cluster' | 'industry' | 'domain' | 'role';
    id: string;
    name: string;
  } | null>(null);

  // Queries
  const { data: clusters = [] } = useQuery({
    queryKey: ['clusters', searchQuery],
    queryFn: () => careerService.getClusters(searchQuery),
  });

  const { data: industries = [] } = useQuery({
    queryKey: ['industries', selectedCluster?.name, searchQuery],
    queryFn: () => careerService.getIndustries(selectedCluster?.name, searchQuery),
    enabled: true,
  });

  const { data: domains = [] } = useQuery({
    queryKey: ['domains', selectedIndustry?.name, searchQuery],
    queryFn: () => careerService.getDomains(selectedIndustry?.name, searchQuery),
    enabled: true,
  });

  const { data: roles = [] } = useQuery({
    queryKey: ['jobRoles', selectedDomain?.name, searchQuery],
    queryFn: () => careerService.getJobRoles(selectedDomain?.name, searchQuery),
    enabled: true,
  });

  const { data: entranceExams = [] } = useQuery({
    queryKey: ['entranceExams'],
    queryFn: careerService.getEntranceExams,
  });

  const { data: courses = [] } = useQuery({
    queryKey: ['courses'],
    queryFn: careerService.getCourses,
  });

  const { data: institutions = [] } = useQuery({
    queryKey: ['institutions'],
    queryFn: careerService.getInstitutions,
  });

  // Mutations
  const createClusterMutation = useMutation({
    mutationFn: careerService.createCluster,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clusters'] });
      toast.success('Cluster Added', 'New career cluster created successfully.');
    },
  });

  const updateClusterMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      careerService.updateCluster(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clusters'] });
      toast.success('Cluster Updated', 'Cluster updated successfully.');
    },
  });

  const deleteClusterMutation = useMutation({
    mutationFn: careerService.deleteCluster,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clusters'] });
      toast.success('Cluster Deleted', 'Cluster removed successfully.');
    },
  });

  const createIndustryMutation = useMutation({
    mutationFn: careerService.createIndustry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['industries'] });
      toast.success('Industry Added', 'New industry created successfully.');
    },
  });

  const updateIndustryMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      careerService.updateIndustry(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['industries'] });
      toast.success('Industry Updated', 'Industry updated successfully.');
    },
  });

  const deleteIndustryMutation = useMutation({
    mutationFn: careerService.deleteIndustry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['industries'] });
      toast.success('Industry Deleted', 'Industry removed successfully.');
    },
  });

  const createDomainMutation = useMutation({
    mutationFn: careerService.createDomain,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['domains'] });
      toast.success('Domain Added', 'New domain created successfully.');
    },
  });

  const updateDomainMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      careerService.updateDomain(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['domains'] });
      toast.success('Domain Updated', 'Domain updated successfully.');
    },
  });

  const deleteDomainMutation = useMutation({
    mutationFn: careerService.deleteDomain,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['domains'] });
      toast.success('Domain Deleted', 'Domain removed successfully.');
    },
  });

  const createRoleMutation = useMutation({
    mutationFn: careerService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobRoles'] });
      toast.success('Job Role Added', 'New job role created successfully.');
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      careerService.update(id, payload),
    onSuccess: updatedRole => {
      queryClient.invalidateQueries({ queryKey: ['jobRoles'] });
      if (selectedRole && selectedRole.id === updatedRole.id) {
        setSelectedRole(updatedRole);
      }
      toast.success('Job Role Updated', 'Job role specification updated successfully.');
    },
  });

  const deleteRoleMutation = useMutation({
    mutationFn: careerService.deleteJobRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobRoles'] });
      if (level === 'detail') {
        setLevel('roles');
      }
      toast.success('Job Role Deleted', 'Job role removed successfully.');
    },
  });

  const toggleShortlistMutation = useMutation({
    mutationFn: careerService.toggleShortlist,
    onSuccess: updatedRole => {
      queryClient.invalidateQueries({ queryKey: ['jobRoles'] });
      if (selectedRole && selectedRole.id === updatedRole.id) {
        setSelectedRole(updatedRole);
      }
      toast.info(
        updatedRole.isShortlisted ? 'Saved to Shortlist' : 'Removed from Shortlist',
        `Role "${updatedRole.jobRole}" shortlist status updated.`
      );
    },
  });

  const toggleExamShortlistMutation = useMutation({
    mutationFn: careerService.toggleExamShortlist,
    onSuccess: updatedExam => {
      queryClient.invalidateQueries({ queryKey: ['entranceExams'] });
      toast.info(
        updatedExam.isShortlisted ? 'Exam Shortlisted' : 'Exam Removed',
        `Exam "${updatedExam.name}" shortlist status updated.`
      );
    },
  });

  const toggleInstShortlistMutation = useMutation({
    mutationFn: careerService.toggleInstitutionShortlist,
    onSuccess: updatedInst => {
      queryClient.invalidateQueries({ queryKey: ['institutions'] });
      toast.info(
        updatedInst.isShortlisted ? 'Institution Shortlisted' : 'Institution Removed',
        `Institution "${updatedInst.name}" shortlist status updated.`
      );
    },
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
      const clusterName = selectedCluster?.name || 'Arts, Design & Creative';
      steps.push({
        label: clusterName,
        onClick: () => {
          setLevel('industries');
          setSelectedIndustry(null);
          setSelectedDomain(null);
          setSelectedRole(null);
        },
      });
    }

    if (selectedIndustry || level === 'domains' || level === 'roles' || level === 'detail') {
      const indName = selectedIndustry?.name || 'Applied Arts';
      steps.push({
        label: indName,
        onClick: () => {
          setLevel('domains');
          setSelectedDomain(null);
          setSelectedRole(null);
        },
      });
    }

    if (selectedDomain || level === 'roles' || level === 'detail') {
      const domName = selectedDomain?.name || 'Digital Arts';
      steps.push({
        label: domName,
        onClick: () => {
          setLevel('roles');
          setSelectedRole(null);
        },
      });
    }

    if (selectedRole || level === 'detail') {
      const roleTitle = selectedRole?.jobRole || 'Applied UI Designer';
      steps.push({
        label: roleTitle,
      });
    }

    return steps;
  };

  // Dynamic Header Titles & Add Labels
  const getHeaderTitle = () => {
    if (level === 'clusters') return 'Choose a Career Cluster';
    if (level === 'industries') return 'Choose an Industry within the Career Cluster';
    if (level === 'domains') return 'Choose a Domain within the Industry';
    if (level === 'roles') return 'Choose a Job Role within the Domain';
    return selectedRole?.jobRole || 'Applied UI Designer';
  };

  const getHeaderSubtitle = () => {
    if (level === 'clusters')
      return 'Select a career cluster to explore industries and specialization tracks';
    if (level === 'industries')
      return `Industries under ${selectedCluster?.name || 'Arts, Design & Creative'}`;
    if (level === 'domains') return `Domains under ${selectedIndustry?.name || 'Applied Arts'}`;
    if (level === 'roles') return `Job roles under ${selectedDomain?.name || 'Digital Arts'}`;
    return selectedRole?.oneLineDescription || 'Role profile & career pathway details';
  };

  const getAddLabel = () => {
    if (level === 'clusters') return 'Add Cluster';
    if (level === 'industries') return 'Add Industry';
    if (level === 'domains') return 'Add Domain';
    if (level === 'roles') return 'Add Job Role';
    return undefined;
  };

  // Handlers
  const handleOpenAddModal = () => {
    if (level === 'clusters') setEditingItem({ type: 'cluster' });
    else if (level === 'industries') setEditingItem({ type: 'industry' });
    else if (level === 'domains') setEditingItem({ type: 'domain' });
    else setEditingItem({ type: 'role' });
    setIsAddEditOpen(true);
  };

  const handleOpenEditModal = (type: 'cluster' | 'industry' | 'domain' | 'role', item: any) => {
    setEditingItem({ type, item });
    setIsAddEditOpen(true);
  };

  const handleFormSubmit = (data: AddEditFormData) => {
    if (!editingItem) return;

    if (editingItem.type === 'cluster') {
      if (editingItem.item) {
        updateClusterMutation.mutate({
          id: editingItem.item.id,
          payload: { name: data.name, description: data.description },
        });
      } else {
        createClusterMutation.mutate({ name: data.name, description: data.description });
      }
    } else if (editingItem.type === 'industry') {
      if (editingItem.item) {
        updateIndustryMutation.mutate({
          id: editingItem.item.id,
          payload: { name: data.name, description: data.description },
        });
      } else {
        createIndustryMutation.mutate({
          clusterName: selectedCluster?.name || 'Arts, Design & Creative',
          name: data.name,
          description: data.description,
        });
      }
    } else if (editingItem.type === 'domain') {
      if (editingItem.item) {
        updateDomainMutation.mutate({
          id: editingItem.item.id,
          payload: { name: data.name, description: data.description },
        });
      } else {
        createDomainMutation.mutate({
          clusterName: selectedCluster?.name || 'Arts, Design & Creative',
          industryName: selectedIndustry?.name || 'Applied Arts',
          name: data.name,
          description: data.description,
        });
      }
    } else if (editingItem.type === 'role') {
      if (editingItem.item) {
        updateRoleMutation.mutate({
          id: editingItem.item.id,
          payload: {
            jobRole: data.name,
            title: data.name,
            oneLineDescription: data.description || 'Job role specification.',
            aiResilienceGrading: data.aiResilience || 'High',
            approxSalaryRangeIndia: data.salaryIndia || '₹4–15 LPA',
            globalSalaryRange: data.salaryGlobal || '$70k–$120k',
            topCompaniesRecruiting: data.topRecruiters
              ? data.topRecruiters.split(',')
              : ['Tech Firms'],
          },
        });
      } else {
        createRoleMutation.mutate({
          jobRole: data.name,
          title: data.name,
          careerCluster: selectedCluster?.name || 'Arts, Design & Creative',
          industry: selectedIndustry?.name || 'Applied Arts',
          domain: selectedDomain?.name || 'Digital Arts',
          oneLineDescription: data.description || 'Job role specification.',
          aiResilienceGrading: data.aiResilience || 'High',
          approxSalaryRangeIndia: data.salaryIndia || '₹4–15 LPA',
          globalSalaryRange: data.salaryGlobal || '$70k–$120k',
          topCompaniesRecruiting: data.topRecruiters
            ? data.topRecruiters.split(',')
            : ['Tech Firms'],
        });
      }
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'cluster') deleteClusterMutation.mutate(deleteTarget.id);
    else if (deleteTarget.type === 'industry') deleteIndustryMutation.mutate(deleteTarget.id);
    else if (deleteTarget.type === 'domain') deleteDomainMutation.mutate(deleteTarget.id);
    else if (deleteTarget.type === 'role') deleteRoleMutation.mutate(deleteTarget.id);
    setDeleteTarget(null);
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

  const addLabel = getAddLabel();

  return (
    <Container>
      <PageHeader
        title={getHeaderTitle()}
        subtitle={getHeaderSubtitle()}
        breadcrumbs={[{ label: 'Dashboard', href: ROUTES.DASHBOARD }, { label: 'Career Library' }]}
        onBack={level !== 'clusters' ? handleBack : undefined}
        actions={
          level !== 'detail' ? (
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
          ) : undefined
        }
      />

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
            onEditCluster={cluster => handleOpenEditModal('cluster', cluster)}
            onDeleteCluster={cluster =>
              setDeleteTarget({ type: 'cluster', id: cluster.id, name: cluster.name })
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
            onEditIndustry={ind => handleOpenEditModal('industry', ind)}
            onDeleteIndustry={ind =>
              setDeleteTarget({ type: 'industry', id: ind.id, name: ind.name })
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
            onEditDomain={dom => handleOpenEditModal('domain', dom)}
            onDeleteDomain={dom => setDeleteTarget({ type: 'domain', id: dom.id, name: dom.name })}
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
            onEditRole={role => handleOpenEditModal('role', role)}
            onDeleteRole={role =>
              setDeleteTarget({ type: 'role', id: role.id, name: role.jobRole })
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
            onEditRole={role => handleOpenEditModal('role', role)}
          />
        )}
      </ContentCard>

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
