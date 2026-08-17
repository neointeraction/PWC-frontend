import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { careerService } from '@/services/career.service';
import { useToast } from '@/hooks';
import { getApiErrorMessage } from '@/utils';

export type TaxonomyLevel = 'cluster' | 'industry' | 'domain';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
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

const LABELS: Record<TaxonomyLevel, string> = {
  cluster: 'Cluster',
  industry: 'Industry',
  domain: 'Domain',
};

const PARENT_LABEL: Record<TaxonomyLevel, string> = {
  cluster: '',
  industry: 'Cluster',
  domain: 'Industry',
};

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
});
type FormData = z.infer<typeof schema>;

interface TaxonomyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  level: TaxonomyLevel;
  mode: 'add' | 'edit';
  entity?: { id: string; name: string };
  parentId?: string;
  parentLabel?: string;
}

export const TaxonomyFormModal: React.FC<TaxonomyFormModalProps> = ({
  isOpen,
  onClose,
  onSaved,
  level,
  mode,
  entity,
  parentId,
  parentLabel,
}) => {
  const toast = useToast();
  const label = LABELS[level];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '' },
  });

  useEffect(() => {
    if (isOpen) reset({ name: mode === 'edit' ? entity?.name ?? '' : '' });
  }, [isOpen, mode, entity, reset]);

  const mutation = useMutation({
    mutationFn: (name: string) => {
      if (level === 'cluster') {
        return mode === 'add'
          ? careerService.createCluster(name)
          : careerService.updateCluster(entity!.id, name);
      }
      if (level === 'industry') {
        return mode === 'add'
          ? careerService.createIndustry(parentId!, name)
          : careerService.updateIndustry(entity!.id, { name });
      }
      return mode === 'add'
        ? careerService.createDomain(parentId!, name)
        : careerService.updateDomain(entity!.id, { name });
    },
    onSuccess: () => {
      toast.success(
        `${label} ${mode === 'add' ? 'Created' : 'Updated'}`,
        `The ${label.toLowerCase()} was saved successfully.`
      );
      onSaved();
      onClose();
    },
    onError: (err: unknown) => {
      toast.error('Error', getApiErrorMessage(err, `Failed to save ${label.toLowerCase()}.`));
    },
  });

  const onSubmit = (data: FormData) => mutation.mutate(data.name);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${mode === 'add' ? 'Add' : 'Edit'} ${label}`}
      subtitle={
        mode === 'add'
          ? `Create a new ${label.toLowerCase()} in the career taxonomy`
          : `Rename this ${label.toLowerCase()}`
      }
      size="sm"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="taxonomy-form"
            variant="primary"
            isLoading={mutation.isPending}
          >
            {mode === 'add' ? `Create ${label}` : 'Save Changes'}
          </Button>
        </>
      }
    >
      <Form id="taxonomy-form" onSubmit={handleSubmit(onSubmit)}>
        {mode === 'add' && level !== 'cluster' && parentLabel && (
          <ParentContext>
            {PARENT_LABEL[level]}: <strong>{parentLabel}</strong>
          </ParentContext>
        )}
        <Input
          label={`${label} Name`}
          placeholder={`e.g. ${
            level === 'cluster'
              ? 'Information Technology'
              : level === 'industry'
              ? 'Software & Internet'
              : 'Web Development'
          }`}
          error={errors.name?.message}
          {...register('name')}
        />
      </Form>
    </Modal>
  );
};
