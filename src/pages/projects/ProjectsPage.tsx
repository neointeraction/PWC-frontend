import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RiAddLine,
  RiSearchLine,
  RiEditLine,
  RiDeleteBinLine,
  RiUserLine,
  RiDownloadLine,
  RiRefreshLine,
  RiFlag2Fill,
} from 'react-icons/ri';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Table, Column } from '@/components/Table';
import { Badge } from '@/components/Badge';
import { AlertModal, Tooltip } from '@/components';
import { projectService } from '@/services/project.service';
import { useProjectStore } from '@/store/project.store';
import { useAuthStore } from '@/store';
import { useToast } from '@/hooks';
import { Project, ProjectStatus } from '@/types/project.types';
import {
  ProjectsContainer,
  StatsGrid,
  InteractiveStatCardWrapper,
  StatMetricValue,
  MetaText,
  FilterBar,
  SearchWrapper,
  ActionIconButtonGroup,
  ActionIconButton,
  ProjectNameCell,
  ProjectTitleRow,
  ProjectNameLink,
  ProjectInstituteSubtext,
} from './Projects.styles';
import { AddProjectWizard } from './components/AddProjectWizard';
import { EditProjectModal } from './components/EditProjectModal';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { user } = useAuthStore();
  const isViewOnlyUser = Boolean(user?.isViewOnly);

  const { searchQuery, setSearchQuery, openWizard } = useProjectStore();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const handleDownloadProjectReport = (project: Project) => {
    const csvContent =
      `Project Summary Report\n` +
      `Project Name,${project.name}\n` +
      `Institute,${project.instituteName}\n` +
      `Location,${project.location || 'N/A'}\n` +
      `Status,${project.status.toUpperCase()}\n` +
      `Valid From,${project.validFrom || 'N/A'}\n` +
      `Valid To,${project.validTo || 'N/A'}\n` +
      `Counselors Assigned,${project.counselorCount}\n` +
      `Total Students Enrolled,${project.studentCount}\n\n` +
      `Student ID,Student Name,Grade,Counselor Assigned,Session 1 Status,Session 2 Status,kREATE Compass Report Status\n` +
      `STU-101,Aarav Sharma,Grade 11,Sarah Jenkins,Completed,Completed,Unlocked & Delivered\n` +
      `STU-102,Ananya Patel,Grade 11,Rahul Verma,Completed,Completed,Unlocked & Delivered\n` +
      `STU-103,Rohan Gupta,Grade 12,Sarah Jenkins,Completed,Completed,Unlocked & Delivered\n` +
      `STU-104,Diya Nair,Grade 11,Priya Sundaram,Completed,Completed,Unlocked & Delivered\n` +
      `STU-105,Vihaan Iyer,Grade 12,Rahul Verma,Completed,Completed,Unlocked & Delivered\n`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${project.name.replace(/\s+/g, '_')}_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Report Downloaded', `Exported project report CSV for ${project.name}.`);
  };

  const { data, isLoading } = useQuery({
    queryKey: ['projects', searchQuery, statusFilter, page, limit],
    queryFn: () =>
      projectService.getAll({
        search: searchQuery,
        status: statusFilter === 'all' ? undefined : (statusFilter as ProjectStatus),
        page,
        limit,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: projectService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project Deleted', 'Successfully removed project record.');
      setProjectToDelete(null);
    },
    onError: () => {
      toast.error('Error', 'Failed to delete project record.');
      setProjectToDelete(null);
    },
  });

  const restoreMutation = useMutation({
    mutationFn: (id: string) => projectService.update(id, { status: 'active' }),
    onSuccess: updated => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project Restored', `Restored ${updated.name} to active status.`);
    },
    onError: () => {
      toast.error('Error', 'Failed to restore project.');
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
          <Badge variant="info" dot>
            Completed
          </Badge>
        );
      case 'deleted':
        return (
          <Badge variant="danger" dot>
            Deleted
          </Badge>
        );
    }
  };

  const columns: Column<Project>[] = [
    {
      key: 'name',
      header: 'Project',
      render: row => (
        <ProjectNameCell>
          <ProjectTitleRow>
            <ProjectNameLink
              type="button"
              onClick={() => navigate(`/projects/dashboard/${row.id}`)}
            >
              {row.name}
            </ProjectNameLink>
            {row.hasRedFlag && (
              <Tooltip content="Contains overdue follow-up stages (> 2 days)">
                <RiFlag2Fill size={15} style={{ color: '#EF4444', flexShrink: 0 }} />
              </Tooltip>
            )}
          </ProjectTitleRow>
          <ProjectInstituteSubtext>{row.instituteName}</ProjectInstituteSubtext>
        </ProjectNameCell>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      render: row => row.location || '—',
    },
    {
      key: 'validFrom',
      header: 'Valid From',
      render: row => (row.validFrom ? dayjs(row.validFrom).format('DD MMM YYYY') : '—'),
    },
    {
      key: 'validTo',
      header: 'Valid To',
      render: row => {
        if (!row.validTo) return '—';
        const formattedDate = dayjs(row.validTo).format('DD MMM YYYY');
        if (row.status === 'active') {
          const daysLeft = Math.ceil(dayjs(row.validTo).diff(dayjs(), 'day', true));
          if (daysLeft >= 0 && daysLeft <= 15) {
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
                <span>{formattedDate}</span>
                <Tooltip content={`Project validity ends in ${daysLeft} days. Click edit/extend.`}>
                  <span>
                    <Badge variant="warning" size="sm">
                      {daysLeft === 0 ? 'Expires Today' : `${daysLeft} days left`}
                    </Badge>
                  </span>
                </Tooltip>
              </div>
            );
          }
        }
        return formattedDate;
      },
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
    {
      key: 'actions',
      header: 'Actions',
      render: (row: Project) => (
        <ActionIconButtonGroup>
          {isViewOnlyUser ? (
            <Tooltip content="Download Project Report">
              <ActionIconButton
                aria-label="Download Project Report"
                onClick={() => handleDownloadProjectReport(row)}
              >
                <RiDownloadLine size={16} />
              </ActionIconButton>
            </Tooltip>
          ) : row.status === 'deleted' ? (
            <Tooltip content="Revert / Restore Project">
              <ActionIconButton
                aria-label="Revert / Restore Project"
                onClick={() => restoreMutation.mutate(row.id)}
              >
                <RiRefreshLine size={16} />
              </ActionIconButton>
            </Tooltip>
          ) : (
            <>
              <Tooltip content="Edit Project">
                <ActionIconButton aria-label="Edit Project" onClick={() => setProjectToEdit(row)}>
                  <RiEditLine size={16} />
                </ActionIconButton>
              </Tooltip>
              <Tooltip content="Download Project Report">
                <ActionIconButton
                  aria-label="Download Project Report"
                  onClick={() => handleDownloadProjectReport(row)}
                >
                  <RiDownloadLine size={16} />
                </ActionIconButton>
              </Tooltip>
              <Tooltip content="Delete Project">
                <ActionIconButton aria-label="Delete Project" onClick={() => handleDeleteClick(row)}>
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
    <ProjectsContainer>
      <PageHeader
        title="Projects"
        subtitle="Manage institution projects and counselling initiatives"
        breadcrumbs={[{ label: 'Projects' }]}
      />

      <StatsGrid>
        <Card title="Total Projects">
          <StatMetricValue>{data?.total ?? 7}</StatMetricValue>
          <MetaText>Active &amp; registered projects</MetaText>
        </Card>

        <Card title="Live">
          <StatMetricValue $variant="success">14</StatMetricValue>
          <MetaText>Currently ongoing batches</MetaText>
        </Card>

        <InteractiveStatCardWrapper
          $active={statusFilter === 'to_extend'}
          onClick={() => {
            setStatusFilter(prev => (prev === 'to_extend' ? 'all' : 'to_extend'));
            setPage(1);
          }}
        >
          <Card title="To Extend">
            <StatMetricValue $variant="warning">1</StatMetricValue>
            <MetaText>Expiring within 15 days</MetaText>
          </Card>
        </InteractiveStatCardWrapper>

        <Card title="Completed">
          <StatMetricValue>2</StatMetricValue>
          <MetaText>Finished project batches</MetaText>
        </Card>
      </StatsGrid>

      <Card>
        <FilterBar>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, flexWrap: 'wrap' }}>
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
            <div style={{ width: '220px' }}>
              <Select
                options={[
                  { value: 'all', label: 'All Projects' },
                  { value: 'active', label: 'Active' },
                  { value: 'to_extend', label: 'To Extend (≤ 15 days)' },
                  { value: 'draft', label: 'Draft' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'deleted', label: 'Deleted Projects' },
                ]}
                value={statusFilter}
                onChange={e => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>
          {!isViewOnlyUser && (
            <Button leftIcon={<RiAddLine size={18} />} onClick={openWizard}>
              Add Project
            </Button>
          )}
        </FilterBar>

        <Table
          columns={columns}
          data={data?.data ?? []}
          isLoading={isLoading}
          keyExtractor={row => row.id}
          emptyMessage={
            statusFilter === 'deleted'
              ? 'No deleted projects found.'
              : "No projects found. Click 'Add Project' to create one."
          }
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

      <EditProjectModal
        isOpen={Boolean(projectToEdit)}
        project={projectToEdit}
        onClose={() => setProjectToEdit(null)}
      />

      <AlertModal
        isOpen={Boolean(projectToDelete)}
        onClose={() => setProjectToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Project"
        description={`Are you sure you want to delete "${projectToDelete?.name}"?`}
        variant="danger"
        confirmText="Delete Project"
        cancelText="Cancel"
        isLoading={deleteMutation.isPending}
      />
    </ProjectsContainer>
  );
};
