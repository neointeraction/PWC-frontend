import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';
import { careerService, CareerEntryPayload, CareerEntryLinkItem } from '@/services/career.service';
import { Career } from '@/types';
import { useToast } from '@/hooks';
import { getApiErrorMessage } from '@/utils';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.spacing.sm} 0 0;
  padding-bottom: 6px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 72px;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.surface};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const HintText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.danger};
`;

const ParentContext = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.surfaceHover};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 10px 12px;

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const GRADE_OPTIONS = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'VERY_HIGH', label: 'Very High' },
];

const STATUS_OPTIONS = [
  { value: 'DRAFT', label: 'Draft (not published)' },
  { value: 'ACTIVE', label: 'Active (published)' },
];

const GRADE_TO_API: Record<Career['aiResilienceGrading'], CareerEntryPayload['aiResilienceGrade']> = {
  Low: 'LOW',
  Medium: 'MEDIUM',
  High: 'HIGH',
  'Very High': 'VERY_HIGH',
};

const schema = z.object({
  jobRole: z.string().trim().min(1, 'Job role is required'),
  aiResilienceGrade: z.enum(['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH']),
  aiResilienceComment: z.string().trim().min(1, 'Required'),
  oneLineDescription: z.string().trim().min(1, 'Required'),
  roleOverview: z.string().optional(),
  keySkills: z.string().optional(),
  qualification10th12th: z.string().trim().min(1, 'Required'),
  qualification10th12thExplanation: z.string().optional(),
  status: z.enum(['DRAFT', 'ACTIVE']),
  topCompanies: z.string().optional(),
  salaryIndiaRangeText: z.string().optional(),
  salaryGlobalRangeText: z.string().optional(),
  qualificationGraduation: z.string().optional(),
  qualificationGraduationDefined: z.string().optional(),
  qualificationPG: z.string().optional(),
  qualificationPGDefined: z.string().optional(),
  entranceExamsUGDescription: z.string().optional(),
  certificationsStudent: z.string().optional(),
  certificationsUG: z.string().optional(),
  entranceExamsList: z.string().optional(),
  coursesList: z.string().optional(),
  institutionsList: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

// blank → undefined so an omitted field is left unchanged on edit (rather than cleared).
const toArr = (s?: string): string[] | undefined => {
  const items = (s ?? '').split(',').map(x => x.trim()).filter(Boolean);
  return items.length ? items : undefined;
};
const toLinks = (s: string | undefined, level?: 'UG' | 'PG'): CareerEntryLinkItem[] | undefined => {
  const items = (s ?? '').split(',').map(x => x.trim()).filter(Boolean);
  if (!items.length) return undefined;
  return items.map(name => (level ? { name, level } : { name }));
};

interface JobRoleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  mode: 'add' | 'edit';
  entity?: Career;
  domainId?: string; // required for add
  domainLabel?: string;
}

export const JobRoleFormModal: React.FC<JobRoleFormModalProps> = ({
  isOpen,
  onClose,
  onSaved,
  mode,
  entity,
  domainId,
  domainLabel,
}) => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { aiResilienceGrade: 'MEDIUM', status: 'DRAFT' },
  });

  useEffect(() => {
    if (!isOpen) return;
    if (mode === 'edit' && entity) {
      reset({
        jobRole: entity.jobRole,
        aiResilienceGrade: GRADE_TO_API[entity.aiResilienceGrading] ?? 'MEDIUM',
        aiResilienceComment: entity.aiResilienceComment,
        oneLineDescription: entity.oneLineDescription,
        roleOverview: entity.roleOverview || '',
        keySkills: (entity.keySkills || []).join(', '),
        qualification10th12th: entity.minQual10th12thRecommendedSubjects,
        qualification10th12thExplanation: entity.qualification10th12thExplanation || '',
        status: entity.status === 'active' ? 'ACTIVE' : 'DRAFT',
        topCompanies: (entity.topCompaniesRecruiting || []).join(', '),
        salaryIndiaRangeText: entity.approxSalaryRangeIndia || '',
        salaryGlobalRangeText: entity.globalSalaryRange || '',
        qualificationGraduation: entity.minQualGradRecommendedSubjects || '',
        qualificationGraduationDefined: entity.qualificationGraduationDefined || '',
        qualificationPG: entity.minQualPGRecommendedSubjects || '',
        qualificationPGDefined: entity.qualificationPGDefined || '',
        entranceExamsUGDescription: entity.entranceExamsUG || '',
        certificationsStudent: '',
        certificationsUG: '',
        entranceExamsList: '',
        coursesList: '',
        institutionsList: '',
      });
    } else {
      reset({
        jobRole: '',
        aiResilienceGrade: 'MEDIUM',
        aiResilienceComment: '',
        oneLineDescription: '',
        roleOverview: '',
        keySkills: '',
        qualification10th12th: '',
        qualification10th12thExplanation: '',
        status: 'DRAFT',
        topCompanies: '',
        salaryIndiaRangeText: '',
        salaryGlobalRangeText: '',
        qualificationGraduation: '',
        qualificationGraduationDefined: '',
        qualificationPG: '',
        qualificationPGDefined: '',
        entranceExamsUGDescription: '',
        certificationsStudent: '',
        certificationsUG: '',
        entranceExamsList: '',
        coursesList: '',
        institutionsList: '',
      });
    }
  }, [isOpen, mode, entity, reset]);

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      const base: Omit<CareerEntryPayload, 'domainId'> = {
        jobRole: data.jobRole,
        aiResilienceGrade: data.aiResilienceGrade,
        aiResilienceComment: data.aiResilienceComment,
        oneLineDescription: data.oneLineDescription,
        roleOverview: data.roleOverview?.trim() || undefined,
        keySkills: toArr(data.keySkills),
        qualification10th12th: data.qualification10th12th,
        qualification10th12thExplanation: data.qualification10th12thExplanation?.trim() || undefined,
        status: data.status,
        topCompanies: toArr(data.topCompanies),
        salaryIndiaRangeText: data.salaryIndiaRangeText?.trim() || undefined,
        salaryGlobalRangeText: data.salaryGlobalRangeText?.trim() || undefined,
        qualificationGraduation: data.qualificationGraduation?.trim() || undefined,
        qualificationGraduationDefined: data.qualificationGraduationDefined?.trim() || undefined,
        qualificationPG: data.qualificationPG?.trim() || undefined,
        qualificationPGDefined: data.qualificationPGDefined?.trim() || undefined,
        entranceExamsUGDescription: data.entranceExamsUGDescription?.trim() || undefined,
        certificationsStudent: toArr(data.certificationsStudent),
        certificationsUG: toArr(data.certificationsUG),
        entranceExams: toLinks(data.entranceExamsList, 'UG'),
        courses: toLinks(data.coursesList),
        institutions: toLinks(data.institutionsList),
      };
      if (mode === 'add') {
        return careerService.createEntry({ ...base, domainId: domainId! });
      }
      return careerService.updateEntry(entity!.id, base);
    },
    onSuccess: saved => {
      toast.success(
        `Job Role ${mode === 'add' ? 'Created' : 'Updated'}`,
        `${saved.jobRole} was saved successfully.`
      );
      onSaved();
      onClose();
    },
    onError: (err: unknown) => {
      toast.error('Error', getApiErrorMessage(err, 'Failed to save job role.'));
    },
  });

  const onSubmit = (data: FormData) => mutation.mutate(data);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'add' ? 'Add Job Role' : 'Edit Job Role'}
      subtitle={
        mode === 'add'
          ? 'Create a new career specification. New entries default to Draft.'
          : `Update the specification for ${entity?.jobRole || 'this role'}`
      }
      size="2xl"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="job-role-form"
            variant="primary"
            isLoading={mutation.isPending}
          >
            {mode === 'add' ? 'Create Job Role' : 'Save Changes'}
          </Button>
        </>
      }
    >
      <Form id="job-role-form" onSubmit={handleSubmit(onSubmit)}>
        {(domainLabel || entity) && (
          <ParentContext>
            Domain: <strong>{domainLabel || entity?.domain}</strong>
            {mode === 'edit' && ' (change domain is not supported here)'}
          </ParentContext>
        )}

        <SectionTitle>Core</SectionTitle>
        <Input
          label="Job Role"
          placeholder="e.g. Full Stack Developer"
          error={errors.jobRole?.message}
          {...register('jobRole')}
        />
        <Grid>
          <Select
            label="AI Resilience Grade"
            options={GRADE_OPTIONS}
            error={errors.aiResilienceGrade?.message}
            {...register('aiResilienceGrade')}
          />
          <Select
            label="Status"
            options={STATUS_OPTIONS}
            error={errors.status?.message}
            {...register('status')}
          />
        </Grid>
        <Field>
          <Label>One-line Description</Label>
          <TextArea placeholder="A short summary of the role" {...register('oneLineDescription')} />
          {errors.oneLineDescription && <ErrorText>{errors.oneLineDescription.message}</ErrorText>}
        </Field>
        <Field>
          <Label>AI Resilience Comment</Label>
          <TextArea placeholder="Why this grade — automation exposure, human factors, etc." {...register('aiResilienceComment')} />
          {errors.aiResilienceComment && <ErrorText>{errors.aiResilienceComment.message}</ErrorText>}
        </Field>
        <Field>
          <Label>Role Overview &amp; Scope</Label>
          <TextArea placeholder="Fuller write-up of the role shown in the Overview tab" {...register('roleOverview')} />
        </Field>
        <Input
          label="Key Skills"
          placeholder="Comma-separated, e.g. Figma, User Research, Accessibility"
          {...register('keySkills')}
        />
        <Input
          label="Top Companies Recruiting"
          placeholder="Comma-separated, e.g. Google, Amazon, TCS"
          {...register('topCompanies')}
        />

        <SectionTitle>Compensation</SectionTitle>
        <Grid>
          <Input label="Salary Range (India)" placeholder="e.g. ₹6–25 LPA" {...register('salaryIndiaRangeText')} />
          <Input label="Salary Range (Global)" placeholder="e.g. $70k–$160k" {...register('salaryGlobalRangeText')} />
        </Grid>

        <SectionTitle>Qualifications</SectionTitle>
        <Field>
          <Label>10th / 12th — Recommended Subjects</Label>
          <TextArea placeholder="Subjects / stream recommended at school level" {...register('qualification10th12th')} />
          {errors.qualification10th12th && <ErrorText>{errors.qualification10th12th.message}</ErrorText>}
        </Field>
        <Field>
          <Label>10+2 Explanation</Label>
          <TextArea placeholder="Explanation note for the 10+2 requirement" {...register('qualification10th12thExplanation')} />
        </Field>
        <Field>
          <Label>Graduation — Recommended Subjects</Label>
          <TextArea placeholder="Degree / subjects recommended at UG level" {...register('qualificationGraduation')} />
        </Field>
        <Field>
          <Label>Graduation — Defined</Label>
          <TextArea placeholder="Defined graduation pathway / detail" {...register('qualificationGraduationDefined')} />
        </Field>
        <Field>
          <Label>Post-graduation — Recommended Subjects</Label>
          <TextArea placeholder="Specialisations recommended at PG level" {...register('qualificationPG')} />
        </Field>
        <Field>
          <Label>Post-graduation — Defined</Label>
          <TextArea placeholder="Defined post-graduation pathway / detail" {...register('qualificationPGDefined')} />
        </Field>
        <Field>
          <Label>UG Entrance Exams — Description</Label>
          <TextArea placeholder="Free-text description of UG entrance exams" {...register('entranceExamsUGDescription')} />
        </Field>
        <Grid>
          <Input label="Certifications (Student)" placeholder="Comma-separated" {...register('certificationsStudent')} />
          <Input label="Certifications (UG)" placeholder="Comma-separated" {...register('certificationsUG')} />
        </Grid>

        <SectionTitle>Linked References</SectionTitle>
        {mode === 'edit' && (
          <HintText>
            Leave a list blank to keep the existing links unchanged. Entering values replaces that
            list entirely.
          </HintText>
        )}
        <Input
          label="Entrance Exams (UG)"
          placeholder="Comma-separated exam names, e.g. JEE, BITSAT"
          {...register('entranceExamsList')}
        />
        <Input
          label="Courses"
          placeholder="Comma-separated course names, e.g. B.Tech CSE, BCA"
          {...register('coursesList')}
        />
        <Input
          label="Institutions"
          placeholder="Comma-separated institution names"
          {...register('institutionsList')}
        />
      </Form>
    </Modal>
  );
};
