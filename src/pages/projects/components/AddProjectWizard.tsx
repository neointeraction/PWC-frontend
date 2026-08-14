import React, { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckLine,
  RiBuildingLine,
  RiGraduationCapLine,
} from 'react-icons/ri';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Stepper, StepConfig } from '@/components/Stepper';
import { useProjectStore } from '@/store/project.store';
import { instituteService } from '@/services/institute.service';
import { projectService } from '@/services/project.service';
import { useToast } from '@/hooks';
import { getApiErrorMessage } from '@/utils';
import { StepInstitute } from './StepInstitute';
import { StepStudents } from './StepStudents';
import {
  WizardStepperWrapper,
  WizardContent,
  FooterLeftSection,
  FooterRightSection,
  FooterContainer,
} from './AddProjectWizard.styles';

const WIZARD_STEPS: StepConfig[] = [
  { label: 'Institute & Project', description: 'Pick institute, set project window', icon: <RiBuildingLine size={16} /> },
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
    instituteMode,
    selectedInstituteId,
    newInstitute,
    projectName,
    fromDate,
    toDate,
    createdProjectId,
    setCreated,
  } = useProjectStore();

  const createProjectMutation = useMutation({
    mutationFn: async () => {
      let instituteId = selectedInstituteId;
      let instituteName = '';

      if (instituteMode === 'new') {
        const institute = await instituteService.create(newInstitute);
        instituteId = institute.id;
        instituteName = institute.name;
      } else {
        const institutes = await instituteService.getAll();
        instituteName = institutes.find(i => i.id === instituteId)?.name || '';
      }

      const project = await projectService.create({
        instituteId,
        name: projectName.trim(),
        fromDate,
        toDate,
      });

      return { projectId: project.id, instituteId, instituteName };
    },
    onSuccess: ({ projectId, instituteId, instituteName }) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['institutes'] });
      setCreated(projectId, instituteId, instituteName);
      toast.success('Project Created', `"${projectName}" is ready — now onboard students.`);
      nextStep();
    },
    onError: err => {
      toast.error('Error', getApiErrorMessage(err, 'Failed to create the project.'));
    },
  });

  const isStep0Valid = useMemo(() => {
    if (instituteMode === 'existing' && !selectedInstituteId) return false;
    if (instituteMode === 'new') {
      const { name, address, contactNumber, primaryEmail } = newInstitute;
      if (!name || name.trim().length < 3 || !address || !contactNumber || !primaryEmail) return false;
    }
    if (!projectName || projectName.trim().length < 2) return false;
    if (!fromDate || !toDate) return false;
    if (new Date(fromDate) > new Date(toDate)) return false;
    return true;
  }, [instituteMode, selectedInstituteId, newInstitute, projectName, fromDate, toDate]);

  const renderStepContent = () => {
    switch (wizardStep) {
      case 0:
        return <StepInstitute />;
      case 1:
        return <StepStudents />;
      default:
        return null;
    }
  };

  const isLastStep = wizardStep === WIZARD_STEPS.length - 1;

  const handleClose = () => {
    queryClient.invalidateQueries({ queryKey: ['projects'] });
    closeWizard();
  };

  const wizardFooter = (
    <FooterContainer>
      <FooterLeftSection>
        {wizardStep > 0 && !createdProjectId && (
          <Button variant="secondary" leftIcon={<RiArrowLeftLine size={16} />} onClick={prevStep}>
            Back
          </Button>
        )}
      </FooterLeftSection>
      <FooterRightSection>
        <Button variant="ghost" onClick={handleClose}>
          {isLastStep ? 'Done' : 'Cancel'}
        </Button>
        {!isLastStep && (
          <Button
            rightIcon={<RiArrowRightLine size={16} />}
            onClick={() => createProjectMutation.mutate()}
            disabled={!isStep0Valid}
            isLoading={createProjectMutation.isPending}
          >
            Create Project &amp; Continue
          </Button>
        )}
        {isLastStep && (
          <Button leftIcon={<RiCheckLine size={16} />} onClick={handleClose}>
            Finish
          </Button>
        )}
      </FooterRightSection>
    </FooterContainer>
  );

  return (
    <Modal
      isOpen={isWizardOpen}
      onClose={handleClose}
      title="Create New Project"
      subtitle="Set up the institute/project, then onboard students"
      size="xl"
      footer={wizardFooter}
    >
      <WizardStepperWrapper>
        <Stepper steps={WIZARD_STEPS} activeStep={wizardStep} />
      </WizardStepperWrapper>
      <WizardContent>{renderStepContent()}</WizardContent>
    </Modal>
  );
};
