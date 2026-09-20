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
  const [isValidatingFinish, setIsValidatingFinish] = React.useState(false);

  const {
    isWizardOpen,
    closeWizard,
    wizardStep,
    nextStep,
    prevStep,
    instituteDetails,
    counselors,
    students,
    setStudents,
    setCounselors,
  } = useProjectStore();

  const createMutation = useMutation({
    mutationFn: projectService.create,
    // Only the institute's own fields (code/name/email/phone) are all-or-nothing on the
    // backend now — a conflicting student row or counsellor slot is skipped server-side
    // rather than failing the call, so a "success" here can still carry skips to report.
    onSuccess: ({ studentsCreated, studentsSkipped, counsellorsAssigned, slotsImported, slotsSkipped }) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects-stats'] });
      toast.success(
        'Project Created',
        `${studentsCreated} student(s) onboarded, ${counsellorsAssigned} counselor(s) assigned with ${slotsImported} slot(s).`
      );
      if (studentsSkipped.length > 0) {
        toast.warning(
          'Some Students Skipped',
          `${studentsSkipped.length} student row(s) were skipped: ` +
            studentsSkipped
              .slice(0, 3)
              .map(s => s.reason)
              .join(' · ') +
            (studentsSkipped.length > 3 ? ` (and ${studentsSkipped.length - 3} more)` : '')
        );
      }
      if (slotsSkipped.length > 0) {
        toast.warning(
          'Some Slots Skipped',
          `${slotsSkipped.length} counsellor slot(s) were skipped: ` +
            slotsSkipped
              .slice(0, 3)
              .map(s => `${s.counsellorCode} ${s.date} ${s.startTime} (${s.reason})`)
              .join(' · ') +
            (slotsSkipped.length > 3 ? ` (and ${slotsSkipped.length - 3} more)` : '')
        );
      }
      closeWizard();
    },
    onError: (err: unknown) => {
      // The project's own fields (code/name/email/phone) are still atomic — a conflict
      // there is the only way this call itself fails, so surface exactly what the server
      // rejected rather than a generic message.
      const message = getApiErrorMessage(err, 'Failed to create the project. Please try again.');
      // A 400 "Validation failed" carries the offending fields in details.fieldErrors —
      // without them the toast gives no clue which sheet/form value was rejected.
      const fieldErrors = (
        err as { response?: { data?: { error?: { details?: { fieldErrors?: Record<string, string[]> } } } } }
      ).response?.data?.error?.details?.fieldErrors;
      const detail = fieldErrors
        ? Object.entries(fieldErrors)
            .map(([field, msgs]) => `${field}: ${msgs.join(', ')}`)
            .join(' · ')
        : '';
      toast.error('Project Not Created', detail ? `${message} — ${detail}` : message);
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
    // The wizard endpoint is one transaction — a single duplicate student or booked-slot
    // conflict would otherwise fail the *entire* project. Re-validate right before
    // submitting and drop only the offending rows, so the rest of a good roster/sheet
    // still goes through instead of blocking everything on one bad row.
    setIsValidatingFinish(true);
    try {
      // Students: re-check against existing records (email/studentCode/mobile are
      // globally unique). The Students step already does this on upload, but a student
      // can be added elsewhere in the meantime, or the roster can sit staged for a while
      // before Finish is clicked.
      let finalStudents = students;
      if (students.length > 0) {
        let duplicateCheck;
        try {
          duplicateCheck = await projectService.checkDuplicateStudents(students);
        } catch {
          toast.error(
            'Duplicate Check Failed',
            'Could not verify students against existing records. Please try again.'
          );
          return;
        }
        const dupIndexes = new Set(duplicateCheck.filter(r => r.isDuplicate).map(r => r.index));
        if (dupIndexes.size > 0) {
          finalStudents = students.filter((_, i) => !dupIndexes.has(i));
          const skipped = students
            .map((s, i) => ({ s, i }))
            .filter(({ i }) => dupIndexes.has(i))
            .map(({ s, i }) => {
              const match = duplicateCheck.find(r => r.index === i)?.matches[0];
              return `${s.name || s.email}: ${match ? `already exists (${match.field})` : 'already exists'}`;
            });
          setStudents(finalStudents);
          toast.warning(
            'Some Students Skipped',
            `${skipped.length} student(s) already exist and were skipped — ` +
              skipped.slice(0, 3).join(' · ') +
              (skipped.length > 3 ? ` (and ${skipped.length - 3} more)` : '')
          );
        }
      }

      if (finalStudents.length === 0) {
        toast.error(
          'No Valid Students',
          'All students already exist in the system. Add at least one new student to create the project.'
        );
        return;
      }

      // Counsellor slots: re-check for a collision on counsellorId+date+startTime — see
      // /sessions/slots/import's uniqueness constraint. A bad counsellor ID or a slot
      // that's just been booked elsewhere shouldn't block the project — drop only that
      // row (or that counsellor, if nothing usable is left) and continue.
      const conflicts: string[] = [];
      const finalCounselors = await Promise.all(
        counselors.map(async c => {
          if (c.matchStatus !== 'matched' || !c.directoryId || !c.slots?.length) return c;
          const existingSlots = await sessionsService.getSlots({ counsellorId: c.directoryId });
          const existingKeys = new Set(existingSlots.map(s => `${s.date}|${s.startTime}`));
          const kept = c.slots.filter(s => {
            const isConflict = existingKeys.has(`${s.date}|${s.startTime}`);
            if (isConflict) conflicts.push(`${c.counsellorCode || c.name} on ${s.date} at ${s.startTime}`);
            return !isConflict;
          });
          return kept.length === c.slots.length ? c : { ...c, slots: kept };
        })
      );
      if (conflicts.length > 0) {
        setCounselors(finalCounselors);
        toast.warning(
          'Some Slots Skipped',
          `${conflicts.length} slot(s) were just booked elsewhere and were skipped: ` +
            `${conflicts.slice(0, 3).join(', ')}` +
            (conflicts.length > 3 ? ` (and ${conflicts.length - 3} more)` : '') +
            '. The rest of the project will still be created.'
        );
      }

      createMutation.mutate({
        instituteDetails: {
          ...instituteDetails,
          name: instituteDetails.name.trim(),
        },
        counselors: finalCounselors,
        students: finalStudents,
      });
    } finally {
      setIsValidatingFinish(false);
    }
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
            disabled={isNextDisabled || isValidatingFinish}
            isLoading={createMutation.isPending || isValidatingFinish}
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
