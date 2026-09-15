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
import { sessionsService } from '@/services/sessions.service';
import { useToast } from '@/hooks';
import { getApiErrorMessage, isValidEmail, isValidPhone } from '@/utils';
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
  const [isValidatingSlots, setIsValidatingSlots] = React.useState(false);

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
    // The wizard endpoint is one transaction — a success here means the project, every
    // student, and every counsellor slot all landed. No partial-failure reporting needed.
    onSuccess: ({ studentsCreated, counsellorsAssigned, slotsImported }) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects-stats'] });
      toast.success(
        'Project Created',
        `${studentsCreated} student(s) onboarded, ${counsellorsAssigned} counselor(s) assigned with ${slotsImported} slot(s).`
      );
      closeWizard();
    },
    onError: (err: unknown) => {
      // All-or-nothing: nothing was created, so surface exactly what the server rejected
      // (a duplicate student email/mobile, a slot already booked elsewhere, a duplicate
      // institute name/email/phone, ...) rather than a generic message.
      toast.error(
        'Project Not Created',
        getApiErrorMessage(err, 'Failed to create the project. Please try again.')
      );
    },
  });

  const isNextDisabled = useMemo(() => {
    switch (wizardStep) {
      case 0: {
        const { instituteId, name, email, location, phone, validFrom, validTo } =
          instituteDetails;
        if (!instituteId) return true;
        if (!name || name.trim().length < 3) return true;
        if (!email || !location || !phone || !validFrom || !validTo) return true;
        if (!isValidEmail(email)) return true;
        if (!isValidPhone(phone)) return true;
        if (new Date(validFrom) > new Date(validTo)) return true;
        return false;
      }
      case 1:
        return students.length === 0;
      case 2:
        return counselors.filter(c => c.matchStatus === 'matched').length === 0;
      default:
        return false;
    }
  }, [wizardStep, instituteDetails, students, counselors]);

  const handleFinish = async () => {
    // Re-check right before creating anything — the sheet was validated on upload, but a
    // slot can be claimed by another admin in the meantime. Catching that here means the
    // project is never created with a counsellor left holding zero usable slots (see
    // /sessions/slots/import's uniqueness on counsellorId+date+startTime).
    const withSlots = counselors.filter(c => c.matchStatus === 'matched' && c.directoryId && c.slots?.length);
    setIsValidatingSlots(true);
    try {
      const conflicts: string[] = [];
      for (const c of withSlots) {
        const existingSlots = await sessionsService.getSlots({ counsellorId: c.directoryId! });
        const existingKeys = new Set(existingSlots.map(s => `${s.date}|${s.startTime}`));
        for (const s of c.slots ?? []) {
          if (existingKeys.has(`${s.date}|${s.startTime}`)) {
            conflicts.push(`${c.counsellorCode || c.name} on ${s.date} at ${s.startTime}`);
          }
        }
      }
      if (conflicts.length > 0) {
        toast.error(
          'Slots Already Booked',
          `These slots were just booked elsewhere for that counsellor and can't be imported: ` +
            `${conflicts.slice(0, 3).join(', ')}` +
            (conflicts.length > 3 ? ` (and ${conflicts.length - 3} more)` : '') +
            '. Remove or change those rows on the Counselors step and try again.'
        );
        return;
      }
    } finally {
      setIsValidatingSlots(false);
    }

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
            disabled={isNextDisabled || isValidatingSlots}
            isLoading={createMutation.isPending || isValidatingSlots}
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
