import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';
import { careerService } from '@/services/career.service';
import { useToast } from '@/hooks';
import { CAREER_CATEGORIES, CAREER_STATUS } from '@/constants';
import { Career } from '@/types';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  grid-column: ${({ $fullWidth }) => ($fullWidth ? '1 / -1' : 'span 1')};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const TextArea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  min-height: 70px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.colors.border)};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSize.sm};
  resize: vertical;
  transition: border-color ${({ theme }) => theme.transition.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.borderFocus};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) => ($hasError ? 'rgba(220, 38, 38, 0.15)' : 'rgba(37, 99, 235, 0.15)')};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.danger};
`;

const SectionTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-top: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 4px;
`;

const ModalFooterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
`;

const addCareerSchema = z.object({
  jobRole: z.string().min(2, 'Job Role (Primary Key) is required'),
  careerCluster: z.string().min(1, 'Career Cluster is required'),
  industry: z.string().min(1, 'Industry is required'),
  domain: z.string().min(1, 'Domain is required'),
  aiResilienceGrading: z.enum(['Low', 'Medium', 'High']),
  aiResilienceComment: z.string().min(5, 'AI Resilience comment is required'),
  oneLineDescription: z.string().min(5, 'One-line description is required'),
  topCompaniesRecruiting: z.string().min(2, 'Top companies list is required'),
  approxSalaryRangeIndia: z.string().min(2, 'Salary (India) is required'),
  globalSalaryRange: z.string().min(2, 'Global Salary Range is required'),
  minQual10th12thRecommendedSubjects: z.string().min(5, '10th/12th qualification is required'),
  minQualGradRecommendedSubjects: z.string().min(5, 'Graduation qualification is required'),
  entranceExamsUG: z.string().min(2, 'UG entrance exams are required'),
  minQualPGRecommendedSubjects: z.string().min(5, 'PG qualification is required'),
  entranceExamsPG: z.string().min(2, 'PG entrance exams are required'),
  certificationsStudents: z.string().min(5, 'School student certifications are required'),
  certificationsUG: z.string().min(5, 'UG student certifications are required'),
  topCoursesToStudy: z.string().min(5, 'Top courses to study are required'),
  status: z.enum(['active', 'inactive', 'pending']),
});

type AddCareerFormData = z.infer<typeof addCareerSchema>;

interface AddCareerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCareerModal: React.FC<AddCareerModalProps> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddCareerFormData>({
    resolver: zodResolver(addCareerSchema),
    defaultValues: {
      jobRole: '',
      careerCluster: CAREER_CATEGORIES[0],
      industry: 'Information Technology',
      domain: 'Artificial Intelligence',
      aiResilienceGrading: 'High',
      aiResilienceComment: '',
      oneLineDescription: '',
      topCompaniesRecruiting: 'Google, Microsoft, IBM, Infosys',
      approxSalaryRangeIndia: '₹12,00,000 - ₹35,00,000 / year',
      globalSalaryRange: '$110,000 - $185,000 / year',
      minQual10th12thRecommendedSubjects:
        '12th Science Stream with PCM (Physics, Chemistry, Mathematics)',
      minQualGradRecommendedSubjects: 'B.Tech / B.E. in Computer Science or Data Science',
      entranceExamsUG: 'JEE Main, JEE Advanced, BITSAT',
      minQualPGRecommendedSubjects: 'M.Tech / M.S. in Machine Learning or Robotics',
      entranceExamsPG: 'GATE, GRE',
      certificationsStudents: 'Python for Beginners (Coursera)',
      certificationsUG: 'AWS Certified Machine Learning Specialty',
      topCoursesToStudy: 'B.Tech AI & Data Science, M.Tech Data Science',
      status: 'active',
    },
  });

  const createMutation = useMutation({
    mutationFn: careerService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careers'] });
      toast.success('Career Profile Added', 'New 18-spec career profile entry created.');
      reset();
      onClose();
    },
    onError: (error: Error) => {
      toast.error('Failed to create career', error.message);
    },
  });

  const onSubmit = (data: AddCareerFormData) => {
    const payload: Partial<Career> = {
      ...data,
      title: data.jobRole,
      category: data.careerCluster,
      description: data.oneLineDescription,
      topCompaniesRecruiting: data.topCompaniesRecruiting
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
      sourceTenant: 'Super Admin',
    };
    createMutation.mutate(payload as any);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Career Profile"
      subtitle="Create a new standardized career specification record"
      size="lg"
      footer={
        <ModalFooterActions>
          <Button variant="secondary" onClick={handleClose} disabled={createMutation.isPending}>
            Cancel
          </Button>
          <Button type="submit" form="add-career-form" isLoading={createMutation.isPending}>
            Create Career Profile
          </Button>
        </ModalFooterActions>
      }
    >
      <Form id="add-career-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Section 1 */}
        <SectionTitle>1. Categorization &amp; Identity</SectionTitle>
        <FormGrid>
          <Input
            label="1. Job Role (Primary Key)"
            placeholder="e.g. AI & Machine Learning Engineer"
            error={errors.jobRole?.message}
            {...register('jobRole')}
          />

          <Select
            label="2. Career Cluster"
            options={CAREER_CATEGORIES.map(c => ({ value: c, label: c }))}
            error={errors.careerCluster?.message}
            {...register('careerCluster')}
          />

          <Input
            label="3. Industry Sector"
            placeholder="e.g. Information Technology & Healthcare"
            error={errors.industry?.message}
            {...register('industry')}
          />

          <Input
            label="4. Specialization Domain"
            placeholder="e.g. Artificial Intelligence & MLOps"
            error={errors.domain?.message}
            {...register('domain')}
          />

          <FormGroup $fullWidth>
            <Label htmlFor="oneLineDescription">5. One-Line Description</Label>
            <TextArea
              id="oneLineDescription"
              placeholder="Concise summary of job responsibilities..."
              $hasError={!!errors.oneLineDescription}
              {...register('oneLineDescription')}
            />
            {errors.oneLineDescription?.message && (
              <ErrorText>{errors.oneLineDescription.message}</ErrorText>
            )}
          </FormGroup>
        </FormGrid>

        {/* Section 2 */}
        <SectionTitle>2. AI Resilience &amp; Compensation</SectionTitle>
        <FormGrid>
          <Select
            label="6. AI Resilience Grading"
            options={[
              { value: 'High', label: 'High' },
              { value: 'Medium', label: 'Medium' },
              { value: 'Low', label: 'Low' },
            ]}
            error={errors.aiResilienceGrading?.message}
            {...register('aiResilienceGrading')}
          />

          <Input
            label="7. Approx Salary Range (India)"
            placeholder="e.g. ₹12,00,000 - ₹38,00,000 / year"
            error={errors.approxSalaryRangeIndia?.message}
            {...register('approxSalaryRangeIndia')}
          />

          <Input
            label="8. Global Salary Range"
            placeholder="e.g. $115,000 - $190,000 / year"
            error={errors.globalSalaryRange?.message}
            {...register('globalSalaryRange')}
          />

          <FormGroup $fullWidth>
            <Label htmlFor="aiResilienceComment">9. AI Resilience Explanation</Label>
            <TextArea
              id="aiResilienceComment"
              placeholder="Explanation of how AI impacts this specific role..."
              $hasError={!!errors.aiResilienceComment}
              {...register('aiResilienceComment')}
            />
            {errors.aiResilienceComment?.message && (
              <ErrorText>{errors.aiResilienceComment.message}</ErrorText>
            )}
          </FormGroup>
        </FormGrid>

        {/* Section 3 */}
        <SectionTitle>3. Recruitment &amp; Qualifications</SectionTitle>
        <FormGrid>
          <FormGroup $fullWidth>
            <Input
              label="10. Top Companies Recruiting (Comma-separated tags)"
              placeholder="Google, Microsoft, OpenAI, NVIDIA, TCS"
              error={errors.topCompaniesRecruiting?.message}
              {...register('topCompaniesRecruiting')}
            />
          </FormGroup>

          <FormGroup $fullWidth>
            <Label htmlFor="minQual10th12thRecommendedSubjects">
              11. Min Qualification (10th/12th) + Recommended Subjects
            </Label>
            <TextArea
              id="minQual10th12thRecommendedSubjects"
              placeholder="High school prerequisites and stream requirements..."
              $hasError={!!errors.minQual10th12thRecommendedSubjects}
              {...register('minQual10th12thRecommendedSubjects')}
            />
            {errors.minQual10th12thRecommendedSubjects?.message && (
              <ErrorText>{errors.minQual10th12thRecommendedSubjects.message}</ErrorText>
            )}
          </FormGroup>

          <FormGroup $fullWidth>
            <Label htmlFor="minQualGradRecommendedSubjects">
              12. Min Qualification (Graduation) + Recommended Subjects
            </Label>
            <TextArea
              id="minQualGradRecommendedSubjects"
              placeholder="Undergraduate degree prerequisites..."
              $hasError={!!errors.minQualGradRecommendedSubjects}
              {...register('minQualGradRecommendedSubjects')}
            />
            {errors.minQualGradRecommendedSubjects?.message && (
              <ErrorText>{errors.minQualGradRecommendedSubjects.message}</ErrorText>
            )}
          </FormGroup>

          <Input
            label="13. Entrance Exams (UG Level)"
            placeholder="e.g. JEE Main, BITSAT, CUET-UG"
            error={errors.entranceExamsUG?.message}
            {...register('entranceExamsUG')}
          />

          <Input
            label="14. Entrance Exams (PG Level)"
            placeholder="e.g. GATE, GRE, CAT"
            error={errors.entranceExamsPG?.message}
            {...register('entranceExamsPG')}
          />

          <FormGroup $fullWidth>
            <Label htmlFor="minQualPGRecommendedSubjects">
              15. Min Qualification (PG) + Recommended Subjects
            </Label>
            <TextArea
              id="minQualPGRecommendedSubjects"
              placeholder="Postgraduate degree prerequisites..."
              $hasError={!!errors.minQualPGRecommendedSubjects}
              {...register('minQualPGRecommendedSubjects')}
            />
            {errors.minQualPGRecommendedSubjects?.message && (
              <ErrorText>{errors.minQualPGRecommendedSubjects.message}</ErrorText>
            )}
          </FormGroup>
        </FormGrid>

        {/* Section 4 */}
        <SectionTitle>4. Certifications &amp; Recommended Courses</SectionTitle>
        <FormGrid>
          <FormGroup $fullWidth>
            <Label htmlFor="certificationsStudents">16. Certifications - School Students</Label>
            <TextArea
              id="certificationsStudents"
              placeholder="Recommended certifications for school students..."
              $hasError={!!errors.certificationsStudents}
              {...register('certificationsStudents')}
            />
            {errors.certificationsStudents?.message && (
              <ErrorText>{errors.certificationsStudents.message}</ErrorText>
            )}
          </FormGroup>

          <FormGroup $fullWidth>
            <Label htmlFor="certificationsUG">17. Certifications - UG Students</Label>
            <TextArea
              id="certificationsUG"
              placeholder="Recommended certifications for undergrad students..."
              $hasError={!!errors.certificationsUG}
              {...register('certificationsUG')}
            />
            {errors.certificationsUG?.message && (
              <ErrorText>{errors.certificationsUG.message}</ErrorText>
            )}
          </FormGroup>

          <FormGroup $fullWidth>
            <Label htmlFor="topCoursesToStudy">
              18. Top Courses to Study (UG + PG + Certifications)
            </Label>
            <TextArea
              id="topCoursesToStudy"
              placeholder="Comprehensive list of courses and degrees to pursue..."
              $hasError={!!errors.topCoursesToStudy}
              {...register('topCoursesToStudy')}
            />
            {errors.topCoursesToStudy?.message && (
              <ErrorText>{errors.topCoursesToStudy.message}</ErrorText>
            )}
          </FormGroup>

          <Select
            label="Status"
            options={CAREER_STATUS.map(s => ({ value: s.value, label: s.label }))}
            error={errors.status?.message}
            {...register('status')}
          />
        </FormGrid>
      </Form>
    </Modal>
  );
};
