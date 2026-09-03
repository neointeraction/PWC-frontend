import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RiCheckLine } from 'react-icons/ri';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
// import { Select } from '@/components/Select';
import { DatePicker } from '@/components/DatePicker';
import { useProjectStore } from '@/store/project.store';
import { projectService } from '@/services/project.service';
import { useToast } from '@/hooks';
import { Project, ProjectStatus } from '@/types/project.types';
import {
  WizardContent,
  FooterRightSection,
  FooterContainer,
  StepFormContainer,
  StepSubtitle,
  FormGrid,
  FormGroup,
} from './AddProjectWizard.styles';

interface EditProjectModalProps {
  isOpen: boolean;
  project: Project | null;
  onClose: () => void;
}

// const statusOptions = [
//   { value: 'active', label: 'Active' },
//   { value: 'closed', label: 'Closed' },
// ];

export const EditProjectModal: React.FC<EditProjectModalProps> = ({
  isOpen,
  project,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { instituteDetails, setInstituteDetails } = useProjectStore();

  const [projectStatus, setProjectStatus] = useState<ProjectStatus>('active');

  useEffect(() => {
    if (isOpen && project) {
      setProjectStatus(project.status || 'active');

      setInstituteDetails({
        instituteId: project.code || '',
        name: project.name || '',
        email: project.email || '',
        phone: project.phone || '',
        location: project.location || '',
        validFrom: project.validFrom || '',
        validTo: project.validTo || '',
      });
    }
  }, [isOpen, project, setInstituteDetails]);

  const updateMutation = useMutation({
    mutationFn: (updates: Partial<Project>) => {
      if (!project) throw new Error('No project selected');
      return projectService.update(project.id, updates);
    },
    onSuccess: updated => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects-stats'] });
      // Keeps the project dashboard banner in step with an edit made from it.
      queryClient.invalidateQueries({ queryKey: ['project', updated.id] });
      toast.success('Project Updated', `Successfully updated project "${updated.name}".`);
      onClose();
    },
    onError: () => {
      toast.error('Update Failed', 'Could not update project details. Please try again.');
    },
  });

  const handleFinish = () => {
    if (!instituteDetails.name.trim()) {
      toast.error('Validation Error', 'Project Name is required.');
      return;
    }

    updateMutation.mutate({
      name: instituteDetails.name,
      instituteName: instituteDetails.name,
      location: instituteDetails.location,
      email: instituteDetails.email,
      phone: instituteDetails.phone,
      validFrom: instituteDetails.validFrom,
      validTo: instituteDetails.validTo,
      status: projectStatus,
    });
  };

  const wizardFooter = (
    <FooterContainer>
      <FooterRightSection>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button
          leftIcon={<RiCheckLine size={16} />}
          onClick={handleFinish}
          isLoading={updateMutation.isPending}
        >
          Save Changes
        </Button>
      </FooterRightSection>
    </FooterContainer>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Project — ${project?.name || 'Project Details'}`}
      subtitle="Modify project details, timeline, and status"
      size="xl"
      footer={wizardFooter}
    >
      <WizardContent>
        <StepFormContainer>
          <StepSubtitle>
            Update primary project details, timeline, and current project status.
          </StepSubtitle>
          <FormGrid>
            <FormGroup>
              <Input
                label="Institute ID"
                placeholder="Enter institute ID"
                value={instituteDetails.instituteId}
                disabled
              />
              <Input
                label="Institute Name"
                placeholder="Enter institute name"
                value={instituteDetails.name}
                onChange={e => setInstituteDetails({ name: e.target.value })}
                required
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="admin@institute.edu"
                value={instituteDetails.email}
                onChange={e => setInstituteDetails({ email: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <FormGrid>
                <DatePicker
                  label="Valid From"
                  selected={instituteDetails.validFrom ? new Date(instituteDetails.validFrom) : null}
                  onChange={(date: Date | null) =>
                    setInstituteDetails({ validFrom: date ? date.toISOString() : '' })
                  }
                  placeholderText="Select start date"
                />
                <DatePicker
                  label="Valid To"
                  selected={instituteDetails.validTo ? new Date(instituteDetails.validTo) : null}
                  onChange={(date: Date | null) =>
                    setInstituteDetails({ validTo: date ? date.toISOString() : '' })
                  }
                  placeholderText="Select end date"
                />
              </FormGrid>
              <Input
                label="Location"
                placeholder="Location"
                value={instituteDetails.location}
                onChange={e => setInstituteDetails({ location: e.target.value })}
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="98765 43210"
                value={instituteDetails.phone}
                onChange={e => setInstituteDetails({ phone: e.target.value })}
              />

              {/* <div style={{ marginTop: '12px' }}>
                <Select
                  label="Project Status"
                  options={statusOptions}
                  value={projectStatus}
                  onChange={e => setProjectStatus(e.target.value as ProjectStatus)}
                />
              </div> */}
            </FormGroup>
          </FormGrid>
        </StepFormContainer>
      </WizardContent>
    </Modal>
  );
};
