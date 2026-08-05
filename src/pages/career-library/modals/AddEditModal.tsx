import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Select } from '@/components/Select';
import styled from 'styled-components';
import { RiSaveLine } from 'react-icons/ri';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const addEditSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  aiResilience: z.enum(['Low', 'Medium', 'High']).optional(),
  salaryIndia: z.string().optional(),
  salaryGlobal: z.string().optional(),
  topRecruiters: z.string().optional(),
});

export type AddEditFormData = z.infer<typeof addEditSchema>;

interface AddEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialValues?: Partial<AddEditFormData>;
  onSubmit: (data: AddEditFormData) => void;
  isJobRole?: boolean;
  isLoading?: boolean;
}

export const AddEditModal: React.FC<AddEditModalProps> = ({
  isOpen,
  onClose,
  title,
  initialValues,
  onSubmit,
  isJobRole,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddEditFormData>({
    resolver: zodResolver(addEditSchema),
    defaultValues: {
      name: '',
      description: '',
      aiResilience: 'High',
      salaryIndia: '',
      salaryGlobal: '',
      topRecruiters: '',
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        name: initialValues.name || '',
        description: initialValues.description || '',
        aiResilience: initialValues.aiResilience || 'High',
        salaryIndia: initialValues.salaryIndia || '',
        salaryGlobal: initialValues.salaryGlobal || '',
        topRecruiters: initialValues.topRecruiters || '',
      });
    } else {
      reset({
        name: '',
        description: '',
        aiResilience: 'High',
        salaryIndia: '',
        salaryGlobal: '',
        topRecruiters: '',
      });
    }
  }, [initialValues, reset, isOpen]);

  const handleFormSubmit = (data: AddEditFormData) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
      <FormContainer onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          label="Title / Name"
          placeholder="Enter item title..."
          {...register('name')}
          error={errors.name?.message}
        />

        <Input
          label="Short Description"
          placeholder="Enter short description..."
          {...register('description')}
          error={errors.description?.message}
        />

        {isJobRole && (
          <>
            <div>
              <Select
                label="AI Resilience"
                options={[
                  { value: 'High', label: 'High' },
                  { value: 'Medium', label: 'Medium' },
                  { value: 'Low', label: 'Low' },
                ]}
                value={initialValues?.aiResilience || 'High'}
                onChange={e => setValue('aiResilience', e.target.value as 'High' | 'Medium' | 'Low')}
              />
            </div>
            <Input
              label="Salary (India)"
              placeholder="e.g. ₹4–15 LPA"
              {...register('salaryIndia')}
            />
            <Input
              label="Salary (Global)"
              placeholder="e.g. $70k–$120k"
              {...register('salaryGlobal')}
            />
            <Input
              label="Top Recruiters"
              placeholder="e.g. Tech Firms, Startups"
              {...register('topRecruiters')}
            />
          </>
        )}

        <FormActions>
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading} leftIcon={<RiSaveLine size={18} />}>
            Save Changes
          </Button>
        </FormActions>
      </FormContainer>
    </Modal>
  );
};
