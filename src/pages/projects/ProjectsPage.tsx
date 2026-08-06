import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RiAddLine,
  RiSearchLine,
  RiEyeLine,
  RiDeleteBinLine,
  RiUserLine,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Table, Column } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { AlertModal, Tooltip } from '@/components';
import { projectService } from '@/services/project.service';
import { useProjectStore } from '@/store/project.store';
import { useToast } from '@/hooks';
import { Project, ProjectStatus } from '@/types/project.types';
import { ROUTES } from '@/constants';
import {
  ProjectsContainer,
  FilterBar,
  SearchWrapper,
  ActionIconButtonGroup,
  ActionIconButton,
  ProjectNameCell,
  ProjectNameText,
  ProjectInstituteSubtext,
} from './Projects.styles';
import { AddProjectWizard } from './components/AddProjectWizard';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();

  const { searchQuery, setSearchQuery, openWizard } = useProjectStore();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['projects', searchQuery, page, limit],
    queryFn: () =>
      projectService.getAll({
        search: searchQuery,
        page,
        limit,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: projectService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project Deleted', 'Successfully removed the project.');
      setProjectToDelete(null);
    },
    onError: () => {
      toast.error('Error', 'Failed to delete the project.');
      setProjectToDelete(null);
    },
  });

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      deleteMutation.mutate(projectToDelete.id);
    }
  };

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="success" dot>
            Active
          </Badge>
        );
      case 'draft':
        return (
          <Badge variant="warning" dot>
            Draft
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="default" dot>
            Completed
          </Badge>
        );
    }
  };

  const columns: Column<Project>[] = [
    {
      key: 'actions',
      header: 'Actions',
      render: row => (
        <ActionIconButtonGroup>
          <Tooltip content="View Project">
            <ActionIconButton aria-label="View Project">
              <RiEyeLine size={16} />
            </ActionIconButton>
          </Tooltip>
          <Tooltip content="Delete Project">
            <ActionIconButton aria-label="Delete Project" onClick={() => handleDeleteClick(row)}>
              <RiDeleteBinLine size={16} />
            </ActionIconButton>
          </Tooltip>
        </ActionIconButtonGroup>
      ),
    },
    {
      key: 'name',
      header: 'Project',
      render: row => (
        <ProjectNameCell>
          <ProjectNameText>{row.name}</ProjectNameText>
          <ProjectInstituteSubtext>{row.instituteName}</ProjectInstituteSubtext>
        </ProjectNameCell>
      ),
    },
    {
      key: 'validFrom',
      header: 'Valid From',
      render: row => (row.validFrom ? dayjs(row.validFrom).format('DD MMM YYYY') : '—'),
    },
    {
      key: 'validTo',
      header: 'Valid To',
      render: row => (row.validTo ? dayjs(row.validTo).format('DD MMM YYYY') : '—'),
    },
    {
      key: 'counselors',
      header: 'Counselor Sessions',
      render: row => (
        <Button
          size="sm"
          variant="secondary"
          leftIcon={<RiUserLine size={16} />}
          onClick={() => navigate(`/projects/${row.id}/sessions`)}
        >
          {row.counselorCount} Counselors
        </Button>
      ),
    },
    {
      key: 'studentCount',
      header: 'Students',
      render: row => (
        <Button
          size="sm"
          variant="secondary"
          leftIcon={<RiUserLine size={16} />}
          onClick={() => navigate(`/projects/${row.id}/students`)}
        >
          {row.studentCount} Students
        </Button>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: row => getStatusBadge(row.status),
    },
  ];

  return (
    <ProjectsContainer>
      <PageHeader
        title="Projects"
        subtitle="Manage institution projects and counselling initiatives"
        breadcrumbs={[{ label: 'Dashboard', href: ROUTES.DASHBOARD }, { label: 'Projects' }]}
        actions={
          <Button leftIcon={<RiAddLine size={18} />} onClick={openWizard}>
            Add Project
          </Button>
        }
      />

      <Card>
        <FilterBar>
          <SearchWrapper>
            <Input
              placeholder="Search projects by name or institute..."
              leftIcon={<RiSearchLine size={18} />}
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
            />
          </SearchWrapper>
        </FilterBar>

        <Table
          columns={columns}
          data={data?.data ?? []}
          isLoading={isLoading}
          keyExtractor={row => row.id}
          emptyMessage="No projects found. Click 'Add Project' to create one."
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

      <AddProjectWizard />

      <AlertModal
        isOpen={Boolean(projectToDelete)}
        onClose={() => setProjectToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Project"
        description={`Are you sure you want to delete "${projectToDelete?.name}"? This action cannot be undone.`}
        variant="danger"
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteMutation.isPending}
      />
    </ProjectsContainer>
  );
};
