import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckLine,
  RiBuildingLine,
  RiTeamLine,
  RiGraduationCapLine,
} from 'react-icons/ri';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Stepper, StepConfig } from '@/components/Stepper';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { DatePicker } from '@/components/DatePicker';
import { useProjectStore } from '@/store/project.store';
import { projectService } from '@/services/project.service';
import { useToast } from '@/hooks';
import { Project, ProjectStatus, ProjectStudent, ProjectCounselor } from '@/types/project.types';
import { StepStudents } from './StepStudents';
import { StepCounselors } from './StepCounselors';
import {
  WizardStepperWrapper,
  WizardContent,
  FooterLeftSection,
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

const EDIT_WIZARD_STEPS: StepConfig[] = [
  { label: 'Institute & Project', description: 'Edit details & status', icon: <RiBuildingLine size={16} /> },
  { label: 'Students', description: 'Manage students', icon: <RiGraduationCapLine size={16} /> },
  { label: 'Counselors', description: 'Manage counselors', icon: <RiTeamLine size={16} /> },
];

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'closed', label: 'Closed' },
];

const mockInitialStudents: ProjectStudent[] = [
  { name: 'Aarav Sharma', email: 'aarav.sharma@gmail.com', mobile: '+91 98765 43210', grade: 'Grade 11' },
  { name: 'Ananya Patel', email: 'ananya.patel@gmail.com', mobile: '+91 98765 43211', grade: 'Grade 11' },
  { name: 'Rohan Gupta', email: 'rohan.gupta@gmail.com', mobile: '+91 98765 43212', grade: 'Grade 12' },
  { name: 'Diya Nair', email: 'diya.nair@gmail.com', mobile: '+91 98765 43213', grade: 'Grade 11' },
  { name: 'Vihaan Iyer', email: 'vihaan.iyer@gmail.com', mobile: '+91 98765 43214', grade: 'Grade 12' },
];

const mockInitialCounselors: ProjectCounselor[] = [
  { name: 'Priya Sundaram', email: 'priya.sundaram@pwc.org', mobile: '+91 98111 22334', matchStatus: 'matched' },
  { name: 'Rahul Verma', email: 'rahul.verma@pwc.org', mobile: '+91 98222 33445', matchStatus: 'matched' },
  { name: 'Sarah Jenkins', email: 'sarah.jenkins@pwc.org', mobile: '+91 98333 44556', matchStatus: 'matched' },
];

export const EditProjectModal: React.FC<EditProjectModalProps> = ({
  isOpen,
  project,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const {
    instituteDetails,
    setInstituteDetails,
    students,
    setStudents,
    counselors,
    setCounselors,
  } = useProjectStore();

  const [activeStep, setActiveStep] = useState(0);
  const [projectStatus, setProjectStatus] = useState<ProjectStatus>('active');

  useEffect(() => {
    if (isOpen && project) {
      setActiveStep(0);
      setProjectStatus(project.status || 'active');

      setInstituteDetails({
        name: project.name || '',
        email: `contact@${(project.instituteName || 'institute').toLowerCase().replace(/[^a-z0-9]/g, '')}.edu`,
        phone: '+91 98765 43210',
        validFrom: project.validFrom || '',
        validTo: project.validTo || '',
      });

      // Pre-populate students & counselors for edit project flow
      setStudents(mockInitialStudents);
      setCounselors(mockInitialCounselors);
    }
  }, [isOpen, project, setInstituteDetails, setStudents, setCounselors]);

  const updateMutation = useMutation({
    mutationFn: (updates: Partial<Project>) => {
      if (!project) throw new Error('No project selected');
      return projectService.update(project.id, updates);
    },
    onSuccess: updated => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success(
        'Project Updated',
        `Successfully updated project "${updated.name}" with ${students.length} student(s) and ${counselors.length} counselor(s).`
      );
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
      validFrom: instituteDetails.validFrom,
      validTo: instituteDetails.validTo,
      status: projectStatus,
      studentCount: students.length,
      counselorCount: counselors.length,
    });
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <StepFormContainer>
            <StepSubtitle>
              Update primary institute details, project timeline, and current project status.
            </StepSubtitle>
            <FormGrid>
              <FormGroup>
                <Input
                  label="Project / Institute Name"
                  placeholder="Enter project name"
                  value={instituteDetails.name}
                  onChange={e => setInstituteDetails({ name: e.target.value })}
                  required
                />
                <Input
                  label="Contact Email"
                  type="email"
                  placeholder="admin@institute.edu"
                  value={instituteDetails.email}
                  onChange={e => setInstituteDetails({ email: e.target.value })}
                />
                <Input
                  label="Contact Phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={instituteDetails.phone}
                  onChange={e => setInstituteDetails({ phone: e.target.value })}
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

                <div style={{ marginTop: '12px' }}>
                  <Select
                    label="Project Status"
                    options={statusOptions}
                    value={projectStatus}
                    onChange={e => setProjectStatus(e.target.value as ProjectStatus)}
                  />
                </div>
              </FormGroup>
            </FormGrid>
          </StepFormContainer>
        );
      case 1:
        return <StepStudents />;
      case 2:
        return <StepCounselors />;
      default:
        return null;
    }
  };

  const isLastStep = activeStep === EDIT_WIZARD_STEPS.length - 1;

  const wizardFooter = (
    <FooterContainer>
      <FooterLeftSection>
        {activeStep > 0 && (
          <Button
            variant="secondary"
            leftIcon={<RiArrowLeftLine size={16} />}
            onClick={() => setActiveStep(prev => prev - 1)}
          >
            Back
          </Button>
        )}
      </FooterLeftSection>
      <FooterRightSection>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        {isLastStep ? (
          <Button
            leftIcon={<RiCheckLine size={16} />}
            onClick={handleFinish}
            isLoading={updateMutation.isPending}
          >
            Save Changes
          </Button>
        ) : (
          <Button
            rightIcon={<RiArrowRightLine size={16} />}
            onClick={() => setActiveStep(prev => prev + 1)}
          >
            Next
          </Button>
        )}
      </FooterRightSection>
    </FooterContainer>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Project — ${project?.name || 'Project Details'}`}
      subtitle="Modify institute info, project status, onboarded students, and assigned counselors"
      size="xl"
      footer={wizardFooter}
    >
      <WizardStepperWrapper>
        <Stepper steps={EDIT_WIZARD_STEPS} activeStep={activeStep} />
      </WizardStepperWrapper>
      <WizardContent>{renderStepContent()}</WizardContent>
    </Modal>
  );
};
