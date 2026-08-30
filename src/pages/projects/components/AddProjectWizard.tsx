import React, { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckLine,
  RiBuildingLine,
  RiGraduationCapLine,
  RiTeamLine,
} from 'react-icons/ri';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { Stepper, StepConfig } from '@/components/Stepper';
import { useProjectStore } from '@/store/project.store';
import { projectService } from '@/services/project.service';
import { useToast } from '@/hooks';
import { getApiErrorMessage, isValidPhone } from '@/utils';
import { StepInstitute } from './StepInstitute';
import { StepStudents } from './StepStudents';
import { StepCounselors } from './StepCounselors';
import {
  WizardStepperWrapper,
  WizardContent,
  FooterLeftSection,
  FooterRightSection,
  FooterContainer,
} from './AddProjectWizard.styles';

const WIZARD_STEPS: StepConfig[] = [
  { label: 'Institute', description: 'Add institute details', icon: <RiBuildingLine size={16} /> },
  { label: 'Students', description: 'Onboard students', icon: <RiGraduationCapLine size={16} /> },
  { label: 'Counselors', description: 'Assign counselors', icon: <RiTeamLine size={16} /> },
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
    onSuccess: ({ studentImport, slotImport }) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects-stats'] });
      // Student rows are imported one by one and a bad row is skipped rather than
      // aborting the batch, so say what actually landed instead of a blanket success.
      const studentNote =
        studentImport.failed > 0
          ? `${studentImport.imported} of ${studentImport.total} students imported. ` +
            `${studentImport.failed} skipped — ` +
            studentImport.failures
              .slice(0, 3)
              .map(f => `${f.name}: ${f.reason}`)
              .join(' · ') +
            (studentImport.failed > 3 ? ` (and ${studentImport.failed - 3} more)` : '')
          : studentImport.total > 0
            ? `All ${studentImport.total} students were imported.`
            : '';
      // The slot sheet imports as one call: if it is rejected, every counsellor is left
      // with no availability at all, which a plain success toast would hide.
      const slotNote = slotImport.error
        ? `Counsellor availability was not imported (${slotImport.attempted} slot(s)) — ${slotImport.error}`
        : '';

      if (studentNote && slotNote) {
        toast.warning('Project Created — Check the Imports', `${studentNote} ${slotNote}`);
      } else if (slotNote) {
        toast.warning('Project Created — Availability Not Imported', slotNote);
      } else if (studentImport.failed > 0) {
        toast.warning('Project Created — Some Students Skipped', studentNote);
      } else {
        toast.success(
          'Project Created',
          studentNote || 'The project has been created successfully.'
        );
      }
      closeWizard();
    },
    onError: (err: unknown) => {
      // Surface what the server actually rejected — a duplicate institute name/email/phone
      // is the common case, and a generic message makes it undiagnosable.
      toast.error(
        'Error',
        getApiErrorMessage(err, 'Failed to create the project. Please try again.')
      );
    },
  });

  const isNextDisabled = useMemo(() => {
    switch (wizardStep) {
      case 0: {
        const { name, email, location, phone, validFrom, validTo } = instituteDetails;
        if (!name || name.trim().length < 3) return true;
        if (!email || !location || !phone || !validFrom || !validTo) return true;
        if (!isValidPhone(phone)) return true;
        if (new Date(validFrom) > new Date(validTo)) return true;
        return false;
      }
      case 1:
        return students.length === 0;
      case 2:
        return false;
      default:
        return false;
    }
  }, [wizardStep, instituteDetails, students]);

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
        return <StepStudents />;
      case 2:
        return <StepCounselors />;
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
