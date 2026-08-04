import React, { useMemo } from 'react';
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
import { useProjectStore } from '@/store/project.store';
import { projectService } from '@/services/project.service';
import { useToast } from '@/hooks';
import { StepInstitute } from './StepInstitute';
import { StepCounselors } from './StepCounselors';
import { StepStudents } from './StepStudents';
import {
  WizardStepperWrapper,
  WizardContent,
  FooterLeftSection,
  FooterRightSection,
  FooterContainer,
} from './AddProjectWizard.styles';

const WIZARD_STEPS: StepConfig[] = [
  { label: 'Institute', description: 'Add institute details', icon: <RiBuildingLine size={16} /> },
  { label: 'Counselors', description: 'Assign counselors', icon: <RiTeamLine size={16} /> },
  { label: 'Students', description: 'Onboard students', icon: <RiGraduationCapLine size={16} /> },
];

export const AddProjectWizard: React.FC = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    isWizardOpen,
    closeWizard,
    wizardStep,
    nextStep,
    prevStep,
    instituteDetails,
    counselors,
    students,
  } = useProjectStore();

  const createMutation = useMutation({
    mutationFn: projectService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project Created', 'The project has been created successfully.');
      closeWizard();
    },
    onError: () => {
      toast.error('Error', 'Failed to create the project. Please try again.');
    },
  });

  const isNextDisabled = useMemo(() => {
    switch (wizardStep) {
      case 0: {
        const { name, email, phone, validFrom, validTo } = instituteDetails;
        if (!name || name.trim().length < 3) return true;
        if (!email || !phone || !validFrom || !validTo) return true;
        if (new Date(validFrom) > new Date(validTo)) return true;
        return false;
      }
      case 1:
        return counselors.length === 0;
      case 2:
        return students.length === 0;
      default:
        return false;
    }
  }, [wizardStep, instituteDetails, counselors, students]);

  const handleFinish = () => {
    createMutation.mutate({
      instituteDetails: {
        ...instituteDetails,
        name: instituteDetails.name.trim(),
      },
      counselors,
      students,
    });
  };

  const renderStepContent = () => {
    switch (wizardStep) {
      case 0:
        return <StepInstitute />;
      case 1:
        return <StepCounselors />;
      case 2:
        return <StepStudents />;
      default:
        return null;
    }
  };

  const isLastStep = wizardStep === WIZARD_STEPS.length - 1;

  const wizardFooter = (
    <FooterContainer>
      <FooterLeftSection>
        {wizardStep > 0 && (
          <Button variant="secondary" leftIcon={<RiArrowLeftLine size={16} />} onClick={prevStep}>
            Back
          </Button>
        )}
      </FooterLeftSection>
      <FooterRightSection>
        <Button variant="ghost" onClick={closeWizard}>
          Cancel
        </Button>
        {isLastStep ? (
          <Button
            leftIcon={<RiCheckLine size={16} />}
            onClick={handleFinish}
            disabled={isNextDisabled}
            isLoading={createMutation.isPending}
          >
            Finish
          </Button>
        ) : (
          <Button
            rightIcon={<RiArrowRightLine size={16} />}
            onClick={nextStep}
            disabled={isNextDisabled}
          >
            Next
          </Button>
        )}
      </FooterRightSection>
    </FooterContainer>
  );

  return (
    <Modal
      isOpen={isWizardOpen}
      onClose={closeWizard}
      title="Create New Project"
      subtitle="Follow the steps below to set up a new project"
      size="2xl"
      closeOnBackdrop={false}
      footer={wizardFooter}
    >
      <WizardStepperWrapper>
        <Stepper steps={WIZARD_STEPS} activeStep={wizardStep} />
      </WizardStepperWrapper>

      <WizardContent>{renderStepContent()}</WizardContent>
    </Modal>
  );
};
